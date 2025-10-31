/* eslint-disable @typescript-eslint/no-explicit-any */
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

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
      featuregroup,
      applications,
    } = data;

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

        // --- Sizes (with nested Prices) ---
        sizes: sizes?.length
          ? {
              create: sizes.map((s: any) => ({
                name: s.name,
                price: s.price,
                inStock: s.inStock ?? true,
                stockCount: s.stockCount ?? 0,
                prices: s.prices?.length
                  ? {
                      create: s.prices.map((p: any) => ({
                        price: p.price,
                      })),
                    }
                  : undefined,
              })),
            }
          : undefined,

        // --- Attributes ---
        attributes: attributes?.length ? { create: attributes } : undefined,

        // --- Images ---
        images: images?.length ? { create: images } : undefined,

        // --- Variants ---
        variants: variants?.length ? { create: variants } : undefined,

        // --- Feature Groups ---
        featuregroup: featuregroup?.length
          ? {
              create: featuregroup.map((group: any) => ({
                header: group.header,
                features: group.features
                  ? {
                      create: group.features.map((f: any) => ({
                        heading: f.heading,
                        icon: f.icon,
                        text: f.text,
                      })),
                    }
                  : undefined,
              })),
            }
          : undefined,

        // --- Applications ---
        Applications: applications?.length
          ? {
              create: applications.map((app: any) => ({
                description: app.description,
                images: app.images || [],
              })),
            }
          : undefined,
      },

      include: {
        sizes: {
          include: {
            prices: true,
          },
        },
        attributes: true,
        images: true,
        variants: true,
        featuregroup: {
          include: { features: true },
        },
        Applications: true,
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
