
"use client";
import Link from "next/link";
import { useI18n } from "@/app/providers/I18nProvider";
import { t } from "@/lib/i18n";

export default function SiteHeader() {
  const { dict, lang, setLang } = useI18n();
  return (
    <header className="card" style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <Link href="/" style={{fontWeight:700}}>🧠 {t(dict,"site.title","IQ Test")}</Link>
      <div style={{display:"flex",gap:8,alignItems:"center"}}>
        <select value={lang} onChange={(e)=>setLang(e.target.value)} className="btn">
          <option value="en">EN</option>
          <option value="no">NO</option>
        </select>
        <Link className="btn" href="/test">{t(dict,"cta.start","Start")}</Link>
      </div>
    </header>
  );
}
