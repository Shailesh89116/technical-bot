import { HeroBanner } from "@/components/hero-banner";
import { BenefitsSection } from "@/components/benefits-section";
import { HowItWorks } from "@/components/how-it-works";
import { PoweredByACL } from "@/components/powered-by-acl";
import { ProductCategories } from "@/components/products-category";
import CalltoExpert from "@/components/cta";
// import { VideoShowcase } from "@/components/video-showcase";

export default function Home() {
  return (
    <div className="flex flex-col gap-0 pb-16">
      <HeroBanner />
      <PoweredByACL />
      <ProductCategories />
      <BenefitsSection />
      <CalltoExpert/>
      <HowItWorks />
    </div>
  );
}
