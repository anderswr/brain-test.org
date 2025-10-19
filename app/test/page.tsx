"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useI18n } from "@/app/providers/I18nProvider";
import { t } from "@/lib/i18n";
import { CategoryId, Question } from "@/lib/types";
import { CATEGORY_INDEX } from "@/data/question_index";

/* ------------------ DEBUG TOGGLE ------------------ */
const DEBUG_MODE = true;
/**
 * Debug toggle — set to false before publishing!
 *  - Logs correct answers in console when questions are shown
 *  - Logs chosen answer + whether it’s correct when user answers
 */

/* ------------------ Helper: dynamic sampling ------------------ */
function sample<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(n, shuffled.length));
}

function getRandomQuestionSet(): Question[] {
  const perCat = {
    [CategoryId.Reasoning]: 8,
    [CategoryId.Math]: 8,
    [CategoryId.Verbal]: 8,
    [CategoryId.Spatial]: 8,
    [CategoryId.Memory]: 8,
  };
  const all: Question[] = [];
  for (const [cat, questions] of Object.entries(CATEGORY_INDEX) as [
    CategoryId,
    Question[]
  ][]) {
    all.push(...sample(questions, perCat[cat]));
  }
  return all.sort(() => Math.random() - 0.5);
}

export default function TestPage() {
  const { dict, lang } = useI18n();
  const [idx, setIdx] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<string, any>>({});
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [showPreview, setShowPreview] = React.useState(true);
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const QUESTION_BANK = React.useMemo(() => getRandomQuestionSet(), []);
  const item = QUESTION_BANK[idx] as Question;

  /* 🌙 Detect dark mode safely (client only) */
  React.useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      setIsDarkMode(mq.matches);
      const handler = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
  }, []);

  /* 🧠 Debug: log correct answer when showing new question */
  React.useEffect(() => {
    setShowPreview(true);
    if (DEBUG_MODE && "correctIndex" in item) {
      const correct = item.correctIndex;
      const correctKey = item.optionsKey?.[correct];
      console.debug(`[SHOW] ${item.id}: correct = ${correct} (${correctKey})`);
    }
  }, [idx]);

  function setChoice(choiceIndex: number) {
    const updated = { ...answers, [item.id]: choiceIndex };
    setAnswers(updated);

    // 🧠 DEBUG: log chosen vs correct
    if (DEBUG_MODE && "correctIndex" in item) {
      const correct = item.correctIndex;
      const correctKey = item.optionsKey?.[correct];
      const chosenKey = item.optionsKey?.[choiceIndex];
      const isCorrect = choiceIndex === correct;
      console.groupCollapsed(`[DEBUG] ${item.id} (${item.category})`);
      console.log("Prompt:", item.textKey);
      console.log("Chosen:", choiceIndex, chosenKey);
      console.log("Correct:", correct, correctKey);
      console.log(isCorrect ? "✅ CORRECT" : "❌ WRONG");
      console.groupEnd();
    }

    setTimeout(() => {
      if (idx < QUESTION_BANK.length - 1) {
        setIdx((i) => i + 1);
      } else {
        submit(updated);
      }
    }, 250);
  }

  async function submit(payload?: Record<string, any>) {
    const data = payload || answers;
    try {
      setSubmitting(true);
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ answers: data, lang }),
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

  const renderText = (dict: any, key: string, fallback = "") => {
    const text = t(dict, key, fallback);
    return <span>{text}</span>;
  };

  const renderImage = (src?: string, id?: string) =>
    src ? (
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
        <Image
          src={src}
          alt={id || "img"}
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
          onError={() => console.warn("[IMAGE MISSING]", id, src)}
          priority
        />
      </div>
    ) : null;

  const renderQuestion = (q: Question) => {
    // 🔹 MEMORY preview
    if (q.recallAfterView && q.previewImage && showPreview) {
      return (
        <div style={{ textAlign: "center" }}>
          {renderImage(q.previewImage, q.id)}
          <p style={{ marginTop: 8, fontSize: 14, color: "#666" }}>
            Memorize the image. You will be asked about it shortly.
          </p>
          <button className="btn" style={{ marginTop: 16 }} onClick={() => setShowPreview(false)}>
            Next →
          </button>
        </div>
      );
    }

    // 🔹 MULTIPLE / VISUAL / MATRIX
    if ("optionsKey" in q) {
      return (
        <div style={{ display: "grid", gap: 8 }}>
          {renderImage(q.image, q.id)}
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
                color: isDarkMode ? "#f5f5f5" : "#111",
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

    // 🔹 SEQUENCE
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
          {renderImage(q.image, q.id)}
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
                  border: pos >= 0 ? "2px solid var(--accent)" : "1px solid #ccc",
                  background: pos >= 0 ? "rgba(0,128,255,0.1)" : "transparent",
                  borderRadius: 8,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                  color: isDarkMode ? "#f5f5f5" : "#111",
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
        </div>
      );
    }

    return (
      <div style={{ textAlign: "center" }}>
        {renderImage(q.image, q.id)}
        <p>Unsupported question type</p>
      </div>
    );
  };

  return (
    <div>
      <SiteHeader />
      <main style={{ marginTop: 16 }}>
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div style={{ fontWeight: 600 }}>
              {renderText(dict, item.textKey, `Missing: ${item.textKey}`)}
            </div>
            <div style={{ opacity: 0.6, fontSize: 12 }}>
              {idx + 1} / {QUESTION_BANK.length}
            </div>
          </div>

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

          {!item.recallAfterView || !showPreview ? (
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button className="btn" onClick={() => setIdx((i) => Math.max(0, i - 1))} disabled={idx === 0 || submitting}>
                ← {t(dict, "cta-back", "Back")}
              </button>
              {idx < QUESTION_BANK.length - 1 ? (
                <button
                  className="btn"
                  onClick={() => setIdx((i) => i + 1)}
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

          {error && <p style={{ color: "#f87171", marginTop: 8, fontSize: 14 }}>{error}</p>}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
