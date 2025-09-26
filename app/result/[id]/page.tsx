// app/result/[id]/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useI18n } from "@/app/providers/I18nProvider";
import { t } from "@/lib/i18n";

type ResultDoc = {
  id: string;
  createdAt: string;
  lang: string;
  raw: number;
  iq: number;
  pct: number;
  perItem: { id: string; chosen?: string; correct: string; isCorrect: boolean }[];
};

export default function ResultPage({ params }: { params: { id: string } }) {
  const { dict } = useI18n();
  const [doc, setDoc] = useState<ResultDoc | null>(null);

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/result/${params.id}`);
      if (res.ok) setDoc(await res.json());
    }
    load();
  }, [params.id]);

  if (!doc) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1 max-w-3xl mx-auto px-4 py-8">Loading…</main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-2">{t(dict, "result.title")}</h1>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border p-4">
            <div className="text-sm opacity-60">{t(dict, "result.iq")}</div>
            <div className="text-3xl font-bold">{doc.iq}</div>
          </div>
          <div className="rounded-2xl border p-4">
            <div className="text-sm opacity-60">{t(dict, "result.raw")}</div>
            <div className="text-3xl font-bold">{doc.raw} / {doc.perItem.length}</div>
          </div>
          <div className="rounded-2xl border p-4">
            <div className="text-sm opacity-60">Accuracy</div>
            <div className="text-3xl font-bold">{Math.round(doc.pct * 100)}%</div>
          </div>
        </div>

        <h2 className="text-lg font-semibold mt-8 mb-3">Items</h2>
        <ul className="space-y-2">
          {doc.perItem.map((pi) => (
            <li key={pi.id} className="flex items-center justify-between rounded-xl border p-3">
              <span>#{pi.id}</span>
              <span className={pi.isCorrect ? "text-green-600" : "text-red-600"}>
                {pi.isCorrect ? "Correct" : "Incorrect"}
              </span>
            </li>
          ))}
        </ul>
      </main>
      <SiteFooter />
    </div>
  );
}
