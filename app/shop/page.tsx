// app/shop/page.tsx
export const metadata = {
  title: "Shop",
};

import { getProducts } from "@/lib/db";
import Footer from "@/components/Footer";
import ShopClient from "@/components/shop-components/ShopClient";

export const dynamic = "force-dynamic";

export default async function ShopPage() {
  const products = await getProducts();
  return (
    <>
      <ShopClient products={products} initialProduct={null} />
      <Footer />
    </>
  );
}
