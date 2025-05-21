import { ProductGrid } from "@/components/product-grid"
import { ProductFilters } from "@/components/product-filters"

export default function ShopPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col gap-4 md:flex-row md:gap-8">
        <aside className="w-full md:w-64 lg:w-72">
          <ProductFilters />
        </aside>
        <div className="flex-1">
          <h1 className="mb-6 text-3xl font-bold">Acrylic Sheets</h1>
          <ProductGrid />
        </div>
      </div>
    </div>
  )
}
