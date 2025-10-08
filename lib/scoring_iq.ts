// /lib/scoring_iq.ts
import { computeResult, toIQResultDTO, iqLabel as iqLabelBase } from "@/lib/scoring";
import { CATEGORY_INDEX } from "@/data/question_index";
import { AnswerMap, CategoryId, Question } from "@/lib/types";

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
 * og fyller ut manglende kategorier med 50%.
 */
export function computeIQ(answers: AnswerMap): IQResult {
  // fallback hvis helt tomt
  if (!answers || Object.keys(answers).length === 0) {
    return makeFallbackIQ();
  }

  // slå sammen alle spørsmål fra kategoriene
  const allQuestions: Question[] = Object.values(CATEGORY_INDEX).flat();

  // beregn resultat
  const computed = computeResult(allQuestions, answers);
  const dto = toIQResultDTO(computed);

  // sikkerhetsnett: fyll ut kategorier som mangler
  const allCats: CategoryId[] = [
    "reasoning",
    "math",
    "verbal",
    "spatial",
    "memory",
  ];
  for (const cat of allCats) {
    if (!dto.perCategory[cat]) {
      dto.perCategory[cat] = { percent: 50 };
    }
  }

  return dto;
}

/* ---------- Fallback ---------- */
function makeFallbackIQ(): IQResult {
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

/* ---------- Optional: i18n label helper ---------- */
export const iqLabel = iqLabelBase;
