// app/shop/page.tsx
import { getProducts } from "@/lib/db";
import Footer from "@/components/Footer";
import ShopClient from "@/components/shop-components/ShopClient";
import { Metadata } from "next";
import { Product } from "@/lib/types/product";

export const revalidate = 3600;

// Standardised to match global Schema component
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://elanclimat.co.ke";

// Static keywords that apply regardless of what's in the DB
const STATIC_KEYWORDS = [
  "engineering equipment Nairobi",
  "building services equipment Kenya",
  "professional installation Kenya",
  "energy solutions East Africa",
  "Élan Climat Énergie",
  "buy equipment Nairobi",
  "engineering supplies Kenya",
];

export async function generateMetadata(): Promise<Metadata> {
  const products = await getProducts();
  const categories = [...new Set(products.map((p) => p.category))];

  // Build dynamic keywords from whatever categories exist in the DB
  const dynamicKeywords = categories.flatMap((c) => [
    c,
    `${c} Nairobi`,
    `${c} Kenya`,
    `buy ${c} Kenya`,
    `${c} equipment Nairobi`,
    `${c} installation Kenya`,
  ]);

  const allKeywords = [...dynamicKeywords, ...STATIC_KEYWORDS];

  // Build a readable category string e.g. "HVAC, Solar, Batteries & Cold Rooms"
  const categoryString =
    categories.length > 1
      ? categories.slice(0, -1).join(", ") + " & " + categories[categories.length - 1]
      : categories[0] ?? "energy and engineering equipment";

  const title = `${categoryString} Equipment in Nairobi, Kenya | Élan Climat & Énergie`;
  const description = `Shop professional ${categoryString} equipment in Nairobi, Kenya. Premium engineering solutions with expert installation across East Africa — available at Élan Climat & Énergie.`;

  return {
    title,
    description,
    keywords: allKeywords,
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/shop`,
      siteName: "Élan Climat & Énergie",
      images: [
        {
          url: `${BASE_URL}/og-shop.jpg`,
          width: 1200,
          height: 630,
          alt: `${categoryString} equipment — Élan Climat & Énergie, Nairobi`,
        },
      ],
      type: "website",
      locale: "en_KE",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${BASE_URL}/og-shop.jpg`],
    },
    alternates: {
      canonical: `${BASE_URL}/shop`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

// JSON-LD for the shop page — links back to the global business entity
// defined in the homepage Schema component rather than redefining it.
function ShopJsonLd({
  productCount,
  categories,
  products,
}: {
  productCount: number;
  categories: string[];
  products: Product[];
}) {
  const categoryString =
    categories.length > 1
      ? categories.slice(0, -1).join(", ") + " & " + categories[categories.length - 1]
      : categories[0] ?? "Engineering Equipment";

  // Derive price range dynamically from actual product prices
  const prices = products.map((p) => p.price).filter(Boolean);
  const minPrice = prices.length > 0 ? Math.min(...prices).toLocaleString() : "0";
  const maxPrice = prices.length > 0 ? Math.max(...prices).toLocaleString() : "0";
  const priceRange = `KES ${minPrice} – KES ${maxPrice}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Store",
        "@id": `${BASE_URL}/shop`,
        // Links to the global business entity on the homepage —
        // avoids duplicating address, phone, geo, sameAs etc.
        parentOrganization: { "@id": `${BASE_URL}/#business` },
        name: "Élan Climat & Énergie — Equipment Shop",
        description: `Professional ${categoryString} equipment for homes and businesses in Nairobi and across East Africa.`,
        url: `${BASE_URL}/shop`,
        image: `${BASE_URL}/og-shop.jpg`,
        priceRange,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `${categoryString} Equipment`,
          numberOfItems: productCount,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: BASE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Shop",
            item: `${BASE_URL}/shop`,
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function ShopPage() {
  const products = await getProducts();
  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <>
      <ShopJsonLd
        productCount={products.length}
        categories={categories}
        products={products}
      />
      <ShopClient products={products} initialProduct={null} />
      <Footer />
    </>
  );
}
