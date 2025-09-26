// app/api/stats/route.ts
import { NextResponse } from "next/server";
import { getCollection } from "@/lib/db";

export const runtime = "nodejs";

export async function GET() {
  try {
    const col = await getCollection("results");
    const total = await col.countDocuments({});
    return NextResponse.json({ total });
  } catch {
    return NextResponse.json({ total: 0 });
  }
}
