"use client"

import Link from "next/link"
import Image from "next/image"
import { Shield, Home, Megaphone, Building2 } from "lucide-react"

const categories = [
  {
    id: "sanitary",
    title: "Sanitary",
    subtitle: "Hygienic solutions",
    image: "/sanitary-banner.jpg",
    gradient: "from-blue-500/20 to-cyan-500/20",
    borderGradient: "from-blue-500 to-cyan-500",
    icon: Shield,
    href: "/shop/sanitary",
  },
  {
    id: "interior",
    title: "Interior",
    subtitle: "Design excellence",
    image: "/interior.jpeg",
    gradient: "from-green-500/20 to-emerald-500/20",
    borderGradient: "from-green-500 to-emerald-500",
    icon: Home,
    href: "/shop/interior",
  },
  {
    id: "advertising",
    title: "Advertising",
    subtitle: "Visual impact",
    image: "/advertise.jpg",
    gradient: "from-orange-500/20 to-red-500/20",
    borderGradient: "from-orange-500 to-red-500",
    icon: Megaphone,
    href: "/shop/advertising",
  },
  {
    id: "building-materials",
    title: "Building Materials",
    subtitle: "Structural strength",
    image: "/shinkolite.jpg",
    gradient: "from-purple-500/20 to-indigo-500/20",
    borderGradient: "from-purple-500 to-indigo-500",
    icon: Building2,
    href: "/shop/building-materials",
  },
]

export function ProductCategories() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 md:py-14">
        <div className="mb-12 md:mb-20 text-center">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-black tracking-tight mb-3 md:mb-4">
            Which acrylic is right for you?
          </h2>
          <p className="text-lg md:text-xl text-gray-600 font-light max-w-2xl mx-auto">
            Choose from our specialized acrylic solutions, each engineered for specific applications and performance
            requirements.
          </p>
        </div>

        {/* Mobile: 2x2 Grid, Desktop: 1x4 Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {categories.map((category) => {
  
            return (
              <Link key={category.id} href={category.href} className="group">
                <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-white border border-gray-100 transition-all duration-700 hover:border-transparent hover:shadow-2xl hover:shadow-black/10 hover:-translate-y-1 md:hover:-translate-y-2 h-auto cursor-pointer">
                  {/* Gradient Border on Hover */}
                  <div
                    className={`absolute inset-0 rounded-2xl md:rounded-3xl bg-gradient-to-br ${category.borderGradient} p-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  >
                    <div className="h-full w-full rounded-2xl md:rounded-3xl bg-white" />
                  </div>

                  {/* Content Container */}
                  <div className="relative p-4 md:p-8 h-full flex flex-col">
                    {/* Background Gradient */}
                    <div
                      className={`absolute inset-0 rounded-2xl md:rounded-3xl bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    />

                    {/* Icon */}
                  

                    {/* Image */}
                    <div className="relative mb-3 md:mb-6 aspect-[4/3] overflow-hidden rounded-xl md:rounded-2xl bg-gray-50 flex-shrink-0">
                      <Image
                        src={category.image || "/placeholder.svg"}
                        alt={`${category.title} acrylic applications`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* Text Content */}
                    <div className="relative flex-grow flex flex-col ">
                      <div>
                        <h3 className="text-lg md:text-lg lg:text-2xl font-semibold text-black mb-1 md:mb-2 group-hover:text-gray-800 transition-colors duration-300 leading-tight">
                          {category.title}
                        </h3>
                        <p className="text-xs md:text-base text-gray-500 font-light mb-2 md:mb-3 group-hover:text-gray-600 transition-colors duration-300">
                          {category.subtitle}
                        </p>
                      </div>

                      {/* Shop Now Button */}
                      <div className="md:mt-auto pt-2">
                        <div className="inline-flex items-center text-sm md:text-base font-medium text-blue-600 group-hover:text-blue-700 transition-colors duration-300">
                          <span>Shop Now</span>
                          <svg
                            className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                        <p className="text-xs text-gray-400 mt-1 group-hover:text-gray-500 transition-colors duration-300">
                          Click to explore
                        </p>
                      </div>
                    </div>

                    {/* Arrow Indicator - Now visible by default */}
                    <div className="absolute top-3 right-3 md:top-6 md:right-6 w-6 h-6 md:w-8 md:h-8 rounded-full bg-black/10 flex items-center justify-center opacity-60 group-hover:opacity-100 transition-all duration-300 group-hover:bg-black group-hover:scale-110">
                      <svg
                        className="w-3 h-3 md:w-4 md:h-4 text-gray-600 group-hover:text-white transition-colors duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="mt-12 md:mt-16 lg:mt-20 text-center">
          <div className="mb-6">
            <p className="text-base md:text-lg text-gray-600 font-light mb-4">
              Not sure which solution fits your project?
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center text-base md:text-lg text-blue-600 hover:text-blue-700 transition-colors duration-300 font-medium group"
            >
              Get expert consultation
              <svg
                className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Free consultation
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Custom solutions
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              Expert installation
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
