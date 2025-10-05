// /lib/types.ts

// Version this bank of questions so results can record compatibility.
export const BANK_VERSION = "iq-bank-1.0.0" as const;

/** Five core IQ categories */
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
  | "multiple"  // classic MCQ (A–D) – scored 0/1
  | "sequence"  // order items (e.g., numbers/words) – partial credit possible
  | "matrix"    // image matrix (PNG) with MCQ options – scored 0/1
  | "visual"    // single visual transform/rotation (PNG) – scored 0/1
  | "recall";   // recall a short list (strings/numbers) – partial credit possible

/** Common fields across questions */
export interface BaseQuestion {
  id: string;                 // globally unique (e.g., "r1", "m17")
  kind: QuestionKind;
  category: CategoryId;
  textKey: string;            // i18n key for the prompt/instructions
  infoKey?: string;           // optional i18n helper text
  weight?: number;            // default 1; can tweak category influence
  timeLimitSec?: number;      // optional soft time limit per item
}

/** Multiple-choice style (also used by matrix/visual) */
export interface ChoiceLike {
  // i18n keys for options; typically length 4 (A–D)
  optionsKey: string[];
  // index (0-based) of correct option
  correctIndex: number;
}

/** MULTIPLE: Text-only MCQ */
export interface MultipleQuestion extends BaseQuestion, ChoiceLike {
  kind: "multiple";
}

/** MATRIX: Visual matrix with PNG + MCQ */
export interface MatrixQuestion extends BaseQuestion, ChoiceLike {
  kind: "matrix";
  image: string; // e.g., "/assets/img/q/spatial/s05.png"
}

/** VISUAL: Single figure transform/rotation with PNG + MCQ */
export interface VisualQuestion extends BaseQuestion, ChoiceLike {
  kind: "visual";
  image: string;
}

/** SEQUENCE: User orders N items; answers expressed by index order */
export interface SequenceQuestion extends BaseQuestion {
  kind: "sequence";
  /**
   * The correct order as indices into the shown items (0..N-1).
   * UI will present items derived from i18n keys (see `itemsKey`).
   */
  answerSequence: number[];
  /**
   * i18n keys for the displayed items to be ordered.
   * Example: ["q.reasoning.seq_03.i1", "q.reasoning.seq_03.i2", ...]
   */
  itemsKey: string[];
  /**
   * If true, allow partial credit when a subset is in correct relative order.
   * Default true.
   */
  partialCredit?: boolean;
}

/** RECALL: User recalls a small set of tokens after delay */
export type RecallToken = string | number;

export interface RecallQuestion extends BaseQuestion {
  kind: "recall";
  /**
   * The expected tokens. By default, order matters.
   * Example: ["book", "rain", "stone", "window"]
   */
  correctAnswer: RecallToken[];
  /**
   * Matching behavior:
   *  - "exact": case-sensitive string compare / numeric equality (default)
   *  - "ci": case-insensitive for strings
   *  - "set": order-insensitive; score by intersection size
   */
  match: "exact" | "ci" | "set";
  /** Whether order matters (ignored when match === "set"). Default: true */
  orderSensitive?: boolean;
  /** Optional normalization regex i18n key (e.g., to strip punctuation) */
  normalizeKey?: string;
  /** Optional maximum accepted Levenshtein distance per string token (0 = exact) */
  maxEditDistance?: number;
}

/** Union of all question types */
export type Question =
  | MultipleQuestion
  | MatrixQuestion
  | VisualQuestion
  | SequenceQuestion
  | RecallQuestion;

/** Map of questionId -> user's answer value */
export type AnswerValue =
  | number                 // for choice-like: selected index 0..n-1
  | number[]               // for sequence: order of indices
  | RecallToken[];         // for recall: array of tokens

export type AnswerMap = Record<string, AnswerValue>;

/** Per-question scored result (0–1 for correctness or partial credit) */
export interface PerQuestionScore {
  id: string;
  kind: QuestionKind;
  category: CategoryId;
  weight: number;          // effective weight used in scoring
  score01: number;         // 0..1 normalized score for the question
}

/** Category scores normalized to 0–100 (higher = better performance) */
export type CategoryScores = Record<CategoryId, number>;

/** Raw counts for transparency/debugging */
export interface RawCounts {
  totalQuestions: number;
  totalWeighted: number;     // sum of weights
  totalCorrectWeighted: number; // sum(score01 * weight)
}

/** Final computed result returned by the scorer */
export interface ComputedResult {
  version: string;                // BANK_VERSION
  categoryScores: CategoryScores; // 0..100 (higher = better)
  totalPercent: number;           // 0..100 overall performance
  iqEstimate: number;             // mapped estimate (see scoring.ts)
  perQuestion: PerQuestionScore[];// breakdown for review/analytics
  raw: RawCounts;                 // raw totals
}

/** Lightweight index for building category -> ids mapping */
export type ByCategoryIndex = Record<CategoryId, string[]>;

/** Type guards for runtime narrowing */
export const isMultiple = (q: Question): q is MultipleQuestion => q.kind === "multiple";
export const isMatrix   = (q: Question): q is MatrixQuestion   => q.kind === "matrix";
export const isVisual   = (q: Question): q is VisualQuestion   => q.kind === "visual";
export const isSequence = (q: Question): q is SequenceQuestion => q.kind === "sequence";
export const isRecall   = (q: Question): q is RecallQuestion   => q.kind === "recall";
