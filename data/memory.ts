import { CategoryId, Question } from "@/lib/types";

/**
 * MEMORY MODULE (40 questions total)
 * Flat key format for i18n: q-memory-XX, q-memory-XX-a... or q-memory-XX-i1...
 * Some questions are "recallAfterView" — they require a stimulus (image/list) first.
 */

// --- Base multiple-choice (01–14) ---
const baseQs: Question[] = Array.from({ length: 14 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  const id = `q-memory-${n}`;

  const recallAfterViewList = [
    "05", "06", "07", "08", "09", "10",
    "15", "16", "17", "18", "19", "20",
    "21", "22", "23", "24", "25", "26",
    "27", "33", "34"
  ];
  const recallAfterView = recallAfterViewList.includes(n);

  return {
    id,
    kind: "multiple" as const,
    category: CategoryId.Memory,
    textKey: id,
    optionsKey: [`${id}-a`, `${id}-b`, `${id}-c`, `${id}-d`],
    correctIndex: (i + 1) % 4,
    ...(recallAfterView && {
      recallAfterView: true,
      previewImage: `/assets/img/q/memory/mem-${n}.png`,
    }),
  };
});

// --- Visual recall (15–23) ---
const visualQs: Question[] = Array.from({ length: 9 }, (_, i) => {
  const n = String(15 + i).padStart(2, "0");
  const id = `q-memory-${n}`;
  const recallAfterView = ["15","16","17","18","19","20","21","22","23"].includes(n);
  return {
    id,
    kind: "visual" as const,
    category: CategoryId.Memory,
    textKey: id,
    ...(recallAfterView
      ? {
          recallAfterView: true,
          previewImage: `/assets/img/q/memory/mem-${n}.png`, // 👈 only preview
        }
      : {
          image: `/assets/img/q/memory/mem-${n}.png`, // 👈 shown with question
        }),
    optionsKey: [`${id}-a`, `${id}-b`, `${id}-c`, `${id}-d`],
    correctIndex: (i + 1) % 4,
  };
});

// --- Additional multiple choice (24–32) ---
const multiQs: Question[] = Array.from({ length: 9 }, (_, i) => {
  const n = String(24 + i).padStart(2, "0");
  const id = `q-memory-${n}`;
  const recallAfterView = ["24","25","26","27","33","34"].includes(n);
  return {
    id,
    kind: "multiple" as const,
    category: CategoryId.Memory,
    textKey: id,
    optionsKey: [`${id}-a`, `${id}-b`, `${id}-c`, `${id}-d`],
    correctIndex: (i + 2) % 4,
    ...(recallAfterView && {
      recallAfterView: true,
      previewImage: `/assets/img/q/memory/mem-${n}.png`,
    }),
  };
});

// --- Mixed recall & sequence (33–40) ---
const seqQs: Question[] = [
  // 33 → recallAfterView multiple
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
    correctIndex: 0,
    recallAfterView: true,
    previewImage: "/assets/img/q/memory/mem-33.png",
  },

  // 34 → recallAfterView multiple
  {
    id: "q-memory-34",
    kind: "multiple",
    category: CategoryId.Memory,
    textKey: "q-memory-34",
    optionsKey: [
      "q-memory-34-a",
      "q-memory-34-b",
      "q-memory-34-c",
      "q-memory-34-d",
    ],
    correctIndex: 2,
    recallAfterView: true,
    previewImage: "/assets/img/q/memory/mem-34.png",
  },

  // 35 → sequence
  {
    id: "q-memory-35",
    kind: "sequence" as const,
    category: CategoryId.Memory,
    textKey: "q-memory-35",
    itemsKey: [
      "q-memory-35-i1",
      "q-memory-35-i2",
      "q-memory-35-i3",
      "q-memory-35-i4",
    ],
    answerSequence: [0, 1, 2, 3],
    partialCredit: true,
  },

  // 36 → regular multiple
  {
    id: "q-memory-36",
    kind: "multiple",
    category: CategoryId.Memory,
    textKey: "q-memory-36",
    optionsKey: [
      "q-memory-36-a",
      "q-memory-36-b",
      "q-memory-36-c",
      "q-memory-36-d",
    ],
    correctIndex: 2,
  },

  // 37–40 → multiple (ikke recall)
  ...Array.from({ length: 4 }, (_, i) => {
    const n = String(37 + i).padStart(2, "0");
    const id = `q-memory-${n}`;
    return {
      id,
      kind: "multiple" as const,
      category: CategoryId.Memory,
      textKey: id,
      optionsKey: [`${id}-a`, `${id}-b`, `${id}-c`, `${id}-d`],
      correctIndex: (i + 1) % 4,
    };
  }),
];

// --- Export all combined ---
export const MEMORY_QUESTIONS: Question[] = [
  ...baseQs,
  ...visualQs,
  ...multiQs,
  ...seqQs,
];

// --- Answer key ---
export const ANSWER_KEY_MEMORY: Record<string, number> = Object.fromEntries(
  MEMORY_QUESTIONS.map((q) => [q.id, "correctIndex" in q ? q.correctIndex : -1])
);
