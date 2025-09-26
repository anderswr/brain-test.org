// app/compare/page.tsx
"use client";

import React, { useState } from "react";
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
  pct: number; // 0..1
  perItem: { id: string; chosen?: string; correct: string; isCorrect: boolean }[];
};

function iqColor(iq: number): "green" | "orange" | "red" {
  if (iq >= 115) return "green";
  if (iq >= 90) return "orange";
  return "red";
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
        fetch(`/api/result/${b}`, { cache: "no-store" })
      ]);
      if (!ra.ok || !rb.ok) {
        setErr(t(dict, "ui.compare.notfound", "Could not find one or both IDs."));
        return;
      }
      const ja = (await ra.json()) as ResultDoc;
      const jb = (await rb.json()) as ResultDoc;
      setAR(ja);
      setBR(jb);
    } catch {
      setErr(t(dict, "ui.compare.error", "Something went wrong. Please try again."));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app-shell">
      <SiteHeader />
      <main className="page-main">
        <div className="container">
          {/* OVERSKRIFT */}
          <article className="panel head">
            <h1 className="mb-2">{t(dict, "ui.nav.compare", "Compare")}</h1>
            <p className="muted">
              {t(
                dict,
                "ui.compare.explainer",
                "Compare two reports to see if your actions work. Retest every 4–8 weeks to clearly see the trend."
              )}
            </p>

            <div className="row mt-6" style={{ gap: 8, alignItems: "stretch", flexWrap: "wrap" }}>
              <input
                className="btn"
                style={{ flex: 1, textAlign: "left" }}
                placeholder={t(dict, "ui.compare.id_a", "ID A")}
                value={a}
                onChange={(e) => setA(e.target.value.trim())}
                aria-label={t(dict, "ui.compare.id_a", "ID A")}
              />
              <input
                className="btn"
                style={{ flex: 1, textAlign: "left" }}
                placeholder={t(dict, "ui.compare.id_b", "ID B")}
                value={b}
                onChange={(e) => setB(e.target.value.trim())}
                aria-label={t(dict, "ui.compare.id_b", "ID B")}
              />
              <button className="btn primary" onClick={run} disabled={!a || !b || loading}>
                {loading ? t(dict, "common.sending", "Sending…") : t(dict, "ui.nav.compare", "Compare")}
              </button>
            </div>
            {err && <p style={{ color: "var(--bad)", marginTop: 8 }}>{err}</p>}
          </article>

          {/* RESULTAT-SAMMENLIGNING */}
          {A && B && (
            <>
              {/* Toppkort: IQ/Raw/Accuracy */}
              <section className="cmp-grid mt-6">
                {[A, B].map((R, i) => {
                  const color = iqColor(R.iq);
                  const label = i === 0 ? t(dict, "ui.compare.label_a", "ID A") : t(dict, "ui.compare.label_b", "ID B");
                  return (
                    <article key={i} className="card cmp-cell" style={{ padding: 24 }}>
                      <div className="score-hero" style={{ gap: 16 }}>
                        <div className="score-hero__left">
                          <h2 className="mb-2" style={{ margin: 0 }}>{label}</h2>
                          <code className="code-badge">{R.id}</code>
                        </div>
                        <div className="score-hero__right">
                          <div className="score-ring" data-color={color} title="IQ" aria-label="IQ">
                            <div className="score-ring__value">{R.iq}</div>
                            <div className="score-ring__label">{t(dict, "result.iq", "Estimated IQ")}</div>
                          </div>
                        </div>
                      </div>

                      <div className="grid-cards" style={{ marginTop: 12 }}>
                        <div className="card" style={{ padding: 14 }}>
                          <div className="muted" style={{ fontSize: ".85rem" }}>{t(dict, "result.raw", "Raw score")}</div>
                          <div style={{ fontSize: "1.4rem", fontWeight: 700 }}>
                            {R.raw} / {R.perItem.length}
                          </div>
                        </div>
                        <div className="card" style={{ padding: 14 }}>
                          <div className="muted" style={{ fontSize: ".85rem" }}>Accuracy</div>
                          <div style={{ fontSize: "1.4rem", fontWeight: 700 }}>{Math.round(R.pct * 100)}%</div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </section>

              {/* Diff-rad (B vs A) */}
              <section className="cmp-grid mt-6">
                {(() => {
                  const diffIQ = B.iq - A.iq;             // + = B høyere IQ
                  const diffRaw = B.raw - A.raw;          // + = B flere riktige
                  const diffAcc = Math.round(B.pct * 100) - Math.round(A.pct * 100);

                  const fmt = (n: number) => (n > 0 ? `+${n}` : `${n}`);
                  const trend = (n: number) => (n === 0 ? "•" : n > 0 ? "▲" : "▼");
                  const tColor = (n: number) => (n === 0 ? "var(--muted)" : n > 0 ? "#34d399" : "#f59e0b");

                  return (
                    <>
                      <article className="card cmp-cell" style={{ padding: 24 }}>
                        <h3 className="mb-2" style={{ margin: 0 }}>{t(dict, "ui.compare.label_a", "ID A")} → {t(dict, "ui.compare.label_b", "ID B")}</h3>
                        <div className="grid-cards">
                          <div className="card" style={{ padding: 14 }}>
                            <div className="muted" style={{ fontSize: ".85rem" }}>Δ IQ</div>
                            <div style={{ fontSize: "1.4rem", fontWeight: 700, color: tColor(diffIQ) }}>
                              {trend(diffIQ)} {fmt(diffIQ)}
                            </div>
                          </div>
                          <div className="card" style={{ padding: 14 }}>
                            <div className="muted" style={{ fontSize: ".85rem" }}>Δ {t(dict, "result.raw", "Raw score")}</div>
                            <div style={{ fontSize: "1.4rem", fontWeight: 700, color: tColor(diffRaw) }}>
                              {trend(diffRaw)} {fmt(diffRaw)}
                            </div>
                          </div>
                          <div className="card" style={{ padding: 14 }}>
                            <div className="muted" style={{ fontSize: ".85rem" }}>Δ Accuracy</div>
                            <div style={{ fontSize: "1.4rem", fontWeight: 700, color: tColor(diffAcc) }}>
                              {trend(diffAcc)} {fmt(diffAcc)}%
                            </div>
                          </div>
                        </div>
                      </article>
                    </>
                  );
                })()}
              </section>
            </>
          )}
        </div>
      </main>
      <SiteFooter />

      <style jsx>{`
        .cmp-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          align-items: stretch;
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
          background: var(--prose-code-bg, #0f1726);
          border: 1px solid var(--border);
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace;
        }
        @media (max-width: 900px) {
          .cmp-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
