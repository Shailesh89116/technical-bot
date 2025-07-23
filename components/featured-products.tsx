"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FeaturedProducts() {
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
              Able to reduce up to 5°C of under roof heat from the sun and
              decrease 48-49% of infrared radiation. Help reduce energy
              consumption. Creating beautifully modern, open and airy space,
              protected from heat and rain. For any shaded area you may want to
              add to your space.
            </p>
            <div className="flex items-center gap-6 text-lg text-blue-500">
              <Link
                href="/shop/heatcut"
                className="flex items-center hover:underline"
              >
                Shop Heat Cut Series <ChevronRight className="ml-1 h-4 w-4" />
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
              <h3 className="mb-2 text-2xl md:text-3xl font-semibold">
                Nature Series
              </h3>
              <p className="mb-4 text-xl text-gray-500">
                Close to Nature
              </p>
              <p className="mb-6 text-lg leading-relaxed text-gray-600">
                Distinctive with a beautiful and easy on the eye appearance, but at an affordable price. Suitable for areas that need natural light, filtering excess light and block harmfull radiation.
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 text-base md:text-lg text-blue-500">
                <Link
                  href="/shop/nature"
                  className="flex items-center hover:underline transition-all duration-300 hover:text-blue-600 group"
                >
                  Shop Nature Series{" "}
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
              Distinctively beautiful and easy on the eyes, at an affordable
              price. Suitable for areas that require natural light. Letting in
              just the right amount of light and block away harmful UV.
            </p>
            <div className="flex items-center gap-6 text-lg text-blue-500">
              <Link
                href="/shop/superior"
                className="flex items-center hover:underline"
              >
                Shop Superior Series <ChevronRight className="ml-1 h-4 w-4" />
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
