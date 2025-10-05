"use client";
import * as React from "react";

export type Dict = Record<string, any>;

/** Laster og slår sammen alle JSON-filer i locales/[lang]/ */
async function loadDict(lang: string): Promise<Dict> {
  try {
    // Dynamisk import av ALLE JSON-filer i valgt språk
    const modules = import.meta.glob(`/app/../locales/${lang}/*.json`);

    const dicts = await Promise.all(
      Object.values(modules).map(async (importer: any) => {
        const mod = await importer();
        return mod.default || mod;
      })
    );

    // Slå sammen alle ordbøkene
    return Object.assign({}, ...dicts);
  } catch (err) {
    console.warn(`[i18n] Failed to load locale '${lang}', falling back to 'en'`, err);

    // Fallback til engelsk
    try {
      const fallbackModules = import.meta.glob(`/app/../locales/en/*.json`);
      const dicts = await Promise.all(
        Object.values(fallbackModules).map(async (importer: any) => {
          const mod = await importer();
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

/** Hook for å hente og bytte språk */
export function useI18n() {
  const [lang, setLang] = React.useState<string>("en");
  const [dict, setDict] = React.useState<Dict>({});

  React.useEffect(() => {
    loadDict(lang).then(setDict);
  }, [lang]);

  return { lang, setLang, dict };
}
