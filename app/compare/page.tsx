"use client";

import React, { useMemo, useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useI18n } from "@/app/providers/I18nProvider";
import { t } from "@/lib/i18n";

interface ResultDoc {
  id: string;
  result: {
    iq: number;
    ci: [number, number];
    percent: number;
    perCategory: Record<string, { percent: number }>;
  };
}

export default function ComparePage() {
  const { dict } = useI18n();

  const [a, setA] = useState("");
  const [b, setB] = useState("");

  const [A, setAR] = useState<ResultDoc | null>(null);
  const [B, setBR] = useState<ResultDoc | null>(null);

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function run() {
    setLoading(true);
    setErr(null);
    setAR(null);
    setBR(null);
    try {
      const [ra, rb] = await Promise.all([
        fetch(`/api/result/${a}`, { cache: "no-store" }),
        fetch(`/api/result/${b}`, { cache: "no-store" }),
      ]);
      if (!ra.ok || !rb.ok) {
        setErr(t(dict, "ui-compare-notfound", "Could not find one or both IDs."));
        return;
      }
      const ja = (await ra.json()) as ResultDoc;
      const jb = (await rb.json()) as ResultDoc;
      setAR(ja);
      setBR(jb);
    } catch {
      setErr(t(dict, "ui-compare-error", "Something went wrong. Please try again."));
    } finally {
      setLoading(false);
    }
  }

  const cats: string[] = useMemo(() => {
    if (!A && !B) return [];
    const keys = new Set<string>([
      ...Object.keys(A?.result.perCategory || {}),
      ...Object.keys(B?.result.perCategory || {})
    ]);
    return Array.from(keys);
  }, [A, B]);

  return (
    <div className="app-shell">
      <SiteHeader />
      <main className="container" style={{ flex: "1 1 auto" }}>
        <article className="panel head" style={{ padding: 24 }}>
          <h1 className="mb-2">{t(dict, "ui-nav-compare", "Compare")}</h1>
          <p className="muted" style={{ marginTop: 6 }}>
            {t(
              dict,
              "ui-compare-explainer",
              "Compare two IQ reports to see changes in reasoning, math, verbal, spatial, and memory performance."
            )}
          </p>

          <div className="row" style={{ gap: 8, flexWrap: "wrap", marginTop: 12 }}>
            <input
              className="btn"
              style={{ flex: 1 }}
              placeholder={t(dict, "ui-compare-id_a", "ID A")}
              value={a}
              onChange={(e) => setA(e.target.value.trim())}
            />
            <input
              className="btn"
              style={{ flex: 1 }}
              placeholder={t(dict, "ui-compare-id_b", "ID B")}
              value={b}
              onChange={(e) => setB(e.target.value.trim())}
            />
            <button className="btn primary" onClick={() => void run()} disabled={!a || !b || loading}>
              {loading
                ? t(dict, "ui-common-sending", "Loading…")
                : t(dict, "ui-nav-compare", "Compare")}
            </button>
          </div>
          {err && <p style={{ color: "var(--bad)", marginTop: 8 }}>{err}</p>}
        </article>

        {A && B && (
          <>
            {/* IQ summary */}
            <section className="cmp-grid mt-6">
              {[A, B].map((R, i) => {
                const isA = i === 0;
                return (
                  <article key={i} className="card cmp-cell" style={{ padding: 24 }}>
                    <div className="score-hero">
                      <div className="score-hero__left">
                        <h2 className="mb-1">
                          {isA
                            ? t(dict, "ui-compare-id_a", "ID A")
                            : t(dict, "ui-compare-id_b", "ID B")}
                        </h2>
                        <code className="code-badge">{R.id}</code>
                      </div>
                      <div className="score-hero__right">
                        <div className="score-ring" data-color="blue">
                          <div className="score-ring__value">{Math.round(R.result.iq)}</div>
                          <div className="score-ring__label">IQ</div>
                        </div>
                        <div className="text-sm text-gray-500">
                          95% CI: {R.result.ci[0]}–{R.result.ci[1]}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </section>

            {/* Category comparison */}
            <section className="cmp-rows mt-6">
              {cats.map((cat) => {
                const aPct = A?.result.perCategory?.[cat]?.percent ?? 0;
                const bPct = B?.result.perCategory?.[cat]?.percent ?? 0;
                const diff = bPct - aPct;
                const trend = diff === 0 ? "•" : diff > 0 ? "▲" : "▼";
                const trendColor = diff === 0 ? "var(--muted)" : diff > 0 ? "#f59e0b" : "#34d399";

                return (
                  <div key={cat} className="cmp-grid">
                    <article className="cat-card cmp-cell">
                      <div className="cat-card__head">
                        <span className="pill">{t(dict, `category-${cat}-name`, cat)}</span>
                        <div className="flex items-baseline gap-2">
                          <strong className="cat-card__score">{aPct.toFixed(0)}</strong>
                          <span className="muted">%</span>
                        </div>
                      </div>
                      <p className="muted">{t(dict, `category-${cat}-desc`, "")}</p>
                    </article>

                    <article className="cat-card cmp-cell">
                      <div className="cat-card__head">
                        <span className="pill">{t(dict, `category-${cat}-name`, cat)}</span>
                        <div className="flex items-baseline gap-3">
                          <span style={{ color: trendColor, fontWeight: 600 }}>
                            {trend} {Math.abs(diff).toFixed(1)}
                          </span>
                          <strong className="cat-card__score">{bPct.toFixed(0)}</strong>
                          <span className="muted">%</span>
                        </div>
                      </div>
                      <p className="muted">{t(dict, `category-${cat}-desc`, "")}</p>
                    </article>
                  </div>
                );
              })}
            </section>
          </>
        )}
      </main>

      <SiteFooter />

      <style jsx>{`
        .cmp-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .cmp-cell {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .code-badge {
          display: inline-block;
          padding: 4px 8px;
          border-radius: 8px;
          background: #f3f4f6;
          border: 1px solid var(--border);
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace;
        }
        @media (max-width: 900px) {
          .cmp-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
