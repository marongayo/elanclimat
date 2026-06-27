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

export const metadata: Metadata = {
  title: "Home",
  description:
    "Élan Climat delivers certified HVAC, solar, plumbing, cold-room, elevator, and electrical engineering services across Nairobi, Mombasa, Kisumu, Eldoret, and East Africa.",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Home",
    description:
      "Élan Climat delivers certified HVAC, solar, plumbing, cold-room, elevator, and electrical engineering services across Nairobi, Mombasa, Kisumu, Eldoret, and East Africa.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Élan Climat & Énergie — Engineering Services Kenya",
      },
    ],
  },

  twitter: {
    title: "Home",
    description:
      "Élan Climat delivers certified HVAC, solar, plumbing, cold-room, elevator, and electrical engineering services across Nairobi, Mombasa, Kisumu, Eldoret, and East Africa.",
    images: ["/images/og-image.png"],
  },
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
