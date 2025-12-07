// /data/spatial.ts
import { CategoryId, Question } from "@/lib/types";

/**
 * SPATIAL QUESTIONS (40 total)
 * Unified ID format: q-spatial-XX
 * Flat key format for i18n: q-spatial-XX[-a|b|c|d]
 * Includes matrix, visual and 3D reasoning questions.
 */

export const SPATIAL_QUESTIONS: Question[] = [
  // --- Matrix pattern recognition (01–02) ---
  ...Array.from({ length: 2 }, (_, i) => {
    const n = String(i + 1).padStart(2, "0");
    const id = `q-spatial-${n}`;
    return {
      id,
      kind: "matrix" as const,
      category: CategoryId.Spatial,
      textKey: id,
      image: `/assets/img/q/spatial/s${n}.png`,
      optionsKey: [`${id}-a`, `${id}-b`, `${id}-c`, `${id}-d`],
      correctIndex: i === 0 ? 2 : 1,
    };
  }),

  // --- 2D rotation (03–04) ---
  ...Array.from({ length: 2 }, (_, i) => {
    const n = String(3 + i).padStart(2, "0");
    const id = `q-spatial-${n}`;
    return {
      id,
      kind: "visual" as const,
      category: CategoryId.Spatial,
      textKey: id,
      image: `/assets/img/q/spatial/s${n}.png`,
      optionsKey: [`${id}-a`, `${id}-b`, `${id}-c`, `${id}-d`],
      correctIndex: i === 0 ? 0 : 3,
    };
  }),

  // --- Mirror reflection (05–06) ---
  ...Array.from({ length: 2 }, (_, i) => {
    const n = String(5 + i).padStart(2, "0");
    const id = `q-spatial-${n}`;
    return {
      id,
      kind: "visual" as const,
      category: CategoryId.Spatial,
      textKey: id,
      image: `/assets/img/q/spatial/s${n}.png`,
      optionsKey: [`${id}-a`, `${id}-b`, `${id}-c`, `${id}-d`],
      correctIndex: i === 0 ? 1 : 0,
    };
  }),

  // --- Cube folding (07–08) ---
  ...Array.from({ length: 2 }, (_, i) => {
    const n = String(7 + i).padStart(2, "0");
    const id = `q-spatial-${n}`;
    return {
      id,
      kind: "visual" as const,
      category: CategoryId.Spatial,
      textKey: id,
      image: `/assets/img/q/spatial/s${n}.png`,
      optionsKey: [`${id}-a`, `${id}-b`, `${id}-c`, `${id}-d`],
      correctIndex: i === 0 ? 3 : 2,
    };
  }),

  // --- 3D visualization (09–10) ---
  ...Array.from({ length: 2 }, (_, i) => {
    const n = String(9 + i).padStart(2, "0");
    const id = `q-spatial-${n}`;
    return {
      id,
      kind: "visual" as const,
      category: CategoryId.Spatial,
      textKey: id,
      image: `/assets/img/q/spatial/s${n}.png`,
      optionsKey: [`${id}-a`, `${id}-b`, `${id}-c`, `${id}-d`],
      correctIndex: i === 0 ? 1 : 0,
    };
  }),

  // --- Paper folding (11–12) ---
  ...Array.from({ length: 2 }, (_, i) => {
    const n = String(11 + i).padStart(2, "0");
    const id = `q-spatial-${n}`;
    return {
      id,
      kind: "visual" as const,
      category: CategoryId.Spatial,
      textKey: id,
      image: `/assets/img/q/spatial/s${n}.png`,
      optionsKey: [`${id}-a`, `${id}-b`, `${id}-c`, `${id}-d`],
      correctIndex: i === 0 ? 2 : 3,
    };
  }),

  // --- Shape composition (13–14) ---
  ...Array.from({ length: 2 }, (_, i) => {
    const n = String(13 + i).padStart(2, "0");
    const id = `q-spatial-${n}`;
    return {
      id,
      kind: "visual" as const,
      category: CategoryId.Spatial,
      textKey: id,
      image: `/assets/img/q/spatial/s${n}.png`,
      optionsKey: [`${id}-a`, `${id}-b`, `${id}-c`, `${id}-d`],
      correctIndex: i === 0 ? 1 : 0,
    };
  }),

  // --- Pattern sequences (15–16) ---
  ...Array.from({ length: 2 }, (_, i) => {
    const n = String(15 + i).padStart(2, "0");
    const id = `q-spatial-${n}`;
    return {
      id,
      kind: "matrix" as const,
      category: CategoryId.Spatial,
      textKey: id,
      image: `/assets/img/q/spatial/s${n}.png`,
      optionsKey: [`${id}-a`, `${id}-b`, `${id}-c`, `${id}-d`],
      correctIndex: i === 0 ? 3 : 2,
    };
  }),

  // --- Auto-generated (17–40) ---
  ...Array.from({ length: 24 }, (_, i) => {
    const n = String(17 + i).padStart(2, "0");
    const id = `q-spatial-${n}`;
    const kind = (i % 2 === 0 ? "visual" : "matrix") as "visual" | "matrix";
    return {
      id,
      kind,
      category: CategoryId.Spatial,
      textKey: id,
      image: `/assets/img/q/spatial/s${n}.png`,
      optionsKey: [`${id}-a`, `${id}-b`, `${id}-c`, `${id}-d`],
      correctIndex: (i * 3) % 4,
    };
  }),
];

// --- Answer key ---
export const ANSWER_KEY_SPATIAL: Record<string, number> = Object.fromEntries(
  SPATIAL_QUESTIONS.map((q) => [q.id, "correctIndex" in q ? q.correctIndex : -1])
);
