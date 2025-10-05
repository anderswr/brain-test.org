// /data/memory.ts
import { CategoryId, Question } from "@/lib/types";

/**
 * MEMORY MODULE (40 questions total)
 * Covers: short-term recall, sequence memory, and visual retention.
 * - m1–m14: multiple-choice recall (words, numbers, symbols)
 * - m15–m23: visual recall (images)
 * - m24–m32: multiple-choice recall (extra)
 * - m33–m40: sequence order memory
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
    optionsKey: ["324", "342", "243", "234"],
    correctIndex: 3,
  },
  {
    id: "m4",
    kind: "multiple",
    category: CategoryId.Memory,
    textKey: "q.memory.sequence_letters",
    optionsKey: ["ADCBE", "ABCDE", "ACBED", "ABEDC"],
    correctIndex: 1,
  },
  {
    id: "m5",
    kind: "multiple",
    category: CategoryId.Memory,
    textKey: "q.memory.color_order",
    optionsKey: [
      "red_blue_green",
      "red_green_blue",
      "blue_green_red",
      "green_red_blue",
    ],
    correctIndex: 0,
  },
  {
    id: "m6",
    kind: "multiple",
    category: CategoryId.Memory,
    textKey: "q.memory.symbol_order",
    optionsKey: ["@#%!", "@%#!", "#@%!", "@!%#"],
    correctIndex: 0,
  },
  {
    id: "m7",
    kind: "multiple",
    category: CategoryId.Memory,
    textKey: "q.memory.short_phrase_recall",
    optionsKey: [
      "summer_forest_bird",
      "sun_forest_bird",
      "sun_forest_tree",
      "sun_field_bird",
    ],
    correctIndex: 1,
  },
  {
    id: "m8",
    kind: "multiple",
    category: CategoryId.Memory,
    textKey: "q.memory.shape_count_recall",
    optionsKey: [
      "2_circles_3_squares",
      "3_circles_2_squares",
      "3_triangles_2_squares",
      "2_triangles_3_squares",
    ],
    correctIndex: 1,
  },
  {
    id: "m9",
    kind: "multiple",
    category: CategoryId.Memory,
    textKey: "q.memory.word_order_emotions",
    optionsKey: [
      "happy_sad_angry",
      "sad_angry_happy",
      "angry_sad_happy",
      "happy_angry_sad",
    ],
    correctIndex: 0,
  },
  {
    id: "m10",
    kind: "multiple",
    category: CategoryId.Memory,
    textKey: "q.memory.number_sequence_forward",
    optionsKey: ["1743", "1734", "1347", "1437"],
    correctIndex: 3,
  },
  {
    id: "m11",
    kind: "multiple",
    category: CategoryId.Memory,
    textKey: "q.memory.number_sequence_backward",
    optionsKey: ["6542", "2456", "2654", "4652"],
    correctIndex: 0,
  },
  {
    id: "m12",
    kind: "multiple",
    category: CategoryId.Memory,
    textKey: "q.memory.visual_shape_memory",
    optionsKey: [
      "circle_square_triangle",
      "triangle_circle_square",
      "square_circle_triangle",
      "circle_triangle_square",
    ],
    correctIndex: 2,
  },
  {
    id: "m13",
    kind: "multiple",
    category: CategoryId.Memory,
    textKey: "q.memory.word_recall_transport",
    optionsKey: [
      "train_bus_bike",
      "bus_train_bike",
      "car_train_bike",
      "bike_bus_train",
    ],
    correctIndex: 0,
  },
  {
    id: "m14",
    kind: "multiple",
    category: CategoryId.Memory,
    textKey: "q.memory.word_recall_food",
    optionsKey: ["apple_bread_milk", "apple_milk_bread", "milk_apple_bread", "bread_apple_milk"],
    correctIndex: 1,
  },
];

// --- Visual recall (m15–m23) ---
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

// --- Additional multiple-choice (m24–m32) ---
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

// --- Sequence recall (m33–m40) ---
const seqQs: Question[] = Array.from({ length: 8 }, (_, i) => ({
  id: `m${33 + i}`,
  kind: "sequence" as const,
  category: CategoryId.Memory,
  textKey: `q.memory.seq_${33 + i}`,
  itemsKey: [
    `q.memory.seq_${33 + i}.i1`,
    `q.memory.seq_${33 + i}.i2`,
    `q.memory.seq_${33 + i}.i3`,
    `q.memory.seq_${33 + i}.i4`,
  ],
  answerSequence: [0, 1, 2, 3],
}));

// --- Export combined list ---
export const MEMORY_QUESTIONS: Question[] = [
  ...baseQs,
  ...visualQs,
  ...multiQs,
  ...seqQs,
];

// --- Answer key for scoring ---
export const ANSWER_KEY_MEMORY: Record<string, number> = Object.fromEntries(
  MEMORY_QUESTIONS.map((q) => [q.id, (q as any).correctIndex ?? -1])
);
