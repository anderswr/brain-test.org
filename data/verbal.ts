// /data/verbal.ts
import { CategoryId, Question } from "@/lib/types";

export const VERBAL_QUESTIONS: Question[] = [
  // --- Word analogies ---
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

  // --- Sequence (word order) ---
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
    answerSequence: [3, 1, 2, 0],
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

  // --- Short text inference ---
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

  // --- Analogies continued ---
  {
    id: "v15",
    kind: "multiple",
    category: CategoryId.Verbal,
    textKey: "q.verbal.analogy_15",
    optionsKey: [
      "q.verbal.analogy_15.a",
      "q.verbal.analogy_15.b",
      "q.verbal.analogy_15.c",
      "q.verbal.analogy_15.d"
    ],
    correctIndex: 1
  },
  {
    id: "v16",
    kind: "multiple",
    category: CategoryId.Verbal,
    textKey: "q.verbal.analogy_16",
    optionsKey: [
      "q.verbal.analogy_16.a",
      "q.verbal.analogy_16.b",
      "q.verbal.analogy_16.c",
      "q.verbal.analogy_16.d"
    ],
    correctIndex: 3
  },

  // --- Continue pattern through v40 (omitted here for brevity in this preview) ---
  // Structure repeats analogies, synonyms, antonyms, short text logic, and sequence ordering.
];
