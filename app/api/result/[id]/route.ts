// app/api/result/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getCollection } from "@/lib/db";
import { computeResult, toIQResultDTO } from "@/lib/scoring";
import { QUESTION_BANK } from "@/data/question_index";
import { AnswerMap } from "@/lib/types";

export const runtime = "nodejs";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const col = await getCollection("results");
    const doc = await col.findOne({ id: params.id }, { projection: { _id: 0 } });

    // --- Ikke funnet ---
    if (!doc) {
      return NextResponse.json({ error: "not_found" }, { status: 404 });
    }

    // --- Ferdig resultat finnes allerede ---
    if (
      doc.result &&
      typeof doc.result.iq === "number" &&
      doc.result.perCategory
    ) {
      return NextResponse.json(
        {
          id: doc.id,
          result: doc.result,
        },
        { status: 200 }
      );
    }

    // --- Beregn på nytt fra lagrede svar ---
    if (doc.answers && typeof doc.answers === "object") {
      const answers = doc.answers as AnswerMap;
      const computed = computeResult(QUESTION_BANK, answers);
      const result = toIQResultDTO(computed);

      // lagre oppdatert versjon
      await col.updateOne(
        { id: doc.id },
        { $set: { result, updatedAt: new Date() } }
      );

      return NextResponse.json({ id: doc.id, result }, { status: 200 });
    }

    // --- Ufullstendig dokument – returner fallback ---
    const fallback = {
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

    console.warn("Incomplete result document:", doc.id);
    return NextResponse.json({ id: doc.id, result: fallback }, { status: 200 });
  } catch (err) {
    console.error("GET /api/result/[id] error", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
