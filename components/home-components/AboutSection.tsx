// components/home-components/AboutSection.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CONTENT = [
  {
    title: "From a Vision to a Trusted Name",
    subtitle: "Since 2018",
    description:
      "Established in 2018, what started as a passion for smarter, sustainable buildings has grown into a full-service engineering company, bringing precision, innovation, energy economics and dependability to every system we touch across Kenya.",
    cta: "Partner With Us",
    images: [
      { src: "/images/fandymuch.jpg", alt: "Outdoor HVAC system" },
      { src: "/images/coldroom.webp", alt: "Cold room facility" },
      { src: "/images/solar.jpg", alt: "Solar panels installation" },
    ],
    href: "/about#our-story",
  },
  {
    title: "Engineering for Every Building's Needs",
    subtitle: "Unmatched Craftsmanship",
    description:
      "We design, install, and maintain HVAC, solar, refrigeration, electrical, and elevator systems, delivering reliable, energy-efficient solutions that keep homes and businesses running at peak performance across Kenya.",
    cta: "Explore Our Services",
    images: [
      { src: "/images/lift.jpg", alt: "Elevator installation" },
      { src: "/images/elevator.jpg", alt: "Elevator interior" },
      { src: "/images/liftrpr.png", alt: "Elevator installation" },
    ],
    href: "/about#our-services",
  },
  {
    title: "Leading with Purpose, Building for Tomorrow",
    subtitle: "CSR & ESG Strategies",
    description:
      "We are committed to ethical leadership, environmental stewardship, and community impact, engineering sustainable systems that reduce carbon footprints, empower local talent, and build a cleaner, more resilient future for Kenya.",
    cta: "Learn More",
    images: [
      { src: "/images/boadroom.jpg", alt: "Boardroom" },
      { src: "/images/treeplanting.jpg", alt: "Tree planting activity" },
      { src: "/images/social.jpg", alt: "Social engagement activity" },
    ],
    href: "/about#csr-esg",
  },
];

const TAB_LABELS = ["Our Story", "About Us", "Corporate"];

export default function AboutSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <section
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
          .about-home-grid { grid-template-columns: 1fr; padding: 0 32px; gap: 48px; }
          .about-home-images { display: none; }
        }
        @media (max-width: 640px) {
          .about-home-grid { padding: 0 24px; }
        }
      `}</style>

      <div className="about-home-grid">
        {/* Left: stacked image collage */}
        <div
          className="about-home-images"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "60% 40%",
            gap: 12,
            height: 560,
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`main-${currentIndex}`}
              style={{
                gridColumn: "1 / -1",
                position: "relative",
                overflow: "hidden",
              }}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={CONTENT[currentIndex].images[0].src}
                alt={CONTENT[currentIndex].images[0].alt}
                fill
                className="object-cover"
                priority={currentIndex === 0}
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={80}
              />
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`bl-${currentIndex}`}
              style={{ position: "relative", overflow: "hidden" }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.08,
              }}
            >
              <Image
                src={CONTENT[currentIndex].images[1].src}
                alt={CONTENT[currentIndex].images[1].alt}
                fill
                className="object-cover"
                loading="lazy"
                sizes="(max-width: 1024px) 50vw, 25vw"
                quality={80}
              />
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`br-${currentIndex}`}
              style={{ position: "relative", overflow: "hidden" }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.14,
              }}
            >
              <Image
                src={CONTENT[currentIndex].images[2].src}
                alt={CONTENT[currentIndex].images[2].alt}
                fill
                className="object-cover"
                loading="lazy"
                sizes="(max-width: 1024px) 50vw, 25vw"
                quality={80}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right: text + tab nav */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {/* Tab nav — matches shop's borderless pill style */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 2,
              padding: "3px",
              background: "#ffffff",
              border: "1px solid #e8e8e4",
              borderRadius: 9999,
              alignSelf: "flex-start",
              marginBottom: 40,
              borderColor: "#8fa68e",
            }}
          >
            {TAB_LABELS.map((label, i) => (
              <button
                key={label}
                onClick={() => setCurrentIndex(i)}
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
                  background: currentIndex === i ? "#1a1a18" : "transparent",
                  color: currentIndex === i ? "#ffffff" : "#888580",
                  borderColor: currentIndex === i ? "#8fa68e" : "transparent",
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Animated content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${currentIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: "flex", flexDirection: "column", gap: 20 }}
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
                  {CONTENT[currentIndex].subtitle}
                </span>
              </div>

              {/* Headline */}
              <h2
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
                {CONTENT[currentIndex].title}
              </h2>

              {/* Divider */}
              <div style={{ width: 32, height: 1, background: "#c8c8c4" }} />

              {/* Body */}
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
                {CONTENT[currentIndex].description}
              </p>

              {/* CTA */}
              <Link
                href={CONTENT[currentIndex].href}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: 500,
                  color: "#1a1a18",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  borderBottom: "1px solid #1a1a18",
                  paddingBottom: 2,
                  alignSelf: "flex-start",
                  marginTop: 8,
                  transition: "color 0.2s, border-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "#888580";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor =
                    "#888580";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "#1a1a18";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor =
                    "#1a1a18";
                }}
              >
                {CONTENT[currentIndex].cta}
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
