// app/shop/[_id]/page.tsx
import { getProducts, getProductById } from "@/lib/db";
import Footer from "@/components/Footer";
import ShopClient from "@/components/shop-components/ShopClient";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface Props {
  params: Promise<{ _id: string }>;
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ _id: p._id }));
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

  const title = `${product.fullName || product.name} | Élan Climat & Énergie`;
  const description =
    product.description?.slice(0, 155) ||
    `Buy ${product.name} — ${product.category} equipment available in Kenya with professional installation.`;
  const url = `${BASE_URL}/shop/${_id}`;
  const ogImageUrl = `${BASE_URL}/shop/${_id}/opengraph-image`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "Élan Climat & Énergie",
      type: "website",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: product.fullName || product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { _id } = await params;
  const [products, initialProduct] = await Promise.all([
    getProducts(),
    getProductById(_id),
  ]);

  if (!initialProduct) notFound();

  return (
    <>
      <ShopClient products={products} initialProduct={initialProduct} />
      <Footer />
    </>
  );
}
