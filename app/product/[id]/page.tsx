"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, ChevronLeft, ChevronRight, Plus, Minus } from "lucide-react"

export default function ProductPage({ params }: { params: { id: string } }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState("4x8")
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

   const product = {
    id: params.id,
    name: "Clear 5mm Acrylic Sheet",
        tagline: "Engineered for perfection.",
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
specs: [
      { label: "Thickness", value: "5mm" },
      { label: "Size", value: "4' × 8'" },
      { label: "Weight", value: "2.4 kg/m²" },
      { label: "Transmission", value: "92%" },
      { label: "Temperature", value: "-40°C to +80°C" },
      { label: "Warranty", value: "10 years" },
    ],
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
    { value: "custom", label: "Custom", price: null },
  ]

  const currentPrice = sizeOptions.find((size) => size.value === selectedSize)?.price || product.price

  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <div className="pt-16">
        <div className="mx-auto max-w-7xl px-6 py-16">
          {/* Product Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-light tracking-tight text-gray-900 mb-4">{product.name}</h1>

            <p className="text-xl text-gray-500 max-w-2xl mx-auto">{product.tagline}</p>
          </div>

          {/* Main Product Section - Desktop: Side by Side, Mobile: Stacked */}
          <div className="grid lg:grid-cols-2 gap-16 mb-20">
            {/* Left Column - Product Image */}
            <div className="relative">
              <div className="relative aspect-square">
                <Image
                  src={product.images[selectedImage] || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover rounded-3xl"
                  priority
                />

                {/* Image Navigation */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setSelectedImage(selectedImage > 0 ? selectedImage - 1 : product.images.length - 1)
                      }
                      className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all"
                    >
                      <ChevronLeft className="h-5 w-5 text-white" />
                    </button>
                    <button
                      onClick={() =>
                        setSelectedImage(selectedImage < product.images.length - 1 ? selectedImage + 1 : 0)
                      }
                      className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all"
                    >
                      <ChevronRight className="h-5 w-5 text-white" />
                    </button>
                  </>
                )}

                {/* Image Dots */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
                  {product.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === selectedImage ? "bg-white" : "bg-white/40"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Thumbnail Images - Desktop Only */}
              <div className="hidden lg:grid grid-cols-4 gap-4 mt-6">
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

            {/* Right Column - Product Details */}
            <div className="space-y-8">
              {/* Product Info */}
              <div>
                <h2 className="text-3xl font-light mb-4">From ₹{currentPrice?.toLocaleString()}/Sheet</h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">{product.description}</p>

                {/* Rating */}
                {/* <div className="flex items-center space-x-4 mb-6">
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
                </div> */}
              </div>

              {/* Features */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Key Features</h3>
                <div className="space-y-3">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <h3 className="text-lg font-medium mb-4">Size</h3>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger className="w-full h-12 rounded-2xl border-gray-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sizeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center justify-between w-full">
                          <span>{option.label}</span>
                          {option.price && <span className="ml-4 text-gray-500">₹{option.price.toLocaleString()}</span>}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Quantity */}
              <div>
                <h3 className="text-lg font-medium mb-4">Quantity</h3>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="text-lg font-medium w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Purchase Buttons */}
              <div className="space-y-4">
                <Button
                  size="lg"
                  className="w-full h-14 rounded-full bg-[#02a89e] hover:bg-[#285754] text-base font-medium"
                >
                  Add to Bag
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full h-14 rounded-full border-gray-300 text-base font-medium hover:bg-gray-50 bg-transparent"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                >
                  <Heart className={`h-4 w-4 mr-2 ${isWishlisted ? "fill-current" : ""}`} />
                  {isWishlisted ? "Added to Wishlist" : "Add to Wishlist"}
                </Button>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Specifications Section */}
      <div className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-4">Technical Specifications</h2>
            <p className="text-xl text-gray-600">Precision engineered for professional applications</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {product.specs.map((spec, index) => (
              <div key={index} className="text-center">
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">{spec.label}</h3>
                  <p className="text-2xl font-light text-gray-900">{spec.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Applications Section */}
      {/* <div className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-4">Endless Possibilities</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From architectural glazing to creative projects, discover what you can create
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Architecture & Design",
                description: "Premium glazing solutions for modern spaces",
                image: "/placeholder.svg?height=400&width=600&text=Architecture",
              },
              {
                title: "Creative Projects",
                description: "Bring your artistic vision to life",
                image: "/placeholder.svg?height=400&width=600&text=Creative",
              },
            ].map((application, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative aspect-[3/2] rounded-3xl overflow-hidden mb-6">
                  <Image
                    src={application.image || "/placeholder.svg"}
                    alt={application.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-2xl font-light mb-2">{application.title}</h3>
                <p className="text-gray-600">{application.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div> */}

      {/* Reviews Section */}
      {/* <div className="bg-gray-50 py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="mb-12">
            <div className="flex justify-center items-center space-x-2 mb-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className={`h-6 w-6 ${
                    index < Math.floor(product.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-gray-200 text-gray-200"
                  }`}
                />
              ))}
            </div>
            <h2 className="text-4xl font-light mb-2">{product.rating} out of 5</h2>
            <p className="text-gray-600">Based on {product.reviews} reviews</p>
          </div>

          <Button variant="outline" className="rounded-full px-8 py-3 bg-transparent">
            Read all reviews
          </Button>
        </div>
      </div> */}

      {/* Related Products */}
      <div className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-4">You might also like</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Frosted Acrylic", price: 79.99,img:"/prod1.png" },
              { name: "Black Acrylic", price: 89.99 ,img:"/prod2.png"},
              { name: "Blue Tinted", price: 94.99 ,img:"/prod3.png"},
              { name: "White Acrylic", price: 84.99 ,img:"/prod4.png"},
            ].map((item, index) => (
              <Link key={index} href={`/product/${index + 2}`} className="group">
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-gray-100">
                  <Image
                    src={`${item.img}`}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-medium mb-1">{item.name}</h3>
                <p className="text-gray-600">From ₹{item.price.toLocaleString()}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
