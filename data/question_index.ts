// /data/question_index.ts
import { Question } from "@/lib/types";
import { REASONING_QUESTIONS } from "@/data/reasoning";
import { MATH_QUESTIONS } from "@/data/math";
import { VERBAL_QUESTIONS } from "@/data/verbal";
import { SPATIAL_QUESTIONS } from "@/data/spatial";
import { MEMORY_QUESTIONS } from "@/data/memory";

/**
 * Unified question registry for the entire IQ test.
 * Used only as a category index — actual random selection
 * now happens client-side at runtime (see /app/test/page.tsx).
 */

/** --- Category registry --- */
export const CATEGORY_INDEX = {
  reasoning: REASONING_QUESTIONS,
  math: MATH_QUESTIONS,
  verbal: VERBAL_QUESTIONS,
  spatial: SPATIAL_QUESTIONS,
  memory: MEMORY_QUESTIONS,
};

/** --- Meta --- */
export const ALL_CATEGORY_IDS = Object.keys(CATEGORY_INDEX);
export const BANK_VERSION = "2.1.0" as const;

/**
 * ⚙️ Development-only debug log
 * (Avoid console output during production builds on Vercel)
 */
if (process.env.NODE_ENV !== "production") {
  const total = Object.values(CATEGORY_INDEX)
    .map((q) => q.length)
    .reduce((a, b) => a + b, 0);
  console.log(`[IQ-Test] Loaded question banks (${total} total items).`);
}
