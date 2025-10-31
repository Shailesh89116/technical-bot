import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Users, TrendingUp, CheckCircle } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="grid gap-12">
        <section className="grid gap-6 md:grid-cols-2 md:gap-12 lg:items-center">
          <div>
            <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Our Story</h1>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Founded in 1955, Nature Light® has been at the forefront of acrylic sheet manufacturing for over six
                decades. What began as a small family business has grown into a leading supplier of high-quality acrylic
                products across the nation.
              </p>
              <p>
                Our commitment to quality and innovation has remained unchanged throughout our journey. We continuously
                invest in research and development to improve our products and manufacturing processes, ensuring that we
                deliver the best possible solutions to our customers.
              </p>
              <p>
                Today, Nature Light® is recognized for its premium acrylic sheets that combine exceptional clarity,
                durability, and versatility. Our products are used in a wide range of applications, from signage and
                displays to architectural features and protective barriers.
              </p>
            </div>
            <Button className="mt-6">Learn More About Our History</Button>
          </div>
          <div className="relative aspect-square overflow-hidden rounded-lg md:aspect-[4/3]">
            <Image
              src="/placeholder.svg?height=600&width=800"
              alt="Our manufacturing facility"
              fill
              className="object-cover"
            />
          </div>
        </section>

        <section>
          <h2 className="mb-8 text-center text-3xl font-bold tracking-tight md:text-4xl">Why Choose Us</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-3">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-medium">Quality Assurance</h3>
                <p className="text-sm text-muted-foreground">
                  Rigorous testing ensures our acrylic sheets meet the highest standards for clarity, durability, and
                  performance.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-3">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-medium">Expert Team</h3>
                <p className="text-sm text-muted-foreground">
                  Our in-house chemists and engineers continuously work to improve our products and develop new
                  solutions.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-3">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-medium">Innovation Focus</h3>
                <p className="text-sm text-muted-foreground">
                  We invest in the latest technologies and research to stay at the forefront of acrylic sheet
                  manufacturing.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-3">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-medium">Customer Service</h3>
                <p className="text-sm text-muted-foreground">
                  Our dedicated support team provides fast quotes and expert advice to help you find the perfect
                  solution.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2 md:gap-12 lg:items-center">
          <div className="order-2 md:order-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Certification image"
                  width={400}
                  height={400}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="aspect-square overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Certification image"
                  width={400}
                  height={400}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="aspect-square overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Certification image"
                  width={400}
                  height={400}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="aspect-square overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Certification image"
                  width={400}
                  height={400}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Certifications & Partnerships</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Nature Light® is proud to hold numerous industry certifications that validate our commitment to quality,
                safety, and environmental responsibility. Our acrylic sheets meet or exceed all relevant industry
                standards.
              </p>
              <p>
                We have established strategic partnerships with leading logistics providers, including FTWZ and DP
                World, to ensure efficient and reliable delivery of our products nationwide. These partnerships allow us
                to offer competitive shipping rates and timely delivery. These partnerships allow us to offer
                competitive shipping rates and timely delivery.
              </p>
              <p>
                Our commitment to sustainability is reflected in our manufacturing processes and product development. We
                continuously work to reduce our environmental footprint while maintaining the highest quality standards
                for our acrylic sheets.
              </p>
            </div>
            <Button className="mt-6">View Our Certifications</Button>
          </div>
        </section>
      </div>
    </div>
  )
}
