// app/page.tsx

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { getBlogPosts } from "@/lib/db";

import HeroSection from "@/components/home-components/HeroSection";
import ServicesSection from "@/components/home-components/ServicesSection";
import AboutSection from "@/components/home-components/AboutSection";
import TestimonialsSection from "@/components/home-components/TestimonialsSection";
import NewsSection from "@/components/home-components/NewsSection";
import ContactSection from "@/components/home-components/ContactSection";

export const dynamic = "force-dynamic";
export default async function HomePage() {
  const posts = (await getBlogPosts()).slice(0, 3);

  return (
    <>
      <Navbar />

      {/* ── HERO ── */}
      <HeroSection />
      {/* ── SERVICES ── */}
      <ServicesSection />
      {/* ── ABOUT ── */}
      <AboutSection />
      {/* ── TESTIMONIALS ── */}
      <TestimonialsSection />
      {/* ── NEWS ── */}
      <NewsSection posts={posts} />
      {/* ── CONTACT ── */}
      <ContactSection />
      <Footer />

      <style>{`
        @media (max-width: 640px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            margin-top: 40px !important;
          }
        }
        @media (max-width: 768px) {
          #contact > div > div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
          section > div > div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
      <SpeedInsights />
    </>
  );
}
