// app/api/submit/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getCollection } from "@/lib/db";
import { computeResult } from "@/lib/scoring";
import { toIQResultDTO } from "@/lib/scoring";
import { QUESTION_BANK } from "@/data/question_index";
import { AnswerMap } from "@/lib/types";
import { randomUUID } from "crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic"; // disable caching
export const revalidate = 0;

export async function POST(req: NextRequest) {
  try {
    const col = await getCollection("results");
    const body = await req.json();

    // Bruk eksisterende ID hvis gitt, ellers ny UUID
    const id: string = body.id?.trim() || randomUUID();
    const answers: AnswerMap = body.answers || {};

    let result;

    // --- Beregn resultat ---
    if (Object.keys(answers).length > 0) {
      const computed = computeResult(QUESTION_BANK, answers);
      result = toIQResultDTO(computed);
    } else {
      // --- Tom fallback (ingen svar) ---
      result = {
        iq: 100,
        ci: [90, 110] as [number, number],
        percent: 50,
        perCategory: {
          reasoning: { percent: 50 },
          math: { percent: 50 },
          verbal: { percent: 50 },
          spatial: { percent: 50 },
          memory: { percent: 50 },
        },
      };
    }

    // --- Lagre eller oppdatere i MongoDB ---
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

    return NextResponse.json(
      {
        ok: true,
        id,
        result,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("POST /api/submit error", err);
    return NextResponse.json(
      { ok: false, error: "server_error" },
      { status: 500 }
    );
  }
}
