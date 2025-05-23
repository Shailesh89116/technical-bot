import { ProductGrid } from "@/components/product-grid"
import { ProductFilters } from "@/components/product-filters"

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero Section */}
      <section className="bg-black py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-semibold md:text-5xl">Shop Acrylic Sheets</h1>
          <p className="mx-auto max-w-2xl text-xl text-gray-300">
            Premium quality acrylic sheets engineered for perfection
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
          <aside className="w-full lg:w-80">
            <ProductFilters />
          </aside>
          <div className="flex-1">
            <ProductGrid />
          </div>
        </div>
      </div>
    </div>
  )
}
