// /lib/scoring_iq.ts
import { ANSWER_KEY, CATEGORY_INDEX } from "@/data/question_index";
import { CategoryId, AnswerMap } from "@/lib/types";

interface IQResult {
  totalCorrect: number;
  totalQuestions: number;
  percent: number;
  zScore: number;
  iq: number;
  ci: [number, number];
  perCategory: Record<CategoryId, { correct: number; total: number; percent: number }>;
}

const DEFAULT_NORM = { mean: 70, sd: 15 };

// Optional empirical weight per domain
const CATEGORY_WEIGHTS: Record<CategoryId, number> = {
  reasoning: 1.0,
  math: 0.9,
  verbal: 1.0,
  spatial: 1.1,
  memory: 0.8
};

/** Compute IQ estimate */
export function computeIQ(answers: AnswerMap): IQResult {
  const perCategory: any = {};
  let totalCorrect = 0;
  let totalQuestions = 0;

  (Object.keys(CATEGORY_INDEX) as CategoryId[]).forEach(cat => {
    const qs = CATEGORY_INDEX[cat];
    const key = ANSWER_KEY as Record<string, any>;
    let correct = 0;

    qs.forEach(q => {
      const userAns = answers[q.id];
      const truth = key[q.id];
      if (!userAns || truth === undefined) return;
      if (Array.isArray(truth)) {
        // Sequence-type: partial credit
        const matchCount = truth.filter((v: any, i: number) => userAns[i] === v).length;
        correct += matchCount / truth.length;
      } else if (userAns === truth) {
        correct += 1;
      }
    });

    const total = qs.length;
    totalCorrect += correct * CATEGORY_WEIGHTS[cat];
    totalQuestions += total * CATEGORY_WEIGHTS[cat];
    perCategory[cat] = {
      correct,
      total,
      percent: (correct / total) * 100
    };
  });

  const percent = (totalCorrect / totalQuestions) * 100;

  // Convert to Z and IQ
  const z = (percent - DEFAULT_NORM.mean) / DEFAULT_NORM.sd;
  const iq = 100 + 15 * z;

  const sem = 15 / Math.sqrt(Object.keys(CATEGORY_INDEX).length);
  const ci: [number, number] = [iq - 1.96 * sem, iq + 1.96 * sem];

  return {
    totalCorrect,
    totalQuestions,
    percent,
    zScore: z,
    iq: Math.round(iq),
    ci: [Math.round(ci[0]), Math.round(ci[1])],
    perCategory
  };
}
