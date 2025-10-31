import { ProductList } from "@/components/product-list";
import prismadb from "@/lib/prismadb";

export default async function ProductsPage() {
  const products = await prismadb.product.findMany({
    select: {
      id: true,
      name: true,
      code: true,
      inStock: true,
      series: {
        select: { name: true },
      },
      category: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return <ProductList products={products}/>;
}
