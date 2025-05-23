"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, X, ArrowLeft, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Clear 5mm Acrylic Sheet",
      specs: "5mm thickness, 4'×8'",
      image: "/img-1.png",
      price: 89.99,
      quantity: 2,
    },
    {
      id: 2,
      name: "Frosted 3mm Acrylic Sheet",
      specs: "3mm thickness, 4'×8'",
      image: "/img-2.png",
      price: 69.99,
      quantity: 1,
    },
  ])

  const [promoCode, setPromoCode] = useState("")

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = subtotal > 200 ? 0 : 25
  const taxRate = 0.07
  const tax = subtotal * taxRate
  const total = subtotal + shipping + tax

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return

    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-12">
        <h1 className="mb-8 text-3xl font-semibold tracking-tight text-gray-900">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
            <h2 className="mb-4 text-xl font-medium">Your cart is empty</h2>
            <p className="mb-6 text-gray-600">Looks like you haven't added any products to your cart yet.</p>
            <Button asChild className="rounded-full bg-black px-8 hover:bg-gray-800">
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="rounded-xl border border-gray-200 bg-white">
                <div className="p-6">
                  <h2 className="mb-6 text-xl font-medium">Cart Items ({cartItems.length})</h2>

                  <div className="space-y-6">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start gap-4 pb-6 border-b border-gray-100 last:border-0 last:pb-0"
                      >
                        {/* Product Image */}
                        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            width={80}
                            height={80}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex flex-1 flex-col">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="text-base font-medium text-gray-900">{item.name}</h3>
                              <p className="mt-1 text-sm text-gray-500">{item.specs}</p>
                            </div>
                            <p className="text-base font-medium text-gray-900">${item.price.toFixed(2)}</p>
                          </div>

                          {/* Quantity Controls */}
                          <div className="mt-4 flex items-center justify-between">
                            <div className="flex h-9 items-center rounded-full border border-gray-200">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="flex h-full w-9 items-center justify-center rounded-l-full hover:bg-gray-50"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="flex h-full min-w-[2rem] items-center justify-center text-center text-sm">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="flex h-full w-9 items-center justify-center rounded-r-full hover:bg-gray-50"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>

                            <button
                              onClick={() => removeItem(item.id)}
                              className="flex items-center text-sm text-gray-500 hover:text-gray-700"
                            >
                              <X className="mr-1 h-3.5 w-3.5" />
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-gray-100 p-6">
                  <Button variant="outline" asChild className="rounded-full">
                    <Link href="/shop">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Continue Shopping
                    </Link>
                  </Button>
                  <Button variant="outline" className="rounded-full">
                    Update Cart
                  </Button>
                </div>
              </div>

              {/* Promo Code */}
              <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6">
                <h2 className="mb-4 text-lg font-medium">Have a Promo Code?</h2>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="rounded-full border-gray-200"
                  />
                  <Button className="rounded-full bg-black px-6 hover:bg-gray-800">Apply</Button>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="rounded-xl border border-gray-200 bg-white p-6">
                  <h2 className="mb-6 text-xl font-medium">Order Summary</h2>

                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax ({(taxRate * 100).toFixed(0)}%)</span>
                      <span className="font-medium">${tax.toFixed(2)}</span>
                    </div>

                    <Separator />

                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button asChild className="mt-6 w-full rounded-full bg-black py-6 text-base hover:bg-gray-800">
                    <Link href="/checkout">Proceed to Checkout</Link>
                  </Button>

                  {subtotal > 200 && (
                    <p className="mt-4 text-center text-sm text-gray-500">Free shipping on orders over $200</p>
                  )}
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-6">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5 text-gray-500" />
                    <div>
                      <h3 className="font-medium">Secure Checkout</h3>
                      <p className="text-sm text-gray-500">
                        Your information is protected using SSL encryption technology.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
