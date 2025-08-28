import ProductDetails from "@/components/product/product-details";
import { products } from "@/dummy-data/products";

const ProductDetailsPage = async({params}:{params : Promise<{id : string}>}) => {

  const {id} = await params;

  const productData = products.find(prod => prod.id === id);

  if (!productData) {
    return <div>Product not found</div>;
  }

  return ( 
    <ProductDetails product={productData}/>
   );
}
 
export default ProductDetailsPage;