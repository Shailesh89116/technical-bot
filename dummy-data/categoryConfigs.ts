import {
  Truck,
  Shield,
  Award,
  Zap, 
} from "lucide-react"

export const categoryConfigs = {
  sanitary: {
    title: "Sanitary Acrylic Solutions",
    subtitle: "Medical & Sanitary Grade",
    description:
      "Premium medical and sanitary grade acrylic sheets designed for healthcare, food service, and cleanroom environments. FDA approved and hospital certified.",
    gradient: "from-blue-50 via-white to-green-50",
    badge: {
      text: "Medical & Sanitary Grade",
      icon: Shield,
      className: "bg-green-100 text-green-800",
    },
    features: [
      { icon: Shield, label: "FDA Approved", desc: "Medical Grade" },
      { icon: Award, label: "Hospital Certified", desc: "Premium Quality" },
      { icon: Zap, label: "Antibacterial", desc: "99.9% Protection" },
      { icon: Truck, label: "Fast Delivery", desc: "Express Shipping" },
    ],
  },
  interior: {
    title: "Interior Design Acrylic",
    subtitle: "Crystal Clear & Architectural",
    description:
      "Premium architectural acrylic for modern interior applications with unmatched optical clarity and design flexibility.",
    gradient: "from-emerald-50 via-white to-blue-50",
    badge: {
      text: "Crystal Clear & Premium",
      icon: Award,
      className: "bg-purple-100 text-purple-800",
    },
    features: [
      { icon: Award, label: "99.9% Clarity", desc: "Crystal Clear" },
      { icon: Shield, label: "UV Resistant", desc: "Long Lasting" },
      { icon: Zap, label: "Scratch Resistant", desc: "Durable" },
      { icon: Truck, label: "Custom Colors", desc: "Available" },
    ],
  },
  advertising: {
    title: "Advertising Display Acrylic",
    subtitle: "High Impact & Weather Resistant",
    description:
      "Weather-resistant acrylic perfect for outdoor signage and illuminated advertising displays with superior durability.",
    gradient: "from-orange-50 via-white to-red-50",
    badge: {
      text: "High Impact & Outdoor Ready",
      icon: Zap,
      className: "bg-orange-100 text-orange-800",
    },
    features: [
      { icon: Shield, label: "Weather Resistant", desc: "All Seasons" },
      { icon: Zap, label: "LED Compatible", desc: "Illuminated" },
      { icon: Award, label: "High Impact", desc: "Durable" },
      { icon: Truck, label: "UV Stable", desc: "Fade Resistant" },
    ],
  },
  "building-materials": {
    title: "Building Materials Acrylic",
    subtitle: "Structural Strength & Industrial",
    description:
      "17x stronger than glass with superior thermal insulation for demanding construction and industrial applications.",
    gradient: "from-slate-50 via-white to-gray-50",
    badge: {
      text: "Industrial Grade & Structural",
      icon: Award,
      className: "bg-slate-100 text-slate-800",
    },
    features: [
      { icon: Award, label: "17x Stronger", desc: "Than Glass" },
      { icon: Shield, label: "Fire Retardant", desc: "Safety First" },
      { icon: Zap, label: "Thermal Insulation", desc: "Energy Efficient" },
      { icon: Truck, label: "Impact Resistant", desc: "Heavy Duty" },
    ],
  },
}