
"use client";
import * as React from "react";

type Dict = Record<string, any>;
function loadDict(lang: string): Dict {
  try {
    return require(`@/public/i18n/${lang}.json`);
  } catch {
    return require("@/public/i18n/en.json");
  }
}

export function useI18n() {
  const [lang, setLang] = React.useState<string>("en");
  const [dict, setDict] = React.useState<Dict>(loadDict("en"));
  React.useEffect(() => {
    setDict(loadDict(lang));
  }, [lang]);
  return { lang, setLang, dict };
}
