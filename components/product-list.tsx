"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Edit2, Trash2, Search } from "lucide-react";
import { ProductDialog } from "./product-dialog";

type Products = {
  category: {
    name: string;
  } | null;
  series: {
    name: string;
  } | null;
  id: string;
  name: string;
  code: string | null;
  inStock: boolean;
};

interface ProductListProps {
  products: Products[];
}

export function ProductList({ products }: ProductListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Products>(
    {} as Products
  );

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p?.code?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (product: Products) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  const handleNew = () => {
    setSelectedProduct({} as Products);
    setIsDialogOpen(true);
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Products</h1>
          <p className="text-muted-foreground mt-2">
            Manage your product catalog
          </p>
        </div>
        <Button onClick={handleNew} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Product
        </Button>
      </div>

      {/* Search */}
      <Card className="bg-card border-border">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Product List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">
                    Name
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">
                    Code
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">
                    Category
                  </th>
                  {/* <th className="text-left py-3 px-4 font-semibold text-foreground">Price</th> */}
                  {/* <th className="text-left py-3 px-4 font-semibold text-foreground">Stock</th> */}
                  <th className="text-left py-3 px-4 font-semibold text-foreground">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-border hover:bg-muted/50 transition-colors"
                  >
                    <td className="py-3 px-4 text-foreground">
                      {product.name}
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      {product.code}
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      {product.category?.name}
                    </td>
                    {/* <td className="py-3 px-4 text-foreground font-medium">${product.basePrice}</td> */}
                    {/* <td className="py-3 px-4 text-foreground">{product.stockCount}</td> */}
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          product.inStock
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        }`}
                      >
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(product)}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
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

      {/* Product Dialog */}
      <ProductDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        product={selectedProduct}
      />
    </div>
  );
}
