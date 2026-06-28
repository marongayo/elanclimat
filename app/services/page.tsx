// app/services/page.tsx
// SERVER COMPONENT — fully statically rendered for maximum SEO

import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import ServiceSection from "@/components/services-components/ServiceSection";
import ServicesClient from "@/components/services-components/ServiceClient";
import { SERVICES } from "@/lib/services-data";
import Eyebrow from "@/components/Eyebrow";
import { C } from "@/lib/constants";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// ─── Metadata ─────────────────────────────────────────────────────────────────
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
    url: `${BASE_URL}/services`,
  },
  alternates: {
    canonical: `${BASE_URL}/services`,
  },
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ServicesPage() {
  return (
    <main style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />

      <style>{`
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
          color: #6b6b68;
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
          margin-top: 20px;
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
              {/* Breadcrumb */}
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
                  color: "rgba(255,255,255,0.7)",
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

              {/* Quick-jump pills — link to dedicated pages for SEO, anchor for UX */}
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
                    href={`/services/${s.slug}`}
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

      {/* ── Sticky nav + back-to-top ── */}
      <ServicesClient
        services={SERVICES.map((s) => ({
          id: s.id,
          anchor: s.anchor,
          title: s.title,
        }))}
      />

      {/* ── Service sections ── */}
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
            <Eyebrow text="Our Engineering Process" />
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
              Our Way is a Truly Kenyan Process
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
                    fontSize: "0.82rem",
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
              fontSize: "0.84rem",
              color: "rgba(255,255,255,0.5)",
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
