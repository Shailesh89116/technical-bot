import ProductDetails from "@/components/product/product-details";
import prismadb from "@/lib/prismadb";

const ProductDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const productData = await prismadb.product.findUnique({
    where: {
      id: id,
    },
    include: {
      category: {
        select: {
          name: true,
        },
      },
      series: {
        select: {
          name: true,
        },
      },
      sizes: true,
      attributes: true,
      images: true,
      variants: true,
    },
  });

  if (!productData) {
    return <div>Product not found</div>;
  }

  return <ProductDetails product={productData} />;
};

export default ProductDetailsPage;
