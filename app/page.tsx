import { HeroBanner } from "@/components/hero-banner"
import { BenefitsSection } from "@/components/benefits-section"
import { FeaturedProducts } from "@/components/featured-products"
import { HowItWorks } from "@/components/how-it-works"
import { PoweredByACL } from "@/components/powered-by-acl"

export default function Home() {
  return (
    <div className="flex flex-col gap-0 pb-16">
      <HeroBanner />
      <PoweredByACL/>

      <FeaturedProducts />
            <BenefitsSection />
      <HowItWorks />
    </div>
  )
}
