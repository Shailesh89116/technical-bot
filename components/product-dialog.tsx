"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ProductDialog({ open, onOpenChange, product }:any) {
  const [formData, setFormData] = useState(
    product || {
      name: "",
      code: "",
      description: "",
      basePrice: "",
      category: "",
      series: "",
      thickness: "",
      span: "",
      inStock: true,
    },
  )

  const handleChange = (e:any) => {
    const { name, value } = e.target
    setFormData((prev:any) => ({ ...prev, [name]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{product ? "Edit Product" : "Add New Product"}</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="pricing">Pricing & Stock</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
          </TabsList>

          {/* Basic Info Tab */}
          <TabsContent value="basic" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter product name"
                />
              </div>
              <div>
                <Label htmlFor="code">Product Code</Label>
                <Input
                  id="code"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  placeholder="e.g., PSA-001"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Product description"
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Select category"
                />
              </div>
              <div>
                <Label htmlFor="series">Series</Label>
                <Input
                  id="series"
                  name="series"
                  value={formData.series}
                  onChange={handleChange}
                  placeholder="Select series"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="thickness">Thickness</Label>
                <Input
                  id="thickness"
                  name="thickness"
                  value={formData.thickness}
                  onChange={handleChange}
                  placeholder="e.g., 5mm"
                />
              </div>
              <div>
                <Label htmlFor="span">Span</Label>
                <Input id="span" name="span" value={formData.span} onChange={handleChange} placeholder="e.g., 1380mm" />
              </div>
            </div>
          </TabsContent>

          {/* Pricing & Stock Tab */}
          <TabsContent value="pricing" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="basePrice">Base Price</Label>
                <Input
                  id="basePrice"
                  name="basePrice"
                  type="number"
                  value={formData.basePrice}
                  onChange={handleChange}
                  placeholder="0.00"
                />
              </div>
              <div>
                <Label htmlFor="memberPrice">Member Price</Label>
                <Input id="memberPrice" name="memberPrice" type="number" placeholder="0.00" />
              </div>
            </div>

            <div>
              <Label>Size-Based Pricing</Label>
              <div className="space-y-2 mt-2">
                <div className="flex gap-2">
                  <Input placeholder="Size (e.g., 1380 x 3000 mm)" />
                  <Input placeholder="Price" type="number" />
                  <Button variant="outline">Add</Button>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="stockCount">Stock Count</Label>
              <Input id="stockCount" name="stockCount" type="number" placeholder="0" />
            </div>
          </TabsContent>

          {/* Media Tab */}
          <TabsContent value="media" className="space-y-4 mt-4">
            <div>
              <Label>Product Images</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center mt-2">
                <p className="text-muted-foreground">Drag and drop images here or click to upload</p>
              </div>
            </div>

            <div>
              <Label>Variants</Label>
              <div className="space-y-2 mt-2">
                <div className="flex gap-2">
                  <Input placeholder="Color name" />
                  <Input placeholder="Color code" />
                  <Button variant="outline">Add Variant</Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onOpenChange(false)}>Save Product</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
