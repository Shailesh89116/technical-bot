"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Heart, Star, Truck, ShieldCheck, ArrowRight, Download, ChevronLeft, ChevronRight, Check } from "lucide-react"

export default function ProductPage({ params }: { params: { id: string } }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState("4x8")
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const product = {
    id: params.id,
    name: "Clear 5mm Acrylic Sheet",
    subtitle: "Premium clarity meets exceptional durability",
    description:
      "Engineered for perfection with 92% light transmission and UV stabilization. This premium acrylic sheet delivers unmatched clarity and strength for professional applications.",
    price: 89.99,
    originalPrice: 99.99,
    rating: 4.8,
    reviews: 127,
    badge: "Best Seller",
    images: [
      "/img-1.png",
      "/img-2.png",
      "/img-3.png",
      "/heatcut-banner.jpg",
    ],
    features: ["92% light transmission", "17x stronger than glass", "UV stabilized", "Easy to fabricate"],
    specs: {
      thickness: "5mm",
      maxSize: "4' × 8'",
      weight: "2.4 kg/m²",
      impact: "17 times stronger than glass",
      transmission: "92% light transmission",
      uvStability: "UV stabilized for outdoor use",
      temperature: "-40°C to +80°C",
      warranty: "10 years",
    },
    applications: [
      "Architectural glazing",
      "Signage and displays",
      "Protective barriers",
      "Furniture and fixtures",
      "Picture framing",
      "DIY projects",
    ],
    downloads: [
      { name: "Product Brochure", size: "2.4 MB" },
      { name: "Safety Data Sheet", size: "1.2 MB" },
      { name: "Cutting Guide", size: "3.1 MB" },
      { name: "Installation Guide", size: "2.8 MB" },
    ],
  }

  const sizeOptions = [
    { value: "4x8", label: "4' × 8'", price: 89.99 },
    { value: "5x10", label: "5' × 10'", price: 139.99 },
    { value: "custom", label: "Custom Size", price: null },
  ]

  const currentPrice = sizeOptions.find((size) => size.value === selectedSize)?.price || product.price

  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Hero Section */}
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Product Images */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="relative aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100">
              <Image
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                priority
              />

              {/* Navigation Arrows */}
              <button
                onClick={() => setSelectedImage(selectedImage > 0 ? selectedImage - 1 : product.images.length - 1)}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 backdrop-blur-sm transition-all hover:bg-white hover:scale-110"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => setSelectedImage(selectedImage < product.images.length - 1 ? selectedImage + 1 : 0)}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 backdrop-blur-sm transition-all hover:bg-white hover:scale-110"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              {/* Image Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`h-2 w-8 rounded-full transition-all ${
                      index === selectedImage ? "bg-white" : "bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square overflow-hidden rounded-xl border-2 transition-all ${
                    index === selectedImage ? "border-black" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-4">
              {product.badge && <Badge className="bg-black text-white">{product.badge}</Badge>}

              <div>
                <h1 className="text-4xl font-semibold tracking-tight text-gray-900 lg:text-5xl">{product.name}</h1>
                <p className="mt-2 text-xl text-gray-600">{product.subtitle}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={`h-4 w-4 ${
                        index < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : index < product.rating
                            ? "fill-yellow-400/50 text-yellow-400"
                            : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-semibold text-gray-900">${currentPrice?.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-lg leading-relaxed text-gray-700">{product.description}</p>

            {/* Key Features */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-gray-900">Key Features</h3>
              <div className="grid grid-cols-2 gap-3">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Options */}
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-900">Size</label>
                  <Select value={selectedSize} onValueChange={setSelectedSize}>
                    <SelectTrigger className="mt-2 rounded-xl border-gray-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {sizeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center justify-between w-full">
                            <span>{option.label}</span>
                            {option.price && <span className="ml-4 text-gray-500">${option.price.toFixed(2)}</span>}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-900">Quantity</label>
                  <Select value={quantity.toString()} onValueChange={(value) => setQuantity(Number.parseInt(value))}>
                    <SelectTrigger className="mt-2 rounded-xl border-gray-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <Button size="lg" className="flex-1 rounded-full bg-black py-6 text-base hover:bg-gray-800">
                  Add to Cart
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`rounded-full border-gray-200 px-6 ${isWishlisted ? "bg-red-50 text-red-600" : ""}`}
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
                </Button>
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-4 rounded-2xl bg-gray-50 p-6">
              <div className="flex items-start space-x-3">
                <Truck className="mt-0.5 h-5 w-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">Free Shipping</p>
                  <p className="text-sm text-gray-600">On orders over $200. Delivery in 5-7 business days.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">Quality Guarantee</p>
                  <p className="text-sm text-gray-600">30-day money-back guarantee with 10-year warranty.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
        <Tabs defaultValue="specifications" className="w-full">
          <TabsList className="grid w-full grid-cols-4 rounded-2xl bg-gray-100 p-1">
            <TabsTrigger value="specifications" className="rounded-xl">
              Specifications
            </TabsTrigger>
            <TabsTrigger value="applications" className="rounded-xl">
              Applications
            </TabsTrigger>
            <TabsTrigger value="downloads" className="rounded-xl">
              Downloads
            </TabsTrigger>
            <TabsTrigger value="reviews" className="rounded-xl">
              Reviews
            </TabsTrigger>
          </TabsList>

          <TabsContent value="specifications" className="mt-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="rounded-2xl border border-gray-200 bg-white p-6">
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                    {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                  </p>
                  <p className="mt-2 text-lg font-semibold text-gray-900">{value}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="applications" className="mt-8">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {product.applications.map((application, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 rounded-2xl border border-gray-200 bg-white p-6"
                >
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                  <p className="font-medium text-gray-900">{application}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="downloads" className="mt-8">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {product.downloads.map((download, index) => (
                <Button key={index} variant="outline" className="h-auto justify-start rounded-2xl border-gray-200 p-6">
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-gray-100 p-2">
                      <Download className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-900">{download.name}</p>
                      <p className="text-sm text-gray-500">{download.size}</p>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-8">
            <div className="space-y-8">
              {/* Review Summary */}
              <div className="grid gap-8 md:grid-cols-2">
                <div className="text-center">
                  <p className="text-5xl font-bold text-gray-900">{product.rating}</p>
                  <div className="mt-2 flex justify-center">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        className={`h-5 w-5 ${
                          index < Math.floor(product.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : index < product.rating
                              ? "fill-yellow-400/50 text-yellow-400"
                              : "fill-gray-200 text-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="mt-2 text-gray-600">{product.reviews} reviews</p>
                </div>

                <div className="space-y-3">
                  {[5, 4, 3, 2, 1].map((rating) => {
                    const percentage = rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 5 : rating === 2 ? 3 : 2
                    return (
                      <div key={rating} className="flex items-center space-x-3">
                        <span className="text-sm font-medium text-gray-700">{rating}</span>
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <div className="h-2 flex-1 rounded-full bg-gray-200">
                          <div className="h-2 rounded-full bg-yellow-400" style={{ width: `${percentage}%` }} />
                        </div>
                        <span className="text-sm text-gray-500">{percentage}%</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              <Button className="rounded-full bg-black px-8 hover:bg-gray-800">Write a Review</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      <div className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-gray-900">You might also like</h2>
            <p className="mt-2 text-lg text-gray-600">Explore our complete range of premium acrylic sheets</p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Link
                key={index}
                href={`/product/${index + 2}`}
                className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <Image
                    src="/placeholder.svg?height=300&width=300"
                    alt="Related Product"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-medium text-gray-900">
                    {
                      ["Frosted Acrylic Sheet", "Black Acrylic Sheet", "Blue Tinted Acrylic", "White Acrylic Sheet"][
                        index
                      ]
                    }
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">3mm thickness</p>
                  <p className="mt-2 font-semibold text-gray-900">${[79.99, 89.99, 94.99, 84.99][index]}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
