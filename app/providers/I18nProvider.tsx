"use client";
import * as React from "react";

export type Dict = Record<string, any>;

/** Deep merge two nested objects safely */
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
      const data = mod.default ?? mod;
      merged = deepMerge(merged, data);
      console.info(`[i18n] Loaded: ${lang}/${file}.json (${Object.keys(data).join(", ")})`);
    } catch (err) {
      console.warn(`[i18n] Missing or invalid file: ${lang}/${file}.json`, err);
    }
  }

  // fallback if merge failed
  if (Object.keys(merged).length === 0 && lang !== "en") {
    console.warn(`[i18n] Empty dictionary for '${lang}', falling back to English.`);
    return loadDict("en");
  }

  console.log("[i18n] Final merged dict keys:", Object.keys(merged));
  console.log("[i18n] Has q.math?", !!merged.q?.math);

  return merged;
}

/** Context + hook */
const I18nContext = React.createContext<{
  lang: string;
  setLang: (l: string) => void;
  dict: Dict;
}>({
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
