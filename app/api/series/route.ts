import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  const series = await prismadb.series.create({ data });
  return NextResponse.json(series);
}
