// /data/memory.ts
import { CategoryId, Question } from "@/lib/types";

/**
 * MEMORY MODULE (40 questions total)
 * Unified ID format: q-memory-XX
 * Flat key format for i18n: q-memory-01, q-memory-01-a, q-memory-01-i1, etc.
 */

// --- Base multiple-choice (01–14) ---
const baseQs: Question[] = Array.from({ length: 14 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  const id = `q-memory-${n}`;
  return {
    id,
    kind: "multiple" as const,
    category: CategoryId.Memory,
    textKey: id,
    optionsKey: [
      `${id}-a`,
      `${id}-b`,
      `${id}-c`,
      `${id}-d`,
    ],
    correctIndex: (i + 1) % 4,
  };
});

// --- Visual recall (15–23) ---
const visualQs: Question[] = Array.from({ length: 9 }, (_, i) => {
  const n = String(15 + i).padStart(2, "0");
  const id = `q-memory-${n}`;
  return {
    id,
    kind: "visual" as const,
    category: CategoryId.Memory,
    textKey: id,
    image: `/assets/img/q/memory/mem_${n}.png`,
    optionsKey: [
      `${id}-a`,
      `${id}-b`,
      `${id}-c`,
      `${id}-d`,
    ],
    correctIndex: (i + 1) % 4,
  };
});

// --- Additional multiple choice (24–32) ---
const multiQs: Question[] = Array.from({ length: 9 }, (_, i) => {
  const n = String(24 + i).padStart(2, "0");
  const id = `q-memory-${n}`;
  return {
    id,
    kind: "multiple" as const,
    category: CategoryId.Memory,
    textKey: id,
    optionsKey: [
      `${id}-a`,
      `${id}-b`,
      `${id}-c`,
      `${id}-d`,
    ],
    correctIndex: (i + 2) % 4,
  };
});

// --- Sequence recall (33–40) ---
const seqQs: Question[] = [
  // ✅ q-memory-33 is multiple-choice
  {
    id: "q-memory-33",
    kind: "multiple",
    category: CategoryId.Memory,
    textKey: "q-memory-33",
    optionsKey: [
      "q-memory-33-a",
      "q-memory-33-b",
      "q-memory-33-c",
      "q-memory-33-d",
    ],
    correctIndex: 0, // Cat
  },

  // ✅ 34–40 are sequence-type
  ...Array.from({ length: 7 }, (_, i) => {
    const n = String(34 + i).padStart(2, "0");
    const id = `q-memory-${n}`;
    return {
      id,
      kind: "sequence" as const,
      category: CategoryId.Memory,
      textKey: id,
      itemsKey: [`${id}-i1`, `${id}-i2`, `${id}-i3`, `${id}-i4`],
      answerSequence: [0, 1, 2, 3], // index-based, not strings
      partialCredit: true,
    };
  }),
];

// --- Export all combined ---
export const MEMORY_QUESTIONS: Question[] = [...baseQs, ...visualQs, ...multiQs, ...seqQs];

// --- Answer key (for quick lookup, only used for MCQ-like types) ---
export const ANSWER_KEY_MEMORY: Record<string, number> = Object.fromEntries(
  MEMORY_QUESTIONS.map((q) => [q.id, (q as any).correctIndex ?? -1])
);
