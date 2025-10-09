// /lib/scoring_iq.ts
import { CATEGORY_INDEX } from "@/data/question_index";
import {
  AnswerMap,
  CategoryId,
  Question,
  isMultiple,
  isMatrix,
  isVisual,
  isSequence,
} from "@/lib/types";

/** Struktur frontend og API forventer */
export interface IQResult {
  iq: number;
  ci: [number, number];
  percent: number;
  perCategory: Record<CategoryId, { percent: number }>;
}

/** Beregn IQ basert på brukerens svar */
export function computeIQ(answers: AnswerMap): IQResult {
  if (!answers || Object.keys(answers).length === 0) {
    return makeFallbackIQ();
  }

  let totalScore = 0;
  let maxScore = 0;

  const byCategory: Record<CategoryId, { score: number; max: number }> = {
    reasoning: { score: 0, max: 0 },
    math: { score: 0, max: 0 },
    verbal: { score: 0, max: 0 },
    spatial: { score: 0, max: 0 },
    memory: { score: 0, max: 0 },
  };

  const perQuestion: { id: string; kind: string; cat: CategoryId; score: number }[] = [];

  for (const [cat, questions] of Object.entries(CATEGORY_INDEX) as [CategoryId, Question[]][]) {
    for (const q of questions) {
      const ans = answers[q.id];
      if (ans == null) continue;

      let score = 0;

      // --- Multiple / Matrix / Visual ---
      if (isMultiple(q) || isMatrix(q) || isVisual(q)) {
        if (typeof ans === "string") {
          // bruk i18n-nøkkel sammenligning
          const correctKey = q.optionsKey[q.correctIndex];
          score = ans === correctKey ? 1 : 0;
        } else if (typeof ans === "number") {
          score = ans === q.correctIndex ? 1 : 0;
        }
      }

      // --- Sequence ---
      else if (isSequence(q) && Array.isArray(ans)) {
        const correct = q.answerSequence;
        const toKeys = (arr: (number | string)[], keys: string[]) =>
          arr.map((v) => (typeof v === "number" ? keys[v] : v));

        const correctKeys = toKeys(correct, q.itemsKey);
        const userKeys = toKeys(ans, q.itemsKey);

        let correctCount = 0;
        for (let i = 0; i < Math.min(userKeys.length, correctKeys.length); i++) {
          if (userKeys[i] === correctKeys[i]) correctCount++;
        }

        score = q.partialCredit
          ? correctCount / correctKeys.length
          : correctCount === correctKeys.length
          ? 1
          : 0;
      }

      totalScore += score;
      maxScore += 1;
      byCategory[cat].score += score;
      byCategory[cat].max += 1;
      perQuestion.push({ id: q.id, kind: q.kind, cat, score });
    }
  }

  // --- Beregn prosent per kategori ---
  const perCategory: Record<CategoryId, { percent: number }> = {
    reasoning: { percent: 0 },
    math: { percent: 0 },
    verbal: { percent: 0 },
    spatial: { percent: 0 },
    memory: { percent: 0 },
  };
  for (const cat of Object.keys(byCategory) as CategoryId[]) {
    const c = byCategory[cat];
    perCategory[cat].percent = c.max > 0 ? Math.round((c.score / c.max) * 100) : 0;
  }

  const percent = Math.round((totalScore / maxScore) * 100);
  const iq = Math.round(100 + (percent - 50) * 1.5);
  const ci: [number, number] = [Math.max(55, iq - 10), Math.min(145, iq + 10)];

  // --- Debug ---
  console.groupCollapsed("🧠 IQ computation debug");
  console.log("Total:", totalScore, "/", maxScore, "→", percent, "%");
  console.table(perCategory);
  console.log("Per question:", perQuestion);
  console.groupEnd();

  return { iq, ci, percent, perCategory };
}

/** Fallback for tomt svar */
function makeFallbackIQ(): IQResult {
  const base: Record<CategoryId, { percent: number }> = {
    reasoning: { percent: 50 },
    math: { percent: 50 },
    verbal: { percent: 50 },
    spatial: { percent: 50 },
    memory: { percent: 50 },
  };
  return { iq: 100, ci: [90, 110], percent: 50, perCategory: base };
}

/** Enkle IQ-labels (for UI) */
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
