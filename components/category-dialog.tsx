"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export function CategoryDialog({ open, onOpenChange, category }) {
  const [formData, setFormData] = useState(
    category || {
      name: "",
      code: "",
      description: "",
      hasSeries: false,
    },
  )

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{category ? "Edit Category" : "Add New Category"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Category Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter category name"
            />
          </div>

          <div>
            <Label htmlFor="code">Category Code</Label>
            <Input id="code" name="code" value={formData.code} onChange={handleChange} placeholder="e.g., CAT-A" />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Category description"
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
              rows={3}
            />
          </div>

          <div className="flex items-center gap-2">
            <Checkbox id="hasSeries" name="hasSeries" checked={formData.hasSeries} onChange={handleChange} />
            <Label htmlFor="hasSeries" className="cursor-pointer">
              This category has series
            </Label>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onOpenChange(false)}>Save Category</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
