import { CategoryId, Question } from "@/lib/types";

/**
 * VERBAL QUESTIONS (40 total)
 * Unified ID format: q-verbal-XX
 */

export const VERBAL_QUESTIONS: Question[] = [
  // --- Core multiple-choice (01–10) ---
  ...Array.from({ length: 10 }, (_, i) => {
    const n = String(i + 1).padStart(2, "0");
    const id = `q-verbal-${n}`;
    return {
      id,
      kind: "multiple" as const,
      category: CategoryId.Verbal,
      textKey: id,
      optionsKey: [`${id}-a`, `${id}-b`, `${id}-c`, `${id}-d`],
      correctIndex: (i + 1) % 4,
    };
  }),

  // --- Sequence questions (11–12) ---
  ...Array.from({ length: 2 }, (_, i) => {
    const n = String(11 + i).padStart(2, "0");
    const id = `q-verbal-${n}`;
    return {
      id,
      kind: "sequence" as const,
      category: CategoryId.Verbal,
      textKey: id,
      itemsKey: [`${id}-i1`, `${id}-i2`, `${id}-i3`, `${id}-i4`],
      answerSequence: [2, 0, 3, 1],
      partialCredit: true,
    };
  }),

  // --- Visual (13–16) ---
  ...Array.from({ length: 4 }, (_, i) => {
    const n = String(13 + i).padStart(2, "0");
    const id = `q-verbal-${n}`;
    return {
      id,
      kind: "visual" as const,
      category: CategoryId.Verbal,
      textKey: id,
      image: `/assets/img/q/verbal/v${n}.png`,
      optionsKey: [`${id}-a`, `${id}-b`, `${id}-c`, `${id}-d`],
      correctIndex: (i + 2) % 4,
    };
  }),

  // --- Extended mix (17–30, med sekvenser hver 5. + unntak for 22, 26 og 27) ---
  ...Array.from({ length: 14 }, (_, i) => {
    const n = String(17 + i).padStart(2, "0");
    const id = `q-verbal-${n}`;

    // unntak: 22, 26, 27 skal være multiple choice
    if (["22", "26", "27"].includes(n)) {
      if (n === "26") {
        // 26 er sekvens
        return {
          id,
          kind: "sequence" as const,
          category: CategoryId.Verbal,
          textKey: id,
          itemsKey: [
            `${id}-i1`,
            `${id}-i2`,
            `${id}-i3`,
            `${id}-i4`,
            `${id}-i5`,
          ],
          answerSequence: [3, 2, 0, 1, 4],
          partialCredit: true,
        };
      }
      // 22 og 27 → multiple
      return {
        id,
        kind: "multiple" as const,
        category: CategoryId.Verbal,
        textKey: id,
        optionsKey: [`${id}-a`, `${id}-b`, `${id}-c`, `${id}-d`],
        correctIndex: 2,
      };
    }

    // hver 5. ellers blir sequence (17)
    if (i % 5 === 0) {
      return {
        id,
        kind: "sequence" as const,
        category: CategoryId.Verbal,
        textKey: id,
        itemsKey: [`${id}-i1`, `${id}-i2`, `${id}-i3`, `${id}-i4`],
        answerSequence: [3, 1, 0, 2],
        partialCredit: true,
      };
    }

    // resten multiple
    return {
      id,
      kind: "multiple" as const,
      category: CategoryId.Verbal,
      textKey: id,
      optionsKey: [`${id}-a`, `${id}-b`, `${id}-c`, `${id}-d`],
      correctIndex: (i * 3) % 4,
    };
  }),

  // --- Final batch (31–40) ---
  ...Array.from({ length: 10 }, (_, i) => {
    const n = String(31 + i).padStart(2, "0");
    const id = `q-verbal-${n}`;

    if (i === 4) {
      return {
        id,
        kind: "sequence" as const,
        category: CategoryId.Verbal,
        textKey: id,
        itemsKey: [`${id}-i1`, `${id}-i2`, `${id}-i3`, `${id}-i4`],
        answerSequence: [1, 3, 0, 2],
        partialCredit: true,
      };
    }

    if (i === 5) {
      return {
        id,
        kind: "visual" as const,
        category: CategoryId.Verbal,
        textKey: id,
        image: `/assets/img/q/verbal/v${n}.png`,
        optionsKey: [`${id}-a`, `${id}-b`, `${id}-c`, `${id}-d`],
        correctIndex: (i + 2) % 4,
      };
    }

    return {
      id,
      kind: "multiple" as const,
      category: CategoryId.Verbal,
      textKey: id,
      optionsKey: [`${id}-a`, `${id}-b`, `${id}-c`, `${id}-d`],
      correctIndex: (i + 2) % 4,
    };
  }),
];

export const ANSWER_KEY_VERBAL: Record<string, number> = Object.fromEntries(
  VERBAL_QUESTIONS.map((q) => [q.id, (q as any).correctIndex ?? -1])
);
