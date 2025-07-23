/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Search, SlidersHorizontal, X } from "lucide-react"
import ProductCard from "@/components/shop/product-card"
import { productList } from "@/dummy-data/allProducts"
import { Slider } from "../ui/slider"

const getFilterOptions = () => {
  const allThickness = new Set<string>()
  const allFinish = new Set<string>()
  const allBrands = new Set<string>()

  productList.forEach((product) => {
    allThickness.add(product.thickness)
    allFinish.add(product.finish)
    allBrands.add(product.brand)
  })

  return {
    thickness: Array.from(allThickness).sort(),
    finish: Array.from(allFinish).sort(),
    brands: Array.from(allBrands).sort(),
  }
}

export default function CategoryPage() {
  const [sortBy, setSortBy] = useState("featured")
  const [searchQuery, setSearchQuery] = useState("")
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Essential filters only
  const [priceRange, setPriceRange] = useState([0, 800])
  const [selectedThickness, setSelectedThickness] = useState<string[]>([])
  const [selectedFinish, setSelectedFinish] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])

  const [wishlist, setWishlist] = useState<number[]>([])

  const filterOptions = getFilterOptions()

  // Real-time filtering - no "apply" button needed
  const filteredProducts = useMemo(() => {
    let filtered = productList

    // Search
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Price
    filtered = filtered.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    // Thickness
    if (selectedThickness.length > 0) {
      filtered = filtered.filter((product) => selectedThickness.includes(product.thickness))
    }

    // Finish
    if (selectedFinish.length > 0) {
      filtered = filtered.filter((product) => selectedFinish.includes(product.finish))
    }

    // Brand
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((product) => selectedBrands.includes(product.brand))
    }

    // Sort
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "newest":
          return b.id - a.id
        default:
          return 0
      }
    })
  }, [searchQuery, priceRange, selectedThickness, selectedFinish, selectedBrands, sortBy])

  const toggleWishlist = (productId: number) => {
    setWishlist((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const hasActiveFilters =
    priceRange[0] > 0 ||
    priceRange[1] < 800 ||
    selectedThickness.length > 0 ||
    selectedFinish.length > 0 ||
    selectedBrands.length > 0

  const clearAllFilters = () => {
    setPriceRange([0, 800])
    setSelectedThickness([])
    setSelectedFinish([])
    setSelectedBrands([])
    setSearchQuery("")
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  // Filter chip component
  const FilterChip = ({
    label,
    isSelected,
    onClick,
  }: {
    label: string
    isSelected: boolean
    onClick: () => void
  }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
        isSelected ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      {label}
    </button>
  )

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <div className="pt-16">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="text-center">
            <h1 className="text-6xl font-light tracking-tight text-gray-900 mb-6">Acrylic Sheets</h1>
            <p className="text-xl text-gray-600 font-light mb-12">Premium clarity. Exceptional strength.</p>

            {/* Search */}
            <div className="max-w-md mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search products"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-4 text-lg rounded-full border-gray-200 bg-gray-50 focus:bg-white focus:border-gray-300"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Results count */}
            <p className="text-gray-500">
              {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
              {searchQuery && ` for "${searchQuery}"`}
            </p>
          </div>
        </div>
      </div>

      {/* Filters & Controls */}
      <div className="mx-auto max-w-6xl md:px-6">
        {/* Desktop Filters - Horizontal, Clean */}
        <div className="hidden lg:block mb-12">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-6">
              <span className="text-sm text-gray-700 font-medium">Filter by</span>

              {/* Price Filter */}
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600">Price</span>
                <div className="w-32">
                  <Slider value={priceRange} onValueChange={setPriceRange} max={800} step={25} className="w-full" />
                </div>
                <span className="text-sm text-gray-600 min-w-[100px]">
                  {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <span className="text-sm text-gray-700">Sort by</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40 border-gray-200 rounded-full bg-transparent">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Filter Chips */}
          <div className="space-y-4">
            {/* Thickness */}
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600 w-20">Thickness</span>
              <div className="flex flex-wrap gap-2">
                {filterOptions.thickness.map((thickness) => (
                  <FilterChip
                    key={thickness}
                    label={thickness}
                    isSelected={selectedThickness.includes(thickness)}
                    onClick={() => {
                      setSelectedThickness((prev) =>
                        prev.includes(thickness) ? prev.filter((t) => t !== thickness) : [...prev, thickness],
                      )
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Finish */}
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600 w-20">Finish</span>
              <div className="flex flex-wrap gap-2">
                {filterOptions.finish.map((finish) => (
                  <FilterChip
                    key={finish}
                    label={finish}
                    isSelected={selectedFinish.includes(finish)}
                    onClick={() => {
                      setSelectedFinish((prev) =>
                        prev.includes(finish) ? prev.filter((f) => f !== finish) : [...prev, finish],
                      )
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Brand */}
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600 w-20">Category</span>
              <div className="flex flex-wrap gap-2">
                {filterOptions.brands.map((brand) => (
                  <FilterChip
                    key={brand}
                    label={brand}
                    isSelected={selectedBrands.includes(brand)}
                    onClick={() => {
                      setSelectedBrands((prev) =>
                        prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand],
                      )
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Clear filters */}
          {hasActiveFilters && (
            <div className="mt-6">
              <Button variant="ghost" onClick={clearAllFilters} className="text-sm text-gray-500 hover:text-gray-700">
                Clear all filters
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Controls */}
        <div className="lg:hidden flex items-center justify-between mb-8 px-6 md:px-0">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-32 border-gray-200 rounded-full bg-transparent">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>

          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="rounded-full border-gray-200 bg-transparent">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
                {hasActiveFilters && (
                  <Badge className="ml-2 h-5 w-5 rounded-full bg-gray-900 text-white p-0 text-xs">•</Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[350px] p-0">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Filters</h2>
                  {hasActiveFilters && (
                    <Button
                      variant="ghost"
                      onClick={clearAllFilters}
                      className="text-sm text-gray-500 hover:text-gray-700"
                    >
                      Clear all
                    </Button>
                  )}
                </div>
              </div>

              <div className="p-6 space-y-8">
                {/* Price */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Price</h3>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={800}
                    step={25}
                    className="w-full mb-3"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{formatPrice(priceRange[0])}</span>
                    <span>{formatPrice(priceRange[1])}</span>
                  </div>
                </div>

                {/* Thickness */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Thickness</h3>
                  <div className="flex flex-wrap gap-2">
                    {filterOptions.thickness.map((thickness) => (
                      <FilterChip
                        key={thickness}
                        label={thickness}
                        isSelected={selectedThickness.includes(thickness)}
                        onClick={() => {
                          setSelectedThickness((prev) =>
                            prev.includes(thickness) ? prev.filter((t) => t !== thickness) : [...prev, thickness],
                          )
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Finish */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Finish</h3>
                  <div className="flex flex-wrap gap-2">
                    {filterOptions.finish.map((finish) => (
                      <FilterChip
                        key={finish}
                        label={finish}
                        isSelected={selectedFinish.includes(finish)}
                        onClick={() => {
                          setSelectedFinish((prev) =>
                            prev.includes(finish) ? prev.filter((f) => f !== finish) : [...prev, finish],
                          )
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Brand */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Brand</h3>
                  <div className="flex flex-wrap gap-2">
                    {filterOptions.brands.map((brand) => (
                      <FilterChip
                        key={brand}
                        label={brand}
                        isSelected={selectedBrands.includes(brand)}
                        onClick={() => {
                          setSelectedBrands((prev) =>
                            prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand],
                          )
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm text-gray-600">Active filters:</span>
              {selectedThickness.map((thickness) => (
                <Badge key={thickness} variant="secondary" className="bg-gray-100 text-gray-700">
                  {thickness}
                  <button
                    onClick={() => setSelectedThickness((prev) => prev.filter((t) => t !== thickness))}
                    className="ml-2 hover:text-gray-900"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              {selectedFinish.map((finish) => (
                <Badge key={finish} variant="secondary" className="bg-gray-100 text-gray-700">
                  {finish}
                  <button
                    onClick={() => setSelectedFinish((prev) => prev.filter((f) => f !== finish))}
                    className="ml-2 hover:text-gray-900"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              {selectedBrands.map((brand) => (
                <Badge key={brand} variant="secondary" className="bg-gray-100 text-gray-700">
                  {brand}
                  <button
                    onClick={() => setSelectedBrands((prev) => prev.filter((b) => b !== brand))}
                    className="ml-2 hover:text-gray-900"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              {(priceRange[0] > 0 || priceRange[1] < 800) && (
                <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                  {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                  <button onClick={() => setPriceRange([0, 800])} className="ml-2 hover:text-gray-900">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-8 mb-20 ">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlist.includes(product.id)}
                onToggleWishlist={() => toggleWishlist(product.id)}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20">
            <div className="mb-6">
              <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Search className="w-6 h-6 text-gray-400" />
              </div>
              <h3 className="text-2xl font-light text-gray-900 mb-2">
                {searchQuery ? `No results for "${searchQuery}"` : "No products match your filters"}
              </h3>
              <p className="text-gray-600 mb-6">
                {searchQuery ? "Try a different search term" : "Try adjusting your filters"}
              </p>
              <Button
                onClick={clearAllFilters}
                variant="outline"
                className="rounded-full border-gray-200 bg-transparent"
              >
                {searchQuery ? "Clear search and filters" : "Clear all filters"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
