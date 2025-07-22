"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, Star, ChevronLeft, ChevronRight, Plus, Minus } from "lucide-react"

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
        <div className="mx-auto max-w-6xl px-6 py-16">
          {/* Product Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-light tracking-tight text-gray-900 mb-4">{product.name}</h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">{product.tagline}</p>
          </div>

          {/* Product Image */}
          <div className="relative mb-20">
            <div className="relative aspect-[4/3] max-w-4xl mx-auto">
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
                    onClick={() => setSelectedImage(selectedImage > 0 ? selectedImage - 1 : product.images.length - 1)}
                    className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all"
                  >
                    <ChevronLeft className="h-5 w-5 text-white" />
                  </button>
                  <button
                    onClick={() => setSelectedImage(selectedImage < product.images.length - 1 ? selectedImage + 1 : 0)}
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
          </div>

          {/* Product Details */}
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 mb-20">
              {/* Left Column */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-light mb-4">From ₹{currentPrice}</h2>
                  <p className="text-lg text-gray-600 leading-relaxed">{product.description}</p>
                </div>

                {/* Features */}
                <div className="space-y-4">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - Purchase Options */}
              <div className="space-y-8">
                {/* Size Selection */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Size</h3>
                  <div className="space-y-3">
                    {sizeOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setSelectedSize(option.value)}
                        className={`w-full p-4 rounded-2xl border-2 text-left transition-all ${
                          selectedSize === option.value
                            ? "border-black bg-gray-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{option.label}</span>
                          {option.price && <span className="text-gray-600">₹{option.price}</span>}
                        </div>
                      </button>
                    ))}
                  </div>
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

                {/* Delivery Info */}
                <div className="text-sm text-gray-600 space-y-2">
                  <p>Free delivery on orders over $200</p>
                  <p>Ships within 5-7 business days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications Section */}
      <div className="bg-gray-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
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
      <div className="py-20">
        <div className="mx-auto max-w-6xl px-6">
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
      </div>

      {/* Reviews Section */}
      <div className="bg-gray-50 py-20">
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
      </div>

      {/* Related Products */}
      <div className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-4">You might also like</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Frosted Acrylic", price: 79.99 },
              { name: "Black Acrylic", price: 89.99 },
              { name: "Blue Tinted", price: 94.99 },
              { name: "White Acrylic", price: 84.99 },
            ].map((item, index) => (
              <Link key={index} href={`/product/${index + 2}`} className="group">
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-gray-100">
                  <Image
                    src={`/placeholder.svg?height=300&width=300&text=${item.name}`}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-medium mb-1">{item.name}</h3>
                <p className="text-gray-600">From ${item.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}
