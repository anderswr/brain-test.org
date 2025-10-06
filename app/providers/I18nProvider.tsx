"use client";
import * as React from "react";

export type Dict = Record<string, any>;

/** Deep merge two nested objects */
function deepMerge(target: Record<string, any>, source: Record<string, any>): Record<string, any> {
  const out: Record<string, any> = { ...target };
  for (const [k, v] of Object.entries(source)) {
    if (v && typeof v === "object" && !Array.isArray(v)) {
      out[k] = deepMerge(out[k] ?? {}, v as Record<string, any>);
    } else {
      out[k] = v;
    }
  }
  return out;
}

/** Load and merge all JSON files in locales/[lang]/ */
async function loadDict(lang: string): Promise<Dict> {
  const files = ["en", "reasoning", "math", "verbal", "spatial", "memory"];
  let merged: Dict = {};

  for (const file of files) {
    try {
      const mod = await import(`@/locales/${lang}/${file}.json`);
      merged = deepMerge(merged, mod.default ?? mod);
    } catch {
      console.warn(`[i18n] Missing file: ${file}.json`);
    }
  }

  // fallback if empty
  if (Object.keys(merged).length === 0 && lang !== "en") {
    return loadDict("en");
  }
  return merged;
}

/** Context + hook */
const I18nContext = React.createContext<{ lang: string; setLang: (l: string) => void; dict: Dict }>({
  lang: "en",
  setLang: () => {},
  dict: {},
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = React.useState("en");
  const [dict, setDict] = React.useState<Dict>({});

  React.useEffect(() => {
    loadDict(lang).then(setDict);
  }, [lang]);

  return <I18nContext.Provider value={{ lang, setLang, dict }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return React.useContext(I18nContext);
}
