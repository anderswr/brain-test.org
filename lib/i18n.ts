// /lib/i18n.ts
export function t(dict: Record<string, any>, key: string, fallback = ""): string {
  const parts = key.split(".");
  let current: any = dict;
  for (const p of parts) {
    current = current?.[p];
    if (current == null) return fallback;
  }
  return typeof current === "string" ? current : fallback;
}
