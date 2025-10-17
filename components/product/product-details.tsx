"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  Star,
  Shield,
  Truck,
  Phone,
  Loader2,
  CreditCard,
  ShoppingCart,
} from "lucide-react";
import { Products } from "@/dummy-data/type";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/context/cart-context";

interface ProductPageProps {
  product: Products;
}

export default function PremiumProductPage({ product }: ProductPageProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(
    product.sizes?.[0]?.name || ""
  );
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isCartLoading, setIsCartLoading] = useState(false);
  const { addToCart, addToCartAndCheckout } = useCart();

  const getCurrentPrice = () => {
    const sizeOption = product.sizes?.find((s) => s.name === selectedSize);
    return sizeOption?.price || product.basePrice;
  };

  const currentPrice = getCurrentPrice();

  // const getRelatedProducts = () => {
  //   return products
  //     .filter((p) => p.id !== product.id)
  //     .filter((p) => {
  //       if (p.series.name === product.series?.name) return true
  //       if (product.attributes[0].key && p.attributes.uvCut) {
  //         const currentUV = Number.parseFloat(product.attributes.uvCut.replace("%", ""))
  //         const relatedUV = Number.parseFloat(p.attributes.uvCut.replace("%", ""))
  //         if (Math.abs(currentUV - relatedUV) <= 5) return true
  //       }
  //       if (product.thickness && p.thickness && product.thickness === p.thickness) return true
  //       return false
  //     })
  //     .slice(0, 4)
  // }

  // const relatedProducts = getRelatedProducts()

  const handleAddToCart = useCallback(async () => {
    setIsCartLoading(true);
    await addToCart({
      productId: product.id,
      productName: product.name,
      selectedSize,
      basePrice: product.basePrice || 0,
      currentPrice: currentPrice || 0,
      quantity,
      code: product.code || "",
      specs: `Thickness: ${
        product.thickness || product.thicknessRange || "Standard"
      }, Span: ${product.span || "Custom"}`,
      attributes: product.attributes,
      category : product.series?.name || product.category?.name || "",
      image: product.images[0]?.url || "",
    });
    setIsCartLoading(false);
    toast({
      title: "Added to cart",
      description: `${quantity} ${product.name} added to your cart.`,
    });
  }, [addToCart, currentPrice, product.attributes, product.basePrice, product.category?.name, product.code, product.id, product.images, product.name, product.series?.name, product.span, product.thickness, product.thicknessRange, quantity, selectedSize, toast]);

  const handleCheckout = useCallback(async () => {
    setIsLoading(true);
    await addToCartAndCheckout({
      productId: product.id,
      productName: product.name,
      selectedSize,
      basePrice: product.basePrice || 0,
      currentPrice: currentPrice || 0,
      quantity,
      code: product.code || "",
      specs: `Thickness: ${
        product.thickness || product.thicknessRange || "Standard"
      }, Span: ${product.span || "Custom"}`,
      attributes: product.attributes,
      category : product.series?.name || product.category?.name || "",
      image: product.images[0]?.url || "",
    });
    setIsLoading(false);
  }, [addToCartAndCheckout, currentPrice, product.attributes, product.basePrice, product.category?.name, product.code, product.id, product.images, product.name, product.series?.name, product.span, product.thickness, product.thicknessRange, quantity, selectedSize]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-900 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/products"
              className="hover:text-gray-900 transition-colors"
            >
              Products
            </Link>
            <span>/</span>
            <Link
              href="/category"
              className="hover:text-gray-900 transition-colors capitalize"
            >
              {product.series?.name}
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:py-16">
          {/* Product Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="text-xs">
                  {product?.code}
                </Badge>
                <Badge
                  variant="outline"
                  className="text-xs text-green-600 border-green-200"
                >
                  ✓ In Stock
                </Badge>
                <Badge
                  variant="outline"
                  className="text-xs text-blue-600 border-blue-200"
                >
                  ✓ Quality Assured
                </Badge>
              </div>
              <h1 className="text-3xl lg:text-5xl font-light tracking-tight text-gray-900 mb-2">
                {product.name}{" "}
                {product.code && `(${product.code.toUpperCase()})`}
              </h1>
              <p className="text-lg text-gray-600">
                {product.series?.name
                  ? product.series.name.charAt(0).toUpperCase() +
                    product.series.name.slice(1) +
                    " Series"
                  : ""}
              </p>
            </div>

            {/* Customer Rating and Reviews */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
                <span className="text-sm text-gray-600 ml-1">
                  4.8 (124 reviews)
                </span>
              </div>
            </div>
          </div>

          {/* Main Product Section - Desktop: Side by Side, Mobile: Stacked */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Column - Product Image */}
            <div className="relative">
              <div className="relative aspect-square bg-white rounded-2xl overflow-hidden shadow-sm">
                <Image
                  src={
                    product.images[selectedImage].url ||
                    "/placeholder.svg?height=600&width=600&query=acrylic sheet"
                  }
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />

                {/* Image Navigation */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setSelectedImage(
                          selectedImage > 0
                            ? selectedImage - 1
                            : product.images.length - 1
                        )
                      }
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg border flex items-center justify-center hover:shadow-xl transition-all"
                    >
                      <ChevronLeft className="h-5 w-5 text-gray-700" />
                    </button>
                    <button
                      onClick={() =>
                        setSelectedImage(
                          selectedImage < product.images.length - 1
                            ? selectedImage + 1
                            : 0
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg border flex items-center justify-center hover:shadow-xl transition-all"
                    >
                      <ChevronRight className="h-5 w-5 text-gray-700" />
                    </button>
                  </>
                )}

                {/* Zoom Indicator */}
                {/* <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700">
                  Click to zoom
                </div> */}
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-3 mt-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                      index === selectedImage
                        ? "border-[#02a89e]"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Image
                      src={
                        image.url ||
                        "/placeholder.svg?height=150&width=150&query=acrylic sheet"
                      }
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
              {/* Pricing Section */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <div className="flex items-baseline gap-3 mb-2">
                  From{" "}
                  <span className="text-3xl font-bold text-gray-900">
                    ₹{currentPrice?.toLocaleString()}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Price per sheet • Exclude of all taxes
                </p>
                {/* <p className="text-sm text-[#02a89e] font-medium mt-1">Free shipping on orders above ₹5,000</p> */}
              </div>

              {/* Product Info */}
              <div>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  {product.description}
                </p>

                {/* Key Highlights with Icons */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {product.attributes.map((attribute) => (
                    <div
                      key={attribute.id}
                      className="flex items-center gap-2 text-sm"
                    >
                      <Shield className="h-4 w-4 text-orange-500" />
                      <span>
                        {attribute.value} {attribute.key}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              {/* {product.variants && product.variants.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Color Options</h3>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {product.variants.map((variant) => (
                      <button
                        key={variant.code}
                        onClick={() => setSelectedVariant(variant.colorName)}
                        className={`flex flex-col items-center space-y-2 p-4 rounded-xl border-2 transition-all ${
                          selectedVariant === variant.colorName
                            ? "border-[#02a89e] bg-[#02a89e]/5"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full border-2 ${
                            selectedVariant === variant.colorName ? "border-[#02a89e]" : "border-gray-300"
                          }`}
                          style={{
                            backgroundColor:
                              variant.colorName.toLowerCase() === "red"
                                ? "#dc2626"
                                : variant.colorName.toLowerCase() === "black"
                                  ? "#000000"
                                  : variant.colorName.toLowerCase() === "white"
                                    ? "#ffffff"
                                    : variant.colorName.toLowerCase() === "frost white"
                                      ? "#f8fafc"
                                      : "#6b7280",
                          }}
                        />
                        <div className="text-center">
                          <div className="text-sm font-medium text-gray-900">{variant.colorName}</div>
                          <div className="text-xs text-gray-500">{variant.code}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )} */}

              {/* Size Selection */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Size & Pricing</h3>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger className="w-full h-14 rounded-xl border-2 border-gray-200 hover:border-gray-300">
                    <SelectValue placeholder="Select a size" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.sizes?.map((sizeOption) => (
                      <SelectItem key={sizeOption.id} value={sizeOption.name}>
                        <div className="flex items-center justify-between w-full">
                          <span className="font-medium">{sizeOption.name}</span>
                          <span className="ml-4 text-[#02a89e] font-semibold">
                            ₹{sizeOption.price.toLocaleString()}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500 mt-2">
                  Custom sizes available on request
                </p>
              </div>

              {/* Quantity */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Quantity</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border-2 border-gray-200 rounded-xl">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 flex items-center justify-center hover:bg-gray-50 transition-colors rounded-l-xl"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="text-lg font-semibold w-16 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(10, quantity + 1))}
                      className="w-12 h-12 flex items-center justify-center hover:bg-gray-50 transition-colors rounded-r-xl"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>
                      Total:{" "}
                      <span className="font-semibold text-gray-900">
                        ₹{((currentPrice || 0) * quantity).toLocaleString()}
                      </span>
                    </p>
                    {/* <p>Bulk discounts available for 50+ sheets</p> */}
                  </div>
                </div>
              </div>

              {/* Purchase Buttons */}
              <div className="space-y-4 pt-4 border-t">
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    disabled={isCartLoading || isLoading || quantity === 0}
                    size="lg"
                    className="h-14 rounded-xl bg-[#02a89e] hover:bg-[#285754] text-base font-semibold shadow-lg hover:shadow-xl transition-all"
                    onClick={handleAddToCart}
                  >
                    {isCartLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Adding...
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add to Cart
                      </>
                    )}
                  </Button>
                  <Button
                    disabled={isCartLoading || isLoading || quantity === 0}
                    size="lg"
                    className="h-14 rounded-xl bg-gray-900 hover:bg-gray-800 text-base font-semibold shadow-lg hover:shadow-xl transition-all"
                    onClick={handleCheckout}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="mr-2 h-4 w-4" />
                        Buy Now
                      </>
                    )}
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-12 rounded-xl border-2 border-gray-200 hover:border-gray-300 text-base font-medium bg-transparent"
                    onClick={() => setIsWishlisted(!isWishlisted)}
                  >
                    <Heart
                      className={`h-4 w-4 mr-2 ${
                        isWishlisted ? "fill-current text-red-500" : ""
                      }`}
                    />
                    Wishlist
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-12 rounded-xl border-2 border-gray-200 hover:border-gray-300 text-base font-medium bg-transparent"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call Expert
                  </Button>
                </div>

                {/* Trust Signals */}
                <div className="flex items-center justify-center gap-6 pt-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Shield className="h-4 w-4" />
                    <span>Secure Payment</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Truck className="h-4 w-4" />
                    <span>Fast Shipping</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications Section */}
      <div className="bg-white py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl font-light mb-4">
              Technical Specifications
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              Professional-grade materials with certified performance standards
            </p>
          </div>

          <div className="bg-white border border-gray-300 rounded-none overflow-hidden shadow-none">
            <div className="bg-gray-100 px-4 sm:px-8 py-4 border-b border-gray-300">
              <h3 className="text-sm sm:text-base font-bold text-gray-900 uppercase tracking-wider">
                TECHNICAL DATA SHEET
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                Product Code: {product.code}
              </p>
            </div>

            <div className="p-0 overflow-x-auto">
              {/* Material Properties Table */}
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-300">
                    <th className="text-left py-3 sm:py-4 px-4 sm:px-8 text-xs sm:text-sm font-bold text-gray-900 uppercase tracking-wide">
                      PROPERTY
                    </th>
                    <th className="text-left py-3 sm:py-4 px-4 sm:px-8 text-xs sm:text-sm font-bold text-gray-900 uppercase tracking-wide">
                      VALUE
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 sm:py-4 px-4 sm:px-8 text-xs sm:text-sm text-gray-700 font-medium">
                      Thickness
                    </td>
                    <td className="py-3 sm:py-4 px-4 sm:px-8 text-xs sm:text-sm font-mono text-gray-900">
                      {product.thickness ||
                        product.thicknessRange ||
                        "Standard"}
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 sm:py-4 px-4 sm:px-8 text-xs sm:text-sm text-gray-700 font-medium">
                      Span
                    </td>
                    <td className="py-3 sm:py-4 px-4 sm:px-8 text-xs sm:text-sm font-mono text-gray-900">
                      {product.span || "Custom"}
                    </td>
                  </tr>
                  {product.attributes.map((atttribute) => (
                    <tr className="hover:bg-gray-50" key={atttribute.id}>
                      <td className="py-3 sm:py-4 px-4 sm:px-8 text-xs sm:text-sm text-gray-700 font-medium">
                        {atttribute.key}
                      </td>
                      <td className="py-3 sm:py-4 px-4 sm:px-8 text-xs sm:text-sm font-mono text-gray-900">
                        {atttribute.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Compliance Section */}
              {/* <div className="bg-gray-50 border-t border-gray-300 px-4 sm:px-8 py-6">
                <h4 className="text-xs sm:text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">
                  COMPLIANCE & CERTIFICATIONS
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-600 rounded-full flex-shrink-0"></div>
                    <span className="text-xs sm:text-sm text-gray-700 font-medium">ISO 9001:2015</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-600 rounded-full flex-shrink-0"></div>
                    <span className="text-xs sm:text-sm text-gray-700 font-medium">Fire Retardant Grade</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-600 rounded-full flex-shrink-0"></div>
                    <span className="text-xs sm:text-sm text-gray-700 font-medium">Weather Resistant</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-600 rounded-full flex-shrink-0"></div>
                    <span className="text-xs sm:text-sm text-gray-700 font-medium">UV Stabilized</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-600 rounded-full flex-shrink-0"></div>
                    <span className="text-xs sm:text-sm text-gray-700 font-medium">RoHS Compliant</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-600 rounded-full flex-shrink-0"></div>
                    <span className="text-xs sm:text-sm text-gray-700 font-medium">REACH Certified</span>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Applications Section */}
      <div className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-4">Applications</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {product.application}
            </p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-4">You might also like</h2>
            <p className="text-xl text-gray-600">
              Similar products from our collection
            </p>
          </div>

          {/* <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Link key={relatedProduct.id} href={`/product/${relatedProduct.id}`} className="group">
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                  <div className="relative aspect-square bg-gray-100">
                    <Image
                      src={relatedProduct.images[0] || "/placeholder.svg?height=400&width=400&query=acrylic sheet"}
                      alt={relatedProduct.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-medium text-gray-700 capitalize">
                      {relatedProduct.category}
                    </div>
                  </div>
                  <div className="p-6 space-y-3">
                    <h3 className="font-semibold text-lg group-hover:text-[#02a89e] transition-colors line-clamp-2">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-sm text-gray-500 uppercase tracking-wide">{relatedProduct.code}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-gray-900 font-bold text-lg">₹{relatedProduct.price.toLocaleString()}</p>
                      <Button size="sm" variant="outline" className="text-xs bg-transparent">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div> */}
        </div>
      </div>

      {/* Customer Support Section */}
      <div className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="bg-gradient-to-r from-[#02a89e] to-[#285754] rounded-3xl p-8 lg:p-12 text-white">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-4">Need Help Choosing?</h3>
                <p className="text-lg opacity-90 mb-6">
                  Our experts are here to help you find the perfect acrylic
                  sheet for your project.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="bg-white text-[#02a89e] hover:bg-gray-100"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now
                  </Button>
                </div>
              </div>
              <div className="text-center lg:text-right">
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="text-lg opacity-90">Expert Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
