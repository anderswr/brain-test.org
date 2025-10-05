// /data/question_index.ts
import { Question } from "@/lib/types";

// Importer kategorier
import { REASONING_QUESTIONS } from "@/data/reasoning";
import { MATH_QUESTIONS } from "@/data/math";
import { VERBAL_QUESTIONS } from "@/data/verbal";
import { SPATIAL_QUESTIONS } from "@/data/spatial";
import { MEMORY_QUESTIONS } from "@/data/memory";

// Importer fasit (for scoring/logging/debug)
import { REASONING_ANSWER_KEY } from "@/data/reasoning_answer_key";
import { MATH_ANSWER_KEY } from "@/data/math_answer_key";
import { VERBAL_ANSWER_KEY } from "@/data/verbal_answer_key";
import { SPATIAL_ANSWER_KEY } from "@/data/spatial_answer_key";
import { MEMORY_ANSWER_KEY } from "@/data/memory_answer_key";

// Kategorivis mapping
export const CATEGORY_INDEX = {
  reasoning: REASONING_QUESTIONS,
  math: MATH_QUESTIONS,
  verbal: VERBAL_QUESTIONS,
  spatial: SPATIAL_QUESTIONS,
  memory: MEMORY_QUESTIONS
};

// Samlet spørsmålbank (alle kategorier)
export const QUESTION_BANK: Question[] = [
  ...REASONING_QUESTIONS,
  ...MATH_QUESTIONS,
  ...VERBAL_QUESTIONS,
  ...SPATIAL_QUESTIONS,
  ...MEMORY_QUESTIONS
];

// Samlet fasit for alle kategorier
export const ANSWER_KEY = {
  ...REASONING_ANSWER_KEY,
  ...MATH_ANSWER_KEY,
  ...VERBAL_ANSWER_KEY,
  ...SPATIAL_ANSWER_KEY,
  ...MEMORY_ANSWER_KEY
};

// Praktisk helper: liste med alle kategorinavn
export const ALL_CATEGORY_IDS = Object.keys(CATEGORY_INDEX);

// Versjon (oppdater ved endring)
export const BANK_VERSION = "2.0.0" as const;
