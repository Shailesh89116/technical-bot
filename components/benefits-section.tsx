"use client"

import { useRef, useEffect } from "react"
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue } from "framer-motion"
import { Shield, Heart, Wrench, Users } from "lucide-react"
import { cn } from "@/lib/utils"

export function BenefitsSection() {
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
      icon: Shield,
      title: "Durability",
      description:
        "17x stronger than glass with exceptional impact resistance. Built to last for decades without yellowing or cracking.",
      color: "from-amber-400/10 to-amber-500/10",
      iconColor: "text-amber-500",
      accentColor: "bg-amber-500",
    },
    {
      icon: Heart,
      title: "Safety",
      description:
        "Shatter-resistant material that breaks into large, dull pieces instead of sharp fragments. Safer for all environments.",
      color: "from-emerald-400/10 to-emerald-500/10",
      iconColor: "text-emerald-500",
      accentColor: "bg-emerald-500",
    },
    {
      icon: Wrench,
      title: "Easy Installation",
      description: "Lightweight and easy to cut, drill, and shape. No special tools required for most applications.",
      color: "from-blue-400/10 to-blue-500/10",
      iconColor: "text-blue-500",
      accentColor: "bg-blue-500",
    },
    {
      icon: Users,
      title: "Child Safe",
      description:
        "Smooth, rounded edges and non-toxic materials. Perfect for schools, playgrounds, and family environments.",
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

  return (
    <section ref={containerRef} className="relative py-8 md:py-16 px-3 md:px-4 overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50 z-0" />

      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <motion.div
          className="absolute rounded-full w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-gradient-to-r from-gray-50 to-blue-50 opacity-20 blur-3xl"
          style={{
            x: backgroundX1,
            y: backgroundY1,
          }}
        />
        <motion.div
          className="absolute rounded-full w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-gradient-to-r from-amber-50 to-rose-50 opacity-10 blur-3xl"
          style={{
            x: backgroundX2,
            y: backgroundY2,
          }}
        />
      </div>

      <motion.div className="relative z-10 max-w-7xl mx-auto" style={{ opacity, y }}>
        <div className="flex flex-col items-center mb-12 md:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl md:text-4xl lg:text-6xl font-medium tracking-tight text-gray-900 mb-4 md:mb-6 text-center max-w-4xl px-2"
          >
            Why our Acrylic stands apart
          </motion.h2>
        </div>

        {/* Mobile-first grid: 2 columns on mobile, 4 on large screens */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 lg:gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.1 + 0.3, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{
                y: 0,
                transition: { duration: 0.3 },
              }}
              className={cn("group relative transition-all duration-700")}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key="collapsed"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full"
                >
                  <div
                    className={cn(
                      "absolute inset-0 -m-2 md:-m-4 rounded-2xl md:rounded-3xl bg-gradient-to-b from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10",
                    )}
                  />
                  <div className="flex flex-col items-center text-center p-3 md:p-6 lg:p-8 rounded-xl md:rounded-2xl bg-white shadow-md shadow-gray-200/30 transition-all duration-500 group-hover:shadow-lg h-full">
                    <div className="relative mb-3 md:mb-6">
                      {/* Icon container with subtle effect */}
                      <div className="relative flex items-center justify-center w-10 h-10 md:w-14 lg:w-16 md:h-14 lg:h-16 rounded-full bg-gradient-to-br from-white to-gray-50 shadow-md shadow-gray-200/30 backdrop-blur-sm transform transition-all duration-500">
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
                          <benefit.icon className={cn("h-5 w-5 md:h-6 lg:h-7 md:w-6 lg:w-7", benefit.iconColor)} />
                        </motion.div>
                      </div>
                    </div>
                    <h3 className="mb-2 md:mb-3 text-sm md:text-lg lg:text-xl font-medium text-gray-900 leading-tight">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-500 text-xs md:text-sm lg:text-base font-light leading-relaxed">
                      {benefit.description}
                    </p>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "20%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className={cn("h-px rounded-full mt-3 md:mt-6", benefit.accentColor)}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
