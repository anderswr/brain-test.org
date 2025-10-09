// /data/math.ts
import { CategoryId, Question } from "@/lib/types";

/**
 * Math questions — using flat i18n key format.
 * Example:
 *   "q-math-01"       → question text
 *   "q-math-01-a" ... → answer choices
 *   "q-math-11-i1" .. → sequence items
 */
export const MATH_QUESTIONS: Question[] = [
  // --- Multiple choice numeric patterns ---
  ...Array.from({ length: 10 }, (_, i) => {
    const n = String(i + 1).padStart(2, "0");
    return {
      id: `m${i + 1}`,
      kind: "multiple" as const,
      category: CategoryId.Math,
      textKey: `q-math-${n}`,
      optionsKey: [
        `q-math-${n}-a`,
        `q-math-${n}-b`,
        `q-math-${n}-c`,
        `q-math-${n}-d`,
      ],
      correctIndex: (i + 2) % 4,
    };
  }),

  // --- Sequence ordering ---
  {
    id: "m11",
    kind: "sequence",
    category: CategoryId.Math,
    textKey: "q-math-11",
    itemsKey: ["q-math-11-i1", "q-math-11-i2", "q-math-11-i3", "q-math-11-i4"],
    answerSequence: [3, 2, 1, 0], // ✅ numeric indices, not strings
    partialCredit: true,
  },
  {
    id: "m12",
    kind: "sequence",
    category: CategoryId.Math,
    textKey: "q-math-12",
    itemsKey: ["q-math-12-i1", "q-math-12-i2", "q-math-12-i3", "q-math-12-i4"],
    answerSequence: [1, 2, 0, 3], // ✅ numeric indices
    partialCredit: true,
  },

  // --- Visual/matrix ---
  {
    id: "m13",
    kind: "matrix",
    category: CategoryId.Math,
    textKey: "q-math-13",
    image: "/assets/img/q/math/m13.png",
    optionsKey: [
      "q-math-13-a",
      "q-math-13-b",
      "q-math-13-c",
      "q-math-13-d",
    ],
    correctIndex: 2,
  },
  {
    id: "m14",
    kind: "visual",
    category: CategoryId.Math,
    textKey: "q-math-14",
    image: "/assets/img/q/math/m14.png",
    optionsKey: [
      "q-math-14-a",
      "q-math-14-b",
      "q-math-14-c",
      "q-math-14-d",
    ],
    correctIndex: 1,
  },

  // --- Worded math problems and remaining (15–40) ---
  ...Array.from({ length: 26 }, (_, i) => {
    const n = String(15 + i).padStart(2, "0");
    return {
      id: `m${15 + i}`,
      kind: "multiple" as const,
      category: CategoryId.Math,
      textKey: `q-math-${n}`,
      optionsKey: [
        `q-math-${n}-a`,
        `q-math-${n}-b`,
        `q-math-${n}-c`,
        `q-math-${n}-d`,
      ],
      correctIndex: (i * 3) % 4,
    };
  }),
];

// --- Answer key ---
export const ANSWER_KEY_MATH: Record<string, number> = Object.fromEntries(
  MATH_QUESTIONS.map((q) => [q.id, (q as any).correctIndex ?? -1])
);
