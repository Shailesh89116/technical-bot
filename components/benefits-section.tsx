"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue } from "framer-motion"
import { LightbulbIcon, ShieldCheck, Ruler, Palette, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export function BenefitsSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Create motion values for mouse position
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Transform mouse position for subtle parallax effect
  const backgroundX1 = useTransform(mouseX, [0, 1000], [-50, 50])
  const backgroundY1 = useTransform(mouseY, [0, 1000], [-50, 50])
  const backgroundX2 = useTransform(mouseX, [0, 1000], [30, -30])
  const backgroundY2 = useTransform(mouseY, [0, 1000], [30, -30])

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, 100])

  const benefits = [
    {
      icon: LightbulbIcon,
      title: "High Light Transmission",
      description: "92% light transmission for crystal clear visibility in all environments.",
      details:
        "Our premium acrylic sheets allow more light to pass through than standard glass, creating brighter, more vibrant environments. Perfect for displays, signage, and architectural applications where clarity is essential.",
      color: "from-amber-400/10 to-amber-500/10",
      iconColor: "text-amber-500",
      accentColor: "bg-amber-500",
    },
    {
      icon: ShieldCheck,
      title: "UV Resistance",
      description: "UV-stabilized for outdoor use with long-lasting clarity and protection.",
      details:
        "Advanced UV stabilizers are integrated throughout the material, not just coated on the surface, ensuring lasting protection against sun damage. Maintains optical clarity for years, even in harsh outdoor environments.",
      color: "from-emerald-400/10 to-emerald-500/10",
      iconColor: "text-emerald-500",
      accentColor: "bg-emerald-500",
    },
    {
      icon: Ruler,
      title: "Easy Fabrication",
      description: "Simple to cut, drill, and form with standard tools while maintaining integrity.",
      details:
        "Unlike other materials that require specialized equipment, our acrylic can be worked with conventional tools. Precision cutting, drilling, and thermoforming can be achieved with minimal risk of cracking or chipping.",
      color: "from-blue-400/10 to-blue-500/10",
      iconColor: "text-blue-500",
      accentColor: "bg-blue-500",
    },
    {
      icon: Palette,
      title: "Range of Options",
      description: "Multiple thicknesses, colors, and finishes to suit any project requirements.",
      details:
        "From crystal clear to vibrant colors, matte to high-gloss finishes, and thicknesses from 2mm to 25mm, our extensive range ensures you'll find the perfect acrylic for any application, all with the same premium quality.",
      color: "from-purple-400/10 to-purple-500/10",
      iconColor: "text-purple-500",
      accentColor: "bg-purple-500",
    },
  ]

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        // Update motion values instead of state
        mouseX.set(e.clientX - rect.left)
        mouseY.set(e.clientY - rect.top)
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  const handleCardClick = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <section ref={containerRef} className="relative md:py-16 py-0 px-4 overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50 z-0" />

      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <motion.div
          className="absolute rounded-full w-[800px] h-[800px] bg-gradient-to-r from-gray-50 to-blue-50 opacity-20 blur-3xl"
          style={{
            x: backgroundX1,
            y: backgroundY1,
          }}
        />
        <motion.div
          className="absolute rounded-full w-[600px] h-[600px] bg-gradient-to-r from-amber-50 to-rose-50 opacity-10 blur-3xl"
          style={{
            x: backgroundX2,
            y: backgroundY2,
          }}
        />
      </div>

      <motion.div className="relative z-10 max-w-7xl mx-auto" style={{ opacity, y }}>
        <div className="flex flex-col items-center mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl font-medium tracking-tight text-gray-900 mb-6 text-center max-w-4xl"
          >
            Why our acrylic stands apart
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl text-gray-500 max-w-2xl text-center font-light leading-relaxed"
          >
            Meticulously crafted for precision and durability, delivering unparalleled clarity and performance.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.1 + 0.3, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{
                y: expandedIndex === null ? -5 : 0,
                transition: { duration: 0.3 },
              }}
              onClick={() => handleCardClick(index)}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              className={cn(
                "group relative cursor-pointer transition-all duration-700",
                expandedIndex === index ? "lg:col-span-4 md:col-span-2" : "",
              )}
            >
              <AnimatePresence mode="wait">
                {expandedIndex === index ? (
                  <motion.div
                    key="expanded"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden rounded-2xl bg-white shadow-lg shadow-gray-200/50 h-full"
                  >
                    <div className="flex flex-col md:flex-row h-full">
                      <div className={cn("p-8 md:p-12 md:w-1/3 bg-gradient-to-br", benefit.color)}>
                        <div className="flex flex-col h-full justify-between">
                          <div>
                            <div className="relative mb-8">
                              <div className="absolute inset-0 rounded-full bg-white/80 blur-md transform scale-110" />
                              <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-md backdrop-blur-sm">
                                <motion.div
                                  animate={{
                                    rotate: [0, 5, 0, -5, 0],
                                    scale: [1, 1.05, 1, 1.05, 1],
                                  }}
                                  transition={{
                                    duration: 6,
                                    repeat: Number.POSITIVE_INFINITY,
                                    repeatType: "loop",
                                  }}
                                >
                                  <benefit.icon className={cn("h-8 w-8", benefit.iconColor)} />
                                </motion.div>
                              </div>
                            </div>
                            <h3 className="mb-4 text-2xl font-medium text-gray-900">{benefit.title}</h3>
                            <p className="text-gray-700 text-lg font-light leading-relaxed mb-6">
                              {benefit.description}
                            </p>
                          </div>

                          <motion.button
                            whileHover={{ x: -5 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={(e) => {
                              e.stopPropagation()
                              setExpandedIndex(null)
                            }}
                            className="flex items-center text-gray-900 font-medium"
                          >
                            <ArrowRight className="mr-2 h-5 w-5 rotate-180" />
                            <span>Back</span>
                          </motion.button>
                        </div>
                      </div>

                      <div className="p-8 md:p-12 md:w-2/3 flex flex-col justify-center">
                        <div className="max-w-2xl">
                          <p className="text-gray-700 text-lg leading-relaxed mb-8">{benefit.details}</p>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {[1, 2, 3].map((item) => (
                              <motion.div
                                key={item}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: item * 0.1 }}
                                className="bg-gray-50 rounded-xl p-6 shadow-sm"
                              >
                                <div className={cn("w-8 h-0.5 mb-4 rounded-full", benefit.accentColor)} />
                                <h5 className="font-medium text-gray-900 mb-2">Feature {item}</h5>
                                <p className="text-sm text-gray-500">
                                  Additional information about this specific feature.
                                </p>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="collapsed"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full"
                  >
                    <div
                      className={cn(
                        "absolute inset-0 -m-4 rounded-3xl bg-gradient-to-b from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10",
                        activeIndex === index ? "opacity-100" : "",
                      )}
                    />

                    <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-white shadow-md shadow-gray-200/30 transition-all duration-500 group-hover:shadow-lg h-full">
                      <div className="relative mb-6">
                        {/* Icon container with subtle effect */}
                        <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-white to-gray-50 shadow-md shadow-gray-200/30 backdrop-blur-sm transform transition-all duration-500">
                          <motion.div
                            animate={{
                              rotate: [0, 3, 0, -3, 0],
                              scale: [1, 1.03, 1, 1.03, 1],
                            }}
                            transition={{
                              duration: 6,
                              repeat: Number.POSITIVE_INFINITY,
                              repeatType: "loop",
                            }}
                          >
                            <benefit.icon className={cn("h-7 w-7", benefit.iconColor)} />
                          </motion.div>
                        </div>
                      </div>

                      <h3 className="mb-3 text-xl font-medium text-gray-900">{benefit.title}</h3>

                      <p className="text-gray-500 text-base font-light leading-relaxed">{benefit.description}</p>

                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "20%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className={cn("h-px rounded-full mt-6", benefit.accentColor)}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
