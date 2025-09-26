
// lib/scoring.ts
import type { IQItem } from "@/data/icar16";
export type Submission = Record<string, string>;

export function scoreICAR(items: IQItem[], submission: Submission) {
  let correct = 0;
  const perItem = items.map((it) => {
    const chosen = submission[it.id];
    const isCorrect = chosen === it.correctId;
    if (isCorrect) correct += 1;
    return { id: it.id, chosen, correct: it.correctId, isCorrect };
  });
  const raw = correct;
  const pct = raw / Math.max(items.length, 1);
  const z = (raw - 8) / 4; // demo baseline
  const iq = Math.round(100 + 15 * z);
  return { raw, iq, pct, perItem };
}
