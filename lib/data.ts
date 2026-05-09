import fs from 'fs';
import path from 'path';

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
  image?: string;      // legacy — kept for backwards compat
  images: string[];    // primary: first entry is the thumbnail
  description: string;
  inStock: boolean;
  badge: string;
}

const blogPath = path.join(process.cwd(), 'data', 'blog.json');
const productsPath = path.join(process.cwd(), 'data', 'products.json');

export function getBlogPosts(): BlogPost[] {
  const raw = fs.readFileSync(blogPath, 'utf-8');
  return JSON.parse(raw);
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return getBlogPosts().find(p => p.slug === slug);
}

export function getProducts(): Product[] {
  const raw = fs.readFileSync(productsPath, 'utf-8');
  const products: Product[] = JSON.parse(raw);
  // Normalise legacy records that only have `image` (singular)
  return products.map(p => ({
    ...p,
    images: p.images?.length ? p.images : p.image ? [p.image] : [],
  }));
}

export function saveBlogPost(post: BlogPost): void {
  const posts = getBlogPosts();
  const idx = posts.findIndex(p => p.id === post.id);
  if (idx >= 0) posts[idx] = post;
  else posts.unshift(post);
  fs.writeFileSync(blogPath, JSON.stringify(posts, null, 2));
}

export function deleteBlogPost(id: string): void {
  const posts = getBlogPosts().filter(p => p.id !== id);
  fs.writeFileSync(blogPath, JSON.stringify(posts, null, 2));
}

export function saveProduct(product: Product): void {
  const products = getProducts();
  const idx = products.findIndex(p => p.id === product.id);
  if (idx >= 0) products[idx] = product;
  else products.unshift(product);
  fs.writeFileSync(productsPath, JSON.stringify(products, null, 2));
}

export function deleteProduct(id: string): void {
  const products = getProducts().filter(p => p.id !== id);
  fs.writeFileSync(productsPath, JSON.stringify(products, null, 2));
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

const messagesPath = path.join(process.cwd(), 'data', 'messages.json');

export function getMessages(): Message[] {
  if (!fs.existsSync(messagesPath)) return [];
  const raw = fs.readFileSync(messagesPath, 'utf-8');
  return JSON.parse(raw);
}

export function saveMessage(msg: Message): void {
  const messages = getMessages();
  const idx = messages.findIndex(m => m.id === msg.id);
  if (idx >= 0) messages[idx] = msg;
  else messages.unshift(msg);
  fs.writeFileSync(messagesPath, JSON.stringify(messages, null, 2));
}

export function deleteMessage(id: string): void {
  const messages = getMessages().filter(m => m.id !== id);
  fs.writeFileSync(messagesPath, JSON.stringify(messages, null, 2));
}