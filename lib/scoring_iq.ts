import { CATEGORY_INDEX } from "@/data/question_index";
import {
  AnswerMap,
  CategoryId,
  Question,
  isMultiple,
  isMatrix,
  isVisual,
  isSequence,
  BANK_VERSION,
  PerQuestionScore,
} from "@/lib/types";

/** --- Type definitions --- */
export interface ComputedResult {
  version: string;
  categoryScores: Record<CategoryId, number>;
  totalPercent: number;
  iqEstimate: number;
  perQuestion: PerQuestionScore[];
  raw: {
    totalQuestions: number;
    totalWeighted: number;
    totalCorrectWeighted: number;
  };
}

/** --- Main scoring entry --- */
export function computeResult(answers: AnswerMap): ComputedResult {
  const version = BANK_VERSION;
  const perQuestion: PerQuestionScore[] = [];

  // prepare totals
  const categoryTotals: Record<CategoryId, { score: number; max: number }> = {
    reasoning: { score: 0, max: 0 },
    math: { score: 0, max: 0 },
    verbal: { score: 0, max: 0 },
    spatial: { score: 0, max: 0 },
    memory: { score: 0, max: 0 },
  };

  // --- Iterate through all categories and questions ---
  for (const [cat, questions] of Object.entries(CATEGORY_INDEX) as [
    CategoryId,
    Question[]
  ][]) {
    for (const q of questions) {
      const ans = answers[q.id];
      if (ans == null) continue;

      let score01 = 0;

      // MULTIPLE / MATRIX / VISUAL
      if (isMultiple(q) || isMatrix(q) || isVisual(q)) {
        if (typeof ans === "number") {
          score01 = ans === q.correctIndex ? 1 : 0;
        } else if (typeof ans === "string") {
          const correctKey = q.optionsKey[q.correctIndex];
          score01 = ans === correctKey ? 1 : 0;
        }
      }

      // SEQUENCE
      else if (isSequence(q) && Array.isArray(ans)) {
        const correct = q.answerSequence;
        const correctCount = ans.reduce(
          (acc, v, i) => acc + (v === correct[i] ? 1 : 0),
          0
        );
        score01 = q.partialCredit
          ? correctCount / correct.length
          : correctCount === correct.length
          ? 1
          : 0;
      }

      const weight = q.weight ?? 1;
      perQuestion.push({
        id: q.id,
        kind: q.kind,
        category: q.category,
        weight,
        score01,
      });

      categoryTotals[cat].score += score01 * weight;
      categoryTotals[cat].max += weight;
    }
  }

  // --- Category-level results ---
  const categoryScores: Record<CategoryId, number> = {
    reasoning: percent(categoryTotals.reasoning),
    math: percent(categoryTotals.math),
    verbal: percent(categoryTotals.verbal),
    spatial: percent(categoryTotals.spatial),
    memory: percent(categoryTotals.memory),
  };

  const totalPercent = average(Object.values(categoryScores));
  const iqEstimate = estimateIQ(totalPercent);

  // --- Raw totals ---
  const raw = {
    totalQuestions: perQuestion.length,
    totalWeighted: sum(perQuestion.map((p) => p.weight)),
    totalCorrectWeighted: sum(perQuestion.map((p) => p.weight * p.score01)),
  };

  return {
    version,
    categoryScores,
    totalPercent,
    iqEstimate,
    perQuestion,
    raw,
  };
}

/** --- Helper functions --- */
function percent(obj: { score: number; max: number }): number {
  return obj.max > 0 ? Math.round((obj.score / obj.max) * 100) : 0;
}

function average(nums: number[]): number {
  return nums.length ? nums.reduce((a, b) => a + b, 0) / nums.length : 0;
}

function sum(nums: number[]): number {
  return nums.reduce((a, b) => a + b, 0);
}

function estimateIQ(percent: number): number {
  const iq = 100 + (percent - 50) * 1.5;
  return Math.round(Math.min(Math.max(iq, 55), 145));
}

/** --- Human label (UI helper) --- */
export function iqLabel(iq: number, dict?: Record<string, string>): string {
  if (!dict) {
    if (iq < 90) return "Below average";
    if (iq < 110) return "Average";
    if (iq < 130) return "Above average";
    return "High";
  }

  if (iq < 90) return dict["iq-label-below"] || "Below average";
  if (iq < 110) return dict["iq-label-average"] || "Average";
  if (iq < 130) return dict["iq-label-above"] || "Above average";
  return dict["iq-label-high"] || "High";
}
