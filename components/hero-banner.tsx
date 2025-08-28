"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CarouselItem = {
  image: string;
  title: string;
  subtitle: string;
  textColor: string;
  textShadow?: boolean;
};

export function HeroBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout>(null);

  const carouselItems: CarouselItem[] = [
    {
      image: "/heatcut-banner.jpg",
      title: "Transparent Elegance",
      subtitle: "Premium acrylic roofing solutions for modern spaces",
      textColor: "text-white",
      // textShadow: true,
    },
    {
      image: "/shinkolite.jpg",
      title: "Luxury & Clarity",
      subtitle: "Transform your spaces with our premium acrylic solutions",
      textColor: "text-white",
    },
    {
      image: "/sanitary-banner.jpg",
      title: "Sanitary Acrylic",
      subtitle: "Smooth, strong & hygienic sheets for modern bathroom designs",
      textColor: "text-white",
      // textShadow: true,
    },
    {
      image: "/transparent-acrylic-roof-sheet-closeup-600nw-1498463228.webp",
      title: "Heat Cut Series",
      subtitle: "Advanced protection with superior clarity",
      textColor: "text-white",
      // textShadow: true,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
      }, 5000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, carouselItems.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + carouselItems.length) % carouselItems.length
    );
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
  };

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-16"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Carousel Images */}
      {carouselItems.map((item, index) => (
        <div
          key={index}
          className={`absolute inset-0 z-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="h-full w-full"
            style={{
              transform: `scale(${1 + scrollY * 0.0005}) translateY(${
                scrollY * 0.2
              }px)`,
              transition: "transform 0.1s ease-out",
            }}
          >
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
        </div>
      ))}

      {/* Content - Fixed positioning with high z-index */}
      <div
        className="relative z-50 flex flex-col items-center text-center pointer-events-none"
        style={{
          opacity: 1 - scrollY * 0.002,
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
      >
        {/* Dynamic Content */}
        {carouselItems.map((item, index) => (
          <div
            key={index}
            className={`transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0 absolute"
            }`}
          >
            <h1
              className={cn(
                "mb-2 text-5xl font-semibold tracking-tight md:text-6xl lg:text-7xl",
                item.textColor,
                item.textShadow && "text-shadow"
              )}
            >
              {item.title}
            </h1>
            <p
              className={cn(
                "mb-6 text-xl font-light md:text-2xl",
                item.textColor === "text-white"
                  ? "text-gray-200"
                  : "text-gray-700",
                item.textShadow && "text-shadow"
              )}
            >
              {item.subtitle}
            </p>
          </div>
        ))}

        {/* Fixed Buttons - Always clickable with high z-index */}
        <div className="flex items-center gap-6 text-lg pointer-events-auto relative z-[60]">
          <Button
            asChild
            size="lg"
            className="bg-[#1f504b] hover:bg-[#1f504b]/90 relative z-[70] pointer-events-auto"
          >
            <Link href="/shop" className="pointer-events-auto">
              Shop Now
            </Link>
          </Button>
        </div>
      </div>

      {/* Navigation Arrows - High z-index */}
      <div className="hidden md:block">
        <button
          onClick={goToPrevSlide}
          className="absolute left-4 top-1/2 z-40 -translate-y-1/2 rounded-full bg-black/20 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/40 pointer-events-auto"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={goToNextSlide}
          className="absolute right-4 top-1/2 z-40 -translate-y-1/2 rounded-full bg-black/20 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/40 pointer-events-auto"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Indicators - High z-index */}
      <div className="absolute bottom-8 left-0 z-40 flex w-full justify-center gap-2">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 w-2 rounded-full transition-all pointer-events-auto ${
              index === currentIndex ? "bg-white" : "bg-white/40"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
