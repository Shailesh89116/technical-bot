// Base for reusable stuff
interface SizeOption {
  id: string;
  name: string;
  price: number;
  inStock: boolean;
  stockCount: number;
}

interface VariantOption {
  colorName: string;
  code: string;
  image?: string;
}

interface CustomSize {
  width: string;
  length: string;
}

interface Attributes {
  heatcut?: string;
  uvCut?: string;
  lightTransmission?: string;
  heatReflection?: string;
  [key: string]: string | undefined;
}

// Main product interface
export interface Product {
  id: string;
  name: string;
  code?: string;
  category:
    | "prime"
    | "heatcut"
    | "superior"
    | "nature"
    | "shade"
    | "grand"
    | "sanitary"
    | "advertising"
    | "interior";
  mainCategory?: "building-materials" | "interior" | "advertising" | "sanitary"; // for broader grouping if needed
  price: number;
  inStock: boolean;
  description: string;
  thickness?: string;
  thicknessRange?: string;
  span?: string;
  sizes?: SizeOption[];
  standardSizes?: string[];
  maxCustomSize?: CustomSize;
  features: string[];
  application: string;
  images: string[];
  attributes: Attributes;
  variants?: VariantOption[]; // only used in Advertising
}

// ----------------- BASE TYPES -----------------
type Id = string;
type Nullable<T> = T | null;

// ----------------- PRODUCT RELATIONS -----------------
export type Category = {
  name: string;
};

export type Series = {
  name: string;
};

export type ProductSize = {
  id: Id;
  name: string;
  price: number;
  prices: {
    id: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
    productSizeId: string;
  }[];
  memberPrice?: Nullable<number>;
  inStock: boolean;
  stockCount: number;
  productId: Id;
};

export type Attribute = {
  id: Id;
  key: string;
  value: string;
  productId: Id;
};

export type Image = {
  id: Id;
  url: string;
  alt?: Nullable<string>;
  productId: Id;
};

export type Variant = {
  id: Id;
  colorName?: Nullable<string>;
  code?: Nullable<string>;
  image?: Nullable<string>;
  productId: Id;
};

// ----------------- PRODUCT TYPE -----------------
export type Products = {
  id: Id;
  name: string;
  code?: Nullable<string>;
  description?: Nullable<string>;
  thickness?: Nullable<string>;
  thicknessRange?: Nullable<string>;
  span?: Nullable<string>;
  inStock: boolean;
  basePrice?: Nullable<number>;
  features: string[];
  featuregroup: {
    id: string;
    header: string;
    productId: string;
    features: {
      groupId: string;
      heading: string;
      icon: string | null;
      id: string;
      text: string;
    }[];
  }[];
  application?: Nullable<string>;
  // maxCustomSize?: { width: string; length: string; } | null | undefined
  seriesId: Id | null;
  categoryId?: Nullable<Id>;
  createdAt: Date;
  updatedAt: Date;

  // Nested relations
  category?: Nullable<Category>;
  series?: Nullable<Series>;
  sizes: ProductSize[];
  attributes: Attribute[];
  images: Image[];
  variants: Variant[];
};
