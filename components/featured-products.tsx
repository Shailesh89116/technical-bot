/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { ChevronRight, Plus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Product {
  id: number;
  name: string;
  image: string;
  specs: string;
  price: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
}

export function FeaturedProducts() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, 100]);

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
  ];

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((product) => product.category === activeCategory);

  const categories = [
    { id: "all", label: "All Products" },
    { id: "clear", label: "Clear" },
    { id: "frosted", label: "Frosted" },
    { id: "colored", label: "Colored" },
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="bg-white text-black">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-2 text-4xl font-semibold md:text-5xl">
            Premium Acrylic Series
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-500">
            Engineered for perfection. Designed for innovation.
          </p>
        </div>

        {/* Product 1 - Apple Style */}
        <div className="mb-32 grid items-center gap-8 md:grid-cols-2 md:gap-12">
          <div className="order-2 md:order-1">
            <h3 className="mb-2 text-3xl font-semibold">Heat Cut Series</h3>
            <p className="mb-4 text-xl text-gray-500">
              92% light transmission. 100% clarity.
            </p>
            <p className="mb-6 text-lg leading-relaxed text-gray-600">
              Able to reduce up to 5°C of under roof heat from the sun and decrease 48-49% of infrared radiation. Help reduce energy consumption. Creating beautifully modern,
              open and airy space, protected from heat and rain. For any shaded area you may want to add to your space.
            </p>
            <div className="flex items-center gap-6 text-lg text-blue-500">
              <Link
                href="/shop/clear"
                className="flex items-center hover:underline"
              >
                Shop Heat Cut Series <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
              <Link
                href="/specs/clear"
                className="flex items-center hover:underline"
              >
                View specs <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
            <div className="order-1 md:order-2">
                <div className="relative aspect-[4/3] md:aspect-[3/2] overflow-hidden rounded-2xl md:rounded-3xl bg-gray-100 group">
                  <Image
                    src="/heatcut.jpg"
                    alt="Clear Acrylic Sheet"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
        </div>

      {/* Product 2 - Frosted Acrylic */}
          <div className="mb-20 md:mb-32 animate-slide-up-delay">
            <div className="grid gap-6 md:gap-8 lg:gap-12 md:grid-cols-2 items-center">
              <div className="order-1">
                <div className="relative aspect-[4/3] md:aspect-[3/2] overflow-hidden rounded-2xl md:rounded-3xl bg-gray-100 group">
                 <Image
                    src="/prime.jpg"
                    alt="Clear Acrylic Sheet"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
              <div className="order-2">
                <h3 className="mb-2 text-2xl md:text-3xl font-semibold">Frosted Acrylic</h3>
                <p className="mb-4 text-xl text-gray-500">
              Elegant diffusion. Sophisticated finish.
            </p>
            <p className="mb-6 text-lg leading-relaxed text-gray-600">
              Our frosted acrylic creates a premium, ethereal glow while
              maintaining structural integrity. Perfect for lighting and
              architectural applications.
            </p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 text-base md:text-lg text-blue-500">
                  <Link
                    href="/shop/frosted"
                    className="flex items-center hover:underline transition-all duration-300 hover:text-blue-600 group"
                  >
                    Shop Frosted{" "}
                    <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/specs/frosted"
                    className="flex items-center hover:underline transition-all duration-300 hover:text-blue-600 group"
                  >
                    View specs{" "}
                    <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        {/* Product 3 - Apple Style */}
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
          <div className="order-2 md:order-1">
            <h3 className="mb-2 text-3xl font-semibold">Superior Series</h3>
            <p className="mb-4 text-xl text-gray-500">
              Bold. Sophisticated. Timeless.
            </p>
            <p className="mb-6 text-lg leading-relaxed text-gray-600">
              Distinctively beautiful and easy on the eyes, at an affordable price. Suitable for areas that require natural light. Letting in just the right amount of light and block away harmful UV.
            </p>
            <div className="flex items-center gap-6 text-lg text-blue-500">
              <Link
                href="/shop/black"
                className="flex items-center hover:underline"
              >
                Shop Black <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
              <Link
                href="/specs/black"
                className="flex items-center hover:underline"
              >
                View specs <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
            <div className="order-1 md:order-2">
                <div className="relative aspect-[4/3] md:aspect-[3/2] overflow-hidden rounded-2xl md:rounded-3xl bg-gray-100 group">
                  <Image
                    src="/superior.jpg"
                    alt="Clear Acrylic Sheet"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
        </div>
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
              <motion.div
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronRight className="ml-2 h-5 w-5" />
              </motion.div>
            </span>
          </Link>
        </Button>
      </motion.div>
    </section>
  );
}

function ProductCard({
  product,
  index,
  isSelected,
  onSelect,
}: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        delay: index * 0.1 + 0.3,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -10 }}
      className="group relative"
    >
      <div
        className={cn(
          "absolute inset-0 -m-4 rounded-3xl bg-gradient-to-b from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10",
          isSelected ? "opacity-100" : ""
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
        </div>

        <div className="p-6">
          <div className="mb-4">
            <h3 className="font-medium text-xl text-gray-900 mb-1.5 truncate whitespace-nowrap overflow-hidden">
              {product.name}
            </h3>
            <p className="text-sm text-gray-500">{product.specs}</p>
          </div>

          <div className="flex items-center">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="rounded-full hover:bg-gray-100 text-gray-900 group/btn px-0"
            >
              <Link href={`/product/${product.id}`}>
                <span className="flex items-center">
                  Details
                  <motion.div
                    initial={{ x: 0 }}
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
                  </motion.div>
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
