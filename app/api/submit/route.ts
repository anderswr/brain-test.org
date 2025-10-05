// app/api/submit/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getCollection } from "@/lib/db";
import { computeIQ } from "@/lib/scoring_iq";
import { AnswerMap } from "@/lib/types";
import { randomUUID } from "crypto";

export const runtime = "nodejs";

// slå av caching – resultater må lagres umiddelbart
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(req: NextRequest) {
  try {
    const col = await getCollection("results");
    const body = await req.json();

    // hent eksisterende ID hvis brukeren gjenbruker den, ellers generer ny
    const id: string = body.id?.trim() || randomUUID();
    const answers: AnswerMap = body.answers || {};

    // beregn resultatet
    const result = computeIQ(answers);

    // lagre (eller oppdater) i MongoDB
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
