// app/shop/[_id]/page.tsx

import { getProducts, getProductById } from "@/lib/db";
import Footer from "@/components/Footer";
import ShopClient from "@/components/shop-components/ShopClient";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ _id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { _id } = await params;
  const product = await getProductById(_id);

  if (!product) {
    return {
      title: "Product Not Found | Élan Climat & Énergie",
      description: "The requested energy solution could not be found.",
    };
  }

  return {
    title: `${product.name} | Élan Climat & Énergie`,
    description: product.description || "Explore our premium energy solutions.",
    openGraph: {
      images: product.images?.[0] ? [{ url: product.images[0] }] : [],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { _id } = await params;

  const [products, initialProduct] = await Promise.all([
    getProducts(),
    getProductById(_id),
  ]);

  return (
    <>
      <ShopClient products={products} initialProduct={initialProduct} />
      <Footer />
    </>
  );
}
