"use client";

import { Wind, Sun, Battery, CheckCircle } from "lucide-react";

const SERVICES = [
  {
    icon: <Wind size={28} />,
    title: "HVAC Systems",
    subtitle: "Precision Climate Control",
    desc: "From heat pumps to full commercial HVAC, we design, install, and maintain systems that deliver perfect temperature year-round — quietly and efficiently.",
    features: [
      "Heat pump installation",
      "Ductless mini-splits",
      "Ventilation & IAQ",
      "Preventive maintenance",
    ],
    color: "var(--sage)",
    dark: false,
  },
  {
    icon: <Sun size={28} />,
    title: "Solar Power",
    subtitle: "Harness the Sun",
    desc: "Custom solar installations sized precisely to your energy profile. Rooftop panels, smart inverters, and full grid interconnection handled end-to-end.",
    features: [
      "Residential & commercial",
      "Smart monitoring",
      "Grid-tie & off-grid",
      "Panel cleaning & upkeep",
    ],
    color: "var(--accent)",
    dark: true,
  },
  {
    icon: <Battery size={28} />,
    title: "Battery Storage",
    subtitle: "Energy Independence",
    desc: "Store solar surplus, protect against outages, and reduce peak-demand charges. We integrate lithium-ion battery systems with any solar or grid setup.",
    features: [
      "LiFePO4 battery packs",
      "Solar-storage pairing",
      "Backup power systems",
      "Energy management AI",
    ],
    color: "var(--sage-dark)",
    dark: false,
  },
];

export default function ServicesSection() {
  return (
    <section id="services" style={{ padding: "100px 0", background: "white" }}>
      {/* services code */}

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ marginBottom: 64 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 16,
            }}
          >
            <div style={{ width: 36, height: 1, background: "var(--sage)" }} />
            <span
              style={{
                fontFamily: "DM Sans",
                fontSize: "0.72rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--sage-dark)",
              }}
            >
              What We Do
            </span>
          </div>
          <h2
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
              fontWeight: 600,
              color: "var(--charcoal)",
              maxWidth: 560,
              lineHeight: 1.15,
            }}
          >
            Integrated climate{" "}
            <em style={{ fontStyle: "italic", color: "var(--sage-dark)" }}>
              &amp; energy{" "}
            </em>
            services
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 2,
          }}
        >
          {SERVICES.map((s, i) => (
            <div
              key={i}
              style={{
                padding: "48px 40px",
                background: s.dark ? "var(--charcoal)" : "var(--sage-pale)",
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: s.dark ? "rgba(255,255,255,0.08)" : "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 28,
                  color: s.dark ? "var(--sage-light)" : s.color,
                }}
              >
                {s.icon}
              </div>
              <div
                style={{
                  fontFamily: "DM Sans",
                  fontSize: "0.7rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: s.dark ? "var(--sage-light)" : "var(--sage-dark)",
                  marginBottom: 8,
                }}
              >
                {s.subtitle}
              </div>
              <h3
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "1.9rem",
                  fontWeight: 600,
                  color: s.dark ? "white" : "var(--charcoal)",
                  marginBottom: 16,
                  lineHeight: 1.2,
                }}
              >
                {s.title}
              </h3>
              <p
                style={{
                  fontFamily: "DM Sans",
                  fontSize: "0.88rem",
                  lineHeight: 1.75,
                  color: s.dark ? "rgba(255,255,255,0.6)" : "var(--text-muted)",
                  marginBottom: 28,
                }}
              >
                {s.desc}
              </p>
              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                {s.features.map((f, j) => (
                  <li
                    key={j}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      fontFamily: "DM Sans",
                      fontSize: "0.83rem",
                      color: s.dark
                        ? "rgba(255,255,255,0.7)"
                        : "var(--charcoal)",
                    }}
                  >
                    <CheckCircle
                      size={14}
                      style={{
                        color: s.dark
                          ? "var(--sage-light)"
                          : "var(--sage-dark)",
                        flexShrink: 0,
                      }}
                    />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
