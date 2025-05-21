import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Download, BookOpen, HelpCircle } from "lucide-react"

export default function ResourcesPage() {
  const brochures = [
    {
      title: "Acrylic Sheet Product Catalog",
      description: "Complete overview of our acrylic sheet product line",
      size: "4.2 MB",
    },
    {
      title: "Shinkolite Acrylic Sheet Brochure",
      description: "Detailed specifications for our premium Shinkolite line",
      size: "3.8 MB",
    },
    {
      title: "Color & Finish Options",
      description: "Visual guide to all available colors and finishes",
      size: "5.1 MB",
    },
    {
      title: "Technical Specifications",
      description: "Comprehensive technical data for all sheet types",
      size: "2.7 MB",
    },
  ]

  const guides = [
    {
      title: "Cutting & Fabrication Guide",
      description: "Step-by-step instructions for cutting and shaping acrylic sheets",
      size: "3.5 MB",
    },
    {
      title: "Installation Best Practices",
      description: "Professional tips for perfect acrylic installations",
      size: "4.0 MB",
    },
    {
      title: "Cleaning & Maintenance",
      description: "How to keep your acrylic looking new for years",
      size: "1.8 MB",
    },
    {
      title: "Safety Guidelines",
      description: "Important safety information for handling acrylic",
      size: "2.2 MB",
    },
  ]

  const caseStudies = [
    {
      title: "Retail Display Solutions",
      description: "How our acrylic transformed a national retail chain",
      size: "3.9 MB",
    },
    {
      title: "Architectural Applications",
      description: "Innovative uses in modern architecture",
      size: "5.3 MB",
    },
    {
      title: "Protective Barriers",
      description: "Case study on safety implementations",
      size: "2.8 MB",
    },
    {
      title: "Signage & Wayfinding",
      description: "Creating effective signage with acrylic",
      size: "3.2 MB",
    },
  ]

  const faqs = [
    {
      question: "What thickness is best for outdoor signs?",
      answer:
        "For outdoor signage, we recommend 5mm or thicker acrylic sheets to ensure durability against wind and weather conditions. Our UV-stabilized sheets are specifically designed to resist yellowing and degradation from sun exposure.",
    },
    {
      question: "How do I cut the sheets safely?",
      answer:
        "For the safest cutting, we recommend using a table saw with a fine-tooth blade specifically designed for acrylics. Always wear appropriate safety gear and ensure the sheet is properly secured. For detailed instructions, download our Cutting & Fabrication Guide.",
    },
    {
      question: "Do you ship nationwide?",
      answer:
        "Yes, we ship our acrylic sheets to all 50 states. Orders over $200 qualify for free shipping. For large or custom orders, please contact our sales team for shipping quotes and delivery timeframes.",
    },
    {
      question: "What's the difference between acrylic and plexiglass?",
      answer:
        "Plexiglass is actually a brand name for acrylic sheets. All plexiglass is acrylic, but not all acrylic is Plexiglass. Our Nature Light® acrylic sheets offer the same clarity and durability as Plexiglass but with our proprietary UV protection technology.",
    },
    {
      question: "Can acrylic sheets be recycled?",
      answer:
        "Yes, acrylic sheets are 100% recyclable. We offer a recycling program for commercial customers - contact us for details on how to return large quantities of used acrylic for recycling.",
    },
    {
      question: "How does acrylic compare to glass?",
      answer:
        "Acrylic is 17 times more impact-resistant than glass while being half the weight. It offers 92% light transmission (compared to glass at 90%) and is much easier to fabricate. Unlike glass, acrylic can be cut and drilled with standard tools without risk of shattering.",
    },
  ]

  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Resources & Downloads</h1>
        <p className="mx-auto max-w-[800px] text-muted-foreground">
          Access our comprehensive collection of brochures, technical guides, and application resources to help you get
          the most from your acrylic sheets.
        </p>
      </div>

      <Tabs defaultValue="brochures" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="brochures">Brochures</TabsTrigger>
          <TabsTrigger value="guides">Application Guides</TabsTrigger>
          <TabsTrigger value="case-studies">Case Studies</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>

        <TabsContent value="brochures" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {brochures.map((item, index) => (
              <ResourceCard key={index} item={item} icon={FileText} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="guides" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {guides.map((item, index) => (
              <ResourceCard key={index} item={item} icon={BookOpen} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="case-studies" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {caseStudies.map((item, index) => (
              <ResourceCard key={index} item={item} icon={FileText} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="faq" className="mt-6">
          <div className="grid gap-6">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <HelpCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <h3 className="font-medium">{faq.question}</h3>
                      <p className="mt-2 text-muted-foreground">{faq.answer}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-12 rounded-lg border bg-muted/50 p-6 text-center">
        <h2 className="mb-2 text-xl font-medium">Need Custom Resources?</h2>
        <p className="mb-4 text-muted-foreground">
          Our team can provide specialized documentation and guidance for your specific project needs.
        </p>
        <Button asChild>
          <Link href="/contact">Contact Our Support Team</Link>
        </Button>
      </div>
    </div>
  )
}

function ResourceCard({ item, icon: Icon }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <h3 className="font-medium">{item.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t p-4">
        <span className="text-xs text-muted-foreground">PDF • {item.size}</span>
        <Button variant="ghost" size="sm" className="gap-1">
          <Download className="h-4 w-4" />
          Download
        </Button>
      </CardFooter>
    </Card>
  )
}
