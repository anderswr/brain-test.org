// app/api/result/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getCollection } from "@/lib/db";
import { computeIQ } from "@/lib/scoring_iq";
import { AnswerMap } from "@/lib/types";

export const runtime = "nodejs";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const col = await getCollection("results");
    const doc = await col.findOne({ id: params.id }, { projection: { _id: 0 } });

    if (!doc) {
      return NextResponse.json({ error: "not_found" }, { status: 404 });
    }

    // ✅ Hvis resultat finnes fra før
    if (doc.result && typeof doc.result.iq === "number") {
      const iq = doc.result.iq;
      const ci = Array.isArray(doc.result.ci) ? doc.result.ci : [iq - 10, iq + 10];
      const percent = typeof doc.result.percent === "number" ? doc.result.percent : 50;
      const perCategory = doc.result.perCategory || {};

      return NextResponse.json(
        {
          id: doc.id,
          result: { iq, ci, percent, perCategory },
        },
        { status: 200 }
      );
    }

    // ✅ Hvis bare answers er lagret – beregn på nytt
    if (doc.answers && typeof doc.answers === "object") {
      const answers = doc.answers as AnswerMap;
      const computed = computeIQ(answers);

      // fallback-sikkerhet
      const iq = computed?.iq ?? 100;
      const ci =
        Array.isArray(computed?.ci) && computed.ci.length === 2
          ? computed.ci
          : [iq - 10, iq + 10];
      const percent = computed?.percent ?? 50;
      const perCategory = computed?.perCategory ?? {};

      const result = { iq, ci, percent, perCategory };

      await col.updateOne(
        { id: doc.id },
        { $set: { result, updatedAt: new Date() } }
      );

      return NextResponse.json({ id: doc.id, result }, { status: 200 });
    }

    // ✅ Hvis dokumentet er ufullstendig
    console.warn("Incomplete result document:", doc.id);
    return NextResponse.json({ error: "incomplete_result" }, { status: 422 });
  } catch (err) {
    console.error("GET /api/result/[id] error", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
