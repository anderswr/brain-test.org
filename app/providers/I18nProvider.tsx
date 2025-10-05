"use client";
import * as React from "react";

export type Dict = Record<string, any>;

/** Dynamisk lasting og sammenslåing av alle JSON-filer for valgt språk */
async function loadDict(lang: string): Promise<Dict> {
  const files = [
    "en", // hovedfil (ui, site, nav, osv.)
    "reasoning",
    "math",
    "verbal",
    "spatial",
    "memory",
  ];

  const dict: Dict = {};

  for (const file of files) {
    try {
      const mod = await import(`@/locales/${lang}/${file}.json`);
      Object.assign(dict, mod.default || mod);
    } catch (err) {
      console.warn(`[i18n] Missing or invalid file '${file}.json' for ${lang}, skipping.`);
    }
  }

  // Hvis språket feilet totalt, last engelsk fallback
  if (Object.keys(dict).length === 0 && lang !== "en") {
    console.warn(`[i18n] Falling back to English.`);
    return await loadDict("en");
  }

  return dict;
}

/** Hook for å hente og bytte språk */
export function useI18n() {
  const [lang, setLang] = React.useState<string>("en");
  const [dict, setDict] = React.useState<Dict>({});

  React.useEffect(() => {
    loadDict(lang).then(setDict);
  }, [lang]);

  return { lang, setLang, dict };
}
