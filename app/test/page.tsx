
"use client";
import * as React from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useI18n } from "@/app/providers/I18nProvider";
import { t } from "@/lib/i18n";
import { ICAR16 } from "@/data/icar16";

export default function TestPage() {
  const { dict, lang } = useI18n();
  const [idx, setIdx] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<string,string>>({});
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string|null>(null);
  const item = ICAR16[idx];

  function setChoice(choiceId: string) {
    setAnswers((a) => ({ ...a, [item.id]: choiceId }));
  }

  async function submit() {
    try {
      setSubmitting(true);
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ answers, lang }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "submit_failed");
      window.location.href = `/result/${json.id}`;
    } catch (e: any) {
      setError(e?.message || "submit_failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <SiteHeader />
      <main style={{marginTop:16}}>
        <div className="card">
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center", marginBottom:12}}>
            <div style={{fontWeight:600}}>{t(dict,item.promptKey)}</div>
            <div style={{opacity:.6, fontSize:12}}>{idx+1} / {ICAR16.length}</div>
          </div>

          <div style={{display:"grid", gap:8}}>
            {item.choices.map((c) => (
              <label key={c.id} className="card" style={{padding:12, display:"flex", gap:8, alignItems:"center"}}>
                <input type="radio" name={`q-${item.id}`} checked={answers[item.id]===c.id} onChange={()=>setChoice(c.id)} />
                <span>{t(dict,c.textKey)}</span>
              </label>
            ))}
          </div>

          <div style={{display:"flex", gap:8, marginTop:12}}>
            <button className="btn" onClick={()=>setIdx((i)=>Math.max(0,i-1))} disabled={idx===0 || submitting}>← {t(dict,"cta.continue","Continue")}</button>
            {idx < ICAR16.length-1 ? (
              <button className="btn" onClick={()=>setIdx((i)=>Math.min(ICAR16.length-1,i+1))} disabled={!answers[item.id] || submitting}>
                {t(dict,"cta.continue","Continue")} →
              </button>
            ) : (
              <button className="btn" onClick={submit} disabled={Object.keys(answers).length!==ICAR16.length || submitting}>
                {t(dict,"cta.submit","Finish")} ✓
              </button>
            )}
          </div>

          {error && <p style={{color:"#f87171", marginTop:8, fontSize:14}}>{error}</p>}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
