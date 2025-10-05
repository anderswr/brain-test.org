// /data/math.ts
import { CategoryId, Question } from "@/lib/types";

export const MATH_QUESTIONS: Question[] = [
  // --- Multiple choice numeric patterns ---
  {
    id: "m1",
    kind: "multiple",
    category: CategoryId.Math,
    textKey: "q.math.seq_next_01",
    optionsKey: [
      "q.math.seq_next_01.a",
      "q.math.seq_next_01.b",
      "q.math.seq_next_01.c",
      "q.math.seq_next_01.d"
    ],
    correctIndex: 2
  },
  {
    id: "m2",
    kind: "multiple",
    category: CategoryId.Math,
    textKey: "q.math.algebra_02",
    optionsKey: [
      "q.math.algebra_02.a",
      "q.math.algebra_02.b",
      "q.math.algebra_02.c",
      "q.math.algebra_02.d"
    ],
    correctIndex: 3
  },
  {
    id: "m3",
    kind: "multiple",
    category: CategoryId.Math,
    textKey: "q.math.ratio_03",
    optionsKey: [
      "q.math.ratio_03.a",
      "q.math.ratio_03.b",
      "q.math.ratio_03.c",
      "q.math.ratio_03.d"
    ],
    correctIndex: 1
  },
  {
    id: "m4",
    kind: "multiple",
    category: CategoryId.Math,
    textKey: "q.math.percent_04",
    optionsKey: [
      "q.math.percent_04.a",
      "q.math.percent_04.b",
      "q.math.percent_04.c",
      "q.math.percent_04.d"
    ],
    correctIndex: 2
  },
  {
    id: "m5",
    kind: "multiple",
    category: CategoryId.Math,
    textKey: "q.math.time_05",
    optionsKey: [
      "q.math.time_05.a",
      "q.math.time_05.b",
      "q.math.time_05.c",
      "q.math.time_05.d"
    ],
    correctIndex: 1
  },
  {
    id: "m6",
    kind: "multiple",
    category: CategoryId.Math,
    textKey: "q.math.geom_area_06",
    optionsKey: [
      "q.math.geom_area_06.a",
      "q.math.geom_area_06.b",
      "q.math.geom_area_06.c",
      "q.math.geom_area_06.d"
    ],
    correctIndex: 0
  },
  {
    id: "m7",
    kind: "multiple",
    category: CategoryId.Math,
    textKey: "q.math.seq_next_07",
    optionsKey: [
      "q.math.seq_next_07.a",
      "q.math.seq_next_07.b",
      "q.math.seq_next_07.c",
      "q.math.seq_next_07.d"
    ],
    correctIndex: 1
  },
  {
    id: "m8",
    kind: "multiple",
    category: CategoryId.Math,
    textKey: "q.math.average_08",
    optionsKey: [
      "q.math.average_08.a",
      "q.math.average_08.b",
      "q.math.average_08.c",
      "q.math.average_08.d"
    ],
    correctIndex: 2
  },
  {
    id: "m9",
    kind: "multiple",
    category: CategoryId.Math,
    textKey: "q.math.fraction_09",
    optionsKey: [
      "q.math.fraction_09.a",
      "q.math.fraction_09.b",
      "q.math.fraction_09.c",
      "q.math.fraction_09.d"
    ],
    correctIndex: 0
  },
  {
    id: "m10",
    kind: "multiple",
    category: CategoryId.Math,
    textKey: "q.math.logic_10",
    optionsKey: [
      "q.math.logic_10.a",
      "q.math.logic_10.b",
      "q.math.logic_10.c",
      "q.math.logic_10.d"
    ],
    correctIndex: 3
  },

  // --- Sequence ordering ---
  {
    id: "m11",
    kind: "sequence",
    category: CategoryId.Math,
    textKey: "q.math.sequence_11",
    itemsKey: [
      "q.math.sequence_11.i1",
      "q.math.sequence_11.i2",
      "q.math.sequence_11.i3",
      "q.math.sequence_11.i4"
    ],
    answerSequence: [3, 2, 1, 0],
    partialCredit: true
  },
  {
    id: "m12",
    kind: "sequence",
    category: CategoryId.Math,
    textKey: "q.math.sequence_12",
    itemsKey: [
      "q.math.sequence_12.i1",
      "q.math.sequence_12.i2",
      "q.math.sequence_12.i3",
      "q.math.sequence_12.i4"
    ],
    answerSequence: [1, 2, 0, 3],
    partialCredit: true
  },

  // --- Visual/matrix (few math-logic figures) ---
  {
    id: "m13",
    kind: "matrix",
    category: CategoryId.Math,
    textKey: "q.math.matrix_13",
    image: "/assets/img/q/math/m13.png",
    optionsKey: [
      "q.math.matrix_13.a",
      "q.math.matrix_13.b",
      "q.math.matrix_13.c",
      "q.math.matrix_13.d"
    ],
    correctIndex: 2
  },
  {
    id: "m14",
    kind: "visual",
    category: CategoryId.Math,
    textKey: "q.math.visual_14",
    image: "/assets/img/q/math/m14.png",
    optionsKey: [
      "q.math.visual_14.a",
      "q.math.visual_14.b",
      "q.math.visual_14.c",
      "q.math.visual_14.d"
    ],
    correctIndex: 1
  },

  // --- Worded math problems ---
  {
    id: "m15",
    kind: "multiple",
    category: CategoryId.Math,
    textKey: "q.math.word_prob_15",
    optionsKey: [
      "q.math.word_prob_15.a",
      "q.math.word_prob_15.b",
      "q.math.word_prob_15.c",
      "q.math.word_prob_15.d"
    ],
    correctIndex: 3
  },
  {
    id: "m16",
    kind: "multiple",
    category: CategoryId.Math,
    textKey: "q.math.word_prob_16",
    optionsKey: [
      "q.math.word_prob_16.a",
      "q.math.word_prob_16.b",
      "q.math.word_prob_16.c",
      "q.math.word_prob_16.d"
    ],
    correctIndex: 0
  },
  {
    id: "m17",
    kind: "multiple",
    category: CategoryId.Math,
    textKey: "q.math.equation_17",
    optionsKey: [
      "q.math.equation_17.a",
      "q.math.equation_17.b",
      "q.math.equation_17.c",
      "q.math.equation_17.d"
    ],
    correctIndex: 1
  },
  {
    id: "m18",
    kind: "multiple",
    category: CategoryId.Math,
    textKey: "q.math.pattern_18",
    optionsKey: [
      "q.math.pattern_18.a",
      "q.math.pattern_18.b",
      "q.math.pattern_18.c",
      "q.math.pattern_18.d"
    ],
    correctIndex: 0
  },

  // --- Remaining variety to reach 40 ---
  {
    id: "m19",
    kind: "multiple",
    category: CategoryId.Math,
    textKey: "q.math.graph_19",
    optionsKey: [
      "q.math.graph_19.a",
      "q.math.graph_19.b",
      "q.math.graph_19.c",
      "q.math.graph_19.d"
    ],
    correctIndex: 2
  },
  {
    id: "m20",
    kind: "multiple",
    category: CategoryId.Math,
    textKey: "q.math.estimation_20",
    optionsKey: [
      "q.math.estimation_20.a",
      "q.math.estimation_20.b",
      "q.math.estimation_20.c",
      "q.math.estimation_20.d"
    ],
    correctIndex: 1
  },
  {
    id: "m21",
    kind: "multiple",
    category: CategoryId.Math,
    textKey: "q.math.logic_21",
    optionsKey: [
      "q.math.logic_21.a",
      "q.math.logic_21.b",
      "q.math.logic_21.c",
      "q.math.logic_21.d"
    ],
    correctIndex: 0
  },
  {
    id: "m22",
    kind: "multiple",
    category: CategoryId.Math,
    textKey: "q.math.pattern_22",
    optionsKey: [
      "q.math.pattern_22.a",
      "q.math.pattern_22.b",
      "q.math.pattern_22.c",
      "q.math.pattern_22.d"
    ],
    correctIndex: 2
  },
  {
    id: "m23",
    kind: "sequence",
    category: CategoryId.Math,
    textKey: "q.math.sequence_23",
    itemsKey: [
      "q.math.sequence_23.i1",
      "q.math.sequence_23.i2",
      "q.math.sequence_23.i3",
      "q.math.sequence_23.i4"
    ],
    answerSequence: [1, 3, 0, 2],
    partialCredit: true
  },
  {
    id: "m24",
    kind: "sequence",
    category: CategoryId.Math,
    textKey: "q.math.sequence_24",
    itemsKey: [
      "q.math.sequence_24.i1",
      "q.math.sequence_24.i2",
      "q.math.sequence_24.i3",
      "q.math.sequence_24.i4"
    ],
    answerSequence: [0, 2, 1, 3],
    partialCredit: true
  },
  {
    id: "m25",
    kind: "multiple",
    category: CategoryId.Math,
    textKey: "q.math.pattern_25",
    optionsKey: [
      "q.math.pattern_25.a",
      "q.math.pattern_25.b",
      "q.math.pattern_25.c",
      "q.math.pattern_25.d"
    ],
    correctIndex: 3
  },
  {
    id: "m26",
    kind: "multiple",
    category: CategoryId.Math,
    textKey: "q.math.equation_26",
    optionsKey: [
      "q.math.equation_26.a",
      "q.math.equation_26.b",
      "q.math.equation_26.c",
      "q.math.equation_26.d"
    ],
    correctIndex: 0
  },
  {
    id: "m27",
    kind: "multiple",
    category: CategoryId.Math,
    textKey: "q.math.logic_27",
    optionsKey: [
      "q.math.logic_27.a",
      "q.math.logic_27.b",
      "q.math.logic_27.c",
      "q.math.logic_27.d"
    ],
    correctIndex: 2
  },
  {
    id: "m28",
    kind: "multiple",
    category: CategoryId.Math,
    textKey: "q.math.algebra_28",
    optionsKey: [
      "q.math.algebra_28.a",
      "q.math.algebra_28.b",
      "q.math.algebra_28.c",
      "q.math.algebra_28.d"
    ],
    correctIndex: 1
  },
  {
    id: "m29",
    kind: "matrix",
    category: CategoryId.Math,
    textKey: "q.math.matrix_29",
    image: "/assets/img/q/math/m29.png",
    optionsKey: [
      "q.math.matrix_29.a",
      "q.math.matrix_29.b",
      "q.math.matrix_29.c",
      "q.math.matrix_29.d"
    ],
    correctIndex: 0
  },
  {
    id: "m30",
    kind: "matrix",
    category: CategoryId.Math,
    textKey: "q.math.matrix_30",
    image: "/assets/img/q/math/m30.png",
    optionsKey: [
      "q.math.matrix_30.a",
      "q.math.matrix_30.b",
      "q.math.matrix_30.c",
      "q.math.matrix_30.d"
    ],
    correctIndex: 3
  },
  {
    id: "m31",
    kind: "multiple",
    category: CategoryId.Math,
    textKey: "q.math.word_prob_31",
    optionsKey: [
      "q.math.word_prob_31.a",
      "q.math.word_prob_31.b",
      "q.math.word_prob_31.c",
      "q.math.word_prob_31.d"
    ],
    correctIndex: 2
  },
  {
    id: "m32",
    kind: "multiple",
    category: CategoryId.Math,
    textKey: "q.math.word_prob_32",
    optionsKey: [
      "q.math.word_prob_32.a",
      "q.math.word_prob_32.b",
      "q.math.word_prob_32.c",
      "q.math.word_prob_32.d"
    ],
    correctIndex: 0
  },
  {
    id: "m33",
    kind: "multiple",
    category: CategoryId.Math,
    textKey: "q.math.proportion_33",
    optionsKey: [
      "q.math.proportion_33.a",
      "q.math.proportion_33.b",
      "q.math.proportion_33.c",
      "q.math.proportion_33.d"
    ],
    correctIndex: 1
  },
  {
    id: "m34",
    kind: "multiple",
    category: CategoryId.Math,
    textKey: "q.math.logic_34",
    optionsKey: [
      "q.math.logic_34.a",
      "q.math.logic_34.b",
      "q.math.logic_34.c",
      "q.math.logic_34.d"
    ],
    correctIndex: 0
  },
  {
    id: "m35",
    kind: "multiple",
    category: CategoryId.Math,
    textKey: "q.math.seq_next_35",
    optionsKey: [
      "q.math.seq_next_35.a",
      "q.math.seq_next_35.b",
      "q.math.seq_next_35.c",
      "q.math.seq_next_35.d"
    ],
    correctIndex: 1
  },
  {
    id: "m36",
    kind: "multiple",
    category: CategoryId.Math,
    textKey: "q.math.pattern_36",
    optionsKey: [
      "q.math.pattern_36.a",
      "q.math.pattern_36.b",
      "q.math.pattern_36.c",
      "q.math.pattern_36.d"
    ],
    correctIndex: 2
  },
  {
    id: "m37",
    kind: "multiple",
    category: CategoryId.Math,
    textKey: "q.math.equation_37",
    optionsKey: [
      "q.math.equation_37.a",
      "q.math.equation_37.b",
      "q.math.equation_37.c",
      "q.math.equation_37.d"
    ],
    correctIndex: 3
  },
  {
    id: "m38",
    kind: "multiple",
    category: CategoryId.Math,
    textKey: "q.math.word_prob_38",
    optionsKey: [
      "q.math.word_prob_38.a",
      "q.math.word_prob_38.b",
      "q.math.word_prob_38.c",
      "q.math.word_prob_38.d"
    ],
    correctIndex: 2
  },
  {
    id: "m39",
    kind: "multiple",
    category: CategoryId.Math,
    textKey: "q.math.seq_next_39",
    optionsKey: [
      "q.math.seq_next_39.a",
      "q.math.seq_next_39.b",
      "q.math.seq_next_39.c",
      "q.math.seq_next_39.d"
    ],
    correctIndex: 0
  },
  {
    id: "m40",
    kind: "multiple",
    category: CategoryId.Math,
    textKey: "q.math.pattern_40",
    optionsKey: [
      "q.math.pattern_40.a",
      "q.math.pattern_40.b",
      "q.math.pattern_40.c",
      "q.math.pattern_40.d"
    ],
    correctIndex: 1
  }
];
