// components/home-components/ServicesSection.tsx
// SERVER COMPONENT — no "use client", fully static and indexable by Google

import Image from "next/image";
import Link from "next/link";

const C = {
  charcoal: "#1a1a18",
  warmWhite: "#f9f7f4",
  offWhite: "#ede9e2",
  sage: "#8fa68e",
  muted: "#888580",
  body: "#6b6b68",
  rule: "#e8e8e4",
  ruleLight: "#c8c8c4",
  dim: "#b0b0a8",
};

// Short card descriptions — written for SEO, scannable for users
const SERVICES = [
  {
    id: "hvac",
    anchor: "hvac",
    num: "01",
    eyebrow: "Climate Control",
    title: "HVAC Services",
    seoTitle: "HVAC Installation & Maintenance in Kenya",
    cardDescription:
      "Split units, VRF systems, and ducted AC designed, installed, and serviced for homes, offices, and hotels across Nairobi, Mombasa, and Kisumu.",
    image: "/images/HVAC.jpg",
    imageAlt: "HVAC installation project in Nairobi Kenya",
  },
  {
    id: "plumbing",
    anchor: "plumbing",
    num: "02",
    eyebrow: "Water Systems",
    title: "Plumbing Services",
    seoTitle: "Commercial & Residential Plumbing in Kenya",
    cardDescription:
      "Supply lines, riser systems, and sanitary installations for commercial buildings, apartments, and hospitals across Nairobi, Mombasa, and Nyeri.",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    imageAlt: "Commercial plumbing installation Kenya",
  },
  {
    id: "solar",
    anchor: "solar",
    num: "03",
    eyebrow: "Renewable Energy",
    title: "Solar Installation",
    seoTitle: "Solar Panel Installation in Kenya — Grid-Tied & Off-Grid",
    cardDescription:
      "Grid-tied, off-grid, and hybrid solar PV systems with battery storage for homes, businesses, and farms across Nairobi, Nakuru, and rural Kenya.",
    image: "/images/solar.jpg",
    imageAlt: "Solar panel installation Kenya",
  },
  {
    id: "cold-room",
    anchor: "cold-room",
    num: "04",
    eyebrow: "Refrigeration",
    title: "Cold Room Installation",
    seoTitle: "Cold Room & Refrigeration Services in Kenya",
    cardDescription:
      "Walk-in cold rooms and blast freezers for food processors, hotels, and pharmaceuticals across Nairobi, Mombasa, Eldoret, and Nakuru.",
    image: "/images/coldroom.webp",
    imageAlt: "Cold room installation Kenya",
  },
  {
    id: "elevator",
    anchor: "elevator",
    num: "05",
    eyebrow: "Vertical Transport",
    title: "Elevator Installation",
    seoTitle: "Elevator & Lift Installation in Kenya",
    cardDescription:
      "Passenger, goods, and hospital lifts for residential and commercial buildings across Nairobi. KEBS-compliant with 24/7 maintenance support.",
    image: "/images/elevator.jpg",
    imageAlt: "Elevator installation Nairobi Kenya",
  },
  {
    id: "electrical",
    anchor: "electrical",
    num: "06",
    eyebrow: "Power Systems",
    title: "Electrical Services",
    seoTitle: "Electrical Installation & Engineering in Kenya",
    cardDescription:
      "LV distribution, standby generators, earthing, and smart building automation for offices, hospitals, and industrial facilities across Kenya.",
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80",
    imageAlt: "Electrical installation Kenya",
  },
];

export default function ServicesSection() {
  return (
    <section
      aria-label="Engineering services offered by Élan Climat in Kenya"
      style={{
        backgroundColor: "#ffffff",
        padding: "96px 0",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <style>{`
        .home-svc-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 64px;
        }
        .home-svc-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: #e8e8e4;
          border: 1px solid #e8e8e4;
          margin-top: 56px;
        }
        .home-svc-card {
          background: #f9f7f4;
          display: flex;
          flex-direction: column;
          gap: 0;
          transition: background 0.25s;
          text-decoration: none;
          color: inherit;
        }
        .home-svc-card:hover {
          background: #ffffff;
        }
        .home-svc-card:hover .home-svc-img {
          transform: scale(1.04);
        }
        .home-svc-img {
          transition: transform 0.5s ease;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        @media (max-width: 1024px) {
          .home-svc-inner { padding: 0 32px; }
          .home-svc-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .home-svc-inner { padding: 0 24px; }
          .home-svc-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="home-svc-inner">
        {/* ── Section header ── */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {/* Eyebrow */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span
                style={{
                  display: "inline-block",
                  width: 24,
                  height: 1,
                  background: C.ruleLight,
                }}
              />
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.62rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: C.sage,
                  fontWeight: 500,
                }}
              >
                What We Do
              </span>
            </div>

            {/* h2 — keyword rich, visible to Google */}
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
                fontWeight: 400,
                color: C.charcoal,
                lineHeight: 1.1,
                letterSpacing: "-0.015em",
                margin: 0,
              }}
            >
              HVAC, Solar & Engineering
              <br />
              <span style={{ fontWeight: 300 }}>Services Across Kenya</span>
            </h2>

            {/* Supporting copy — adds keyword depth */}
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.86rem",
                color: C.body,
                lineHeight: 1.75,
                margin: 0,
                fontWeight: 300,
                maxWidth: 480,
              }}
            >
              Six engineering disciplines delivered by certified technicians
              across Nairobi, Mombasa, Kisumu, Eldoret, Nakuru, and Nyeri — and
              throughout Uganda, Tanzania, and Rwanda.
            </p>
          </div>

          {/* View all link */}
          <Link
            href="/services"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.72rem",
              fontWeight: 500,
              color: C.charcoal,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              flexShrink: 0,
              borderBottomWidth: 1,
              borderBottomStyle: "solid",
              borderBottomColor: C.charcoal,
              paddingBottom: 2,
            }}
          >
            View All Services
          </Link>
        </div>

        {/* ── Service grid ── */}
        <div className="home-svc-grid" role="list">
          {SERVICES.map((service) => (
            <Link
              key={service.id}
              href={`/services#${service.anchor}`}
              className="home-svc-card"
              role="listitem"
              aria-label={service.seoTitle}
            >
              {/* Image */}
              <div
                style={{
                  position: "relative",
                  aspectRatio: "4 / 3",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="home-svc-img"
                  quality={80}
                />
                {/* Number badge */}
                <span
                  style={{
                    position: "absolute",
                    top: 14,
                    left: 14,
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "0.7rem",
                    fontWeight: 400,
                    color: "rgba(255,255,255,0.7)",
                    letterSpacing: "0.12em",
                    background: "rgba(26,26,24,0.45)",
                    backdropFilter: "blur(6px)",
                    padding: "4px 10px",
                    borderRadius: 9999,
                    border: "1px solid rgba(255,255,255,0.15)",
                  }}
                >
                  {service.num}
                </span>
              </div>

              {/* Card body */}
              <div
                style={{
                  padding: "24px 28px 28px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  flex: 1,
                }}
              >
                {/* Eyebrow */}
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.58rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: C.sage,
                    fontWeight: 500,
                  }}
                >
                  {service.eyebrow}
                </span>

                {/* Service title as h3 — keyword rich */}
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.25rem",
                    fontWeight: 500,
                    color: C.charcoal,
                    margin: 0,
                    lineHeight: 1.2,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {service.seoTitle}
                </h3>

                {/* Description — SEO body copy */}
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.78rem",
                    color: C.body,
                    lineHeight: 1.75,
                    margin: 0,
                    fontWeight: 300,
                    flex: 1,
                  }}
                >
                  {service.cardDescription}
                </p>

                {/* CTA */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    marginTop: 4,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.65rem",
                      fontWeight: 500,
                      color: C.charcoal,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    Learn More
                  </span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={C.charcoal}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
