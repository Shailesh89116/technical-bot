"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ArrowRight, Plus } from "lucide-react"

const categories = [
  {
    id: "sanitary",
    title: "Sanitary Solutions",
    image: "/sanitary-banner.jpg",
    gradient: "black",
    textColor: "text-white",
    href: "/shop/sanitary",
  },
  {
    id: "interior",
    title: "Interior Design",
    image: "/interior.jpg",
    gradient: "from-slate-700 via-slate-800 to-slate-900",
    textColor: "text-white",
    href: "/shop/interior",
  },
  {
    id: "advertising",
    title: "Advertising Signage",
    image: "/signage.jpg",
    gradient: "from-slate-700 via-slate-800 to-slate-900",
    textColor: "text-white",
    href: "/shop/advertising",
  },
  {
    id: "building-materials",
    title: "Building Materials",
    image: "/shinkolite.jpg",
    gradient: "from-slate-700 via-slate-800 to-slate-900",
    textColor: "text-white",
    href: "/shop/building-materials",
  },
]

export function ProductCategories() {
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const [showScrollButtons, setShowScrollButtons] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const checkScrollState = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const scrollLeft = container.scrollLeft
      const maxScrollLeft = container.scrollWidth - container.clientWidth
      const hasOverflow = container.scrollWidth > container.clientWidth

      // Show buttons only when there's overflow (scrolling is needed)
      setShowScrollButtons(hasOverflow)

      // Update button states
      setCanScrollLeft(scrollLeft > 10) // Small threshold to avoid flickering
      setCanScrollRight(scrollLeft < maxScrollLeft - 10)
    }
  }

  const scrollLeft = () => {
    if (scrollContainerRef.current && canScrollLeft) {
      const container = scrollContainerRef.current
      const cardWidth = container.clientWidth < 768 ? 300 : container.clientWidth / 4
      container.scrollBy({
        left: -cardWidth,
        behavior: "smooth",
      })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current && canScrollRight) {
      const container = scrollContainerRef.current
      const cardWidth = container.clientWidth < 768 ? 300 : container.clientWidth / 4
      container.scrollBy({
        left: cardWidth,
        behavior: "smooth",
      })
    }
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      // Initial check
      checkScrollState()

      // Add event listeners
      const handleScroll = () => {
        requestAnimationFrame(checkScrollState)
      }

      const handleResize = () => {
        requestAnimationFrame(checkScrollState)
      }

      container.addEventListener("scroll", handleScroll, { passive: true })
      window.addEventListener("resize", handleResize, { passive: true })

      // Check on mount and after a short delay to ensure proper calculation
      const timeoutId = setTimeout(checkScrollState, 100)

      return () => {
        container.removeEventListener("scroll", handleScroll)
        window.removeEventListener("resize", handleResize)
        clearTimeout(timeoutId)
      }
    }
  }, [])

  return (
    <section className="bg-white py-8 md:py-12">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-12 md:mb-16 text-center">
          <h2 className="mb-4 text-3xl md:text-4xl lg:text-5xl font-semibold text-black tracking-tight">
            Get to know our acrylic.
          </h2>
          <p className="mx-auto max-w-3xl text-lg md:text-xl text-gray-600 font-light">
            Discover premium acrylic solutions engineered for excellence. Each category represents years of innovation
            and precision manufacturing.
          </p>
        </div>

        {/* Cards Container */}
        <div className="relative">
          {/* Scroll Container with proper mobile padding */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 md:gap-6 overflow-x-auto overflow-y-visible pl-4 pr-4 py-8 md:px-4 md:-mx-4"
            style={{
              scrollSnapType: "x mandatory",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex-shrink-0 w-[280px] md:w-[calc(25%-18px)]"
                style={{ scrollSnapAlign: "start" }}
              >
                <Link href={category.href} className="group block">
                  <div className="relative h-[400px] md:h-[500px] lg:h-[400px] overflow-hidden rounded-2xl md:rounded-3xl transition-all duration-500 ease-out will-change-transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/10 transform-gpu">
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <Image
                        src={category.image || "/placeholder.svg"}
                        alt={category.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-110 transform-gpu"
                        sizes="(max-width: 768px) 280px, 25vw"
                        priority={false}
                      />
                    </div>

                    {/* Gradient Overlay */}
                    <div
                      className={`absolute inset-0  bg-black opacity-40 hover:opacity-10 transition-opacity duration-500`}
                    />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8 lg:p-10 z-10">
                      {/* Top Content */}
                      <div className="flex-1">
                        <h3
                          className={`text-xl md:text-2xl lg:text-3xl font-bold ${category.textColor} mb-2 leading-tight transition-all duration-300`}
                        >
                          {category.title}
                        </h3>
                      </div>

                      {/* Bottom Content */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-white transition-all duration-300 group-hover:gap-3">
                          <span className="text-base md:text-lg font-medium">Shop Now</span>
                          <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:bg-white/30 group-hover:scale-110 will-change-transform">
                          <Plus className="w-4 h-4 md:w-5 md:h-5 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Navigation Arrows - Only show when scrolling is needed */}
          {showScrollButtons && (
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={scrollLeft}
                disabled={!canScrollLeft}
                className={`w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg flex items-center justify-center transition-all duration-300 will-change-transform transform-gpu ${
                  !canScrollLeft
                    ? "opacity-40 cursor-not-allowed scale-95"
                    : "hover:bg-gray-50 hover:shadow-xl hover:scale-110 active:scale-105"
                }`}
                aria-label="Previous categories"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
              </button>
              <button
                onClick={scrollRight}
                disabled={!canScrollRight}
                className={`w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg flex items-center justify-center transition-all duration-300 will-change-transform transform-gpu ${
                  !canScrollRight
                    ? "opacity-40 cursor-not-allowed scale-95"
                    : "hover:bg-gray-50 hover:shadow-xl hover:scale-110 active:scale-105"
                }`}
                aria-label="Next categories"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
              </button>
            </div>
          )}
        </div>

        {/* Bottom CTA */}

      </div>

      {/* Custom Styles */}
      <style jsx>{`
        /* Hide scrollbar completely */
        div[ref] {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        div[ref]::-webkit-scrollbar {
          display: none;
        }
        
        /* Smooth scrolling for all browsers */
        * {
          scroll-behavior: smooth;
        }
        
        /* Prevent layout shift during transforms */
        .group:hover {
          z-index: 10;
        }
      `}</style>
    </section>
  )
}
