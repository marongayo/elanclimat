export interface ProductForm {
  name: string;
  price: string;
  category: string;
  images: string[];
  description: string;
  inStock: boolean;
  badge: string;
_id?:string;
}

export interface ProductErrors {
  name?: string;
  price?: string;
  category?: string;
  description?: string;
  images?: string;
_id?:string;

}
