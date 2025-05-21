"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CheckCircle2, Printer, ArrowRight } from "lucide-react"

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")
  const [order, setOrder] = useState(null)

  useEffect(() => {
    // Retrieve order from session storage
    const storedOrder = sessionStorage.getItem("lastOrder")
    if (storedOrder) {
      setOrder(JSON.parse(storedOrder))
    }
  }, [])

  if (!order) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-3xl font-bold">Order Confirmation</h1>
        <p className="mt-4">Loading order details...</p>
      </div>
    )
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  const estimatedDelivery = () => {
    const date = new Date()
    const days = order.shipping.method === "express" ? 3 : 7
    date.setDate(date.getDate() + days)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle2 className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Order Confirmed!</h1>
          <p className="mt-2 text-muted-foreground">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>
        </div>

        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Order Number</p>
                <p className="font-medium">{order.id}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Order Date</p>
                <p className="font-medium">{formatDate(order.date)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Estimated Delivery</p>
                <p className="font-medium">{estimatedDelivery()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <h2 className="mb-4 text-xl font-medium">Order Details</h2>
            <div className="rounded-lg border">
              {order.items.map((item, index) => (
                <div key={index} className={`p-4 ${index !== order.items.length - 1 ? "border-b" : ""}`}>
                  <div className="flex gap-4">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.specs}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-6">
              <div>
                <h3 className="mb-2 text-lg font-medium">Shipping Information</h3>
                <div className="rounded-lg border p-4">
                  <p>
                    {order.customer.firstName} {order.customer.lastName}
                  </p>
                  <p>{order.shipping.address}</p>
                  {order.shipping.address2 && <p>{order.shipping.address2}</p>}
                  <p>
                    {order.shipping.city}, {order.shipping.state} {order.shipping.zip}
                  </p>
                  <p>
                    {order.shipping.country === "US"
                      ? "United States"
                      : order.shipping.country === "CA"
                        ? "Canada"
                        : "Mexico"}
                  </p>
                  <p className="mt-2">
                    <span className="font-medium">Shipping Method:</span>{" "}
                    {order.shipping.method === "standard"
                      ? "Standard Shipping (5-7 business days)"
                      : "Express Shipping (2-3 business days)"}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-medium">Payment Information</h3>
                <div className="rounded-lg border p-4">
                  <p>
                    <span className="font-medium">Payment Method:</span>{" "}
                    {order.payment.method === "credit-card" ? "Credit Card" : "PayPal"}
                  </p>
                  {order.payment.method === "credit-card" && order.payment.lastFour && (
                    <p>
                      <span className="font-medium">Card:</span> **** **** **** {order.payment.lastFour}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-medium">Order Summary</h2>
            <div className="rounded-lg border p-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{order.shipping.cost === 0 ? "Free" : `$${order.shipping.cost.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${order.tax.toFixed(2)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <Button className="w-full" variant="outline" onClick={() => window.print()}>
                <Printer className="mr-2 h-4 w-4" />
                Print Receipt
              </Button>
              <Button className="w-full" asChild>
                <Link href="/">
                  Continue Shopping
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
