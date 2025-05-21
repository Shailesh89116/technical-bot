import { HeroBanner } from "@/components/hero-banner"
import { BenefitsSection } from "@/components/benefits-section"
import { FeaturedProducts } from "@/components/featured-products"
import { HowItWorks } from "@/components/how-it-works"

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      <HeroBanner />
      <BenefitsSection />
      <FeaturedProducts />
      <HowItWorks />
    </div>
  )
}
