"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Edit2, Trash2 } from "lucide-react"
import { CategoryDialog } from "./category-dialog"

const mockCategories = [
  { id: "1", name: "Category A", code: "CAT-A", hasSeries: true, productCount: 12 },
  { id: "2", name: "Category B", code: "CAT-B", hasSeries: false, productCount: 8 },
  { id: "3", name: "Category C", code: "CAT-C", hasSeries: true, productCount: 15 },
]

export function CategoryList() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)

  const handleEdit = (category:any) => {
    setSelectedCategory(category)
    setIsDialogOpen(true)
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Categories</h1>
          <p className="text-muted-foreground mt-2">Manage product categories</p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Category
        </Button>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Category List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Code</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Has Series</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Products</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockCategories.map((category) => (
                  <tr key={category.id} className="border-b border-border hover:bg-muted/50">
                    <td className="py-3 px-4 text-foreground">{category.name}</td>
                    <td className="py-3 px-4 text-muted-foreground">{category.code}</td>
                    <td className="py-3 px-4">
                      <span className={category.hasSeries ? "text-green-600" : "text-gray-500"}>
                        {category.hasSeries ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-foreground">{category.productCount}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(category)}
                          className="text-blue-600"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <CategoryDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} category={selectedCategory} />
    </div>
  )
}
