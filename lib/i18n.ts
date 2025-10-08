export type Dict = Record<string, string>;

/**
 * 🔤 Simple translation lookup for flat i18n dictionaries.
 * Usage:
 *   t(dict, "ui.nav.home", "Home")
 * Falls back gracefully if key is missing or dict not loaded.
 */
export function t(dict: Dict | null | undefined, key: string, fallback = ""): string {
  if (!dict) return fallback;

  // Exact key match (flat structure)
  const val = dict[key];
  if (typeof val === "string" && val.trim().length > 0) return val;

  // Optional fallback with dot notation: "ui.nav.home" -> try "ui-home" etc.
  const altKey = key.replace(/\./g, "-");
  const altVal = dict[altKey];
  if (typeof altVal === "string" && altVal.trim().length > 0) return altVal;

  // Log missing keys only in development
  if (process.env.NODE_ENV === "development") {
    console.warn(`[i18n] Missing translation: ${key}`);
  }

  return fallback;
}
