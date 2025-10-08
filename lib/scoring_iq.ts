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

/** Beregn IQ-resultat basert på brukerens svar */
export function computeIQ(answers: AnswerMap): IQResult {
  if (!answers || Object.keys(answers).length === 0) {
    return makeFallbackIQ();
  }

  const allQuestions: Question[] = Object.values(CATEGORY_INDEX).flat();
  const computed = computeResult(allQuestions, answers);
  const dto = toIQResultDTO(computed);

  // sikkerhetsnett for alle kategorier
  const allCats = Object.keys(dto.perCategory) as CategoryId[];
  const requiredCats = Object.keys(CATEGORY_INDEX) as CategoryId[];
  for (const cat of requiredCats) {
    if (!allCats.includes(cat)) dto.perCategory[cat] = { percent: 50 };
  }

  return dto;
}

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

export const iqLabel = iqLabelBase;
