import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.json();
  const { id, answers, result } = body;

  try {
    const client = await clientPromise;
    const db = client.db("iqtest");
    await db.collection("results").updateOne(
      { id },
      { $set: { id, answers, result, updatedAt: new Date() } },
      { upsert: true }
    );

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false, error: "db_error" }, { status: 500 });
  }
}
