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

  /** Setter valgt svar (brukes for MCQ og visual) */
  function setChoice(choice: any) {
    setAnswers((a) => {
      const updated = { ...a, [item.id]: choice };

      // 🔹 Automatisk gå videre (eller send inn hvis siste spørsmål)
      setTimeout(() => {
        if (idx < QUESTION_BANK.length - 1) {
          setIdx((i) => Math.min(i + 1, QUESTION_BANK.length - 1));
        } else {
          submit();
        }
      }, 250);

      return updated;
    });
  }

  /** Viser oversatt tekst + nøkkel for debugging */
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

  /** Sender inn alle svarene */
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

  /** Renderer spørsmål avhengig av type */
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
                onChange={() => setChoice(optKey)} // 🔹 her trigges auto-next
              />
              {renderText(dict, optKey, `Missing: ${optKey}`)}
            </label>
          ))}
        </div>
      );
    }

    // 🔹 Sequence-type (interaktiv rekkefølge)
    if ("itemsKey" in q) {
      const selected = answers[q.id] || [];

      const handleSelect = (itemKey: string) => {
        setAnswers((prev) => {
          const current = prev[q.id] || [];
          const exists = current.includes(itemKey);
          const newOrder = exists
            ? current.filter((x: string) => x !== itemKey)
            : [...current, itemKey];
          return { ...prev, [q.id]: newOrder };
        });
      };

      const allSelected = selected.length === q.itemsKey.length;

      return (
        <div style={{ display: "grid", gap: 8 }}>
          {q.itemsKey.map((itmKey: string, i: number) => {
            const pos = selected.indexOf(itmKey);
            const selectedNum = pos >= 0 ? pos + 1 : null;
            return (
              <button
                key={i}
                onClick={() => handleSelect(itmKey)}
                className="card"
                style={{
                  padding: 12,
                  textAlign: "left",
                  border:
                    pos >= 0 ? "2px solid var(--accent)" : "1px solid #ccc",
                  background:
                    pos >= 0 ? "rgba(0,128,255,0.1)" : "transparent",
                  borderRadius: 8,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                {renderText(dict, itmKey, `Missing: ${itmKey}`)}
                {selectedNum && (
                  <span
                    style={{
                      background: "var(--accent)",
                      color: "white",
                      borderRadius: "50%",
                      width: 24,
                      height: 24,
                      fontSize: 12,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {selectedNum}
                  </span>
                )}
              </button>
            );
          })}

          {!allSelected && (
            <p className="muted text-sm">
              Tap items in correct order ({selected.length}/{q.itemsKey.length})
            </p>
          )}
          {allSelected && (
            <p className="text-sm" style={{ color: "green" }}>
              ✅ Sequence complete
            </p>
          )}
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
          {/* --- spørsmålstekst + fremdrift --- */}
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

          {/* --- spørsmålsvisning --- */}
          {renderQuestion(item)}

          {/* --- navigasjon --- */}
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <button
              className="btn"
              onClick={() => setIdx((i) => Math.max(0, i - 1))}
              disabled={idx === 0 || submitting}
            >
              ← {t(dict, "cta-back", "Back")}
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

          {/* --- feilvisning --- */}
          {error && (
            <p
              style={{
                color: "#f87171",
                marginTop: 8,
                fontSize: 14,
              }}
            >
              {error}
            </p>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
