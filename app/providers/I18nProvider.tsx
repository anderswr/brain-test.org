// /app/providers/I18nProvider.tsx
"use client";
import * as React from "react";

export type Dict = Record<string, any>;

// Deep merge nested objects (preserves dot-path structure)
function deepMerge<T extends Record<string, any>>(target: T, source: T): T {
  const out = { ...target };
  for (const [k, v] of Object.entries(source)) {
    if (v && typeof v === "object" && !Array.isArray(v)) {
      out[k] = deepMerge(out[k] || {}, v);
    } else {
      out[k] = v;
    }
  }
  return out as T;
}

// Load and merge all JSON files in locales/[lang]/
async function loadDict(lang: string) {
  const files = ["en", "reasoning", "math", "verbal", "spatial", "memory"];
  let merged: Dict = {};

  for (const file of files) {
    try {
      const mod = await import(`@/locales/${lang}/${file}.json`);
      merged = deepMerge(merged, (mod.default ?? mod) as Dict);
    } catch {
      // ok if a module is missing (warn once if you want)
    }
  }

  if (Object.keys(merged).length === 0 && lang !== "en") {
    return loadDict("en");
  }
  return merged;
}

const I18nContext = React.createContext<{ lang: string; setLang: (l: string) => void; dict: Dict; }>({
  lang: "en", setLang: () => {}, dict: {}
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
