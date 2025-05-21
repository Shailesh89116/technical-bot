import { MousePointerClick, Scissors, Wrench } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      icon: MousePointerClick,
      title: "Select",
      description: "Choose from our range of high-quality acrylic sheets",
    },
    {
      icon: Scissors,
      title: "Customize",
      description: "Specify your dimensions and finishing options",
    },
    {
      icon: Wrench,
      title: "Install",
      description: "Follow our guides for perfect installation every time",
    },
  ]

  return (
    <section className="bg-primary/5 py-16">
      <div className="container">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">How It Works</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={index} className="relative flex flex-col items-center text-center">
              {index < steps.length - 1 && (
                <div className="absolute left-1/2 top-8 hidden h-0.5 w-full -translate-y-1/2 bg-primary/20 md:block" />
              )}
              <div className="relative mb-4 rounded-full bg-primary p-4">
                <step.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-2 text-xl font-medium">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
