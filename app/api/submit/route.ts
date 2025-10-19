// /app/api/submit/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getCollection } from "@/lib/db";
import { computeResult } from "@/lib/scoring_iq";
import { AnswerMap } from "@/lib/types";
import { randomUUID } from "crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(req: NextRequest) {
  try {
    const col = await getCollection("results");
    const body = await req.json();

    const id: string = body.id?.trim() || randomUUID();
    const answers: AnswerMap = body.answers || {};

    // --- 1️⃣ Beregn resultat ---
    let result;
    if (Object.keys(answers).length > 0) {
      const computed = computeResult(answers);

      // Beregn realistisk 95% konfidensintervall ±10 poeng
      const ciLow = Math.max(55, computed.iqEstimate - 10);
      const ciHigh = Math.min(145, computed.iqEstimate + 10);

      result = {
        version: computed.version,
        iqEstimate: computed.iqEstimate,
        totalPercent: Math.round(computed.totalPercent),
        categoryScores: computed.categoryScores,
        ci: [ciLow, ciHigh] as [number, number],
      };

      // Dev-log for sanitetssjekk
      console.log("[API:SUBMIT] IQ =", result.iqEstimate, "CI", result.ci);
      console.log("[API:SUBMIT] Category scores:", result.categoryScores);
    } else {
      // --- 2️⃣ Fallback dersom ingen svar ---
      result = {
        version: "fallback",
        iqEstimate: 100,
        totalPercent: 50,
        categoryScores: {
          reasoning: 50,
          math: 50,
          verbal: 50,
          spatial: 50,
          memory: 50,
        },
        ci: [90, 110] as [number, number],
      };
    }

    // --- 3️⃣ Lagre / oppdater resultat ---
    await col.updateOne(
      { id },
      {
        $set: {
          id,
          answers,
          result,
          updatedAt: new Date(),
        },
        $setOnInsert: { createdAt: new Date() },
      },
      { upsert: true }
    );

    // --- 4️⃣ Returner resultat ---
    return NextResponse.json({ ok: true, id, result }, { status: 200 });
  } catch (err: any) {
    console.error("[API:SUBMIT] Error:", err);
    return NextResponse.json(
      { ok: false, error: "server_error", message: err?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
