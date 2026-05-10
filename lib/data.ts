export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image?: string;    // legacy
  images: string[];
  description: string;
  inStock: boolean;
  badge: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message?: string;
  date: string;
  read: boolean;
}