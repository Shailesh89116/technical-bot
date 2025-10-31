"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Eye, Printer } from "lucide-react"
import { OrderDetailDialog } from "./order-detail-dialog"

const mockOrders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    email: "john@example.com",
    totalAmount: 1250.5,
    status: "DELIVERED",
    items: 3,
    date: "2024-01-15",
    shipping: { address: "123 Main St", city: "New York", state: "NY", postalCode: "10001" },
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    email: "jane@example.com",
    totalAmount: 890.0,
    status: "SHIPPED",
    items: 2,
    date: "2024-01-14",
    shipping: { address: "456 Oak Ave", city: "Los Angeles", state: "CA", postalCode: "90001" },
  },
  {
    id: "ORD-003",
    customer: "Bob Johnson",
    email: "bob@example.com",
    totalAmount: 2100.75,
    status: "CONFIRMED",
    items: 5,
    date: "2024-01-13",
    shipping: { address: "789 Pine Rd", city: "Chicago", state: "IL", postalCode: "60601" },
  },
  {
    id: "ORD-004",
    customer: "Alice Brown",
    email: "alice@example.com",
    totalAmount: 450.25,
    status: "PENDING",
    items: 1,
    date: "2024-01-12",
    shipping: { address: "321 Elm St", city: "Houston", state: "TX", postalCode: "77001" },
  },
]

const statusColors = {
  PENDING: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  CONFIRMED: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  SHIPPED: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  DELIVERED: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  CANCELLED: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
}

export function OrderList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("ALL")
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "ALL" || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleViewOrder = (order:any) => {
    setSelectedOrder(order)
    setIsDetailOpen(true)
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Orders</h1>
        <p className="text-muted-foreground mt-2">Manage and track customer orders</p>
      </div>

      {/* Filters */}
      <Card className="bg-card border-border">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by order ID, customer, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {["ALL", "PENDING", "CONFIRMED", "SHIPPED", "DELIVERED"].map((status) => (
                <Button
                  key={status}
                  variant={statusFilter === status ? "default" : "outline"}
                  onClick={() => setStatusFilter(status)}
                  size="sm"
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Order List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Order ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Customer</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Items</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Total</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-4 font-medium text-foreground">{order.id}</td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="text-foreground">{order.customer}</p>
                        <p className="text-xs text-muted-foreground">{order.email}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-foreground">{order.items}</td>
                    <td className="py-3 px-4 font-medium text-foreground">${order.totalAmount.toFixed(2)}</td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status as keyof typeof statusColors]}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{order.date}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewOrder(order)}
                          className="text-blue-600"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-600">
                          <Printer className="w-4 h-4" />
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

      {/* Order Detail Dialog */}
      <OrderDetailDialog open={isDetailOpen} onOpenChange={setIsDetailOpen} order={selectedOrder} />
    </div>
  )
}
