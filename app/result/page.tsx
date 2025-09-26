// app/result/page.tsx
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useI18n } from "@/app/providers/I18nProvider";
import { t } from "@/lib/i18n";

export default function ResultIndex() {
  const { dict } = useI18n();
  const [id, setId] = React.useState("");
  const router = useRouter();

  function openResult() {
    if (id) router.push(`/result/${id}`);
  }

  return (
    <div className="app-shell">
      <SiteHeader />
      <main className="page-main">
        <div className="container">
          <article className="panel head prose">
            <h1>{t(dict, "result.title", "Result")}</h1>
            <p className="muted">
              {t(
                dict,
                "result.lookup_hint",
                "Paste your ID below to view your report."
              )}
            </p>

            <div className="row mt-6" style={{ gap: 8 }}>
              <input
                className="btn"
                style={{ flex: 1, textAlign: "left" }}
                placeholder={t(dict, "result.id_placeholder", "Your ID")}
                value={id}
                onChange={(e) => setId(e.target.value.trim())}
                aria-label={t(dict, "result.id_placeholder", "Your ID")}
                onKeyDown={(e) => {
                  if (e.key === "Enter") openResult();
                }}
              />
              <button className="btn primary" onClick={openResult}>
                {t(dict, "common.read", "Read")}
              </button>
            </div>
          </article>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
