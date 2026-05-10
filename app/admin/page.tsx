// admin/page.tsx

import AdminClient from "./AdminClient";
import { getBlogPosts, getProducts } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const posts = await getBlogPosts();
  const products = await getProducts();
  return (
    <div>
      <AdminClient initialPosts={posts} initialProducts={products} />
    </div>
  );
}
