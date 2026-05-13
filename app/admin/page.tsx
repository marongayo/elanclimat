// admin/page.tsx

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminClient from "./AdminClient";
import { getBlogPosts, getProducts } from "@/lib/db";


export default async function AdminPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }


  const posts = await getBlogPosts();
  const products = await getProducts();
  return (
    <div>
      <AdminClient initialPosts={posts} initialProducts={products} />
    </div>
  );
}
