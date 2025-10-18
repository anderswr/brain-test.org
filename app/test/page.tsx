// app/test/page.tsx
"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
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
  const [showPreview, setShowPreview] = React.useState(true); // 👈 for memory/recall preview

  const item = QUESTION_BANK[idx] as Question;

  /** Setter valgt svar (brukes for MCQ og visual) + auto-next */
  function setChoice(choiceIndex: number) {
    const updated = { ...answers, [item.id]: choiceIndex };
    setAnswers(updated);
    console.debug(`[ANSWERED] ${item.id} → ${choiceIndex}`, updated);

    // Auto-next eller submit på siste
    setTimeout(() => {
      if (idx < QUESTION_BANK.length - 1) {
        setIdx((i) => Math.min(i + 1, QUESTION_BANK.length - 1));
      } else {
        console.debug("[AUTO-SUBMIT]");
        submit(updated);
      }
    }, 250);
  }

  /** Oversetter nøkkel med fallback + viser key for debugging */
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
  async function submit(payload?: Record<string, any>) {
    const data = payload || answers;
    console.debug("[SUBMIT] Sending answers:", data);
    try {
      setSubmitting(true);
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ answers: data, lang }),
      });
      const json = await res.json();
      console.debug("[SUBMIT RESPONSE]", json);
      if (!res.ok) throw new Error(json?.error || "submit_failed");
      window.location.href = `/result/${json.id}`;
    } catch (e: any) {
      console.error("[SUBMIT ERROR]", e);
      setError(e?.message || "submit_failed");
    } finally {
      setSubmitting(false);
    }
  }

  /** Renderer spørsmål avhengig av type */
  function renderQuestion(q: Question) {
    const renderImage = (src?: string) => {
      if (!src) return null;
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 12,
          }}
        >
          <Image
            src={src}
            alt={q.id}
            width={512}
            height={512}
            style={{
              borderRadius: 8,
              border: "1px solid #ddd",
              background: "white",
              objectFit: "contain",
              maxWidth: "100%",
              height: "auto",
            }}
            onError={() => console.warn("[IMAGE MISSING]", q.id, src)}
            priority
          />
        </div>
      );
    };

    // 🔹 MEMORY-preview (viser bilde først)
    if (q.recallAfterView && q.previewImage && showPreview) {
      return (
        <div style={{ textAlign: "center" }}>
          {renderImage(q.previewImage)}
          <p style={{ marginTop: 8, fontSize: 14, color: "#666" }}>
            Memorize the image. You will be asked about it shortly.
          </p>
          <button
            className="btn"
            style={{ marginTop: 16 }}
            onClick={() => setShowPreview(false)}
          >
            Next →
          </button>
        </div>
      );
    }

    // 🔹 Multiple-choice / visual / matrix
    if ("optionsKey" in q) {
      return (
        <div style={{ display: "grid", gap: 8 }}>
          {renderImage(q.image)}

          {q.optionsKey.map((optKey: string, i: number) => (
            <label
              key={i}
              className="card"
              style={{
                padding: 12,
                display: "flex",
                gap: 8,
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <input
                type="radio"
                name={`q-${q.id}`}
                checked={answers[q.id] === i}
                onChange={() => setChoice(i)}
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
          {renderImage(q.image)}
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

    // 🔹 Recall-type (fritt minne, f.eks. etter bilde)
    if (q.kind === "recall") {
      return (
        <div style={{ display: "grid", gap: 8 }}>
          <textarea
            placeholder="Type what you remember..."
            rows={3}
            style={{
              padding: 8,
              borderRadius: 8,
              border: "1px solid #ccc",
              resize: "none",
            }}
            value={(answers[q.id] as string) || ""}
            onChange={(e) =>
              setAnswers({ ...answers, [q.id]: e.target.value.trim() })
            }
          />
        </div>
      );
    }

    // 🔹 fallback
    return (
      <div style={{ textAlign: "center" }}>
        {renderImage(q.image)}
        <p>Unsupported question type</p>
      </div>
    );
  }

  // Debug / reset preview ved spørsmålsskifte
  React.useEffect(() => {
    console.debug(
      `[STATE] Showing #${idx + 1}/${QUESTION_BANK.length} →`,
      item?.id,
      item?.category,
      answers
    );
    setShowPreview(true); // 👈 reset for nye spørsmål
  }, [idx, answers]);

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

          {/* --- spørsmålsvisning med animasjon --- */}
          <AnimatePresence mode="wait">
            <motion.div
              key={item.id + (showPreview ? "-preview" : "-main")}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {renderQuestion(item)}
            </motion.div>
          </AnimatePresence>

          {/* --- navigasjon --- */}
          {!item.recallAfterView || !showPreview ? (
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
                  disabled={answers[item.id] === undefined || submitting}
                >
                  {t(dict, "cta-continue", "Continue")} →
                </button>
              ) : (
                <button
                  className="btn"
                  onClick={() => submit()}
                  disabled={
                    Object.keys(answers).length !== QUESTION_BANK.length ||
                    submitting
                  }
                >
                  {t(dict, "cta-submit", "Finish and see result")} ✓
                </button>
              )}
            </div>
          ) : null}

          {/* --- feilvisning --- */}
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
