// /lib/i18n.ts
export type Dict = Record<string, any>;

/**
 * Simple i18n translator — supports nested keys like "ui.nav.home".
 * Falls back to the provided default if key or dict is missing.
 */
export function t(dict: Dict | null | undefined, key: string, fallback: string = ""): string {
  if (!dict) return fallback;
  const parts = key.split(".");
  let cur: any = dict;
  for (const p of parts) {
    if (cur && typeof cur === "object" && p in cur) cur = cur[p];
    else return fallback;
  }
  return typeof cur === "string" ? cur : fallback;
}
