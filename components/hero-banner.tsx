import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroBanner() {
  return (
    <section className="relative min-h-[60vh] flex items-center">
      <div className="absolute inset-0 z-0">
        <Image
          src="/sanitary-banner.jpg"
          alt="Acrylic sheet installation"
          fill
          className="object-cover brightness-[0.7]"
          priority
        />
      </div>
      <div className="container relative z-10 flex flex-col items-center justify-center gap-6 py-24 text-center md:py-32 lg:py-40 mx-auto">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
          High-Clarity Acrylic Sheets
        </h1>
        <p className="max-w-[600px] text-xl text-white md:text-2xl">Bring Nature Light® into Your Designs</p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button asChild size="lg" className="bg-[#1f504b] hover:bg-[#1f504b]/90">
            <Link href="/shop">Shop Now</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="bg-white/10 text-white hover:bg-white/20">
            <Link href="/resources">View Resources</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
