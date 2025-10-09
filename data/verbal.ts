// /data/verbal.ts
import { CategoryId, Question } from "@/lib/types";

/**
 * VERBAL QUESTIONS (40 total)
 * Unified ID format: q-verbal-XX
 * Flat key format: q-verbal-XX[-a|b|c|d] and q-verbal-XX-i1... for sequences.
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

  // --- Extended mix (17–30, med sekvenser hver 5. + unntak for 26) ---
  ...Array.from({ length: 14 }, (_, i) => {
    const n = String(17 + i).padStart(2, "0");
    const id = `q-verbal-${n}`;

    // unntak: 26 er spesialsekvens med 5 deler
    if (n === "26") {
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
        // Correct order: "where / are / you / going / ?"
        answerSequence: [3, 2, 0, 1, 4],
        partialCredit: true,
      };
    }

    // hvert 5. spørsmål ellers blir sequence-type
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

    // resten er multiple choice
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

    // Sequence-type
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

    // Visual-type
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

    // Default multiple choice
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

// --- Answer key ---
export const ANSWER_KEY_VERBAL: Record<string, number> = Object.fromEntries(
  VERBAL_QUESTIONS.map((q) => [q.id, (q as any).correctIndex ?? -1])
);
