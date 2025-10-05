// /data/verbal.ts
import { CategoryId, Question } from "@/lib/types";

export const VERBAL_QUESTIONS: Question[] = [
  // --- Analogies ---
  {
    id: "v1",
    kind: "multiple",
    category: CategoryId.Verbal,
    textKey: "q.verbal.analogy_01",
    optionsKey: [
      "q.verbal.analogy_01.a",
      "q.verbal.analogy_01.b",
      "q.verbal.analogy_01.c",
      "q.verbal.analogy_01.d"
    ],
    correctIndex: 2
  },
  {
    id: "v2",
    kind: "multiple",
    category: CategoryId.Verbal,
    textKey: "q.verbal.analogy_02",
    optionsKey: [
      "q.verbal.analogy_02.a",
      "q.verbal.analogy_02.b",
      "q.verbal.analogy_02.c",
      "q.verbal.analogy_02.d"
    ],
    correctIndex: 1
  },

  // --- Synonyms ---
  {
    id: "v3",
    kind: "multiple",
    category: CategoryId.Verbal,
    textKey: "q.verbal.synonym_03",
    optionsKey: [
      "q.verbal.synonym_03.a",
      "q.verbal.synonym_03.b",
      "q.verbal.synonym_03.c",
      "q.verbal.synonym_03.d"
    ],
    correctIndex: 0
  },
  {
    id: "v4",
    kind: "multiple",
    category: CategoryId.Verbal,
    textKey: "q.verbal.synonym_04",
    optionsKey: [
      "q.verbal.synonym_04.a",
      "q.verbal.synonym_04.b",
      "q.verbal.synonym_04.c",
      "q.verbal.synonym_04.d"
    ],
    correctIndex: 2
  },

  // --- Antonyms ---
  {
    id: "v5",
    kind: "multiple",
    category: CategoryId.Verbal,
    textKey: "q.verbal.antonym_05",
    optionsKey: [
      "q.verbal.antonym_05.a",
      "q.verbal.antonym_05.b",
      "q.verbal.antonym_05.c",
      "q.verbal.antonym_05.d"
    ],
    correctIndex: 3
  },
  {
    id: "v6",
    kind: "multiple",
    category: CategoryId.Verbal,
    textKey: "q.verbal.antonym_06",
    optionsKey: [
      "q.verbal.antonym_06.a",
      "q.verbal.antonym_06.b",
      "q.verbal.antonym_06.c",
      "q.verbal.antonym_06.d"
    ],
    correctIndex: 1
  },

  // --- Odd word out ---
  {
    id: "v7",
    kind: "multiple",
    category: CategoryId.Verbal,
    textKey: "q.verbal.odd_07",
    optionsKey: [
      "q.verbal.odd_07.a",
      "q.verbal.odd_07.b",
      "q.verbal.odd_07.c",
      "q.verbal.odd_07.d"
    ],
    correctIndex: 0
  },
  {
    id: "v8",
    kind: "multiple",
    category: CategoryId.Verbal,
    textKey: "q.verbal.odd_08",
    optionsKey: [
      "q.verbal.odd_08.a",
      "q.verbal.odd_08.b",
      "q.verbal.odd_08.c",
      "q.verbal.odd_08.d"
    ],
    correctIndex: 3
  },

  // --- Sentence completion ---
  {
    id: "v9",
    kind: "multiple",
    category: CategoryId.Verbal,
    textKey: "q.verbal.sentence_09",
    optionsKey: [
      "q.verbal.sentence_09.a",
      "q.verbal.sentence_09.b",
      "q.verbal.sentence_09.c",
      "q.verbal.sentence_09.d"
    ],
    correctIndex: 1
  },
  {
    id: "v10",
    kind: "multiple",
    category: CategoryId.Verbal,
    textKey: "q.verbal.sentence_10",
    optionsKey: [
      "q.verbal.sentence_10.a",
      "q.verbal.sentence_10.b",
      "q.verbal.sentence_10.c",
      "q.verbal.sentence_10.d"
    ],
    correctIndex: 2
  },

  // --- Word order (sequence) ---
  {
    id: "v11",
    kind: "sequence",
    category: CategoryId.Verbal,
    textKey: "q.verbal.sequence_11",
    itemsKey: [
      "q.verbal.sequence_11.i1",
      "q.verbal.sequence_11.i2",
      "q.verbal.sequence_11.i3",
      "q.verbal.sequence_11.i4"
    ],
    answerSequence: [2, 0, 3, 1],
    partialCredit: true
  },
  {
    id: "v12",
    kind: "sequence",
    category: CategoryId.Verbal,
    textKey: "q.verbal.sequence_12",
    itemsKey: [
      "q.verbal.sequence_12.i1",
      "q.verbal.sequence_12.i2",
      "q.verbal.sequence_12.i3",
      "q.verbal.sequence_12.i4",
      "q.verbal.sequence_12.i5"
    ],
    answerSequence: [4, 0, 1, 2, 3],
    partialCredit: true
  },

  // --- Inference / short text ---
  {
    id: "v13",
    kind: "multiple",
    category: CategoryId.Verbal,
    textKey: "q.verbal.inference_13",
    optionsKey: [
      "q.verbal.inference_13.a",
      "q.verbal.inference_13.b",
      "q.verbal.inference_13.c",
      "q.verbal.inference_13.d"
    ],
    correctIndex: 2
  },
  {
    id: "v14",
    kind: "multiple",
    category: CategoryId.Verbal,
    textKey: "q.verbal.inference_14",
    optionsKey: [
      "q.verbal.inference_14.a",
      "q.verbal.inference_14.b",
      "q.verbal.inference_14.c",
      "q.verbal.inference_14.d"
    ],
    correctIndex: 0
  },

  // --- Visual word-image association ---
  {
    id: "v15",
    kind: "visual",
    category: CategoryId.Verbal,
    textKey: "q.verbal.visual_15",
    image: "/assets/img/q/verbal/v15.png",
    optionsKey: [
      "q.verbal.visual_15.a",
      "q.verbal.visual_15.b",
      "q.verbal.visual_15.c",
      "q.verbal.visual_15.d"
    ],
    correctIndex: 1
  },
  {
    id: "v16",
    kind: "visual",
    category: CategoryId.Verbal,
    textKey: "q.verbal.visual_16",
    image: "/assets/img/q/verbal/v16.png",
    optionsKey: [
      "q.verbal.visual_16.a",
      "q.verbal.visual_16.b",
      "q.verbal.visual_16.c",
      "q.verbal.visual_16.d"
    ],
    correctIndex: 0
  },

  // --- Synonyms / antonyms continued ---
  {
    id: "v17",
    kind: "multiple",
    category: CategoryId.Verbal,
    textKey: "q.verbal.synonym_17",
    optionsKey: [
      "q.verbal.synonym_17.a",
      "q.verbal.synonym_17.b",
      "q.verbal.synonym_17.c",
      "q.verbal.synonym_17.d"
    ],
    correctIndex: 3
  },
  {
    id: "v18",
    kind: "multiple",
    category: CategoryId.Verbal,
    textKey: "q.verbal.antonym_18",
    optionsKey: [
      "q.verbal.antonym_18.a",
      "q.verbal.antonym_18.b",
      "q.verbal.antonym_18.c",
      "q.verbal.antonym_18.d"
    ],
    correctIndex: 2
  },

  // --- Odd one out (advanced) ---
  {
    id: "v19",
    kind: "multiple",
    category: CategoryId.Verbal,
    textKey: "q.verbal.odd_19",
    optionsKey: [
      "q.verbal.odd_19.a",
      "q.verbal.odd_19.b",
      "q.verbal.odd_19.c",
      "q.verbal.odd_19.d"
    ],
    correctIndex: 1
  },

  // --- Short definition logic ---
  {
    id: "v20",
    kind: "multiple",
    category: CategoryId.Verbal,
    textKey: "q.verbal.definition_20",
    optionsKey: [
      "q.verbal.definition_20.a",
      "q.verbal.definition_20.b",
      "q.verbal.definition_20.c",
      "q.verbal.definition_20.d"
    ],
    correctIndex: 0
  },

  // --- Continue mix up to 40 ---
  {
    id: "v21",
    kind: "multiple",
    category: CategoryId.Verbal,
    textKey: "q.verbal.analogy_21",
    optionsKey: [
      "q.verbal.analogy_21.a",
      "q.verbal.analogy_21.b",
      "q.verbal.analogy_21.c",
      "q.verbal.analogy_21.d"
    ],
    correctIndex: 2
  },
  {
    id: "v22",
    kind: "multiple",
    category: CategoryId.Verbal,
    textKey: "q.verbal.synonym_22",
    optionsKey: [
      "q.verbal.synonym_22.a",
      "q.verbal.synonym_22.b",
      "q.verbal.synonym_22.c",
      "q.verbal.synonym_22.d"
    ],
    correctIndex: 1
  },
  {
    id: "v23",
    kind: "multiple",
    category: CategoryId.Verbal,
    textKey: "q.verbal.antonym_23",
    optionsKey: [
      "q.verbal.antonym_23.a",
      "q.verbal.antonym_23.b",
      "q.verbal.antonym_23.c",
      "q.verbal.antonym_23.d"
    ],
    correctIndex: 3
  },
  {
    id: "v24",
    kind: "multiple",
    category: CategoryId.Verbal,
    textKey: "q.verbal.inference_24",
    optionsKey: [
      "q.verbal.inference_24.a",
      "q.verbal.inference_24.b",
      "q.verbal.inference_24.c",
      "q.verbal.inference_24.d"
    ],
    correctIndex: 0
  },
  {
    id: "v25",
    kind: "sequence",
    category: CategoryId.Verbal,
    textKey: "q.verbal.sequence_25",
    itemsKey: [
      "q.verbal.sequence_25.i1",
      "q.verbal.sequence_25.i2",
      "q.verbal.sequence_25.i3",
      "q.verbal.sequence_25.i4"
    ],
    answerSequence: [3, 1, 0, 2],
    partialCredit: true
  },
  {
    id: "v26",
    kind: "sequence",
    category: CategoryId.Verbal,
    textKey: "q.verbal.sequence_26",
    itemsKey: [
      "q.verbal.sequence_26.i1",
      "q.verbal.sequence_26.i2",
      "q.verbal.sequence_26.i3",
      "q.verbal.sequence_26.i4"
    ],
    answerSequence: [2, 0, 3, 1],
    partialCredit: true
  },

  // --- Visual semantic relation ---
  {
    id: "v27",
    kind: "visual",
    category: CategoryId.Verbal,
    textKey: "q.verbal.visual_27",
    image: "/assets/img/q/verbal/v27.png",
    optionsKey: [
      "q.verbal.visual_27.a",
      "q.verbal.visual_27.b",
      "q.verbal.visual_27.c",
      "q.verbal.visual_27.d"
    ],
    correctIndex: 3
  },
  {
    id: "v28",
    kind: "visual",
    category: CategoryId.Verbal,
    textKey: "q.verbal.visual_28",
    image: "/assets/img/q/verbal/v28.png",
    optionsKey: [
      "q.verbal.visual_28.a",
      "q.verbal.visual_28.b",
      "q.verbal.visual_28.c",
      "q.verbal.visual_28.d"
    ],
    correctIndex: 1
  },

  // --- Short reading comprehension ---
  {
    id: "v29",
    kind: "multiple",
    category: CategoryId.Verbal,
    textKey: "q.verbal.text_29",
    optionsKey: [
      "q.verbal.text_29.a",
      "q.verbal.text_29.b",
      "q.verbal.text_29.c",
      "q.verbal.text_29.d"
    ],
    correctIndex: 2
  },
  {
    id: "v30",
    kind: "multiple",
    category: CategoryId.Verbal,
    textKey: "q.verbal.text_30",
    optionsKey: [
      "q.verbal.text_30.a",
      "q.verbal.text_30.b",
      "q.verbal.text_30.c",
      "q.verbal.text_30.d"
    ],
    correctIndex: 0
  },

  // --- Final 10: balanced mix ---
  {
    id: "v31",
    kind: "multiple",
    category: CategoryId.Verbal,
    textKey: "q.verbal.analogy_31",
    optionsKey: [
      "q.verbal.analogy_31.a",
      "q.verbal.analogy_31.b",
      "q.verbal.analogy_31.c",
      "q.verbal.analogy_31.d"
    ],
    correctIndex: 1
  },
  {
    id: "v32",
    kind: "multiple",
    category: CategoryId.Verbal,
    textKey: "q.verbal.synonym_32",
    optionsKey: [
      "q.verbal.synonym_32.a",
      "q.verbal.synonym_32.b",
      "q.verbal.synonym_32.c",
      "q.verbal.synonym_32.d"
    ],
    correctIndex: 0
  },
  {
    id: "v33",
    kind: "multiple",
    category: CategoryId.Verbal,
    textKey: "q.verbal.antonym_33",
    optionsKey: [
      "q.verbal.antonym_33.a",
      "q.verbal.antonym_33.b",
      "q.verbal.antonym_33.c",
      "q.verbal.antonym_33.d"
    ],
    correctIndex: 2
  },
  {
    id: "v34",
    kind: "multiple",
    category: CategoryId.Verbal,
    textKey: "q.verbal.inference_34",
    optionsKey: [
      "q.verbal.inference_34.a",
      "q.verbal.inference_34.b",
      "q.verbal.inference_34.c",
      "q.verbal.inference_34.d"
    ],
    correctIndex: 3
  },
  {
    id: "v35",
    kind: "sequence",
    category: CategoryId.Verbal,
    textKey: "q.verbal.sequence_35",
    itemsKey: [
      "q.verbal.sequence_35.i1",
      "q.verbal.sequence_35.i2",
      "q.verbal.sequence_35.i3",
      "q.verbal.sequence_35.i4"
    ],
    answerSequence: [1, 3, 0, 2],
    partialCredit: true
  },
  {
    id: "v36",
    kind: "visual",
    category: CategoryId.Verbal,
    textKey: "q.verbal.visual_36",
    image: "/assets/img/q/verbal/v36.png",
    optionsKey: [
      "q.verbal.visual_36.a",
      "q.verbal.visual_36.b",
      "q.verbal.visual_36.c",
      "q.verbal.visual_36.d"
    ],
    correctIndex: 2
  },
  {
    id: "v37",
    kind: "multiple",
    category: CategoryId.Verbal,
    textKey: "q.verbal.text_37",
    optionsKey: [
      "q.verbal.text_37.a",
      "q.verbal.text_37.b",
      "q.verbal.text_37.c",
      "q.verbal.text_37.d"
    ],
    correctIndex: 1
  },
  {
    id: "v38",
    kind: "multiple",
    category: CategoryId.Verbal,
    textKey: "q.verbal.synonym_38",
    optionsKey: [
      "q.verbal.synonym_38.a",
      "q.verbal.synonym_38.b",
      "q.verbal.synonym_38.c",
      "q.verbal.synonym_38.d"
    ],
    correctIndex: 0
  },
  {
    id: "v39",
    kind: "multiple",
    category: CategoryId.Verbal,
    textKey: "q.verbal.antonym_39",
    optionsKey: [
      "q.verbal.antonym_39.a",
      "q.verbal.antonym_39.b",
      "q.verbal.antonym_39.c",
      "q.verbal.antonym_39.d"
    ],
    correctIndex: 3
  },
  {
    id: "v40",
    kind: "multiple",
    category: CategoryId.Verbal,
    textKey: "q.verbal.text_40",
    optionsKey: [
      "q.verbal.text_40.a",
      "q.verbal.text_40.b",
      "q.verbal.text_40.c",
      "q.verbal.text_40.d"
    ],
    correctIndex: 1
  }
];
