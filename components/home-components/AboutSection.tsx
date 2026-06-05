"use client";

import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------
const CONTENT = [
  {
    id: "our-story",
    title: "Trusted HVAC & Energy Engineers in Kenya Since 2018",
    // h2 only on the first (default-visible) panel; others get h3
    headingLevel: "h2" as const,
    subtitle: "Our Story",
    description:
      "Founded in 2018, Élan Climat & Énergie has grown from a local HVAC installer into one of Kenya's most trusted full-service engineering companies. We deliver precision-engineered climate, energy, and electrical solutions to residential, commercial, and industrial clients across Nairobi, Mombasa, Kisumu, Eldoret, Nakuru, and Nyeri — and across East Africa including Uganda, Tanzania, and Rwanda.",
    cta: "Our Story",
    images: [
      {
        src: "/images/fandymuch.jpg",
        alt: "HVAC installation project in Nairobi Kenya",
      },
      { src: "/images/coldroom.webp", alt: "Cold room installation Kenya" },
      { src: "/images/solar.jpg", alt: "Solar panel installation Kenya" },
    ],
    href: "/about#our-story",
  },
  {
    id: "our-services",
    title: "HVAC, Solar, Refrigeration & Electrical Services in Kenya",
    headingLevel: "h3" as const,
    subtitle: "Our Services",
    description:
      "We design, install, and maintain HVAC systems, solar panels, cold rooms, refrigeration units, electrical systems, and elevator installations across Kenya. Our certified engineers deliver energy-efficient, reliable solutions for hotels, hospitals, offices, warehouses, supermarkets, and homes throughout Nairobi, Mombasa, and beyond.",
    cta: "Explore Our Services",
    images: [
      { src: "/images/lift.jpg", alt: "Elevator installation Nairobi Kenya" },
      { src: "/images/elevator.jpg", alt: "Lift installation Kenya" },
      { src: "/images/liftrpr.png", alt: "Elevator maintenance Kenya" },
    ],
    href: "/about#our-services",
  },
  {
    id: "csr-esg",
    title: "Sustainable Engineering & ESG Leadership in East Africa",
    headingLevel: "h3" as const,
    subtitle: "Corporate Responsibility",
    description:
      "We are committed to sustainable engineering practices across Kenya and East Africa — reducing carbon footprints through solar energy systems, energy-efficient HVAC installations, and green refrigeration solutions. Our CSR and ESG programmes empower local engineers, support community development, and help businesses meet environmental standards across the region.",
    cta: "Learn More",
    images: [
      { src: "/images/boadroom.jpg", alt: "Élan Climat boardroom Nairobi" },
      {
        src: "/images/treeplanting.jpg",
        alt: "Environmental CSR tree planting Kenya",
      },
      { src: "/images/social.jpg", alt: "Community engagement East Africa" },
    ],
    href: "/about#csr-esg",
  },
];

const TAB_LABELS = ["Our Story", "About Us", "Corporate"];

// ---------------------------------------------------------------------------
// JSON-LD schema — injected once, server-readable
// ---------------------------------------------------------------------------
const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Élan Climat & Énergie",
  url: "https://elanclimatenergy.com",
  foundingDate: "2018",
  description:
    "Full-service HVAC, solar, refrigeration, electrical, and elevator engineering company serving Kenya and East Africa since 2018.",
  areaServed: [
    "Nairobi",
    "Mombasa",
    "Kisumu",
    "Eldoret",
    "Nakuru",
    "Nyeri",
    "Uganda",
    "Tanzania",
    "Rwanda",
  ],
  serviceType: [
    "HVAC Installation",
    "Solar Panel Installation",
    "Cold Room Installation",
    "Refrigeration Services",
    "Electrical Engineering",
    "Elevator Installation",
  ],
};

// ---------------------------------------------------------------------------
// Image collage — animated on tab switch
// ---------------------------------------------------------------------------
function ImageCollage({
  images,
  tabId,
}: {
  images: (typeof CONTENT)[0]["images"];
  tabId: string;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={tabId}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "60% 40%",
          gap: 12,
          height: 560,
        }}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Large top image spanning both columns */}
        <div
          style={{
            gridColumn: "1 / -1",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Image
            src={images[0].src}
            alt={images[0].alt}
            fill
            className="object-cover"
            priority={tabId === "our-story"}
            sizes="(max-width: 1024px) 100vw, 50vw"
            quality={80}
          />
        </div>

        {/* Bottom-left */}
        <motion.div
          style={{ position: "relative", overflow: "hidden" }}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
        >
          <Image
            src={images[1].src}
            alt={images[1].alt}
            fill
            className="object-cover"
            loading="lazy"
            sizes="25vw"
            quality={80}
          />
        </motion.div>

        {/* Bottom-right */}
        <motion.div
          style={{ position: "relative", overflow: "hidden" }}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.14 }}
        >
          <Image
            src={images[2].src}
            alt={images[2].alt}
            fill
            className="object-cover"
            loading="lazy"
            sizes="25vw"
            quality={80}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ---------------------------------------------------------------------------
// Panel content — AnimatePresence crossfade, but ALL panels stay in DOM
// ---------------------------------------------------------------------------
function PanelContent({
  item,
  isActive,
}: {
  item: (typeof CONTENT)[0];
  isActive: boolean;
}) {
  const Heading = item.headingLevel;

  return (
    /*
     * SEO note: panel is ALWAYS rendered in the DOM so Googlebot reads every
     * word. Inactive panels are position:absolute / aria-hidden so they are
     * invisible and non-interactive for users, but fully crawlable.
     */
    <motion.div
      id={`panel-${item.id}`}
      role="tabpanel"
      aria-labelledby={`tab-${item.id}`}
      aria-hidden={!isActive}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
        position: isActive ? "relative" : "absolute",
        top: 0,
        left: 0,
        width: "100%",
        pointerEvents: isActive ? "auto" : "none",
      }}
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {/* Eyebrow */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 24, height: 1, background: "#c8c8c4" }} />
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.62rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#8fa68e",
            fontWeight: 700,
          }}
        >
          {item.subtitle}
        </span>
      </div>

      {/*
       * h2 for the first (default) panel, h3 for the rest.
       * This prevents three competing h2s on the page which dilutes
       * keyword authority — a common tab-component SEO mistake.
       */}
      <Heading
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
          fontWeight: 400,
          color: "#1a1a18",
          lineHeight: 1.12,
          letterSpacing: "-0.015em",
          margin: 0,
        }}
      >
        {item.title}
      </Heading>

      <div style={{ width: 32, height: 1, background: "#c8c8c4" }} />

      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.88rem",
          color: "#6b6b68",
          lineHeight: 1.8,
          margin: 0,
          fontWeight: 300,
        }}
      >
        {item.description}
      </p>

      {/*
       * CTA is an <a> tag (via Link) — crawlable by Googlebot as a real link,
       * reinforcing the anchor text keywords and the target page's authority.
       */}
      <Link href={item.href} className="about-cta-link">
        {item.cta}
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M1 9L9 1M9 1H3M9 1V7"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      </Link>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------
export default function AboutSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <>
      {/* JSON-LD LocalBusiness schema — parsed by Googlebot on every render */}
      <Script
        id="about-local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(LOCAL_BUSINESS_SCHEMA),
        }}
        strategy="afterInteractive"
      />

      <section
        aria-label="About Élan Climat — HVAC and Energy Services Kenya"
        style={{
          backgroundColor: "#f9f7f4",
          padding: "96px 0",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <style>{`
          .about-home-grid {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 64px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 72px;
            align-items: start;
          }
          @media (max-width: 1024px) {
            .about-home-grid {
              grid-template-columns: 1fr;
              padding: 0 32px;
              gap: 48px;
            }
            .about-home-images {
              display: none;
            }
          }
          @media (max-width: 640px) {
            .about-home-grid { padding: 0 24px; }
          }
          .about-cta-link {
            font-family: 'DM Sans', sans-serif;
            font-size: 0.72rem;
            font-weight: 500;
            color: #1a1a18;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            border-bottom: 1px solid #1a1a18;
            padding-bottom: 2px;
            align-self: flex-start;
            margin-top: 8px;
            transition: color 0.2s, border-color 0.2s;
          }
          .about-cta-link:hover {
            color: #888580;
            border-color: #888580;
          }
        `}</style>

        <div className="about-home-grid">
          {/* Left: animated image collage */}
          <div className="about-home-images">
            <ImageCollage
              images={CONTENT[currentIndex].images}
              tabId={CONTENT[currentIndex].id}
            />
          </div>

          {/* Right: tab controls + always-in-DOM panels */}
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {/*
             * Tab controls.
             * Using div[role="tablist"] — NOT <nav>. The <nav> landmark is
             * reserved for site-level navigation; using it here was
             * semantically incorrect and could confuse crawlers.
             */}
            <div
              aria-label="About sections"
              style={{ marginBottom: 40, alignSelf: "flex-start" }}
            >
              <div
                role="tablist"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 2,
                  padding: "3px",
                  background: "#ffffff",
                  border: "1px solid #8fa68e",
                  borderRadius: 9999,
                }}
              >
                {TAB_LABELS.map((label, i) => (
                  <button
                    key={label}
                    id={`tab-${CONTENT[i].id}`}
                    role="tab"
                    onClick={() => setCurrentIndex(i)}
                    aria-selected={currentIndex === i}
                    aria-controls={`panel-${CONTENT[i].id}`}
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.72rem",
                      fontWeight: currentIndex === i ? 500 : 400,
                      letterSpacing: "0.04em",
                      padding: "7px 18px",
                      borderRadius: 9999,
                      border: "none",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      background:
                        currentIndex === i ? "#1a1a18" : "transparent",
                      color: currentIndex === i ? "#ffffff" : "#888580",
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/*
             * Panel container.
             * position:relative on the wrapper so absolute-positioned
             * inactive panels stack underneath the active one without
             * collapsing the container height.
             */}
            <div style={{ position: "relative" }}>
              {CONTENT.map((item, i) => (
                <PanelContent
                  key={item.id}
                  item={item}
                  isActive={currentIndex === i}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
