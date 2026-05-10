// admin/page.tsx
import { a } from 'framer-motion/client';
import AdminClient from './AdminClient';
import { getBlogPosts, getProducts } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const posts = await getBlogPosts();
  const products = await getProducts();
  return <AdminClient initialPosts={posts} initialProducts={products} />;
}
