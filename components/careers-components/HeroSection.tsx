import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eyebrow } from "@/components/careers-components/Eyebrow";
import { C, VALUES, STATS } from "@/components/careers-components/_tokens";

export function HeroSection() {
  return (
    <div
      style={{ position: "relative", minHeight: "88vh", overflow: "hidden" }}
    >
      <Image
        src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1800&q=85"
        alt="Careers hero"
        fill
        priority
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center 35%" }}
        quality={85}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(26,26,24,0.90) 0%, rgba(26,26,24,0.60) 55%, rgba(26,26,24,0.20) 100%)",
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: "88vh",
          padding: "56px 0",
        }}
      >
        {/* Breadcrumb */}
        <div className="careers-inner">
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
              style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.6rem" }}
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
              Careers
            </span>
          </div>
        </div>

        {/* Hero copy + stats */}
        <div className="careers-inner">
          <div
            className="careers-hero-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 80,
              alignItems: "flex-end",
            }}
          >
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: "flex", flexDirection: "column", gap: 20 }}
            >
              <Eyebrow text="Careers at Élan" light />

              <h1
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(3rem, 6vw, 5rem)",
                  fontWeight: 300,
                  lineHeight: 1.02,
                  letterSpacing: "-0.025em",
                  color: "#ffffff",
                  margin: 0,
                }}
              >
                Build what
                <br />
                <em style={{ fontStyle: "italic", color: C.accent }}>
                  matters.
                </em>
                <br />
                Work with
                <br />
                <span style={{ fontWeight: 300 }}>care.</span>
              </h1>

              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.84rem",
                  color: "rgba(255,255,255,0.55)",
                  lineHeight: 1.85,
                  maxWidth: 360,
                  margin: 0,
                  fontWeight: 300,
                }}
              >
                We are building the infrastructure for a more sustainable East
                Africa — one installation at a time. If precision, craft, and
                clean energy matter to you, you might belong here.
              </p>

              {/* Stats */}
              <div
                className="careers-stats"
                style={{
                  display: "flex",
                  gap: 48,
                  paddingTop: 40,
                  marginTop: 20,
                  borderTop: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                {STATS.map((s) => (
                  <div key={s.label}>
                    <div
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "2.2rem",
                        fontWeight: 300,
                        color: "#ffffff",
                        lineHeight: 1,
                        letterSpacing: "-0.03em",
                      }}
                    >
                      {s.num}
                    </div>
                    <div
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.58rem",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.28)",
                        marginTop: 6,
                      }}
                    >
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — values list (hidden on mobile) */}
            <motion.div
              className="careers-hero-right"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.15,
              }}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.58rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#ffffff",
                  marginBottom: 20,
                  display: "block",
                }}
              >
                What we stand for
              </span>

              {VALUES.map((v, i) => (
                <div
                  key={v.label}
                  style={{
                    padding: "18px 0",
                    borderTop: "1px solid rgba(255,255,255,0.07)",
                    borderBottom:
                      i === VALUES.length - 1
                        ? "1px solid rgba(255,255,255,0.07)"
                        : "none",
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.55rem",
                      color: "rgba(255,255,255,0.2)",
                      letterSpacing: "0.08em",
                      minWidth: 18,
                    }}
                  >
                    {v.num}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1.15rem",
                      fontWeight: 400,
                      color: "rgba(255,255,255,0.55)",
                      letterSpacing: "0.01em",
                    }}
                  >
                    {v.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
