import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const seriesId = searchParams.get("seriesId");

    if (!seriesId) {
      return NextResponse.json(
        { success: false, message: "Missing seriesId in query params" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { sizes } = body;

    if (!sizes || !Array.isArray(sizes) || sizes.length === 0) {
      return NextResponse.json(
        { success: false, message: "Invalid sizes data" },
        { status: 400 }
      );
    }

    // Fetch all products belonging to the given series
    const products = await prismadb.product.findMany({
      where: { seriesId },
      select: { id: true },
    });

    if (!products.length) {
      return NextResponse.json(
        { success: false, message: "No products found for this seriesId" },
        { status: 404 }
      );
    }

    // Loop over each product and update its sizes
    for (const product of products) {
      // 1️⃣ Find existing product sizes
      const existingSizes = await prismadb.productSize.findMany({
        where: { productId: product.id },
        select: { id: true },
      });

      const sizeIds = existingSizes.map((s) => s.id);

      // 2️⃣ Delete old prices first (because of foreign key constraint)
      if (sizeIds.length > 0) {
        await prismadb.price.deleteMany({
          where: { productSizeId: { in: sizeIds } },
        });
      }

      // 3️⃣ Delete old sizes
      await prismadb.productSize.deleteMany({
        where: { productId: product.id },
      });

      // 4️⃣ Create new sizes + nested price record
      for (const s of sizes) {
        const newSize = await prismadb.productSize.create({
          data: {
            name: s.name,
            price: s.price,
            inStock: s.inStock ?? true,
            stockCount: s.stockCount ?? 0,
            productId: product.id,
          },
        });

        // Add a price history record
        await prismadb.price.create({
          data: {
            productSizeId: newSize.id,
            price: s.price,
          },
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: `Sizes and prices updated for ${products.length} product(s) under seriesId ${seriesId}`,
    });
  } catch (err: any) {
    console.error("Error updating sizes:", err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
