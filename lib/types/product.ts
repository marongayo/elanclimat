// types/product.ts
export interface ProductForm {
  name: string;
  fullName: string;
  price: string;
  category: string;
  images: string[];
  description: string;
  keyFeatures: string[];
  specifications: { key: string; value: string }[];
  inStock: boolean;
  badge: string;
  _id?: string;
}

export interface ProductErrors {
  name?: string;
  fullName?: string;
  price?: string;
  category?: string;
  description?: string;
  images?: string;
  _id?: string;
}

export interface Product {
  _id: string;
  name: string;
  fullName: string;
  price: number;
  category: string;
  images: string[];
  description: string;
  keyFeatures: string[];
  specifications: { key: string; value: string }[];
  inStock: boolean;
  badge: string;
}
