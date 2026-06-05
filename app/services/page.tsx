// app/services/page.tsx
// SERVER COMPONENT — fully statically rendered for maximum SEO

import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import ServiceSection from "@/components/services-components/ServiceSection";
import ServicesClient from "@/components/services-components/ServiceClient";

// ─── Metadata — shows in Google search results ────────────────────────────────
export const metadata: Metadata = {
  title: "HVAC, Solar, Cold Room & Electrical Services in Kenya ",
  description:
    "Professional HVAC installation, solar panel systems, cold rooms, plumbing, elevator installation, and electrical services across Nairobi, Mombasa, Kisumu, Eldoret, Nakuru, and Nyeri. Request a quote today.",
  keywords: [
    "HVAC installation Kenya",
    "solar panel installation Nairobi",
    "cold room installation Kenya",
    "elevator installation Nairobi",
    "electrical services Kenya",
    "plumbing services Nairobi",
    "HVAC maintenance Kenya",
    "refrigeration Kenya",
  ],
  openGraph: {
    title:
      "HVAC, Solar, Cold Room & Electrical Services in Kenya | Élan Climat",
    description:
      "Precision-engineered HVAC, solar, refrigeration, electrical, elevator and plumbing services across Kenya and East Africa.",
    url: "https://www.elanclimat.co.ke/services",
  },
};

// ─── Shared design tokens ─────────────────────────────────────────────────────
export const C = {
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

// ─── Services data ────────────────────────────────────────────────────────────
export const SERVICES = [
  {
    id: "hvac",
    anchor: "hvac",
    num: "01",
    eyebrow: "Climate Control",
    // seoTitle used in h2 — keyword rich
    seoTitle: "HVAC Installation & Maintenance Services in Kenya",
    // headline used as visual subheading below h2
    headline: "Precision Climate, Every Season",
    title: "HVAC Services",
    description:
      "From split units to full VRF systems, we design, install, and service HVAC solutions for homes, offices, hotels, hospitals, and industrial facilities across Nairobi, Mombasa, Kisumu, Eldoret, and Nakuru. Every system is sized and commissioned for peak energy efficiency in Kenya's climate.",
    features: [
      "Full system design & load calculations",
      "VRF / VRV multi-split systems",
      "Ducted central air systems",
      "Preventive maintenance contracts",
      "Air quality & filtration upgrades",
    ],
    heroImg: "/everett.jpg",
    heroAlt: "HVAC installation project in Nairobi Kenya",
    colA: "/sticky.png",
    colB: "/images/HVAC.jpg",
    colAlt: [
      "HVAC ducting installation Kenya",
      "Air conditioning system Nairobi",
    ],
    accent: "#8fa68e",
    dark: false,
  },
  {
    id: "plumbing",
    anchor: "plumbing",
    num: "02",
    eyebrow: "Water Systems",
    seoTitle: "Plumbing Services in Kenya — Commercial & Residential",
    headline: "Flows Built to Last",
    title: "Plumbing Services",
    description:
      "Complete plumbing solutions from underground supply lines to high-rise riser systems and sanitary installations across Nairobi, Mombasa, and Nyeri. We handle new builds, renovations, and emergency repairs for commercial buildings, apartments, hotels, and hospitals throughout Kenya.",
    features: [
      "Domestic & commercial supply lines",
      "High-rise riser & stack systems",
      "Sanitary & drainage installations",
      "Hot-water system design",
      "Leak detection & remediation",
    ],
    heroImg:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
    heroAlt: "Commercial plumbing installation Kenya",
    colA: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=700&q=80",
    colB: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80",
    colAlt: ["Plumbing pipe installation Kenya", "Water supply system Nairobi"],
    accent: "#8fa68e",
    dark: true,
  },
  {
    id: "solar",
    anchor: "solar",
    num: "03",
    eyebrow: "Renewable Energy",
    seoTitle:
      "Solar Panel Installation in Kenya — Grid-Tied & Off-Grid Systems",
    headline: "Harness Kenya's Sunshine",
    title: "Solar Installation",
    description:
      "Grid-tied, off-grid, and hybrid solar PV systems engineered for maximum yield across Kenya. We handle site surveys, structural mounting, inverter sizing, lithium battery storage, and KPLC grid interconnection for homes, businesses, and farms in Nairobi, Mombasa, Kisumu, Nakuru, and rural Kenya.",
    features: [
      "Rooftop & ground-mount PV systems",
      "Battery energy storage (BESS)",
      "Hybrid grid-tied systems",
      "Net-metering & KPLC liaison",
      "Performance monitoring & O&M",
    ],
    heroImg:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&q=80",
    heroAlt: "Solar panel installation Kenya",
    colA: "/muhammed.jpg",
    colB: "/newpowa.jpg",
    colAlt: ["Solar PV system installation Nairobi", "Off-grid solar Kenya"],
    accent: "#c9a96e",
    dark: false,
  },
  {
    id: "cold-room",
    anchor: "cold-room",
    num: "04",
    eyebrow: "Refrigeration",
    seoTitle: "Cold Room Installation & Refrigeration Services in Kenya",
    headline: "Cold Chain, Zero Compromise",
    title: "Cold Room Installation",
    description:
      "Purpose-built cold rooms, walk-in freezers, and blast chillers for food processing, hospitality, pharmaceuticals, and floriculture across Nairobi, Mombasa, Eldoret, and Nakuru. We engineer tight temperature tolerances, redundant compressors, and IoT-based remote monitoring for Kenya's cold chain industry.",
    features: [
      "Walk-in cold rooms & blast freezers",
      "Modular panel system design",
      "Remote temperature monitoring",
      "Compressor & refrigerant servicing",
      "Food-safe hygienic finishes",
    ],
    heroImg: "/images/coldroom.webp",
    heroAlt: "Cold room installation Kenya",
    colA: "https://images.unsplash.com/photo-1534482421-64566f976cfa?w=700&q=80",
    colB: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=700&q=80",
    colAlt: [
      "Cold room refrigeration facility Kenya",
      "Walk-in freezer installation Nairobi",
    ],
    accent: "#8fa68e",
    dark: true,
  },
  {
    id: "elevator",
    anchor: "elevator",
    num: "05",
    eyebrow: "Vertical Transport",
    seoTitle:
      "Elevator & Lift Installation in Kenya — Residential & Commercial",
    headline: "Moving People with Elegance",
    title: "Elevator Installation",
    description:
      "Passenger, service, and goods lifts for residential apartments, commercial towers, and hospitals across Nairobi and Kenya. From machine-room-less (MRL) traction lifts to hydraulic systems — fully compliant with KEBS standards and Kenya's building codes. We also provide 24/7 maintenance and entrapment response.",
    features: [
      "MRL traction & hydraulic lifts",
      "Passenger, goods & hospital elevators",
      "Cab design & interior fit-out",
      "KEBS-compliant annual inspections",
      "24/7 entrapment emergency service",
    ],
    heroImg:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80",
    heroAlt: "Elevator installation Nairobi Kenya",
    colA: "/images/elevator.jpg",
    colB: "/images/lift.jpg",
    colAlt: [
      "Elevator interior installation Kenya",
      "Lift installation Nairobi",
    ],
    accent: "#8fa68e",
    dark: false,
  },
  {
    id: "electrical",
    anchor: "electrical",
    num: "06",
    eyebrow: "Power Systems",
    seoTitle: "Electrical Installation & Engineering Services in Kenya",
    headline: "Power Engineered for Reliability",
    title: "Electrical",
    description:
      "Low-voltage distribution, standby generators, earthing systems, and smart building automation across Nairobi, Mombasa, and Kenya. We design and install electrical infrastructure that meets EPRA standards, protecting critical loads for hospitals, office parks, industrial facilities, and residential developments.",
    features: [
      "LV panel boards & distribution",
      "Standby generator & ATS systems",
      "Earthing, bonding & lightning protection",
      "Building automation & smart controls",
      "Infrared thermographic surveys",
    ],
    heroImg:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1200&q=80",
    heroAlt: "Electrical installation Kenya",
    colA: "https://images.unsplash.com/photo-1516849677043-ef67c9557e16?w=700&q=80",
    colB: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=700&q=80",
    colAlt: [
      "Electrical panel installation Kenya",
      "Power distribution system Nairobi",
    ],
    accent: "#c9a96e",
    dark: true,
  },
];

// ─── Eyebrow component (server-safe) ─────────────────────────────────────────
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

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ServicesPage() {
  return (
    <main style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
        * { box-sizing: border-box; }
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
          .svc-nav-inner { padding: 0 24px; }
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
        .svc-nav-link:hover { color: #1a1a18; }
        .services-hero-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 64px;
        }
        @media (max-width: 768px) {
          .services-hero-inner { padding: 0 28px; }
        }
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

      {/* ── Hero ── */}
      <div
        style={{
          position: "relative",
          height: "65vh",
          minHeight: 480,
          overflow: "hidden",
        }}
      >
        <Image
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1800&q=85"
          alt="HVAC solar and electrical engineering services in Kenya"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center 40%" }}
          quality={85}
        />
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
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Breadcrumb with schema */}
              <nav aria-label="Breadcrumb">
                <ol
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    listStyle: "none",
                    margin: 0,
                    padding: 0,
                  }}
                  itemScope
                  itemType="https://schema.org/BreadcrumbList"
                >
                  <li
                    itemScope
                    itemType="https://schema.org/ListItem"
                    itemProp="itemListElement"
                  >
                    <Link
                      href="/"
                      itemProp="item"
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.65rem",
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.4)",
                        textDecoration: "none",
                      }}
                    >
                      <span itemProp="name">Home</span>
                    </Link>
                    <meta itemProp="position" content="1" />
                  </li>
                  <li
                    style={{
                      color: "rgba(255,255,255,0.25)",
                      fontSize: "0.6rem",
                    }}
                  >
                    /
                  </li>
                  <li
                    itemScope
                    itemType="https://schema.org/ListItem"
                    itemProp="itemListElement"
                  >
                    <span
                      itemProp="name"
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
                    <meta itemProp="position" content="2" />
                  </li>
                </ol>
              </nav>

              <Eyebrow text="What We Do" light />

              {/* h1 — keyword rich */}
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
                HVAC, Solar & Engineering
                <br />
                <span style={{ fontWeight: 300 }}>Services Across Kenya</span>
              </h1>

              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.88rem",
                  color: "rgba(255,255,255,0.65)",
                  lineHeight: 1.75,
                  maxWidth: 480,
                  margin: 0,
                  fontWeight: 300,
                }}
              >
                Six engineering disciplines. One trusted company. Delivering
                precision HVAC, solar, plumbing, refrigeration, elevator, and
                electrical solutions across Nairobi, Mombasa, Kisumu, Eldoret,
                Nakuru, and Nyeri.
              </p>

              {/* Quick-jump anchor tags — static links, fully indexable */}
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
            </div>
          </div>
        </div>
      </div>

      {/* ── Sticky nav + back-to-top (client component) ── */}
      <ServicesClient
        services={SERVICES.map((s) => ({
          id: s.id,
          anchor: s.anchor,
          title: s.title,
        }))}
      />

      {/* ── Service sections (server rendered) ── */}
      {SERVICES.map((service, index) => (
        <ServiceSection key={service.id} service={service} index={index} />
      ))}

      {/* ── Process strip ── */}
      <section
        aria-label="Our engineering process"
        style={{ backgroundColor: C.offWhite, padding: "80px 0" }}
      >
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
              Our Engineering Process in Kenya
            </h2>
          </div>

          <div className="process-steps">
            {[
              {
                step: "01",
                title: "Site Survey",
                body: "We assess your space, load requirements, and infrastructure across Kenya to design a solution that fits perfectly — whether in Nairobi, Mombasa, or upcountry.",
              },
              {
                step: "02",
                title: "Engineering Design",
                body: "Detailed drawings, equipment schedules, and energy models reviewed and approved before a single bolt is turned.",
              },
              {
                step: "03",
                title: "Installation",
                body: "Our certified technicians execute with precision, maintaining your site's cleanliness and schedule across all our service locations in Kenya.",
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

      {/* ── CTA band ── */}
      <section
        aria-label="Contact Élan Climat for a quote"
        style={{ background: C.charcoal, padding: "80px 0" }}
      >
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
            Get a Quote for HVAC, Solar or Electrical Services in Kenya
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.82rem",
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.7,
              maxWidth: 420,
              margin: 0,
              fontWeight: 300,
            }}
          >
            Whether you're building from ground up or upgrading an existing
            system, our engineers are ready to deliver a solution across
            Nairobi, Mombasa, Kisumu, and beyond.
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
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
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
              }}
            >
              About the Company
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
