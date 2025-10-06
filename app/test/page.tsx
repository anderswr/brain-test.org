"use client";
import * as React from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useI18n } from "@/app/providers/I18nProvider";
import { t } from "@/lib/i18n";
import { QUESTION_BANK } from "@/data/question_index";
import { Question } from "@/lib/types";

export default function TestPage() {
  const { dict, lang } = useI18n();
  const [idx, setIdx] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<string, any>>({});
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const item = QUESTION_BANK[idx] as Question;

  function setChoice(index: number) {
    setAnswers((a) => ({ ...a, [item.id]: index })); // store numeric index
  }

  function setSequence(order: number[]) {
    setAnswers((a) => ({ ...a, [item.id]: order }));
  }

  async function submit() {
    try {
      setSubmitting(true);
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ answers, lang }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "submit_failed");
      window.location.href = `/result/${json.id}`;
    } catch (e: any) {
      setError(e?.message || "submit_failed");
    } finally {
      setSubmitting(false);
    }
  }

  /** Render multiple/visual/sequence question appropriately */
  function renderQuestion(q: Question) {
    // Multiple-choice + visual/matrix (they all have optionsKey)
    if ("optionsKey" in q) {
      return (
        <div style={{ display: "grid", gap: 8 }}>
          {q.optionsKey.map((key: string, i: number) => (
            <label
              key={i}
              className="card"
              style={{ padding: 12, display: "flex", gap: 8, alignItems: "center" }}
            >
              <input
                type="radio"
                name={`q-${q.id}`}
                checked={answers[q.id] === i}
                onChange={() => setChoice(i)}
              />
              <span>{t(dict, key, key)}</span>
            </label>
          ))}
        </div>
      );
    }

    // Sequence-type (simple usable controls so you can proceed)
    if ("itemsKey" in q) {
      const items = q.itemsKey;
      const shownOrder = items.map((_, i) => i);

      return (
        <div style={{ display: "grid", gap: 8 }}>
          {items.map((key: string, i: number) => (
            <div key={i} className="card" style={{ padding: 12 }}>
              {t(dict, key, key)}
            </div>
          ))}
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn" onClick={() => setSequence(shownOrder)}>
              Use shown order
            </button>
            <button className="btn" onClick={() => setSequence([...shownOrder].reverse())}>
              Use reverse order
            </button>
            <button
              className="btn"
              onClick={() =>
                setSequence(
                  [...shownOrder].sort(() => Math.random() - 0.5)
                )
              }
            >
              Randomize once
            </button>
          </div>
          <p className="muted text-sm">(Temporary controls; drag & drop coming later)</p>
        </div>
      );
    }

    return <p>Unsupported question type</p>;
  }

  const hasAnswer = (() => {
    const a = answers[item.id];
    if (Array.isArray(a)) {
      const needed = ("itemsKey" in item) ? item.itemsKey.length : 0;
      return a.length === needed;
    }
    return typeof a === "number";
  })();

  return (
    <div>
      <SiteHeader />
      <main style={{ marginTop: 16 }}>
        <div className="card">
          <div
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}
          >
            <div style={{ fontWeight: 600 }}>{t(dict, item.textKey, item.textKey)}</div>
            <div style={{ opacity: 0.6, fontSize: 12 }}>
              {idx + 1} / {QUESTION_BANK.length}
            </div>
          </div>

          {renderQuestion(item)}

          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <button
              className="btn"
              onClick={() => setIdx((i) => Math.max(0, i - 1))}
              disabled={idx === 0 || submitting}
            >
              ← {t(dict, "ui.common.back", "Back")}
            </button>
            {idx < QUESTION_BANK.length - 1 ? (
              <button
                className="btn"
                onClick={() => setIdx((i) => Math.min(QUESTION_BANK.length - 1, i + 1))}
                disabled={!hasAnswer || submitting}
              >
                {t(dict, "cta.continue", "Continue")} →
              </button>
            ) : (
              <button
                className="btn"
                onClick={submit}
                disabled={
                  Object.keys(answers).length !== QUESTION_BANK.length || submitting
                }
              >
                {t(dict, "cta.submit", "Finish and see result")} ✓
              </button>
            )}
          </div>

          {error && <p style={{ color: "#f87171", marginTop: 8, fontSize: 14 }}>{error}</p>}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
