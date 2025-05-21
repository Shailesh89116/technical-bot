import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function FeaturedProducts() {
  const products = [
    {
      id: 1,
      name: "Clear 5mm Acrylic Sheet",
      image: "/placeholder.svg?height=400&width=400",
      specs: "5mm thickness, 4'×8' max size",
      price: "$89.99",
      category: "clear",
    },
    {
      id: 2,
      name: "Frosted 3mm Acrylic Sheet",
      image: "/placeholder.svg?height=400&width=400",
      specs: "3mm thickness, 4'×8' max size",
      price: "$69.99",
      category: "frosted",
    },
    {
      id: 3,
      name: "Blue Tinted 5mm Acrylic",
      image: "/placeholder.svg?height=400&width=400",
      specs: "5mm thickness, 4'×8' max size",
      price: "$99.99",
      category: "colored",
    },
    {
      id: 4,
      name: "Clear 10mm Acrylic Sheet",
      image: "/placeholder.svg?height=400&width=400",
      specs: "10mm thickness, 5'×10' max size",
      price: "$149.99",
      category: "clear",
    },
  ]

  return (
    <section className="container">
      <div className="flex flex-col items-center">
        <h2 className="mb-4 text-center text-3xl font-bold tracking-tight md:text-4xl">Featured Products</h2>
        <p className="mb-8 max-w-[800px] text-center text-muted-foreground">
          Our most popular acrylic sheets, selected for quality and versatility
        </p>

        <Tabs defaultValue="all" className="w-full max-w-4xl">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="clear">Clear</TabsTrigger>
            <TabsTrigger value="frosted">Frosted</TabsTrigger>
            <TabsTrigger value="colored">Colored</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="clear" className="mt-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {products
                .filter((product) => product.category === "clear")
                .map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="frosted" className="mt-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {products
                .filter((product) => product.category === "frosted")
                .map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="colored" className="mt-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {products
                .filter((product) => product.category === "colored")
                .map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
            </div>
          </TabsContent>
        </Tabs>

        <Button asChild className="mt-8">
          <Link href="/shop">View All Products</Link>
        </Button>
      </div>
    </section>
  )
}

function ProductCard({ product }) {
  return (
    <Card className="overflow-hidden">
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
  )
}
