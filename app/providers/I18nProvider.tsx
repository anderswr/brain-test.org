"use client";
import * as React from "react";

export type Dict = Record<string, string>;

/** Load all JSON files for the given language and merge them (flat structure) */
async function loadDict(lang: string): Promise<Dict> {
  const files = ["en", "reasoning", "math", "verbal", "spatial", "memory"];
  let merged: Dict = {};

  for (const file of files) {
    try {
      const mod = await import(`@/locales/${lang}/${file}.json`);
      Object.assign(merged, mod.default ?? mod);
    } catch {
      console.warn(`[i18n] Missing file: ${lang}/${file}.json`);
    }
  }

  // Fallback til engelsk hvis valgt språk mangler
  if (Object.keys(merged).length === 0 && lang !== "en") {
    return loadDict("en");
  }

  return merged;
}

/** Context for språk og ordbok */
const I18nContext = React.createContext<{
  lang: string;
  setLang: (l: string) => void;
  dict: Dict;
}>({
  lang: "en",
  setLang: () => {},
  dict: {},
});

/** Provider-komponent */
export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = React.useState("en");
  const [dict, setDict] = React.useState<Dict>({});

  React.useEffect(() => {
    loadDict(lang).then(setDict);
  }, [lang]);

  return (
    <I18nContext.Provider value={{ lang, setLang, dict }}>
      {children}
    </I18nContext.Provider>
  );
}

/** Hook for å hente språkdata hvor som helst */
export function useI18n() {
  return React.useContext(I18nContext);
}
