"use client";

import * as React from "react";

/** Typing for the translation dictionary */
export type Dict = Record<string, string>;

/** 
 * Load all translation JSON files for the selected language (flat structure).
 * Example: en.json, en-reasoning.json, en-math.json, etc.
 */
async function loadDict(lang: string): Promise<Dict> {
  // Flat file structure: e.g. en.json, en-reasoning.json, en-math.json ...
  const suffixes = ["", "-reasoning", "-math", "-verbal", "-spatial", "-memory"];
  let merged: Dict = {};

  for (const suffix of suffixes) {
    const filename = `${lang}${suffix}.json`;
    try {
      const mod = await import(`@/locales/${filename}`);
      Object.assign(merged, mod.default ?? mod);
    } catch {
      console.warn(`[i18n] Missing file: ${filename}`);
    }
  }

  // Fallback to English if no dictionary found
  if (Object.keys(merged).length === 0 && lang !== "en") {
    console.warn(`[i18n] No dictionary found for "${lang}", falling back to English.`);
    return loadDict("en");
  }

  return merged;
}

/** 
 * React context to hold current language and dictionary.
 */
const I18nContext = React.createContext<{
  lang: string;
  setLang: (lang: string) => void;
  dict: Dict;
}>({
  lang: "en",
  setLang: () => {},
  dict: {},
});

/**
 * Provider component for the i18n context.
 * Loads and updates dictionary whenever the language changes.
 */
export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = React.useState("en");
  const [dict, setDict] = React.useState<Dict>({});

  React.useEffect(() => {
    let isMounted = true;
    loadDict(lang).then((data) => {
      if (isMounted) setDict(data);
    });
    return () => {
      isMounted = false;
    };
  }, [lang]);

  return (
    <I18nContext.Provider value={{ lang, setLang, dict }}>
      {children}
    </I18nContext.Provider>
  );
}

/**
 * Hook to access i18n context anywhere in the app.
 */
export function useI18n() {
  return React.useContext(I18nContext);
}
