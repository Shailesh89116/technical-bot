import ProductDetails from "@/components/product/product-details";
import prismadb from "@/lib/prismadb";

export const dynamic = "force-dynamic";

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
      sizes: {
        include:{
          prices :{
            take : 1,
            orderBy:{
              createdAt : "desc"
            }
          }
        }
      },
      attributes: true,
      images: true,
      variants: true,
      featuregroup : {
        include:{
          features : true
        }
      }
    },
  });

  if (!productData) {
    return <div>Product not found</div>;
  }

  console.log(productData);

  return <ProductDetails product={productData} />;
};

export default ProductDetailsPage;
