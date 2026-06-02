// app/privacy-policy/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// ─── Design tokens ─────────────────────────────────────────────────────────────
const C = {
  charcoal: "#1a1a18",
  warmWhite: "#f9f7f4",
  offWhite: "#ede9e2",
  sage: "#8fa68e",
  sageDark: "#5a7a59",
  accent: "#c9a96e",
  muted: "#888580",
  body: "#6b6b68",
  rule: "#e8e4dd",
  ruleLight: "#c8c8c4",
  dim: "#b0b0a8",
};

const LAST_UPDATED = "30 May 2025";

const SECTIONS = [
  {
    index: "01",
    title: "Who we are",
    content: `Élan Climat & Énergie is a Nairobi-based energy solutions company specialising in HVAC systems, solar PV installations, and battery storage. Our registered address is Nairobi, Kenya. When this policy refers to "Élan", "we", "us", or "our", it means Élan Climat & Énergie.\n\nYou can reach us at any time at legal@elanclimat.co.ke.`,
  },
  {
    index: "02",
    title: "What information we collect",
    content: `We collect only what we need to serve you well.\n\nInformation you give us directly — when you fill in a contact or quote request form, send us an email, or apply for a job, we receive your name, email address, phone number, and any details you choose to share.\n\nInformation collected automatically — when you browse our website, our hosting infrastructure records your IP address, browser type, pages visited, and time spent. We use this only in aggregate to understand how the site is used.\n\nInformation from third parties — if you reach us through a referral partner or social platform, we may receive limited contact details they have permission to share.\n\nWe do not collect sensitive personal data such as identity documents, financial account details, or health information unless you explicitly provide them as part of a project brief.`,
  },
  {
    index: "03",
    title: "How we use your information",
    content: `We use your information to:\n\n— Respond to enquiries and provide quotations for our services\n— Process and manage installation projects you commission\n— Send you updates directly relevant to your project or order\n— Review and respond to job applications\n— Improve our website and understand which content is useful\n— Meet our legal and regulatory obligations in Kenya\n\nWe do not use your data for automated decision-making or profiling.`,
  },
  {
    index: "04",
    title: "Legal basis for processing",
    content: `We process your personal data on the following legal bases under the Kenya Data Protection Act, 2019:\n\nContractual necessity — when processing is required to fulfil a service agreement or take pre-contractual steps at your request.\n\nLegitimate interests — for website analytics and internal business improvement, where our interest does not override your rights.\n\nConsent — for any marketing communications, which we will only send if you have explicitly opted in. You may withdraw consent at any time.\n\nLegal obligation — where we are required to retain or disclose information by Kenyan law or regulation.`,
  },
  {
    index: "05",
    title: "Who we share your data with",
    content: `We do not sell, rent, or trade your personal data. We share it only where necessary:\n\nService providers — we work with carefully selected suppliers (hosting, email delivery, accounting software) who process data on our behalf under strict confidentiality agreements.\n\nProfessional advisers — our lawyers and accountants may access data where legally required.\n\nRegulatory authorities — we will disclose data if required by law, court order, or a competent Kenyan authority.\n\nBusiness transfers — if Élan Climat & Énergie is acquired or merges with another entity, your data may transfer as part of that transaction, subject to the same protections described here.\n\nWe do not transfer your data outside Kenya unless the receiving country provides an equivalent level of data protection or appropriate safeguards are in place.`,
  },
  {
    index: "06",
    title: "How long we keep your data",
    content: `We retain your data only for as long as necessary:\n\nEnquiries and quotes — 2 years from last contact, unless a project follows.\n\nProject records — 7 years from project completion, for warranty and legal purposes.\n\nJob applications — 6 months from the closing date, or 1 year if you consented to being considered for future roles.\n\nWebsite analytics — aggregated data only; no identifiable records retained beyond 90 days.\n\nAfter the applicable retention period, data is securely deleted or anonymised.`,
  },
  {
    index: "07",
    title: "Your rights",
    content: `Under the Kenya Data Protection Act, 2019, you have the right to:\n\n— Access the personal data we hold about you\n— Correct inaccurate or incomplete data\n— Request erasure of your data (subject to legal retention obligations)\n— Object to or restrict certain types of processing\n— Withdraw consent where processing is based on consent\n— Lodge a complaint with the Office of the Data Protection Commissioner (ODPC)\n\nTo exercise any of these rights, write to us at legal@elanclimat.co.ke. We will respond within 21 days.`,
  },
  {
    index: "08",
    title: "Cookies",
    content: `Our website uses a small number of cookies:\n\nEssential cookies — required for the site to function (session management, security). These cannot be disabled.\n\nAnalytics cookies — we use privacy-respecting, aggregated analytics to understand page performance. No cross-site tracking. You can disable these in your browser settings at any time.\n\nWe do not use advertising or third-party tracking cookies.`,
  },
  {
    index: "09",
    title: "Security",
    content: `We take reasonable and appropriate technical and organisational measures to protect your data against unauthorised access, loss, or disclosure. Our website is served over HTTPS. Access to personal data within our team is limited to those who need it.\n\nNo transmission over the internet is completely secure. If you have concerns about a specific communication, please contact us directly.`,
  },
  {
    index: "10",
    title: "Changes to this policy",
    content: `We may update this policy from time to time. When we do, we will revise the "Last updated" date at the top of this page. For material changes, we will notify affected individuals directly where we have contact details.\n\nContinued use of our website after an update constitutes acceptance of the revised policy.`,
  },
  {
    index: "11",
    title: "Contact us",
    content: `For any questions, requests, or concerns about this privacy policy or how we handle your data, please contact:\n\nÉlan Climat & Énergie\nEmail: legal@elanclimat.co.ke\nLocation: Nairobi, Kenya\n\nIf you are unsatisfied with our response, you have the right to contact the Office of the Data Protection Commissioner (ODPC) at www.odpc.go.ke.`,
  },
];

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

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState("01");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id.replace("section-", "");
            setActiveSection(id);
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(`section-${s.index}`);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <main style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        .pp-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 64px;
        }

        /* Sticky top nav */
        .pp-toc-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 64px;
          display: flex;
          align-items: center;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .pp-toc-inner::-webkit-scrollbar { display: none; }
        .pp-toc-link {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.64rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 14px 16px;
          white-space: nowrap;
          border-bottom: 2px solid transparent;
          transition: color 0.2s, border-color 0.2s;
          color: ${C.dim};
        }
        .pp-toc-link.active {
          color: ${C.charcoal};
          border-bottom-color: ${C.sage};
        }
        .pp-toc-link:hover { color: ${C.charcoal}; }

        /* Body: sidebar + content */
        .pp-layout {
          display: grid;
          grid-template-columns: 220px 1fr;
          gap: 80px;
          align-items: start;
          max-width: 1200px;
          margin: 0 auto;
          padding: 80px 64px 120px;
        }
        .pp-sidebar {
          position: sticky;
          top: 80px;
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .pp-sidebar-title {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.58rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: ${C.dim};
          margin-bottom: 16px;
        }
        .pp-sidebar-link {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.74rem;
          color: ${C.dim};
          text-decoration: none;
          padding: 10px 0 10px 16px;
          border-left: 2px solid ${C.rule};
          line-height: 1.4;
          transition: color 0.2s, border-color 0.2s;
          display: block;
        }
        .pp-sidebar-link:hover { color: ${C.charcoal}; }
        .pp-sidebar-link.active {
          color: ${C.charcoal};
          border-left-color: ${C.sage};
          font-weight: 500;
        }

        /* Section rows */
        .pp-section {
          padding: 56px 0;
          border-bottom: 1px solid ${C.rule};
        }
        .pp-section:first-child { padding-top: 0; }
        .pp-section:last-child { border-bottom: none; }

        /* Hero right col */
        .pp-hero-right { display: flex; flex-direction: column; gap: 14px; }

        /* CTA band */
        .pp-cta-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 280px;
        }
        .pp-cta-left {
          padding: 72px 64px;
          border-right: 1px solid rgba(255,255,255,0.07);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .pp-cta-right {
          padding: 72px 64px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        /* ── Tablet ── */
        @media (max-width: 1100px) {
          .pp-inner { padding: 0 32px; }
          .pp-toc-inner { padding: 0 32px; }
          .pp-layout {
            grid-template-columns: 1fr;
            padding: 56px 32px 80px;
            gap: 0;
          }
          .pp-sidebar { display: none; }

          /* Hero: stack columns */
          .pp-hero-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .pp-hero-right { max-width: 560px; }

          /* CTA: stack */
          .pp-cta-grid { grid-template-columns: 1fr !important; }
          .pp-cta-left {
            border-right: none !important;
            border-bottom: 1px solid rgba(255,255,255,0.07);
            padding: 56px 32px !important;
          }
          .pp-cta-right { padding: 56px 32px !important; }
        }

        /* ── Mobile ── */
        @media (max-width: 640px) {
          .pp-inner { padding: 0 20px; }
          .pp-toc-inner { padding: 0 20px; }
          .pp-layout { padding: 40px 20px 64px; }

          .pp-cta-left { padding: 48px 20px !important; }
          .pp-cta-right { padding: 48px 20px !important; }

          /* Tighten section rows */
          .pp-section { padding: 40px 0; }

          /* Hide ghost numeral on very small screens */
          .pp-section-numeral { display: none !important; }
        }
      `}</style>

      {/* ══════════════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════════════ */}
      <div
        style={{
          position: "relative",
          height: "52vh",
          minHeight: 400,
          overflow: "hidden",
        }}
      >
        <Image
          src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1800&q=85"
          alt="Privacy policy hero"
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
              "linear-gradient(to right, rgba(26,26,24,0.88) 0%, rgba(26,26,24,0.55) 55%, rgba(26,26,24,0.18) 100%)",
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
            height: "100%",
            padding: "48px 0 56px",
          }}
        >
          {/* Breadcrumb */}
          <div className="pp-inner">
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
                Privacy Policy
              </span>
            </div>
          </div>

          {/* Hero copy */}
          <div className="pp-inner">
            <div
              className="pp-hero-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 80,
                alignItems: "flex-end",
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                <Eyebrow text="Legal" light />
                <h1
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(2.6rem, 5vw, 4rem)",
                    fontWeight: 300,
                    lineHeight: 1.05,
                    letterSpacing: "-0.025em",
                    color: "#ffffff",
                    margin: 0,
                  }}
                >
                  Privacy
                  <br />
                  <em style={{ fontStyle: "italic", color: C.accent }}>
                    Policy
                  </em>
                </h1>
              </motion.div>

              <motion.div
                className="pp-hero-right"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.12,
                }}
              >
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.65rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.25)",
                  }}
                >
                  Last updated — {LAST_UPDATED}
                </span>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.84rem",
                    color: "rgba(255,255,255,0.55)",
                    lineHeight: 1.85,
                    margin: 0,
                    fontWeight: 300,
                    maxWidth: 380,
                  }}
                >
                  We keep this simple: we collect only what we need, hold it
                  only as long as necessary, and never sell it. This policy
                  explains exactly how we handle your personal data in
                  compliance with the Kenya Data Protection Act, 2019.
                </p>
                <a
                  href="mailto:legal@elanclimat.co.ke"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.76rem",
                    color: C.accent,
                    textDecoration: "none",
                    borderBottom: "1px solid rgba(201,169,110,0.3)",
                    paddingBottom: 2,
                    display: "inline-block",
                    letterSpacing: "0.04em",
                    alignSelf: "flex-start",
                  }}
                >
                  legal@elanclimat.co.ke
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          STICKY TOP NAV
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
        <nav className="pp-toc-inner" aria-label="Policy sections">
          {SECTIONS.map((s) => (
            <a
              key={s.index}
              href={`#section-${s.index}`}
              className={`pp-toc-link${activeSection === s.index ? " active" : ""}`}
            >
              {s.index}. {s.title}
            </a>
          ))}
        </nav>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          BODY — sidebar + content
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: C.warmWhite }}>
        <div className="pp-layout">
          <aside className="pp-sidebar">
            <span className="pp-sidebar-title">Contents</span>
            {SECTIONS.map((s) => (
              <a
                key={s.index}
                href={`#section-${s.index}`}
                className={`pp-sidebar-link${activeSection === s.index ? " active" : ""}`}
              >
                {s.index}. {s.title}
              </a>
            ))}
          </aside>

          <div>
            {SECTIONS.map((s, i) => (
              <motion.div
                key={s.index}
                id={`section-${s.index}`}
                className="pp-section"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                  delay: i < 3 ? i * 0.05 : 0,
                }}
                style={{ scrollMarginTop: 80 }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: 24,
                    marginBottom: 28,
                  }}
                >
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 8 }}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 10 }}
                    >
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
                          fontSize: "0.58rem",
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                          color: C.sage,
                          fontWeight: 500,
                        }}
                      >
                        {s.index}
                      </span>
                    </div>
                    <h2
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)",
                        fontWeight: 400,
                        color: C.charcoal,
                        lineHeight: 1.15,
                        letterSpacing: "-0.01em",
                        margin: 0,
                      }}
                    >
                      {s.title}
                    </h2>
                  </div>

                  <span
                    className="pp-section-numeral"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
                      fontWeight: 300,
                      color: C.rule,
                      lineHeight: 1,
                      letterSpacing: "-0.04em",
                      flexShrink: 0,
                    }}
                  >
                    {s.index}
                  </span>
                </div>

                <div
                  style={{
                    width: 32,
                    height: 1,
                    background: C.ruleLight,
                    marginBottom: 24,
                  }}
                />

                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.86rem",
                    color: C.body,
                    lineHeight: 1.9,
                    whiteSpace: "pre-line",
                    fontWeight: 300,
                    maxWidth: 680,
                  }}
                >
                  {s.content
                    .split(/(legal@elanclimat\.co\.ke|www\.odpc\.go\.ke)/g)
                    .map((part, pi) =>
                      part === "legal@elanclimat.co.ke" ? (
                        <a
                          key={pi}
                          href="mailto:legal@elanclimat.co.ke"
                          style={{
                            color: C.charcoal,
                            textDecoration: "underline",
                            textUnderlineOffset: 3,
                          }}
                        >
                          {part}
                        </a>
                      ) : part === "www.odpc.go.ke" ? (
                        <a
                          key={pi}
                          href="https://www.odpc.go.ke"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: C.charcoal,
                            textDecoration: "underline",
                            textUnderlineOffset: 3,
                          }}
                        >
                          {part}
                        </a>
                      ) : (
                        <span key={pi}>{part}</span>
                      ),
                    )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          CTA BAND
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ background: C.charcoal, padding: 0 }}>
        <div className="pp-cta-grid">
          {/* Left */}
          <div className="pp-cta-left">
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <Eyebrow text="Questions about your data?" light />
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(1.8rem, 2.8vw, 2.6rem)",
                  fontWeight: 400,
                  color: "#ffffff",
                  lineHeight: 1.12,
                  letterSpacing: "-0.02em",
                  margin: 0,
                }}
              >
                We're happy to clarify.
                <br />
                <em
                  style={{
                    fontStyle: "italic",
                    color: C.accent,
                    fontWeight: 300,
                  }}
                >
                  Write to us anytime.
                </em>
              </h2>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.8rem",
                  color: "rgba(255,255,255,0.38)",
                  lineHeight: 1.8,
                  maxWidth: 340,
                  fontWeight: 300,
                  margin: 0,
                }}
              >
                We're happy to clarify anything in this policy or tell you
                exactly what data we hold about you. We'll respond within 21
                days.
              </p>
            </div>
            <a
              href="mailto:legal@elanclimat.co.ke"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.78rem",
                color: C.accent,
                letterSpacing: "0.06em",
                textDecoration: "none",
                borderBottom: "1px solid rgba(201,169,110,0.35)",
                paddingBottom: 2,
                display: "inline-block",
                alignSelf: "flex-start",
                marginTop: 32,
              }}
            >
              legal@elanclimat.co.ke
            </a>
          </div>

          {/* Right */}
          <div className="pp-cta-right">
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.58rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.2)",
                  marginBottom: 4,
                }}
              >
                Related
              </span>

              {[
                {
                  label: "Home",
                  href: "/",
                  desc: "Explore our energy solutions",
                },
                {
                  label: "About Us",
                  href: "/about",
                  desc: "Learn about our mission and team",
                },
                {
                  label: "Our Services",
                  href: "/services",
                  desc: "What we build and maintain",
                },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "16px 0",
                    borderBottom: "1px solid rgba(255,255,255,0.07)",
                    textDecoration: "none",
                    gap: 16,
                  }}
                  onMouseEnter={(e) => {
                    (
                      e.currentTarget as HTMLAnchorElement
                    ).style.borderBottomColor = "rgba(255,255,255,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    (
                      e.currentTarget as HTMLAnchorElement
                    ).style.borderBottomColor = "rgba(255,255,255,0.07)";
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "1.1rem",
                        fontWeight: 400,
                        color: "#ffffff",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {link.label}
                    </div>
                    <div
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.72rem",
                        color: "rgba(255,255,255,0.3)",
                        fontWeight: 300,
                        marginTop: 2,
                      }}
                    >
                      {link.desc}
                    </div>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M2 12L12 2M12 2H5M12 2V9"
                      stroke="rgba(255,255,255,0.25)"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              ))}
            </div>

            <div
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "0.88rem",
                color: "rgba(255,255,255,0.18)",
                lineHeight: 1.75,
                maxWidth: 260,
                marginTop: 32,
              }}
            >
              Élan Climat & Énergie
              <br />
              Nairobi, Kenya · Est. 2012
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
