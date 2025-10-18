import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, description, hasSeries, catCode } = await req.json();
  const category = await prismadb.category.create({
    data: { name, description, hasSeries, catCode },
  });
  return NextResponse.json(category);
}

export async function GET() {
  const categories = await prismadb.category.findMany({
    include: { series: true, products: true },
  });
  return NextResponse.json(categories);
}
