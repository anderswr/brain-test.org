// /data/reasoning.ts
import { CategoryId, Question } from "@/lib/types";

/**
 * REASONING QUESTIONS (40 items total)
 * Flat i18n keys:
 *   "q-reasoning-01"       → question text
 *   "q-reasoning-01-a" ... → multiple choice options
 *   "q-reasoning-11-i1" .. → sequence items
 */

export const REASONING_QUESTIONS: Question[] = [
  // --- Multiple-choice (1–10) ---
  ...Array.from({ length: 10 }, (_, i) => {
    const n = String(i + 1).padStart(2, "0");
    return {
      id: `r${i + 1}`,
      kind: "multiple" as const,
      category: CategoryId.Reasoning,
      textKey: `q-reasoning-${n}`,
      optionsKey: [
        `q-reasoning-${n}-a`,
        `q-reasoning-${n}-b`,
        `q-reasoning-${n}-c`,
        `q-reasoning-${n}-d`,
      ],
      correctIndex: (i * 2 + 1) % 4,
    };
  }),

  // --- Sequence (11–14) ---
  ...Array.from({ length: 4 }, (_, i) => {
    const n = String(11 + i).padStart(2, "0");
    return {
      id: `r${11 + i}`,
      kind: "sequence" as const,
      category: CategoryId.Reasoning,
      textKey: `q-reasoning-${n}`,
      itemsKey: [
        `q-reasoning-${n}-i1`,
        `q-reasoning-${n}-i2`,
        `q-reasoning-${n}-i3`,
        `q-reasoning-${n}-i4`,
      ],
      answerSequence: [3, 1, 0, 2], // ✅ numeric indices
      partialCredit: true,
    };
  }),

  // --- Visual (15–18) ---
  ...Array.from({ length: 4 }, (_, i) => {
    const n = String(15 + i).padStart(2, "0");
    return {
      id: `r${15 + i}`,
      kind: "visual" as const,
      category: CategoryId.Reasoning,
      textKey: `q-reasoning-${n}`,
      image: `/assets/img/q/reasoning/r${n}.png`,
      optionsKey: [
        `q-reasoning-${n}-a`,
        `q-reasoning-${n}-b`,
        `q-reasoning-${n}-c`,
        `q-reasoning-${n}-d`,
      ],
      correctIndex: (i + 2) % 4,
    };
  }),

  // --- Matrix (19–20) ---
  ...Array.from({ length: 2 }, (_, i) => {
    const n = String(19 + i).padStart(2, "0");
    return {
      id: `r${19 + i}`,
      kind: "matrix" as const,
      category: CategoryId.Reasoning,
      textKey: `q-reasoning-${n}`,
      image: `/assets/img/q/reasoning/r${n}.png`,
      optionsKey: [
        `q-reasoning-${n}-a`,
        `q-reasoning-${n}-b`,
        `q-reasoning-${n}-c`,
        `q-reasoning-${n}-d`,
      ],
      correctIndex: (i + 1) % 4,
    };
  }),

  // --- Multiple continued (21–24) ---
  ...Array.from({ length: 4 }, (_, i) => {
    const n = String(21 + i).padStart(2, "0");
    return {
      id: `r${21 + i}`,
      kind: "multiple" as const,
      category: CategoryId.Reasoning,
      textKey: `q-reasoning-${n}`,
      optionsKey: [
        `q-reasoning-${n}-a`,
        `q-reasoning-${n}-b`,
        `q-reasoning-${n}-c`,
        `q-reasoning-${n}-d`,
      ],
      correctIndex: (i + 2) % 4,
    };
  }),

  // --- Sequence (25–26) ---
  ...Array.from({ length: 2 }, (_, i) => {
    const n = String(25 + i).padStart(2, "0");
    return {
      id: `r${25 + i}`,
      kind: "sequence" as const,
      category: CategoryId.Reasoning,
      textKey: `q-reasoning-${n}`,
      itemsKey: [
        `q-reasoning-${n}-i1`,
        `q-reasoning-${n}-i2`,
        `q-reasoning-${n}-i3`,
        `q-reasoning-${n}-i4`,
      ],
      answerSequence: [2, 0, 3, 1],
      partialCredit: true,
    };
  }),

  // --- Visual (27–28) ---
  ...Array.from({ length: 2 }, (_, i) => {
    const n = String(27 + i).padStart(2, "0");
    return {
      id: `r${27 + i}`,
      kind: "visual" as const,
      category: CategoryId.Reasoning,
      textKey: `q-reasoning-${n}`,
      image: `/assets/img/q/reasoning/r${n}.png`,
      optionsKey: [
        `q-reasoning-${n}-a`,
        `q-reasoning-${n}-b`,
        `q-reasoning-${n}-c`,
        `q-reasoning-${n}-d`,
      ],
      correctIndex: (i + 2) % 4,
    };
  }),

  // --- Matrix (29–30) ---
  ...Array.from({ length: 2 }, (_, i) => {
    const n = String(29 + i).padStart(2, "0");
    return {
      id: `r${29 + i}`,
      kind: "matrix" as const,
      category: CategoryId.Reasoning,
      textKey: `q-reasoning-${n}`,
      image: `/assets/img/q/reasoning/r${n}.png`,
      optionsKey: [
        `q-reasoning-${n}-a`,
        `q-reasoning-${n}-b`,
        `q-reasoning-${n}-c`,
        `q-reasoning-${n}-d`,
      ],
      correctIndex: (i + 3) % 4,
    };
  }),

  // --- Multiple (31–34) ---
  ...Array.from({ length: 4 }, (_, i) => {
    const n = String(31 + i).padStart(2, "0");
    return {
      id: `r${31 + i}`,
      kind: "multiple" as const,
      category: CategoryId.Reasoning,
      textKey: `q-reasoning-${n}`,
      optionsKey: [
        `q-reasoning-${n}-a`,
        `q-reasoning-${n}-b`,
        `q-reasoning-${n}-c`,
        `q-reasoning-${n}-d`,
      ],
      correctIndex: (i + 1) % 4,
    };
  }),

  // --- Sequence (35–36) ---
  ...Array.from({ length: 2 }, (_, i) => {
    const n = String(35 + i).padStart(2, "0");
    return {
      id: `r${35 + i}`,
      kind: "sequence" as const,
      category: CategoryId.Reasoning,
      textKey: `q-reasoning-${n}`,
      itemsKey: [
        `q-reasoning-${n}-i1`,
        `q-reasoning-${n}-i2`,
        `q-reasoning-${n}-i3`,
        `q-reasoning-${n}-i4`,
      ],
      answerSequence: [1, 3, 0, 2],
      partialCredit: true,
    };
  }),

  // --- Visual & Matrix wrap-up (37–38) ---
  {
    id: "r37",
    kind: "visual",
    category: CategoryId.Reasoning,
    textKey: "q-reasoning-37",
    image: "/assets/img/q/reasoning/r37.png",
    optionsKey: [
      "q-reasoning-37-a",
      "q-reasoning-37-b",
      "q-reasoning-37-c",
      "q-reasoning-37-d",
    ],
    correctIndex: 3,
  },
  {
    id: "r38",
    kind: "matrix",
    category: CategoryId.Reasoning,
    textKey: "q-reasoning-38",
    image: "/assets/img/q/reasoning/r38.png",
    optionsKey: [
      "q-reasoning-38-a",
      "q-reasoning-38-b",
      "q-reasoning-38-c",
      "q-reasoning-38-d",
    ],
    correctIndex: 0,
  },

  // --- Final multiple (39–40) ---
  {
    id: "r39",
    kind: "multiple",
    category: CategoryId.Reasoning,
    textKey: "q-reasoning-39",
    optionsKey: [
      "q-reasoning-39-a",
      "q-reasoning-39-b",
      "q-reasoning-39-c",
      "q-reasoning-39-d",
    ],
    correctIndex: 2,
  },
  {
    id: "r40",
    kind: "multiple",
    category: CategoryId.Reasoning,
    textKey: "q-reasoning-40",
    optionsKey: [
      "q-reasoning-40-a",
      "q-reasoning-40-b",
      "q-reasoning-40-c",
      "q-reasoning-40-d",
    ],
    correctIndex: 1,
  },
];

// --- Answer key ---
export const ANSWER_KEY_REASONING: Record<string, number> = Object.fromEntries(
  REASONING_QUESTIONS.map((q) => [q.id, (q as any).correctIndex ?? -1])
);
