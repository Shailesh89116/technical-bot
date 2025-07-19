/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"
import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import {
  Search,
  SlidersHorizontal,
  Grid3X3,
  List,
  Heart,
  Star,
  ShoppingCart,
  Eye,
  ArrowUpDown,
  Truck,
  Shield,
  Award,
  Zap,
  X,
  Plus,
  Minus,
  Check,
  ArrowLeft,
  Edit3,
  Trash2,
  Info,
  Ruler,
} from "lucide-react"

// Category configurations
const categoryConfigs = {
  sanitary: {
    title: "Sanitary Acrylic Solutions",
    subtitle: "Medical & Sanitary Grade",
    description:
      "Premium medical and sanitary grade acrylic sheets designed for healthcare, food service, and cleanroom environments. FDA approved and hospital certified.",
    gradient: "from-blue-50 via-white to-green-50",
    badge: {
      text: "Medical & Sanitary Grade",
      icon: Shield,
      className: "bg-green-100 text-green-800",
    },
    features: [
      { icon: Shield, label: "FDA Approved", desc: "Medical Grade" },
      { icon: Award, label: "Hospital Certified", desc: "Premium Quality" },
      { icon: Zap, label: "Antibacterial", desc: "99.9% Protection" },
      { icon: Truck, label: "Fast Delivery", desc: "Express Shipping" },
    ],
  },
  interior: {
    title: "Interior Design Acrylic",
    subtitle: "Crystal Clear & Architectural",
    description:
      "Premium architectural acrylic for modern interior applications with unmatched optical clarity and design flexibility.",
    gradient: "from-emerald-50 via-white to-blue-50",
    badge: {
      text: "Crystal Clear & Premium",
      icon: Award,
      className: "bg-purple-100 text-purple-800",
    },
    features: [
      { icon: Award, label: "99.9% Clarity", desc: "Crystal Clear" },
      { icon: Shield, label: "UV Resistant", desc: "Long Lasting" },
      { icon: Zap, label: "Scratch Resistant", desc: "Durable" },
      { icon: Truck, label: "Custom Colors", desc: "Available" },
    ],
  },
  advertising: {
    title: "Advertising Display Acrylic",
    subtitle: "High Impact & Weather Resistant",
    description:
      "Weather-resistant acrylic perfect for outdoor signage and illuminated advertising displays with superior durability.",
    gradient: "from-orange-50 via-white to-red-50",
    badge: {
      text: "High Impact & Outdoor Ready",
      icon: Zap,
      className: "bg-orange-100 text-orange-800",
    },
    features: [
      { icon: Shield, label: "Weather Resistant", desc: "All Seasons" },
      { icon: Zap, label: "LED Compatible", desc: "Illuminated" },
      { icon: Award, label: "High Impact", desc: "Durable" },
      { icon: Truck, label: "UV Stable", desc: "Fade Resistant" },
    ],
  },
  "building-materials": {
    title: "Building Materials Acrylic",
    subtitle: "Structural Strength & Industrial",
    description:
      "17x stronger than glass with superior thermal insulation for demanding construction and industrial applications.",
    gradient: "from-slate-50 via-white to-gray-50",
    badge: {
      text: "Industrial Grade & Structural",
      icon: Award,
      className: "bg-slate-100 text-slate-800",
    },
    features: [
      { icon: Award, label: "17x Stronger", desc: "Than Glass" },
      { icon: Shield, label: "Fire Retardant", desc: "Safety First" },
      { icon: Zap, label: "Thermal Insulation", desc: "Energy Efficient" },
      { icon: Truck, label: "Impact Resistant", desc: "Heavy Duty" },
    ],
  },
}

// Sample products data with sizes
const allProducts = {
  sanitary: [
    {
      id: 1,
      name: "Medical Grade Clear Acrylic",
      brand: "MedicalPro",
      category: "Medical Grade",
      thickness: "5mm",
      finish: "Clear",
      size: "4' × 8'",
      price: 189.99,
      originalPrice: 229.99,
      discount: 17,
      image: "/placeholder.svg?height=600&width=600&text=Medical+Grade+Clear",
      rating: 4.9,
      reviews: 156,
      inStock: true,
      stockCount: 24,
      features: ["FDA Approved", "Antibacterial", "Easy to Clean", "Chemical Resistant"],
      badges: ["Medical Grade", "FDA Approved"],
      delivery: "Express Delivery",
      description:
        "Premium medical-grade acrylic designed for healthcare environments with superior hygiene properties.",
      specifications: {
        "Light Transmission": "92%",
        "Impact Strength": "High",
        "Chemical Resistance": "Excellent",
        "UV Resistance": "Yes",
      },
      sizes: [
        { name: "2' × 4'", price: 89.99, inStock: true, stockCount: 15, dimensions: '24" × 48"' },
        { name: "4' × 8'", price: 189.99, inStock: true, stockCount: 24, dimensions: '48" × 96"' },
        { name: "5' × 10'", price: 299.99, inStock: true, stockCount: 8, dimensions: '60" × 120"' },
        { name: "6' × 12'", price: 449.99, inStock: false, stockCount: 0, dimensions: '72" × 144"' },
        { name: "Custom Size", price: null, inStock: true, stockCount: null, dimensions: "Made to Order" },
      ],
    },
    {
      id: 2,
      name: "Antibacterial Frosted Acrylic",
      brand: "HygieneShield",
      category: "Antibacterial",
      thickness: "3mm",
      finish: "Frosted",
      size: "4' × 8'",
      price: 159.99,
      originalPrice: 189.99,
      discount: 16,
      image: "/placeholder.svg?height=600&width=600&text=Antibacterial+Frosted",
      rating: 4.7,
      reviews: 89,
      inStock: true,
      stockCount: 18,
      features: ["Antimicrobial", "Privacy Protection", "Easy Maintenance", "Scratch Resistant"],
      badges: ["Antibacterial", "New"],
      delivery: "2-Day Delivery",
      description: "Advanced antibacterial frosted acrylic perfect for privacy screens and hygienic applications.",
      specifications: {
        "Light Transmission": "65%",
        "Antibacterial Efficacy": "99.9%",
        "Surface Hardness": "High",
        Maintenance: "Low",
      },
      sizes: [
        { name: "2' × 4'", price: 79.99, inStock: true, stockCount: 12, dimensions: '24" × 48"' },
        { name: "4' × 8'", price: 159.99, inStock: true, stockCount: 18, dimensions: '48" × 96"' },
        { name: "5' × 10'", price: 249.99, inStock: true, stockCount: 6, dimensions: '60" × 120"' },
        { name: "Custom Size", price: null, inStock: true, stockCount: null, dimensions: "Made to Order" },
      ],
    },
    {
      id: 3,
      name: "Hospital Grade White Acrylic",
      brand: "ClinicalClear",
      category: "Hospital Grade",
      thickness: "8mm",
      finish: "White",
      size: "5' × 10'",
      price: 299.99,
      originalPrice: 359.99,
      discount: 17,
      image: "/placeholder.svg?height=600&width=600&text=Hospital+Grade+White",
      rating: 4.8,
      reviews: 203,
      inStock: true,
      stockCount: 12,
      features: ["Hospital Approved", "Fire Retardant", "Non-Porous", "Sterilizable"],
      badges: ["Hospital Grade", "Fire Safe"],
      delivery: "Express Delivery",
      description: "Premium hospital-grade white acrylic meeting the highest medical facility standards.",
      specifications: {
        "Fire Rating": "Class A",
        Sterilization: "Compatible",
        Porosity: "Non-Porous",
        Durability: "Excellent",
      },
      sizes: [
        { name: "3' × 6'", price: 149.99, inStock: true, stockCount: 20, dimensions: '36" × 72"' },
        { name: "4' × 8'", price: 229.99, inStock: true, stockCount: 15, dimensions: '48" × 96"' },
        { name: "5' × 10'", price: 299.99, inStock: true, stockCount: 12, dimensions: '60" × 120"' },
        { name: "Custom Size", price: null, inStock: true, stockCount: null, dimensions: "Made to Order" },
      ],
    },
    {
      id: 4,
      name: "Antimicrobial Clear Shield",
      brand: "BioProtect",
      category: "Antimicrobial",
      thickness: "6mm",
      finish: "Clear",
      size: "4' × 8'",
      price: 219.99,
      originalPrice: 269.99,
      discount: 19,
      image: "/placeholder.svg?height=600&width=600&text=Antimicrobial+Clear",
      rating: 4.6,
      reviews: 127,
      inStock: true,
      stockCount: 31,
      features: ["99.9% Germ Protection", "Self-Cleaning", "Transparent", "Long-lasting"],
      badges: ["Antimicrobial", "Best Seller"],
      delivery: "Same Day",
      description: "Revolutionary antimicrobial clear acrylic with self-cleaning properties for maximum protection.",
      specifications: {
        "Germ Protection": "99.9%",
        "Self-Cleaning": "Yes",
        Transparency: "Crystal Clear",
        Lifespan: "10+ Years",
      },
      sizes: [
        { name: "2' × 4'", price: 109.99, inStock: true, stockCount: 25, dimensions: '24" × 48"' },
        { name: "4' × 8'", price: 219.99, inStock: true, stockCount: 31, dimensions: '48" × 96"' },
        { name: "5' × 10'", price: 349.99, inStock: true, stockCount: 18, dimensions: '60" × 120"' },
        { name: "Custom Size", price: null, inStock: true, stockCount: null, dimensions: "Made to Order" },
      ],
    },
    {
      id: 5,
      name: "Food Grade Acrylic Panel",
      brand: "FoodSafe",
      category: "Food Grade",
      thickness: "4mm",
      finish: "Clear",
      size: "3' × 6'",
      price: 129.99,
      originalPrice: 149.99,
      discount: 13,
      image: "/placeholder.svg?height=600&width=600&text=Food+Grade+Panel",
      rating: 4.5,
      reviews: 94,
      inStock: true,
      stockCount: 45,
      features: ["Food Safe", "NSF Certified", "Easy to Clean", "Odor Resistant"],
      badges: ["Food Grade", "NSF Certified"],
      delivery: "2-Day Delivery",
      description: "NSF certified food-grade acrylic perfect for food service and kitchen applications.",
      specifications: {
        "NSF Rating": "Certified",
        "Food Contact": "Safe",
        Cleaning: "Dishwasher Safe",
        "Odor Resistance": "Yes",
      },
      sizes: [
        { name: "2' × 3'", price: 69.99, inStock: true, stockCount: 30, dimensions: '24" × 36"' },
        { name: "3' × 6'", price: 129.99, inStock: true, stockCount: 45, dimensions: '36" × 72"' },
        { name: "4' × 8'", price: 199.99, inStock: true, stockCount: 22, dimensions: '48" × 96"' },
        { name: "Custom Size", price: null, inStock: true, stockCount: null, dimensions: "Made to Order" },
      ],
    },
    {
      id: 6,
      name: "Cleanroom Grade Acrylic",
      brand: "PureLab",
      category: "Cleanroom",
      thickness: "10mm",
      finish: "Clear",
      size: "4' × 8'",
      price: 389.99,
      originalPrice: 459.99,
      discount: 15,
      image: "/placeholder.svg?height=600&width=600&text=Cleanroom+Grade",
      rating: 4.9,
      reviews: 67,
      inStock: true,
      stockCount: 8,
      features: ["ISO Certified", "Ultra-Clean", "Static Resistant", "Particle Free"],
      badges: ["Cleanroom", "ISO Certified"],
      delivery: "Express Delivery",
      description: "Ultra-pure cleanroom grade acrylic for pharmaceutical and laboratory environments.",
      specifications: {
        "ISO Class": "5",
        "Particle Count": "Ultra-Low",
        "Static Resistance": "Yes",
        "Purity Level": "99.99%",
      },
      sizes: [
        { name: "3' × 6'", price: 289.99, inStock: true, stockCount: 12, dimensions: '36" × 72"' },
        { name: "4' × 8'", price: 389.99, inStock: true, stockCount: 8, dimensions: '48" × 96"' },
        { name: "5' × 10'", price: 599.99, inStock: false, stockCount: 0, dimensions: '60" × 120"' },
        { name: "Custom Size", price: null, inStock: true, stockCount: null, dimensions: "Made to Order" },
      ],
    },
  ],
  interior: [
    {
      id: 7,
      name: "Crystal Clear Interior Panel",
      brand: "ClearVision",
      category: "Interior Design",
      thickness: "6mm",
      finish: "Clear",
      size: "4' × 8'",
      price: 249.99,
      originalPrice: 299.99,
      discount: 17,
      image: "/placeholder.svg?height=600&width=600&text=Crystal+Clear+Interior",
      rating: 4.8,
      reviews: 142,
      inStock: true,
      stockCount: 28,
      features: ["99.9% Clarity", "UV Resistant", "Scratch Resistant", "Easy Installation"],
      badges: ["Premium", "Crystal Clear"],
      delivery: "Express Delivery",
      description: "Premium crystal-clear acrylic perfect for modern interior design applications.",
      specifications: {
        "Light Transmission": "99.9%",
        "UV Protection": "Yes",
        "Scratch Resistance": "High",
        Installation: "Easy",
      },
      sizes: [
        { name: "2' × 4'", price: 119.99, inStock: true, stockCount: 35, dimensions: '24" × 48"' },
        { name: "4' × 8'", price: 249.99, inStock: true, stockCount: 28, dimensions: '48" × 96"' },
        { name: "5' × 10'", price: 389.99, inStock: true, stockCount: 15, dimensions: '60" × 120"' },
        { name: "Custom Size", price: null, inStock: true, stockCount: null, dimensions: "Made to Order" },
      ],
    },
    {
      id: 8,
      name: "Frosted Privacy Screen",
      brand: "PrivacyPro",
      category: "Privacy Solutions",
      thickness: "5mm",
      finish: "Frosted",
      size: "4' × 8'",
      price: 199.99,
      originalPrice: 239.99,
      discount: 17,
      image: "/placeholder.svg?height=600&width=600&text=Frosted+Privacy",
      rating: 4.6,
      reviews: 98,
      inStock: true,
      stockCount: 35,
      features: ["Privacy Protection", "Light Diffusion", "Modern Design", "Custom Sizes"],
      badges: ["Privacy", "Modern"],
      delivery: "2-Day Delivery",
      description: "Elegant frosted acrylic for privacy screens and modern interior partitions.",
      specifications: {
        "Light Transmission": "70%",
        "Privacy Level": "High",
        Design: "Modern",
        Customization: "Available",
      },
      sizes: [
        { name: "2' × 4'", price: 99.99, inStock: true, stockCount: 42, dimensions: '24" × 48"' },
        { name: "4' × 8'", price: 199.99, inStock: true, stockCount: 35, dimensions: '48" × 96"' },
        { name: "5' × 10'", price: 319.99, inStock: true, stockCount: 18, dimensions: '60" × 120"' },
        { name: "Custom Size", price: null, inStock: true, stockCount: null, dimensions: "Made to Order" },
      ],
    },
  ],
  advertising: [
    {
      id: 9,
      name: "LED Compatible Display Panel",
      brand: "SignPro",
      category: "LED Displays",
      thickness: "8mm",
      finish: "Clear",
      size: "5' × 10'",
      price: 399.99,
      originalPrice: 479.99,
      discount: 17,
      image: "/placeholder.svg?height=600&width=600&text=LED+Display+Panel",
      rating: 4.9,
      reviews: 203,
      inStock: true,
      stockCount: 15,
      features: ["LED Compatible", "Weather Resistant", "High Impact", "UV Stable"],
      badges: ["LED Ready", "Weather Proof"],
      delivery: "Express Delivery",
      description: "Professional-grade acrylic designed for LED-backlit advertising displays.",
      specifications: {
        "LED Compatibility": "Yes",
        "Weather Rating": "IP65",
        "Impact Strength": "High",
        "UV Stability": "Excellent",
      },
      sizes: [
        { name: "3' × 6'", price: 199.99, inStock: true, stockCount: 25, dimensions: '36" × 72"' },
        { name: "4' × 8'", price: 299.99, inStock: true, stockCount: 20, dimensions: '48" × 96"' },
        { name: "5' × 10'", price: 399.99, inStock: true, stockCount: 15, dimensions: '60" × 120"' },
        { name: "6' × 12'", price: 599.99, inStock: true, stockCount: 8, dimensions: '72" × 144"' },
        { name: "Custom Size", price: null, inStock: true, stockCount: null, dimensions: "Made to Order" },
      ],
    },
  ],
  "building-materials": [
    {
      id: 10,
      name: "Structural Acrylic Sheet",
      brand: "BuildStrong",
      category: "Structural",
      thickness: "12mm",
      finish: "Clear",
      size: "6' × 12'",
      price: 599.99,
      originalPrice: 719.99,
      discount: 17,
      image: "/placeholder.svg?height=600&width=600&text=Structural+Acrylic",
      rating: 4.8,
      reviews: 156,
      inStock: true,
      stockCount: 8,
      features: ["17x Stronger", "Fire Retardant", "Thermal Insulation", "Impact Resistant"],
      badges: ["Industrial Grade", "Fire Safe"],
      delivery: "Express Delivery",
      description: "Heavy-duty structural acrylic for demanding construction applications.",
      specifications: {
        Strength: "17x Glass",
        "Fire Rating": "Class A",
        Thermal: "Excellent",
        Impact: "Superior",
      },
      sizes: [
        { name: "4' × 8'", price: 399.99, inStock: true, stockCount: 12, dimensions: '48" × 96"' },
        { name: "5' × 10'", price: 499.99, inStock: true, stockCount: 10, dimensions: '60" × 120"' },
        { name: "6' × 12'", price: 599.99, inStock: true, stockCount: 8, dimensions: '72" × 144"' },
        { name: "8' × 16'", price: 999.99, inStock: false, stockCount: 0, dimensions: '96" × 192"' },
        { name: "Custom Size", price: null, inStock: true, stockCount: null, dimensions: "Made to Order" },
      ],
    },
  ],
}

const filterOptions = {
  sanitary: {
    thickness: ["3mm", "4mm", "5mm", "6mm", "8mm", "10mm"],
    finish: ["Clear", "Frosted", "White"],
    features: ["FDA Approved", "Antibacterial", "Fire Retardant", "NSF Certified", "ISO Certified"],
    brands: ["MedicalPro", "HygieneShield", "ClinicalClear", "BioProtect", "FoodSafe", "PureLab"],
  },
  interior: {
    thickness: ["3mm", "4mm", "5mm", "6mm", "8mm", "10mm"],
    finish: ["Clear", "Frosted", "Colored"],
    features: ["UV Resistant", "Scratch Resistant", "Easy Installation", "Custom Sizes"],
    brands: ["ClearVision", "PrivacyPro", "DesignAcrylic", "ModernPanels"],
  },
  advertising: {
    thickness: ["5mm", "6mm", "8mm", "10mm", "12mm"],
    finish: ["Clear", "White", "Colored"],
    features: ["LED Compatible", "Weather Resistant", "High Impact", "UV Stable"],
    brands: ["SignPro", "DisplayMax", "OutdoorAcrylic", "LEDReady"],
  },
  "building-materials": {
    thickness: ["8mm", "10mm", "12mm", "15mm", "20mm"],
    finish: ["Clear", "Tinted", "Textured"],
    features: ["Fire Retardant", "Impact Resistant", "Thermal Insulation", "Structural Grade"],
    brands: ["BuildStrong", "StructuralPro", "IndustrialAcrylic", "HeavyDuty"],
  },
}

// Enhanced Size Selection Modal (Responsive for both mobile and desktop)
function SizeSelectionModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
}: {
  product: any
  isOpen: boolean
  onClose: () => void
  onAddToCart: (size: any, quantity: number) => void
}) {
  const [selectedSize, setSelectedSize] = useState<any>(null)
  const [quantity, setQuantity] = useState(1)
  const [showSizeGuide, setShowSizeGuide] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setSelectedSize(null)
      setQuantity(1)
      setShowSizeGuide(false)
    }
  }, [isOpen])

  const handleAddToCart = () => {
    if (selectedSize) {
      onAddToCart(selectedSize, quantity)
      onClose()
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4">
      <div className="w-full max-w-md sm:max-w-2xl lg:max-w-4xl bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[85vh] sm:max-h-[90vh] overflow-hidden animate-in slide-in-from-bottom sm:slide-in-from-bottom-0 duration-300">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 z-10">
          <div className="flex items-center justify-between p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Select Size</h3>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSizeGuide(!showSizeGuide)}
                className="text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              >
                <Ruler className="h-4 w-4 mr-1" />
                Size Guide
              </Button>
              <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 rounded-full">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden sm:block">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
            {/* Left Column - Product Info */}
            <div className="space-y-6">
              {/* Product Info */}
              <div className="flex items-center space-x-4">
                <div className="h-20 w-20 lg:h-24 lg:w-24 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={96}
                    height={96}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 text-lg">{product.name}</h4>
                  <p className="text-sm text-gray-500">{product.brand}</p>
                  <p className="text-sm text-gray-400">
                    {product.thickness} • {product.finish}
                  </p>
                  <div className="flex items-center mt-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600 ml-1">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                </div>
              </div>

              {/* Size Guide */}
              {showSizeGuide && (
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <div className="flex items-start space-x-3">
                    <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="font-medium text-blue-900 mb-2">Size Guide</p>
                      <p className="text-blue-700 leading-relaxed">
                        Dimensions shown are Length × Width. All measurements are approximate. Custom sizes available
                        for specific requirements. Contact us for bulk orders or special dimensions.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Quantity Selection */}
              {selectedSize && selectedSize.inStock && selectedSize.price && (
                <div className="p-4 bg-gray-50 rounded-xl">
                  <h4 className="text-sm font-medium text-gray-900 mb-4">Quantity</h4>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="h-12 w-12 rounded-full border-2"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="text-2xl font-semibold min-w-[3rem] text-center">{quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setQuantity(quantity + 1)}
                        className="h-12 w-12 rounded-full border-2"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    {selectedSize.price && (
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Total</p>
                        <p className="text-2xl font-bold text-gray-900">{formatPrice(selectedSize.price * quantity)}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Size Selection */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-medium text-gray-900">Available Sizes</h4>
                <span className="text-sm text-gray-500">{product.sizes?.length} options</span>
              </div>

              <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto">
                {product.sizes?.map((size: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedSize(size)}
                    disabled={!size.inStock}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      selectedSize === size
                        ? "border-black bg-black text-white shadow-lg"
                        : size.inStock
                          ? "border-gray-200 hover:border-gray-300 bg-white hover:shadow-md"
                          : "border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-semibold text-lg">{size.name}</p>
                          {size.price && (
                            <p
                              className={`font-bold text-xl ${selectedSize === size ? "text-white" : "text-gray-900"}`}
                            >
                              {formatPrice(size.price)}
                            </p>
                          )}
                        </div>
                        <p className={`text-sm ${selectedSize === size ? "text-gray-300" : "text-gray-500"}`}>
                          {size.dimensions}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          {size.stockCount ? (
                            <p className={`text-sm ${selectedSize === size ? "text-green-300" : "text-green-600"}`}>
                              ✓ {size.stockCount} in stock
                            </p>
                          ) : size.name === "Custom Size" ? (
                            <p className={`text-sm ${selectedSize === size ? "text-blue-300" : "text-blue-600"}`}>
                              📏 Made to order
                            </p>
                          ) : null}

                          {!size.inStock && <p className="text-sm text-red-500 font-medium">Out of Stock</p>}

                          {!size.price && size.name !== "Custom Size" && (
                            <p className={`text-sm ${selectedSize === size ? "text-gray-300" : "text-gray-500"}`}>
                              Quote Required
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="sm:hidden overflow-y-auto max-h-[calc(85vh-140px)]">
          {/* Product Info */}
          <div className="p-4 border-b border-gray-50">
            <div className="flex items-center space-x-3">
              <div className="h-16 w-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={64}
                  height={64}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 truncate">{product.name}</h4>
                <p className="text-sm text-gray-500">{product.brand}</p>
                <p className="text-xs text-gray-400">
                  {product.thickness} • {product.finish}
                </p>
                <div className="flex items-center mt-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs text-gray-600 ml-1">
                    {product.rating} ({product.reviews})
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Size Guide */}
          {showSizeGuide && (
            <div className="p-4 bg-blue-50 border-b border-blue-100">
              <div className="flex items-start space-x-2">
                <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium text-blue-900 mb-1">Size Guide</p>
                  <p className="text-blue-700 text-xs leading-relaxed">
                    Dimensions shown are Length × Width. All measurements are approximate. Custom sizes available for
                    specific requirements.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Size Selection */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-gray-900">Available Sizes</h4>
              <span className="text-xs text-gray-500">{product.sizes?.length} options</span>
            </div>

            <div className="space-y-2">
              {product.sizes?.map((size: any, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedSize(size)}
                  disabled={!size.inStock}
                  className={`w-full p-4 rounded-2xl border-2 text-left transition-all ${
                    selectedSize === size
                      ? "border-black bg-black text-white shadow-lg"
                      : size.inStock
                        ? "border-gray-200 hover:border-gray-300 bg-white hover:shadow-md"
                        : "border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-semibold text-base">{size.name}</p>
                        {size.price && (
                          <p className={`font-bold text-lg ${selectedSize === size ? "text-white" : "text-gray-900"}`}>
                            {formatPrice(size.price)}
                          </p>
                        )}
                      </div>
                      <p className={`text-sm ${selectedSize === size ? "text-gray-300" : "text-gray-500"}`}>
                        {size.dimensions}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        {size.stockCount ? (
                          <p className={`text-xs ${selectedSize === size ? "text-green-300" : "text-green-600"}`}>
                            ✓ {size.stockCount} in stock
                          </p>
                        ) : size.name === "Custom Size" ? (
                          <p className={`text-xs ${selectedSize === size ? "text-blue-300" : "text-blue-600"}`}>
                            📏 Made to order
                          </p>
                        ) : null}

                        {!size.inStock && <p className="text-xs text-red-500 font-medium">Out of Stock</p>}

                        {!size.price && size.name !== "Custom Size" && (
                          <p className={`text-xs ${selectedSize === size ? "text-gray-300" : "text-gray-500"}`}>
                            Quote Required
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selection */}
          {selectedSize && selectedSize.inStock && selectedSize.price && (
            <div className="p-4 border-t border-gray-100">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Quantity</h4>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-10 w-10 rounded-full border-2"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-xl font-semibold min-w-[3rem] text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-10 w-10 rounded-full border-2"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {selectedSize.price && (
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="text-xl font-bold text-gray-900">{formatPrice(selectedSize.price * quantity)}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Fixed Bottom Action */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 sm:p-6">
          {selectedSize?.name === "Custom Size" ? (
            <Button
              asChild
              className="w-full rounded-2xl bg-black text-white hover:bg-gray-800 py-4 text-base font-semibold"
            >
              <Link href="/quote">Get Custom Quote</Link>
            </Button>
          ) : (
            <Button
              onClick={handleAddToCart}
              disabled={!selectedSize || !selectedSize.inStock}
              className="w-full rounded-2xl bg-black text-white hover:bg-gray-800 py-4 text-base font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {selectedSize && selectedSize.price ? (
                <div className="flex items-center justify-center space-x-2">
                  <ShoppingCart className="h-5 w-5" />
                  <span>Add to Cart - {formatPrice(selectedSize.price * quantity)}</span>
                </div>
              ) : (
                "Select Size to Continue"
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

// Enhanced Cart Item Component (Desktop optimized)
function CartItemDisplay({
  cartKey,
  cartItem,
  onUpdateQuantity,
  onRemoveItem,
  onEditSize,
}: {
  cartKey: string
  cartItem: any
  onUpdateQuantity: (quantity: number) => void
  onRemoveItem: () => void
  onEditSize: () => void
}) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-4">
        {/* Product Image */}
        <div className="h-20 w-20 sm:h-24 sm:w-24 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100">
          <Image
            src={cartItem.product.image || "/placeholder.svg"}
            alt={cartItem.product.name}
            width={96}
            height={96}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-3 sm:space-y-0">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 text-base sm:text-lg">{cartItem.product.name}</h3>
              <p className="text-sm text-gray-500 mt-1">
                {cartItem.product.brand} • {cartItem.product.thickness}
              </p>

              {/* Size Info with Edit Option */}
              <div className="flex items-center mt-3 space-x-3">
                <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Size:</span>
                  <span className="text-sm font-semibold text-gray-900">{cartItem.size.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onEditSize}
                  className="h-8 px-3 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg"
                >
                  <Edit3 className="h-3 w-3 mr-1" />
                  Edit Size
                </Button>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-3 mt-3">
                <span className="text-lg sm:text-xl font-bold text-gray-900">{formatPrice(cartItem.size.price)}</span>
                {cartItem.product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(cartItem.product.originalPrice)}
                  </span>
                )}
                {cartItem.product.discount && (
                  <Badge className="bg-orange-100 text-orange-800 text-xs">{cartItem.product.discount}% OFF</Badge>
                )}
              </div>
            </div>

            {/* Remove Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onRemoveItem}
              className="h-10 w-10 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          {/* Quantity Controls and Total */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-4 bg-gray-50 rounded-full px-2 py-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onUpdateQuantity(Math.max(1, cartItem.quantity - 1))}
                className="h-10 w-10 rounded-full hover:bg-white"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-base font-semibold min-w-[3rem] text-center">{cartItem.quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onUpdateQuantity(cartItem.quantity + 1)}
                className="h-10 w-10 rounded-full hover:bg-white"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Total Price */}
            <div className="text-right">
              <p className="text-lg sm:text-xl font-bold text-gray-900">
                {formatPrice(cartItem.size.price * cartItem.quantity)}
              </p>
              {cartItem.quantity > 1 && (
                <p className="text-sm text-gray-500">{formatPrice(cartItem.size.price)} each</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function CategoryPageContent() {
  const searchParams = useSearchParams()
  const category = searchParams.get("category") || "sanitary"

  const [viewMode, setViewMode] = useState("grid")
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
  const [quickViewProduct, setQuickViewProduct] = useState<any>(null)
  const [hasFilterChanges, setHasFilterChanges] = useState(false)
  const [editingSizeFor, setEditingSizeFor] = useState<string | null>(null)

  // Get current category config and products
  const currentConfig = categoryConfigs[category as keyof typeof categoryConfigs] || categoryConfigs.sanitary
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
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
    const matchesThickness = selectedThickness.length === 0 || selectedThickness.includes(product.thickness)
    const matchesFinish = selectedFinish.length === 0 || selectedFinish.includes(product.finish)
    const matchesFeatures =
      selectedFeatures.length === 0 || selectedFeatures.some((feature) => product.features.includes(feature))
    const matchesBrands = selectedBrands.length === 0 || selectedBrands.includes(product.brand)

    return matchesSearch && matchesPrice && matchesThickness && matchesFinish && matchesFeatures && matchesBrands
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
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

  const removeFromCart = (cartKey: string) => {
    setCart((prev) => {
      const newCart = { ...prev }
      delete newCart[cartKey]
      return newCart
    })
  }

  const updateCartQuantity = (cartKey: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartKey)
    } else {
      setCart((prev) => ({
        ...prev,
        [cartKey]: {
          ...prev[cartKey],
          quantity,
        },
      }))
    }
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
    <div className="space-y-4 py-4">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">{title}</h3>
      {children}
    </div>
  )

  const DesktopFilterContent = () => (
    <div className="space-y-1">
      {/* Price Range */}
      <FilterSection title="Price Range">
        <div className="space-y-4">
          <Slider value={priceRange} onValueChange={setPriceRange} max={800} step={5} className="w-full" />
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>{formatPrice(priceRange[0])}</span>
            <span>{formatPrice(priceRange[1])}</span>
          </div>
        </div>
      </FilterSection>

      <Separator className="bg-gray-200" />

      {/* Thickness Filter */}
      <FilterSection title="Thickness">
        <div className="space-y-3">
          {currentFilterOptions.thickness.map((thickness) => (
            <div key={thickness} className="flex items-center space-x-3">
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
                className="h-5 w-5 rounded-sm border-gray-300 data-[state=checked]:bg-black data-[state=checked]:border-black"
              />
              <Label htmlFor={`thickness-${thickness}`} className="text-sm font-normal text-gray-700 cursor-pointer">
                {thickness}
              </Label>
            </div>
          ))}
        </div>
      </FilterSection>

      <Separator className="bg-gray-200" />

      {/* Finish Filter */}
      <FilterSection title="Finish">
        <div className="space-y-3">
          {currentFilterOptions.finish.map((finish) => (
            <div key={finish} className="flex items-center space-x-3">
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
                className="h-5 w-5 rounded-sm border-gray-300 data-[state=checked]:bg-black data-[state=checked]:border-black"
              />
              <Label htmlFor={`finish-${finish}`} className="text-sm font-normal text-gray-700 cursor-pointer">
                {finish}
              </Label>
            </div>
          ))}
        </div>
      </FilterSection>

      <Separator className="bg-gray-200" />

      {/* Features Filter */}
      <FilterSection title="Features">
        <div className="space-y-3">
          {currentFilterOptions.features.map((feature) => (
            <div key={feature} className="flex items-center space-x-3">
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
                className="h-5 w-5 rounded-sm border-gray-300 data-[state=checked]:bg-black data-[state=checked]:border-black"
              />
              <Label htmlFor={`feature-${feature}`} className="text-sm font-normal text-gray-700 cursor-pointer">
                {feature}
              </Label>
            </div>
          ))}
        </div>
      </FilterSection>

      <Separator className="bg-gray-200" />

      {/* Brands Filter */}
      <FilterSection title="Brands">
        <div className="space-y-3">
          {currentFilterOptions.brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-3">
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
                className="h-5 w-5 rounded-sm border-gray-300 data-[state=checked]:bg-black data-[state=checked]:border-black"
              />
              <Label htmlFor={`brand-${brand}`} className="text-sm font-normal text-gray-700 cursor-pointer">
                {brand}
              </Label>
            </div>
          ))}
        </div>
      </FilterSection>
    </div>
  )

  const MobileFilterContent = () => (
    <div className="space-y-1">
      {/* Price Range */}
      <FilterSection title="Price Range">
        <div className="space-y-4">
          <Slider value={tempPriceRange} onValueChange={setTempPriceRange} max={800} step={5} className="w-full" />
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>{formatPrice(tempPriceRange[0])}</span>
            <span>{formatPrice(tempPriceRange[1])}</span>
          </div>
        </div>
      </FilterSection>

      <Separator className="bg-gray-200" />

      {/* Thickness Filter */}
      <FilterSection title="Thickness">
        <div className="space-y-3">
          {currentFilterOptions.thickness.map((thickness) => (
            <div key={thickness} className="flex items-center space-x-3">
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
                className="h-5 w-5 rounded-sm border-gray-300 data-[state=checked]:bg-black data-[state=checked]:border-black"
              />
              <Label
                htmlFor={`temp-thickness-${thickness}`}
                className="text-sm font-normal text-gray-700 cursor-pointer"
              >
                {thickness}
              </Label>
            </div>
          ))}
        </div>
      </FilterSection>

      <Separator className="bg-gray-200" />

      {/* Finish Filter */}
      <FilterSection title="Finish">
        <div className="space-y-3">
          {currentFilterOptions.finish.map((finish) => (
            <div key={finish} className="flex items-center space-x-3">
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
                className="h-5 w-5 rounded-sm border-gray-300 data-[state=checked]:bg-black data-[state=checked]:border-black"
              />
              <Label htmlFor={`temp-finish-${finish}`} className="text-sm font-normal text-gray-700 cursor-pointer">
                {finish}
              </Label>
            </div>
          ))}
        </div>
      </FilterSection>

      <Separator className="bg-gray-200" />

      {/* Features Filter */}
      <FilterSection title="Features">
        <div className="space-y-3">
          {currentFilterOptions.features.map((feature) => (
            <div key={feature} className="flex items-center space-x-3">
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
                className="h-5 w-5 rounded-sm border-gray-300 data-[state=checked]:bg-black data-[state=checked]:border-black"
              />
              <Label htmlFor={`temp-feature-${feature}`} className="text-sm font-normal text-gray-700 cursor-pointer">
                {feature}
              </Label>
            </div>
          ))}
        </div>
      </FilterSection>

      <Separator className="bg-gray-200" />

      {/* Brands Filter */}
      <FilterSection title="Brands">
        <div className="space-y-3">
          {currentFilterOptions.brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-3">
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
                className="h-5 w-5 rounded-sm border-gray-300 data-[state=checked]:bg-black data-[state=checked]:border-black"
              />
              <Label htmlFor={`temp-brand-${brand}`} className="text-sm font-normal text-gray-700 cursor-pointer">
                {brand}
              </Label>
            </div>
          ))}
        </div>
      </FilterSection>
    </div>
  )

  return (
    <div className="min-h-screen bg-white pt-16 sm:pt-20 lg:pt-24">
      {/* Hero Section */}
      <section
        className={`relative overflow-hidden bg-gradient-to-br ${currentConfig.gradient} py-12 sm:py-16 lg:py-20`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Back Button */}
            <div className="mb-6 flex justify-center">
              <Link
                href="/shop"
                className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to All Categories
              </Link>
            </div>

            <div className="mb-4 flex justify-center">
              <Badge className={`px-4 py-2 ${currentConfig.badge.className}`}>
                <currentConfig.badge.icon className="mr-2 h-4 w-4" />
                {currentConfig.badge.text}
              </Badge>
            </div>
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl">
              {currentConfig.title}
            </h1>
            <p className="mx-auto mb-8 max-w-3xl text-base text-gray-600 sm:text-lg md:text-xl">
              {currentConfig.description}
            </p>

            {/* Key Features */}
            <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
              {currentConfig.features.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900">{feature.label}</h3>
                  <p className="text-xs text-gray-600">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-4">
            {/* Desktop Sidebar Filters */}
            <div className="hidden lg:block">
              <div className="sticky top-24 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                  {activeFiltersCount > 0 && (
                    <Button
                      variant="ghost"
                      onClick={clearAllFilters}
                      className="h-auto p-0 text-sm text-gray-500 hover:text-gray-700"
                    >
                      Clear All ({activeFiltersCount})
                    </Button>
                  )}
                </div>
                <DesktopFilterContent />
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Search and Controls */}
              <div className="mb-6 space-y-4">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder={`Search ${category} acrylic products...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 rounded-xl border-gray-200"
                  />
                </div>

                {/* Mobile Controls */}
                <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                  {/* Mobile Filter Button */}
                  <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                    <SheetTrigger asChild>
                      <Button
                        variant="outline"
                        className="relative rounded-xl border-gray-200 lg:hidden bg-transparent"
                      >
                        <SlidersHorizontal className="mr-2 h-4 w-4" />
                        Filters
                        {activeFiltersCount > 0 && (
                          <Badge className="ml-2 h-5 w-5 rounded-full bg-black p-0 text-xs text-white">
                            {activeFiltersCount}
                          </Badge>
                        )}
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[300px] sm:w-[400px] flex flex-col p-0">
                      <SheetHeader className="border-b border-gray-200 px-6 py-4">
                        <div className="flex items-center justify-between">
                          <SheetTitle className="text-lg font-semibold">Filters</SheetTitle>
                          <Button
                            variant="ghost"
                            onClick={resetTempFilters}
                            className="h-auto p-0 text-sm text-gray-500 hover:text-gray-700"
                          >
                            Clear All
                          </Button>
                        </div>
                      </SheetHeader>

                      {/* Scrollable Filter Content */}
                      <div className="flex-1 overflow-y-auto px-6 py-4">
                        <MobileFilterContent />
                      </div>

                      {/* Fixed Apply Button */}
                      {hasFilterChanges && (
                        <div className="border-t border-gray-200 bg-white px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <Button
                              variant="outline"
                              onClick={() => setIsFilterOpen(false)}
                              className="flex-1 rounded-xl"
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={applyFilters}
                              className="flex-1 rounded-xl bg-black text-white hover:bg-gray-800"
                            >
                              Apply Filters
                            </Button>
                          </div>
                        </div>
                      )}
                    </SheetContent>
                  </Sheet>

                  {/* Controls Row */}
                  <div className="flex items-center space-x-3">
                    {/* View Mode Toggle */}
                    <div className="hidden rounded-xl border border-gray-200 p-1 sm:flex">
                      <button
                        onClick={() => setViewMode("grid")}
                        className={`rounded-lg p-2 transition-colors ${
                          viewMode === "grid" ? "bg-black text-white" : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        <Grid3X3 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setViewMode("list")}
                        className={`rounded-lg p-2 transition-colors ${
                          viewMode === "list" ? "bg-black text-white" : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        <List className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Sort Dropdown */}
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-32 rounded-xl border-gray-200 sm:w-48">
                        <ArrowUpDown className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="featured">Featured</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="rating">Highest Rated</SelectItem>
                        <SelectItem value="newest">Newest</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Results Count */}
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm text-gray-600 sm:text-base">
                  Showing <span className="font-medium">{sortedProducts.length}</span> of{" "}
                  <span className="font-medium">{products.length}</span> products
                </p>
                {activeFiltersCount > 0 && (
                  <Button
                    variant="ghost"
                    onClick={clearAllFilters}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Clear filters
                  </Button>
                )}
              </div>

              {/* Cart Items Display (Desktop optimized) */}
              {Object.keys(cart).length > 0 && (
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">
                      Shopping Cart ({Object.keys(cart).length} items)
                    </h3>
                    <Link href="/cart">
                      <Button variant="outline" className="rounded-full bg-transparent hover:bg-gray-50">
                        View Full Cart
                      </Button>
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                    {Object.entries(cart).map(([cartKey, cartItem]) => (
                      <CartItemDisplay
                        key={cartKey}
                        cartKey={cartKey}
                        cartItem={cartItem}
                        onUpdateQuantity={(quantity) => updateCartQuantity(cartKey, quantity)}
                        onRemoveItem={() => removeFromCart(cartKey)}
                        onEditSize={() => setEditingSizeFor(cartKey)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Products Grid/List */}
              {viewMode === "grid" ? (
                <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                  {sortedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isWishlisted={wishlist.includes(product.id)}
                      onToggleWishlist={() => toggleWishlist(product.id)}
                      cartQuantity={getCartQuantity(product.id)}
                      onUpdateCart={updateCart}
                      onQuickView={() => setQuickViewProduct(product)}
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-4 sm:space-y-6">
                  {sortedProducts.map((product) => (
                    <ProductListItem
                      key={product.id}
                      product={product}
                      isWishlisted={wishlist.includes(product.id)}
                      onToggleWishlist={() => toggleWishlist(product.id)}
                      cartQuantity={getCartQuantity(product.id)}
                      onUpdateCart={updateCart}
                    />
                  ))}
                </div>
              )}

              {/* No Results */}
              {sortedProducts.length === 0 && (
                <div className="py-12 text-center">
                  <div className="mx-auto mb-4 h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center">
                    <Search className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="mb-2 text-lg font-medium text-gray-900">No products found</h3>
                  <p className="mb-4 text-gray-600">Try adjusting your search or filter criteria</p>
                  <Button onClick={clearAllFilters} variant="outline" className="rounded-xl bg-transparent">
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Size Selection Modal */}
      <SizeSelectionModal
        product={quickViewProduct || (editingSizeFor ? cart[editingSizeFor]?.product : null)}
        isOpen={!!quickViewProduct || !!editingSizeFor}
        onClose={() => {
          setQuickViewProduct(null)
          setEditingSizeFor(null)
        }}
        onAddToCart={(size, quantity) => {
          if (editingSizeFor) {
            // Update existing cart item with new size
            const oldCartItem = cart[editingSizeFor]
            removeFromCart(editingSizeFor)
            const newCartKey = `${oldCartItem.product.id}-${size.name}`
            updateCart(newCartKey, { product: oldCartItem.product, size, quantity })
            setEditingSizeFor(null)
          } else if (quickViewProduct) {
            // Add new item to cart
            const cartKey = `${quickViewProduct.id}-${size.name}`
            updateCart(cartKey, { product: quickViewProduct, size, quantity })
            setQuickViewProduct(null)
          }
        }}
      />

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          isWishlisted={wishlist.includes(quickViewProduct.id)}
          onToggleWishlist={() => toggleWishlist(quickViewProduct.id)}
          cartQuantity={getCartQuantity(quickViewProduct.id)}
          onUpdateCart={updateCart}
        />
      )}
    </div>
  )
}

function ProductCard({
  product,
  isWishlisted,
  onToggleWishlist,
  cartQuantity,
  onUpdateCart,
  onQuickView,
}: {
  product: any
  isWishlisted: boolean
  onToggleWishlist: () => void
  cartQuantity: number
  onUpdateCart: (cartKey: string, cartData: any) => void
  onQuickView: () => void
}) {
  const [showSizeModal, setShowSizeModal] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  const handleAddToCartClick = () => {
    if (product.sizes && product.sizes.length > 1) {
      setShowSizeModal(true)
    } else {
      // If only one size, add directly
      const defaultSize = product.sizes?.[0] || { name: product.size, price: product.price }
      const cartKey = `${product.id}-${defaultSize.name}`
      onUpdateCart(cartKey, { product, size: defaultSize, quantity: 1 })
    }
  }

  const handleSizeSelection = (size: any, quantity: number) => {
    const cartKey = `${product.id}-${size.name}`
    onUpdateCart(cartKey, { product, size, quantity })
  }

  return (
    <>
      <div className="group relative overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 sm:rounded-3xl">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
          {/* Badges */}
          <div className="absolute left-3 top-3 z-10 flex flex-wrap gap-1 sm:left-4 sm:top-4">
            {product.badges.slice(0, 2).map((badge: string, index: number) => (
              <Badge
                key={index}
                className={`text-xs ${
                  badge === "Medical Grade"
                    ? "bg-green-100 text-green-800"
                    : badge === "FDA Approved"
                      ? "bg-blue-100 text-blue-800"
                      : badge === "Hospital Grade"
                        ? "bg-purple-100 text-purple-800"
                        : badge === "Antibacterial"
                          ? "bg-red-100 text-red-800"
                          : badge === "Premium"
                            ? "bg-purple-100 text-purple-800"
                            : badge === "LED Ready"
                              ? "bg-orange-100 text-orange-800"
                              : badge === "Industrial Grade"
                                ? "bg-slate-100 text-slate-800"
                                : "bg-gray-100 text-gray-800"
                }`}
              >
                {badge}
              </Badge>
            ))}
          </div>

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
              <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onQuickView}
              className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-white hover:scale-110 text-gray-700"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>

          {/* Stock Indicator */}
          <div className="absolute bottom-3 left-3 z-10 sm:bottom-4 sm:left-4">
            <Badge className={`text-xs ${product.inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
              {product.inStock ? `${product.stockCount} in stock` : "Out of stock"}
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
          {/* Rating & Reviews */}
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 sm:h-4 sm:w-4" />
              <span className="text-xs font-medium text-gray-700 sm:text-sm">{product.rating}</span>
              <span className="text-xs text-gray-500 sm:text-sm">({product.reviews})</span>
            </div>
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <Truck className="h-3 w-3" />
              <span>{product.delivery}</span>
            </div>
          </div>

          {/* Brand & Product Name */}
          <div className="mb-3">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{product.brand}</p>
            <Link href={`/product/${product.id}`}>
              <h3 className="font-semibold text-gray-900 transition-colors hover:text-gray-700 line-clamp-2 text-sm sm:text-base">
                {product.name}
              </h3>
            </Link>
            <p className="text-xs text-gray-600 sm:text-sm">
              {product.thickness} • {product.size}
            </p>
          </div>

          {/* Features */}
          <div className="mb-4 space-y-1">
            {product.features.slice(0, 2).map((feature: string, index: number) => (
              <div key={index} className="flex items-center space-x-1">
                <Check className="h-3 w-3 text-green-500" />
                <span className="text-xs text-gray-600">{feature}</span>
              </div>
            ))}
          </div>

          {/* Price */}
          <div className="mb-4 space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-gray-900 sm:text-xl">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-xs text-gray-500 line-through sm:text-sm">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            {product.discount && (
              <Badge className="bg-orange-100 text-orange-800 text-xs">{product.discount}% OFF</Badge>
            )}
          </div>

          {/* Add to Cart */}
          <div className="flex items-center space-x-2">
            {cartQuantity > 0 ? (
              <div className="flex items-center space-x-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-2">
                <span className="text-sm font-medium">{cartQuantity} in cart</span>
              </div>
            ) : (
              <Button
                onClick={handleAddToCartClick}
                className="flex-1 rounded-full bg-black text-white hover:bg-gray-800 text-sm"
                disabled={!product.inStock}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            )}
          </div>
        </div>
      </div>

      <SizeSelectionModal
        product={product}
        isOpen={showSizeModal}
        onClose={() => setShowSizeModal(false)}
        onAddToCart={handleSizeSelection}
      />
    </>
  )
}

function ProductListItem({
  product,
  isWishlisted,
  onToggleWishlist,
  cartQuantity,
  onUpdateCart,
}: {
  product: any
  isWishlisted: boolean
  onToggleWishlist: () => void
  cartQuantity: number
  onUpdateCart: (cartKey: string, cartData: any) => void
}) {
  const [showSizeModal, setShowSizeModal] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  const handleAddToCartClick = () => {
    if (product.sizes && product.sizes.length > 1) {
      setShowSizeModal(true)
    } else {
      // If only one size, add directly
      const defaultSize = product.sizes?.[0] || { name: product.size, price: product.price }
      const cartKey = `${product.id}-${defaultSize.name}`
      onUpdateCart(cartKey, { product, size: defaultSize, quantity: 1 })
    }
  }

  const handleSizeSelection = (size: any, quantity: number) => {
    const cartKey = `${product.id}-${size.name}`
    onUpdateCart(cartKey, { product, size, quantity })
  }

  return (
    <>
      <div className="flex items-center space-x-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100 transition-all hover:shadow-md sm:space-x-6 sm:rounded-3xl sm:p-6">
        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:h-24 sm:w-24">
          <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
          <div className="absolute top-1 right-1">
            <Badge className={`text-xs ${product.inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
              {product.inStock ? "✓" : "✗"}
            </Badge>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-col space-y-2 sm:flex-row sm:items-start sm:justify-between sm:space-y-0">
            <div className="min-w-0 flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="truncate text-base font-semibold text-gray-900 sm:text-lg">{product.name}</h3>
                {product.badges.slice(0, 1).map((badge: string, index: number) => (
                  <Badge key={index} className="bg-green-100 text-green-800 text-xs">
                    {badge}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-gray-600">
                {product.brand} • {product.thickness} • {product.size}
              </p>
              <div className="mt-2 flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-medium text-gray-700">{product.rating}</span>
                  <span className="text-xs text-gray-500">({product.reviews})</span>
                </div>
                <div className="flex items-center space-x-1 text-xs text-gray-500">
                  <Truck className="h-3 w-3" />
                  <span>{product.delivery}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between sm:flex-col sm:items-end sm:text-right">
              <div className="flex items-center space-x-2 sm:flex-col sm:items-end sm:space-x-0 sm:mb-2">
                <span className="text-lg font-bold text-gray-900">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-xs text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onToggleWishlist}
                  className={`h-8 w-8 rounded-full ${isWishlisted ? "text-red-500" : "text-gray-400"}`}
                >
                  <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
                </Button>

                {cartQuantity > 0 ? (
                  <div className="flex items-center space-x-1 rounded-full border border-gray-200 bg-gray-50 px-2 py-1">
                    <span className="text-sm font-medium">{cartQuantity} in cart</span>
                  </div>
                ) : (
                  <Button
                    onClick={handleAddToCartClick}
                    size="sm"
                    className="rounded-full bg-black text-white hover:bg-gray-800"
                    disabled={!product.inStock}
                  >
                    <ShoppingCart className="mr-1 h-3 w-3" />
                    Add
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <SizeSelectionModal
        product={product}
        isOpen={showSizeModal}
        onClose={() => setShowSizeModal(false)}
        onAddToCart={handleSizeSelection}
      />
    </>
  )
}

function QuickViewModal({
  product,
  onClose,
  isWishlisted,
  onToggleWishlist,
  cartQuantity,
  onUpdateCart,
}: {
  product: any
  onClose: () => void
  isWishlisted: boolean
  onToggleWishlist: () => void
  cartQuantity: number
  onUpdateCart: (cartKey: string, cartData: any) => void
}) {
  const [showSizeModal, setShowSizeModal] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  const handleAddToCartClick = () => {
    if (product.sizes && product.sizes.length > 1) {
      setShowSizeModal(true)
    } else {
      // If only one size, add directly
      const defaultSize = product.sizes?.[0] || { name: product.size, price: product.price }
      const cartKey = `${product.id}-${defaultSize.name}`
      onUpdateCart(cartKey, { product, size: defaultSize, quantity: 1 })
    }
  }

  const handleSizeSelection = (size: any, quantity: number) => {
    const cartKey = `${product.id}-${size.name}`
    onUpdateCart(cartKey, { product, size, quantity })
  }

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <div className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute right-4 top-4 z-10 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm"
          >
            <X className="h-4 w-4" />
          </Button>

          <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8">
            {/* Image */}
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
              <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  {product.badges.map((badge: string, index: number) => (
                    <Badge key={index} className="bg-green-100 text-green-800">
                      {badge}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-gray-500 uppercase tracking-wide">{product.brand}</p>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h2>
                <p className="text-gray-600">{product.description}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{product.rating}</span>
                </div>
                <span className="text-gray-500">({product.reviews} reviews)</span>
              </div>

              {/* Specifications */}
              <div>
                <h3 className="font-semibold mb-3">Specifications</h3>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="text-sm">
                      <span className="text-gray-500">{key}:</span>
                      <span className="ml-2 font-medium">{value as string}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <h3 className="font-semibold mb-3">Key Features</h3>
                <div className="grid grid-cols-2 gap-2">
                  {product.features.map((feature: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & Actions */}
              <div className="border-t pt-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
                  )}
                  {product.discount && <Badge className="bg-orange-100 text-orange-800">{product.discount}% OFF</Badge>}
                </div>

                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={onToggleWishlist}
                    className={`rounded-full ${isWishlisted ? "text-red-500 border-red-200" : ""}`}
                  >
                    <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
                  </Button>

                  {cartQuantity > 0 ? (
                    <div className="flex items-center space-x-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2">
                      <span className="font-medium">{cartQuantity} in cart</span>
                    </div>
                  ) : (
                    <Button
                      onClick={handleAddToCartClick}
                      className="flex-1 rounded-full bg-black text-white hover:bg-gray-800"
                      disabled={!product.inStock}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                  )}
                </div>

                <div className="mt-4 flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Truck className="h-4 w-4" />
                    <span>{product.delivery}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Shield className="h-4 w-4" />
                    <span>Certified Quality</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SizeSelectionModal
        product={product}
        isOpen={showSizeModal}
        onClose={() => setShowSizeModal(false)}
        onAddToCart={handleSizeSelection}
      />
    </>
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
