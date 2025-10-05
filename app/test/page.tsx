"use client";
import * as React from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useI18n } from "@/app/providers/I18nProvider";
import { t } from "@/lib/i18n";
import { QUESTION_BANK } from "@/data/question_index"; // ✅ riktig import

export default function TestPage() {
  const { dict, lang } = useI18n();
  const [idx, setIdx] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<string, string>>({});
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const item = QUESTION_BANK[idx];

  function setChoice(choiceId: string) {
    setAnswers((a) => ({ ...a, [item.id]: choiceId }));
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
            <div style={{ fontWeight: 600 }}>{t(dict, item.textKey)}</div>
            <div style={{ opacity: 0.6, fontSize: 12 }}>
              {idx + 1} / {QUESTION_BANK.length}
            </div>
          </div>

          <div style={{ display: "grid", gap: 8 }}>
            {item.optionsKey?.map((key: string, i: number) => (
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
                  name={`q-${item.id}`}
                  checked={answers[item.id] === key}
                  onChange={() => setChoice(key)}
                />
                <span>{t(dict, key)}</span>
              </label>
            ))}
          </div>

          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <button
              className="btn"
              onClick={() => setIdx((i) => Math.max(0, i - 1))}
              disabled={idx === 0 || submitting}
            >
              ← {t(dict, "cta.continue", "Back")}
            </button>
            {idx < QUESTION_BANK.length - 1 ? (
              <button
                className="btn"
                onClick={() => setIdx((i) => Math.min(QUESTION_BANK.length - 1, i + 1))}
                disabled={!answers[item.id] || submitting}
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

          {error && (
            <p style={{ color: "#f87171", marginTop: 8, fontSize: 14 }}>{error}</p>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
