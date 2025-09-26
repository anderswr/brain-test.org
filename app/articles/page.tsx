// app/articles/page.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useI18n } from "@/app/providers/I18nProvider";
import { t } from "@/lib/i18n";

type ArticleMeta = {
  slug: string;
  title: string;
  summary?: string;
  tags?: string[];
};

export default function ArticlesPage() {
  const { dict, lang } = useI18n();
  const [items, setItems] = React.useState<ArticleMeta[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;

    async function load() {
      setError(null);
      setItems(null);

      const urlFor = (l: string) => `/articles/${l}/index.json`;

      try {
        const res1 = await fetch(urlFor(lang), { cache: "no-store" });
        if (res1.ok) {
          const json = (await res1.json()) as ArticleMeta[];
          if (!cancelled) setItems(json);
          return;
        }
      } catch {}

      try {
        const res2 = await fetch(urlFor("en"), { cache: "no-store" });
        if (res2.ok) {
          const json = (await res2.json()) as ArticleMeta[];
          if (!cancelled) setItems(json);
          return;
        }
      } catch {}

      if (!cancelled) setError("Could not load articles.");
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [lang]);

  return (
    <div className="app-shell">
      <SiteHeader />
      <main className="page-main">
        <div className="container">
          {/* Hero */}
          <article className="panel head">
            <h1 className="mb-2">
              {t(dict, "ui.articles.card.title", "Learn more")}
            </h1>
            <p className="muted">
              {t(
                dict,
                "ui.articles.card.text",
                "Short, readable explainers and guides."
              )}
            </p>
          </article>

          {/* Loading / Error */}
          {!items && !error && (
            <section className="card mt-6" style={{ padding: 16 }}>
              <p className="muted">Loading…</p>
            </section>
          )}
          {error && (
            <section className="card mt-6" style={{ padding: 16 }}>
              <p className="muted">{error}</p>
            </section>
          )}

          {/* Grid */}
          {items && (
            <section className="mt-6">
              <div className="grid-cards">
                {items.map((a) => (
                  <Link
                    key={a.slug}
                    href={`/articles/${a.slug}`}
                    className="article-card"
                    aria-label={a.title}
                  >
                    <div className="media" aria-hidden>
                      <img
                        src={`/images/${a.slug}.png`}
                        alt=""
                        className="card-image"
                        loading="lazy"
                      />
                      <span className="media-gradient" />
                    </div>
                    <div className="card-content">
                      <h3 className="card-title">{a.title}</h3>
                      {a.summary && <p className="card-summary">{a.summary}</p>}
                      {a.tags && a.tags.length > 0 && (
                        <div style={{ marginTop: 8, display: "flex", gap: 6, flexWrap: "wrap" }}>
                          {a.tags.map((tag) => (
                            <span key={tag} className="pill">{tag}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <SiteFooter />

      <style jsx>{`
        /* Card lenke uten padding (overstyrer .card) */
        .article-card {
          display: block;
          padding: 0 !important;
          border-radius: var(--radius);
          overflow: hidden;
          position: relative;
          text-decoration: none;
          color: inherit;
          transition: transform 120ms ease, box-shadow 200ms ease, border-color 200ms ease, filter 200ms ease;
          border: 1px solid var(--border);
          background: var(--card);
          box-shadow: var(--shadow);
        }
        .article-card:hover,
        .article-card:focus-visible {
          transform: translateY(-2px);
        }
        .article-card:focus-visible {
          outline: 2px solid var(--primary);
          outline-offset: 2px;
        }

        /* Media med subtil blend */
        .media {
          position: relative;
          overflow: hidden;
          isolation: isolate;
          background: #0f1726;
        }
        .card-image {
          width: 100%;
          height: auto;
          aspect-ratio: 16 / 9;
          object-fit: cover;
          display: block;
          transform: scale(1);
          filter: saturate(0.95) contrast(0.98);
          transition: transform 300ms ease, filter 300ms ease, opacity 300ms ease;
        }
        .media-gradient {
          position: absolute;
          inset: auto 0 0 0;
          height: 80px;
          content: "";
          display: block;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 0.22) 65%,
            rgba(0, 0, 0, 0.35) 100%
          );
          pointer-events: none;
          z-index: 1;
        }
        .article-card:hover .card-image,
        .article-card:focus-visible .card-image {
          transform: scale(1.025);
          filter: saturate(1) contrast(1);
        }

        .card-content {
          padding: 14px 14px 12px;
        }
        .card-title {
          margin: 0 0 4px 0;
          line-height: 1.25;
          font-size: 1.05rem;
          font-weight: 700;
        }
        .card-summary {
          margin: 6px 0 0 0;
          color: var(--muted);
          font-size: 0.95rem;
        }

        @media (prefers-reduced-motion: reduce) {
          .article-card,
          .card-image {
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}
