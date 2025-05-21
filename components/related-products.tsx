import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function RelatedProducts() {
  const products = [
    {
      id: 2,
      name: "Clear 3mm Acrylic Sheet",
      image: "/placeholder.svg?height=400&width=400",
      specs: "3mm thickness, 4'×8' max size",
      price: "$59.99",
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
  ]

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
  )
}
