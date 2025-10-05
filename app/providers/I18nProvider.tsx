"use client";
import * as React from "react";

/** Typing for dictionary object */
type Dict = Record<string, any>;

/** Lazy-load a dictionary JSON file */
async function loadDict(lang: string): Promise<Dict> {
  try {
    const mod = await import(`@/locales/${lang}.json`);
    return mod.default;
  } catch (e) {
    console.warn(`[i18n] Missing or invalid locale '${lang}', falling back to 'en'`);
    const fallback = await import("@/locales/en.json");
    return fallback.default;
  }
}

/** Hook for getting and switching language + dictionary */
export function useI18n() {
  const [lang, setLang] = React.useState<string>("en");
  const [dict, setDict] = React.useState<Dict>({});

  // Load dictionary whenever language changes
  React.useEffect(() => {
    loadDict(lang).then(setDict);
  }, [lang]);

  return { lang, setLang, dict };
}
