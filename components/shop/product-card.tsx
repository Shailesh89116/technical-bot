"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart } from "lucide-react"

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  brand: string
  inStock?: boolean
}

interface ProductCardProps {
  product: Product
  isWishlisted: boolean
  onToggleWishlist: () => void
}

export default function ProductCard({ product, isWishlisted, onToggleWishlist }: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Apple's approach: One clear action, perfect execution
  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onToggleWishlist()
  }

  return (
    <div ref={cardRef} className="group cursor-pointer">
      <Link href={`/product/${product.id}`}>
        {/* The Product is the Hero - Nothing Else Matters */}
        <div className="relative aspect-square mb-4 overflow-hidden md:rounded-[28px] bg-gray-50">
          <Image
            src={product.image || "/placeholder.svg?height=400&width=400"}
            alt={product.name}
            fill
            className={`object-cover transition-all duration-700 ease-out ${
              imageLoaded ? "opacity-100" : "opacity-0"
            } group-hover:scale-[1.02]`}
            onLoad={() => setImageLoaded(true)}
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />

          

          {/* Single Action: Love or Don't Love */}
          <button
            onClick={handleWishlistClick}
            className={`absolute top-6 right-6 w-9 h-9 rounded-full transition-all duration-300 ${
              isWishlisted
                ? "bg-red-500 text-white scale-110"
                : "bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white hover:scale-105"
            }`}
          >
            <Heart className={`w-4 h-4 mx-auto ${isWishlisted ? "fill-current" : ""}`} />
          </button>

          {/* Stock Status: Clear, Honest, Immediate */}
          {product.inStock === false && (
            <div className="absolute inset-0 bg-black/40 rounded-[28px] flex items-center justify-center">
              <div className="bg-white text-gray-900 font-medium px-6 py-3 rounded-full">Notify when available</div>
            </div>
          )}
        </div>

        {/* Information Architecture: What Matters Most */}
        <div className="space-y-1">
          {/* Brand: Quiet but Present */}
          <div className="text-sm text-gray-500">{product.brand}</div>

          {/* Product Name: The Star */}
          <h3 className="font-medium text-gray-900 leading-snug group-hover:text-gray-600 transition-colors">
            {product.name}
          </h3>

          {/* Price: Clear Value Proposition */}
          <div className="flex items-baseline space-x-2 pt-1">
            <span className="text-lg font-semibold text-gray-900">${product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">${product.originalPrice.toLocaleString()}</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}
