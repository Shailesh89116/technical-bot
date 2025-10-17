import CategoryPage from "@/components/shop/all-product";
import prismadb from "@/lib/prismadb";
import { Suspense } from "react";

const ShopPage = async () => {
  const products = await prismadb.product.findMany({
    include: {
      category: {
        select: {
          name: true,
        },
      },
      series: {
        select: {
          name: true,
        },
      },
      sizes: true,
      attributes: true,
      images: true,
      variants: true,
    },
  });

  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-white pt-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            No Products Available
          </h2>
          <p className="text-gray-600">
            Please check back later for new products.
          </p>
        </div>
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white pt-16 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
            <p className="text-gray-600">Loading category...</p>
          </div>
        </div>
      }
    >
      <CategoryPage products={products} />
    </Suspense>
  );
};

export default ShopPage;
