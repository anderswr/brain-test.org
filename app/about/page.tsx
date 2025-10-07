"use client";

import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useI18n } from "@/app/providers/I18nProvider";
import { t } from "@/lib/i18n";
import React from "react";

export default function AboutPage() {
  const { dict } = useI18n();

  // About section
  const aboutTitle = t(dict, "about-title", "About this test");
  const aboutMethod = t(dict, "about-method", "");
  const aboutAudience = t(dict, "about-audience", "");
  const aboutLimitations = t(dict, "about-limitations", "");

  return (
    <div className="app-shell">
      <SiteHeader />
      <main className="page-main">
        <div className="container stack-4">
          <article className="panel prose">
            <h1>{aboutTitle}</h1>

            {aboutMethod && <p>{aboutMethod}</p>}
            {aboutAudience && <p>{aboutAudience}</p>}
            {aboutLimitations && <p className="muted">{aboutLimitations}</p>}
          </article>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
