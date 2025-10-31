import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");

    if (!productId) {
      return NextResponse.json(
        { success: false, message: "Missing productId in query params" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { applications } = body;

    if (!applications || !Array.isArray(applications) || applications.length === 0) {
      return NextResponse.json(
        { success: false, message: "Invalid or empty applications data" },
        { status: 400 }
      );
    }

    // 1️⃣ Delete existing applications for this product
    await prismadb.applications.deleteMany({
      where: { productId },
    });

    // 2️⃣ Insert new applications
    for (const app of applications) {
      await prismadb.applications.create({
        data: {
          description: app.description,
          productId,
          images: app.images
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: `Applications updated successfully for product ${productId}`,
    });
  } catch (err: any) {
    console.error("Error updating applications:", err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
