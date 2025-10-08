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
  {
    id: "m1",
    kind: "multiple",
    category: CategoryId.Math,
    textKey: "q-math-01",
    optionsKey: ["q-math-01-a", "q-math-01-b", "q-math-01-c", "q-math-01-d"],
    correctIndex: 2,
  },
  {
    id: "m2",
    kind: "multiple",
    category: CategoryId.Math,
    textKey: "q-math-02",
    optionsKey: ["q-math-02-a", "q-math-02-b", "q-math-02-c", "q-math-02-d"],
    correctIndex: 3,
  },
  {
    id: "m3",
    kind: "multiple",
    category: CategoryId.Math,
    textKey: "q-math-03",
    optionsKey: ["q-math-03-a", "q-math-03-b", "q-math-03-c", "q-math-03-d"],
    correctIndex: 1,
  },
  {
    id: "m4",
    kind: "multiple",
    category: CategoryId.Math,
    textKey: "q-math-04",
    optionsKey: ["q-math-04-a", "q-math-04-b", "q-math-04-c", "q-math-04-d"],
    correctIndex: 2,
  },
  {
    id: "m5",
    kind: "multiple",
    category: CategoryId.Math,
    textKey: "q-math-05",
    optionsKey: ["q-math-05-a", "q-math-05-b", "q-math-05-c", "q-math-05-d"],
    correctIndex: 1,
  },
  {
    id: "m6",
    kind: "multiple",
    category: CategoryId.Math,
    textKey: "q-math-06",
    optionsKey: ["q-math-06-a", "q-math-06-b", "q-math-06-c", "q-math-06-d"],
    correctIndex: 0,
  },
  {
    id: "m7",
    kind: "multiple",
    category: CategoryId.Math,
    textKey: "q-math-07",
    optionsKey: ["q-math-07-a", "q-math-07-b", "q-math-07-c", "q-math-07-d"],
    correctIndex: 1,
  },
  {
    id: "m8",
    kind: "multiple",
    category: CategoryId.Math,
    textKey: "q-math-08",
    optionsKey: ["q-math-08-a", "q-math-08-b", "q-math-08-c", "q-math-08-d"],
    correctIndex: 2,
  },
  {
    id: "m9",
    kind: "multiple",
    category: CategoryId.Math,
    textKey: "q-math-09",
    optionsKey: ["q-math-09-a", "q-math-09-b", "q-math-09-c", "q-math-09-d"],
    correctIndex: 0,
  },
  {
    id: "m10",
    kind: "multiple",
    category: CategoryId.Math,
    textKey: "q-math-10",
    optionsKey: ["q-math-10-a", "q-math-10-b", "q-math-10-c", "q-math-10-d"],
    correctIndex: 3,
  },

  // --- Sequence ordering ---
  {
    id: "m11",
    kind: "sequence",
    category: CategoryId.Math,
    textKey: "q-math-11",
    itemsKey: ["q-math-11-i1", "q-math-11-i2", "q-math-11-i3", "q-math-11-i4"],
    answerSequence: [3, 2, 1, 0],
    partialCredit: true,
  },
  {
    id: "m12",
    kind: "sequence",
    category: CategoryId.Math,
    textKey: "q-math-12",
    itemsKey: ["q-math-12-i1", "q-math-12-i2", "q-math-12-i3", "q-math-12-i4"],
    answerSequence: [1, 2, 0, 3],
    partialCredit: true,
  },

  // --- Visual/matrix ---
  {
    id: "m13",
    kind: "matrix",
    category: CategoryId.Math,
    textKey: "q-math-13",
    image: "/assets/img/q/math/m13.png",
    optionsKey: ["q-math-13-a", "q-math-13-b", "q-math-13-c", "q-math-13-d"],
    correctIndex: 2,
  },
  {
    id: "m14",
    kind: "visual",
    category: CategoryId.Math,
    textKey: "q-math-14",
    image: "/assets/img/q/math/m14.png",
    optionsKey: ["q-math-14-a", "q-math-14-b", "q-math-14-c", "q-math-14-d"],
    correctIndex: 1,
  },

  // --- Worded math problems and remaining ---
  ...Array.from({ length: 26 }, (_, i) => {
    const n = 15 + i;
    return {
      id: `m${n}`,
      kind: "multiple" as const,
      category: CategoryId.Math,
      textKey: `q-math-${n}`,
      optionsKey: [`q-math-${n}-a`, `q-math-${n}-b`, `q-math-${n}-c`, `q-math-${n}-d`],
      correctIndex: (i * 3) % 4,
    };
  }),
];
