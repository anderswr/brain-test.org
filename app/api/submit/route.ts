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
    const body = await req.json();
    const col = await getCollection("results");

    // --- Valider input ---
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "invalid_body" }, { status: 400 });
    }

    const id: string = (body.id?.trim?.() || randomUUID()) as string;
    const answers: AnswerMap = body.answers || {};

    if (!answers || Object.keys(answers).length === 0) {
      return NextResponse.json({ error: "no_answers" }, { status: 400 });
    }

    // --- Beregn resultat ---
    let computed = computeIQ(answers);
    if (!computed || typeof computed.iq !== "number") {
      console.warn("computeIQ returned invalid data for id:", id);
      computed = {
        iq: 100,
        ci: [90, 110],
        percent: 50,
        perCategory: {},
      };
    }

    // --- Normaliser struktur ---
    const iq = computed.iq ?? 100;
    const ci =
      Array.isArray(computed.ci) && computed.ci.length === 2
        ? computed.ci
        : [iq - 10, iq + 10];
    const percent = computed.percent ?? 50;
    const perCategory = computed.perCategory ?? {};

    const result = { iq, ci, percent, perCategory };

    // --- Lagre i DB (upsert) ---
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

    // --- Returner ferdig struktur ---
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
