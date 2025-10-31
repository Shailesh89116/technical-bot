"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

export function OrderDetailDialog({ open, onOpenChange, order }) {
  const [status, setStatus] = useState(order?.status || "PENDING")

  if (!order) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Order Details - {order.id}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Customer Info */}
          <Card className="bg-muted border-border">
            <CardHeader>
              <CardTitle className="text-base">Customer Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium text-foreground">{order.customer}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium text-foreground">{order.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Info */}
          <Card className="bg-muted border-border">
            <CardHeader>
              <CardTitle className="text-base">Shipping Address</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-foreground">{order.shipping.address}</p>
              <p className="text-foreground">
                {order.shipping.city}, {order.shipping.state} {order.shipping.postalCode}
              </p>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card className="bg-muted border-border">
            <CardHeader>
              <CardTitle className="text-base">Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex justify-between items-center p-3 bg-background rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">Product {i}</p>
                      <p className="text-sm text-muted-foreground">Size: 1380 x 3000 mm</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-foreground">Qty: 1</p>
                      <p className="text-sm text-muted-foreground">${(Math.random() * 500).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card className="bg-muted border-border">
            <CardContent className="pt-6 space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium text-foreground">${(order.totalAmount * 0.9).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium text-foreground">${(order.totalAmount * 0.1).toFixed(2)}</span>
              </div>
              <div className="border-t border-border pt-2 flex justify-between">
                <span className="font-semibold text-foreground">Total</span>
                <span className="font-bold text-foreground">${order.totalAmount.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Status Update */}
          <Card className="bg-muted border-border">
            <CardHeader>
              <CardTitle className="text-base">Update Status</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                  <SelectItem value="SHIPPED">Shipped</SelectItem>
                  <SelectItem value="DELIVERED">Delivered</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button onClick={() => onOpenChange(false)}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
