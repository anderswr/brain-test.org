// /lib/i18n.ts
export type Dict = Record<string, string>;

/**
 * Simple translation lookup for flat i18n dictionaries.
 * Example: t(dict, "ui-home-title", "Default text")
 */
export function t(dict: Dict | null | undefined, key: string, fallback = ""): string {
  if (!dict) return fallback;
  const val = dict[key];
  return typeof val === "string" && val.trim().length > 0 ? val : fallback;
}
