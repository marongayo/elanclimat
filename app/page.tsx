// page.tsx

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import Image from "next/image";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { getBlogPosts } from "@/lib/db";
import {
  Wind,
  Sun,
  Battery,
  Shield,
  Zap,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Star,
} from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

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

const STATS = [
  { value: "1,200+", label: "Installations Completed" },
  { value: "18 yr", label: "Industry Experience" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "4.2 MW", label: "Solar Capacity Installed" },
];

const TESTIMONIALS = [
  {
    name: "Brian M.",
    role: "Homeowner, Loresho",
    text: "Élan completely changed how we use energy at home. Since installing the heat pump and solar system, our monthly electricity bill has gone down significantly. The team was professional and very reliable throughout the project.",
    stars: 5,
  },
  {
    name: "Mercy W.",
    role: "Operations Manager, Westlands",
    text: "From consultation to installation, the experience was smooth and well organised. The solar and backup battery system has really helped us reduce operating costs and power interruptions at the office.",
    stars: 5,
  },
  {
    name: "Kevin O.",
    role: "Homeowner, Joska",
    text: "We compared several companies before choosing Élan, and we are happy we did. Their pricing was fair, the workmanship was excellent, and the team took time to explain everything clearly.",
    stars: 5,
  },
];

export default async function HomePage() {
  const posts = (await getBlogPosts()).slice(0, 3);

  return (
    <>
      <Navbar />

      {/* ── HERO ── */}
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

            {/* Visual orbit block */}
            <div
              className="hidden lg:flex"
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <div style={{ position: "relative", width: 380, height: 380 }}>
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                    width: 170,
                    height: 170,
                    borderRadius: "50%",
                    background: "var(--sage-pale)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 4,
                    border: "1px solid rgba(143,175,159,0.4)",
                    zIndex: 2,
                  }}
                >
                  <Zap size={30} style={{ color: "var(--sage-dark)" }} />
                  <span
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      color: "var(--charcoal)",
                    }}
                  >
                    Élan
                  </span>
                  <span
                    style={{
                      fontFamily: "DM Sans",
                      fontSize: "0.58rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--text-muted)",
                    }}
                  >
                    Énergie
                  </span>
                </div>
                {[
                  {
                    icon: <Wind size={20} />,
                    label: "HVAC",
                    pos: {
                      top: "2%",
                      left: "50%",
                      transform: "translateX(-50%)",
                    },
                  },
                  {
                    icon: <Sun size={20} />,
                    label: "Solar",
                    pos: {
                      top: "50%",
                      right: "-4%",
                      transform: "translateY(-50%)",
                    },
                  },
                  {
                    icon: <Battery size={20} />,
                    label: "Battery",
                    pos: {
                      bottom: "2%",
                      left: "50%",
                      transform: "translateX(-50%)",
                    },
                  },
                  {
                    icon: <Shield size={20} />,
                    label: "Certified",
                    pos: {
                      top: "50%",
                      left: "-4%",
                      transform: "translateY(-50%)",
                    },
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="hidden lg:flex"
                    style={{
                      position: "absolute",
                      ...item.pos,
                      width: 72,
                      height: 72,
                      borderRadius: "50%",
                      background: "white",
                      border: "1px solid var(--off-white)",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 4,
                      boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
                      zIndex: 2,
                      animation: `float ${5 + i}s ease-in-out ${i * 0.6}s infinite`,
                      color: "var(--sage-dark)",
                    }}
                  >
                    {item.icon}
                    <span
                      style={{
                        fontFamily: "DM Sans",
                        fontSize: "0.58rem",
                        fontWeight: 500,
                        color: "var(--text-muted)",
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                ))}
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                    width: 300,
                    height: 300,
                    borderRadius: "50%",
                    border: "1px dashed rgba(143,175,159,0.35)",
                  }}
                />
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

      {/* ── SERVICES ── */}
      <section
        id="services"
        style={{ padding: "100px 0", background: "white" }}
      >
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
              <div
                style={{ width: 36, height: 1, background: "var(--sage)" }}
              />
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
                    color: s.dark
                      ? "rgba(255,255,255,0.6)"
                      : "var(--text-muted)",
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

      {/* ── ABOUT ── */}
      <section id="about" style={{ padding: "100px 0" }} className="mesh-bg">
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
          <div className="flex flex-col-reverse md:grid md:grid-cols-2 gap-20 items-center">
            <div style={{ position: "relative" }}>
              <div className="relative w-full sm:w-[90%] md:w-full aspect-4/5 min-h-105 overflow-hidden mx-auto">
                <Image
                  src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=700&q=80"
                  alt="HVAC technician at work"
                  fill
                  className="object-cover"
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: -24,
                  right: -24,
                  background: "white",
                  padding: "24px 28px",
                  boxShadow: "0 8px 40px rgba(0,0,0,0.1)",
                  minWidth: 180,
                }}
              >
                <div
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: "2.4rem",
                    fontWeight: 600,
                    color: "var(--charcoal)",
                    lineHeight: 1,
                  }}
                >
                  18
                </div>
                <div
                  style={{
                    fontFamily: "DM Sans",
                    fontSize: "0.78rem",
                    color: "var(--text-muted)",
                    marginTop: 4,
                  }}
                >
                  Years of Excellence
                </div>
                <div
                  style={{
                    width: 32,
                    height: 2,
                    background: "var(--sage)",
                    marginTop: 12,
                  }}
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  top: -20,
                  left: -20,
                  background: "var(--charcoal)",
                  padding: "16px 20px",
                }}
              >
                <div
                  style={{
                    fontFamily: "DM Sans",
                    fontSize: "0.65rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--sage-light)",
                    marginBottom: 4,
                  }}
                >
                  Certified
                </div>
                <div
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: "1.2rem",
                    color: "white",
                  }}
                >
                  Experts
                </div>
              </div>
            </div>

            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 16,
                }}
              >
                <div
                  style={{ width: 36, height: 1, background: "var(--sage)" }}
                />
                <span
                  style={{
                    fontFamily: "DM Sans",
                    fontSize: "0.72rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--sage-dark)",
                  }}
                >
                  About Us
                </span>
              </div>
              <h2
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "clamp(2rem, 3.5vw, 3rem)",
                  fontWeight: 600,
                  color: "var(--charcoal)",
                  lineHeight: 1.2,
                  marginBottom: 24,
                }}
              >
                Engineering comfort <em style={{ fontStyle: "italic", color: "var(--sage-dark)" }}>
                  &amp; sustainability, 
                </em> since 2007
              </h2>
              <p
                style={{
                  fontFamily: "DM Sans",
                  fontSize: "0.93rem",
                  lineHeight: 1.8,
                  color: "var(--text-muted)",
                  marginBottom: 20,
                }}
              >
                Founded on the belief that comfort and responsibility are not
                trade-offs, Élan Climat &amp; Énergie has grown from a
                two-person HVAC firm into a full-spectrum climate and energy
                company trusted by over a thousand households and businesses.
              </p>
              <p
                style={{
                  fontFamily: "DM Sans",
                  fontSize: "0.93rem",
                  lineHeight: 1.8,
                  color: "var(--text-muted)",
                  marginBottom: 36,
                }}
              >
                Our engineers hold manufacturer certifications across all major
                HVAC brands and solar platforms. Every installation is
                precision-engineered — from thermal load calculations to
                inverter sizing.
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                  marginBottom: 36,
                }}
              >
                {[
                  {
                    label: "Manufacturer Certified",
                    icon: <Shield size={15} />,
                  },
                  { label: "Energy-Star Partners", icon: <Star size={15} /> },
                  {
                    label: "10-Year Warranty",
                    icon: <CheckCircle size={15} />,
                  },
                  {
                    label: "24/7 Emergency Service",
                    icon: <Phone size={15} />,
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      fontFamily: "DM Sans",
                      fontSize: "0.83rem",
                      color: "var(--charcoal)",
                    }}
                  >
                    <span style={{ color: "var(--sage-dark)" }}>
                      {item.icon}
                    </span>
                    {item.label}
                  </div>
                ))}
              </div>
              <Link
                href="/#contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "12px 28px",
                  background: "var(--charcoal)",
                  color: "white",
                  fontFamily: "DM Sans",
                  fontSize: "0.88rem",
                  textDecoration: "none",
                }}
              >
                Work With Us <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: "80px 0", background: "white" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 48,
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
              Client Stories
            </span>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 24,
            }}
          >
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                style={{ padding: "36px 32px", background: "var(--sage-pale)" }}
              >
                <div style={{ display: "flex", gap: 3, marginBottom: 20 }}>
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star
                      key={j}
                      size={14}
                      fill="var(--accent)"
                      style={{ color: "var(--accent)" }}
                    />
                  ))}
                </div>
                <p
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: "1.15rem",
                    fontStyle: "italic",
                    lineHeight: 1.65,
                    color: "var(--charcoal)",
                    marginBottom: 24,
                  }}
                >
                  &ldquo;{t.text}&rdquo;
                </p>
                <div
                  style={{
                    fontFamily: "DM Sans",
                    fontSize: "0.88rem",
                    fontWeight: 500,
                    color: "var(--charcoal)",
                  }}
                >
                  {t.name}
                </div>
                <div
                  style={{
                    fontFamily: "DM Sans",
                    fontSize: "0.78rem",
                    color: "var(--text-muted)",
                    marginTop: 3,
                  }}
                >
                  {t.role}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWS ── */}
      <section id="news" style={{ padding: "100px 0" }} className="mesh-bg">
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: 56,
              flexWrap: "wrap",
              gap: 20,
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 16,
                }}
              >
                <div
                  style={{ width: 36, height: 1, background: "var(--sage)" }}
                />
                <span
                  style={{
                    fontFamily: "DM Sans",
                    fontSize: "0.72rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--sage-dark)",
                  }}
                >
                  Insights
                </span>
              </div>
              <h2
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "clamp(2rem, 3.5vw, 3rem)",
                  fontWeight: 600,
                  color: "var(--charcoal)",
                  lineHeight: 1.2,
                }}
              >
                From 
                <em style={{ fontStyle: "italic", color: "var(--sage-dark)" }}>
                   the Élan Blog,
                </em>
                  about the industry 
              </h2>
            </div>
            <Link
              href="/blog"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontFamily: "DM Sans",
                fontSize: "0.85rem",
                color: "var(--charcoal)",
                textDecoration: "none",
                borderBottom: "1px solid var(--charcoal)",
                paddingBottom: 2,
              }}
            >
              All articles <ArrowRight size={14} />
            </Link>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 28,
            }}
          >
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                style={{ textDecoration: "none", display: "block" }}
                className="blog-card"
              >
                <div
                  style={{
                    overflow: "hidden",
                    marginBottom: 20,
                    aspectRatio: "16/9",
                    position: "relative",
                  }}
                >
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: 12,
                    marginBottom: 12,
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "DM Sans",
                      fontSize: "0.68rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--sage-dark)",
                      background: "var(--sage-pale)",
                      padding: "3px 10px",
                    }}
                  >
                    {post.category}
                  </span>
                  <span
                    style={{
                      fontFamily: "DM Sans",
                      fontSize: "0.72rem",
                      color: "var(--text-muted)",
                    }}
                  >
                    {post.readTime} read
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: "1.35rem",
                    fontWeight: 600,
                    color: "var(--charcoal)",
                    lineHeight: 1.3,
                    marginBottom: 10,
                  }}
                >
                  {post.title}
                </h3>
                <p
                  style={{
                    fontFamily: "DM Sans",
                    fontSize: "0.83rem",
                    lineHeight: 1.7,
                    color: "var(--text-muted)",
                  }}
                >
                  {post.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section
        id="contact"
        style={{
          padding: "100px 0",
          background: "var(--charcoal)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-20%",
            right: "-10%",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "rgba(143,175,159,0.07)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 32px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 80,
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 20,
                }}
              >
                <div
                  style={{ width: 36, height: 1, background: "var(--sage)" }}
                />
                <span
                  style={{
                    fontFamily: "DM Sans",
                    fontSize: "0.72rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--sage)",
                  }}
                >
                  Get In Touch
                </span>
              </div>
              <h2
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
                  fontWeight: 600,
                  color: "white",
                  lineHeight: 1.15,
                  marginBottom: 28,
                }}
              >
                Let&apos;s design your{" "}
                <em style={{ color: "var(--sage-light)", fontStyle: "italic" }}>
                  ideal system
                </em>
              </h2>
              <p
                style={{
                  fontFamily: "DM Sans",
                  fontSize: "0.93rem",
                  lineHeight: 1.8,
                  color: "rgba(255,255,255,0.55)",
                  marginBottom: 48,
                  maxWidth: 420,
                }}
              >
                Whether you need a simple HVAC tune-up or a complete
                solar-plus-battery installation, start with a free consultation.
                Transparent proposals, no pressure.
              </p>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 20 }}
              >
                {[
                  {
                    icon: <Phone size={16} />,
                    label: "Call us",
                    value: "+254 796 952 717",
                  },
                  {
                    icon: <Mail size={16} />,
                    label: "Email",
                    value: "hello@elanclimat.co.ke",
                  },
                  {
                    icon: <MapPin size={16} />,
                    label: "Address",
                    value: "Ananas Business Park, Off Garrissa Road, Thika",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 16,
                    }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        background: "rgba(143,175,159,0.15)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--sage-light)",
                        flexShrink: 0,
                      }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: "DM Sans",
                          fontSize: "0.7rem",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "var(--sage)",
                          marginBottom: 3,
                        }}
                      >
                        {item.label}
                      </div>
                      <div
                        style={{
                          fontFamily: "DM Sans",
                          fontSize: "0.9rem",
                          color: "rgba(255,255,255,0.7)",
                        }}
                      >
                        {item.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        @media (max-width: 640px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            margin-top: 40px !important;
          }
        }
        @media (max-width: 768px) {
          #contact > div > div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
          section > div > div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
      <SpeedInsights />
    </>
  );
}
