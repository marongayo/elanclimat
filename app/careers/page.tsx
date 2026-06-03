"use client";
import { HeroSection } from "@/components/careers-components/HeroSection";
import { CultureSection } from "@/components/careers-components/CultureSection";
import { RolesSection } from "@/components/careers-components/RolesSection";
import { CtaSection } from "@/components/careers-components/CtaSection";
import Navbar from "@/components/Navbar";
import BackToTop from "@/components/BackToTop";

export default function CareersPage() {
  return (
    <main style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />
      <BackToTop />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        @keyframes careers-spin { to { transform: rotate(360deg); } }

        .careers-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 64px;
        }

        .role-meta-mobile { display: none; }

        @media (max-width: 1024px) {
          .careers-inner { padding: 0 32px; }
          .careers-hero-grid       { grid-template-columns: 1fr !important; }
          .careers-hero-right      { display: none !important; }
          .careers-culture-grid    { grid-template-columns: 1fr !important; }
          .careers-culture-images  { height: 320px !important; }
          .careers-culture-images > div:nth-child(2),
          .careers-culture-images > div:nth-child(3) { display: none !important; }
          .careers-culture-images > div:first-child   { grid-column: 1 / -1 !important; }
          .role-row-meta           { display: none !important; }
          .role-meta-mobile        { display: flex !important; }
          .role-detail-left        { padding-left: 0 !important; }
          .app-form-inner          { padding-left: 0 !important; }
          .role-index              { display: none; }
          .role-row-header         { grid-template-columns: 1fr auto auto !important; }
          .careers-roles-header    { grid-template-columns: 1fr !important; gap: 24px !important; }
        }

        @media (max-width: 640px) {
          .careers-inner           { padding: 0 20px; }
          .careers-stats           { gap: 28px !important; }
          .careers-culture-images  { height: 240px !important; }
          .form-row-2 {
            display: flex !important;
            flex-direction: column !important;
            gap: 16px !important;
          }
        }
      `}</style>

      <HeroSection />
      <CultureSection />
      <RolesSection />
      <CtaSection />
    </main>
  );
}
