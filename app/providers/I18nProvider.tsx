// /app/providers/I18nProvider.tsx
"use client";
import * as React from "react";

export type Dict = Record<string, any>;

/** Flatten nested JSON objects into dot keys */
function flatten(obj: Record<string, any>, prefix = ""): Record<string, any> {
  return Object.keys(obj).reduce((acc, key) => {
    const value = obj[key];
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      Object.assign(acc, flatten(value, newKey));
    } else {
      acc[newKey] = value;
    }
    return acc;
  }, {} as Record<string, any>);
}

/** Load and merge all JSON files in locales/[lang]/ */
async function loadDict(lang: string): Promise<Dict> {
  const files = ["en", "reasoning", "math", "verbal", "spatial", "memory"];
  const merged: Dict = {};

  for (const file of files) {
    try {
      const mod = await import(`@/locales/${lang}/${file}.json`);
      Object.assign(merged, flatten(mod.default || mod));
    } catch {
      console.warn(`[i18n] Missing file: ${file}.json`);
    }
  }

  if (Object.keys(merged).length === 0 && lang !== "en") {
    return loadDict("en");
  }
  return merged;
}

/** Context setup */
const I18nContext = React.createContext<{
  lang: string;
  setLang: (lang: string) => void;
  dict: Dict;
}>({ lang: "en", setLang: () => {}, dict: {} });

/** Provider component */
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

/** Hook for easy access */
export function useI18n() {
  return React.useContext(I18nContext);
}
