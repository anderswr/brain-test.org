// app/about/page.tsx
"use client";

import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useI18n } from "@/app/providers/I18nProvider";
import { t } from "@/lib/i18n";
import React from "react";

function renderList(dict: any, baseKey: string, max = 20) {
  const items: string[] = [];
  for (let i = 1; i <= max; i++) {
    const key = `${baseKey}.li${i}`;
    const val = t(dict, key, "");
    if (val && String(val).trim().length > 0) items.push(val);
  }
  if (items.length === 0) return null;
  return (
    <ul>
      {items.map((val, idx) => (
        <li key={`${baseKey}-li-${idx}`}>{val}</li>
      ))}
    </ul>
  );
}

export default function AboutPage() {
  const { dict } = useI18n();

  // about.*
  const aboutTitle   = t(dict, "about.title", "About");
  const aboutIntro   = t(dict, "about.intro", "");
  const contactTitle = t(dict, "about.contact.title", "");
  const contactP1    = t(dict, "about.contact.p1", "");
  const contactP2    = t(dict, "about.contact.p2", "");

  // privacy.*
  const privacyTitle = t(dict, "privacy.title", "");
  const privacyP1    = t(dict, "privacy.p1", "");
  const privacyList  = renderList(dict, "privacy");

  const hasContact = !!(contactTitle || contactP1 || contactP2);
  const hasPrivacy = !!(privacyTitle || privacyP1 || privacyList);

  return (
    <div className="app-shell">
      <SiteHeader />
      <main className="page-main">
        <div className="container stack-4">
          {/* Om / Kontakt */}
          <article className="panel prose">
            <h1>{aboutTitle}</h1>
            {aboutIntro && <p className="muted">{aboutIntro}</p>}

            {hasContact && (
              <section id="contact" className="stack-2">
                {contactTitle && <h2>{contactTitle}</h2>}
                {contactP1 && <p>{contactP1}</p>}
                {contactP2 && (
                  <p
                    className="muted"
                    dangerouslySetInnerHTML={{ __html: contactP2 }}
                  />
                )}
              </section>
            )}
          </article>

          {/* Personvern */}
          {hasPrivacy && (
            <article className="panel prose">
              {privacyTitle && <h2>{privacyTitle}</h2>}
              {privacyP1 && <p>{privacyP1}</p>}
              {privacyList}
            </article>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
