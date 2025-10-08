// /lib/scoring_iq.ts
import { CATEGORY_INDEX } from "@/data/question_index";
import { CategoryId, AnswerMap, Question, isSequence } from "@/lib/types";

/** Struktur frontend og API forventer */
export interface IQResult {
  iq: number;
  ci: [number, number];
  percent: number;
  perCategory: Record<CategoryId, { percent: number }>;
}

/**
 * Beregn IQ-resultat basert på brukerens svar.
 * Robust mot manglende eller delvise data.
 */
export function computeIQ(answers: AnswerMap): IQResult {
  // fallback hvis answers mangler
  if (!answers || Object.keys(answers).length === 0) {
    return {
      iq: 100,
      ci: [90, 110],
      percent: 50,
      perCategory: {
        reasoning: { percent: 50 },
        math: { percent: 50 },
        verbal: { percent: 50 },
        spatial: { percent: 50 },
        memory: { percent: 50 },
      },
    };
  }

  let totalScore = 0;
  let maxScore = 0;

  const byCategory: Record<CategoryId, number> = {
    reasoning: 0,
    math: 0,
    verbal: 0,
    spatial: 0,
    memory: 0,
  };
  const categoryTotals: Record<CategoryId, number> = {
    reasoning: 0,
    math: 0,
    verbal: 0,
    spatial: 0,
    memory: 0,
  };

  for (const [categoryId, questions] of Object.entries(CATEGORY_INDEX) as [
    CategoryId,
    Question[]
  ][]) {
    for (const q of questions) {
      const ans = answers[q.id];
      let score = 0;

      // multiple-choice / visual / matrix
      if ("correctIndex" in q && typeof ans === "number") {
        score = ans === q.correctIndex ? 1 : 0;
      }
      // sequence / ordering
      else if (isSequence(q) && Array.isArray(ans)) {
        const correct = q.answerSequence;
        let correctPairs = 0;
        for (let i = 0; i < ans.length; i++) {
          if (ans[i] === correct[i]) correctPairs++;
        }
        score = correctPairs / ans.length;
      }

      totalScore += score;
      maxScore += 1;
      byCategory[categoryId] += score;
      categoryTotals[categoryId] += 1;
    }
  }

  // Unngå deling på null
  if (maxScore === 0) maxScore = 1;

  // Beregn prosenter per kategori
  const perCategory: Record<CategoryId, { percent: number }> = {
    reasoning: { percent: 0 },
    math: { percent: 0 },
    verbal: { percent: 0 },
    spatial: { percent: 0 },
    memory: { percent: 0 },
  };
  for (const c of Object.keys(byCategory) as CategoryId[]) {
    const total = categoryTotals[c];
    perCategory[c].percent = total > 0 ? (byCategory[c] / total) * 100 : 0;
  }

  // Samlet prosent
  const percent = (totalScore / maxScore) * 100;

  // Lineær mapping: mean = 100, SD = 15
  const iq = Math.round(100 + ((percent - 50) / 50) * 15);

  // Konfidensintervall (± standardfeil avhengig av testlengde)
  const errorMargin = 5 + Math.max(0, 15 - Math.min(maxScore, 15)); // litt bredere CI for korte tester
  const ci: [number, number] = [
    Math.max(55, iq - errorMargin),
    Math.min(145, iq + errorMargin),
  ];

  return { iq, ci, percent, perCategory };
}

/* ---------- Optional: i18n label helper ---------- */
export function iqLabel(iq: number, dict?: Record<string, string>): string {
  if (!dict) {
    if (iq < 90) return "Below average";
    if (iq < 110) return "Average";
    if (iq < 130) return "Above average";
    return "High";
  }

  // Hvis du bruker i18n, kan t(dict, key, fallback) brukes her
  if (iq < 90) return dict["iq-label-below"] || "Below average";
  if (iq < 110) return dict["iq-label-average"] || "Average";
  if (iq < 130) return dict["iq-label-above"] || "Above average";
  return dict["iq-label-high"] || "High";
}
