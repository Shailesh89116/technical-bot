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

export default function ProductForm() {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<Product>({
    resolver: zodResolver(productSchema),
    defaultValues: {
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
    },
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
      // Replace with your actual API endpoint
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error("Failed to create product")

      const result = await response.json()
      console.log("Product created:", result)
      form.reset()
      // Add toast notification here if using useToast
    } catch (error) {
      console.error("Error:", error)
      // Add error toast notification here
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Product</CardTitle>
          <CardDescription>Create a new product with all details and variants</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="basic">Basic</TabsTrigger>
                  <TabsTrigger value="pricing">Pricing</TabsTrigger>
                  <TabsTrigger value="images">Images</TabsTrigger>
                  <TabsTrigger value="variants">Variants</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced</TabsTrigger>
                </TabsList>

                {/* BASIC TAB */}
                <TabsContent value="basic" className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter product name" {...field} />
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
                        <FormLabel>Product Code</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., PROD-001" {...field} />
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
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Product description" {...field} />
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
                        <FormLabel>Application</FormLabel>
                        <FormControl>
                          <Input placeholder="Product application" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="inStock"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">In Stock</FormLabel>
                      </FormItem>
                    )}
                  />
                </TabsContent>

                {/* PRICING TAB */}
                <TabsContent value="pricing" className="space-y-6">
                  <FormField
                    control={form.control}
                    name="basePrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Base Price</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="0.00" step="0.01" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Product Sizes & Pricing</h3>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          sizesFieldArray.append({
                            name: "",
                            price: 0,
                            inStock: true,
                            stockCount: 0,
                          })
                        }
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Size
                      </Button>
                    </div>

                    {sizesFieldArray.fields.map((field, index) => (
                      <Card key={field.id} className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name={`sizes.${index}.name`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Size Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g., 1380 x 3000 mm" {...field} />
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
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                  <Input type="number" placeholder="0.00" step="0.01" {...field} />
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
                                <FormLabel>Member Price</FormLabel>
                                <FormControl>
                                  <Input type="number" placeholder="0.00" step="0.01" {...field} />
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
                                <FormLabel>Stock Count</FormLabel>
                                <FormControl>
                                  <Input type="number" placeholder="0" {...field} />
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
                                <FormLabel className="font-normal cursor-pointer">In Stock</FormLabel>
                              </FormItem>
                            )}
                          />

                          <div className="flex justify-end pt-8">
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => sizesFieldArray.remove(index)}
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
                <TabsContent value="images" className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Product Images</h3>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => imagesFieldArray.append({ url: "", alt: "" })}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Image
                      </Button>
                    </div>

                    {imagesFieldArray.fields.map((field, index) => (
                      <Card key={field.id} className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name={`images.${index}.url`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Image URL</FormLabel>
                                <FormControl>
                                  <Input placeholder="https://example.com/image.jpg" {...field} />
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
                                <FormLabel>Alt Text</FormLabel>
                                <FormControl>
                                  <Input placeholder="Image description" {...field} />
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
                              onClick={() => imagesFieldArray.remove(index)}
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
                <TabsContent value="variants" className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Product Variants</h3>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          variantsFieldArray.append({
                            colorName: "",
                            code: "",
                            image: "",
                          })
                        }
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Variant
                      </Button>
                    </div>

                    {variantsFieldArray.fields.map((field, index) => (
                      <Card key={field.id} className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <FormField
                            control={form.control}
                            name={`variants.${index}.colorName`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Color Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g., Red, Blue" {...field} />
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
                                <FormLabel>Variant Code</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g., VAR-001" {...field} />
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
                                <FormLabel>Variant Image URL</FormLabel>
                                <FormControl>
                                  <Input placeholder="https://example.com/variant.jpg" {...field} />
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
                              onClick={() => variantsFieldArray.remove(index)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>

                  {/* ATTRIBUTES SECTION */}
                  <div className="space-y-4 pt-6 border-t">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Attributes</h3>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => attributesFieldArray.append({ key: "", value: "" })}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Attribute
                      </Button>
                    </div>

                    {attributesFieldArray.fields.map((field, index) => (
                      <Card key={field.id} className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name={`attributes.${index}.key`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Attribute Key</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g., Material, Weight" {...field} />
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
                                <FormLabel>Attribute Value</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g., Aluminum, 2.5kg" {...field} />
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
                              onClick={() => attributesFieldArray.remove(index)}
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
                <TabsContent value="advanced" className="space-y-6">
                  <FormField
                    control={form.control}
                    name="thickness"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Thickness</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 5mm" {...field} />
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
                        <FormLabel>Thickness Range</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 3mm - 10mm" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="span"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Span</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 1000mm" {...field} />
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
                        <FormLabel>Series ID</FormLabel>
                        <FormControl>
                          <Input placeholder="Series ID" {...field} />
                        </FormControl>
                        <FormDescription>MongoDB ObjectId for the series</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category ID</FormLabel>
                        <FormControl>
                          <Input placeholder="Category ID" {...field} />
                        </FormControl>
                        <FormDescription>MongoDB ObjectId for the category</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
              </Tabs>

              <div className="flex gap-4 justify-end pt-6 border-t">
                <Button type="button" variant="outline" onClick={() => form.reset()}>
                  Reset
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Creating..." : "Create Product"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
