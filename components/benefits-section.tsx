import { LightbulbIcon, ShieldCheck, Ruler, Palette } from "lucide-react"

export function BenefitsSection() {
  const benefits = [
    {
      icon: LightbulbIcon,
      title: "High Light Transmission",
      description: "92% light transmission for crystal clear visibility and brightness",
    },
    {
      icon: ShieldCheck,
      title: "UV Resistance",
      description: "UV-stabilized for outdoor use with long-lasting clarity",
    },
    {
      icon: Ruler,
      title: "Easy Fabrication",
      description: "Simple to cut, drill, and form with standard tools",
    },
    {
      icon: Palette,
      title: "Range of Options",
      description: "Multiple thicknesses, colors, and sizes to suit any project",
    },
  ]

  return (
    <section className="container">
      <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">Key Benefits</h2>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-primary/10 p-4">
              <benefit.icon className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-medium">{benefit.title}</h3>
            <p className="text-muted-foreground">{benefit.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
