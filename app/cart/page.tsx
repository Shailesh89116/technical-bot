import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, X, ShoppingBag, ArrowRight } from "lucide-react"

export default function CartPage() {
  // In a real app, this would come from a cart state or API
  const cartItems = [
    {
      id: 1,
      name: "Clear 5mm Acrylic Sheet",
      image: "/placeholder.svg?height=400&width=400",
      specs: "5mm thickness, 4'×8'",
      price: 89.99,
      quantity: 2,
    },
    {
      id: 5,
      name: "Frosted 3mm Acrylic Sheet",
      image: "/placeholder.svg?height=400&width=400",
      specs: "3mm thickness, 4'×8'",
      price: 69.99,
      quantity: 1,
    },
  ]

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = subtotal > 200 ? 0 : 25
  const tax = subtotal * 0.07 // 7% tax rate
  const total = subtotal + shipping + tax

  return (
    <div className="container py-8 md:py-12">
      <h1 className="mb-8 text-3xl font-bold">Your Cart</h1>

      {cartItems.length > 0 ? (
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rounded-lg border">
              <div className="p-6">
                <h2 className="mb-4 text-xl font-medium">Cart Items ({cartItems.length})</h2>
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={96}
                          height={96}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="font-medium">${item.price.toFixed(2)}</p>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.specs}</p>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center border rounded-md">
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none">
                              <Minus className="h-3 w-3" />
                              <span className="sr-only">Decrease quantity</span>
                            </Button>
                            <Input
                              type="number"
                              min="1"
                              value={item.quantity}
                              className="h-8 w-12 border-0 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                            />
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none">
                              <Plus className="h-3 w-3" />
                              <span className="sr-only">Increase quantity</span>
                            </Button>
                          </div>
                          <Button variant="ghost" size="sm" className="h-8 px-2">
                            <X className="mr-1 h-4 w-4" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between p-6">
                <Button variant="outline" asChild>
                  <Link href="/shop">
                    <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
                    Continue Shopping
                  </Link>
                </Button>
                <Button variant="outline">Update Cart</Button>
              </div>
            </div>

            <div className="mt-8 rounded-lg border p-6">
              <h2 className="mb-4 text-xl font-medium">Have a Promo Code?</h2>
              <div className="flex gap-2">
                <Input placeholder="Enter promo code" className="max-w-sm" />
                <Button>Apply</Button>
              </div>
            </div>
          </div>

          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="mb-4 text-xl font-medium">Order Summary</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax (7%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                <Button asChild className="mt-6 w-full">
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
                <div className="mt-4 text-center text-xs text-muted-foreground">Free shipping on orders over $200</div>
              </CardContent>
            </Card>

            <div className="mt-6 rounded-lg border p-6">
              <div className="flex items-center gap-3">
                <ShoppingBag className="h-5 w-5 text-primary" />
                <h3 className="font-medium">Secure Checkout</h3>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Your information is protected using SSL encryption technology.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border py-16">
          <ShoppingBag className="mb-4 h-16 w-16 text-muted-foreground" />
          <h2 className="mb-2 text-xl font-medium">Your cart is empty</h2>
          <p className="mb-6 text-muted-foreground">Looks like you haven't added any products to your cart yet.</p>
          <Button asChild>
            <Link href="/shop">Start Shopping</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
