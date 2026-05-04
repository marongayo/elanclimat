import AdminClient from './AdminClient';
import { getBlogPosts, getProducts } from '@/lib/data';

export const dynamic = 'force-dynamic';

export default function AdminPage() {
  const posts = getBlogPosts();
  const products = getProducts();
  return <AdminClient initialPosts={posts} initialProducts={products} />;
}
