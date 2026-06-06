// app/shop/page.tsx
import { getProducts } from "@/lib/db";
import Footer from "@/components/Footer";
import ShopClient from "@/components/shop-components/ShopClient";

export const dynamic = "force-dynamic";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://elanclimat.co.ke";

export const metadata = {
  title: "Shop | Élan Climat & Énergie",
  description:
    "Browse our range of solar systems, HVAC units, batteries, and energy solutions for homes and businesses in Kenya.",
  openGraph: {
    title: "Shop | Élan Climat & Énergie",
    description:
      "Solar, HVAC, and energy solutions — shop professional-grade equipment with installation support.",
    url: `${BASE_URL}/shop`,
    siteName: "Élan Climat & Énergie",
    images: [{ url: `${BASE_URL}/og-shop.jpg`, width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop | Élan Climat & Énergie",
    description: "Solar, HVAC, and energy solutions available online.",
    images: [`${BASE_URL}/og-shop.jpg`],
  },
  alternates: {
    canonical: `${BASE_URL}/shop`,
    languages: {
      "en-US": `${BASE_URL}/shop`,
    },
  },
};

export default async function ShopPage() {
  const products = await getProducts();
  return (
    <>
      <ShopClient products={products} initialProduct={null} />
      <Footer />
    </>
  );
}
