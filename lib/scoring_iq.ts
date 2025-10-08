// /lib/scoring_iq.ts
import { computeResult, toIQResultDTO, iqLabel as iqLabelBase } from "@/lib/scoring";
import { QUESTION_BANK } from "@/data/question_index";
import { AnswerMap, CategoryId } from "@/lib/types";

/** Struktur frontend og API forventer */
export interface IQResult {
  iq: number;
  ci: [number, number];
  percent: number;
  perCategory: Record<CategoryId, { percent: number }>;
}

/**
 * Beregn IQ-resultat basert på brukerens svar.
 * Bruker moderne scoringsmotor fra lib/scoring.ts
 */
export function computeIQ(answers: AnswerMap): IQResult {
  if (!answers || Object.keys(answers).length === 0) {
    // Tom fallback
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

  const computed = computeResult(QUESTION_BANK, answers);
  return toIQResultDTO(computed);
}

/* ---------- Optional: i18n label helper ---------- */
export const iqLabel = iqLabelBase;
