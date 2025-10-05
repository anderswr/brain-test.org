"use client";
import * as React from "react";

export type Dict = Record<string, any>;

/** Dynamisk lasting og sammenslåing av alle JSON-filer i locales/[lang]/ */
async function loadDict(lang: string): Promise<Dict> {
  try {
    // Dynamisk import av ALLE JSON-filer i språk-mappen
    const context = require.context(
      `@/locales/${lang}`,
      false, // ikke rekursivt
      /\.json$/
    );

    const dicts = await Promise.all(
      context.keys().map(async (key) => {
        const mod = await context(key);
        return mod.default || mod;
      })
    );

    // Slå sammen alle delene
    return Object.assign({}, ...dicts);
  } catch (err) {
    console.warn(`[i18n] Failed to load locale '${lang}', falling back to 'en'`, err);
    try {
      const fallbackContext = require.context(`@/locales/en`, false, /\.json$/);
      const dicts = await Promise.all(
        fallbackContext.keys().map(async (key) => {
          const mod = await fallbackContext(key);
          return mod.default || mod;
        })
      );
      return Object.assign({}, ...dicts);
    } catch (fallbackErr) {
      console.error("[i18n] Fallback load failed:", fallbackErr);
      return {};
    }
  }
}

/** Hook for å hente språk og dictionary */
export function useI18n() {
  const [lang, setLang] = React.useState<string>("en");
  const [dict, setDict] = React.useState<Dict>({});

  React.useEffect(() => {
    loadDict(lang).then(setDict);
  }, [lang]);

  return { lang, setLang, dict };
}
