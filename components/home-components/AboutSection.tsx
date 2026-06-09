"use client";

import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./AboutSection.module.css";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------
const CONTENT = [
  {
    id: "our-story",
    title: "Trusted HVAC & Energy Engineers in Kenya Since 2018",
    headingLevel: "h2" as const,
    subtitle: "Our Story",
    description:
      "Founded in 2018, Élan Climat & Énergie has grown from a local HVAC installer into one of Kenya's most trusted full-service engineering companies. We deliver precision-engineered climate, energy, and electrical solutions to residential, commercial, and industrial clients across Nairobi, Mombasa, Kisumu, Eldoret, Nakuru, and Nyeri — and across East Africa including Uganda, Tanzania, and Rwanda.",
    cta: "The Seed Before the Rose",
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
    cta: "the value we promise your project",
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
    cta: "Our CSR & ESG Initiatives",
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
// JSON-LD schema
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
        className={styles.collage}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Large top image spanning both columns */}
        <div className={styles.collageMain}>
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
          className={styles.collageBottomLeft}
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
          className={styles.collageBottomRight}
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
// Panel content — ALL panels stay in DOM for SEO, toggled via data-active
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
    <div
      id={`panel-${item.id}`}
      role="tabpanel"
      aria-labelledby={`tab-${item.id}`}
      aria-hidden={!isActive}
      data-active={isActive}
      className={styles.panel}
    >
      {/* Eyebrow */}
      <div className={styles.eyebrow}>
        <div className={styles.eyebrowLine} />
        <span className={styles.eyebrowText}>{item.subtitle}</span>
      </div>

      <Heading className={styles.panelHeading}>{item.title}</Heading>

      <div className={styles.rule} />

      <p className={styles.panelDescription}>{item.description}</p>

      <Link href={item.href} className={styles.ctaLink}>
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
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------
export default function AboutSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <>
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
        className={styles.section}
      >
        <div className={styles.grid}>
          {/* Left: animated image collage */}
          <div className={styles.images}>
            <ImageCollage
              images={CONTENT[currentIndex].images}
              tabId={CONTENT[currentIndex].id}
            />
          </div>

          {/* Right: tab controls + always-in-DOM panels */}
          <div className={styles.right}>
            <div className={styles.tabControls}>
              <div
                role="tablist"
                aria-label="About sections"
                className={styles.tabList}
              >
                {TAB_LABELS.map((label, i) => (
                  <button
                    key={label}
                    id={`tab-${CONTENT[i].id}`}
                    role="tab"
                    onClick={() => setCurrentIndex(i)}
                    aria-selected={currentIndex === i}
                    aria-controls={`panel-${CONTENT[i].id}`}
                    data-active={currentIndex === i}
                    className={styles.tabButton}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.panelContainer}>
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
