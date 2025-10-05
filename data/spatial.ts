// /data/spatial.ts
import { CategoryId, Question } from "@/lib/types";

export const SPATIAL_QUESTIONS: Question[] = [
  // --- Matrix pattern recognition ---
  {
    id: "s1",
    kind: "matrix",
    category: CategoryId.Spatial,
    textKey: "q.spatial.matrix_01",
    image: "/assets/img/q/spatial/s01.png",
    optionsKey: [
      "q.spatial.matrix_01.a",
      "q.spatial.matrix_01.b",
      "q.spatial.matrix_01.c",
      "q.spatial.matrix_01.d",
    ],
    correctIndex: 2,
  },
  {
    id: "s2",
    kind: "matrix",
    category: CategoryId.Spatial,
    textKey: "q.spatial.matrix_02",
    image: "/assets/img/q/spatial/s02.png",
    optionsKey: [
      "q.spatial.matrix_02.a",
      "q.spatial.matrix_02.b",
      "q.spatial.matrix_02.c",
      "q.spatial.matrix_02.d",
    ],
    correctIndex: 1,
  },

  // --- 2D rotation ---
  {
    id: "s3",
    kind: "visual",
    category: CategoryId.Spatial,
    textKey: "q.spatial.rotation_03",
    image: "/assets/img/q/spatial/s03.png",
    optionsKey: [
      "q.spatial.rotation_03.a",
      "q.spatial.rotation_03.b",
      "q.spatial.rotation_03.c",
      "q.spatial.rotation_03.d",
    ],
    correctIndex: 0,
  },
  {
    id: "s4",
    kind: "visual",
    category: CategoryId.Spatial,
    textKey: "q.spatial.rotation_04",
    image: "/assets/img/q/spatial/s04.png",
    optionsKey: [
      "q.spatial.rotation_04.a",
      "q.spatial.rotation_04.b",
      "q.spatial.rotation_04.c",
      "q.spatial.rotation_04.d",
    ],
    correctIndex: 3,
  },

  // --- Mirror reflection ---
  {
    id: "s5",
    kind: "visual",
    category: CategoryId.Spatial,
    textKey: "q.spatial.mirror_05",
    image: "/assets/img/q/spatial/s05.png",
    optionsKey: [
      "q.spatial.mirror_05.a",
      "q.spatial.mirror_05.b",
      "q.spatial.mirror_05.c",
      "q.spatial.mirror_05.d",
    ],
    correctIndex: 1,
  },
  {
    id: "s6",
    kind: "visual",
    category: CategoryId.Spatial,
    textKey: "q.spatial.mirror_06",
    image: "/assets/img/q/spatial/s06.png",
    optionsKey: [
      "q.spatial.mirror_06.a",
      "q.spatial.mirror_06.b",
      "q.spatial.mirror_06.c",
      "q.spatial.mirror_06.d",
    ],
    correctIndex: 0,
  },

  // --- Cube folding ---
  {
    id: "s7",
    kind: "visual",
    category: CategoryId.Spatial,
    textKey: "q.spatial.cube_07",
    image: "/assets/img/q/spatial/s07.png",
    optionsKey: [
      "q.spatial.cube_07.a",
      "q.spatial.cube_07.b",
      "q.spatial.cube_07.c",
      "q.spatial.cube_07.d",
    ],
    correctIndex: 3,
  },
  {
    id: "s8",
    kind: "visual",
    category: CategoryId.Spatial,
    textKey: "q.spatial.cube_08",
    image: "/assets/img/q/spatial/s08.png",
    optionsKey: [
      "q.spatial.cube_08.a",
      "q.spatial.cube_08.b",
      "q.spatial.cube_08.c",
      "q.spatial.cube_08.d",
    ],
    correctIndex: 2,
  },

  // --- 3D spatial visualization ---
  {
    id: "s9",
    kind: "visual",
    category: CategoryId.Spatial,
    textKey: "q.spatial.3d_09",
    image: "/assets/img/q/spatial/s09.png",
    optionsKey: [
      "q.spatial.3d_09.a",
      "q.spatial.3d_09.b",
      "q.spatial.3d_09.c",
      "q.spatial.3d_09.d",
    ],
    correctIndex: 1,
  },
  {
    id: "s10",
    kind: "visual",
    category: CategoryId.Spatial,
    textKey: "q.spatial.3d_10",
    image: "/assets/img/q/spatial/s10.png",
    optionsKey: [
      "q.spatial.3d_10.a",
      "q.spatial.3d_10.b",
      "q.spatial.3d_10.c",
      "q.spatial.3d_10.d",
    ],
    correctIndex: 0,
  },

  // --- Paper folding ---
  {
    id: "s11",
    kind: "visual",
    category: CategoryId.Spatial,
    textKey: "q.spatial.fold_11",
    image: "/assets/img/q/spatial/s11.png",
    optionsKey: [
      "q.spatial.fold_11.a",
      "q.spatial.fold_11.b",
      "q.spatial.fold_11.c",
      "q.spatial.fold_11.d",
    ],
    correctIndex: 2,
  },
  {
    id: "s12",
    kind: "visual",
    category: CategoryId.Spatial,
    textKey: "q.spatial.fold_12",
    image: "/assets/img/q/spatial/s12.png",
    optionsKey: [
      "q.spatial.fold_12.a",
      "q.spatial.fold_12.b",
      "q.spatial.fold_12.c",
      "q.spatial.fold_12.d",
    ],
    correctIndex: 3,
  },

  // --- Shape composition ---
  {
    id: "s13",
    kind: "visual",
    category: CategoryId.Spatial,
    textKey: "q.spatial.compose_13",
    image: "/assets/img/q/spatial/s13.png",
    optionsKey: [
      "q.spatial.compose_13.a",
      "q.spatial.compose_13.b",
      "q.spatial.compose_13.c",
      "q.spatial.compose_13.d",
    ],
    correctIndex: 1,
  },
  {
    id: "s14",
    kind: "visual",
    category: CategoryId.Spatial,
    textKey: "q.spatial.compose_14",
    image: "/assets/img/q/spatial/s14.png",
    optionsKey: [
      "q.spatial.compose_14.a",
      "q.spatial.compose_14.b",
      "q.spatial.compose_14.c",
      "q.spatial.compose_14.d",
    ],
    correctIndex: 0,
  },

  // --- Pattern sequences ---
  {
    id: "s15",
    kind: "matrix",
    category: CategoryId.Spatial,
    textKey: "q.spatial.matrix_15",
    image: "/assets/img/q/spatial/s15.png",
    optionsKey: [
      "q.spatial.matrix_15.a",
      "q.spatial.matrix_15.b",
      "q.spatial.matrix_15.c",
      "q.spatial.matrix_15.d",
    ],
    correctIndex: 3,
  },
  {
    id: "s16",
    kind: "matrix",
    category: CategoryId.Spatial,
    textKey: "q.spatial.matrix_16",
    image: "/assets/img/q/spatial/s16.png",
    optionsKey: [
      "q.spatial.matrix_16.a",
      "q.spatial.matrix_16.b",
      "q.spatial.matrix_16.c",
      "q.spatial.matrix_16.d",
    ],
    correctIndex: 2,
  },

  // --- Auto-generated continuation ---
  ...Array.from({ length: 24 }, (_, i) => ({
    id: `s${17 + i}`,
    kind: (i % 2 === 0 ? "visual" : "matrix") as "visual" | "matrix",
    category: CategoryId.Spatial,
    textKey: `q.spatial.auto_${17 + i}`,
    image: `/assets/img/q/spatial/s${17 + i}.png`,
    optionsKey: [
      `q.spatial.auto_${17 + i}.a`,
      `q.spatial.auto_${17 + i}.b`,
      `q.spatial.auto_${17 + i}.c`,
      `q.spatial.auto_${17 + i}.d`,
    ],
    correctIndex: (i * 3) % 4,
  })),
];

// --- Answer key (for programmatic scoring) ---
export const ANSWER_KEY_SPATIAL: Record<string, number> = Object.fromEntries(
  SPATIAL_QUESTIONS.map((q) => [q.id, (q as any).correctIndex ?? -1])
);
