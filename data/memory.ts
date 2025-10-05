// /data/memory.ts
import { CategoryId, Question } from "@/lib/types";

export const MEMORY_QUESTIONS: Question[] = [
  // --- Short digit memory ---
  {
    id: "m1",
    kind: "sequence",
    category: CategoryId.Memory,
    textKey: "q.memory.digits_01",
    itemsKey: [
      "q.memory.digits_01.i1",
      "q.memory.digits_01.i2",
      "q.memory.digits_01.i3",
      "q.memory.digits_01.i4",
      "q.memory.digits_01.i5"
    ],
    answerSequence: [2, 4, 1, 3, 0]
  },
  {
    id: "m2",
    kind: "sequence",
    category: CategoryId.Memory,
    textKey: "q.memory.digits_02",
    itemsKey: [
      "q.memory.digits_02.i1",
      "q.memory.digits_02.i2",
      "q.memory.digits_02.i3",
      "q.memory.digits_02.i4",
      "q.memory.digits_02.i5"
    ],
    answerSequence: [1, 0, 4, 2, 3]
  },

  // --- Letter recall ---
  {
    id: "m3",
    kind: "sequence",
    category: CategoryId.Memory,
    textKey: "q.memory.letters_03",
    itemsKey: [
      "q.memory.letters_03.i1",
      "q.memory.letters_03.i2",
      "q.memory.letters_03.i3",
      "q.memory.letters_03.i4"
    ],
    answerSequence: [3, 1, 0, 2]
  },
  {
    id: "m4",
    kind: "sequence",
    category: CategoryId.Memory,
    textKey: "q.memory.letters_04",
    itemsKey: [
      "q.memory.letters_04.i1",
      "q.memory.letters_04.i2",
      "q.memory.letters_04.i3",
      "q.memory.letters_04.i4"
    ],
    answerSequence: [0, 2, 1, 3]
  },

  // --- Word recall ---
  {
    id: "m5",
    kind: "multiple",
    category: CategoryId.Memory,
    textKey: "q.memory.words_05",
    optionsKey: [
      "q.memory.words_05.a",
      "q.memory.words_05.b",
      "q.memory.words_05.c",
      "q.memory.words_05.d"
    ],
    correctIndex: 3
  },
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
