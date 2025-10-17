export type CartItem = {
  id : string;
  productId: string;
  productName: string;
  selectedSize: string;
  basePrice: number;
  currentPrice: number;
  quantity: number;
  code: string;
  specs: string;
  category: string;
  image: string;
  attributes: {
    id: string;
    key: string;
    value: string;
    productId: string;
  }[];
};
