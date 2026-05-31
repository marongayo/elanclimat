// app/about/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowUpRight, ArrowUp } from "lucide-react";
import Footer from "@/components/Footer";

// ─── Shared tokens (mirrors ShopHero :root) ───────────────────────────────────
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

// ─── Unsplash images ──────────────────────────────────────────────────────────
const IMG = {
  heroMain:
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1800&q=85",
  storyLeft: "/images/liftrpr.png",
  storyTopRight:
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80",
  storyBottomRight:
    "https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=700&q=80",
  team1:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
  team2:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80",
  team3:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80",
  team4:
    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80",
  serviceHvac: "/sticky.png",
  serviceSolar:
    "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
  serviceElectrical: "/mostafa.jpg",
  serviceRefrigeration: "/images/coldroom.webp",
  serviceElevator:
    "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
  csrTree:
    "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80",
  csrCommunity:
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
};

// ─── Stat Counter ─────────────────────────────────────────────────────────────
function StatCounter({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <div ref={ref} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <span
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(2.4rem, 4vw, 3.2rem)",
          fontWeight: 400,
          color: C.charcoal,
          lineHeight: 1,
          letterSpacing: "-0.02em",
        }}
      >
        {count}
        {suffix}
      </span>
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.72rem",
          color: C.muted,
          letterSpacing: "0.06em",
        }}
      >
        {label}
      </span>
    </div>
  );
}

// ─── Eyebrow ──────────────────────────────────────────────────────────────────
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

// ─── Section heading ──────────────────────────────────────────────────────────
function SectionHeading({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <h2
      style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
        fontWeight: 400,
        color: light ? "#ffffff" : C.charcoal,
        lineHeight: 1.12,
        letterSpacing: "-0.015em",
        margin: 0,
      }}
    >
      {children}
    </h2>
  );
}

// ─── Service Card ─────────────────────────────────────────────────────────────
function ServiceCard({
  num,
  title,
  description,
  image,
  href,
}: {
  num: string;
  title: string;
  description: string;
  image: string;
  href: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={href}
      style={{ textDecoration: "none" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          background: "#ffffff",
          border: `1px solid ${hovered ? C.offWhite : C.rule}`,
          transition: "border-color 0.25s, transform 0.25s",
          transform: hovered ? "translateY(-4px)" : "none",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            position: "relative",
            aspectRatio: "16/9",
            overflow: "hidden",
          }}
        >
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{
              objectFit: "cover",
              transition: "transform 0.55s cubic-bezier(0.22,1,0.36,1)",
              transform: hovered ? "scale(1.05)" : "scale(1)",
            }}
          />
        </div>
        <div style={{ padding: "24px 24px 28px" }}>
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.58rem",
              letterSpacing: "0.18em",
              color: C.dim,
              display: "block",
              marginBottom: 10,
            }}
          >
            {num}
          </span>
          <h3
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.25rem",
              fontWeight: 500,
              color: C.charcoal,
              letterSpacing: "-0.01em",
              margin: "0 0 10px",
            }}
          >
            {title}
          </h3>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.78rem",
              color: C.body,
              lineHeight: 1.75,
              margin: "0 0 18px",
              fontWeight: 300,
            }}
          >
            {description}
          </p>
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.68rem",
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: hovered ? C.sageDark : C.charcoal,
              borderBottom: `1px solid ${hovered ? C.sageDark : C.charcoal}`,
              paddingBottom: 2,
              transition: "color 0.2s, border-color 0.2s",
            }}
          >
            Learn More
          </span>
        </div>
      </div>
    </Link>
  );
}

// ─── Team Card ────────────────────────────────────────────────────────────────
function TeamCard({
  name,
  role,
  image,
}: {
  name: string;
  role: string;
  image: string;
}) {
  return (
    <div>
      <div
        style={{
          position: "relative",
          aspectRatio: "3/4",
          overflow: "hidden",
          marginBottom: 16,
          background: C.offWhite,
        }}
      >
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          style={{ objectFit: "cover", objectPosition: "center top" }}
        />
      </div>
      <span
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1.05rem",
          fontWeight: 500,
          color: C.charcoal,
          display: "block",
          letterSpacing: "-0.01em",
        }}
      >
        {name}
      </span>
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.72rem",
          color: C.muted,
          letterSpacing: "0.04em",
        }}
      >
        {role}
      </span>
    </div>
  );
}

// ─── Value Row ────────────────────────────────────────────────────────────────
function ValueRow({
  num,
  title,
  body,
}: {
  num: string;
  title: string;
  body: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <button
      onClick={() => setOpen((p) => !p)}
      style={{
        width: "100%",
        background: "none",
        border: "none",
        borderBottom: `1px solid rgba(255,255,255,0.08)`,
        padding: "24px 0",
        cursor: "pointer",
        textAlign: "left",
        display: "grid",
        gridTemplateColumns: "40px 1fr 24px",
        gap: 20,
        alignItems: "start",
      }}
    >
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.58rem",
          color: "rgba(255,255,255,0.25)",
          letterSpacing: "0.14em",
          paddingTop: 3,
        }}
      >
        {num}
      </span>
      <div>
        <span
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.15rem",
            fontWeight: 400,
            color: "#ffffff",
            display: "block",
            letterSpacing: "-0.01em",
            marginBottom: open ? 12 : 0,
            transition: "margin 0.2s",
          }}
        >
          {title}
        </span>
        <AnimatePresence initial={false}>
          {open && (
            <motion.p
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              style={{
                margin: 0,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.8rem",
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.8,
                fontWeight: 300,
                overflow: "hidden",
              }}
            >
              {body}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "1rem",
          color: "rgba(255,255,255,0.3)",
          lineHeight: 1,
          transition: "transform 0.3s",
          display: "inline-block",
          transform: open ? "rotate(45deg)" : "none",
          paddingTop: 2,
        }}
      >
        +
      </span>
    </button>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const fn = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <main style={{ background: C.warmWhite }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

        :root {
          --warm-white: #f9f7f4;
          --off-white: #ede9e2;
          --charcoal: #1a1a18;
          --sage: #8fa68e;
          --sage-dark: #5a7a59;
          --accent: #c9a96e;
          --text-muted: #888580;
        }

        * { box-sizing: border-box; }

        .about-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 64px;
        }

        @media (max-width: 1024px) {
          .about-inner { padding: 0 32px; }
          .story-grid { grid-template-columns: 1fr !important; }
          .story-images { display: none !important; }
          .services-grid { grid-template-columns: 1fr 1fr !important; }
          .team-grid { grid-template-columns: 1fr 1fr !important; }
          .csr-grid { grid-template-columns: 1fr !important; }
          .csr-images { display: none !important; }
        }
        @media (max-width: 640px) {
          .about-inner { padding: 0 24px; }
          .services-grid { grid-template-columns: 1fr !important; }
          .team-grid { grid-template-columns: 1fr 1fr !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .values-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ══════════════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          position: "relative",
          height: "72vh",
          minHeight: 520,
          overflow: "hidden",
        }}
      >
        <Image
          src={IMG.heroMain}
          alt="Élan Climat & Énergie — About us"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center 30%" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(26,26,24,0.75) 0%, rgba(26,26,24,0.3) 60%, rgba(26,26,24,0.1) 100%)",
            zIndex: 1,
          }}
        />
        <div
          className="about-inner"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            paddingBottom: 64,
          }}
        >
          {/* Breadcrumb */}
          <div className="pp-inner mb-3">
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
                About Us
              </span>
            </div>
          </div>
          <Eyebrow text="Our Company" light />
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2.8rem, 5.5vw, 4.4rem)",
              fontWeight: 400,
              color: "#ffffff",
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              margin: "16px 0 20px",
              maxWidth: 640,
            }}
          >
            Engineered for Comfort.
            <br />
            <span style={{ fontWeight: 300 }}>Built for Tomorrow.</span>
          </h1>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.88rem",
              color: "rgba(255,255,255,0.65)",
              lineHeight: 1.75,
              maxWidth: 400,
              fontWeight: 300,
              margin: "0 0 32px",
            }}
          >
            A Nairobi-based engineering company designing, installing, and
            maintaining systems that make buildings perform better — and last
            longer.
          </p>
          {/* Anchor nav */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {[
              { label: "Our Story", href: "#our-story" },
              { label: "Services", href: "#our-services" },
              { label: "Team", href: "#team" },
              { label: "CSR & ESG", href: "#csr-esg" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.68rem",
                  letterSpacing: "0.08em",
                  color: "rgba(255,255,255,0.75)",
                  background: "rgba(255,255,255,0.09)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  borderRadius: 9999,
                  padding: "6px 16px",
                  textDecoration: "none",
                  backdropFilter: "blur(6px)",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.background =
                    "rgba(255,255,255,0.18)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.background =
                    "rgba(255,255,255,0.09)")
                }
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          STATS BAR
      ══════════════════════════════════════════════════════════════════════ */}
      <div
        style={{
          background: "#ffffff",
          borderBottom: `1px solid ${C.rule}`,
        }}
      >
        <div className="about-inner">
          <div
            className="stats-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 0,
            }}
          >
            {[
              { value: 6, suffix: "+", label: "Years in operation" },
              { value: 340, suffix: "+", label: "Projects completed" },
              { value: 18, suffix: "", label: "Certified engineers" },
              { value: 12, suffix: "", label: "Counties served" },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  padding: "40px 0",
                  borderRight: i < 3 ? `1px solid ${C.rule}` : "none",
                  paddingLeft: i === 0 ? 0 : 40,
                  paddingRight: i === 3 ? 0 : 40,
                }}
              >
                <StatCounter {...s} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          OUR STORY
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="our-story"
        style={{ padding: "96px 0", scrollMarginTop: 80 }}
      >
        <div className="about-inner">
          <div
            className="story-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 80,
              alignItems: "center",
            }}
          >
            {/* Left: collage */}
            <div
              className="story-images"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gridTemplateRows: "auto auto",
                gap: 12,
              }}
            >
              <div
                style={{
                  gridColumn: "1 / -1",
                  position: "relative",
                  aspectRatio: "16/10",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={IMG.storyLeft}
                  alt="Élan team on-site"
                  fill
                  sizes="50vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div
                style={{
                  position: "relative",
                  aspectRatio: "4/3",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={IMG.storyTopRight}
                  alt="HVAC installation"
                  fill
                  sizes="25vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div
                style={{
                  position: "relative",
                  aspectRatio: "4/3",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={IMG.storyBottomRight}
                  alt="Solar panels"
                  fill
                  sizes="25vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>

            {/* Right: text */}
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <Eyebrow text="Since 2018" />
              <SectionHeading>From a Vision to a Trusted Name</SectionHeading>
              <div style={{ width: 32, height: 1, background: C.ruleLight }} />
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.88rem",
                  color: C.body,
                  lineHeight: 1.85,
                  margin: 0,
                  fontWeight: 300,
                }}
              >
                Élan Climat &amp; Énergie was founded in Nairobi in 2018 by a
                team of mechanical and electrical engineers who shared a single
                conviction: that buildings across Kenya deserved infrastructure
                that was not merely functional but genuinely excellent.
              </p>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.88rem",
                  color: C.body,
                  lineHeight: 1.85,
                  margin: 0,
                  fontWeight: 300,
                }}
              >
                What began as a boutique HVAC consultancy has evolved into a
                full-spectrum building systems company — designing, installing,
                and servicing HVAC, solar, refrigeration, electrical, and
                elevator systems across residential, commercial, and industrial
                properties in Kenya.
              </p>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.88rem",
                  color: C.body,
                  lineHeight: 1.85,
                  margin: 0,
                  fontWeight: 300,
                }}
              >
                Every project we take on — from a single split unit in a
                Westlands apartment to a 1 MW solar installation for a factory
                in Athi River — is treated with the same precision, care, and
                commitment to lasting performance.
              </p>
              <Link
                href="/contact"
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
                  gap: 6,
                  borderBottom: `1px solid ${C.charcoal}`,
                  paddingBottom: 2,
                  alignSelf: "flex-start",
                  marginTop: 8,
                  transition: "color 0.2s, border-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = C.muted;
                  (e.currentTarget as HTMLAnchorElement).style.borderColor =
                    C.muted;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    C.charcoal;
                  (e.currentTarget as HTMLAnchorElement).style.borderColor =
                    C.charcoal;
                }}
              >
                Partner With Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          VALUES (dark band)
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          background: C.charcoal,
          padding: "96px 0",
        }}
      >
        <div className="about-inner">
          <div
            className="values-layout"
            style={{
              display: "grid",
              gridTemplateColumns: "320px 1fr",
              gap: 96,
              alignItems: "start",
            }}
          >
            {/* Left */}
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <Eyebrow text="What We Stand For" light />
              <SectionHeading light>
                Principles That Guide Every Project
              </SectionHeading>
              <div
                style={{
                  width: 32,
                  height: 1,
                  background: "rgba(255,255,255,0.15)",
                }}
              />
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.82rem",
                  color: "rgba(255,255,255,0.45)",
                  lineHeight: 1.8,
                  margin: 0,
                  fontWeight: 300,
                }}
              >
                These aren't values we framed for a website. They're the
                standards our engineers hold themselves to on every site, every
                day.
              </p>
            </div>

            {/* Right: expandable rows */}
            <div style={{ borderTop: `1px solid rgba(255,255,255,0.08)` }}>
              {[
                {
                  num: "01",
                  title: "Precision Over Speed",
                  body: "We plan meticulously before we touch a single pipe or cable. A well-engineered installation takes the time it takes — but it doesn't need to be revisited. Our rework rate across 340+ projects is under 3%.",
                },
                {
                  num: "02",
                  title: "Honest Advice, Always",
                  body: "We'll tell you when a system is oversized for your needs, when a cheaper alternative will perform just as well, and when a project is outside our expertise. Trust is our longest-running asset.",
                },
                {
                  num: "03",
                  title: "Energy as an Investment",
                  body: "Every system we spec is evaluated on its total cost of ownership — not just purchase price. We provide energy audits, lifecycle cost analysis, and ROI projections on all major installations.",
                },
                {
                  num: "04",
                  title: "Safety Without Negotiation",
                  body: "All work complies with EPRA guidelines, Kenya Standards, and manufacturer specifications. Our engineers are OSHA-certified and we carry full public liability and professional indemnity insurance.",
                },
                {
                  num: "05",
                  title: "Local Talent, Global Standards",
                  body: "We actively invest in developing Kenyan engineers — through sponsored certifications, mentorship, and international training partnerships — because the future of this industry should be built here.",
                },
              ].map((v) => (
                <ValueRow key={v.num} {...v} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          OUR SERVICES
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="our-services"
        style={{ padding: "96px 0", scrollMarginTop: 80 }}
      >
        <div className="about-inner">
          {/* Header */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
              marginBottom: 56,
              textAlign: "center",
            }}
          >
            <Eyebrow text="Unmatched Craftsmanship" />
            <SectionHeading>
              Engineering for Every Building's Needs
            </SectionHeading>
            <div style={{ width: 32, height: 1, background: C.ruleLight }} />
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.82rem",
                color: C.muted,
                lineHeight: 1.8,
                maxWidth: 480,
                margin: 0,
                fontWeight: 300,
              }}
            >
              Five integrated service lines. One accountable team. Designed to
              keep Kenya's homes and businesses running at peak performance,
              year-round.
            </p>
          </div>

          {/* Grid */}
          <div
            className="services-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 16,
            }}
          >
            {[
              {
                num: "01",
                title: "HVAC Systems",
                description:
                  "Split units, VRF systems, ducted central air, and precision cooling for data centres. We design, install, and maintain systems sized exactly to your load.",
                image: IMG.serviceHvac,
                href: "/services#hvac",
              },
              {
                num: "02",
                title: "Solar Installation",
                description:
                  "Grid-tied, off-grid, and hybrid solar PV systems for homes, offices, and industrial facilities. Every design includes a detailed energy audit and ROI projection.",
                image: IMG.serviceSolar,
                href: "/services#solar",
              },
              {
                num: "03",
                title: "Electrical Works",
                description:
                  "Low voltage, medium voltage, earthing, lightning protection, and building automation. EPRA-compliant and insurance-ready installations.",
                image: IMG.serviceElectrical,
                href: "/services#electrical",
              },
              {
                num: "04",
                title: "Refrigeration",
                description:
                  "Cold rooms, blast freezers, display cabinets, and chiller plants for food retail, pharmaceuticals, and hospitality. Designed for temperature precision.",
                image: IMG.serviceRefrigeration,
                href: "/services#cold-room",
              },
              {
                num: "05",
                title: "Elevator & Lift Systems",
                description:
                  "Passenger lifts, service elevators, and dumbwaiters for residential and commercial buildings. Fully compliant with Kenyan building regulations.",
                image: IMG.serviceElevator,
                href: "/services#elevator",
              },
              {
                num: "06",
                title: "Maintenance Contracts",
                description:
                  "Scheduled preventive maintenance, 24-hour emergency response, and annual service agreements that keep every system running at design efficiency.",
                image: IMG.storyLeft,
                href: "/services#maintenance",
              },
            ].map((s) => (
              <ServiceCard key={s.num} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          TEAM
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="team"
        style={{
          background: "#ffffff",
          padding: "96px 0",
          scrollMarginTop: 80,
          borderTop: `1px solid ${C.rule}`,
        }}
      >
        <div className="about-inner">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 80,
              alignItems: "end",
              marginBottom: 56,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <Eyebrow text="The People" />
              <SectionHeading>Meet the Team Behind the Systems</SectionHeading>
              <div style={{ width: 32, height: 1, background: C.ruleLight }} />
            </div>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.85rem",
                color: C.muted,
                lineHeight: 1.85,
                margin: 0,
                fontWeight: 300,
              }}
            >
              Our leadership team brings together decades of combined experience
              in mechanical engineering, electrical systems, renewable energy,
              and project management — all grounded in the realities of building
              in Kenya.
            </p>
          </div>

          <div
            className="team-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 24,
            }}
          >
            {[
              {
                name: "Marvin Ongayo",
                role: "Founder & Managing Director",
                image: IMG.team1,
              },
              {
                name: "Amina Oduya",
                role: "Head of Solar & Renewables",
                image: IMG.team2,
              },
              {
                name: "Daniel Mwenda",
                role: "Chief HVAC Engineer",
                image: IMG.team3,
              },
              {
                name: "Grace Wanjiku",
                role: "Projects & Operations Lead",
                image: IMG.team4,
              },
            ].map((t) => (
              <TeamCard key={t.name} {...t} />
            ))}
          </div>

          {/* Careers note */}
          <div
            style={{
              marginTop: 56,
              padding: "32px",
              background: C.warmWhite,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 24,
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.2rem",
                  fontWeight: 400,
                  color: C.charcoal,
                  display: "block",
                  marginBottom: 6,
                  letterSpacing: "-0.01em",
                }}
              >
                We're building the next generation of Kenyan engineers.
              </span>
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.78rem",
                  color: C.muted,
                }}
              >
                Open roles in HVAC, solar, and project management.
              </span>
            </div>
            <Link
              href="/careers"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background: C.charcoal,
                color: "#ffffff",
                textDecoration: "none",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.72rem",
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "12px 22px",
                borderRadius: 9999,
                transition: "background 0.2s",
                flexShrink: 0,
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.background =
                  "#333330")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.background =
                  C.charcoal)
              }
            >
              View Open Roles
              <ArrowUpRight size={14} strokeWidth={2} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          CSR & ESG
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="csr-esg" style={{ padding: "96px 0", scrollMarginTop: 80 }}>
        <div className="about-inner">
          <div
            className="csr-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 80,
              alignItems: "start",
            }}
          >
            {/* Left: text */}
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <Eyebrow text="CSR & ESG Strategies" />
              <SectionHeading>
                Leading with Purpose, Building for Tomorrow
              </SectionHeading>
              <div style={{ width: 32, height: 1, background: C.ruleLight }} />
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.88rem",
                  color: C.body,
                  lineHeight: 1.85,
                  margin: 0,
                  fontWeight: 300,
                }}
              >
                Sustainability isn't a department at Élan — it's embedded in how
                we specify equipment, how we dispose of old units, and how we
                measure project success. Every installation comes with an energy
                performance benchmark.
              </p>

              {/* ESG pillars */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 0,
                  borderTop: `1px solid ${C.rule}`,
                  marginTop: 8,
                }}
              >
                {[
                  {
                    label: "Environmental",
                    text: "We offset the carbon footprint of our installation fleet, prioritise refrigerants with low global warming potential, and have planted over 2,400 trees through our Nairobi Green Sites programme since 2021.",
                  },
                  {
                    label: "Social",
                    text: "We sponsor 12 engineering students annually through the Élan Scholar programme at Kenyan polytechnics and universities, with guaranteed internship placements on completion.",
                  },
                  {
                    label: "Governance",
                    text: "All supplier relationships are governed by our ethical procurement policy. We publish an annual ESG report available on request, covering emissions, waste, and community investment.",
                  },
                ].map((pillar) => (
                  <div
                    key={pillar.label}
                    style={{
                      borderBottom: `1px solid ${C.rule}`,
                      padding: "24px 0",
                      display: "grid",
                      gridTemplateColumns: "100px 1fr",
                      gap: 24,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.62rem",
                        fontWeight: 500,
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: C.sage,
                        paddingTop: 2,
                      }}
                    >
                      {pillar.label}
                    </span>
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.8rem",
                        color: C.body,
                        lineHeight: 1.8,
                        margin: 0,
                        fontWeight: 300,
                      }}
                    >
                      {pillar.text}
                    </p>
                  </div>
                ))}
              </div>

              <Link
                href="mailto:info@elanclimat.co.ke?subject=Requesting%20ESG%20Report&body=Hello%20Élan%20Team%2C%0A%0AI%20would%20like%20to%20request%20a%20copy%20of%20your%20latest%20ESG%20report.%20Please%20let%20me%20know%20if%20there's%20any%20additional%20information%20you%20need.%0A%0AThank%20you!"
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
                  gap: 6,
                  borderBottom: `1px solid ${C.charcoal}`,
                  paddingBottom: 2,
                  alignSelf: "flex-start",
                  marginTop: 8,
                }}
              >
                Request ESG Report
              </Link>
            </div>

            {/* Right: stacked images */}
            <div
              className="csr-images"
              style={{ display: "flex", flexDirection: "column", gap: 12 }}
            >
              <div
                style={{
                  position: "relative",
                  aspectRatio: "16/10",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={IMG.csrTree}
                  alt="Tree planting initiative"
                  fill
                  sizes="50vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div
                style={{
                  position: "relative",
                  aspectRatio: "16/7",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={IMG.csrCommunity}
                  alt="Community engagement"
                  fill
                  sizes="50vw"
                  style={{ objectFit: "cover" }}
                />
              </div>

              {/* ESG numbers */}
              <div
                style={{
                  background: C.charcoal,
                  padding: "28px 32px",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: 16,
                }}
              >
                {[
                  { value: "2,400+", label: "Trees planted" },
                  { value: "12", label: "Scholars annually" },
                  { value: "38%", label: "Avg energy saved" },
                ].map((n) => (
                  <div key={n.label}>
                    <span
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "1.6rem",
                        fontWeight: 400,
                        color: "#ffffff",
                        display: "block",
                        letterSpacing: "-0.015em",
                        lineHeight: 1,
                        marginBottom: 6,
                      }}
                    >
                      {n.value}
                    </span>
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.62rem",
                        color: "rgba(255,255,255,0.4)",
                        letterSpacing: "0.08em",
                      }}
                    >
                      {n.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          CTA BAND
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          background: C.charcoal,
          padding: "80px 0",
        }}
      >
        <div
          className="about-inner"
          style={{
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
              maxWidth: 520,
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
            Whether you're planning a new building, upgrading an existing
            system, or exploring solar; start with a conversation.
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
              Get in Touch
            </Link>
            <Link
              href="/shop"
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
              Browse the Shop
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
      <Footer />
    </main>
  );
}
