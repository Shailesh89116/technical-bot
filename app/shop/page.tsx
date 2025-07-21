/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"
import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import {
  Search,
  ArrowUpDown,
  Filter,
} from "lucide-react"
import ProductCard from "@/components/shop/product-card"
import { allProducts } from "@/dummy-data/allProducts"
import { filterOptions } from "@/dummy-data/filterOptions"

function CategoryPageContent() {
  const searchParams = useSearchParams()
  const category = searchParams.get("category") || "sanitary"

  const [sortBy, setSortBy] = useState("featured")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Filter states
  const [priceRange, setPriceRange] = useState([0, 800])
  const [selectedThickness, setSelectedThickness] = useState<string[]>([])
  const [selectedFinish, setSelectedFinish] = useState<string[]>([])
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])

  // Temporary filter states for mobile apply functionality
  const [tempPriceRange, setTempPriceRange] = useState([0, 800])
  const [tempSelectedThickness, setTempSelectedThickness] = useState<string[]>([])
  const [tempSelectedFinish, setTempSelectedFinish] = useState<string[]>([])
  const [tempSelectedFeatures, setTempSelectedFeatures] = useState<string[]>([])
  const [tempSelectedBrands, setTempSelectedBrands] = useState<string[]>([])

  const [wishlist, setWishlist] = useState<number[]>([])
  const [cart, setCart] = useState<{ [key: string]: any }>({})
  const [hasFilterChanges, setHasFilterChanges] = useState(false)

  const products = allProducts[category as keyof typeof allProducts] || []
  const currentFilterOptions = filterOptions[category as keyof typeof filterOptions] || filterOptions.sanitary

  // Reset filters when category changes
  useEffect(() => {
    setPriceRange([0, 800])
    setSelectedThickness([])
    setSelectedFinish([])
    setSelectedFeatures([])
    setSelectedBrands([])
    setTempPriceRange([0, 800])
    setTempSelectedThickness([])
    setTempSelectedFinish([])
    setTempSelectedFeatures([])
    setTempSelectedBrands([])
    setSearchQuery("")
  }, [category])

  // Check if there are filter changes
  useEffect(() => {
    const hasChanges =
      JSON.stringify(tempPriceRange) !== JSON.stringify(priceRange) ||
      JSON.stringify(tempSelectedThickness) !== JSON.stringify(selectedThickness) ||
      JSON.stringify(tempSelectedFinish) !== JSON.stringify(selectedFinish) ||
      JSON.stringify(tempSelectedFeatures) !== JSON.stringify(selectedFeatures) ||
      JSON.stringify(tempSelectedBrands) !== JSON.stringify(selectedBrands)

    setHasFilterChanges(hasChanges)
  }, [
    tempPriceRange,
    tempSelectedThickness,
    tempSelectedFinish,
    tempSelectedFeatures,
    tempSelectedBrands,
    priceRange,
    selectedThickness,
    selectedFinish,
    selectedFeatures,
    selectedBrands,
  ])

  // Initialize temp filters when opening mobile filter
  useEffect(() => {
    if (isFilterOpen) {
      setTempPriceRange([...priceRange])
      setTempSelectedThickness([...selectedThickness])
      setTempSelectedFinish([...selectedFinish])
      setTempSelectedFeatures([...selectedFeatures])
      setTempSelectedBrands([...selectedBrands])
    }
  }, [isFilterOpen, priceRange, selectedThickness, selectedFinish, selectedFeatures, selectedBrands])

  // Apply filters
  const applyFilters = () => {
    setPriceRange([...tempPriceRange])
    setSelectedThickness([...tempSelectedThickness])
    setSelectedFinish([...tempSelectedFinish])
    setSelectedFeatures([...tempSelectedFeatures])
    setSelectedBrands([...tempSelectedBrands])
    setIsFilterOpen(false)
  }

  // Reset temp filters
  const resetTempFilters = () => {
    setTempPriceRange([0, 800])
    setTempSelectedThickness([])
    setTempSelectedFinish([])
    setTempSelectedFeatures([])
    setTempSelectedBrands([])
  }

  // Filter products based on selected filters and search
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
    const matchesThickness = selectedThickness.length === 0 || selectedThickness.includes(product.thickness)
    const matchesFinish = selectedFinish.length === 0 || selectedFinish.includes(product.finish)
    const matchesBrands = selectedBrands.length === 0 || selectedBrands.includes(product.brand)

    return matchesSearch && matchesPrice && matchesThickness && matchesFinish && matchesBrands
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
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

  const toggleWishlist = (productId: number) => {
    setWishlist((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const updateCart = (cartKey: string, cartData: any) => {
    setCart((prev) => ({
      ...prev,
      [cartKey]: cartData,
    }))
  }


  const getCartQuantity = (productId: number) => {
    const cartItems = Object.values(cart).filter((item: any) => item.product.id === productId)
    return cartItems.reduce((total: number, item: any) => total + item.quantity, 0)
  }

  const activeFiltersCount =
    selectedThickness.length +
    selectedFinish.length +
    selectedFeatures.length +
    selectedBrands.length +
    (priceRange[0] > 0 || priceRange[1] < 800 ? 1 : 0)

  const clearAllFilters = () => {
    setPriceRange([0, 800])
    setSelectedThickness([])
    setSelectedFinish([])
    setSelectedFeatures([])
    setSelectedBrands([])
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  const FilterSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="space-y-3 py-3">
      <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">{title}</h3>
      {children}
    </div>
  )

  const DesktopFilterContent = () => (
    <div className="space-y-4">
      {/* Price Range */}
      <FilterSection title="Price">
        <div className="space-y-4">
          <Slider value={priceRange} onValueChange={setPriceRange} max={800} step={5} className="w-full" />
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>{formatPrice(priceRange[0])}</span>
            <span>{formatPrice(priceRange[1])}</span>
          </div>
        </div>
      </FilterSection>

      <Separator />

      {/* Brand Filter */}
      <FilterSection title="Brand">
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {currentFilterOptions.brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={`brand-${brand}`}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedBrands([...selectedBrands, brand])
                  } else {
                    setSelectedBrands(selectedBrands.filter((b) => b !== brand))
                  }
                }}
                className="h-4 w-4"
              />
              <Label htmlFor={`brand-${brand}`} className="text-sm text-gray-700 cursor-pointer">
                {brand}
              </Label>
            </div>
          ))}
        </div>
      </FilterSection>

      <Separator />

      {/* Thickness Filter */}
      <FilterSection title="Thickness">
        <div className="space-y-2">
          {currentFilterOptions.thickness.map((thickness) => (
            <div key={thickness} className="flex items-center space-x-2">
              <Checkbox
                id={`thickness-${thickness}`}
                checked={selectedThickness.includes(thickness)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedThickness([...selectedThickness, thickness])
                  } else {
                    setSelectedThickness(selectedThickness.filter((t) => t !== thickness))
                  }
                }}
                className="h-4 w-4"
              />
              <Label htmlFor={`thickness-${thickness}`} className="text-sm text-gray-700 cursor-pointer">
                {thickness}
              </Label>
            </div>
          ))}
        </div>
      </FilterSection>

      <Separator />

      {/* Finish Filter */}
      <FilterSection title="Finish">
        <div className="space-y-2">
          {currentFilterOptions.finish.map((finish) => (
            <div key={finish} className="flex items-center space-x-2">
              <Checkbox
                id={`finish-${finish}`}
                checked={selectedFinish.includes(finish)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedFinish([...selectedFinish, finish])
                  } else {
                    setSelectedFinish(selectedFinish.filter((f) => f !== finish))
                  }
                }}
                className="h-4 w-4"
              />
              <Label htmlFor={`finish-${finish}`} className="text-sm text-gray-700 cursor-pointer">
                {finish}
              </Label>
            </div>
          ))}
        </div>
      </FilterSection>

      <Separator />

      {/* Features Filter */}
      <FilterSection title="Features">
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {currentFilterOptions.features.map((feature) => (
            <div key={feature} className="flex items-center space-x-2">
              <Checkbox
                id={`feature-${feature}`}
                checked={selectedFeatures.includes(feature)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedFeatures([...selectedFeatures, feature])
                  } else {
                    setSelectedFeatures(selectedFeatures.filter((f) => f !== feature))
                  }
                }}
                className="h-4 w-4"
              />
              <Label htmlFor={`feature-${feature}`} className="text-sm text-gray-700 cursor-pointer">
                {feature}
              </Label>
            </div>
          ))}
        </div>
      </FilterSection>
    </div>
  )

  const MobileFilterContent = () => (
    <div className="space-y-4">
      {/* Price Range */}
      <FilterSection title="Price">
        <div className="space-y-4">
          <Slider value={tempPriceRange} onValueChange={setTempPriceRange} max={800} step={5} className="w-full" />
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>{formatPrice(tempPriceRange[0])}</span>
            <span>{formatPrice(tempPriceRange[1])}</span>
          </div>
        </div>
      </FilterSection>

      <Separator />

      {/* Brand Filter */}
      <FilterSection title="Brand">
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {currentFilterOptions.brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={`temp-brand-${brand}`}
                checked={tempSelectedBrands.includes(brand)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setTempSelectedBrands([...tempSelectedBrands, brand])
                  } else {
                    setTempSelectedBrands(tempSelectedBrands.filter((b) => b !== brand))
                  }
                }}
                className="h-4 w-4"
              />
              <Label htmlFor={`temp-brand-${brand}`} className="text-sm text-gray-700 cursor-pointer">
                {brand}
              </Label>
            </div>
          ))}
        </div>
      </FilterSection>

      <Separator />

      {/* Thickness Filter */}
      <FilterSection title="Thickness">
        <div className="space-y-2">
          {currentFilterOptions.thickness.map((thickness) => (
            <div key={thickness} className="flex items-center space-x-2">
              <Checkbox
                id={`temp-thickness-${thickness}`}
                checked={tempSelectedThickness.includes(thickness)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setTempSelectedThickness([...tempSelectedThickness, thickness])
                  } else {
                    setTempSelectedThickness(tempSelectedThickness.filter((t) => t !== thickness))
                  }
                }}
                className="h-4 w-4"
              />
              <Label htmlFor={`temp-thickness-${thickness}`} className="text-sm text-gray-700 cursor-pointer">
                {thickness}
              </Label>
            </div>
          ))}
        </div>
      </FilterSection>

      <Separator />

      {/* Finish Filter */}
      <FilterSection title="Finish">
        <div className="space-y-2">
          {currentFilterOptions.finish.map((finish) => (
            <div key={finish} className="flex items-center space-x-2">
              <Checkbox
                id={`temp-finish-${finish}`}
                checked={tempSelectedFinish.includes(finish)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setTempSelectedFinish([...tempSelectedFinish, finish])
                  } else {
                    setTempSelectedFinish(tempSelectedFinish.filter((f) => f !== finish))
                  }
                }}
                className="h-4 w-4"
              />
              <Label htmlFor={`temp-finish-${finish}`} className="text-sm text-gray-700 cursor-pointer">
                {finish}
              </Label>
            </div>
          ))}
        </div>
      </FilterSection>

      <Separator />

      {/* Features Filter */}
      <FilterSection title="Features">
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {currentFilterOptions.features.map((feature) => (
            <div key={feature} className="flex items-center space-x-2">
              <Checkbox
                id={`temp-feature-${feature}`}
                checked={tempSelectedFeatures.includes(feature)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setTempSelectedFeatures([...tempSelectedFeatures, feature])
                  } else {
                    setTempSelectedFeatures(tempSelectedFeatures.filter((f) => f !== feature))
                  }
                }}
                className="h-4 w-4"
              />
              <Label htmlFor={`temp-feature-${feature}`} className="text-sm text-gray-700 cursor-pointer">
                {feature}
              </Label>
            </div>
          ))}
        </div>
      </FilterSection>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 pt-16 sm:pt-20 lg:pt-24">
      {/* Header with breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900">
              Home
            </Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-gray-900">
              Shop
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium capitalize">{category.replace("-", " ")}</span>
          </div>
          <div className="mt-2">
            <h1 className="text-2xl font-bold text-gray-900 capitalize">
              {category.replace("-", " ")} - <span className="text-gray-600">{sortedProducts.length} items</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto md:px-4 sm:px-6 lg:px-8 md:py-6 px-0 py-0">
        <div className="flex gap-6">
          {/* Desktop Sidebar Filters - Myntra Style */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg border border-gray-200 p-4 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">FILTERS</h2>
                {activeFiltersCount > 0 && (
                  <Button
                    variant="ghost"
                    onClick={clearAllFilters}
                    className="h-auto p-0 text-sm text-gray-500 hover:text-gray-700"
                  >
                    Clear ({activeFiltersCount})
                  </Button>
                )}
              </div>
              <DesktopFilterContent />
            </div>
          </div>

          {/* Main Product Area */}
          <div className="flex-1">
            {/* Sort Controls - Desktop */}
            <div className="hidden sm:flex items-center justify-between mb-6 bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-sm text-gray-600">
                Showing {sortedProducts.length} of {products.length} products
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">Sort by:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48 border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Popularity</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Customer Rating</SelectItem>
                    <SelectItem value="newest">What's New</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Products Grid - Myntra Style */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-0 md:gap-4">
              {sortedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isWishlisted={wishlist.includes(product.id)}
                  onToggleWishlist={() => toggleWishlist(product.id)}
                  cartQuantity={getCartQuantity(product.id)}
                  onUpdateCart={updateCart}
                />
              ))}
            </div>

            {sortedProducts.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <div className="mx-auto mb-4 h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="mb-2 text-lg font-medium text-gray-900">No products found</h3>
                <p className="mb-4 text-gray-600">Try adjusting your search or filter criteria</p>
                <Button onClick={clearAllFilters} variant="outline" className="rounded-lg bg-transparent">
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Bar - Myntra Style */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40">
        <div className="flex items-center space-x-4">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="flex-1 border-gray-300">
              <ArrowUpDown className="h-4 w-4 mr-2" />
              <SelectValue placeholder="SORT" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Popularity</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Customer Rating</SelectItem>
              <SelectItem value="newest">What's New</SelectItem>
            </SelectContent>
          </Select>

          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex-1 border-gray-300 bg-transparent">
                <Filter className="h-4 w-4 mr-2" />
                FILTER
                {activeFiltersCount > 0 && (
                  <Badge className="ml-2 h-5 w-5 rounded-full bg-red-500 p-0 text-xs text-white">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] flex flex-col p-0">
              <SheetHeader className="border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                  <SheetTitle className="text-lg font-semibold">FILTERS</SheetTitle>
                  <Button
                    variant="ghost"
                    onClick={resetTempFilters}
                    className="h-auto p-0 text-sm text-gray-500 hover:text-gray-700"
                  >
                    Clear All
                  </Button>
                </div>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto px-6 py-4">
                <MobileFilterContent />
              </div>

              {hasFilterChanges && (
                <div className="border-t border-gray-200 bg-white px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <Button variant="outline" onClick={() => setIsFilterOpen(false)} className="flex-1">
                      Cancel
                    </Button>
                    <Button onClick={applyFilters} className="flex-1 bg-red-500 text-white hover:bg-red-600">
                      Apply
                    </Button>
                  </div>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  )
}




export default function CategoryPage() {
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
      <CategoryPageContent />
    </Suspense>
  )
}
