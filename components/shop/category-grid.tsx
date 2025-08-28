"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SlidersHorizontal, X } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Product } from "@/dummy-data/type"

export default function ProductsPage({products}: {products: Product[]}) {
  const [sortBy, setSortBy] = useState("featured")
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Price range filter
  const [priceRange, setPriceRange] = useState([0, 10000])
  const [selectedThickness, setSelectedThickness] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [imageLoaded, setImageLoaded] = useState(false)

  const filterOptions = useMemo(() => {
    const allThickness = new Set<string>()
    const allCategories = new Set<string>()
    const allSizes = new Set<string>()

    products.forEach((product) => {
      if (product.thickness) allThickness.add(product.thickness)
      allCategories.add(product.category)
      if (product.sizes) {
        product.sizes.forEach((size) => allSizes.add(size.name))
      }
    })

    return {
      thickness: Array.from(allThickness).sort(),
      categories: Array.from(allCategories).sort(),
      sizes: Array.from(allSizes).sort(),
    }
  }, [])

  const filteredProducts = useMemo(() => {
    let filtered = products

    // Price filter
    filtered = filtered.filter((product) => {
      const productPrice = typeof product.price === "number" ? product.price : 0
      return productPrice >= priceRange[0] && productPrice <= priceRange[1]
    })

    // Thickness filter
    if (selectedThickness.length > 0) {
      filtered = filtered.filter((product) => product.thickness && selectedThickness.includes(product.thickness))
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) => selectedCategories.includes(product.category))
    }

    // Size filter
    if (selectedSizes.length > 0) {
      filtered = filtered.filter(
        (product) => product.sizes && product.sizes.some((size) => selectedSizes.includes(size.name)),
      )
    }

    // Sort
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          const priceA = typeof a.price === "number" ? a.price : 0
          const priceB = typeof b.price === "number" ? b.price : 0
          return priceA - priceB
        case "price-high":
          const priceA2 = typeof a.price === "number" ? a.price : 0
          const priceB2 = typeof b.price === "number" ? b.price : 0
          return priceB2 - priceA2
        case "name":
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })
  }, [priceRange, selectedThickness, selectedCategories, selectedSizes, sortBy])

  const hasActiveFilters =
    priceRange[0] > 0 ||
    priceRange[1] < 10000 ||
    selectedThickness.length > 0 ||
    selectedCategories.length > 0 ||
    selectedSizes.length > 0

  const clearAllFilters = () => {
    setPriceRange([0, 10000])
    setSelectedThickness([])
    setSelectedCategories([])
    setSelectedSizes([])
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

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
      <div className="pt-16">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="text-center">
            <h1 className="text-6xl font-light tracking-tight text-gray-900 mb-6">Acrylic Sheets</h1>
            <p className="text-xl text-gray-600 font-light mb-12">Premium clarity. Exceptional strength.</p>
          </div>
        </div>
      </div>

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
                  <Slider value={priceRange} onValueChange={setPriceRange} max={10000} step={100} className="w-full" />
                </div>
                <span className="text-sm text-gray-600 min-w-[120px]">
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
                  <SelectItem value="name">Name (A-Z)</SelectItem>
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

            {/* Size */}
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600 w-20">Size</span>
              <div className="flex flex-wrap gap-2">
                {filterOptions.sizes.slice(0, 8).map((size) => (
                  <FilterChip
                    key={size}
                    label={size}
                    isSelected={selectedSizes.includes(size)}
                    onClick={() => {
                      setSelectedSizes((prev) =>
                        prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
                      )
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Category */}
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600 w-20">Category</span>
              <div className="flex flex-wrap gap-2">
                {filterOptions.categories.map((category) => (
                  <FilterChip
                    key={category}
                    label={category}
                    isSelected={selectedCategories.includes(category)}
                    onClick={() => {
                      setSelectedCategories((prev) =>
                        prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
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
              <SelectItem value="name">Name (A-Z)</SelectItem>
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
                    max={10000}
                    step={100}
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

                {/* Size */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {filterOptions.sizes.map((size) => (
                      <FilterChip
                        key={size}
                        label={size}
                        isSelected={selectedSizes.includes(size)}
                        onClick={() => {
                          setSelectedSizes((prev) =>
                            prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
                          )
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Category */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Category</h3>
                  <div className="flex flex-wrap gap-2">
                    {filterOptions.categories.map((category) => (
                      <FilterChip
                        key={category}
                        label={category}
                        isSelected={selectedCategories.includes(category)}
                        onClick={() => {
                          setSelectedCategories((prev) =>
                            prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
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
          <div className="mb-8 px-6 md:px-0">
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
              {selectedSizes.map((size) => (
                <Badge key={size} variant="secondary" className="bg-gray-100 text-gray-700">
                  {size}
                  <button
                    onClick={() => setSelectedSizes((prev) => prev.filter((s) => s !== size))}
                    className="ml-2 hover:text-gray-900"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              {selectedCategories.map((category) => (
                <Badge key={category} variant="secondary" className="bg-gray-100 text-gray-700">
                  {category}
                  <button
                    onClick={() => setSelectedCategories((prev) => prev.filter((c) => c !== category))}
                    className="ml-2 hover:text-gray-900"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              {(priceRange[0] > 0 || priceRange[1] < 10000) && (
                <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                  {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                  <button onClick={() => setPriceRange([0, 10000])} className="ml-2 hover:text-gray-900">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 md:gap-6 lg:grid-cols-4 mb-20 px-0 md:px-0">
            {filteredProducts.map((product: Product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="group block bg-white md:rounded-lg border hover:shadow-lg transition-shadow duration-200"
              >
                <div className="aspect-square relative overflow-hidden md:rounded-t-lg bg-gray-100">
          
                  <Image
                              src={product.images[0] || "/placeholder.svg?height=300&width=300&query=acrylic sheet"}
                              alt={product.name}
                              fill
                              className={`object-cover transition-all duration-700 ease-out ${
                                imageLoaded ? "opacity-100" : "opacity-0"
                              } group-hover:scale-[1.02]`}
                              onLoad={() => setImageLoaded(true)}
                              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                            />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                      {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{product.description}</p>

                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20">
            <div className="mb-6">
              <h3 className="text-2xl font-light text-gray-900 mb-2">No products match your filters</h3>
              <p className="text-gray-600 mb-6">Try adjusting your filters</p>
              <Button
                onClick={clearAllFilters}
                variant="outline"
                className="rounded-full border-gray-200 bg-transparent"
              >
                Clear all filters
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
