"use client"

import { useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Trash2 } from "lucide-react"
import { Product, productSchema } from "@/schemas/new-product"

interface ProductFormProps {
  initialData?: Product & { id?: string }
  isEditMode?: boolean
  onSuccess?: () => void
}

export function ProductForm({ initialData, isEditMode, onSuccess }: ProductFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  const defaultValues = initialData
    ? {
        name: initialData.name,
        code: initialData.code,
        description: initialData.description,
        thickness: initialData.thickness,
        thicknessRange: initialData.thicknessRange,
        span: initialData.span,
        inStock: initialData.inStock,
        basePrice: initialData.basePrice,
        features: initialData.features || [],
        application: initialData.application,
        seriesId: initialData.seriesId,
        categoryId: initialData.categoryId,
        images: (initialData.images || []).map((img: any) => ({
          url: img.url,
          alt: img.alt || "",
        })),
        sizes: (initialData.sizes || []).map((size: any) => ({
          name: size.name,
          price: size.price,
          memberPrice: size.memberPrice,
          inStock: size.inStock,
          stockCount: size.stockCount,
        })),
        attributes: (initialData.attributes || []).map((attr: any) => ({
          key: attr.key,
          value: attr.value,
        })),
        variants: (initialData.variants || []).map((variant: any) => ({
          colorName: variant.colorName,
          code: variant.code,
          image: variant.image,
        })),
      }
    : {
        name: "",
        code: "",
        description: "",
        thickness: "",
        thicknessRange: "",
        span: "",
        inStock: true,
        basePrice: undefined,
        features: [],
        application: "",
        seriesId: "",
        categoryId: "",
        images: [],
        sizes: [],
        attributes: [],
        variants: [],
      }

  const form = useForm<Product>({
    resolver: zodResolver(productSchema),
    defaultValues: defaultValues,
  })

  const imagesFieldArray = useFieldArray({
    control: form.control,
    name: "images",
  })

  const sizesFieldArray = useFieldArray({
    control: form.control,
    name: "sizes",
  })

  const attributesFieldArray = useFieldArray({
    control: form.control,
    name: "attributes",
  })

  const variantsFieldArray = useFieldArray({
    control: form.control,
    name: "variants",
  })

  async function onSubmit(data: Product) {
    setIsLoading(true)
    try {
      const method = isEditMode ? "PUT" : "POST"
      const endpoint = isEditMode ? `/api/products/${initialData?.id}` : "/api/products"

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error(`Failed to ${isEditMode ? "update" : "create"} product`)

      const result = await response.json()
      console.log(`Product ${isEditMode ? "updated" : "created"}:`, result)

      if (!isEditMode) {
        form.reset()
      }

      onSuccess?.()
      // Add toast notification here if using useToast
    } catch (error) {
      console.error("Error:", error)
      // Add error toast notification here
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full">
      <Card className="border-border shadow-lg">
        <CardHeader className="bg-surface border-b border-border">
          <CardTitle className="text-2xl text-primary">{isEditMode ? "Edit Product" : "Product Details"}</CardTitle>
          <CardDescription className="text-text-muted">
            {isEditMode
              ? "Update the product information below"
              : "Fill in all the required information to create your product"}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-5 bg-surface border border-border">
                  <TabsTrigger value="basic" className="data-[state=active]:bg-accent data-[state=active]:text-white">
                    Basic
                  </TabsTrigger>
                  <TabsTrigger value="pricing" className="data-[state=active]:bg-accent data-[state=active]:text-white">
                    Pricing
                  </TabsTrigger>
                  <TabsTrigger value="images" className="data-[state=active]:bg-accent data-[state=active]:text-white">
                    Images
                  </TabsTrigger>
                  <TabsTrigger
                    value="variants"
                    className="data-[state=active]:bg-accent data-[state=active]:text-white"
                  >
                    Variants
                  </TabsTrigger>
                  <TabsTrigger
                    value="advanced"
                    className="data-[state=active]:bg-accent data-[state=active]:text-white"
                  >
                    Advanced
                  </TabsTrigger>
                </TabsList>

                {/* BASIC TAB */}
                <TabsContent value="basic" className="space-y-6 mt-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-primary font-semibold">Product Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter product name" className="border-border" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-primary font-semibold">Product Code</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., PROD-001" className="border-border" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-primary font-semibold">Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Product description" className="border-border" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="application"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-primary font-semibold">Application</FormLabel>
                        <FormControl>
                          <Input placeholder="Product application" className="border-border" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="inStock"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0 pt-2">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer text-primary">In Stock</FormLabel>
                      </FormItem>
                    )}
                  />
                </TabsContent>

                {/* PRICING TAB */}
                <TabsContent value="pricing" className="space-y-6 mt-6">
                  <FormField
                    control={form.control}
                    name="basePrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-primary font-semibold">Base Price</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="0.00" step="0.01" className="border-border" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-primary">Product Sizes & Pricing</h3>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="border-accent text-accent hover:bg-accent hover:text-white bg-transparent"
                        onClick={() =>
                          form.getFieldState("sizes").isDirty && form.getValues("sizes").length > 0
                            ? null
                            : form.setValue("sizes", [
                                ...form.getValues("sizes"),
                                {
                                  name: "",
                                  price: 0,
                                  inStock: true,
                                  stockCount: 0,
                                },
                              ])
                        }
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Size
                      </Button>
                    </div>

                    {form.watch("sizes").map((field, index) => (
                      <Card key={index} className="p-4 border-border bg-surface">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name={`sizes.${index}.name`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-primary">Size Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g., 1380 x 3000 mm" className="border-border" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`sizes.${index}.price`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-primary">Price</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    placeholder="0.00"
                                    step="0.01"
                                    className="border-border"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`sizes.${index}.memberPrice`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-primary">Member Price</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    placeholder="0.00"
                                    step="0.01"
                                    className="border-border"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`sizes.${index}.stockCount`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-primary">Stock Count</FormLabel>
                                <FormControl>
                                  <Input type="number" placeholder="0" className="border-border" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`sizes.${index}.inStock`}
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center space-x-3 space-y-0 pt-8">
                                <FormControl>
                                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer text-primary">In Stock</FormLabel>
                              </FormItem>
                            )}
                          />

                          <div className="flex justify-end pt-8">
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => {
                                const sizes = form.getValues("sizes")
                                form.setValue(
                                  "sizes",
                                  sizes.filter((_, i) => i !== index),
                                )
                              }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* IMAGES TAB */}
                <TabsContent value="images" className="space-y-6 mt-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-primary">Product Images</h3>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="border-accent text-accent hover:bg-accent hover:text-white bg-transparent"
                        onClick={() => {
                          const images = form.getValues("images")
                          form.setValue("images", [...images, { url: "", alt: "" }])
                        }}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Image
                      </Button>
                    </div>

                    {form.watch("images").map((field, index) => (
                      <Card key={index} className="p-4 border-border bg-surface">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name={`images.${index}.url`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-primary">Image URL</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="https://example.com/image.jpg"
                                    className="border-border"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`images.${index}.alt`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-primary">Alt Text</FormLabel>
                                <FormControl>
                                  <Input placeholder="Image description" className="border-border" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="flex justify-end md:col-span-2">
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => {
                                const images = form.getValues("images")
                                form.setValue(
                                  "images",
                                  images.filter((_, i) => i !== index),
                                )
                              }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* VARIANTS TAB */}
                <TabsContent value="variants" className="space-y-6 mt-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-primary">Product Variants</h3>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="border-accent text-accent hover:bg-accent hover:text-white bg-transparent"
                        onClick={() => {
                          const variants = form.getValues("variants")
                          form.setValue("variants", [
                            ...variants,
                            {
                              colorName: "",
                              code: "",
                              image: "",
                            },
                          ])
                        }}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Variant
                      </Button>
                    </div>

                    {form.watch("variants").map((field, index) => (
                      <Card key={index} className="p-4 border-border bg-surface">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <FormField
                            control={form.control}
                            name={`variants.${index}.colorName`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-primary">Color Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g., Red, Blue" className="border-border" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`variants.${index}.code`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-primary">Variant Code</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g., VAR-001" className="border-border" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`variants.${index}.image`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-primary">Variant Image URL</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="https://example.com/variant.jpg"
                                    className="border-border"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="flex justify-end md:col-span-3">
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => {
                                const variants = form.getValues("variants")
                                form.setValue(
                                  "variants",
                                  variants.filter((_, i) => i !== index),
                                )
                              }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>

                  {/* ATTRIBUTES SECTION */}
                  <div className="space-y-4 pt-6 border-t border-border">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-primary">Attributes</h3>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="border-accent text-accent hover:bg-accent hover:text-white bg-transparent"
                        onClick={() => {
                          const attributes = form.getValues("attributes")
                          form.setValue("attributes", [...attributes, { key: "", value: "" }])
                        }}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Attribute
                      </Button>
                    </div>

                    {form.watch("attributes").map((field, index) => (
                      <Card key={index} className="p-4 border-border bg-surface">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name={`attributes.${index}.key`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-primary">Attribute Key</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g., Material, Weight" className="border-border" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`attributes.${index}.value`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-primary">Attribute Value</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g., Aluminum, 2.5kg" className="border-border" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="flex justify-end md:col-span-2">
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => {
                                const attributes = form.getValues("attributes")
                                form.setValue(
                                  "attributes",
                                  attributes.filter((_, i) => i !== index),
                                )
                              }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* ADVANCED TAB */}
                <TabsContent value="advanced" className="space-y-6 mt-6">
                  <FormField
                    control={form.control}
                    name="thickness"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-primary font-semibold">Thickness</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 5mm" className="border-border" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="thicknessRange"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-primary font-semibold">Thickness Range</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 3mm - 10mm" className="border-border" {...field} />
                        </FormControl>
                        <FormDescription className="text-text-muted">MongoDB ObjectId for the series</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="span"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-primary font-semibold">Span</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 1000mm" className="border-border" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="seriesId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-primary font-semibold">Series ID</FormLabel>
                        <FormControl>
                          <Input placeholder="Series ID" className="border-border" {...field} />
                        </FormControl>
                        <FormDescription className="text-text-muted">MongoDB ObjectId for the series</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-primary font-semibold">Category ID</FormLabel>
                        <FormControl>
                          <Input placeholder="Category ID" className="border-border" {...field} />
                        </FormControl>
                        <FormDescription className="text-text-muted">MongoDB ObjectId for the category</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
              </Tabs>

              <div className="flex gap-4 justify-end pt-6 border-t border-border">
                <Button
                  type="button"
                  variant="outline"
                  className="border-border text-primary hover:bg-surface bg-transparent"
                  onClick={() => form.reset()}
                >
                  Reset
                </Button>
                <Button type="submit" disabled={isLoading} className="bg-accent hover:bg-accent-light text-white">
                  {isLoading
                    ? isEditMode
                      ? "Updating..."
                      : "Creating..."
                    : isEditMode
                      ? "Update Product"
                      : "Create Product"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
