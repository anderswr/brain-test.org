// app/test/page.tsx
"use client";

import * as React from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useI18n } from "@/app/providers/I18nProvider";
import { t } from "@/lib/i18n";
import { ICAR16 } from "@/data/icar16";

export default function TestPage() {
  const { dict, lang } = useI18n();
  const [idx, setIdx] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<string, string>>({});
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const item = ICAR16[idx];

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
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-1">{t(dict, "site.title")}</h1>
        <p className="text-sm text-muted-foreground mb-6">{t(dict, "disclaimer")}</p>

        <div className="rounded-2xl border p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="font-medium">
              {t(dict, item.promptKey)}
            </div>
            <div className="text-xs opacity-70">{idx + 1} / {ICAR16.length}</div>
          </div>

          {item.image && (
            // evt. legg inn <img src={item.image} alt="" className="mb-4 mx-auto" />
            <></>
          )}

          <div className="space-y-2">
            {item.choices.map((c) => (
              <label key={c.id} className="flex items-center gap-3 border rounded-xl p-3 cursor-pointer">
                <input
                  type="radio"
                  name={`q-${item.id}`}
                  checked={answers[item.id] === c.id}
                  onChange={() => setChoice(c.id)}
                />
                <span>{t(dict, c.textKey)}</span>
              </label>
            ))}
          </div>

          <div className="mt-6 flex gap-2">
            <button
              className="px-4 py-2 rounded-xl border"
              onClick={() => setIdx((i) => Math.max(0, i - 1))}
              disabled={idx === 0 || submitting}
            >
              ← {t(dict, "cta.continue")}
            </button>
            {idx < ICAR16.length - 1 ? (
              <button
                className="px-4 py-2 rounded-xl border"
                onClick={() => setIdx((i) => Math.min(ICAR16.length - 1, i + 1))}
                disabled={!answers[item.id] || submitting}
              >
                {t(dict, "cta.continue")} →
              </button>
            ) : (
              <button
                className="px-4 py-2 rounded-xl border"
                onClick={submit}
                disabled={Object.keys(answers).length !== ICAR16.length || submitting}
              >
                {t(dict, "cta.submit")}
              </button>
            )}
          </div>

          {error && <p className="text-red-600 text-sm mt-3">{error}</p>}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
