// app/api/result/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getCollection } from "@/lib/db";
import { computeResult } from "@/lib/scoring_iq";
import { AnswerMap, CategoryId, ResultSummary } from "@/lib/types";

export const runtime = "nodejs";

interface StoredResultDoc {
  id: string;
  answers?: AnswerMap;
  result?: ResultSummary | LegacyResult;
  updatedAt?: Date;
  createdAt?: Date;
}

interface LegacyResult {
  iq: number;
  ci?: [number, number];
  percent: number;
  perCategory: Record<CategoryId, { percent: number }>;
}

const isAnswerMap = (value: unknown): value is AnswerMap => {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const entries = Object.entries(value as Record<string, unknown>);
  return entries.every(([, v]) =>
    typeof v === "number" ||
    typeof v === "string" ||
    (Array.isArray(v) && v.every((x) => typeof x === "number" || typeof x === "string"))
  );
};

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const col = await getCollection("results");
    const doc = await col.findOne<StoredResultDoc>({ id }, { projection: { _id: 0 } });

    // --- Not found ---
    if (!doc) {
      return NextResponse.json({ error: "not_found" }, { status: 404 });
    }

    // --- Return if already has new-format result ---
    if (doc.result && "iqEstimate" in doc.result) {
      const result = doc.result;
      return NextResponse.json({ id: doc.id, result }, { status: 200 });
    }

    // --- Recompute from stored answers ---
    if (doc.answers && isAnswerMap(doc.answers)) {
      const answers = doc.answers;
      const computed = computeResult(answers);

      // Transform to API-friendly DTO
      const result: ResultSummary = {
        version: computed.version,
        iqEstimate: computed.iqEstimate,
        totalPercent: computed.totalPercent,
        categoryScores: computed.categoryScores,
        ci: [Math.max(55, computed.iqEstimate - 10), Math.min(145, computed.iqEstimate + 10)],
      };

      await col.updateOne(
        { id: doc.id },
        { $set: { result, updatedAt: new Date() } }
      );

      return NextResponse.json({ id: doc.id, result }, { status: 200 });
    }

    // --- Fallback ---
    const fallback: ResultSummary = {
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
