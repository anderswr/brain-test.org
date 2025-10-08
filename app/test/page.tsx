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

  function setChoice(choice: any) {
    setAnswers((a) => ({ ...a, [item.id]: choice }));
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

  /** Helper to show translation + key for debugging */
  function renderText(dict: any, key: string, fallback = "") {
    const text = t(dict, key, fallback);
    return (
      <span>
        {text}
        <span style={{ color: "#999", fontSize: "0.8em", marginLeft: 6 }}>
          ({key})
        </span>
      </span>
    );
  }

  /** Render multiple/visual/sequence question appropriately */
  function renderQuestion(q: Question) {
    // 🔹 Multiple-choice / visual
    if ("optionsKey" in q) {
      return (
        <div style={{ display: "grid", gap: 8 }}>
          {q.optionsKey.map((optKey: string, i: number) => (
            <label
              key={i}
              className="card"
              style={{
                padding: 12,
                display: "flex",
                gap: 8,
                alignItems: "center",
              }}
            >
              <input
                type="radio"
                name={`q-${q.id}`}
                checked={answers[q.id] === optKey}
                onChange={() => setChoice(optKey)}
              />
              {renderText(dict, optKey, `Missing: ${optKey}`)}
            </label>
          ))}
        </div>
      );
    }

    // 🔹 Sequence-type
    if ("itemsKey" in q) {
      return (
        <div style={{ display: "grid", gap: 8 }}>
          {q.itemsKey.map((itmKey: string, i: number) => (
            <div
              key={i}
              className="card"
              style={{
                padding: 12,
                display: "flex",
                gap: 8,
                alignItems: "center",
              }}
            >
              {renderText(dict, itmKey, `Missing: ${itmKey}`)}
            </div>
          ))}
          <p className="muted text-sm">(Sequence questions are not interactive yet)</p>
        </div>
      );
    }

    // 🔹 fallback
    return <p>Unsupported question type</p>;
  }

  return (
    <div>
      <SiteHeader />
      <main style={{ marginTop: 16 }}>
        <div className="card">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <div style={{ fontWeight: 600 }}>
              {renderText(dict, item.textKey, `Missing: ${item.textKey}`)}
            </div>
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
              ← {t(dict, "cta-continue", "Back")}
            </button>

            {idx < QUESTION_BANK.length - 1 ? (
              <button
                className="btn"
                onClick={() =>
                  setIdx((i) => Math.min(QUESTION_BANK.length - 1, i + 1))
                }
                disabled={!answers[item.id] || submitting}
              >
                {t(dict, "cta-continue", "Continue")} →
              </button>
            ) : (
              <button
                className="btn"
                onClick={submit}
                disabled={
                  Object.keys(answers).length !== QUESTION_BANK.length ||
                  submitting
                }
              >
                {t(dict, "cta-submit", "Finish and see result")} ✓
              </button>
            )}
          </div>

          {error && (
            <p style={{ color: "#f87171", marginTop: 8, fontSize: 14 }}>
              {error}
            </p>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
