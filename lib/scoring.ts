// /lib/scoring.ts
import {
  AnswerMap,
  Question,
  CategoryId,
  PerQuestionScore,
  CategoryScores,
  ComputedResult,
  RawCounts,
  BANK_VERSION,
  isMultiple,
  isMatrix,
  isVisual,
  isSequence,
  isRecall,
} from "@/lib/types";
import { t } from "@/lib/i18n";

/* ---------- Utility helpers ---------- */

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));
const mean = (xs: number[]) =>
  xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0;

// Map performance (0–1) → IQ 85–145
const mapPercentToIQ = (p: number) => Math.round(85 + p * 60);

/* ---------- Scoring of individual kinds ---------- */

function scoreChoiceLike(q: { correctIndex: number }, ans: unknown): number {
  return typeof ans === "number" && ans === q.correctIndex ? 1 : 0;
}

function scoreSequence(
  q: { answerSequence: number[]; partialCredit?: boolean },
  ans: unknown
): number {
  if (!Array.isArray(ans)) return 0;
  const corr = q.answerSequence;
  if (!q.partialCredit) {
    return JSON.stringify(ans) === JSON.stringify(corr) ? 1 : 0;
  }
  // Partial: fraction of pairs in correct relative order
  let correctPairs = 0;
  let totalPairs = 0;
  for (let i = 0; i < corr.length; i++) {
    for (let j = i + 1; j < corr.length; j++) {
      totalPairs++;
      const ai = ans.indexOf(corr[i]);
      const aj = ans.indexOf(corr[j]);
      if (ai < aj) correctPairs++;
    }
  }
  return clamp01(correctPairs / totalPairs);
}

function scoreRecall(
  q: {
    correctAnswer: (string | number)[];
    match: string;
    orderSensitive?: boolean;
    maxEditDistance?: number;
  },
  ans: unknown
): number {
  if (!Array.isArray(ans)) return 0;
  const expected = q.correctAnswer;
  const norm = (v: any) =>
    typeof v === "string" && q.match === "ci"
      ? v.toLowerCase().trim()
      : String(v).trim();

  const exp = expected.map(norm);
  const got = ans.map(norm);
  const max = Math.max(exp.length, got.length);
  if (max === 0) return 0;

  if (q.match === "set") {
    const overlap = got.filter((x) => exp.includes(x)).length;
    return clamp01(overlap / exp.length);
  }

  let correct = 0;
  for (let i = 0; i < exp.length && i < got.length; i++) {
    if (exp[i] === got[i]) correct++;
  }
  return clamp01(correct / exp.length);
}

/* ---------- Main computation ---------- */

export function computeResult(
  questions: Question[],
  answers: AnswerMap
): ComputedResult {
  const perQuestion: PerQuestionScore[] = [];

  for (const q of questions) {
    const ans = answers[q.id];
    let s = 0;

    if (isMultiple(q) || isMatrix(q) || isVisual(q)) s = scoreChoiceLike(q, ans);
    else if (isSequence(q)) s = scoreSequence(q, ans);
    else if (isRecall(q)) s = scoreRecall(q, ans);

    perQuestion.push({
      id: q.id,
      kind: q.kind,
      category: q.category,
      weight: q.weight ?? 1,
      score01: clamp01(s),
    });
  }

  const byCat: Record<CategoryId, number[]> = {
    reasoning: [],
    math: [],
    verbal: [],
    spatial: [],
    memory: [],
  };

  for (const p of perQuestion) {
    byCat[p.category].push(p.score01);
  }

  const categoryScores: CategoryScores = {
    reasoning: Math.round(mean(byCat.reasoning) * 100),
    math: Math.round(mean(byCat.math) * 100),
    verbal: Math.round(mean(byCat.verbal) * 100),
    spatial: Math.round(mean(byCat.spatial) * 100),
    memory: Math.round(mean(byCat.memory) * 100),
  };

  const allScores = perQuestion.map((p) => p.score01);
  const totalPercent = mean(allScores) * 100;
  const iqEstimate = mapPercentToIQ(mean(allScores));

  const raw: RawCounts = {
    totalQuestions: questions.length,
    totalWeighted: perQuestion.reduce((a, p) => a + p.weight, 0),
    totalCorrectWeighted: perQuestion.reduce(
      (a, p) => a + p.weight * p.score01,
      0
    ),
  };

  return {
    version: BANK_VERSION,
    categoryScores,
    totalPercent: Math.round(totalPercent),
    iqEstimate,
    perQuestion,
    raw,
  };
}

/* ---------- Convenience utilities ---------- */

export function computeCategoryMean(
  category: CategoryId,
  perQuestion: PerQuestionScore[]
): number {
  const subset = perQuestion.filter((p) => p.category === category);
  return mean(subset.map((p) => p.score01)) * 100;
}

/* ---------- IQ label helper ---------- */

export function iqLabel(iq: number, dict?: Record<string, string>): string {
  if (!dict) {
    if (iq < 90) return "Below average";
    if (iq < 110) return "Average";
    if (iq < 130) return "Above average";
    return "High";
  }

  if (iq < 90) return t(dict, "iq-label-below", "Below average");
  if (iq < 110) return t(dict, "iq-label-average", "Average");
  if (iq < 130) return t(dict, "iq-label-above", "Above average");
  return t(dict, "iq-label-high", "High");
}

/* ---------- DTO helper for API results ---------- */

export function toIQResultDTO(computed: ComputedResult) {
  return {
    iq: computed.iqEstimate,
    ci: [
      Math.max(55, computed.iqEstimate - 10),
      Math.min(145, computed.iqEstimate + 10),
    ] as [number, number],
    percent: computed.totalPercent,
    perCategory: {
      reasoning: { percent: computed.categoryScores.reasoning },
      math: { percent: computed.categoryScores.math },
      verbal: { percent: computed.categoryScores.verbal },
      spatial: { percent: computed.categoryScores.spatial },
      memory: { percent: computed.categoryScores.memory },
    },
  };
}
