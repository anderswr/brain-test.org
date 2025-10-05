// /data/memory.ts
import { CategoryId, Question } from "@/lib/types";

/**
 * MEMORY MODULE (40 questions)
 * Covers: short-term recall, sequence memory, and visual retention.
 * - m1–m14: verbal/numeric recall (multiple choice)
 * - m15–m40: visual + mixed sequence tasks
 */

const kinds = ["multiple", "sequence", "visual"] as const;

export const MEMORY_QUESTIONS: Question[] = [
  // --- Multiple-choice memory recall ---
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
    answerSequence: [0, 1, 2, 3].sort(() => 0.5 - Math.random()),
  })),
];

// --- Answer key (for programmatic scoring) ---
export const ANSWER_KEY_MEMORY: Record<string, number> = Object.fromEntries(
  MEMORY_QUESTIONS.map((q) => [q.id, q.correctIndex ?? -1])
);
  {
    id: "m6",
    kind: "multiple",
    category: CategoryId.Memory,
    textKey: "q.memory.words_06",
    optionsKey: [
      "q.memory.words_06.a",
      "q.memory.words_06.b",
      "q.memory.words_06.c",
      "q.memory.words_06.d"
    ],
    correctIndex: 1
  },

  // --- Visual pattern recall ---
  {
    id: "m7",
    kind: "visual",
    category: CategoryId.Memory,
    textKey: "q.memory.visual_07",
    image: "/assets/img/q/memory/m07.png",
    optionsKey: [
      "q.memory.visual_07.a",
      "q.memory.visual_07.b",
      "q.memory.visual_07.c",
      "q.memory.visual_07.d"
    ],
    correctIndex: 0
  },
  {
    id: "m8",
    kind: "visual",
    category: CategoryId.Memory,
    textKey: "q.memory.visual_08",
    image: "/assets/img/q/memory/m08.png",
    optionsKey: [
      "q.memory.visual_08.a",
      "q.memory.visual_08.b",
      "q.memory.visual_08.c",
      "q.memory.visual_08.d"
    ],
    correctIndex: 2
  },

  // --- Symbol matching ---
  {
    id: "m9",
    kind: "visual",
    category: CategoryId.Memory,
    textKey: "q.memory.symbol_09",
    image: "/assets/img/q/memory/m09.png",
    optionsKey: [
      "q.memory.symbol_09.a",
      "q.memory.symbol_09.b",
      "q.memory.symbol_09.c",
      "q.memory.symbol_09.d"
    ],
    correctIndex: 1
  },
  {
    id: "m10",
    kind: "visual",
    category: CategoryId.Memory,
    textKey: "q.memory.symbol_10",
    image: "/assets/img/q/memory/m10.png",
    optionsKey: [
      "q.memory.symbol_10.a",
      "q.memory.symbol_10.b",
      "q.memory.symbol_10.c",
      "q.memory.symbol_10.d"
    ],
    correctIndex: 3
  },

  // --- Story recall ---
  {
    id: "m11",
    kind: "multiple",
    category: CategoryId.Memory,
    textKey: "q.memory.story_11",
    optionsKey: [
      "q.memory.story_11.a",
      "q.memory.story_11.b",
      "q.memory.story_11.c",
      "q.memory.story_11.d"
    ],
    correctIndex: 2
  },
  {
    id: "m12",
    kind: "multiple",
    category: CategoryId.Memory,
    textKey: "q.memory.story_12",
    optionsKey: [
      "q.memory.story_12.a",
      "q.memory.story_12.b",
      "q.memory.story_12.c",
      "q.memory.story_12.d"
    ],
    correctIndex: 0
  },

  // --- Sequence matching ---
  {
    id: "m13",
    kind: "sequence",
    category: CategoryId.Memory,
    textKey: "q.memory.sequence_13",
    itemsKey: [
      "q.memory.sequence_13.i1",
      "q.memory.sequence_13.i2",
      "q.memory.sequence_13.i3",
      "q.memory.sequence_13.i4"
    ],
    answerSequence: [1, 3, 0, 2]
  },
  {
    id: "m14",
    kind: "sequence",
    category: CategoryId.Memory,
    textKey: "q.memory.sequence_14",
    itemsKey: [
      "q.memory.sequence_14.i1",
      "q.memory.sequence_14.i2",
      "q.memory.sequence_14.i3",
      "q.memory.sequence_14.i4"
    ],
    answerSequence: [2, 0, 1, 3]
  },

  // --- Continue with visual & mixed ---
  ...Array.from({ length: 26 }, (_, i) => ({
    id: `m${15 + i}`,
    kind: i % 3 === 0 ? "visual" : i % 3 === 1 ? "multiple" : "sequence",
    category: CategoryId.Memory,
    textKey: `q.memory.auto_${15 + i}`,
    image: `/assets/img/q/memory/m${15 + i}.png`,
    optionsKey: [
      `q.memory.auto_${15 + i}.a`,
      `q.memory.auto_${15 + i}.b`,
      `q.memory.auto_${15 + i}.c`,
      `q.memory.auto_${15 + i}.d`
    ],
    correctIndex: (i * 2) % 4,
    answerSequence: [3, 1, 0, 2]
  }))
];
