// app/api/submit/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getCollection } from "@/lib/db";
import { generateId } from "@/lib/id";
import { ICAR16 } from "@/data/icar16";
import { scoreICAR } from "@/lib/scoring";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { answers?: Record<string, string>; lang?: string } | null;

    const langRaw = body?.lang;
    const lang = typeof langRaw === "string" && langRaw.trim() ? langRaw.trim() : "en";

    const incoming = (body?.answers ?? {}) as Record<string, string>;
    const validIds = new Set(ICAR16.map((q) => q.id));
    const cleaned: Record<string, string> = {};
    for (const [k, v] of Object.entries(incoming)) {
      if (validIds.has(k) && typeof v === "string") cleaned[k] = v;
    }

    const scored = scoreICAR(ICAR16, cleaned);
    const id = generateId(11);

    const doc = {
      id,
      createdAt: new Date().toISOString(),
      lang,
      answers: cleaned,
      raw: scored.raw,
      iq: scored.iq,
      pct: scored.pct,
      perItem: scored.perItem,
    };

    const col = await getCollection("results");
    await col.insertOne(doc);

    return NextResponse.json({ id, ...doc }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "submit_failed" }, { status: 500 });
  }
}
