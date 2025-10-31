// import prismadb from "@/lib/prismadb";

// const ProductDetails = async ({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) => {
//   const id = (await params).id;

//   const productDetails = await prismadb.product.findUnique({
//     where: {
//       id,
//     },
//     include: {
//       Applications: true,
//       attributes: true,
//       images: true,
//       sizes: true,
//       series: {
//         select: {
//           name: true,
//         },
//       },
//       category: {
//         select: {
//           name: true,
//         },
//       },
//     },
//   });

//   console.log(productDetails);
  

//   return <div>{JSON.stringify(productDetails)}</div>;
// };

// export default ProductDetails;




"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ProductForm } from "@/components/product-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Trash2, ArrowLeft, Package, Tag, Zap } from "lucide-react"
import type { Product } from "@/schemas/new-product"

const DUMMY_PRODUCT = {
  id: "68f0be3d044fdc0d06542264",
  name: "Heat Cut Royal Blue",
  code: "HC-B703",
  description: "Premium vibrant blue roofing with UV protection",
  thickness: "6 mm",
  thicknessRange: null,
  span: "50 cm",
  inStock: true,
  basePrice: 2000,
  features: ["UV cut 99.6%", "Heat cut 48%", "Light transmission 23%"],
  application: "Residential and commercial skylight solutions",
  maxCustomSize: {
    width: "2763 mm",
    length: "6000 mm",
  },
  seriesId: "68f0bd4c044fdc0d06542263",
  categoryId: "68f0bc67044fdc0d06542261",
  createdAt: "2025-10-16T09:43:25.131Z",
  updatedAt: "2025-10-16T09:43:25.131Z",
  Applications: [],
  attributes: [
    {
      id: "68f0be3d044fdc0d06542267",
      key: "uvCut",
      value: "99.6%",
      productId: "68f0be3d044fdc0d06542264",
    },
    {
      id: "68f0be3d044fdc0d06542268",
      key: "heatCut",
      value: "48%",
      productId: "68f0be3d044fdc0d06542264",
    },
    {
      id: "68f0be3d044fdc0d06542269",
      key: "lightTransmission",
      value: "23%",
      productId: "68f0be3d044fdc0d06542264",
    },
  ],
  images: [
    {
      id: "68f0be3d044fdc0d0654226a",
      url: "https://res.cloudinary.com/dehwqau58/image/upload/v1760689405/hc-b703-1_thip51.jpg",
      alt: "HC-B703",
      productId: "68f0be3d044fdc0d06542264",
    },
    {
      id: "68f0be3d044fdc0d0654226b",
      url: "https://res.cloudinary.com/dehwqau58/image/upload/v1760689402/hc-b703_qjie3q.jpg",
      alt: "HC-B703",
      productId: "68f0be3d044fdc0d06542264",
    },
  ],
  sizes: [
    {
      id: "68f0be3d044fdc0d06542265",
      name: "1380 x 3000 mm",
      price: 2000,
      memberPrice: null,
      inStock: true,
      stockCount: 18,
      productId: "68f0be3d044fdc0d06542264",
    },
    {
      id: "68f0be3d044fdc0d06542266",
      name: "1380 x 6000 mm",
      price: 3850,
      memberPrice: null,
      inStock: true,
      stockCount: 9,
      productId: "68f0be3d044fdc0d06542264",
    },
  ],
  series: {
    name: "Heat Cut Series",
  },
  category: {
    name: "Building Material",
  },
}

export default function ProductDetailPage() {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const product = DUMMY_PRODUCT as unknown as Product & { id: string }

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      const response = await fetch(`/api/products/${product.id}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error("Failed to delete product")
      router.push("/products")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete product")
      setIsDeleting(false)
    }
  }

  return (
    <main className="min-h-screen bg-surface">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary to-primary-light text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl font-bold text-balance">{product.name}</h1>
              <p className="text-lg sm:text-xl text-blue-100">Code: {product.code || "N/A"}</p>
            </div>
            <Button variant="outline" onClick={() => router.back()} className="bg-white text-primary hover:bg-blue-50">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-text-muted">Status</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-primary">{product.inStock ? "In Stock" : "Out of Stock"}</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-text-muted">Base Price</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-primary">₹{product.basePrice || "N/A"}</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-text-muted">Thickness</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-primary">{product.thickness || "N/A"}</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-text-muted">Span</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-primary">{product.span || "N/A"}</p>
            </CardContent>
          </Card>
        </div>

        {/* Product Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Images */}
          <Card className="border-border lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5 text-accent" />
                Product Images
              </CardTitle>
            </CardHeader>
            <CardContent>
              {product.images && product.images.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.images.map((image, idx) => (
                    <div key={idx} className="rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={image.url || "/placeholder.svg"}
                        alt={image.alt || `Product image ${idx + 1}`}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-text-muted">No images available</p>
              )}
            </CardContent>
          </Card>

          {/* Features & Application */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-accent" />
                Features
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {product.features && product.features.length > 0 ? (
                <ul className="space-y-2">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-accent font-bold mt-1">•</span>
                      <span className="text-text">{feature}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-text-muted">No features listed</p>
              )}

              {product.application && (
                <div className="pt-4 border-t border-border">
                  <p className="text-sm font-semibold text-primary mb-2">Application</p>
                  <p className="text-text">{product.application}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Attributes */}
        {product.attributes && product.attributes.length > 0 && (
          <Card className="border-border mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="w-5 h-5 text-accent" />
                Attributes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {product.attributes.map((attr, idx) => (
                  <div key={idx} className="p-3 bg-surface rounded-lg border border-border">
                    <p className="text-sm font-semibold text-primary capitalize">{attr.key}</p>
                    <p className="text-lg font-bold text-accent">{attr.value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Sizes & Pricing */}
        {product.sizes && product.sizes.length > 0 && (
          <Card className="border-border mb-8">
            <CardHeader>
              <CardTitle>Available Sizes & Pricing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold text-primary">Size</th>
                      <th className="text-left py-3 px-4 font-semibold text-primary">Price</th>
                      <th className="text-left py-3 px-4 font-semibold text-primary">Member Price</th>
                      <th className="text-left py-3 px-4 font-semibold text-primary">Stock</th>
                      <th className="text-left py-3 px-4 font-semibold text-primary">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.sizes.map((size, idx) => (
                      <tr key={idx} className="border-b border-border hover:bg-surface">
                        <td className="py-3 px-4 text-text">{size.name}</td>
                        <td className="py-3 px-4 font-semibold text-accent">₹{size.price}</td>
                        <td className="py-3 px-4 text-text">{size.memberPrice ? `₹${size.memberPrice}` : "-"}</td>
                        <td className="py-3 px-4 text-text">{size.stockCount}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded text-xs font-semibold ${
                              size.inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                            }`}
                          >
                            {size.inStock ? "In Stock" : "Out of Stock"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Edit Form */}
        <ProductForm
          initialData={product}
          isEditMode={true}
          onSuccess={() => {
            // Handle success - could show a toast or refresh
          }}
        />

        {/* Delete Section */}
        <Card className="border-red-200 bg-red-50 mt-8">
          <CardHeader>
            <CardTitle className="text-red-600">Danger Zone</CardTitle>
            <CardDescription className="text-red-600/80">
              Permanently delete this product and all associated data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Product
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Product</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete "{product.name}"? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="flex gap-4 justify-end">
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </AlertDialogAction>
                </div>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
