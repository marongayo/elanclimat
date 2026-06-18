"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

import { HeroSection } from "@/components/about-components/HeroSection";
import { StatsBar } from "@/components/about-components/StatsBar";
import { StorySection } from "@/components/about-components/StorySection";
import { ValuesSection } from "@/components/about-components/ValuesSection";
import { ServicesSection } from "@/components/about-components/ServicesSection";
import { TeamSection } from "@/components/about-components/TeamSection";
import { CsrSection } from "@/components/about-components/CsrSection";
import { CtaSection } from "@/components/about-components/CtaSection";
import Navbar from "@/components/Navbar";
import { C } from "@/lib/constants";

export default function AboutPage() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const fn = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <main style={{ background: C.warmWhite }}>
      <Navbar />
      <style>{`
        
        * { box-sizing: border-box; }

        .about-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 64px;
        }

        @media (max-width: 1024px) {
          .about-inner          { padding: 0 32px; }
          .story-grid           { grid-template-columns: 1fr !important; }
          .story-images         { display: none !important; }
          .services-grid        { grid-template-columns: 1fr 1fr !important; }
          .team-grid            { grid-template-columns: 1fr 1fr !important; }
          .csr-grid             { grid-template-columns: 1fr !important; }
          .csr-images           { display: none !important; }
        }
        @media (max-width: 640px) {
          .about-inner          { padding: 0 24px; }
          .services-grid        { grid-template-columns: 1fr !important; }
          .team-grid            { grid-template-columns: 1fr 1fr !important; }
          .stats-grid           { grid-template-columns: 1fr 1fr !important; }
          .values-layout        { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <HeroSection />
      <StatsBar />
      <StorySection />
      <ValuesSection />
      <ServicesSection />
      <TeamSection />
      <CsrSection />
      <CtaSection />

      {/* Back to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.25 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{
              position: "fixed",
              bottom: 28,
              right: 28,
              zIndex: 9999,
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: C.charcoal,
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
            }}
            aria-label="Back to top"
          >
            <ArrowUp size={16} color="#ffffff" />
          </motion.button>
        )}
      </AnimatePresence>
    </main>
  );
}
