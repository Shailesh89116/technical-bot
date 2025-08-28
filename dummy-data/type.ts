// Base for reusable stuff
interface SizeOption {
  id: string
  name: string
  price: number
  inStock: boolean
  stockCount: number
}

interface VariantOption {
  colorName: string
  code: string
  image?: string
}

interface CustomSize {
  width: string
  length: string
}

interface Attributes {
  heatcut?: string
  uvCut?: string
  lightTransmission?: string
  heatReflection?: string
  [key: string]: string | undefined
}

// Main product interface
export interface Product {
  id: string
  name: string
  code?: string
  category: 
    | "prime" 
    | "heatcut" 
    | "superior" 
    | "nature" 
    | "shade" 
    | "grand" 
    | "sanitary" 
    | "advertising"
    | "interior"
    mainCategory?: "building-materials" | "interior" | "advertising" | "sanitary" // for broader grouping if needed
  price: number
  inStock: boolean
  description: string
  thickness?: string
  thicknessRange?: string
  span?: string
  sizes?: SizeOption[]
  standardSizes?: string[]
  maxCustomSize?: CustomSize
  features: string[]
  application: string
  images: string[]
  attributes: Attributes
  variants?: VariantOption[] // only used in Advertising
}
