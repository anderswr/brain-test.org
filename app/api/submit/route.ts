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

    // --- Beregn resultat ---
    let result;
    if (Object.keys(answers).length > 0) {
      const computed = computeResult(answers);

      result = {
        version: computed.version,
        iqEstimate: computed.iqEstimate,
        totalPercent: computed.totalPercent,
        categoryScores: computed.categoryScores,
        ci: [
          Math.max(55, computed.iqEstimate - 10),
          Math.min(145, computed.iqEstimate + 10),
        ] as [number, number],
      };
    } else {
      // --- Tom fallback (ingen svar) ---
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

    // --- Lagre / oppdatere ---
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

    return NextResponse.json({ ok: true, id, result }, { status: 200 });
  } catch (err) {
    console.error("POST /api/submit error", err);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}
