// /lib/i18n.ts
export type Dict = Record<string, any>;

export function t(dict: Dict | null | undefined, key: string, fallback = ""): string {
  if (!dict) return fallback;
  // direct (flattened) hit
  if (typeof dict[key] === "string") return dict[key];

  // nested traversal
  const parts = key.split(".");
  let cur: any = dict;
  for (const p of parts) {
    if (cur && typeof cur === "object" && p in cur) cur = cur[p];
    else return fallback;
  }
  return typeof cur === "string" ? cur : fallback;
}
