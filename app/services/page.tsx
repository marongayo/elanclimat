// app/services/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowUpRight, ArrowUp, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";

// ─── Shared design tokens ────────────────────────────────────────────────────
const C = {
  charcoal: "#1a1a18",
  warmWhite: "#f9f7f4",
  offWhite: "#ede9e2",
  sage: "#8fa68e",
  sageDark: "#5a7a59",
  accent: "#c9a96e",
  muted: "#888580",
  body: "#6b6b68",
  rule: "#e8e8e4",
  ruleLight: "#c8c8c4",
  dim: "#b0b0a8",
};

// ─── Unsplash images per service ─────────────────────────────────────────────
const IMG = {
  hero: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1800&q=85",

  // HVAC
  hvacHero: "/everett.jpg",
  hvacA: "/sticky.png",
  hvacB: "/images/HVAC.jpg",

  // Plumbing
  plumbingHero:
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
  plumbingA:
    "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=700&q=80",
  plumbingB:
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80",

  // Solar
  solarHero:
    "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&q=80",
  solarA: "/muhammed.jpg",
  solarB: "/newpowa.jpg",

  // Cold Room
  coldHero: "/images/coldroom.webp",
  coldA: "https://images.unsplash.com/photo-1534482421-64566f976cfa?w=700&q=80",
  coldB:
    "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=700&q=80",

  // Elevator
  elevatorHero:
    "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80",
  elevatorA: "/images/elevator.jpg",
  elevatorB: "/images/lift.jpg",

  // Electrical
  electricalHero:
    "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1200&q=80",
  electricalA:
    "https://images.unsplash.com/photo-1516849677043-ef67c9557e16?w=700&q=80",
  electricalB:
    "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=700&q=80",
};

// ─── Services data ────────────────────────────────────────────────────────────
const SERVICES = [
  {
    id: "hvac",
    anchor: "hvac",
    num: "01",
    eyebrow: "Climate Control",
    title: "HVAC Services",
    headline: "Precision Climate, Every Season",
    description:
      "From split units to full VRF systems, we design, install, and maintain HVAC solutions for homes, offices, hotels, and industrial facilities across Kenya. Every system is sized and commissioned for peak energy efficiency.",
    features: [
      "Full system design & load calculations",
      "VRF / VRV multi-split systems",
      "Ducted central air systems",
      "Preventive maintenance contracts",
      "Air quality & filtration upgrades",
    ],
    heroImg: IMG.hvacHero,
    colA: IMG.hvacA,
    colB: IMG.hvacB,
    colAlt: ["HVAC installation", "Ducting system"],
    accent: C.sage,
    dark: false,
  },
  {
    id: "plumbing",
    anchor: "plumbing",
    num: "02",
    eyebrow: "Water Systems",
    title: "Plumbing Services",
    headline: "Flows Built to Last",
    description:
      "Complete plumbing solutions from underground supply lines to high-rise riser systems and sanitary installations. We handle new builds, renovations, and emergency repairs with the same standard of craft.",
    features: [
      "Domestic & commercial supply lines",
      "High-rise riser & stack systems",
      "Sanitary & drainage installations",
      "Hot-water system design",
      "Leak detection & remediation",
    ],
    heroImg: IMG.plumbingHero,
    colA: IMG.plumbingA,
    colB: IMG.plumbingB,
    colAlt: ["Plumbing installation", "Pipe system"],
    accent: C.sage,
    dark: true,
  },
  {
    id: "solar",
    anchor: "solar",
    num: "03",
    eyebrow: "Renewable Energy",
    title: "Solar Installation",
    headline: "Harness Kenya's Sunshine",
    description:
      "Grid-tied, off-grid, and hybrid solar PV systems engineered for maximum yield. We handle site survey, structural mounting, inverter sizing, battery storage, and grid interconnection — end to end.",
    features: [
      "Rooftop & ground-mount PV systems",
      "Battery energy storage (BESS)",
      "Hybrid grid-tied systems",
      "Net-metering & KPLC liaison",
      "Performance monitoring & O&M",
    ],
    heroImg: IMG.solarHero,
    colA: IMG.solarA,
    colB: IMG.solarB,
    colAlt: ["Solar panel array", "Solar installation"],
    accent: C.accent,
    dark: false,
  },
  {
    id: "cold-room",
    anchor: "cold-room",
    num: "04",
    eyebrow: "Refrigeration",
    title: "Cold Room Installation",
    headline: "Cold Chain, Zero Compromise",
    description:
      "Purpose-built cold rooms and walk-in freezers for food processing, hospitality, pharmaceuticals, and floriculture. We engineer tight temperature tolerances, redundant compressors, and IoT-based monitoring.",
    features: [
      "Walk-in cold rooms & blast freezers",
      "Modular panel system design",
      "Remote temperature monitoring",
      "Compressor & refrigerant servicing",
      "Food-safe hygienic finishes",
    ],
    heroImg: IMG.coldHero,
    colA: IMG.coldA,
    colB: IMG.coldB,
    colAlt: ["Cold room facility", "Refrigeration unit"],
    accent: C.sage,
    dark: true,
  },
  {
    id: "elevator",
    anchor: "elevator",
    num: "05",
    eyebrow: "Vertical Transport",
    title: "Elevator Installation",
    headline: "Moving People with Elegance",
    description:
      "Passenger, service, and goods lifts for residential apartments, commercial towers, and hospitals. From machine-room-less (MRL) traction lifts to hydraulic systems — fully compliant with Kenya's building codes.",
    features: [
      "MRL traction & hydraulic lifts",
      "Passenger, goods & hospital elevators",
      "Cab design & interior fit-out",
      "KEBS-compliant annual inspections",
      "24/7 entrapment emergency service",
    ],
    heroImg: IMG.elevatorHero,
    colA: IMG.elevatorA,
    colB: IMG.elevatorB,
    colAlt: ["Elevator shaft", "Elevator interior"],
    accent: C.sage,
    dark: false,
  },
  {
    id: "electrical",
    anchor: "electrical",
    num: "06",
    eyebrow: "Power Systems",
    title: "Electrical",
    headline: "Power Engineered for Reliability",
    description:
      "Low-voltage distribution, standby generators, earthing systems, and smart building automation. We design and install electrical infrastructure that meets EPRA standards and keeps critical loads protected.",
    features: [
      "LV panel boards & distribution",
      "Standby generator & ATS systems",
      "Earthing, bonding & lightning protection",
      "Building automation & smart controls",
      "Infrared thermographic surveys",
    ],
    heroImg: IMG.electricalHero,
    colA: IMG.electricalA,
    colB: IMG.electricalB,
    colAlt: ["Electrical panel", "Power distribution"],
    accent: C.accent,
    dark: true,
  },
];

// ─── Shared components ────────────────────────────────────────────────────────
function Eyebrow({ text, light = false }: { text: string; light?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <span
        style={{
          display: "inline-block",
          width: 24,
          height: 1,
          background: light ? "rgba(255,255,255,0.35)" : C.ruleLight,
        }}
      />
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.62rem",
          letterSpacing: "0.22em",
          textTransform: "uppercase" as const,
          color: light ? "rgba(255,255,255,0.45)" : C.sage,
          fontWeight: 500,
        }}
      >
        {text}
      </span>
    </div>
  );
}

// ─── Feature item ─────────────────────────────────────────────────────────────
function Feature({ text, dark }: { text: string; dark: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <CheckCircle2
        size={14}
        strokeWidth={1.8}
        style={{ color: C.sage, flexShrink: 0, marginTop: 1 }}
      />
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.82rem",
          color: dark ? "rgba(255,255,255,0.65)" : C.body,
          lineHeight: 1.5,
          fontWeight: 300,
        }}
      >
        {text}
      </span>
    </div>
  );
}

// ─── Service Section ──────────────────────────────────────────────────────────
function ServiceSection({
  service,
  index,
}: {
  service: (typeof SERVICES)[0];
  index: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const bg = service.dark ? C.charcoal : C.warmWhite;
  const isEven = index % 2 === 0;

  return (
    <section
      id={service.anchor}
      ref={ref}
      style={{ backgroundColor: bg, padding: "96px 0", scrollMarginTop: 80 }}
    >
      <style>{`
        .svc-inner-${service.id} {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 64px;
        }
        .svc-grid-${service.id} {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 72px;
          align-items: start;
          margin-top: 56px;
        }
        @media (max-width: 1024px) {
          .svc-inner-${service.id} { padding: 0 32px; }
          .svc-grid-${service.id} { grid-template-columns: 1fr; gap: 40px; }
          .svc-img-col-${service.id} { display: none; }
        }
        @media (max-width: 640px) {
          .svc-inner-${service.id} { padding: 0 24px; }
        }
      `}</style>

      <div className={`svc-inner-${service.id}`}>
        {/* Section header row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 24,
            borderBottom: `1px solid ${
              service.dark ? "rgba(255,255,255,0.1)" : C.rule
            }`,
            paddingBottom: 28,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Eyebrow text={service.eyebrow} light={service.dark} />
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
                fontWeight: 400,
                color: service.dark ? "#ffffff" : C.charcoal,
                lineHeight: 1.1,
                letterSpacing: "-0.015em",
                margin: 0,
              }}
            >
              {service.headline}
            </h2>
          </div>

          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(3rem, 6vw, 5rem)",
              fontWeight: 300,
              color: service.dark ? "rgba(255,255,255,0.08)" : C.offWhite,
              lineHeight: 1,
              letterSpacing: "-0.04em",
              flexShrink: 0,
            }}
          >
            {service.num}
          </span>
        </motion.div>

        {/* Grid: text left / images right (or reversed on even) */}
        <div
          className={`svc-grid-${service.id}`}
          style={{ direction: isEven ? "ltr" : "rtl" }}
        >
          {/* Text column */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? -20 : 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.1,
            }}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 24,
              direction: "ltr",
            }}
          >
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.88rem",
                color: service.dark ? "rgba(255,255,255,0.55)" : C.body,
                lineHeight: 1.85,
                margin: 0,
                fontWeight: 300,
              }}
            >
              {service.description}
            </p>

            <div
              style={{
                width: 32,
                height: 1,
                background: service.dark
                  ? "rgba(255,255,255,0.15)"
                  : C.ruleLight,
              }}
            />

            {/* Feature list */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {service.features.map((f) => (
                <Feature key={f} text={f} dark={service.dark} />
              ))}
            </div>

            {/* CTA */}
            <Link
              href="/contact"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.72rem",
                fontWeight: 500,
                color: service.dark ? "#ffffff" : C.charcoal,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                alignSelf: "flex-start",
                marginTop: 8,
                borderBottom: `1px solid ${service.dark ? "rgba(255,255,255,0.35)" : C.charcoal}`,
                paddingBottom: 2,
                transition: "color 0.2s, border-color 0.2s",
              }}
            >
              Request a Quote
              <ArrowUpRight size={12} strokeWidth={2} />
            </Link>
          </motion.div>

          {/* Image collage column */}
          <motion.div
            className={`svc-img-col-${service.id}`}
            initial={{ opacity: 0, x: isEven ? 20 : -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.15,
            }}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gridTemplateRows: "60% 40%",
              gap: 10,
              height: 480,
              direction: "ltr",
            }}
          >
            {/* Main large image spanning full width */}
            <div
              style={{
                gridColumn: "1 / -1",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Image
                src={service.heroImg}
                alt={service.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
                quality={80}
              />
              {/* Service title badge */}
              <div
                style={{
                  position: "absolute",
                  bottom: 16,
                  left: 16,
                  background: "rgba(26,26,24,0.72)",
                  backdropFilter: "blur(8px)",
                  padding: "6px 14px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  borderRadius: 9999,
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                <span
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: C.sage,
                    flexShrink: 0,
                    display: "inline-block",
                  }}
                />
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.62rem",
                    color: "rgba(255,255,255,0.85)",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  {service.title}
                </span>
              </div>
            </div>

            {/* Two smaller images */}
            <div style={{ position: "relative", overflow: "hidden" }}>
              <Image
                src={service.colA}
                alt={service.colAlt[0]}
                fill
                sizes="25vw"
                style={{ objectFit: "cover" }}
                quality={80}
              />
            </div>
            <div style={{ position: "relative", overflow: "hidden" }}>
              <Image
                src={service.colB}
                alt={service.colAlt[1]}
                fill
                sizes="25vw"
                style={{ objectFit: "cover" }}
                quality={80}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Page component ───────────────────────────────────────────────────────────
export default function ServicesPage() {
  const [showTop, setShowTop] = useState(false);
  const [activeAnchor, setActiveAnchor] = useState("hvac");

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Sticky nav highlight on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveAnchor(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    SERVICES.forEach((s) => {
      const el = document.getElementById(s.anchor);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <main style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

        * { box-sizing: border-box; }

        /* Sticky service nav */
        .svc-nav-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 64px;
          display: flex;
          align-items: center;
          gap: 0;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .svc-nav-inner::-webkit-scrollbar { display: none; }

        @media (max-width: 768px) {
          .svc-nav-inner { padding: 0 24px; gap: 0; }
        }

        .svc-nav-link {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.68rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 16px 18px;
          white-space: nowrap;
          border-bottom: 2px solid transparent;
          transition: color 0.2s, border-color 0.2s;
          color: #888580;
        }
        .svc-nav-link.active {
          color: #1a1a18;
          border-bottom-color: #8fa68e;
        }
        .svc-nav-link:hover { color: #1a1a18; }

        /* Hero section */
        .services-hero-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 64px;
        }
        @media (max-width: 768px) {
          .services-hero-inner { padding: 0 28px; }
        }
      `}</style>

      {/* ══════════════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════════════ */}
      <div
        style={{
          position: "relative",
          height: "65vh",
          minHeight: 480,
          overflow: "hidden",
        }}
      >
        <Image
          src={IMG.hero}
          alt="Services hero"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center 40%" }}
          quality={85}
        />
        {/* Dark overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(26,26,24,0.80) 0%, rgba(26,26,24,0.45) 60%, rgba(26,26,24,0.15) 100%)",
            zIndex: 1,
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            height: "100%",
            paddingBottom: 56,
          }}
        >
          <div className="services-hero-inner">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: "flex", flexDirection: "column", gap: 16 }}
            >
              {/* Breadcrumb */}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Link
                  href="/"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.65rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.4)",
                    textDecoration: "none",
                  }}
                >
                  Home
                </Link>
                <span
                  style={{
                    color: "rgba(255,255,255,0.25)",
                    fontSize: "0.6rem",
                  }}
                >
                  /
                </span>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.65rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: C.sage,
                  }}
                >
                  Services
                </span>
              </div>

              <Eyebrow text="What We Do" light />

              <h1
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(2.6rem, 5vw, 4rem)",
                  fontWeight: 500,
                  color: "#ffffff",
                  lineHeight: 1.08,
                  letterSpacing: "-0.015em",
                  margin: 0,
                  maxWidth: 600,
                }}
              >
                Engineering Every System,
                <br />
                <span style={{ fontWeight: 300 }}>Built to Perform</span>
              </h1>

              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.88rem",
                  color: "rgba(255,255,255,0.65)",
                  lineHeight: 1.75,
                  maxWidth: 420,
                  margin: 0,
                  fontWeight: 300,
                }}
              >
                Six disciplines. One company. Delivering precision-engineered
                HVAC, solar, plumbing, refrigeration, elevator, and electrical
                solutions across Kenya.
              </p>

              {/* Quick-jump tags */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                  marginTop: 8,
                }}
              >
                {SERVICES.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.anchor}`}
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.68rem",
                      fontWeight: 400,
                      letterSpacing: "0.04em",
                      color: "rgba(255,255,255,0.85)",
                      textDecoration: "none",
                      background: "rgba(255,255,255,0.08)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(255,255,255,0.16)",
                      padding: "6px 14px 6px 10px",
                      borderRadius: 9999,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 7,
                      transition: "background 0.2s, border-color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.background =
                        "rgba(255,255,255,0.16)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.background =
                        "rgba(255,255,255,0.08)";
                    }}
                  >
                    <span
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        background: C.sage,
                        flexShrink: 0,
                        display: "inline-block",
                      }}
                    />
                    {s.title}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          STICKY SERVICE NAV
      ══════════════════════════════════════════════════════════════════════ */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          backgroundColor: C.warmWhite,
          borderBottom: `1px solid ${C.rule}`,
        }}
      >
        <nav className="svc-nav-inner" aria-label="Service sections">
          {SERVICES.map((s) => (
            <a
              key={s.id}
              href={`#${s.anchor}`}
              className={`svc-nav-link${activeAnchor === s.anchor ? " active" : ""}`}
            >
              {s.title}
            </a>
          ))}
        </nav>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          SERVICE SECTIONS
      ══════════════════════════════════════════════════════════════════════ */}
      {SERVICES.map((service, index) => (
        <ServiceSection key={service.id} service={service} index={index} />
      ))}

      {/* ══════════════════════════════════════════════════════════════════════
          PROCESS STRIP
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: C.offWhite, padding: "80px 0" }}>
        <style>{`
          .process-inner {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 64px;
          }
          .process-steps {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 0;
            margin-top: 48px;
          }
          @media (max-width: 900px) {
            .process-inner { padding: 0 32px; }
            .process-steps { grid-template-columns: repeat(2, 1fr); }
          }
          @media (max-width: 560px) {
            .process-inner { padding: 0 24px; }
            .process-steps { grid-template-columns: 1fr; }
          }
        `}</style>
        <div className="process-inner">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              maxWidth: 560,
            }}
          >
            <Eyebrow text="How We Work" />
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                fontWeight: 400,
                color: C.charcoal,
                lineHeight: 1.12,
                letterSpacing: "-0.015em",
                margin: 0,
              }}
            >
              A Process Built on Precision
            </h2>
          </div>

          <div className="process-steps">
            {[
              {
                step: "01",
                title: "Site Survey",
                body: "We assess your space, load requirements, and infrastructure to design a solution that fits perfectly.",
              },
              {
                step: "02",
                title: "Engineering Design",
                body: "Detailed drawings, equipment schedules, and energy models reviewed and approved before a single bolt is turned.",
              },
              {
                step: "03",
                title: "Installation",
                body: "Our certified technicians execute with precision, maintaining your site's cleanliness and schedule.",
              },
              {
                step: "04",
                title: "Commissioning & Support",
                body: "Full system testing, staff handover training, and ongoing maintenance contracts keep you covered long-term.",
              },
            ].map((step, i) => (
              <div
                key={step.step}
                style={{
                  padding: "36px 32px",
                  borderLeft: i > 0 ? `1px solid ${C.rule}` : "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "2.8rem",
                    fontWeight: 300,
                    color: C.rule,
                    lineHeight: 1,
                    letterSpacing: "-0.04em",
                  }}
                >
                  {step.step}
                </span>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.2rem",
                    fontWeight: 500,
                    color: C.charcoal,
                    margin: 0,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.78rem",
                    color: C.body,
                    lineHeight: 1.75,
                    margin: 0,
                    fontWeight: 300,
                  }}
                >
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          CTA BAND
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ background: C.charcoal, padding: "80px 0" }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 64px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: 24,
          }}
        >
          <Eyebrow text="Ready to Begin?" light />
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 400,
              color: "#ffffff",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              margin: 0,
              maxWidth: 540,
            }}
          >
            Let's engineer something exceptional together.
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.82rem",
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.7,
              maxWidth: 380,
              margin: 0,
              fontWeight: 300,
            }}
          >
            Whether you're building from ground up or upgrading an existing
            system, our team is ready to deliver a solution that lasts.
          </p>
          <div
            style={{
              display: "flex",
              gap: 16,
              flexWrap: "wrap",
              justifyContent: "center",
              marginTop: 8,
            }}
          >
            <Link
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background: "#ffffff",
                color: C.charcoal,
                textDecoration: "none",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.75rem",
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "12px 10px 12px 24px",
                borderRadius: 9999,
                border: "1.5px solid #ffffff",
                transition: "background 0.25s, color 0.25s",
              }}
            >
              Get in Touch
              <span
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  background: C.charcoal,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ArrowUpRight size={13} color="#ffffff" strokeWidth={2} />
              </span>
            </Link>
            <Link
              href="/about"
              style={{
                display: "inline-flex",
                alignItems: "center",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.72rem",
                fontWeight: 500,
                color: "rgba(255,255,255,0.5)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                textDecoration: "none",
                borderBottom: "1px solid rgba(255,255,255,0.2)",
                paddingBottom: 2,
                alignSelf: "center",
                transition: "color 0.2s",
              }}
            >
              About the Company
            </Link>
          </div>
        </div>
      </section>

      {/* ── Back to top ── */}
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
