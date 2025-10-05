"use client";
import * as React from "react";

export type Dict = Record<string, any>;

/** Gjør nested JSON-flater til én nøkkel: {a:{b:"x"}} -> {"a.b":"x"} */
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

/** Laster og slår sammen alle JSON-filer i locales/[lang]/ */
async function loadDict(lang: string): Promise<Dict> {
  const files = [
    "en", "reasoning", "math", "verbal", "spatial", "memory"
  ];

  const merged: Dict = {};
  for (const file of files) {
    try {
      const mod = await import(`@/locales/${lang}/${file}.json`);
      Object.assign(merged, flatten(mod.default || mod));
    } catch {
      console.warn(`[i18n] Missing file: ${file}.json`);
    }
  }

  // fallback
  if (Object.keys(merged).length === 0 && lang !== "en") {
    return loadDict("en");
  }
  return merged;
}

/** Hook for i18n */
export function useI18n() {
  const [lang, setLang] = React.useState("en");
  const [dict, setDict] = React.useState<Dict>({});

  React.useEffect(() => {
    loadDict(lang).then(setDict);
  }, [lang]);

  return { lang, setLang, dict };
}
