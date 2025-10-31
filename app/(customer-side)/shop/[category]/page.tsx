import CategoryPage from "@/components/shop/category-grid";
import prismadb from "@/lib/prismadb";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

const ShopPage = async ({
  params,
}: {
  params: Promise<{ category: string }>;
}) => {
  const category = (await params).category;

  const categoryExists = await prismadb.category.findUnique({
    where: {
      catCode: category,
    },
  });

  const productList = await prismadb.product.findMany({
    where: {
      categoryId: categoryExists?.id,
    },
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
      featuregroup: {
        include: {
          features: true,
        },
      },
      sizes: {
        include:{
          prices:true
        }
      },
      attributes: true,
      images: true,
      variants: true,
    },
  });


  if (!productList.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white pt-20">
 
        <h2 className="text-3xl font-semibold text-gray-700 mb-2">
          Products Coming Soon 🚀
        </h2>
        <p className="text-gray-500 text-center max-w-md">
          We’re working hard to bring {categoryExists?.name} products online.  
          Stay tuned — they’ll be available here shortly!
        </p>
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
      <CategoryPage products={productList} />
    </Suspense>
  );
};

export default ShopPage;
