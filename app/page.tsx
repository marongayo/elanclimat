// app/page.tsx

import type { Metadata } from "next";
import Hero from "@/components/home-components/Hero";
import AboutSection from "@/components/home-components/AboutSection";
import ServicesSection from "@/components/home-components/ServicesSection";
import BlogSection from "@/components/home-components/BlogSection";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import Navbar from "@/components/Navbar";
import { getBlogPosts } from "@/lib/db";

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Élan Climat | HVAC, Solar & Engineering Services in Kenya",
    template: "%s | Élan Climat",
  },
  description:
    "Élan Climat delivers certified HVAC, solar, plumbing, cold-room, elevator, and electrical engineering services across Nairobi, Mombasa, Kisumu, Eldoret, and East Africa.",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Élan Climat",
    title: "Élan Climat | HVAC, Solar & Engineering Services in Kenya",
    description:
      "Certified HVAC, solar, plumbing, cold-room, elevator, and electrical engineering across Kenya and East Africa.",
    images: [
      {
        url: "/images/HVAC.png", //
        width: 1200,
        height: 630,
        alt: "Élan Climat | Engineering Services Kenya",
      },
    ],
    locale: "en_KE",
  },

  twitter: {
    card: "summary_large_image",
    title: "Élan Climat | HVAC, Solar & Engineering Services in Kenya",
    description:
      "Certified HVAC, solar, plumbing, cold-room, elevator, and electrical engineering across Kenya and East Africa.",
    images: ["/images/HVAC.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  // verification: {
  //   google: "YOUR_GOOGLE_SITE_VERIFICATION_TOKEN",
  //   other: { "msvalidate.01": "YOUR_BING_VERIFICATION_TOKEN" },
  // },
};

// No JSON-LD here — Schema.tsx in the root layout handles all structured data.

export default async function Home() {
  const blogPosts = await getBlogPosts();

  return (
    <>
      <Navbar />
      <Hero />
      <AboutSection />
      <ServicesSection />
      {blogPosts.length > 0 && <BlogSection posts={blogPosts} />}
      <Footer />
      <BackToTop />
    </>
  );
}
