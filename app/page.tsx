"use client";

import Link from "next/link";
import * as React from "react";
import { useI18n } from "./providers/I18nProvider";
import { t } from "@/lib/i18n";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

interface StatsResponse {
  total?: number;
  count?: number;
  totalTests?: number;
}

const isStatsResponse = (value: unknown): value is StatsResponse => {
  if (!value || typeof value !== "object") return false;
  const maybe = value as Partial<Record<keyof StatsResponse, unknown>>;
  return ["total", "count", "totalTests"].some((k) => typeof maybe[k as keyof StatsResponse] === "number");
};

export default function Home() {
  const { dict } = useI18n();

  const [targetCount, setTargetCount] = React.useState<number | null>(null);
  const [displayCount, setDisplayCount] = React.useState<number>(0);

  // Hent antall fullførte tester fra /api/stats
  React.useEffect(() => {
    let canceled = false;
    async function fetchCount(): Promise<number | null> {
      try {
        const res = await fetch("/api/stats", { cache: "no-store" });
        if (!res.ok) return null;
        const json = (await res.json()) as unknown;
        if (!isStatsResponse(json)) return null;
        return json.total ?? json.count ?? json.totalTests ?? null;
      } catch {
        return null;
      }
    }
    void (async () => {
      const n = await fetchCount();
      if (!canceled && typeof n === "number") {
        setTargetCount(n);
      }
    })();
    return () => {
      canceled = true;
    };
  }, []);

  // Myk opptelling
  React.useEffect(() => {
    if (targetCount == null) return;
    let start: number | null = null;
    const duration = 800;
    const from = 0,
      to = targetCount;
    const tick = (tNow: number) => {
      if (start == null) start = tNow;
      const p = Math.min(1, (tNow - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = Math.floor(from + (to - from) * eased);
      setDisplayCount(val);
      if (p < 1) requestAnimationFrame(tick);
    };
    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [targetCount]);

  return (
    <>
      <SiteHeader />

      <main className="container page-main">
        {/* HERO */}
        <header className="panel head" style={{ padding: 24 }}>
          <h1 className="hero-title">
            {t(dict, "site-title", "Free Cognitive Ability Test — under development —")}
          </h1>
          <p className="hero-text">
            {t(
              dict,
              "site-tagline",
              "A short, research-inspired IQ estimation across five core cognitive domains."
            )}
          </p>
          <div className="row" style={{ marginTop: 12, flexWrap: "wrap", gap: 8 }}>
            <Link href="/test" className="btn primary" aria-label="Start the IQ test">
              {t(dict, "cta-start", "Start the test")}
            </Link>
          </div>
        </header>

        {/* TRE KORT */}
        <section aria-label="IQ test features" style={{ marginTop: 16 }}>
          <div
            className="grid-cards"
            style={{
              display: "grid",
              gap: 16,
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))"
            }}
          >
            {/* Kort 1: Teller */}
            <article className="card" style={{ padding: 20 }}>
              <h2 style={{ marginTop: 0 }}>
                {t(dict, "ui-home-tests_count_title", "Completed IQ tests")}
              </h2>
              <div className="stack-2">
                <div
                  style={{
                    fontSize: "2.2rem",
                    fontWeight: 800,
                    lineHeight: 1,
                    letterSpacing: "0.5px"
                  }}
                  aria-live="polite"
                  aria-label="Total number of completed IQ tests"
                >
                  {targetCount == null ? "…" : displayCount.toLocaleString()}
                </div>
                <p className="muted">
                  {t(
                    dict,
                    "ui-home-tests_count_caption",
                    "People have used this free and anonymous assessment."
                  )}
                </p>
              </div>
            </article>

            {/* Kort 2: Retake/Compare */}
            <article className="card" style={{ padding: 20 }}>
              <h2 style={{ marginTop: 0 }}>
                {t(dict, "ui-compare-card-title", "Retake & compare")}
              </h2>
              <p className="muted">
                {t(
                  dict,
                  "ui-compare-card-text",
                  "You get an ID after the test. Take it again later and compare what changed."
                )}
              </p>
              <Link href="/compare" className="btn" aria-label="Compare results">
                {t(dict, "ui-nav-compare", "Compare")}
              </Link>
            </article>

            {/* Kort 3: ICAR/public domain */}
            <article className="card" style={{ padding: 20 }}>
              <h2 style={{ marginTop: 0 }}>
                {t(dict, "ui-icar-card-title", "Public-domain items (ICAR)")}
              </h2>
              <p className="muted">
                {t(
                  dict,
                  "ui-icar-card-text",
                  "Built on ICAR public-domain items. No account required, multilingual interface."
                )}
              </p>
              <a
                href="https://icar-project.org/"
                className="btn"
                aria-label="Read about ICAR public-domain items"
                target="_blank"
                rel="noreferrer"
              >
                {t(dict, "ui-icar-card-cta", "What is ICAR?")}
              </a>
            </article>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
