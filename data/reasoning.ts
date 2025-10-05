// /data/reasoning.ts
import { CategoryId, Question } from "@/lib/types";

export const REASONING_QUESTIONS: Question[] = [
  // --- Multiple (text) ---
  {
    id: "r1",
    kind: "multiple",
    category: CategoryId.Reasoning,
    textKey: "q.reasoning.seq_next_01",
    optionsKey: [
      "q.reasoning.seq_next_01.a",
      "q.reasoning.seq_next_01.b",
      "q.reasoning.seq_next_01.c",
      "q.reasoning.seq_next_01.d"
    ],
    correctIndex: 1
  },
  {
    id: "r2",
    kind: "multiple",
    category: CategoryId.Reasoning,
    textKey: "q.reasoning.odd_one_02",
    optionsKey: [
      "q.reasoning.odd_one_02.a",
      "q.reasoning.odd_one_02.b",
      "q.reasoning.odd_one_02.c",
      "q.reasoning.odd_one_02.d"
    ],
    correctIndex: 3
  },
  {
    id: "r3",
    kind: "multiple",
    category: CategoryId.Reasoning,
    textKey: "q.reasoning.analogy_03",
    optionsKey: [
      "q.reasoning.analogy_03.a",
      "q.reasoning.analogy_03.b",
      "q.reasoning.analogy_03.c",
      "q.reasoning.analogy_03.d"
    ],
    correctIndex: 1
  },
  {
    id: "r4",
    kind: "multiple",
    category: CategoryId.Reasoning,
    textKey: "q.reasoning.seq_next_04",
    optionsKey: [
      "q.reasoning.seq_next_04.a",
      "q.reasoning.seq_next_04.b",
      "q.reasoning.seq_next_04.c",
      "q.reasoning.seq_next_04.d"
    ],
    correctIndex: 0
  },
  {
    id: "r5",
    kind: "multiple",
    category: CategoryId.Reasoning,
    textKey: "q.reasoning.prop_05",
    optionsKey: [
      "q.reasoning.prop_05.a",
      "q.reasoning.prop_05.b",
      "q.reasoning.prop_05.c",
      "q.reasoning.prop_05.d"
    ],
    correctIndex: 2
  },
  {
    id: "r6",
    kind: "multiple",
    category: CategoryId.Reasoning,
    textKey: "q.reasoning.word_logic_06",
    optionsKey: [
      "q.reasoning.word_logic_06.a",
      "q.reasoning.word_logic_06.b",
      "q.reasoning.word_logic_06.c",
      "q.reasoning.word_logic_06.d"
    ],
    correctIndex: 0
  },
  {
    id: "r7",
    kind: "multiple",
    category: CategoryId.Reasoning,
    textKey: "q.reasoning.seq_next_07",
    optionsKey: [
      "q.reasoning.seq_next_07.a",
      "q.reasoning.seq_next_07.b",
      "q.reasoning.seq_next_07.c",
      "q.reasoning.seq_next_07.d"
    ],
    correctIndex: 2
  },
  {
    id: "r8",
    kind: "multiple",
    category: CategoryId.Reasoning,
    textKey: "q.reasoning.odd_one_08",
    optionsKey: [
      "q.reasoning.odd_one_08.a",
      "q.reasoning.odd_one_08.b",
      "q.reasoning.odd_one_08.c",
      "q.reasoning.odd_one_08.d"
    ],
    correctIndex: 1
  },
  {
    id: "r9",
    kind: "multiple",
    category: CategoryId.Reasoning,
    textKey: "q.reasoning.analogy_09",
    optionsKey: [
      "q.reasoning.analogy_09.a",
      "q.reasoning.analogy_09.b",
      "q.reasoning.analogy_09.c",
      "q.reasoning.analogy_09.d"
    ],
    correctIndex: 3
  },
  {
    id: "r10",
    kind: "multiple",
    category: CategoryId.Reasoning,
    textKey: "q.reasoning.syllogism_10",
    optionsKey: [
      "q.reasoning.syllogism_10.a",
      "q.reasoning.syllogism_10.b",
      "q.reasoning.syllogism_10.c",
      "q.reasoning.syllogism_10.d"
    ],
    correctIndex: 0
  },

  // --- Sequence (order items) ---
  {
    id: "r11",
    kind: "sequence",
    category: CategoryId.Reasoning,
    textKey: "q.reasoning.sequence_11",
    itemsKey: [
      "q.reasoning.sequence_11.i1",
      "q.reasoning.sequence_11.i2",
      "q.reasoning.sequence_11.i3",
      "q.reasoning.sequence_11.i4"
    ],
    answerSequence: [3, 1, 0, 2],
    partialCredit: true
  },
  {
    id: "r12",
    kind: "sequence",
    category: CategoryId.Reasoning,
    textKey: "q.reasoning.sequence_12",
    itemsKey: [
      "q.reasoning.sequence_12.i1",
      "q.reasoning.sequence_12.i2",
      "q.reasoning.sequence_12.i3",
      "q.reasoning.sequence_12.i4"
    ],
    answerSequence: [1, 3, 0, 2],
    partialCredit: true
  },
  {
    id: "r13",
    kind: "sequence",
    category: CategoryId.Reasoning,
    textKey: "q.reasoning.sequence_13",
    itemsKey: [
      "q.reasoning.sequence_13.i1",
      "q.reasoning.sequence_13.i2",
      "q.reasoning.sequence_13.i3",
      "q.reasoning.sequence_13.i4",
      "q.reasoning.sequence_13.i5"
    ],
    answerSequence: [4, 2, 0, 1, 3],
    partialCredit: true
  },
  {
    id: "r14",
    kind: "sequence",
    category: CategoryId.Reasoning,
    textKey: "q.reasoning.sequence_14",
    itemsKey: [
      "q.reasoning.sequence_14.i1",
      "q.reasoning.sequence_14.i2",
      "q.reasoning.sequence_14.i3",
      "q.reasoning.sequence_14.i4"
    ],
    answerSequence: [2, 0, 3, 1],
    partialCredit: true
  },

  // --- Visual (PNG + MCQ) ---
  {
    id: "r15",
    kind: "visual",
    category: CategoryId.Reasoning,
    textKey: "q.reasoning.visual_15",
    image: "/assets/img/q/reasoning/r15.png",
    optionsKey: [
      "q.reasoning.visual_15.a",
      "q.reasoning.visual_15.b",
      "q.reasoning.visual_15.c",
      "q.reasoning.visual_15.d"
    ],
    correctIndex: 2
  },
  {
    id: "r16",
    kind: "visual",
    category: CategoryId.Reasoning,
    textKey: "q.reasoning.visual_16",
    image: "/assets/img/q/reasoning/r16.png",
    optionsKey: [
      "q.reasoning.visual_16.a",
      "q.reasoning.visual_16.b",
      "q.reasoning.visual_16.c",
      "q.reasoning.visual_16.d"
    ],
    correctIndex: 0
  },
  {
    id: "r17",
    kind: "visual",
    category: CategoryId.Reasoning,
    textKey: "q.reasoning.visual_17",
    image: "/assets/img/q/reasoning/r17.png",
    optionsKey: [
      "q.reasoning.visual_17.a",
      "q.reasoning.visual_17.b",
      "q.reasoning.visual_17.c",
      "q.reasoning.visual_17.d"
    ],
    correctIndex: 1
  },
  {
    id: "r18",
    kind: "visual",
    category: CategoryId.Reasoning,
    textKey: "q.reasoning.visual_18",
    image: "/assets/img/q/reasoning/r18.png",
    optionsKey: [
      "q.reasoning.visual_18.a",
      "q.reasoning.visual_18.b",
      "q.reasoning.visual_18.c",
      "q.reasoning.visual_18.d"
    ],
    correctIndex: 3
  },

  // --- Matrix (PNG + MCQ) ---
  {
    id: "r19",
    kind: "matrix",
    category: CategoryId.Reasoning,
    textKey: "q.reasoning.matrix_19",
    image: "/assets/img/q/reasoning/r19.png",
    optionsKey: [
      "q.reasoning.matrix_19.a",
      "q.reasoning.matrix_19.b",
      "q.reasoning.matrix_19.c",
      "q.reasoning.matrix_19.d"
    ],
    correctIndex: 1
  },
  {
    id: "r20",
    kind: "matrix",
    category: CategoryId.Reasoning,
    textKey: "q.reasoning.matrix_20",
    image: "/assets/img/q/reasoning/r20.png",
    optionsKey: [
      "q.reasoning.matrix_20.a",
      "q.reasoning.matrix_20.b",
      "q.reasoning.matrix_20.c",
      "q.reasoning.matrix_20.d"
    ],
    correctIndex: 2
  },

  // --- Multiple (text) continued ---
  {
    id: "r21",
    kind: "multiple",
    category: CategoryId.Reasoning,
    textKey: "q.reasoning.seq_next_21",
    optionsKey: [
      "q.reasoning.seq_next_21.a",
      "q.reasoning.seq_next_21.b",
      "q.reasoning.seq_next_21.c",
      "q.reasoning.seq_next_21.d"
    ],
    correctIndex: 0
  },
  {
    id: "r22",
    kind: "multiple",
    category: CategoryId.Reasoning,
    textKey: "q.reasoning.odd_one_22",
    optionsKey: [
      "q.reasoning.odd_one_22.a",
      "q.reasoning.odd_one_22.b",
      "q.reasoning.odd_one_22.c",
      "q.reasoning.odd_one_22.d"
    ],
    correctIndex: 2
  },
  {
    id: "r23",
    kind: "multiple",
    category: CategoryId.Reasoning,
    textKey: "q.reasoning.analogy_23",
    optionsKey: [
      "q.reasoning.analogy_23.a",
      "q.reasoning.analogy_23.b",
      "q.reasoning.analogy_23.c",
      "q.reasoning.analogy_23.d"
    ],
    correctIndex: 1
  },
  {
    id: "r24",
    kind: "multiple",
    category: CategoryId.Reasoning,
    textKey: "q.reasoning.logic_grid_24",
    optionsKey: [
      "q.reasoning.logic_grid_24.a",
      "q.reasoning.logic_grid_24.b",
      "q.reasoning.logic_grid_24.c",
      "q.reasoning.logic_grid_24.d"
    ],
    correctIndex: 3
  },

  // --- Sequence (more) ---
  {
    id: "r25",
    kind: "sequence",
    category: CategoryId.Reasoning,
    textKey: "q.reasoning.sequence_25",
    itemsKey: [
      "q.reasoning.sequence_25.i1",
      "q.reasoning.sequence_25.i2",
      "q.reasoning.sequence_25.i3",
      "q.reasoning.sequence_25.i4"
    ],
    answerSequence: [2, 0, 3, 1],
    partialCredit: true
  },
  {
    id: "r26",
    kind: "sequence",
    category: CategoryId.Reasoning,
    textKey: "q.reasoning.sequence_26",
    itemsKey: [
      "q.reasoning.sequence_26.i1",
      "q.reasoning.sequence_26.i2",
      "q.reasoning.sequence_26.i3",
      "q.reasoning.sequence_26.i4",
      "q.reasoning.sequence_26.i5"
    ],
    answerSequence: [1, 4, 2, 0, 3],
    partialCredit: true
  },

  // --- Visual (PNG + MCQ) continued ---
  {
    id: "r27",
    kind: "visual",
    category: CategoryId.Reasoning,
    textKey: "q.reasoning.visual_27",
    image: "/assets/img/q/reasoning/r27.png",
    optionsKey: [
      "q.reasoning.visual_27.a",
      "q.reasoning.visual_27.b",
      "q.reasoning.visual_27.c",
      "q.reasoning.visual_27.d"
    ],
    correctIndex: 2
  },
  {
    id: "r28",
    kind: "visual",
    category: CategoryId.Reasoning,
    textKey: "q.reasoning.visual_28",
    image: "/assets/img/q/reasoning/r28.png",
    optionsKey: [
      "q.reasoning.visual_28.a",
      "q.reasoning.visual_28.b",
      "q.reasoning.visual_28.c",
      "q.reasoning.visual_28.d"
    ],
    correctIndex: 0
  },

  // --- Matrix (PNG + MCQ) continued ---
  {
    id: "r29",
    kind: "matrix",
    category: CategoryId.Reasoning,
    textKey: "q.reasoning.matrix_29",
    image: "/assets/img/q/reasoning/r29.png",
    optionsKey: [
      "q.reasoning.matrix_29.a",
      "q.reasoning.matrix_29.b",
      "q.reasoning.matrix_29.c",
      "q.reasoning.matrix_29.d"
    ],
    correctIndex: 3
  },
  {
    id: "r30",
    kind: "matrix",
    category: CategoryId.Reasoning,
    textKey: "q.reasoning.matrix_30",
    image: "/assets/img/q/reasoning/r30.png",
    optionsKey: [
      "q.reasoning.matrix_30.a",
      "q.reasoning.matrix_30.b",
      "q.reasoning.matrix_30.c",
      "q.reasoning.matrix_30.d"
    ],
    correctIndex: 1
  },

  // --- Multiple (text) wrap-up ---
  {
    id: "r31",
    kind: "multiple",
    category: CategoryId.Reasoning,
    textKey: "q.reasoning.eq_relation_31",
    optionsKey: [
      "q.reasoning.eq_relation_31.a",
      "q.reasoning.eq_relation_31.b",
      "q.reasoning.eq_relation_31.c",
      "q.reasoning.eq_relation_31.d"
    ],
    correctIndex: 2
  },
  {
    id: "r32",
    kind: "multiple",
    category: CategoryId.Reasoning,
    textKey: "q.reasoning.rule_infer_32",
    optionsKey: [
      "q.reasoning.rule_infer_32.a",
      "q.reasoning.rule_infer_32.b",
      "q.reasoning.rule_infer_32.c",
      "q.reasoning.rule_infer_32.d"
    ],
    correctIndex: 1
  },
  {
    id: "r33",
    kind: "multiple",
    category: CategoryId.Reasoning,
    textKey: "q.reasoning.seq_next_33",
    optionsKey: [
      "q.reasoning.seq_next_33.a",
      "q.reasoning.seq_next_33.b",
      "q.reasoning.seq_next_33.c",
      "q.reasoning.seq_next_33.d"
    ],
    correctIndex: 0
  },
  {
    id: "r34",
    kind: "multiple",
    category: CategoryId.Reasoning,
    textKey: "q.reasoning.odd_one_34",
    optionsKey: [
      "q.reasoning.odd_one_34.a",
      "q.reasoning.odd_one_34.b",
      "q.reasoning.odd_one_34.c",
      "q.reasoning.odd_one_34.d"
    ],
    correctIndex: 2
  },

  // --- Sequence (final batch) ---
  {
    id: "r35",
    kind: "sequence",
    category: CategoryId.Reasoning,
    textKey: "q.reasoning.sequence_35",
    itemsKey: [
      "q.reasoning.sequence_35.i1",
      "q.reasoning.sequence_35.i2",
      "q.reasoning.sequence_35.i3",
      "q.reasoning.sequence_35.i4"
    ],
    answerSequence: [1, 3, 0, 2],
    partialCredit: true
  },
  {
    id: "r36",
    kind: "sequence",
    category: CategoryId.Reasoning,
    textKey: "q.reasoning.sequence_36",
    itemsKey: [
      "q.reasoning.sequence_36.i1",
      "q.reasoning.sequence_36.i2",
      "q.reasoning.sequence_36.i3",
      "q.reasoning.sequence_36.i4",
      "q.reasoning.sequence_36.i5"
    ],
    answerSequence: [2, 4, 1, 3, 0],
    partialCredit: true
  },

  // --- Visual/Matrix (final couple) ---
  {
    id: "r37",
    kind: "visual",
    category: CategoryId.Reasoning,
    textKey: "q.reasoning.visual_37",
    image: "/assets/img/q/reasoning/r37.png",
    optionsKey: [
      "q.reasoning.visual_37.a",
      "q.reasoning.visual_37.b",
      "q.reasoning.visual_37.c",
      "q.reasoning.visual_37.d"
    ],
    correctIndex: 3
  },
  {
    id: "r38",
    kind: "matrix",
    category: CategoryId.Reasoning,
    textKey: "q.reasoning.matrix_38",
    image: "/assets/img/q/reasoning/r38.png",
    optionsKey: [
      "q.reasoning.matrix_38.a",
      "q.reasoning.matrix_38.b",
      "q.reasoning.matrix_38.c",
      "q.reasoning.matrix_38.d"
    ],
    correctIndex: 0
  },

  // --- Multiple (closing) ---
  {
    id: "r39",
    kind: "multiple",
    category: CategoryId.Reasoning,
    textKey: "q.reasoning.analogy_39",
    optionsKey: [
      "q.reasoning.analogy_39.a",
      "q.reasoning.analogy_39.b",
      "q.reasoning.analogy_39.c",
      "q.reasoning.analogy_39.d"
    ],
    correctIndex: 2
  },
  {
    id: "r40",
    kind: "multiple",
    category: CategoryId.Reasoning,
    textKey: "q.reasoning.rule_infer_40",
    optionsKey: [
      "q.reasoning.rule_infer_40.a",
      "q.reasoning.rule_infer_40.b",
      "q.reasoning.rule_infer_40.c",
      "q.reasoning.rule_infer_40.d"
    ],
    correctIndex: 1
  }
];
