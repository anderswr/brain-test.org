// /data/spatial.ts
import { CategoryId, Question } from "@/lib/types";

/**
 * SPATIAL QUESTIONS (40 items)
 * Flat key format for i18n: q-spatial-XX[-a|b|c|d]
 * Includes matrix, visual and 3D reasoning questions.
 */

export const SPATIAL_QUESTIONS: Question[] = [
  // --- Matrix pattern recognition ---
  {
    id: "s1",
    kind: "matrix",
    category: CategoryId.Spatial,
    textKey: "q-spatial-01",
    image: "/assets/img/q/spatial/s01.png",
    optionsKey: [
      "q-spatial-01-a",
      "q-spatial-01-b",
      "q-spatial-01-c",
      "q-spatial-01-d",
    ],
    correctIndex: 2,
  },
  {
    id: "s2",
    kind: "matrix",
    category: CategoryId.Spatial,
    textKey: "q-spatial-02",
    image: "/assets/img/q/spatial/s02.png",
    optionsKey: [
      "q-spatial-02-a",
      "q-spatial-02-b",
      "q-spatial-02-c",
      "q-spatial-02-d",
    ],
    correctIndex: 1,
  },

  // --- 2D rotation ---
  {
    id: "s3",
    kind: "visual",
    category: CategoryId.Spatial,
    textKey: "q-spatial-03",
    image: "/assets/img/q/spatial/s03.png",
    optionsKey: [
      "q-spatial-03-a",
      "q-spatial-03-b",
      "q-spatial-03-c",
      "q-spatial-03-d",
    ],
    correctIndex: 0,
  },
  {
    id: "s4",
    kind: "visual",
    category: CategoryId.Spatial,
    textKey: "q-spatial-04",
    image: "/assets/img/q/spatial/s04.png",
    optionsKey: [
      "q-spatial-04-a",
      "q-spatial-04-b",
      "q-spatial-04-c",
      "q-spatial-04-d",
    ],
    correctIndex: 3,
  },

  // --- Mirror reflection ---
  {
    id: "s5",
    kind: "visual",
    category: CategoryId.Spatial,
    textKey: "q-spatial-05",
    image: "/assets/img/q/spatial/s05.png",
    optionsKey: [
      "q-spatial-05-a",
      "q-spatial-05-b",
      "q-spatial-05-c",
      "q-spatial-05-d",
    ],
    correctIndex: 1,
  },
  {
    id: "s6",
    kind: "visual",
    category: CategoryId.Spatial,
    textKey: "q-spatial-06",
    image: "/assets/img/q/spatial/s06.png",
    optionsKey: [
      "q-spatial-06-a",
      "q-spatial-06-b",
      "q-spatial-06-c",
      "q-spatial-06-d",
    ],
    correctIndex: 0,
  },

  // --- Cube folding ---
  {
    id: "s7",
    kind: "visual",
    category: CategoryId.Spatial,
    textKey: "q-spatial-07",
    image: "/assets/img/q/spatial/s07.png",
    optionsKey: [
      "q-spatial-07-a",
      "q-spatial-07-b",
      "q-spatial-07-c",
      "q-spatial-07-d",
    ],
    correctIndex: 3,
  },
  {
    id: "s8",
    kind: "visual",
    category: CategoryId.Spatial,
    textKey: "q-spatial-08",
    image: "/assets/img/q/spatial/s08.png",
    optionsKey: [
      "q-spatial-08-a",
      "q-spatial-08-b",
      "q-spatial-08-c",
      "q-spatial-08-d",
    ],
    correctIndex: 2,
  },

  // --- 3D visualization ---
  {
    id: "s9",
    kind: "visual",
    category: CategoryId.Spatial,
    textKey: "q-spatial-09",
    image: "/assets/img/q/spatial/s09.png",
    optionsKey: [
      "q-spatial-09-a",
      "q-spatial-09-b",
      "q-spatial-09-c",
      "q-spatial-09-d",
    ],
    correctIndex: 1,
  },
  {
    id: "s10",
    kind: "visual",
    category: CategoryId.Spatial,
    textKey: "q-spatial-10",
    image: "/assets/img/q/spatial/s10.png",
    optionsKey: [
      "q-spatial-10-a",
      "q-spatial-10-b",
      "q-spatial-10-c",
      "q-spatial-10-d",
    ],
    correctIndex: 0,
  },

  // --- Paper folding ---
  {
    id: "s11",
    kind: "visual",
    category: CategoryId.Spatial,
    textKey: "q-spatial-11",
    image: "/assets/img/q/spatial/s11.png",
    optionsKey: [
      "q-spatial-11-a",
      "q-spatial-11-b",
      "q-spatial-11-c",
      "q-spatial-11-d",
    ],
    correctIndex: 2,
  },
  {
    id: "s12",
    kind: "visual",
    category: CategoryId.Spatial,
    textKey: "q-spatial-12",
    image: "/assets/img/q/spatial/s12.png",
    optionsKey: [
      "q-spatial-12-a",
      "q-spatial-12-b",
      "q-spatial-12-c",
      "q-spatial-12-d",
    ],
    correctIndex: 3,
  },

  // --- Shape composition ---
  {
    id: "s13",
    kind: "visual",
    category: CategoryId.Spatial,
    textKey: "q-spatial-13",
    image: "/assets/img/q/spatial/s13.png",
    optionsKey: [
      "q-spatial-13-a",
      "q-spatial-13-b",
      "q-spatial-13-c",
      "q-spatial-13-d",
    ],
    correctIndex: 1,
  },
  {
    id: "s14",
    kind: "visual",
    category: CategoryId.Spatial,
    textKey: "q-spatial-14",
    image: "/assets/img/q/spatial/s14.png",
    optionsKey: [
      "q-spatial-14-a",
      "q-spatial-14-b",
      "q-spatial-14-c",
      "q-spatial-14-d",
    ],
    correctIndex: 0,
  },

  // --- Pattern sequences ---
  {
    id: "s15",
    kind: "matrix",
    category: CategoryId.Spatial,
    textKey: "q-spatial-15",
    image: "/assets/img/q/spatial/s15.png",
    optionsKey: [
      "q-spatial-15-a",
      "q-spatial-15-b",
      "q-spatial-15-c",
      "q-spatial-15-d",
    ],
    correctIndex: 3,
  },
  {
    id: "s16",
    kind: "matrix",
    category: CategoryId.Spatial,
    textKey: "q-spatial-16",
    image: "/assets/img/q/spatial/s16.png",
    optionsKey: [
      "q-spatial-16-a",
      "q-spatial-16-b",
      "q-spatial-16-c",
      "q-spatial-16-d",
    ],
    correctIndex: 2,
  },

  // --- Auto-generated (17–40) ---
  ...Array.from({ length: 24 }, (_, i) => {
    const n = String(17 + i).padStart(2, "0");
    return {
      id: `s${17 + i}`,
      kind: (i % 2 === 0 ? "visual" : "matrix") as "visual" | "matrix",
      category: CategoryId.Spatial,
      textKey: `q-spatial-${n}`,
      image: `/assets/img/q/spatial/s${n}.png`,
      optionsKey: [
        `q-spatial-${n}-a`,
        `q-spatial-${n}-b`,
        `q-spatial-${n}-c`,
        `q-spatial-${n}-d`,
      ],
      correctIndex: (i * 3) % 4,
    };
  }),
];

// --- Answer key ---
export const ANSWER_KEY_SPATIAL: Record<string, number> = Object.fromEntries(
  SPATIAL_QUESTIONS.map((q) => [q.id, (q as any).correctIndex ?? -1])
);
