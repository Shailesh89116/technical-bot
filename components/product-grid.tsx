"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ProductGrid() {
  const [sortBy, setSortBy] = useState("featured")

  const products = [
    {
      id: 1,
      name: "Clear 2mm Acrylic Sheet",
      image: "/placeholder.svg?height=400&width=400",
      specs: "2mm thickness, 4'×8' max size",
      price: "$49.99",
    },
    {
      id: 2,
      name: "Clear 3mm Acrylic Sheet",
      image: "/placeholder.svg?height=400&width=400",
      specs: "3mm thickness, 4'×8' max size",
      price: "$59.99",
    },
    {
      id: 3,
      name: "Clear 5mm Acrylic Sheet",
      image: "/placeholder.svg?height=400&width=400",
      specs: "5mm thickness, 4'×8' max size",
      price: "$89.99",
    },
    {
      id: 4,
      name: "Clear 10mm Acrylic Sheet",
      image: "/placeholder.svg?height=400&width=400",
      specs: "10mm thickness, 5'×10' max size",
      price: "$149.99",
    },
    {
      id: 5,
      name: "Frosted 3mm Acrylic Sheet",
      image: "/placeholder.svg?height=400&width=400",
      specs: "3mm thickness, 4'×8' max size",
      price: "$69.99",
    },
    {
      id: 6,
      name: "Frosted 5mm Acrylic Sheet",
      image: "/placeholder.svg?height=400&width=400",
      specs: "5mm thickness, 4'×8' max size",
      price: "$99.99",
    },
    {
      id: 7,
      name: "Black 3mm Acrylic Sheet",
      image: "/placeholder.svg?height=400&width=400",
      specs: "3mm thickness, 4'×8' max size",
      price: "$79.99",
    },
    {
      id: 8,
      name: "Blue Tinted 5mm Acrylic",
      image: "/placeholder.svg?height=400&width=400",
      specs: "5mm thickness, 4'×8' max size",
      price: "$99.99",
    },
    {
      id: 9,
      name: "Red Tinted 5mm Acrylic",
      image: "/placeholder.svg?height=400&width=400",
      specs: "5mm thickness, 4'×8' max size",
      price: "$99.99",
    },
  ]

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Showing {products.length} products</p>
        <div className="flex items-center gap-2">
          <span className="text-sm">Sort by:</span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="aspect-square overflow-hidden">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={400}
                height={400}
                className="h-full w-full object-cover transition-transform hover:scale-105"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-sm text-muted-foreground">{product.specs}</p>
            </CardContent>
            <CardFooter className="flex items-center justify-between p-4 pt-0">
              <span className="font-medium">{product.price}</span>
              <Button asChild variant="outline" size="sm">
                <Link href={`/product/${product.id}`}>View Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
