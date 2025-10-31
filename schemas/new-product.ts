import { z } from "zod"

export const productSizeSchema = z.object({
  name: z.string().min(1, "Size name is required"),
  price: z.coerce.number().positive("Price must be positive"),
  memberPrice: z.coerce.number().positive("Member price must be positive").optional(),
  inStock: z.boolean().default(true),
  stockCount: z.coerce.number().int().min(0, "Stock count must be 0 or more").default(0),
})

export const attributeSchema = z.object({
  key: z.string().min(1, "Attribute key is required"),
  value: z.string().min(1, "Attribute value is required"),
})

export const imageSchema = z.object({
  url: z.string().url("Must be a valid URL"),
  alt: z.string().optional(),
})

export const variantSchema = z.object({
  colorName: z.string().optional(),
  code: z.string().optional(),
  image: z.string().url("Must be a valid URL").optional(),
})

export const productSchema = z.object({
  name: z.string().min(1, "Product name is required").min(3, "Name must be at least 3 characters"),
  code: z.string().optional(),
  description: z.string().optional(),
  thickness: z.string().optional(),
  thicknessRange: z.string().optional(),
  span: z.string().optional(),
  inStock: z.boolean().default(true),
  basePrice: z.coerce.number().positive("Base price must be positive").optional(),
  features: z.array(z.string()).default([]),
  application: z.string().optional(),
  seriesId: z.string().optional(),
  categoryId: z.string().optional(),
  images: z.array(imageSchema).default([]),
  sizes: z.array(productSizeSchema).default([]),
  attributes: z.array(attributeSchema).default([]),
  variants: z.array(variantSchema).default([]),
})

export type Product = z.infer<typeof productSchema>
export type ProductSize = z.infer<typeof productSizeSchema>
export type Attribute = z.infer<typeof attributeSchema>
export type Image = z.infer<typeof imageSchema>
export type Variant = z.infer<typeof variantSchema>
