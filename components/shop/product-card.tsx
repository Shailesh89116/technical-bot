/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "../ui/button";
import { Eye, Heart } from "lucide-react";
import { Badge } from "../ui/badge";
import Link from "next/link";
import Image from "next/image";

export default function ProductCard({
  product,
  isWishlisted,
  onToggleWishlist,
  onUpdateCart,
}: {
  product: any;
  isWishlisted: boolean;
  onToggleWishlist: () => void;
  cartQuantity: number;
  onUpdateCart: (cartKey: string, cartData: any) => void;
}) {
  const handleAddToCartClick = () => {
    // Example: use product.id as cartKey and product as cartData
    onUpdateCart(product.id?.toString() ?? "", product);
  };

  return (
    <>
      <div className="group relative overflow-hidden bg-white shadow-sm ring-1 ring-gray-100 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 sm:rounded-3xl">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
          {/* Action Buttons */}
          <div className="absolute right-3 top-3 z-10 flex flex-col gap-2 sm:right-4 sm:top-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleWishlist}
              className={`h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-white hover:scale-110 ${
                isWishlisted ? "text-red-500" : "text-gray-700"
              }`}
            >
              <Heart
                className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`}
              />
            </Button>
          </div>

          {/* Stock Indicator */}
          <div className="absolute bottom-3 left-3 z-10 sm:bottom-4 sm:left-4">
            <Badge
              className={`text-xs ${
                product.inStock
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {product.inStock ? `In stock` : "Out of stock"}
            </Badge>
          </div>
          {/* Product Image */}
          <Link href={`/product/${product.id}`} className="block h-full">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </Link>
        </div>

        {/* Product Info */}
        <div className="p-4 sm:p-6">
          {/* Brand & Product Name */}
          <div className="mb-3">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Shinkolite
            </p>
            <Link href={`/product/${product.id}`}>
              <h3 className="font-semibold text-gray-900 transition-colors hover:text-gray-700 line-clamp-2 text-sm sm:text-base">
                {product.name}
              </h3>
            </Link>
            <p className="text-xs text-gray-600 sm:text-sm">
              {product.thickness}
            </p>
          </div>

          {/* Product Code & Thickness */}
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Product Code
                </p>
                <p className="text-sm font-semibold text-gray-900">
                  ACL-{product.id.toString().padStart(4, "0")}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Span
                </p>
                <p className="text-sm font-semibold text-gray-900">
                  {product.thickness}
                </p>
              </div>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="flex items-center space-x-2">
            <Button
              onClick={handleAddToCartClick}
              className="flex-1 rounded-full bg-[#02a89e] text-white hover:bg-gray-800 text-sm"
              disabled={!product.inStock}
            >
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
