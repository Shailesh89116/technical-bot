// Shinkolite Acrylic Sheet Product Types

export interface ProductSize {
  id: string;
  name: string;
  price: number;
  inStock: boolean;
  stockCount: number;
}

export interface ProductSpecifications {
  thickness: string;
  span: string;
  lightTransmission: string;
  heatcut: string;
}

export type ProductCategory = "superior" | "prime" | "heatcut" | "nature";

export interface ShinkoliteProduct {
  id: string;
  name: string;
  code: string;
  category: ProductCategory;
  heatcut: string;
  inStock: boolean;
  price: number; // starting price
  description: string;
  specifications: ProductSpecifications;
  features: string[];
  application: string;
  images: string[];
  sizes: ProductSize[];
}

export type ShinkoliteProductArray = ShinkoliteProduct[];

// Utility types for specific product properties
export type ProductId = ShinkoliteProduct["id"];
export type ProductCode = ShinkoliteProduct["code"];
export type ProductName = ShinkoliteProduct["name"];

// Filter types for product filtering
export interface ProductFilters {
  category?: ProductCategory;
  inStock?: boolean;
  minPrice?: number;
  maxPrice?: number;
  lightTransmissionRange?: {
    min: number;
    max: number;
  };
  heatcutRange?: {
    min: number;
    max: number;
  };
}

// API response types
export interface ProductResponse {
  success: boolean;
  data: ShinkoliteProduct[];
  total: number;
  message?: string;
}

export interface SingleProductResponse {
  success: boolean;
  data: ShinkoliteProduct | null;
  message?: string;
}

// Cart/Order related types
export interface CartItem {
  productId: string;
  sizeId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface ProductWithSelectedSize extends ShinkoliteProduct {
  selectedSize: ProductSize;
}