/* eslint-disable @typescript-eslint/no-explicit-any */
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Destructure input
    const {
      name,
      code,
      description,
      categoryId,
      seriesId,
      thickness,
      thicknessRange,
      span,
      inStock,
      basePrice,
      features,
      application,
      maxCustomSize,
      sizes,
      attributes,
      images,
      variants,
    } = data;

    // Create product with nested dependencies
    const product = await prismadb.product.create({
      data: {
        name,
        code,
        description,
        categoryId,
        seriesId,
        thickness,
        thicknessRange,
        span,
        inStock,
        basePrice,
        features,
        application,
        maxCustomSize,
        sizes: { create: sizes },
        attributes: { create: attributes },
        images: { create: images },
        variants: { create: variants },
      },
      include: {
        sizes: true,
        attributes: true,
        images: true,
        variants: true,
      },
    });

    return NextResponse.json({ success: true, product });
  } catch (err: any) {
    console.error("Error creating product:", err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}




export async function GET() {
  try {
    const products = await prismadb.product.findMany({
      include: {
        category: true,
        series: true,
        sizes: true,
        attributes: true,
        images: true,
        variants: true,
      },
    });

    return NextResponse.json({ success: true, products });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
