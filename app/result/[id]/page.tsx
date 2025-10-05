"use client";

import React, { useEffect, useMemo, useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useI18n } from "@/app/providers/I18nProvider";
import { t } from "@/lib/i18n";
import { CategoryId } from "@/lib/types";

type IQResult = {
  iq: number;
  ci: [number, number];
  percent: number;
  perCategory: Record<string, { percent: number }>;
};

type ResultDoc = { id: string; result: IQResult };

export default function ResultPage({ params }: { params: { id: string } }) {
  const { dict } = useI18n();
  const [data, setData] = useState<ResultDoc | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/result/${params.id}`, { cache: "no-store" });
        if (!res.ok) { setNotFound(true); return; }
        const json = await res.json();
        setData(json);
      } catch {
        setNotFound(true);
      }
    })();
  }, [params.id]);

  const categories = useMemo(
    () => Object.entries(data?.result?.perCategory || {}) as [CategoryId, { percent: number }][],
    [data]
  );

  if (notFound) {
    return (
      <div className="app-shell">
        <SiteHeader />
        <main className="container"><p>Result not found.</p></main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="app-shell">
      <SiteHeader />
      <main className="container">
        {!data ? (
          <article className="card p-6"><p>Loading…</p></article>
        ) : (
          <>
            <article className="panel head p-6 score-hero">
              <div className="score-hero__left">
                <h1>{t(dict, "ui.result.title", "Your IQ Result")}</h1>
                <div className="row" style={{ gap: 8, alignItems: "center" }}>
                  <code className="code-badge">{data.id}</code>
                  <button
                    className="btn"
                    onClick={() => navigator.clipboard.writeText(data.id)}
                  >
                    {t(dict, "ui.result.copy_id", "Copy ID")}
                  </button>
                </div>
                <p className="muted mt-3">
                  {t(
                    dict,
                    "ui.result.disclaimer_iq",
                    "This IQ estimate is computed using normalized scores across reasoning, math, verbal, spatial, and memory domains."
                  )}
                </p>
              </div>
              <div className="score-hero__right">
                <div className="score-ring" data-color="blue">
                  <div className="score-ring__value">{Math.round(data.result.iq)}</div>
                  <div className="score-ring__label">IQ</div>
                </div>
                <div className="muted text-sm mt-2">
                  95% CI: {data.result.ci[0]}–{data.result.ci[1]}
                </div>
              </div>
            </article>

            {/* Kategori-detaljer */}
            <section className="grid-cards mt-6">
              {categories.map(([cat, val]) => (
                <article key={cat} className="cat-card" data-color="blue">
                  <div className="cat-card__head">
                    <span className="pill">{t(dict, `category.${cat}.name`, cat)}</span>
                    <strong className="cat-card__score">{val.percent.toFixed(0)}%</strong>
                  </div>
                  <p className="muted">{t(dict, `category.${cat}.desc`, "")}</p>
                </article>
              ))}
            </section>
          </>
        )}
      </main>
      <SiteFooter />
      <style jsx>{`
        .score-ring {
          position: relative;
          width: 148px;
          height: 148px;
          border-radius: 999px;
          display: grid;
          place-items: center;
          background: linear-gradient(135deg, #2563eb, #3b82f6);
          color: #fff;
        }
        .score-ring__value {
          font-size: 44px;
          font-weight: 700;
        }
        .score-ring__label {
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
      `}</style>
    </div>
  );
}
