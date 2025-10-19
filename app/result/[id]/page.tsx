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

type LegacyIQResult = {
  iq: number;
  ci: [number, number];
  percent: number;
  perCategory: Record<string, { percent: number }>;
};

type NewIQResult = {
  version: string;
  iqEstimate: number;
  totalPercent: number;
  categoryScores: Record<CategoryId, number>;
  ci?: [number, number];
};

type ResultDoc = { id: string; result?: LegacyIQResult | NewIQResult };

export default function ResultPage({ params }: { params: { id: string } }) {
  const { dict } = useI18n();
  const [data, setData] = useState<ResultDoc | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/result/${params.id}`, { cache: "no-store" });
        if (!res.ok) return setNotFound(true);
        const json = await res.json();
        if (!json?.result) return setNotFound(true);
        setData(json);
      } catch (err) {
        console.error("Result fetch failed", err);
        setNotFound(true);
      }
    })();
  }, [params.id]);

  // --- Normalize result structure ---
  const normalized = useMemo(() => {
    const r = data?.result as any;
    if (!r) return null;

    if ("iqEstimate" in r && "categoryScores" in r) {
      const iq = r.iqEstimate;
      const ci: [number, number] = r.ci ?? [Math.max(55, iq - 10), Math.min(145, iq + 10)];
      const perCategory = Object.fromEntries(
        Object.entries(r.categoryScores).map(([k, v]) => [k, { percent: v }])
      );
      return { iq, ci, perCategory };
    }

    if ("iq" in r && "perCategory" in r) {
      return { iq: r.iq, ci: r.ci ?? [90, 110], perCategory: r.perCategory };
    }

    return null;
  }, [data]);

  const categories = useMemo(() => {
    const entries = Object.entries(normalized?.perCategory || {}) as [CategoryId, { percent: number }][];
    // Sort fra høyest til lavest prosent
    return entries.sort((a, b) => b[1].percent - a[1].percent);
  }, [normalized]);

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

  if (!normalized) {
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

  const { iq, ci } = normalized;
  const bestCat = categories[0]?.[0];

  // 🎨 Dynamiske farger basert på prestasjon
  const getColorForPercent = (p: number): string => {
    if (p >= 70) return "#22c55e"; // green
    if (p >= 50) return "#3b82f6"; // blue
    if (p >= 30) return "#fbbf24"; // yellow
    return "#ef4444"; // red
  };

  return (
    <div className="app-shell">
      <SiteHeader />
      <main className="container">
        {/* HEADER */}
        <article className="panel head p-6 score-hero">
          <div className="score-hero__left">
            <h1>{t(dict, "ui-result-title", "Your IQ Estimate")}</h1>

            <div className="row" style={{ gap: 8, alignItems: "center" }}>
              <code className="code-badge">{data?.id}</code>
              <button
                className="btn"
                onClick={() => navigator.clipboard.writeText(data?.id || "")}
              >
                {t(dict, "ui-result-copy_id", "Copy ID")}
              </button>
            </div>

            <p className="muted mt-3">
              {t(
                dict,
                "ui-result-disclaimer_iq",
                "Your result reflects performance across five cognitive domains: reasoning, math, verbal, spatial, and memory. It is scored using a normalized model with mean = 100 and standard deviation = 15. Scores are indicative, not diagnostic."
              )}
            </p>

            {bestCat && (
              <p
                className="mt-4 text-sm"
                style={{
                  color: getColorForPercent(categories[0][1].percent),
                  fontWeight: 500,
                }}
              >
                🌟 You performed best in{" "}
                <strong>
                  {t(dict, `category-${bestCat}-name`, bestCat.toUpperCase())}
                </strong>
                .
              </p>
            )}
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

        {/* CATEGORY SCORES */}
        {categories.length > 0 && (
          <section className="grid-cards mt-6">
            {categories.map(([cat, val]) => {
              const color = getColorForPercent(val.percent);
              return (
                <article
                  key={cat}
                  className="cat-card transition-colors"
                  style={{
                    border: `1px solid ${color}33`,
                    background: `linear-gradient(145deg, ${color}10, transparent)`,
                    borderRadius: 12,
                    padding: "1rem",
                  }}
                >
                  <div
                    className="cat-card__head"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span
                      className="pill"
                      style={{
                        background: color,
                        color: "white",
                        fontWeight: 600,
                        padding: "2px 8px",
                        borderRadius: 12,
                        fontSize: 13,
                      }}
                    >
                      {t(dict, `category-${cat}-name`, cat)}
                    </span>
                    <strong
                      className="cat-card__score"
                      style={{ color, fontSize: 18, fontWeight: 700 }}
                    >
                      {val.percent.toFixed(0)}%
                    </strong>
                  </div>
                  <p
                    className="muted"
                    style={{
                      color: "var(--text-muted)",
                      lineHeight: 1.4,
                      marginTop: 6,
                    }}
                  >
                    {t(dict, `category-${cat}-desc`, "")}
                  </p>
                </article>
              );
            })}
          </section>
        )}

        {/* IQ DISTRIBUTION */}
        <section className="panel mt-8 p-6">
          <h2 className="mb-3">{t(dict, "ui-result-iq_distribution", "IQ Distribution")}</h2>
          <IQBellChart userIQ={iq} ci={ci} />
        </section>
      </main>
      <SiteFooter />
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
    { from: 55, to: 69, label: "Below 70 – Very Low", color: "#ef4444" },
    { from: 70, to: 84, label: "70–84 – Below Average", color: "#fbbf24" },
    { from: 85, to: 114, label: "85–114 – Average", color: "#22c55e" },
    { from: 115, to: 129, label: "115–129 – Above Average", color: "#3b82f6" },
    { from: 130, to: 145, label: "130+ – Gifted", color: "#a855f7" },
  ];

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
          <CartesianGrid strokeDasharray="3 3" opacity={0.1} />

          {ranges.map((r) => (
            <ReferenceArea
              key={r.label}
              x1={r.from}
              x2={r.to}
              y1={0}
              y2={maxY}
              fill={r.color}
              fillOpacity={0.08}
              label={{
                value: r.label,
                position: "insideTop",
                fontSize: 11,
                fill: r.color,
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
          <ReferenceLine x={ci[0]} stroke="#ef4444" strokeDasharray="4 4" strokeOpacity={0.7} />
          <ReferenceLine x={ci[1]} stroke="#ef4444" strokeDasharray="4 4" strokeOpacity={0.7} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
