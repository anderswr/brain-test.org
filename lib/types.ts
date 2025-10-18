// /lib/types.ts

/** Versioning for question compatibility */
export const BANK_VERSION = "iq-bank-2.0.0" as const;

/** Core cognitive domains */
export enum CategoryId {
  Reasoning = "reasoning",
  Math = "math",
  Verbal = "verbal",
  Spatial = "spatial",
  Memory = "memory",
}

export const ALL_CATEGORIES: CategoryId[] = [
  CategoryId.Reasoning,
  CategoryId.Math,
  CategoryId.Verbal,
  CategoryId.Spatial,
  CategoryId.Memory,
];

/** Supported question kinds */
export type QuestionKind =
  | "multiple"  // text-based multiple choice
  | "matrix"    // image matrix with multiple choice
  | "visual"    // visual rotation/matching with image
  | "sequence"  // order the given items
  | "recall";   // recall short list of words/numbers

/** Base structure shared by all questions */
export interface BaseQuestion {
  id: string;                 // e.g. "r1", "m12" or unified "q-xxx-yy"
  kind: QuestionKind;
  category: CategoryId;
  textKey: string;            // i18n key for the prompt (flat, e.g. "q-math-01")
  infoKey?: string;           // optional hint/extra instruction
  weight?: number;            // default: 1
  timeLimitSec?: number;      // optional soft limit

  /**
   * Optional stimulus image shown directly in the question UI.
   * For visual, matrix and memory categories this is typically set.
   */
  image?: string;

  /**
   * Optional stimulus shown BEFORE the actual question (memory “what did you just see?”)
   * If provided, UI can render this image first and show a “Next” button to reveal the question.
   */
  previewImage?: string;

  /**
   * When true, UI should present a stimulus first (e.g., previewImage), then the question.
   * This is intentionally UI-only metadata; scoring ignores it.
   */
  recallAfterView?: boolean;
}

/** Choice-based question (MCQ) */
export interface ChoiceLike {
  optionsKey: string[];       // e.g. ["q-math-01-a", "q-math-01-b", ...]
  correctIndex: number;       // index (0-based)
}

/** MULTIPLE: Text-only question */
export interface MultipleQuestion extends BaseQuestion, ChoiceLike {
  kind: "multiple";
}

/** MATRIX: Pattern recognition matrix with image */
export interface MatrixQuestion extends BaseQuestion, ChoiceLike {
  kind: "matrix";
  image: string;              // e.g. "/assets/img/q/spatial/s01.png"
}

/** VISUAL: Single rotation/match question with image */
export interface VisualQuestion extends BaseQuestion, ChoiceLike {
  kind: "visual";
  image: string;
}

/** SEQUENCE: Order given items correctly */
export interface SequenceQuestion extends BaseQuestion {
  kind: "sequence";
  itemsKey: string[];         // e.g. ["q-math-11-i1", "q-math-11-i2", ...]
  answerSequence: number[];   // correct order as indices
  partialCredit?: boolean;    // if true, partial scoring allowed
}

/** RECALL: Remember and recall short list of tokens */
export type RecallToken = string | number;

export interface RecallQuestion extends BaseQuestion {
  kind: "recall";
  correctAnswer: RecallToken[];
  match: "exact" | "ci" | "set";  // matching rule
  orderSensitive?: boolean;
  normalizeKey?: string;
  maxEditDistance?: number;
}

/** Unified question type */
export type Question =
  | MultipleQuestion
  | MatrixQuestion
  | VisualQuestion
  | SequenceQuestion
  | RecallQuestion;

/** User answers
 *  - number: index for MCQ
 *  - string: i18n key for MCQ (some UIs submit the option key directly)
 *  - number[]: indices for sequence
 *  - RecallToken[]: free recall entries
 */
export type AnswerValue = number | string | number[] | RecallToken[];
export type AnswerMap = Record<string, AnswerValue>;

/** Per-question scoring data */
export interface PerQuestionScore {
  id: string;
  kind: QuestionKind;
  category: CategoryId;
  weight: number;
  score01: number; // normalized 0..1
}

/** Category scores normalized to 0–100 */
export type CategoryScores = Record<CategoryId, number>;

/** Raw score data */
export interface RawCounts {
  totalQuestions: number;
  totalWeighted: number;
  totalCorrectWeighted: number;
}

/** Final computed test result */
export interface ComputedResult {
  version: string;
  categoryScores: CategoryScores;
  totalPercent: number;
  iqEstimate: number;
  perQuestion: PerQuestionScore[];
  raw: RawCounts;
}

/** Lightweight category→IDs index */
export type ByCategoryIndex = Record<CategoryId, string[]>;

/** Type guards */
export const isMultiple = (q: Question): q is MultipleQuestion => q.kind === "multiple";
export const isMatrix   = (q: Question): q is MatrixQuestion   => q.kind === "matrix";
export const isVisual   = (q: Question): q is VisualQuestion   => q.kind === "visual";
export const isSequence = (q: Question): q is SequenceQuestion => q.kind === "sequence";
export const isRecall   = (q: Question): q is RecallQuestion   => q.kind === "recall";
