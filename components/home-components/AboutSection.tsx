// components/home-components/AboutSection.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

const CONTENT = [
  {
    title: "Trusted HVAC & Energy Engineers in Kenya Since 2018",
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
    title: "HVAC, Solar, Refrigeration & Electrical Services in Kenya",
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
    title: "Sustainable Engineering & ESG Leadership in East Africa",
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

export default function AboutSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
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
          .about-home-grid { grid-template-columns: 1fr; padding: 0 32px; gap: 48px; }
          .about-home-images { display: none; }
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
          <motion.div
            key={`main-${currentIndex}`}
            style={{
              gridColumn: "1 / -1",
              position: "relative",
              overflow: "hidden",
            }}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
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

          <motion.div
            key={`bl-${currentIndex}`}
            style={{ position: "relative", overflow: "hidden" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
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

          <motion.div
            key={`br-${currentIndex}`}
            style={{ position: "relative", overflow: "hidden" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
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
        </div>

        {/* Right: text + tab nav */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {/* Tab nav */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 2,
              padding: "3px",
              background: "#ffffff",
              border: "1px solid #8fa68e",
              borderRadius: 9999,
              alignSelf: "flex-start",
              marginBottom: 40,
            }}
          >
            {TAB_LABELS.map((label, i) => (
              <button
                key={label}
                onClick={() => setCurrentIndex(i)}
                aria-pressed={currentIndex === i}
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
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/*
            SEO FIX: All tab content is rendered in the DOM at all times.
            Inactive tabs are visually hidden but remain readable by Google.
          */}
          <div style={{ position: "relative" }}>
            {CONTENT.map((item, i) => (
              <div
                key={i}
                aria-hidden={currentIndex !== i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                  position: currentIndex !== i ? "absolute" : "relative",
                  top: 0,
                  left: 0,
                  width: "100%",
                  opacity: currentIndex === i ? 1 : 0,
                  pointerEvents: currentIndex === i ? "auto" : "none",
                  transition: "opacity 0.4s ease",
                  visibility: currentIndex !== i ? "hidden" : "visible",
                }}
              >
                {/* Eyebrow */}
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div
                    style={{ width: 24, height: 1, background: "#c8c8c4" }}
                  />
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
                  {item.title}
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
                  {item.description}
                </p>

                {/* CTA — hover handled via CSS class to avoid shorthand conflict */}
                <Link href={item.href} className="about-cta-link">
                  {item.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
