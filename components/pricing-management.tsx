"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Edit2, Trash2 } from "lucide-react"

const mockPricingData = [
  {
    id: "1",
    productName: "Premium Sheet A",
    basePrice: 150,
    memberPrice: 130,
    sizes: [
      { size: "1380 x 3000 mm", price: 150, memberPrice: 130 },
      { size: "1380 x 2000 mm", price: 120, memberPrice: 105 },
    ],
  },
  {
    id: "2",
    productName: "Standard Panel B",
    basePrice: 200,
    memberPrice: 175,
    sizes: [
      { size: "1380 x 3000 mm", price: 200, memberPrice: 175 },
      { size: "1380 x 2500 mm", price: 180, memberPrice: 160 },
    ],
  },
]

const mockInventory = [
  {
    id: "1",
    productName: "Premium Sheet A",
    code: "PSA-001",
    totalStock: 150,
    reserved: 25,
    available: 125,
    reorderLevel: 50,
    status: "GOOD",
  },
  {
    id: "2",
    productName: "Standard Panel B",
    code: "SPB-002",
    totalStock: 80,
    reserved: 15,
    available: 65,
    reorderLevel: 50,
    status: "GOOD",
  },
  {
    id: "3",
    productName: "Deluxe Material C",
    code: "DMC-003",
    totalStock: 30,
    reserved: 10,
    available: 20,
    reorderLevel: 50,
    status: "LOW",
  },
]

export function PricingManagement() {
  const [activeTab, setActiveTab] = useState("pricing")

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Pricing & Inventory</h1>
        <p className="text-muted-foreground mt-2">Manage product pricing and stock levels</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pricing">Pricing Management</TabsTrigger>
          <TabsTrigger value="inventory">Inventory Management</TabsTrigger>
        </TabsList>

        {/* Pricing Tab */}
        <TabsContent value="pricing" className="space-y-6 mt-6">
          <div className="flex justify-end">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Pricing Rule
            </Button>
          </div>

          <div className="grid gap-6">
            {mockPricingData.map((product) => (
              <Card key={product.id} className="bg-card border-border">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">{product.productName}</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="text-blue-600">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Base Pricing */}
                  <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                    <div>
                      <Label className="text-sm text-muted-foreground">Base Price</Label>
                      <p className="text-2xl font-bold text-foreground">${product.basePrice}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Member Price</Label>
                      <p className="text-2xl font-bold text-green-600">${product.memberPrice}</p>
                    </div>
                  </div>

                  {/* Size-Based Pricing */}
                  <div>
                    <Label className="text-sm font-semibold text-foreground mb-3 block">Size-Based Pricing</Label>
                    <div className="space-y-2">
                      {product.sizes.map((size, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <div>
                            <p className="font-medium text-foreground">{size.size}</p>
                          </div>
                          <div className="flex gap-4">
                            <div className="text-right">
                              <p className="text-xs text-muted-foreground">Regular</p>
                              <p className="font-medium text-foreground">${size.price}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-muted-foreground">Member</p>
                              <p className="font-medium text-green-600">${size.memberPrice}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Inventory Tab */}
        <TabsContent value="inventory" className="space-y-6 mt-6">
          <div className="flex justify-end">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Adjust Stock
            </Button>
          </div>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Inventory Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Product</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Code</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Total Stock</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Reserved</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Available</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Reorder Level</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockInventory.map((item) => (
                      <tr key={item.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                        <td className="py-3 px-4 font-medium text-foreground">{item.productName}</td>
                        <td className="py-3 px-4 text-muted-foreground">{item.code}</td>
                        <td className="py-3 px-4 text-foreground">{item.totalStock}</td>
                        <td className="py-3 px-4 text-foreground">{item.reserved}</td>
                        <td className="py-3 px-4 font-medium text-foreground">{item.available}</td>
                        <td className="py-3 px-4 text-foreground">{item.reorderLevel}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              item.status === "GOOD"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                            }`}
                          >
                            {item.status === "GOOD" ? "Good" : "Low Stock"}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <Button variant="ghost" size="sm" className="text-blue-600">
                            <Edit2 className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Stock Alerts */}
          <Card className="bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800">
            <CardHeader>
              <CardTitle className="text-yellow-900 dark:text-yellow-200">Low Stock Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {mockInventory
                  .filter((item) => item.status === "LOW")
                  .map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 bg-yellow-100/50 dark:bg-yellow-900/30 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-yellow-900 dark:text-yellow-200">{item.productName}</p>
                        <p className="text-sm text-yellow-800 dark:text-yellow-300">
                          Available: {item.available} (Reorder at: {item.reorderLevel})
                        </p>
                      </div>
                      <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">
                        Reorder
                      </Button>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
