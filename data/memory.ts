// /data/memory.ts
import { CategoryId, Question } from "@/lib/types";

/**
 * MEMORY MODULE (40 questions)
 * Covers: short-term recall, sequence memory, and visual retention.
 * - m1–m14: verbal/numeric recall (multiple choice)
 * - m15–m23: visual recall (image-based)
 * - m24–m32: additional multiple-choice recall
 * - m33–m40: sequence memory (order recall)
 */

// --- Base multiple-choice memory recall ---
const baseQs: Question[] = [
  {
    id: "m1",
    kind: "multiple",
    category: CategoryId.Memory,
    textKey: "q.memory.word_recall_animals",
    optionsKey: [
      "q.memory.opt.cat_dog_bird",
      "q.memory.opt.cat_dog_mouse",
      "q.memory.opt.cat_dog_fish",
      "q.memory.opt.cat_dog_horse",
    ],
    correctIndex: 1,
  },
  {
    id: "m2",
    kind: "multiple",
    category: CategoryId.Memory,
    textKey: "q.memory.word_recall_objects",
    optionsKey: [
      "q.memory.opt.pen_book_cup",
      "q.memory.opt.pen_cup_key",
      "q.memory.opt.pen_book_key",
      "q.memory.opt.pen_book_door",
    ],
    correctIndex: 2,
  },
  {
    id: "m3",
    kind: "multiple",
    category: CategoryId.Memory,
    textKey: "q.memory.number_recall_short",
    optionsKey: [
      "q.memory.opt.324",
      "q.memory.opt.342",
      "q.memory.opt.243",
      "q.memory.opt.234",
    ],
    correctIndex: 3,
  },
  {
    id: "m4",
    kind: "multiple",
    category: CategoryId.Memory,
    textKey: "q.memory.number_recall_medium",
    optionsKey: [
      "q.memory.opt.47382",
      "q.memory.opt.47832",
      "q.memory.opt.48372",
      "q.memory.opt.43782",
    ],
    correctIndex: 0,
  },
  {
    id: "m5",
    kind: "multiple",
    category: CategoryId.Memory,
    textKey: "q.memory.sequence_letters",
    optionsKey: [
      "q.memory.opt.ADCBE",
      "q.memory.opt.ABCDE",
      "q.memory.opt.ACBED",
      "q.memory.opt.ABEDC",
    ],
    correctIndex: 1,
  },
  {
    id: "m6",
    kind: "multiple",
    category: CategoryId.Memory,
    textKey: "q.memory.color_order",
    optionsKey: [
      "q.memory.opt.red_blue_green",
      "q.memory.opt.red_green_blue",
      "q.memory.opt.blue_green_red",
      "q.memory.opt.green_red_blue",
    ],
    correctIndex: 0,
  },
  {
    id: "m7",
    kind: "multiple",
    category: CategoryId.Memory,
    textKey: "q.memory.symbol_order",
    optionsKey: [
      "q.memory.opt.@_#_%_!",
      "q.memory.opt.@_%_#_!",
      "q.memory.opt._#_@_%_!",
      "q.memory.opt.@_!_%_#",
    ],
    correctIndex: 0,
  },
  {
    id: "m8",
    kind: "multiple",
    category: CategoryId.Memory,
    textKey: "q.memory.short_phrase_recall",
    optionsKey: [
      "q.memory.opt.summer_forest_bird",
      "q.memory.opt.sun_forest_bird",
      "q.memory.opt.sun_forest_tree",
      "q.memory.opt.sun_field_bird",
    ],
    correctIndex: 1,
  },
  {
    id: "m9",
    kind: "multiple",
    category: CategoryId.Memory,
    textKey: "q.memory.shape_count_recall",
    optionsKey: [
      "q.memory.opt.2_circles_3_squares",
      "q.memory.opt.3_circles_2_squares",
      "q.memory.opt.3_triangles_2_squares",
      "q.memory.opt.2_triangles_3_squares",
    ],
    correctIndex: 1,
  },
  {
    id: "m10",
    kind: "multiple",
    category: CategoryId.Memory,
    textKey: "q.memory.word_order_emotions",
    optionsKey: [
      "q.memory.opt.happy_sad_angry",
      "q.memory.opt.sad_angry_happy",
      "q.memory.opt.angry_sad_happy",
      "q.memory.opt.happy_angry_sad",
    ],
    correctIndex: 0,
  },
  {
    id: "m11",
    kind: "multiple",
    category: CategoryId.Memory,
    textKey: "q.memory.number_sequence_forward",
    optionsKey: [
      "q.memory.opt.1743",
      "q.memory.opt.1734",
      "q.memory.opt.1347",
      "q.memory.opt.1437",
    ],
    correctIndex: 3,
  },
  {
    id: "m12",
    kind: "multiple",
    category: CategoryId.Memory,
    textKey: "q.memory.number_sequence_backward",
    optionsKey: [
      "q.memory.opt.6542",
      "q.memory.opt.2456",
      "q.memory.opt.2654",
      "q.memory.opt.4652",
    ],
    correctIndex: 0,
  },
  {
    id: "m13",
    kind: "multiple",
    category: CategoryId.Memory,
    textKey: "q.memory.visual_shape_memory",
    optionsKey: [
      "q.memory.opt.circle_square_triangle",
      "q.memory.opt.triangle_circle_square",
      "q.memory.opt.square_circle_triangle",
      "q.memory.opt.circle_triangle_square",
    ],
    correctIndex: 2,
  },
  {
    id: "m14",
    kind: "multiple",
    category: CategoryId.Memory,
    textKey: "q.memory.word_recall_transport",
    optionsKey: [
      "q.memory.opt.train_bus_bike",
      "q.memory.opt.bus_train_bike",
      "q.memory.opt.car_train_bike",
      "q.memory.opt.bike_bus_train",
    ],
    correctIndex: 0,
  },
];

// --- Visual recall tasks ---
const visualQs: Question[] = Array.from({ length: 9 }, (_, i) => ({
  id: `m${15 + i}`,
  kind: "visual" as const,
  category: CategoryId.Memory,
  textKey: `q.memory.visual_${15 + i}`,
  image: `/img/memory/mem_${15 + i}.png`,
  optionsKey: [
    `q.memory.opt.mem_${15 + i}_a`,
    `q.memory.opt.mem_${15 + i}_b`,
    `q.memory.opt.mem_${15 + i}_c`,
    `q.memory.opt.mem_${15 + i}_d`,
  ],
  correctIndex: (i + 1) % 4,
}));

// --- Additional multiple-choice recall ---
const multiQs: Question[] = Array.from({ length: 9 }, (_, i) => ({
  id: `m${24 + i}`,
  kind: "multiple" as const,
  category: CategoryId.Memory,
  textKey: `q.memory.multi_${24 + i}`,
  optionsKey: [
    `q.memory.opt.multi_${24 + i}_a`,
    `q.memory.opt.multi_${24 + i}_b`,
    `q.memory.opt.multi_${24 + i}_c`,
    `q.memory.opt.multi_${24 + i}_d`,
  ],
  correctIndex: (i + 2) % 4,
}));

// --- Sequence order recall ---
const seqQs: Question[] = Array.from({ length: 8 }, (_, i) => ({
  id: `m${33 + i}`,
  kind: "sequence" as const,
  category: CategoryId.Memory,
  textKey: `q.memory.seq_${33 + i}`,
  answerSequence: [0, 1, 2, 3].sort(() => 0.5 - Math.random()),
}));

// --- Combined export ---
export const MEMORY_QUESTIONS: Question[] = [
  ...baseQs,
  ...visualQs,
  ...multiQs,
  ...seqQs,
];

// --- Answer key (for programmatic scoring) ---
export const ANSWER_KEY_MEMORY: Record<string, number> = Object.fromEntries(
  MEMORY_QUESTIONS.map((q) => [q.id, q.correctIndex ?? -1])
);    correctIndex: 1,
  },
  {
    id: "m6",
    kind: "multiple",
    category: CategoryId.Memory,
    textKey: "q.memory.color_order",
    optionsKey: [
      "q.memory.opt.red_blue_green",
      "q.memory.opt.red_green_blue",
      "q.memory.opt.blue_green_red",
      "q.memory.opt.green_red_blue",
    ],
    correctIndex: 0,
  },
  {
    id: "m7",
    kind: "multiple",
    category: CategoryId.Memory,
    textKey: "q.memory.symbol_order",
    optionsKey: [
      "q.memory.opt.@_#_%_!",
      "q.memory.opt.@_%_#_!",
      "q.memory.opt._#_@_%_!",
      "q.memory.opt.@_!_%_#",
    ],
    correctIndex: 0,
  },
  {
    id: "m8",
    kind: "multiple",
    category: CategoryId.Memory,
    textKey: "q.memory.short_phrase_recall",
    optionsKey: [
      "q.memory.opt.summer_forest_bird",
      "q.memory.opt.sun_forest_bird",
      "q.memory.opt.sun_forest_tree",
      "q.memory.opt.sun_field_bird",
    ],
    correctIndex: 1,
  },
  {
    id: "m9",
    kind: "multiple",
    category: CategoryId.Memory,
    textKey: "q.memory.shape_count_recall",
    optionsKey: [
      "q.memory.opt.2_circles_3_squares",
      "q.memory.opt.3_circles_2_squares",
      "q.memory.opt.3_triangles_2_squares",
      "q.memory.opt.2_triangles_3_squares",
    ],
    correctIndex: 1,
  },
  {
    id: "m10",
    kind: "multiple",
    category: CategoryId.Memory,
    textKey: "q.memory.word_order_emotions",
    optionsKey: [
      "q.memory.opt.happy_sad_angry",
      "q.memory.opt.sad_angry_happy",
      "q.memory.opt.angry_sad_happy",
      "q.memory.opt.happy_angry_sad",
    ],
    correctIndex: 0,
  },
  {
    id: "m11",
    kind: "multiple",
    category: CategoryId.Memory,
    textKey: "q.memory.number_sequence_forward",
    optionsKey: [
      "q.memory.opt.1743",
      "q.memory.opt.1734",
      "q.memory.opt.1347",
      "q.memory.opt.1437",
    ],
    correctIndex: 3,
  },
  {
    id: "m12",
    kind: "multiple",
    category: CategoryId.Memory,
    textKey: "q.memory.number_sequence_backward",
    optionsKey: [
      "q.memory.opt.6542",
      "q.memory.opt.2456",
      "q.memory.opt.2654",
      "q.memory.opt.4652",
    ],
    correctIndex: 0,
  },
  {
    id: "m13",
    kind: "multiple",
    category: CategoryId.Memory,
    textKey: "q.memory.visual_shape_memory",
    optionsKey: [
      "q.memory.opt.circle_square_triangle",
      "q.memory.opt.triangle_circle_square",
      "q.memory.opt.square_circle_triangle",
      "q.memory.opt.circle_triangle_square",
    ],
    correctIndex: 2,
  },
  {
    id: "m14",
    kind: "multiple",
    category: CategoryId.Memory,
    textKey: "q.memory.word_recall_transport",
    optionsKey: [
      "q.memory.opt.train_bus_bike",
      "q.memory.opt.bus_train_bike",
      "q.memory.opt.car_train_bike",
      "q.memory.opt.bike_bus_train",
    ],
    correctIndex: 0,
  },

  // --- Visual and mixed sequence memory tasks ---
  ...Array.from({ length: 26 }, (_, i) => ({
    id: `m${15 + i}`,
    kind: kinds[i % kinds.length],
    category: CategoryId.Memory,
    textKey: `q.memory.visual_${15 + i}`,
    image: `/img/memory/mem_${15 + i}.png`,
    optionsKey: [
      `q.memory.opt.mem_${15 + i}_a`,
      `q.memory.opt.mem_${15 + i}_b`,
      `q.memory.opt.mem_${15 + i}_c`,
      `q.memory.opt.mem_${15 + i}_d`,
    ],
    correctIndex: (i + 1) % 4,
    answerSequence: [0, 1, 2, 3],
  })),
];

// --- Answer key (for programmatic scoring) ---
export const ANSWER_KEY_MEMORY: Record<string, number> = Object.fromEntries(
  MEMORY_QUESTIONS.map((q) => [q.id, q.correctIndex ?? -1])
);
