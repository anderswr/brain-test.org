 // /data/memory.ts
import { CategoryId, Question } from "@/lib/types";

/**
 * MEMORY MODULE (40 questions total)
 * Flat key format for i18n: q-memory-01, q-memory-01-a, q-memory-01-i1, etc.
 */

// --- Base multiple-choice (1–14) ---
const baseQs: Question[] = Array.from({ length: 14 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return {
    id: `mem${i + 1}`,
    kind: "multiple" as const,
    category: CategoryId.Memory,
    textKey: `q-memory-${n}`,
    optionsKey: [
      `q-memory-${n}-a`,
      `q-memory-${n}-b`,
      `q-memory-${n}-c`,
      `q-memory-${n}-d`,
    ],
    correctIndex: (i + 1) % 4,
  };
});

// --- Visual recall (15–23) ---
const visualQs: Question[] = Array.from({ length: 9 }, (_, i) => {
  const n = String(15 + i).padStart(2, "0");
  return {
    id: `mem${15 + i}`,
    kind: "visual" as const,
    category: CategoryId.Memory,
    textKey: `q-memory-${n}`,
    image: `/assets/img/q/memory/mem_${n}.png`,
    optionsKey: [
      `q-memory-${n}-a`,
      `q-memory-${n}-b`,
      `q-memory-${n}-c`,
      `q-memory-${n}-d`,
    ],
    correctIndex: (i + 1) % 4,
  };
});

// --- Additional multiple choice (24–32) ---
const multiQs: Question[] = Array.from({ length: 9 }, (_, i) => {
  const n = String(24 + i).padStart(2, "0");
  return {
    id: `mem${24 + i}`,
    kind: "multiple" as const,
    category: CategoryId.Memory,
    textKey: `q-memory-${n}`,
    optionsKey: [
      `q-memory-${n}-a`,
      `q-memory-${n}-b`,
      `q-memory-${n}-c`,
      `q-memory-${n}-d`,
    ],
    correctIndex: (i + 2) % 4,
  };
});

// --- Sequence recall (33–40) ---
const seqQs: Question[] = [
  // ✅ q-memory-33 er multiple choice
  {
    id: "mem33",
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

  // ✅ 34–40 er sequence-type
  ...Array.from({ length: 7 }, (_, i) => {
    const n = String(34 + i).padStart(2, "0");
    const base = `q-memory-${n}`;
    return {
      id: `mem${34 + i}`,
      kind: "sequence" as const,
      category: CategoryId.Memory,
      textKey: base,
      itemsKey: [`${base}-i1`, `${base}-i2`, `${base}-i3`, `${base}-i4`],
      answerSequence: [0, 1, 2, 3], // ✅ indeksbasert
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
