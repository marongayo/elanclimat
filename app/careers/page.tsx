"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/Footer";

const ROLES = [
  {
    id: "hvac-tech",
    title: "HVAC Installation Technician",
    category: "Technical",
    location: "Nairobi, KE",
    type: "Full-time",
    index: "01",
    description:
      "Install, commission, and service high-efficiency HVAC systems across residential and commercial projects. You'll work alongside our senior engineers on premium builds where precision matters.",
    requirements: [
      "3+ years HVAC installation experience",
      "Familiarity with inverter split systems and VRF",
      "Valid electrical or mechanical certification",
      "Clean driving licence",
    ],
  },
  {
    id: "solar-engineer",
    title: "Solar Systems Engineer",
    category: "Technical",
    location: "Nairobi, KE",
    type: "Full-time",
    index: "02",
    description:
      "Design and oversee solar PV and battery storage installations from site survey through commissioning. You care about clean energy as much as we do.",
    requirements: [
      "Degree in Electrical or Renewable Energy Engineering",
      "Experience with off-grid and grid-tied systems",
      "Proficiency in PVsyst or similar design tools",
      "Strong client-facing communication skills",
    ],
  },
  {
    id: "project-coordinator",
    title: "Project Coordinator",
    category: "Operations",
    location: "Nairobi, KE",
    type: "Full-time",
    index: "03",
    description:
      "Keep our installation projects running on time and on budget. You'll coordinate between clients, procurement, and field teams — the connective tissue that makes everything work.",
    requirements: [
      "2+ years project coordination or site management",
      "Experience with MS Project or similar tools",
      "Excellent written and verbal communication",
      "Background in construction or MEP preferred",
    ],
  },
  {
    id: "sales-consultant",
    title: "Energy Solutions Consultant",
    category: "Sales",
    location: "Nairobi, KE",
    type: "Full-time",
    index: "04",
    description:
      "Introduce clients to our range of HVAC, solar, and battery solutions. You'll guide them from initial inquiry through system selection — warm conversations with people who already want what we offer.",
    requirements: [
      "Proven track record in consultative sales",
      "Genuine interest in sustainable energy and technology",
      "Ability to interpret technical product specifications",
      "Existing network in real estate or construction a plus",
    ],
  },
  {
    id: "brand-intern",
    title: "Brand & Communications Intern",
    category: "Creative",
    location: "Nairobi / Remote",
    type: "Internship",
    index: "05",
    description:
      "Help shape how Élan looks and sounds — from social content to product photography briefs. Real experience with a brand that takes aesthetics seriously.",
    requirements: [
      "Studying design, communications, or marketing",
      "Strong portfolio of visual work",
      "Familiarity with Adobe Creative Suite or Figma",
      "A genuine eye for quality and detail",
    ],
  },
];

const VALUES = [
  { label: "Precision over speed" },
  { label: "Sustainability as identity" },
  { label: "Craft in everything" },
  { label: "Long-term thinking" },
];

export default function CareersPage() {
  const [openRole, setOpenRole] = useState(null);
  const [applied, setApplied] = useState(false);

  function toggle(role) {
    setOpenRole((prev) => (prev?.id === role.id ? null : role));
    setApplied(false);
  }

  return (
    <main style={{ background: "#f9f7f4", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .careers-root { font-family: 'DM Sans', sans-serif; }

        /* ── HERO ── */
        .hero {
          background: #1a1a18;
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 92vh;
        }
        .hero-left {
          padding: 80px 64px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-right: 1px solid rgba(255,255,255,0.06);
        }
        .hero-right {
          padding: 80px 64px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }
        .hero-eyebrow {
          display: flex; align-items: center; gap: 12px; margin-bottom: 56px;
        }
        .hero-eyebrow-line { width: 28px; height: 1px; background: rgba(255,255,255,0.35); }
        .hero-eyebrow-text {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.6rem; letter-spacing: 0.22em;
          text-transform: uppercase; color: rgba(255,255,255,0.4);
        }
        .hero-h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(3.2rem, 6vw, 5rem);
          font-weight: 300;
          line-height: 1.02;
          letter-spacing: -0.025em;
          color: #ffffff;
        }
        .hero-h1 em {
          font-style: italic;
          font-weight: 300;
          color: #c9a96e;
        }
        .hero-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem;
          color: rgba(255,255,255,0.45);
          line-height: 1.85;
          max-width: 300px;
          margin-top: 32px;
        }
        .hero-stats {
          display: flex; gap: 48px; padding-top: 64px;
          border-top: 1px solid rgba(255,255,255,0.07);
          margin-top: 64px;
        }
        .hero-stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.2rem; font-weight: 300;
          color: #ffffff; line-height: 1;
          letter-spacing: -0.03em;
        }
        .hero-stat-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.6rem; letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.28);
          margin-top: 6px;
        }

        /* right panel — vertical text + values */
        .hero-values-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.6rem; letter-spacing: 0.2em;
          text-transform: uppercase; color: rgba(255,255,255,0.2);
          margin-bottom: 28px;
        }
        .hero-value-item {
          padding: 18px 0;
          border-top: 1px solid rgba(255,255,255,0.07);
          display: flex; align-items: center; gap: 16px;
        }
        .hero-value-num {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.55rem; color: rgba(255,255,255,0.2);
          letter-spacing: 0.08em; min-width: 18px;
        }
        .hero-value-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.1rem; font-weight: 400;
          color: rgba(255,255,255,0.55);
          letter-spacing: 0.01em;
        }
        .hero-value-item:last-child { border-bottom: 1px solid rgba(255,255,255,0.07); }

        /* ── ROLES SECTION ── */
        .roles-section { padding: 96px 0; max-width: 1100px; margin: 0 auto; padding-left: 64px; padding-right: 64px; }

        .section-header {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          margin-bottom: 64px;
          padding-bottom: 48px;
          border-bottom: 1px solid #e8e4dd;
        }
        .section-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 3.5vw, 2.8rem);
          font-weight: 300;
          color: #1a1a18;
          line-height: 1.1;
          letter-spacing: -0.02em;
        }
        .section-title em { font-style: italic; color: #8fa68e; }
        .section-body {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem;
          color: #888580;
          line-height: 1.85;
          padding-top: 8px;
        }

        /* ── ROLE ROWS ── */
        .role-row {
          border-bottom: 1px solid #e8e4dd;
          cursor: pointer;
          transition: background 0.2s;
        }
        .role-row:first-of-type { border-top: none; }
        .role-row-header {
          display: grid;
          grid-template-columns: 48px 1fr auto auto;
          align-items: center;
          gap: 24px;
          padding: 28px 0;
          transition: all 0.2s;
        }
        .role-row:hover .role-row-header { padding-left: 8px; }
        .role-index {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.58rem; letter-spacing: 0.12em;
          color: #b0b0a8;
        }
        .role-title-group {}
        .role-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.35rem; font-weight: 400;
          color: #1a1a18; line-height: 1.2;
          letter-spacing: -0.01em;
        }
        .role-cat {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.62rem;
          color: #b0b0a8;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          margin-top: 4px;
        }
        .role-meta {
          display: flex; flex-direction: column; align-items: flex-end; gap: 4px;
        }
        .role-location {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.72rem; color: #888580;
        }
        .role-type {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.62rem; color: #b0b0a8;
          letter-spacing: 0.08em;
        }
        .role-chevron {
          width: 32px; height: 32px;
          border: 1px solid #e8e4dd;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-family: 'DM Sans', sans-serif;
          font-size: 1rem; color: #1a1a18;
          transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
          flex-shrink: 0;
        }
        .role-chevron.open {
          background: #1a1a18; color: #fff;
          transform: rotate(45deg);
          border-color: #1a1a18;
        }

        /* ── ROLE DETAIL PANEL ── */
        .role-detail {
          overflow: hidden;
        }
        .role-detail-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          padding: 0 0 40px 72px;
        }
        .detail-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.58rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #b0b0a8;
          display: block;
          margin-bottom: 12px;
        }
        .detail-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.84rem;
          color: #6b6b68;
          line-height: 1.85;
        }
        .req-item {
          display: flex; gap: 12px;
          align-items: flex-start;
          margin-bottom: 10px;
        }
        .req-dot {
          width: 3px; height: 3px;
          border-radius: 50%;
          background: #8fa68e;
          margin-top: 8px; flex-shrink: 0;
        }
        .req-text {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem;
          color: #6b6b68;
          line-height: 1.7;
        }
        .apply-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 13px 28px;
          background: #1a1a18;
          color: #fff;
          border: none;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          margin-top: 24px;
          transition: opacity 0.2s;
        }
        .apply-btn:hover { opacity: 0.82; }
        .apply-success {
          display: inline-flex; align-items: center; gap: 8px;
          margin-top: 24px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem;
          color: #5a7a59;
          border: 1px solid #c8dbc7;
          padding: 12px 20px;
          background: #f3f8f3;
        }

        /* ── FOOTER ── */
        .footer-band {
          background: #1a1a18;
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 260px;
        }
        .footer-left {
          padding: 64px;
          border-right: 1px solid rgba(255,255,255,0.06);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .footer-right {
          padding: 64px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }
        .footer-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.6rem, 2.5vw, 2.2rem);
          font-weight: 300;
          color: #fff;
          line-height: 1.15;
          letter-spacing: -0.02em;
        }
        .footer-heading em { font-style: italic; color: #c9a96e; }
        .footer-body {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.76rem;
          color: rgba(255,255,255,0.38);
          line-height: 1.8;
          max-width: 320px;
          margin-top: 16px;
        }
        .footer-email {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem;
          color: #c9a96e;
          letter-spacing: 0.06em;
          text-decoration: none;
          border-bottom: 1px solid rgba(201,169,110,0.35);
          padding-bottom: 2px;
          display: inline-block;
        }
        .footer-small {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.62rem;
          color: rgba(255,255,255,0.2);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        @media (max-width: 860px) {
          .hero { grid-template-columns: 1fr; min-height: auto; }
          .hero-right { display: none; }
          .hero-left { padding: 56px 28px; }
          .section-header { grid-template-columns: 1fr; gap: 20px; }
          .roles-section { padding: 64px 28px; }
          .role-row-header { grid-template-columns: 32px 1fr auto; }
          .role-meta { display: none; }
          .role-detail-inner { grid-template-columns: 1fr; padding-left: 40px; gap: 28px; }
          .footer-band { grid-template-columns: 1fr; }
          .footer-left { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.06); padding: 48px 28px; }
          .footer-right { padding: 40px 28px; }
        }
      `}</style>

      <div className="careers-root">
        {/* ── HERO ── */}
        <section className="hero">
          <div className="hero-left">
            <div>
              <div className="hero-eyebrow">
                <div className="hero-eyebrow-line" />
                <span className="hero-eyebrow-text">Careers at Élan</span>
              </div>
              <h1 className="hero-h1">
                Build what
                <br />
                <em>matters.</em>
                <br />
                Work with
                <br />
                care.
              </h1>
              <p className="hero-sub">
                We're building the infrastructure for a more sustainable East
                Africa — one installation at a time. If precision, craft, and
                clean energy matter to you, you might belong here.
              </p>
            </div>
            <div className="hero-stats">
              {[
                { num: "12+", label: "Years operating" },
                { num: "400+", label: "Projects delivered" },
                { num: "5", label: "Open roles" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="hero-stat-num">{s.num}</div>
                  <div className="hero-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-right">
            <div className="hero-values-label">What we stand for</div>
            {VALUES.map((v, i) => (
              <div className="hero-value-item" key={v.label}>
                <span className="hero-value-num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="hero-value-text">{v.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── ROLES ── */}
        <section className="roles-section">
          <div className="section-header">
            <h2 className="section-title">
              Open
              <br />
              <em>positions</em>
            </h2>
            <p className="section-body">
              Five roles across technical, operations, sales, and creative. Each
              one is genuinely open — we're looking for real people, not just
              CVs. Click any role to read more and apply.
            </p>
          </div>

          <div>
            {ROLES.map((role) => {
              const isOpen = openRole?.id === role.id;
              return (
                <div
                  className="role-row"
                  key={role.id}
                  onClick={() => toggle(role)}
                >
                  <div className="role-row-header">
                    <span className="role-index">{role.index}</span>
                    <div className="role-title-group">
                      <div className="role-title">{role.title}</div>
                      <div className="role-cat">{role.category}</div>
                    </div>
                    <div className="role-meta">
                      <span className="role-location">{role.location}</span>
                      <span className="role-type">{role.type}</span>
                    </div>
                    <div className={`role-chevron${isOpen ? " open" : ""}`}>
                      +
                    </div>
                  </div>

                  {isOpen && (
                    <div
                      className="role-detail"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="role-detail-inner">
                        <div>
                          <span className="detail-label">About the role</span>
                          <p className="detail-desc">{role.description}</p>
                        </div>
                        <div>
                          <span className="detail-label">
                            What we're looking for
                          </span>
                          {role.requirements.map((r, i) => (
                            <div className="req-item" key={i}>
                              <div className="req-dot" />
                              <span className="req-text">{r}</span>
                            </div>
                          ))}
                          {!applied ? (
                            <button
                              className="apply-btn"
                              onClick={() => setApplied(true)}
                            >
                              Apply for this role →
                            </button>
                          ) : (
                            <div className="apply-success">
                              ✓ Application received — we'll be in touch.
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ── FOOTER BAND ── */}
        <section className="footer-band">
          <div className="footer-left">
            <div>
              <h2 className="footer-heading">
                Don't see
                <br />
                your role?
                <br />
                <em>Write to us.</em>
              </h2>
              <p className="footer-body">
                We hire for character as much as credentials. Send us a short
                note about who you are and what you'd bring — we read
                everything.
              </p>
            </div>
            <a href="mailto:careers@elanclimat.co.ke" className="footer-email">
              careers@elanclimat.co.ke
            </a>
          </div>
          <div className="footer-right">
            <div className="footer-small">Élan Climat & Énergie</div>
            <div
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "0.88rem",
                color: "rgba(255,255,255,0.22)",
                lineHeight: 1.7,
                maxWidth: 260,
              }}
            >
              Nairobi, Kenya
              <br />
              HVAC · Solar · Battery Storage
              <br />
              Est. 2012
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
