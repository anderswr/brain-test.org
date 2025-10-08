// /lib/scoring_iq.ts
import { CATEGORY_INDEX } from "@/data/question_index";
import { CategoryId, AnswerMap, Question, isSequence } from "@/lib/types";
import { t } from "@/lib/i18n";

/**
 * Resultatstruktur for IQ-beregning
 */
export interface IQResult {
  totalScore: number;
  maxScore: number;
  percent: number;
  byCategory: Record<CategoryId, number>;
  iqEstimate: number;
}

/**
 * Beregn resultat fra brukerens svar.
 * Scorer alle spørsmål basert på correctIndex eller riktig rekkefølge.
 */
export function computeIQ(answers: AnswerMap): IQResult {
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

      if ("correctIndex" in q && typeof ans === "number") {
        // multiple / visual / matrix
        score = ans === q.correctIndex ? 1 : 0;
      } else if (isSequence(q) && Array.isArray(ans)) {
        // sequence (rekkefølge)
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

  // Normaliser kategoripoeng til 0–100
  for (const c of Object.keys(byCategory) as CategoryId[]) {
    const total = categoryTotals[c];
    byCategory[c] = total > 0 ? (byCategory[c] / total) * 100 : 0;
  }

  // Samlet prosent
  const percent = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;

  // Estimert IQ (lineær mapping: mean = 100, SD = 15)
  const iqEstimate = Math.round(100 + ((percent - 50) / 50) * 15);

  return { totalScore, maxScore, percent, byCategory, iqEstimate };
}

/* ---------- Optional i18n-aware label helper ---------- */

/**
 * Returnerer tekstlig tolkning av IQ-nivå.
 * Kan bruke i18n-dict for oversettelse.
 */
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
