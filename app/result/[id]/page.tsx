"use client";

import React, { useEffect, useMemo, useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useI18n } from "@/app/providers/I18nProvider";
import { t } from "@/lib/i18n";
import { CategoryId } from "@/lib/types";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceArea,
} from "recharts";

type IQResult = {
  iq: number;
  ci: [number, number];
  percent: number;
  perCategory: Record<string, { percent: number }>;
};

type ResultDoc = { id: string; result?: IQResult };

export default function ResultPage({ params }: { params: { id: string } }) {
  const { dict } = useI18n();
  const [data, setData] = useState<ResultDoc | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/result/${params.id}`, { cache: "no-store" });
        if (!res.ok) {
          setNotFound(true);
          return;
        }
        const json = await res.json();
        // sanity-check: ensure json.result exists
        if (!json?.result || typeof json.result.iq !== "number") {
          setNotFound(true);
          return;
        }
        setData(json);
      } catch (err) {
        console.error("Result fetch failed", err);
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
        <main className="container">
          <article className="card p-6">
            <h1>Result not found</h1>
            <p className="muted">Check your ID and try again.</p>
          </article>
        </main>
        <SiteFooter />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="app-shell">
        <SiteHeader />
        <main className="container">
          <article className="card p-6">
            <p className="muted">{t(dict, "ui-common-loading", "Loading…")}</p>
          </article>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const iq = data.result?.iq ?? 100;
  const ci = data.result?.ci ?? [90, 110];

  return (
    <div className="app-shell">
      <SiteHeader />
      <main className="container">
        {/* --- HEADER --- */}
        <article className="panel head p-6 score-hero">
          <div className="score-hero__left">
            <h1>{t(dict, "ui-result-title", "Your IQ Result")}</h1>
            <div className="row" style={{ gap: 8, alignItems: "center" }}>
              <code className="code-badge">{data.id}</code>
              <button
                className="btn"
                onClick={() => navigator.clipboard.writeText(data.id)}
              >
                {t(dict, "ui-result-copy_id", "Copy ID")}
              </button>
            </div>
            <p className="muted mt-3">
              {t(
                dict,
                "ui-result-disclaimer_iq",
                "This IQ estimate is calculated from your responses using a normalized z-score across five cognitive domains."
              )}
            </p>
          </div>
          <div className="score-hero__right">
            <div className="score-ring" data-color="blue">
              <div className="score-ring__value">{Math.round(iq)}</div>
              <div className="score-ring__label">IQ</div>
            </div>
            <div className="muted text-sm mt-2">
              95% CI: {ci[0]}–{ci[1]}
            </div>
          </div>
        </article>

        {/* --- CATEGORIES --- */}
        {categories.length > 0 && (
          <section className="grid-cards mt-6">
            {categories.map(([cat, val]) => (
              <article key={cat} className="cat-card" data-color="blue">
                <div className="cat-card__head">
                  <span className="pill">
                    {t(dict, `category-${cat}-name`, cat)}
                  </span>
                  <strong className="cat-card__score">
                    {val.percent.toFixed(0)}%
                  </strong>
                </div>
                <p className="muted">
                  {t(dict, `category-${cat}-desc`, "")}
                </p>
              </article>
            ))}
          </section>
        )}

        {/* --- IQ DISTRIBUTION --- */}
        <section className="panel mt-8 p-6">
          <h2 className="mb-3">
            {t(dict, "ui-result-iq_distribution", "IQ Distribution")}
          </h2>
          <IQBellChart userIQ={iq} ci={ci} />
          <p className="muted mt-3">
            {t(
              dict,
              "ui-result-iq_explainer_short",
              "Your IQ estimate (mean = 100, SD = 15) is plotted on a normal curve."
            )}
          </p>
        </section>
      </main>
      <SiteFooter />

      <style jsx>{`
        .score-ring {
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

/** 🔷 Normal distribution graph for IQ (μ=100, σ=15) */
function IQBellChart({ userIQ, ci }: { userIQ: number; ci: [number, number] }) {
  const mu = 100;
  const sigma = 15;

  const points = Array.from({ length: 91 }, (_, i) => {
    const x = 55 + i;
    const y =
      (1 / (sigma * Math.sqrt(2 * Math.PI))) *
      Math.exp(-0.5 * Math.pow((x - mu) / sigma, 2));
    return { x, y };
  });

  const maxY = Math.max(...points.map((p) => p.y));

  const ranges = [
    { from: 55, to: 69, label: "Below 70 – Very Low", color: "#f87171" },
    { from: 70, to: 84, label: "70–84 – Below Average", color: "#fbbf24" },
    { from: 85, to: 114, label: "85–114 – Average", color: "#22c55e" },
    { from: 115, to: 129, label: "115–129 – Above Average", color: "#3b82f6" },
    { from: 130, to: 145, label: "130+ – Gifted", color: "#a855f7" },
  ];

  if (!ci || ci.length !== 2) ci = [90, 110]; // fallback safety

  return (
    <div style={{ width: "100%", height: 260 }}>
      <ResponsiveContainer>
        <AreaChart data={points}>
          <defs>
            <linearGradient id="colorIQ" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.7} />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <XAxis dataKey="x" type="number" domain={[55, 145]} tickCount={10} />
          <YAxis hide domain={[0, maxY]} />
          <CartesianGrid strokeDasharray="3 3" opacity={0.15} />

          {ranges.map((r) => (
            <ReferenceArea
              key={r.label}
              x1={r.from}
              x2={r.to}
              y1={0}
              y2={maxY}
              fill={r.color}
              fillOpacity={0.08}
              strokeOpacity={0}
              label={{
                value: r.label,
                position: "insideTop",
                fontSize: 11,
                fill: r.color,
                offset: 4,
              }}
            />
          ))}

          <Tooltip
            formatter={(v, n, p) => [
              `Density ${(v as number).toFixed(4)}`,
              `IQ ${p.payload.x}`,
            ]}
          />

          <Area
            type="monotone"
            dataKey="y"
            stroke="#3b82f6"
            fillOpacity={1}
            fill="url(#colorIQ)"
          />

          <ReferenceLine
            x={userIQ}
            stroke="#ef4444"
            strokeWidth={2}
            label={{
              value: `You (${Math.round(userIQ)})`,
              position: "top",
              fill: "#ef4444",
              fontWeight: 600,
            }}
          />
          <ReferenceLine
            x={ci[0]}
            stroke="#ef4444"
            strokeDasharray="4 4"
            strokeOpacity={0.7}
          />
          <ReferenceLine
            x={ci[1]}
            stroke="#ef4444"
            strokeDasharray="4 4"
            strokeOpacity={0.7}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
