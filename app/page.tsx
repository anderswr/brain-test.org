
"use client";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useI18n } from "./providers/I18nProvider";
import { t } from "@/lib/i18n";
import Link from "next/link";

export default function HomePage() {
  const { dict } = useI18n();
  return (
    <div>
      <SiteHeader />
      <main style={{marginTop:16}}>
        <div className="card">
          <h1 style={{fontSize:24, fontWeight:700, marginBottom:8}}>{t(dict,"site.title","IQ Test")}</h1>
          <p style={{opacity:.8, marginBottom:12}}>{t(dict,"site.tagline","Short IQ test")}</p>
          <p className="hr" />
          <p style={{opacity:.7, fontSize:14, marginBottom:12}}>{t(dict,"disclaimer")}</p>
          <Link className="btn" href="/test">{t(dict,"cta.start","Start the test")} →</Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
