// /data/math.ts
import { CategoryId, Question } from "@/lib/types";

/**
 * Math questions — unified ID + textKey format.
 * Example:
 *   "q-math-01"       → question text
 *   "q-math-01-a" ... → answer choices
 *   "q-math-11-i1" .. → sequence items
 */
export const MATH_QUESTIONS: Question[] = [
  // --- Multiple choice numeric patterns (01–10) ---
  ...Array.from({ length: 10 }, (_, i) => {
    const n = String(i + 1).padStart(2, "0");
    const id = `q-math-${n}`;
    return {
      id,
      kind: "multiple" as const,
      category: CategoryId.Math,
      textKey: id,
      optionsKey: [`${id}-a`, `${id}-b`, `${id}-c`, `${id}-d`],
      correctIndex: (i + 2) % 4,
    };
  }),

  // --- Sequence ordering (11–12) ---
  ...Array.from({ length: 2 }, (_, i) => {
    const n = String(11 + i).padStart(2, "0");
    const id = `q-math-${n}`;
    return {
      id,
      kind: "sequence" as const,
      category: CategoryId.Math,
      textKey: id,
      itemsKey: [`${id}-i1`, `${id}-i2`, `${id}-i3`, `${id}-i4`],
      answerSequence: i === 0 ? [3, 2, 1, 0] : [1, 2, 0, 3],
      partialCredit: true,
    };
  }),

  // --- Visual/matrix (13–14) ---
  {
    id: "q-math-13",
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
    id: "q-math-14",
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
    const id = `q-math-${n}`;

    // 🔸 Special rule: 23 & 24 are SEQUENCE-type
    if (n === "23" || n === "24") {
      return {
        id,
        kind: "sequence" as const,
        category: CategoryId.Math,
        textKey: id,
        itemsKey: [`${id}-i1`, `${id}-i2`, `${id}-i3`, `${id}-i4`],
        answerSequence: n === "23" ? [0, 2, 3, 1] : [3, 1, 0, 2],
        partialCredit: true,
      };
    }

    // Default multiple choice
    return {
      id,
      kind: "multiple" as const,
      category: CategoryId.Math,
      textKey: id,
      optionsKey: [`${id}-a`, `${id}-b`, `${id}-c`, `${id}-d`],
      correctIndex: (i * 3) % 4,
    };
  }),
];

// --- Answer key ---
export const ANSWER_KEY_MATH: Record<string, number> = Object.fromEntries(
  MATH_QUESTIONS.map((q) => [q.id, (q as any).correctIndex ?? -1])
);
