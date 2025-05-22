/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { ChevronRight, Plus, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Product {
  id: number
  name: string
  image: string
  specs: string
  price: string
  category: string
}

interface ProductCardProps {
  product: Product
  index: number
  isSelected: boolean
  onSelect: () => void
}

export function FeaturedProducts() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, 100])

  const products = [
    {
      id: 1,
      name: "Clear 5mm Acrylic Sheet",
      image: "/img-1.png",
      specs: "5mm thickness, 4'×8' max size",
      price: "$89.99",
      category: "clear",
    },
    {
      id: 2,
      name: "Frosted 3mm Acrylic Sheet",
      image: "/img-2.png",
      specs: "3mm thickness, 4'×8' max size",
      price: "$69.99",
      category: "frosted",
    },
    {
      id: 3,
      name: "Blue Tinted 5mm Acrylic",
      image: "/img-3.png",
      specs: "5mm thickness, 4'×8' max size",
      price: "$99.99",
      category: "colored",
    },
    {
      id: 4,
      name: "Clear 10mm Acrylic Sheet",
      image: "/img-1.png",
      specs: "10mm thickness, 5'×10' max size",
      price: "$149.99",
      category: "clear",
    },
  ]

  const filteredProducts =
    activeCategory === "all" ? products : products.filter((product) => product.category === activeCategory)

  const categories = [
    { id: "all", label: "All Products" },
    { id: "clear", label: "Clear" },
    { id: "frosted", label: "Frosted" },
    { id: "colored", label: "Colored" },
  ]

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section ref={containerRef} className="relative py-32 px-4 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50 z-0" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div
          className="absolute rounded-full w-[500px] h-[500px] bg-gradient-to-r from-blue-50 to-purple-50 opacity-40 blur-3xl"
          style={{
            left: `${mousePosition.x * 0.05}px`,
            top: `${mousePosition.y * 0.05}px`,
          }}
        />
        <div
          className="absolute rounded-full w-[300px] h-[300px] bg-gradient-to-r from-amber-50 to-rose-50 opacity-30 blur-3xl"
          style={{
            right: `${mousePosition.x * 0.02}px`,
            bottom: `${mousePosition.y * 0.02}px`,
          }}
        />
      </div>

      <motion.div className="relative z-10 max-w-7xl mx-auto" style={{ opacity, y }}>
        <div className="flex flex-col items-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative mb-3"
          >
            <span className="inline-block px-4 py-1.5 bg-gray-900 bg-opacity-5 rounded-full text-xs uppercase tracking-widest font-medium text-gray-700 mb-4">
              Premium Selection
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl font-medium tracking-tight text-gray-900 mb-6 text-center max-w-4xl"
          >
            Exceptional Acrylic Sheets
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl text-gray-500 max-w-2xl text-center font-light leading-relaxed"
          >
            Meticulously crafted for precision and durability, our premium acrylic collection delivers unparalleled
            clarity and performance.
          </motion.p>
        </div>

        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center mb-12 overflow-x-auto pb-2 scrollbar-hide"
          >
            <div className="inline-flex rounded-full bg-white p-1.5 shadow-lg shadow-gray-200/50 backdrop-blur-sm">
              {categories.map((category, index) => (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={cn(
                    "relative px-8 py-3 text-sm font-medium rounded-full transition-all duration-500",
                    activeCategory === category.id ? "text-white" : "text-gray-500 hover:text-gray-800",
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {activeCategory === category.id && (
                    <motion.div
                      layoutId="categoryBackground"
                      className="absolute inset-0 bg-gray-900 rounded-full"
                      initial={false}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{category.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10"
            >
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  isSelected={selectedProduct === product.id}
                  onSelect={() => setSelectedProduct(product.id === selectedProduct ? null : product.id)}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-center mt-20"
        >
          <Button
            asChild
            variant="outline"
            className="group text-gray-900 border-gray-200 hover:border-gray-900 hover:text-white hover:bg-gray-900 px-10 py-7 text-base rounded-full transition-all duration-300"
          >
            <Link href="/shop">
              <span className="flex items-center">
                Explore complete collection
                <motion.div initial={{ x: 0 }} whileHover={{ x: 5 }} transition={{ duration: 0.3 }}>
                  <ChevronRight className="ml-2 h-5 w-5" />
                </motion.div>
              </span>
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}

function ProductCard({ product, index, isSelected, onSelect }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.1 + 0.3, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -10 }}
      className="group relative"
    >
      <div
        className={cn(
          "absolute inset-0 -m-4 rounded-3xl bg-gradient-to-b from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10",
          isSelected ? "opacity-100" : "",
        )}
      />

      <div className="overflow-hidden rounded-2xl bg-white shadow-xl shadow-gray-200/50 transition-all duration-500 group-hover:shadow-2xl">
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <div className="absolute inset-0 bg-gradient-to-tr from-gray-900/5 to-gray-900/0 z-10" />

          <Image
            src={product.image || "/placeholder.svg?height=600&width=600"}
            alt={product.name}
            width={600}
            height={600}
            className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
          />

          <motion.button
            onClick={onSelect}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="absolute top-4 right-4 z-20 rounded-full bg-white/90 p-2.5 shadow-md backdrop-blur-sm transition-all duration-300 hover:bg-gray-900 hover:text-white"
          >
            <Plus className="h-4 w-4" />
          </motion.button>

          <AnimatePresence>
            {isSelected && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm p-4 z-20"
              >
                <Button className="w-full rounded-full bg-gray-900 hover:bg-gray-800 text-white" size="sm">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to cart
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="p-6">
          <div className="mb-4">
            <h3 className="font-medium text-xl text-gray-900 mb-1.5 truncate whitespace-nowrap overflow-hidden">
              {product.name}
            </h3>
            <p className="text-sm text-gray-500">{product.specs}</p>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-medium text-xl text-gray-900">{product.price}</span>
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="rounded-full hover:bg-gray-100 text-gray-900 group/btn"
            >
              <Link href={`/product/${product.id}`}>
                <span className="flex items-center">
                  Details
                  <motion.div initial={{ x: 0 }} whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
                    <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
                  </motion.div>
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
