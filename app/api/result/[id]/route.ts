// app/api/result/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getCollection } from "@/lib/db";
import { computeIQ } from "@/lib/scoring_iq";
import { AnswerMap } from "@/lib/types";

export const runtime = "nodejs";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const col = await getCollection("results");

    const doc = await col.findOne({ id: params.id }, { projection: { _id: 0 } });
    if (!doc) {
      return NextResponse.json({ error: "not_found" }, { status: 404 });
    }

    // Hvis dokumentet allerede inneholder ferdig resultatfelt
    if (doc.result && typeof doc.result.iq === "number" && doc.result.perCategory) {
      return NextResponse.json(
        {
          id: doc.id,
          result: {
            iq: doc.result.iq,
            ci: doc.result.ci,
            percent: doc.result.percent,
            perCategory: doc.result.perCategory
          }
        },
        { status: 200 }
      );
    }

    // Hvis bare answers er lagret – recompute
    if (doc.answers && typeof doc.answers === "object") {
      const answers = doc.answers as AnswerMap;
      const computed = computeIQ(answers);

      await col.updateOne(
        { id: doc.id },
        { $set: { result: computed, updatedAt: new Date() } }
      );

      return NextResponse.json(
        {
          id: doc.id,
          result: computed
        },
        { status: 200 }
      );
    }

    return NextResponse.json({ error: "incomplete_result" }, { status: 422 });
  } catch (err) {
    console.error("GET /api/result/[id] error", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
