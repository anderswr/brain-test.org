// /data/question_index.ts
import { Question } from "@/lib/types";
import { REASONING_QUESTIONS } from "@/data/reasoning";
import { MATH_QUESTIONS } from "@/data/math";
import { VERBAL_QUESTIONS } from "@/data/verbal";
import { SPATIAL_QUESTIONS } from "@/data/spatial";
import { MEMORY_QUESTIONS } from "@/data/memory";

/** --- Helper utilities --- */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function sample<T>(arr: T[], n: number): T[] {
  if (n >= arr.length) return shuffle(arr);
  return shuffle(arr).slice(0, n);
}

/** --- Category registry --- */
export const CATEGORY_INDEX = {
  reasoning: REASONING_QUESTIONS,
  math: MATH_QUESTIONS,
  verbal: VERBAL_QUESTIONS,
  spatial: SPATIAL_QUESTIONS,
  memory: MEMORY_QUESTIONS,
};

/** --- Sample configuration --- */
const CATEGORY_SAMPLE = {
  reasoning: 8,
  math: 8,
  verbal: 8,
  spatial: 8,
  memory: 8,
};

/** --- Combined question pool (balanced & shuffled) --- */
export const QUESTION_BANK: Question[] = shuffle([
  ...sample(REASONING_QUESTIONS, CATEGORY_SAMPLE.reasoning),
  ...sample(MATH_QUESTIONS, CATEGORY_SAMPLE.math),
  ...sample(VERBAL_QUESTIONS, CATEGORY_SAMPLE.verbal),
  ...sample(SPATIAL_QUESTIONS, CATEGORY_SAMPLE.spatial),
  ...sample(MEMORY_QUESTIONS, CATEGORY_SAMPLE.memory),
]);

/** --- Meta --- */
export const ALL_CATEGORY_IDS = Object.keys(CATEGORY_INDEX);
export const BANK_VERSION = "2.1.0" as const;

console.log(
  `[IQ-Test] Loaded ${QUESTION_BANK.length} shuffled questions:`,
  Object.fromEntries(Object.entries(CATEGORY_SAMPLE))
);
