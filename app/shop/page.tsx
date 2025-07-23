import CategoryPage from "@/components/shop/all-product";
import { Suspense } from "react";

const ShopPage = async () => {
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
      <CategoryPage />
    </Suspense>
  );
};

export default ShopPage;
