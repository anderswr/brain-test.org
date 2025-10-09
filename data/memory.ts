// /data/memory.ts
import { CategoryId, Question } from "@/lib/types";

/**
 * MEMORY MODULE (40 questions total)
 * Flat key format for i18n: q-memory-01, q-memory-01-a, q-memory-01-i1, etc.
 */

const baseQs: Question[] = [
  {
    id: "mem1",
    kind: "multiple",
    category: CategoryId.Memory,
    textKey: "q-memory-01",
    optionsKey: ["q-memory-01-a", "q-memory-01-b", "q-memory-01-c", "q-memory-01-d"],
    correctIndex: 1,
  },
  {
    id: "mem2",
    kind: "multiple",
    category: CategoryId.Memory,
    textKey: "q-memory-02",
    optionsKey: ["q-memory-02-a", "q-memory-02-b", "q-memory-02-c", "q-memory-02-d"],
    correctIndex: 2,
  },
  {
    id: "mem3",
    kind: "multiple",
    category: CategoryId.Memory,
    textKey: "q-memory-03",
    optionsKey: ["q-memory-03-a", "q-memory-03-b", "q-memory-03-c", "q-memory-03-d"],
    correctIndex: 3,
  },
  {
    id: "mem4",
    kind: "multiple",
    category: CategoryId.Memory,
    textKey: "q-memory-04",
    optionsKey: ["q-memory-04-a", "q-memory-04-b", "q-memory-04-c", "q-memory-04-d"],
    correctIndex: 1,
  },
  {
    id: "mem5",
    kind: "multiple",
    category: CategoryId.Memory,
    textKey: "q-memory-05",
    optionsKey: ["q-memory-05-a", "q-memory-05-b", "q-memory-05-c", "q-memory-05-d"],
    correctIndex: 0,
  },
  {
    id: "mem6",
    kind: "multiple",
    category: CategoryId.Memory,
    textKey: "q-memory-06",
    optionsKey: ["q-memory-06-a", "q-memory-06-b", "q-memory-06-c", "q-memory-06-d"],
    correctIndex: 0,
  },
  {
    id: "mem7",
    kind: "multiple",
    category: CategoryId.Memory,
    textKey: "q-memory-07",
    optionsKey: ["q-memory-07-a", "q-memory-07-b", "q-memory-07-c", "q-memory-07-d"],
    correctIndex: 1,
  },
  {
    id: "mem8",
    kind: "multiple",
    category: CategoryId.Memory,
    textKey: "q-memory-08",
    optionsKey: ["q-memory-08-a", "q-memory-08-b", "q-memory-08-c", "q-memory-08-d"],
    correctIndex: 1,
  },
  {
    id: "mem9",
    kind: "multiple",
    category: CategoryId.Memory,
    textKey: "q-memory-09",
    optionsKey: ["q-memory-09-a", "q-memory-09-b", "q-memory-09-c", "q-memory-09-d"],
    correctIndex: 0,
  },
  {
    id: "mem10",
    kind: "multiple",
    category: CategoryId.Memory,
    textKey: "q-memory-10",
    optionsKey: ["q-memory-10-a", "q-memory-10-b", "q-memory-10-c", "q-memory-10-d"],
    correctIndex: 3,
  },
  {
    id: "mem11",
    kind: "multiple",
    category: CategoryId.Memory,
    textKey: "q-memory-11",
    optionsKey: ["q-memory-11-a", "q-memory-11-b", "q-memory-11-c", "q-memory-11-d"],
    correctIndex: 0,
  },
  {
    id: "mem12",
    kind: "multiple",
    category: CategoryId.Memory,
    textKey: "q-memory-12",
    optionsKey: ["q-memory-12-a", "q-memory-12-b", "q-memory-12-c", "q-memory-12-d"],
    correctIndex: 2,
  },
  {
    id: "mem13",
    kind: "multiple",
    category: CategoryId.Memory,
    textKey: "q-memory-13",
    optionsKey: ["q-memory-13-a", "q-memory-13-b", "q-memory-13-c", "q-memory-13-d"],
    correctIndex: 0,
  },
  {
    id: "mem14",
    kind: "multiple",
    category: CategoryId.Memory,
    textKey: "q-memory-14",
    optionsKey: ["q-memory-14-a", "q-memory-14-b", "q-memory-14-c", "q-memory-14-d"],
    correctIndex: 1,
  },
];

// --- Visual recall (15–23) ---
const visualQs: Question[] = Array.from({ length: 9 }, (_, i) => ({
  id: `mem${15 + i}`,
  kind: "visual" as const,
  category: CategoryId.Memory,
  textKey: `q-memory-${15 + i}`,
  image: `/assets/img/q/memory/mem_${15 + i}.png`,
  optionsKey: [
    `q-memory-${15 + i}-a`,
    `q-memory-${15 + i}-b`,
    `q-memory-${15 + i}-c`,
    `q-memory-${15 + i}-d`,
  ],
  correctIndex: (i + 1) % 4,
}));

// --- Additional multiple choice (24–32) ---
const multiQs: Question[] = Array.from({ length: 9 }, (_, i) => ({
  id: `mem${24 + i}`,
  kind: "multiple" as const,
  category: CategoryId.Memory,
  textKey: `q-memory-${24 + i}`,
  optionsKey: [
    `q-memory-${24 + i}-a`,
    `q-memory-${24 + i}-b`,
    `q-memory-${24 + i}-c`,
    `q-memory-${24 + i}-d`,
  ],
  correctIndex: (i + 2) % 4,
}));

// --- Sequence recall (33–40) ---
const seqQs: Question[] = Array.from({ length: 8 }, (_, i) => {
  const base = `q-memory-${33 + i}`;
  return {
    id: `mem${33 + i}`,
    kind: "sequence" as const,
    category: CategoryId.Memory,
    textKey: base,
    itemsKey: [`${base}-i1`, `${base}-i2`, `${base}-i3`, `${base}-i4`],
    answerSequence: [`${base}-i1`, `${base}-i2`, `${base}-i3`, `${base}-i4`],
    partialCredit: true,
  };
});

export const MEMORY_QUESTIONS: Question[] = [...baseQs, ...visualQs, ...multiQs, ...seqQs];

// --- Answer key (for quick lookup, only used for MCQ-like types) ---
export const ANSWER_KEY_MEMORY: Record<string, number> = Object.fromEntries(
  MEMORY_QUESTIONS.map((q) => [q.id, (q as any).correctIndex ?? -1])
);
