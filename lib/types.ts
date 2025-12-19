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
   * Optional image shown directly within the question UI
   * (used for visual, matrix, etc.)
   */
  image?: string;

  /**
   * Optional preview image shown BEFORE the actual question (for memory recall tasks)
   */
  previewImage?: string;

  /**
   * If true, the question first shows a preview/stimulus (e.g., previewImage),
   * then later the actual question — used for delayed recall.
   */
  recallAfterView?: boolean;
}

/** Choice-based question (MCQ) */
export interface ChoiceLike {
  optionsKey: string[];
  correctIndex: number;
}

/** MULTIPLE: Text-only MCQ */
export interface MultipleQuestion extends BaseQuestion, ChoiceLike {
  kind: "multiple";
}

/** MATRIX: Pattern recognition with an image */
export interface MatrixQuestion extends BaseQuestion, ChoiceLike {
  kind: "matrix";
  image: string;
}

/** VISUAL: Image-based rotation/matching */
export interface VisualQuestion extends BaseQuestion, ChoiceLike {
  kind: "visual";
  /** Optional for recallAfterView items that use only previewImage */
  image?: string;
}

/** SEQUENCE: Order items correctly */
export interface SequenceQuestion extends BaseQuestion {
  kind: "sequence";
  itemsKey: string[];
  answerSequence: number[];
  partialCredit?: boolean;
}

/** RECALL: Free recall or short-list memory */
export type RecallToken = string | number;

export interface RecallQuestion extends BaseQuestion {
  kind: "recall";
  correctAnswer: RecallToken[];
  match: "exact" | "ci" | "set";
  orderSensitive?: boolean;
  normalizeKey?: string;
  maxEditDistance?: number;
}

/** Unified type for all questions */
export type Question =
  | MultipleQuestion
  | MatrixQuestion
  | VisualQuestion
  | SequenceQuestion
  | RecallQuestion;

/** User answer types */
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

/** Category scores (0–100) */
export type CategoryScores = Record<CategoryId, number>;

/** Raw count data */
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

/** Result payload returned to clients */
export interface ResultSummary {
  version: string;
  iqEstimate: number;
  totalPercent: number;
  categoryScores: CategoryScores;
  ci: [number, number];
}

/** Category→IDs index */
export type ByCategoryIndex = Record<CategoryId, string[]>;

/** Type guards */
export const isMultiple = (q: Question): q is MultipleQuestion => q.kind === "multiple";
export const isMatrix   = (q: Question): q is MatrixQuestion   => q.kind === "matrix";
export const isVisual   = (q: Question): q is VisualQuestion   => q.kind === "visual";
export const isSequence = (q: Question): q is SequenceQuestion => q.kind === "sequence";
export const isRecall   = (q: Question): q is RecallQuestion   => q.kind === "recall";
