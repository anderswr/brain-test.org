// /data/verbal.ts
import { CategoryId, Question } from "@/lib/types";

/**
 * VERBAL QUESTIONS (40 total)
 * Flat key format: q-verbal-XX[-a|b|c|d] and q-verbal-XX-i1... for sequences.
 */

export const VERBAL_QUESTIONS: Question[] = [
  // --- Core multiple-choice (1–10) ---
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `v${i + 1}`,
    kind: "multiple" as const,
    category: CategoryId.Verbal,
    textKey: `q-verbal-${i + 1}`,
    optionsKey: [
      `q-verbal-${i + 1}-a`,
      `q-verbal-${i + 1}-b`,
      `q-verbal-${i + 1}-c`,
      `q-verbal-${i + 1}-d`,
    ],
    correctIndex: (i + 1) % 4,
  })),

  // --- Sequence questions (11–12) ---
  ...Array.from({ length: 2 }, (_, i) => ({
    id: `v${11 + i}`,
    kind: "sequence" as const,
    category: CategoryId.Verbal,
    textKey: `q-verbal-${11 + i}`,
    itemsKey: [
      `q-verbal-${11 + i}-i1`,
      `q-verbal-${11 + i}-i2`,
      `q-verbal-${11 + i}-i3`,
      `q-verbal-${11 + i}-i4`,
    ],
    answerSequence: [2, 0, 3, 1],
    partialCredit: true,
  })),

  // --- Visual (13–16) ---
  ...Array.from({ length: 4 }, (_, i) => ({
    id: `v${13 + i}`,
    kind: "visual" as const,
    category: CategoryId.Verbal,
    textKey: `q-verbal-${13 + i}`,
    image: `/assets/img/q/verbal/v${13 + i}.png`,
    optionsKey: [
      `q-verbal-${13 + i}-a`,
      `q-verbal-${13 + i}-b`,
      `q-verbal-${13 + i}-c`,
      `q-verbal-${13 + i}-d`,
    ],
    correctIndex: (i + 2) % 4,
  })),

  // --- Extended mix (17–30) ---
  ...Array.from({ length: 14 }, (_, i) => ({
    id: `v${17 + i}`,
    kind: i % 5 === 0 ? "sequence" : "multiple",
    category: CategoryId.Verbal,
    textKey: `q-verbal-${17 + i}`,
    ...(i % 5 === 0
      ? {
          itemsKey: [
            `q-verbal-${17 + i}-i1`,
            `q-verbal-${17 + i}-i2`,
            `q-verbal-${17 + i}-i3`,
            `q-verbal-${17 + i}-i4`,
          ],
          answerSequence: [3, 1, 0, 2],
          partialCredit: true,
        }
      : {
          optionsKey: [
            `q-verbal-${17 + i}-a`,
            `q-verbal-${17 + i}-b`,
            `q-verbal-${17 + i}-c`,
            `q-verbal-${17 + i}-d`,
          ],
          correctIndex: (i * 3) % 4,
        }),
  })),

  // --- Final batch (31–40) ---
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `v${31 + i}`,
    kind: i === 4 ? "sequence" : i === 5 ? "visual" : "multiple",
    category: CategoryId.Verbal,
    textKey: `q-verbal-${31 + i}`,
    ...(i === 4
      ? {
          itemsKey: [
            `q-verbal-${31 + i}-i1`,
            `q-verbal-${31 + i}-i2`,
            `q-verbal-${31 + i}-i3`,
            `q-verbal-${31 + i}-i4`,
          ],
          answerSequence: [1, 3, 0, 2],
          partialCredit: true,
        }
      : {
          ...(i === 5 ? { image: `/assets/img/q/verbal/v${31 + i}.png` } : {}),
          optionsKey: [
            `q-verbal-${31 + i}-a`,
            `q-verbal-${31 + i}-b`,
            `q-verbal-${31 + i}-c`,
            `q-verbal-${31 + i}-d`,
          ],
          correctIndex: (i + 2) % 4,
        }),
  })),
];

// --- Answer key ---
export const ANSWER_KEY_VERBAL: Record<string, number> = Object.fromEntries(
  VERBAL_QUESTIONS.map((q) => [q.id, (q as any).correctIndex ?? -1])
);
