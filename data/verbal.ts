import { CategoryId, Question } from "@/lib/types";

/**
 * VERBAL QUESTIONS (40 total)
 * Flat key format: q-verbal-XX[-a|b|c|d] and q-verbal-XX-i1... for sequences..
 */

export const VERBAL_QUESTIONS: Question[] = [
  // --- Core multiple-choice (1–10) ---
  ...Array.from({ length: 10 }, (_, i) => {
    const n = String(i + 1).padStart(2, "0");
    return {
      id: `v${i + 1}`,
      kind: "multiple" as const,
      category: CategoryId.Verbal,
      textKey: `q-verbal-${n}`,
      optionsKey: [
        `q-verbal-${n}-a`,
        `q-verbal-${n}-b`,
        `q-verbal-${n}-c`,
        `q-verbal-${n}-d`,
      ],
      correctIndex: (i + 1) % 4,
    };
  }),

  // --- Sequence questions (11–12) ---
  ...Array.from({ length: 2 }, (_, i) => {
    const n = String(11 + i).padStart(2, "0");
    const base = `q-verbal-${n}`;
    return {
      id: `v${11 + i}`,
      kind: "sequence" as const,
      category: CategoryId.Verbal,
      textKey: base,
      itemsKey: [`${base}-i1`, `${base}-i2`, `${base}-i3`, `${base}-i4`],
      answerSequence: [`${base}-i3`, `${base}-i1`, `${base}-i4`, `${base}-i2`],
      partialCredit: true,
    };
  }),

  // --- Visual (13–16) ---
  ...Array.from({ length: 4 }, (_, i) => {
    const n = String(13 + i).padStart(2, "0");
    return {
      id: `v${13 + i}`,
      kind: "visual" as const,
      category: CategoryId.Verbal,
      textKey: `q-verbal-${n}`,
      image: `/assets/img/q/verbal/v${n}.png`,
      optionsKey: [
        `q-verbal-${n}-a`,
        `q-verbal-${n}-b`,
        `q-verbal-${n}-c`,
        `q-verbal-${n}-d`,
      ],
      correctIndex: (i + 2) % 4,
    };
  }),

  // --- Extended mix (17–30) ---
  ...Array.from({ length: 14 }, (_, i) => {
    const n = String(17 + i).padStart(2, "0");
    const baseKey = `q-verbal-${n}`;
    const base = {
      id: `v${17 + i}`,
      category: CategoryId.Verbal,
      textKey: baseKey,
    };

    // hvert 5. spørsmål blir sequence-type
    if (i % 5 === 0) {
      return {
        ...base,
        kind: "sequence" as const,
        itemsKey: [`${baseKey}-i1`, `${baseKey}-i2`, `${baseKey}-i3`, `${baseKey}-i4`],
        answerSequence: [`${baseKey}-i4`, `${baseKey}-i2`, `${baseKey}-i1`, `${baseKey}-i3`],
        partialCredit: true,
      };
    }

    // resten er multiple-choice
    return {
      ...base,
      kind: "multiple" as const,
      optionsKey: [
        `${baseKey}-a`,
        `${baseKey}-b`,
        `${baseKey}-c`,
        `${baseKey}-d`,
      ],
      correctIndex: (i * 3) % 4,
    };
  }),

  // --- Final batch (31–40) ---
  ...Array.from({ length: 10 }, (_, i) => {
    const n = String(31 + i).padStart(2, "0");
    const baseKey = `q-verbal-${n}`;
    const base = {
      id: `v${31 + i}`,
      category: CategoryId.Verbal,
      textKey: baseKey,
    };

    if (i === 4) {
      // Sequence-type
      return {
        ...base,
        kind: "sequence" as const,
        itemsKey: [`${baseKey}-i1`, `${baseKey}-i2`, `${baseKey}-i3`, `${baseKey}-i4`],
        answerSequence: [`${baseKey}-i2`, `${baseKey}-i4`, `${baseKey}-i1`, `${baseKey}-i3`],
        partialCredit: true,
      };
    }

    if (i === 5) {
      // Visual-type
      return {
        ...base,
        kind: "visual" as const,
        image: `/assets/img/q/verbal/v${n}.png`,
        optionsKey: [
          `${baseKey}-a`,
          `${baseKey}-b`,
          `${baseKey}-c`,
          `${baseKey}-d`,
        ],
        correctIndex: (i + 2) % 4,
      };
    }

    // Default multiple
    return {
      ...base,
      kind: "multiple" as const,
      optionsKey: [
        `${baseKey}-a`,
        `${baseKey}-b`,
        `${baseKey}-c`,
        `${baseKey}-d`,
      ],
      correctIndex: (i + 2) % 4,
    };
  }),
];

// --- Answer key ---
export const ANSWER_KEY_VERBAL: Record<string, number> = Object.fromEntries(
  VERBAL_QUESTIONS.map((q) => [q.id, (q as any).correctIndex ?? -1])
);
