// app/api/result/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getCollection } from "@/lib/db";
import { computeResult } from "@/lib/scoring_iq";
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

    // --- Not found ---
    if (!doc) {
      return NextResponse.json({ error: "not_found" }, { status: 404 });
    }

    // --- Return if already has new-format result ---
    if (
      doc.result &&
      typeof doc.result.iqEstimate === "number" &&
      doc.result.categoryScores
    ) {
      return NextResponse.json({ id: doc.id, result: doc.result }, { status: 200 });
    }

    // --- Recompute from stored answers ---
    if (doc.answers && typeof doc.answers === "object") {
      const answers = doc.answers as AnswerMap;
      const computed = computeResult(answers);

      // Transform to API-friendly DTO
      const result = {
        version: computed.version,
        iqEstimate: computed.iqEstimate,
        totalPercent: computed.totalPercent,
        categoryScores: computed.categoryScores,
        ci: [Math.max(55, computed.iqEstimate - 10), Math.min(145, computed.iqEstimate + 10)] as [
          number,
          number
        ],
      };

      await col.updateOne(
        { id: doc.id },
        { $set: { result, updatedAt: new Date() } }
      );

      return NextResponse.json({ id: doc.id, result }, { status: 200 });
    }

    // --- Fallback ---
    const fallback = {
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

    console.warn("Incomplete result document:", doc.id);
    return NextResponse.json({ id: doc.id, result: fallback }, { status: 200 });
  } catch (err) {
    console.error("GET /api/result/[id] error", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
