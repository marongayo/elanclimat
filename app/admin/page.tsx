// admin/page.tsx

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminClient from "@/components/admin-components/AdminClient";
import { getBlogPosts, getProducts } from "@/lib/db";

export default async function AdminPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const posts = await getBlogPosts();
  const products = await getProducts();
  const serializedPosts = JSON.parse(JSON.stringify(posts));
  const serializedProducts = JSON.parse(JSON.stringify(products));

  return (
    <div>
      <AdminClient
        initialProducts={serializedProducts}
        initialPosts={serializedPosts}
      />
    </div>
  );
}
