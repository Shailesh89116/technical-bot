"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Star, Truck } from "lucide-react"

export function ProductGrid() {
  const [sortBy, setSortBy] = useState("featured")

  const products = [
    {
      id: 1,
      name: "Clear Acrylic Sheet",
      brand: "Nature Light",
      thickness: "2mm",
      image: "/placeholder.svg?height=600&width=600",
      specs: "2mm thickness • 4'×8'",
      price: 49.99,
      originalPrice: 59.99,
      discount: 17,
      badge: "Deal of the Day",
      rating: 4.0,
      reviews: 82,
      delivery: "Delivery by May 26",
      isWishlisted: false,
    },
    {
      id: 2,
      name: "Frosted Acrylic Sheet",
      brand: "ClearVision",
      thickness: "3mm",
      image: "/placeholder.svg?height=600&width=600",
      specs: "3mm thickness • 4'×8'",
      price: 69.99,
      originalPrice: 89.99,
      discount: 22,
      badge: null,
      rating: 4.2,
      reviews: 25,
      delivery: "Get it by Tomorrow",
      isWishlisted: false,
    },
    {
      id: 3,
      name: "Black Acrylic Sheet",
      brand: "ProSheet",
      thickness: "5mm",
      image: "/placeholder.svg?height=600&width=600",
      specs: "5mm thickness • 4'×8'",
      price: 89.99,
      originalPrice: 119.99,
      discount: 25,
      badge: null,
      rating: 4.1,
      reviews: 156,
      delivery: "Delivery by May 26",
      isWishlisted: true,
    },
    {
      id: 4,
      name: "Blue Tinted Acrylic",
      brand: "ColorMax",
      thickness: "3mm",
      image: "/placeholder.svg?height=600&width=600",
      specs: "3mm thickness • 4'×8'",
      price: 79.99,
      originalPrice: 99.99,
      discount: 20,
      badge: null,
      rating: 3.6,
      reviews: 67,
      delivery: "2 Day Delivery",
      isWishlisted: false,
    },
    {
      id: 5,
      name: "White Acrylic Sheet",
      brand: "PureLite",
      thickness: "5mm",
      image: "/placeholder.svg?height=600&width=600",
      specs: "5mm thickness • 5'×10'",
      price: 129.99,
      originalPrice: 159.99,
      discount: 19,
      badge: null,
      rating: 4.3,
      reviews: 92,
      delivery: "Express Delivery",
      isWishlisted: false,
    },
    {
      id: 6,
      name: "Red Tinted Acrylic",
      brand: "VividSheets",
      thickness: "3mm",
      image: "/placeholder.svg?height=600&width=600",
      specs: "3mm thickness • 4'×8'",
      price: 74.99,
      originalPrice: 94.99,
      discount: 21,
      badge: "Limited Time",
      rating: 4.0,
      reviews: 43,
      delivery: "Get it by Tomorrow",
      isWishlisted: false,
    },
  ]

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        <Star className="h-3 w-3 fill-green-500 text-green-500" />
        <span className="text-xs font-medium text-gray-700">{rating}</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header - Desktop Only */}
      <div className="hidden sm:flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-600">
            Showing <span className="font-medium">{products.length}</span> products
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-700">Sort by</span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px] rounded-full border-gray-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Mobile Product Grid - 2 Columns */}
      <div className="grid grid-cols-2 gap-3 sm:hidden">
        {products.map((product) => (
          <div key={product.id} className="group relative">
            <div className="overflow-hidden rounded-lg bg-white shadow-sm border border-gray-100">
              {/* Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
                {/* Badge */}
                {product.badge && (
                  <div className="absolute left-2 top-2 z-10 rounded px-2 py-1 text-[10px] font-medium bg-pink-500 text-white">
                    {product.badge}
                  </div>
                )}

                {/* Wishlist Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className={`absolute right-2 top-2 z-10 h-7 w-7 rounded-full bg-white/80 backdrop-blur-sm ${
                    product.isWishlisted ? "text-red-500" : "text-gray-600"
                  }`}
                >
                  <Heart className={`h-3.5 w-3.5 ${product.isWishlisted ? "fill-current" : ""}`} />
                </Button>

                {/* Rating Overlay */}
                <div className="absolute bottom-2 left-2 z-10 flex items-center gap-1 rounded bg-white/90 px-2 py-1 backdrop-blur-sm">
                  {renderStars(product.rating)}
                  <span className="text-[10px] text-gray-600">{product.reviews}</span>
                </div>

                {/* Product Image */}
                <Link href={`/product/${product.id}`} className="block h-full">
                  <Image src={"/img-1.png"} alt={product.name} fill className="object-cover" />
                </Link>
              </div>

              {/* Product Info */}
              <div className="p-3 space-y-1">
                {/* Brand */}
                <p className="text-xs font-medium text-gray-900 uppercase tracking-wide">{product.brand}</p>

                {/* Product Name */}
                <Link href={`/product/${product.id}`}>
                  <h3 className="text-sm text-gray-700 line-clamp-2 leading-tight">{product.name}</h3>
                </Link>

                {/* Price Section */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
                    <span className="text-sm font-bold text-gray-900">{formatPrice(product.price)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded">
                      {product.discount}% OFF!
                    </span>
                  </div>
                </div>

                {/* Delivery Info */}
                <div className="flex items-center gap-1 pt-1">
                  <Truck className="h-3 w-3 text-gray-400" />
                  <span className="text-[10px] text-gray-600">{product.delivery}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Product Grid - 3 Columns */}
      <div className="hidden sm:grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div key={product.id} className="group relative">
            <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-gray-100 transition-all duration-500 hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1">
              {/* Image Container */}
              <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                {/* Badge */}
                {product.badge && (
                  <div className="absolute left-4 top-4 z-10 rounded-full px-3 py-1.5 text-xs font-medium backdrop-blur-sm bg-pink-500/90 text-white">
                    {product.badge}
                  </div>
                )}

                {/* Wishlist Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className={`absolute right-4 top-4 z-10 h-9 w-9 rounded-full bg-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-white hover:scale-110 ${
                    product.isWishlisted ? "text-red-500" : "text-gray-700"
                  }`}
                >
                  <Heart className={`h-4 w-4 ${product.isWishlisted ? "fill-current" : ""}`} />
                </Button>

                {/* Product Image */}
                <Link href={`/product/${product.id}`} className="block h-full">
                  <Image
                    src={"/img-1.png"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </Link>
              </div>

              {/* Product Info */}
              <div className="p-6 space-y-3">
                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">{renderStars(product.rating)}</div>
                  <span className="text-xs text-gray-500">({product.reviews})</span>
                </div>

                {/* Brand & Product Name */}
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{product.brand}</p>
                  <Link href={`/product/${product.id}`}>
                    <h3 className="font-medium text-gray-900 transition-colors hover:text-gray-600 line-clamp-1">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-500 mt-1">{product.specs}</p>
                </div>

                {/* Price */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
                    <span className="text-xl font-semibold text-gray-900">{formatPrice(product.price)}</span>
                  </div>
                  <span className="inline-block text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded">
                    {product.discount}% OFF!
                  </span>
                </div>

                {/* Delivery */}
                <div className="flex items-center gap-1">
                  <Truck className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{product.delivery}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center pt-8">
        <Button variant="outline" size="lg" className="rounded-full border-gray-300 px-8 hover:bg-gray-50">
          Load More Products
        </Button>
      </div>
    </div>
  )
}
