"use client";

import Link from "next/link";
import { Wind, Sun, Battery, Shield, Zap, ArrowRight } from "lucide-react";

const STATS = [
  { value: "1,200+", label: "Installations Completed" },
  { value: "8+ yr", label: "Industry Experience" },
  { value: "97.9%", label: "Client Satisfaction" },
  { value: "4.2 MW", label: "Solar Capacity Installed" },
];

export default function HeroSection() {
  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
      className="mesh-bg"
    >
      <div
        style={{
          position: "absolute",
          top: "10%",
          right: "8%",
          width: 420,
          height: 420,
          borderRadius: "50%",
          background: "rgba(143,175,159,0.12)",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "28%",
          right: "13%",
          width: 220,
          height: 220,
          borderRadius: "50%",
          background: "rgba(143,175,159,0.08)",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          left: "-5%",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "rgba(196,168,130,0.08)",
          zIndex: 0,
        }}
      />

      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "130px 32px 80px",
          width: "100%",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 64,
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 28,
              }}
            >
              <div
                style={{ width: 36, height: 1, background: "var(--sage)" }}
              />
              <span
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "0.72rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--sage-dark)",
                }}
              >
                Climate · Solar · Energy
              </span>
            </div>
            <h1
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(3rem, 5vw, 5.2rem)",
                fontWeight: 600,
                lineHeight: 1.05,
                color: "var(--charcoal)",
                marginBottom: 28,
              }}
            >
              Comfort{" "}
              <em style={{ fontStyle: "italic", color: "var(--sage-dark)" }}>
                &amp; Energy
              </em>
              <br />
              Redefined
            </h1>
            <p
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "1.05rem",
                lineHeight: 1.75,
                color: "var(--text-muted)",
                maxWidth: 600,
                marginBottom: 40,
              }}
            >
              Premium HVAC, solar power, and battery storage, seamlessly
              integrated for homes and businesses that demand the best.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "nowrap" }}>
              <Link
                href="/#services"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  padding: "13px 20px",
                  background: "var(--charcoal)",
                  color: "white",
                  fontFamily: "DM Sans",
                  fontSize: "clamp(0.75rem, 2.5vw, 0.88rem)",
                  fontWeight: 500,
                  textDecoration: "none",
                  flex: "1 1 0",
                  minWidth: 0,
                  textAlign: "center",
                  whiteSpace: "nowrap",
                }}
              >
                Explore Services <ArrowRight size={15} />
              </Link>
              <Link
                href="/#contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  padding: "13px 20px",
                  background: "transparent",
                  border: "1px solid var(--charcoal)",
                  color: "var(--charcoal)",
                  fontFamily: "DM Sans",
                  fontSize: "clamp(0.75rem, 2.5vw, 0.88rem)",
                  textDecoration: "none",
                  flex: "1 1 0",
                  minWidth: 0,
                  textAlign: "center",
                  whiteSpace: "nowrap",
                }}
              >
                Free Consultation
              </Link>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div
          className="stats-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 1,
            background: "var(--off-white)",
            marginTop: 72,
          }}
        >
          {STATS.map((s, i) => (
            <div
              key={i}
              style={{
                background: "var(--warm-white)",
                padding: "28px 16px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "clamp(1.4rem, 2.5vw, 2.4rem)",
                  fontWeight: 600,
                  color: "var(--charcoal)",
                  lineHeight: 1,
                  whiteSpace: "nowrap",
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontFamily: "DM Sans",
                  fontSize: "clamp(0.62rem, 1.2vw, 0.78rem)",
                  color: "var(--text-muted)",
                  marginTop: 6,
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
