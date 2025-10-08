// /data/reasoning.ts
import { CategoryId, Question } from "@/lib/types";

/**
 * Reasoning questions — flat i18n keys
 * Example:
 *   "q-reasoning-01"       → question text
 *   "q-reasoning-01-a" ... → multiple choice options
 *   "q-reasoning-11-i1" .. → sequence items
 */

export const REASONING_QUESTIONS: Question[] = [
  // --- Multiple-choice (text-based) ---
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `r${i + 1}`,
    kind: "multiple" as const,
    category: CategoryId.Reasoning,
    textKey: `q-reasoning-${i + 1}`,
    optionsKey: [
      `q-reasoning-${i + 1}-a`,
      `q-reasoning-${i + 1}-b`,
      `q-reasoning-${i + 1}-c`,
      `q-reasoning-${i + 1}-d`,
    ],
    correctIndex: (i * 2 + 1) % 4,
  })),

  // --- Sequence (ordering logic) ---
  ...Array.from({ length: 4 }, (_, i) => {
    const base = `q-reasoning-${11 + i}`;
    return {
      id: `r${11 + i}`,
      kind: "sequence" as const,
      category: CategoryId.Reasoning,
      textKey: base,
      itemsKey: [`${base}-i1`, `${base}-i2`, `${base}-i3`, `${base}-i4`],
      answerSequence: [`${base}-i4`, `${base}-i2`, `${base}-i1`, `${base}-i3`],
      partialCredit: true,
    };
  }),

  // --- Visual (PNG + MCQ) ---
  ...Array.from({ length: 4 }, (_, i) => ({
    id: `r${15 + i}`,
    kind: "visual" as const,
    category: CategoryId.Reasoning,
    textKey: `q-reasoning-${15 + i}`,
    image: `/assets/img/q/reasoning/r${15 + i}.png`,
    optionsKey: [
      `q-reasoning-${15 + i}-a`,
      `q-reasoning-${15 + i}-b`,
      `q-reasoning-${15 + i}-c`,
      `q-reasoning-${15 + i}-d`,
    ],
    correctIndex: (i + 2) % 4,
  })),

  // --- Matrix (PNG + MCQ) ---
  ...Array.from({ length: 2 }, (_, i) => ({
    id: `r${19 + i}`,
    kind: "matrix" as const,
    category: CategoryId.Reasoning,
    textKey: `q-reasoning-${19 + i}`,
    image: `/assets/img/q/reasoning/r${19 + i}.png`,
    optionsKey: [
      `q-reasoning-${19 + i}-a`,
      `q-reasoning-${19 + i}-b`,
      `q-reasoning-${19 + i}-c`,
      `q-reasoning-${19 + i}-d`,
    ],
    correctIndex: (i + 1) % 4,
  })),

  // --- Multiple (text) continued ---
  ...Array.from({ length: 4 }, (_, i) => ({
    id: `r${21 + i}`,
    kind: "multiple" as const,
    category: CategoryId.Reasoning,
    textKey: `q-reasoning-${21 + i}`,
    optionsKey: [
      `q-reasoning-${21 + i}-a`,
      `q-reasoning-${21 + i}-b`,
      `q-reasoning-${21 + i}-c`,
      `q-reasoning-${21 + i}-d`,
    ],
    correctIndex: (i + 2) % 4,
  })),

  // --- Sequence (more) ---
  ...Array.from({ length: 2 }, (_, i) => {
    const base = `q-reasoning-${25 + i}`;
    return {
      id: `r${25 + i}`,
      kind: "sequence" as const,
      category: CategoryId.Reasoning,
      textKey: base,
      itemsKey: [`${base}-i1`, `${base}-i2`, `${base}-i3`, `${base}-i4`],
      answerSequence: [`${base}-i3`, `${base}-i1`, `${base}-i4`, `${base}-i2`],
      partialCredit: true,
    };
  }),

  // --- Visual (continued) ---
  ...Array.from({ length: 2 }, (_, i) => ({
    id: `r${27 + i}`,
    kind: "visual" as const,
    category: CategoryId.Reasoning,
    textKey: `q-reasoning-${27 + i}`,
    image: `/assets/img/q/reasoning/r${27 + i}.png`,
    optionsKey: [
      `q-reasoning-${27 + i}-a`,
      `q-reasoning-${27 + i}-b`,
      `q-reasoning-${27 + i}-c`,
      `q-reasoning-${27 + i}-d`,
    ],
    correctIndex: (i + 2) % 4,
  })),

  // --- Matrix (continued) ---
  ...Array.from({ length: 2 }, (_, i) => ({
    id: `r${29 + i}`,
    kind: "matrix" as const,
    category: CategoryId.Reasoning,
    textKey: `q-reasoning-${29 + i}`,
    image: `/assets/img/q/reasoning/r${29 + i}.png`,
    optionsKey: [
      `q-reasoning-${29 + i}-a`,
      `q-reasoning-${29 + i}-b`,
      `q-reasoning-${29 + i}-c`,
      `q-reasoning-${29 + i}-d`,
    ],
    correctIndex: (i + 3) % 4,
  })),

  // --- Final multiple batch ---
  ...Array.from({ length: 4 }, (_, i) => ({
    id: `r${31 + i}`,
    kind: "multiple" as const,
    category: CategoryId.Reasoning,
    textKey: `q-reasoning-${31 + i}`,
    optionsKey: [
      `q-reasoning-${31 + i}-a`,
      `q-reasoning-${31 + i}-b`,
      `q-reasoning-${31 + i}-c`,
      `q-reasoning-${31 + i}-d`,
    ],
    correctIndex: (i + 1) % 4,
  })),

  // --- Sequence (final set) ---
  ...Array.from({ length: 2 }, (_, i) => {
    const base = `q-reasoning-${35 + i}`;
    return {
      id: `r${35 + i}`,
      kind: "sequence" as const,
      category: CategoryId.Reasoning,
      textKey: base,
      itemsKey: [`${base}-i1`, `${base}-i2`, `${base}-i3`, `${base}-i4`],
      answerSequence: [`${base}-i2`, `${base}-i4`, `${base}-i1`, `${base}-i3`],
      partialCredit: true,
    };
  }),

  // --- Visual + Matrix wrap-up ---
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
