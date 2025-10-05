// /data/reasoning_answer_key.ts
import { AnswerValue } from "@/lib/types";

/**
 * Answer key for all reasoning questions.
 * Each entry gives the correct answer value, suitable for automatic scoring.
 * - For multiple / matrix / visual: number (index 0–3)
 * - For sequence: number[] (correct order indices)
 * - For recall (if any): string[] or number[]
 */

export const REASONING_ANSWER_KEY: Record<string, AnswerValue> = {
  // multiple-choice & matrix / visual
  r1: 1,
  r2: 3,
  r3: 1,
  r4: 0,
  r5: 2,
  r6: 0,
  r7: 2,
  r8: 1,
  r9: 3,
  r10: 0,
  // sequence
  r11: [3, 1, 0, 2],
  r12: [1, 3, 0, 2],
  r13: [4, 2, 0, 1, 3],
  r14: [2, 0, 3, 1],
  // visual
  r15: 2,
  r16: 0,
  r17: 1,
  r18: 3,
  // matrix
  r19: 1,
  r20: 2,
  // multiple
  r21: 0,
  r22: 2,
  r23: 1,
  r24: 3,
  // sequence
  r25: [2, 0, 3, 1],
  r26: [1, 4, 2, 0, 3],
  // visual
  r27: 2,
  r28: 0,
  // matrix
  r29: 3,
  r30: 1,
  // multiple
  r31: 2,
  r32: 1,
  r33: 0,
  r34: 2,
  // sequence
  r35: [1, 3, 0, 2],
  r36: [2, 4, 1, 3, 0],
  // visual/matrix
  r37: 3,
  r38: 0,
  // multiple
  r39: 2,
  r40: 1
};
