// app/terms/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import { C } from "@/lib/constants";

const META = [
  { label: "Entity", value: "Élan Climat & Énergie Ltd" },
  { label: "Jurisdiction", value: "Republic of Kenya" },
  { label: "Last Revised", value: "31 May 2025" },
  { label: "Sections", value: "10" },
];

// ─── Shared eyebrow ───────────────────────────────────────────────────────────
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

// ─── Section data ─────────────────────────────────────────────────────────────
interface Section {
  id: string;
  num: string;
  title: string;
  summary: string;
  content: React.ReactNode;
}

const SECTIONS: Section[] = [
  {
    id: "acceptance",
    num: "01",
    title: "Acceptance of Terms",
    summary: "By engaging with us, you agree.",
    content: (
      <>
        <p>
          By accessing, browsing, or placing an enquiry through the Élan Climat
          &amp; Énergie website or any associated service, you confirm that you
          have read, understood, and agree to be bound by these Terms of Service
          and our Privacy Policy, both of which form a single legal agreement
          between you and Élan Climat &amp; Énergie Ltd.
        </p>
        <p>
          If you are acting on behalf of a company, institution, or other legal
          entity, you represent that you have the authority to bind that entity
          to these terms. If you do not have such authority — or if you do not
          agree with any part of these terms — you must not use our services.
        </p>
        <p>
          We reserve the right to update or amend these terms at any time. When
          we do, we will update the &quot;Last Revised&quot; date at the top of
          this page. Continued use of our services following any such change
          constitutes your acceptance of the new terms.
        </p>
      </>
    ),
  },
  {
    id: "services",
    num: "02",
    title: "Our Services",
    summary: "What we do — and what we don't.",
    content: (
      <>
        <p>
          Élan Climat &amp; Énergie specialises in the supply, installation, and
          maintenance of HVAC systems, solar energy solutions, battery storage
          systems, and related electrical infrastructure across Kenya. Our
          website serves as both a product showcase and an initial point of
          contact for project enquiries.
        </p>
        <p>
          <strong>Important distinction:</strong> Prices displayed on our Shop
          page are indicative and represent equipment costs only. They do not
          include installation, site survey fees, permits, cabling, structural
          modifications, or any professional labour. Every project is unique —
          final pricing is issued via a formal written quotation after a site
          assessment.
        </p>
        <p>
          We do not operate as a conventional e-commerce store. Adding a product
          to your cart and proceeding to checkout does not constitute a purchase
          or a binding order. It is an expression of interest that initiates a
          consultation process. No goods will be dispatched and no payment will
          be collected without a signed project agreement.
        </p>
      </>
    ),
  },
  {
    id: "quotations",
    num: "03",
    title: "Quotations & Orders",
    summary: "How pricing and agreements work.",
    content: (
      <>
        <p>
          All formal quotations issued by Élan Climat &amp; Énergie are valid
          for <strong>30 calendar days</strong> from the date of issue unless
          otherwise stated in writing. After this period, equipment pricing,
          availability, and lead times are subject to change without notice.
        </p>
        <p>
          A project becomes binding only upon the client&apos;s written
          acceptance of a quotation <em>and</em> the receipt of the agreed
          deposit payment (typically 50% of the total project value). Verbal
          confirmations, WhatsApp messages, or email replies of intent do not
          constitute a binding agreement unless accompanied by payment.
        </p>
        <p>
          We reserve the right to decline any order or enquiry at our
          discretion, without obligation to provide a reason.
        </p>
      </>
    ),
  },
  {
    id: "installation",
    num: "04",
    title: "Installation & Site Conditions",
    summary: "Your responsibilities on-site.",
    content: (
      <>
        <p>
          Where installation services form part of an agreed project scope, the
          client agrees to provide our engineers with safe, unobstructed access
          to all relevant areas of the property at the times mutually agreed in
          advance. Delays caused by restricted access, incomplete civil works,
          or absent decision-makers that result in aborted site visits may be
          charged at our standard day rate.
        </p>
        <p>
          The client is responsible for ensuring that the proposed installation
          site meets the structural and electrical prerequisites communicated
          during the site survey. Élan Climat &amp; Énergie shall not be liable
          for damage to existing structures, surfaces, or services arising from
          conditions not disclosed or reasonably discoverable during survey.
        </p>
        <p>
          All installations are carried out in compliance with applicable Kenyan
          Standards (KS), Energy and Petroleum Regulatory Authority (EPRA)
          guidelines, and manufacturer specifications.
        </p>
      </>
    ),
  },
  {
    id: "warranty",
    num: "05",
    title: "Warranties & Guarantees",
    summary: "What's covered and for how long.",
    content: (
      <>
        <p>
          Equipment supplied by Élan Climat &amp; Énergie carries the original
          manufacturer&apos;s warranty, the terms and duration of which vary by
          brand and product line and are communicated at point of sale.
        </p>
        <p>
          Our workmanship warranty covers installation defects for a period of{" "}
          <strong>12 months</strong> from the date of project handover. This
          covers faults attributable solely to improper installation by our
          team. It does not cover damage resulting from misuse, power surges,
          acts of God, third-party interference, or failure to follow our
          post-installation care guidance.
        </p>
        <p>
          Warranty claims must be reported in writing within 7 days of
          discovering the fault. Élan Climat &amp; Énergie reserves the right to
          inspect the installation before authorising any remedial work under
          warranty.
        </p>
      </>
    ),
  },
  {
    id: "payments",
    num: "06",
    title: "Payments & Refunds",
    summary: "Money matters, stated plainly.",
    content: (
      <>
        <p>
          All amounts are quoted and invoiced in Kenyan Shillings (KES) unless a
          written agreement specifies otherwise. Payment may be made by M-Pesa
          Paybill, bank transfer, or other methods confirmed in writing. We do
          not accept cash payments on-site.
        </p>
        <p>
          Deposits paid to secure equipment procurement are non-refundable once
          an order has been placed with our suppliers, as equipment is often
          imported to specification.
        </p>
        <p>
          Where a project is cancelled by the client after work has commenced,
          Élan Climat &amp; Énergie reserves the right to invoice for all work
          completed to that point. Any balance owed after offsetting deposits
          will be due within 14 days of the cancellation notice.
        </p>
        <p>
          Late payments accrue interest at a rate of{" "}
          <strong>3% per month</strong> on any outstanding balance, compounded
          monthly, commencing 30 days after the invoice due date.
        </p>
      </>
    ),
  },
  {
    id: "liability",
    num: "07",
    title: "Limitation of Liability",
    summary: "The ceiling on what we owe.",
    content: (
      <>
        <p>
          To the fullest extent permitted by Kenyan law, Élan Climat &amp;
          Énergie&apos;s total liability to you shall not exceed the total value
          of the fees paid by you in connection with the specific project giving
          rise to the claim.
        </p>
        <p>
          We shall not be liable under any circumstances for indirect,
          consequential, or special losses, including but not limited to: loss
          of profits or revenue, loss of production, business interruption,
          spoilage of perishable goods due to system downtime, or loss of
          anticipated savings.
        </p>
        <p>
          Nothing in these terms limits or excludes our liability for death or
          personal injury caused by our proven negligence, fraud, or any other
          liability that cannot be excluded under applicable law.
        </p>
      </>
    ),
  },
  {
    id: "intellectual-property",
    num: "08",
    title: "Intellectual Property",
    summary: "Our content belongs to us.",
    content: (
      <>
        <p>
          All content on this website — including photographs, project imagery,
          system design schematics, technical documentation, copywriting, and
          the Élan Climat &amp; Énergie brand identity — is the exclusive
          property of Élan Climat &amp; Énergie Ltd or its licensed content
          partners and is protected under Kenyan and international intellectual
          property law.
        </p>
        <p>
          You may not reproduce, distribute, modify, or commercially exploit any
          part of our content without our express prior written consent.
        </p>
        <p>
          Technical drawings, energy audit reports, and system designs produced
          in the course of a project engagement remain the intellectual property
          of Élan Climat &amp; Énergie until all outstanding invoices have been
          paid in full.
        </p>
      </>
    ),
  },
  {
    id: "privacy",
    num: "09",
    title: "Privacy & Data",
    summary: "How we handle your information.",
    content: (
      <>
        <p>
          When you submit an enquiry, request a quotation, or interact with our
          website, we collect personal data including your name, contact
          details, property address, and project requirements. This data is used
          solely to respond to your enquiry and manage our project relationship
          with you.
        </p>
        <p>
          We do not sell, rent, or trade your personal data to third parties. We
          may share limited information with trusted sub-contractors or
          suppliers where necessary to fulfil a project.
        </p>
        <p>
          You have the right to request access to, correction of, or deletion of
          your personal data at any time by contacting us at{" "}
          <a
            href="mailto:privacy@elanclimat.co.ke"
            style={{
              color: "#5a7a59",
              textDecoration: "underline",
              textUnderlineOffset: 3,
            }}
          >
            privacy@elanclimat.co.ke
          </a>
          . See our full{" "}
          <Link
            href="/privacy-policy"
            style={{
              color: "#5a7a59",
              textDecoration: "underline",
              textUnderlineOffset: 3,
            }}
          >
            Privacy Policy
          </Link>{" "}
          for details.
        </p>
      </>
    ),
  },
  {
    id: "governing-law",
    num: "10",
    title: "Governing Law",
    summary: "Jurisdiction and dispute resolution.",
    content: (
      <>
        <p>
          These Terms of Service are governed by and construed in accordance
          with the laws of the Republic of Kenya. Any dispute arising out of or
          in connection with these terms shall be subject to the exclusive
          jurisdiction of the courts of Nairobi, Kenya.
        </p>
        <p>
          Before initiating formal legal proceedings, both parties agree to
          attempt resolution through good-faith negotiation for a minimum period
          of 30 days. Where negotiation fails, either party may request
          mediation through a mutually agreed mediator or a recognised Kenyan
          Alternative Dispute Resolution body.
        </p>
        <p>
          If any provision of these terms is found to be unlawful, void, or
          unenforceable, that provision shall be deemed severable and shall not
          affect the validity and enforceability of the remaining provisions.
        </p>
      </>
    ),
  },
];

// ─── Accordion item ───────────────────────────────────────────────────────────
function AccordionItem({
  section,
  isOpen,
  onToggle,
}: {
  section: Section;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      id={section.id}
      style={{ borderBottom: `1px solid ${C.rule}`, scrollMarginTop: 80 }}
    >
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          padding: "28px 0",
          cursor: "pointer",
          display: "grid",
          gridTemplateColumns: "56px 1fr auto",
          alignItems: "start",
          gap: 20,
          textAlign: "left",
        }}
      >
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.58rem",
            fontWeight: 500,
            letterSpacing: "0.18em",
            color: C.dim,
            paddingTop: 4,
          }}
        >
          {section.num}
        </span>

        <div>
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.15rem, 2vw, 1.45rem)",
              fontWeight: 400,
              color: C.charcoal,
              letterSpacing: "-0.01em",
              display: "block",
              marginBottom: 4,
            }}
          >
            {section.title}
          </span>
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.74rem",
              color: C.dim,
              fontWeight: 300,
              display: "block",
            }}
          >
            {section.summary}
          </span>
        </div>

        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            border: `1px solid ${isOpen ? "transparent" : C.rule}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            marginTop: 2,
            background: isOpen ? C.charcoal : "transparent",
            transition: "background 0.25s, border-color 0.25s",
          }}
        >
          <span
            style={{
              fontSize: "1rem",
              lineHeight: 1,
              color: isOpen ? "#ffffff" : C.charcoal,
              transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
              transform: isOpen ? "rotate(45deg)" : "none",
              display: "block",
            }}
          >
            +
          </span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div
              style={{ paddingLeft: 76, paddingBottom: 36, paddingRight: 40 }}
              className="tos-body"
            >
              {section.content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function TermsOfServicePage() {
  const [openId, setOpenId] = useState<string | null>("acceptance");
  const [activeId, setActiveId] = useState<string | null>("acceptance");
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id);
        });
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <main style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        .tos-inner { max-width: 1200px; margin: 0 auto; padding: 0 64px; }
        .tos-nav-inner { max-width: 1200px; margin: 0 auto; padding: 0 64px; display: flex; overflow-x: auto; scrollbar-width: none; }
        .tos-nav-inner::-webkit-scrollbar { display: none; }
        .tos-nav-link { font-family: 'DM Sans', sans-serif; font-size: 0.64rem; letter-spacing: 0.1em; text-transform: uppercase; text-decoration: none; padding: 14px 16px; white-space: nowrap; border-bottom: 2px solid transparent; transition: color 0.2s, border-color 0.2s; color: #b0b0a8; }
        .tos-nav-link.active { color: #1a1a18; border-bottom-color: #8fa68e; }
        .tos-nav-link:hover { color: #1a1a18; }

        .tos-layout { display: grid; grid-template-columns: 220px 1fr; gap: 80px; max-width: 1200px; margin: 0 auto; padding: 80px 64px 120px; align-items: start; }
        .tos-sidebar { position: sticky; top: 80px; display: flex; flex-direction: column; gap: 0; }
        .tos-sidebar-title { font-family: 'DM Sans', sans-serif; font-size: 0.58rem; letter-spacing: 0.2em; text-transform: uppercase; color: #b0b0a8; margin-bottom: 16px; display: block; }
        .tos-sidebar-link { font-family: 'DM Sans', sans-serif; font-size: 0.74rem; color: #b0b0a8; text-decoration: none; padding: 10px 0 10px 16px; border-left: 2px solid #e8e4dd; line-height: 1.4; display: block; transition: color 0.2s, border-color 0.2s; }
        .tos-sidebar-link:hover { color: #1a1a18; }
        .tos-sidebar-link.active { color: #1a1a18; border-left-color: #8fa68e; font-weight: 500; }

        .tos-body p { font-family: 'DM Sans', sans-serif; font-size: 0.875rem; color: #6b6b68; line-height: 1.9; margin: 0 0 1rem 0; font-weight: 300; }
        .tos-body p:last-child { margin-bottom: 0; }
        .tos-body strong { font-weight: 500; color: #1a1a18; }
        .tos-body em { font-style: italic; }

        .tos-meta-strip { display: flex; gap: 48px; flex-wrap: wrap; padding-top: 36px; margin-top: 36px; border-top: 1px solid rgba(255,255,255,0.1); }
        .tos-cta-grid { display: grid; grid-template-columns: 1fr 1fr; min-height: 280px; }

        @media (max-width: 1100px) {
          .tos-inner { padding: 0 32px; }
          .tos-nav-inner { padding: 0 32px; }
          .tos-layout { grid-template-columns: 1fr; padding: 56px 32px 80px; gap: 0; }
          .tos-sidebar { display: none; }
          .tos-cta-grid { grid-template-columns: 1fr; }
          .tos-hero-right { display: none; }
        }
        @media (max-width: 640px) {
          .tos-inner { padding: 0 24px; }
          .tos-nav-inner { padding: 0 24px; }
          .tos-layout { padding: 48px 24px 64px; }
          .tos-meta-strip { gap: 24px; }
        }
      `}</style>

      {/* HERO */}
      <div
        style={{
          position: "relative",
          height: "56vh",
          minHeight: 440,
          overflow: "hidden",
        }}
      >
        <Image
          src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1800&q=85"
          alt="Terms of service"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center 38%" }}
          quality={85}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(26,26,24,0.90) 0%, rgba(26,26,24,0.58) 55%, rgba(26,26,24,0.18) 100%)",
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
          <div className="tos-inner">
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
                  color: "#8fa68e",
                }}
              >
                Terms of Service
              </span>
            </div>
          </div>

          {/* Copy */}
          <div className="tos-inner">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 80,
                alignItems: "flex-end",
              }}
            >
              {/* Left */}
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
                    fontWeight: 400,
                    lineHeight: 1.05,
                    letterSpacing: "-0.025em",
                    color: "#ffffff",
                    margin: 0,
                  }}
                >
                  Terms of
                  <br />
                  <em
                    style={{
                      fontStyle: "italic",
                      fontWeight: 300,
                      color: "#c9a96e",
                    }}
                  >
                    Service
                  </em>
                </h1>
                <div className="tos-meta-strip">
                  {META.map(({ label, value }) => (
                    <div key={label}>
                      <span
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.58rem",
                          letterSpacing: "0.16em",
                          textTransform: "uppercase",
                          color: "rgba(255,255,255,0.28)",
                          display: "block",
                          marginBottom: 4,
                        }}
                      >
                        {label}
                      </span>
                      <span
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: "0.95rem",
                          color: "rgba(255,255,255,0.75)",
                          fontWeight: 400,
                        }}
                      >
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Right */}
              <motion.div
                className="tos-hero-right"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.12,
                }}
                style={{ display: "flex", flexDirection: "column", gap: 14 }}
              >
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
                  These terms govern your relationship with Élan Climat &amp;
                  Énergie. We have written them to be clear and honest — not to
                  obscure, but to set fair expectations on both sides.
                </p>
                <a
                  href="mailto:legal@elanclimat.co.ke"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.76rem",
                    color: "#c9a96e",
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

      {/* Gradient accent bar */}
      <div
        style={{
          height: 3,
          background:
            "linear-gradient(to right, #8fa68e 0%, #c9a96e 55%, #f9f7f4 100%)",
        }}
      />

      {/* STICKY TOP NAV */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          backgroundColor: "#f9f7f4",
          borderBottom: "1px solid #e8e4dd",
        }}
      >
        <nav className="tos-nav-inner" aria-label="Terms sections">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`tos-nav-link${activeId === s.id ? " active" : ""}`}
            >
              {s.num}. {s.title}
            </a>
          ))}
        </nav>
      </div>

      {/* BODY */}
      <section style={{ backgroundColor: "#f9f7f4" }}>
        <div className="tos-layout">
          {/* Sidebar */}
          <aside className="tos-sidebar">
            <span className="tos-sidebar-title">Contents</span>
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`tos-sidebar-link${activeId === s.id ? " active" : ""}`}
              >
                {s.num}. {s.title}
              </a>
            ))}
          </aside>

          {/* Content */}
          <div>
            {/* Preamble */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{
                borderLeft: "2px solid #e8e4dd",
                paddingLeft: 20,
                marginBottom: 48,
              }}
            >
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.82rem",
                  color: "#888580",
                  lineHeight: 1.8,
                  margin: 0,
                  fontStyle: "italic",
                  fontWeight: 300,
                }}
              >
                These Terms of Service (&quot;Terms&quot;) apply to all clients,
                prospective clients, and visitors engaging with Élan Climat
                &amp; Énergie Ltd, a company incorporated in Kenya. If you have
                questions before engaging our services, write to us at{" "}
                <a
                  href="mailto:legal@elanclimat.co.ke"
                  style={{
                    color: "#5a7a59",
                    textDecoration: "underline",
                    textUnderlineOffset: 3,
                  }}
                >
                  legal@elanclimat.co.ke
                </a>
                .
              </p>
            </motion.div>

            {/* Accordion */}
            <div style={{ borderTop: "1px solid #e8e4dd" }}>
              {SECTIONS.map((section) => (
                <AccordionItem
                  key={section.id}
                  section={section}
                  isOpen={openId === section.id}
                  onToggle={() => toggle(section.id)}
                />
              ))}
            </div>

            {/* Closing note */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{
                marginTop: 64,
                background: "#ede9e2",
                border: "1px solid #e8e4dd",
                padding: "36px 40px",
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              <Eyebrow text="A note from our team" />
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.2rem",
                  fontWeight: 400,
                  color: "#1a1a18",
                  lineHeight: 1.75,
                  margin: 0,
                  fontStyle: "italic",
                }}
              >
                &quot;We believe in long relationships — not fine print. These
                terms exist to protect both parties fairly. If anything here
                feels unclear or concerns you before a project, please reach
                out. We&apos;d rather have a conversation than a contract
                dispute.&quot;
              </p>
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.72rem",
                  color: "#888580",
                  fontWeight: 300,
                }}
              >
                — The Élan Climat &amp; Énergie Team
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section style={{ background: "#1a1a18" }}>
        <div className="tos-cta-grid">
          <div
            style={{
              padding: "72px 64px",
              borderRight: "1px solid rgba(255,255,255,0.07)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <Eyebrow text="Questions about these terms?" light />
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
                We&apos;d rather talk
                <br />
                <em
                  style={{
                    fontStyle: "italic",
                    color: "#c9a96e",
                    fontWeight: 300,
                  }}
                >
                  than dispute.
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
                }}
              >
                If anything in these terms is unclear before you engage us,
                reach out. We&apos;re a team of engineers, not lawyers —
                we&apos;ll give you a straight answer.
              </p>
            </div>
            <a
              href="mailto:legal@elanclimat.co.ke"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.78rem",
                color: "#c9a96e",
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

          <div
            style={{
              padding: "72px 64px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
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
                { label: "Home", href: "/", desc: "Return to our homepage" },
                {
                  label: "Privacy Policy",
                  href: "/privacy-policy",
                  desc: "How we handle your data",
                },
                {
                  label: "Contact Us",
                  href: "/contact",
                  desc: "Send us a direct message",
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
                    transition: "border-color 0.2s",
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
              Nairobi, Kenya · Est. 2018
            </div>
          </div>
        </div>
      </section>

      {/* Back to top */}
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
              background: "#1a1a18",
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
    </main>
  );
}
