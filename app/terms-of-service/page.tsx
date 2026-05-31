// app/terms/page.tsx  (or pages/terms.tsx — works for both App Router and Pages Router)

"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowUp } from "lucide-react";
import Footer from "@/components/Footer";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Section {
  id: string;
  num: string;
  title: string;
  summary: string;
  content: React.ReactNode;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
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
          we do, we will update the "Last Revised" date at the top of this page.
          Continued use of our services following any such change constitutes
          your acceptance of the new terms.
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
          availability, and lead times are subject to change without notice,
          particularly in light of fluctuating import duties and foreign
          exchange rates.
        </p>
        <p>
          A project becomes binding only upon the client's written acceptance of
          a quotation <em>and</em> the receipt of the agreed deposit payment
          (typically 50% of the total project value). Verbal confirmations,
          WhatsApp messages, or email replies of intent do not constitute a
          binding agreement unless accompanied by payment.
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
          guidelines, and manufacturer specifications. Any client-requested
          deviation from recommended practice must be confirmed in writing and
          may void applicable warranties.
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
          manufacturer's warranty, the terms and duration of which vary by brand
          and product line and are communicated at point of sale. Élan Climat
          &amp; Énergie acts as an authorised reseller or distributor and will
          facilitate warranty claims on your behalf but does not independently
          extend or guarantee manufacturer warranty obligations.
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
          imported to specification. This will be clearly communicated before
          any deposit is requested.
        </p>
        <p>
          Where a project is cancelled by the client after work has commenced,
          Élan Climat &amp; Énergie reserves the right to invoice for all work
          completed to that point, including labour, materials consumed, and any
          costs already committed to third-party suppliers. Any balance owed
          after offsetting deposits will be due within 14 days of the
          cancellation notice.
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
          Énergie's total liability to you — whether in contract, tort
          (including negligence), breach of statutory duty, or otherwise — shall
          not exceed the total value of the fees paid by you in connection with
          the specific project giving rise to the claim.
        </p>
        <p>
          We shall not be liable under any circumstances for indirect,
          consequential, or special losses, including but not limited to: loss
          of profits or revenue, loss of production, business interruption,
          spoilage of perishable goods due to system downtime, loss of
          anticipated savings, or any reputational damage.
        </p>
        <p>
          Nothing in these terms limits or excludes our liability for death or
          personal injury caused by our proven negligence, fraud or fraudulent
          misrepresentation, or any other liability that cannot be excluded
          under applicable law.
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
          All content on this website — including but not limited to
          photographs, project imagery, system design schematics, technical
          documentation, copywriting, and the Élan Climat &amp; Énergie brand
          identity — is the exclusive property of Élan Climat &amp; Énergie Ltd
          or its licensed content partners and is protected under Kenyan and
          international intellectual property law.
        </p>
        <p>
          You may not reproduce, distribute, modify, create derivative works
          from, or commercially exploit any part of our content without our
          express prior written consent. Brief citation for journalistic or
          educational purposes is permitted, provided clear attribution is
          given.
        </p>
        <p>
          Technical drawings, energy audit reports, and system designs produced
          by Élan Climat &amp; Énergie in the course of a project engagement
          remain the intellectual property of Élan Climat &amp; Énergie until
          all outstanding invoices relating to that project have been paid in
          full.
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
          solely to respond to your enquiry, manage our project relationship
          with you, and — with your consent — send you relevant product or
          service updates.
        </p>
        <p>
          We do not sell, rent, or trade your personal data to third parties. We
          may share limited information with trusted sub-contractors or
          suppliers where necessary to fulfil a project, and only to the extent
          required.
        </p>
        <p>
          You have the right to request access to, correction of, or deletion of
          your personal data at any time by contacting us at{" "}
          <a
            href="mailto:privacy@elanclimatenergy.com"
            style={{ color: "var(--sage-dark)", textDecoration: "underline" }}
          >
            privacy@elanclimatenergy.com
          </a>
          . We will respond within 14 working days.
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
          in connection with these terms, including any question regarding their
          existence, validity, or termination, shall be subject to the exclusive
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

// ─── Accordion Item ───────────────────────────────────────────────────────────
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
      style={{
        borderBottom: "1px solid #e8e8e4",
      }}
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
          gridTemplateColumns: "48px 1fr auto",
          alignItems: "start",
          gap: 20,
          textAlign: "left",
        }}
      >
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.6rem",
            fontWeight: 500,
            letterSpacing: "0.18em",
            color: "#b0b0a8",
            paddingTop: 4,
          }}
        >
          {section.num}
        </span>

        <div>
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
              fontWeight: 500,
              color: isOpen ? "#1a1a18" : "#1a1a18",
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
              fontSize: "0.75rem",
              color: "#b0b0a8",
              display: "block",
            }}
          >
            {section.summary}
          </span>
        </div>

        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            border: "1px solid #e8e8e4",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            marginTop: 2,
            background: isOpen ? "#1a1a18" : "transparent",
            transition: "background 0.25s",
          }}
        >
          <ChevronDown
            size={13}
            color={isOpen ? "#ffffff" : "#1a1a18"}
            style={{
              transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
              transform: isOpen ? "rotate(180deg)" : "none",
            }}
          />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div
              style={{
                paddingLeft: 68,
                paddingBottom: 32,
                paddingRight: 48,
              }}
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

// ─── Table of Contents ────────────────────────────────────────────────────────
function TableOfContents({
  sections,
  activeId,
}: {
  sections: Section[];
  activeId: string | null;
}) {
  return (
    <nav
      style={{
        position: "sticky",
        top: 80,
        paddingTop: 8,
      }}
    >
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.6rem",
          fontWeight: 500,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#b0b0a8",
          display: "block",
          marginBottom: 20,
        }}
      >
        Contents
      </span>
      {sections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          onClick={(e) => {
            e.preventDefault();
            document
              .getElementById(s.id)
              ?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 10,
            padding: "6px 0",
            textDecoration: "none",
            borderLeft: `2px solid ${activeId === s.id ? "#1a1a18" : "transparent"}`,
            paddingLeft: 12,
            marginLeft: -14,
            transition: "border-color 0.2s",
          }}
        >
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.58rem",
              color: "#c8c8c4",
              minWidth: 18,
              letterSpacing: "0.06em",
            }}
          >
            {s.num}
          </span>
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.75rem",
              color: activeId === s.id ? "#1a1a18" : "#888580",
              fontWeight: activeId === s.id ? 500 : 400,
              transition: "color 0.2s, font-weight 0.2s",
              lineHeight: 1.4,
            }}
          >
            {s.title}
          </span>
        </a>
      ))}
    </nav>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function TermsOfService() {
  const [openId, setOpenId] = useState<string | null>("acceptance");
  const [activeId, setActiveId] = useState<string | null>("acceptance");
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Back-to-top visibility
  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Intersection observer for ToC highlight
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(s.id);
        },
        { rootMargin: "-20% 0px -70% 0px" },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <main
      style={{
        background: "var(--warm-white, #f9f7f4)",
        minHeight: "100vh",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

        :root {
          --warm-white: #f9f7f4;
          --off-white: #ede9e2;
          --charcoal: #1a1a18;
          --sage: #8fa68e;
          --sage-dark: #5a7a59;
          --accent: #c9a96e;
          --text-muted: #888580;
        }

        .tos-body p {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          color: #6b6b68;
          line-height: 1.85;
          margin: 0 0 1rem 0;
        }

        .tos-body p:last-child {
          margin-bottom: 0;
        }

        .tos-body strong {
          font-weight: 500;
          color: #1a1a18;
        }

        .tos-body em {
          font-style: italic;
        }

        .tos-layout {
          display: grid;
          grid-template-columns: 220px 1fr;
          gap: 80px;
          max-width: 1020px;
          margin: 0 auto;
          padding: 64px 40px 120px;
        }

        .tos-toc {
          display: block;
        }

        @media (max-width: 860px) {
          .tos-layout {
            grid-template-columns: 1fr;
            gap: 0;
            padding: 40px 28px 80px;
          }
          .tos-toc { display: none; }
          .tos-body { padding-left: 0 !important; padding-right: 0 !important; }
        }

        .hero-rule {
          width: 32px;
          height: 1px;
          background: #1a1a18;
          display: inline-block;
          margin-right: 12px;
          vertical-align: middle;
        }
      `}</style>

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section
        style={{
          background: "#1a1a18",
          padding: "80px 40px 72px",
        }}
      >
        <div style={{ maxWidth: 1020, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 24,
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 24,
                height: 1,
                background: "rgba(255,255,255,0.5)",
              }}
            />
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.62rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              Legal
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
              fontWeight: 400,
              color: "#ffffff",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              margin: "0 0 20px",
              maxWidth: 560,
            }}
          >
            Terms of Service
          </h1>

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.82rem",
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.7,
              maxWidth: 480,
              margin: "0 0 40px",
            }}
          >
            These terms govern your relationship with Élan Climat &amp; Énergie.
            We've written them to be clear and human — not to obscure, but to be
            honest about how we work.
          </p>

          {/* Meta strip */}
          <div
            style={{
              display: "flex",
              gap: 40,
              flexWrap: "wrap",
            }}
          >
            {[
              { label: "Entity", value: "Élan Climat & Énergie Ltd" },
              { label: "Jurisdiction", value: "Republic of Kenya" },
              { label: "Last Revised", value: "31 May 2025" },
              { label: "Sections", value: "10" },
            ].map(({ label, value }) => (
              <div key={label}>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.58rem",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.3)",
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
                    color: "rgba(255,255,255,0.8)",
                    fontWeight: 400,
                  }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Thin accent bar ──────────────────────────────────────────────────── */}
      <div
        style={{
          height: 3,
          background: `linear-gradient(to right, #8fa68e 0%, #c9a96e 60%, #f9f7f4 100%)`,
        }}
      />

      {/* ── Body ─────────────────────────────────────────────────────────────── */}
      <div className="tos-layout">
        {/* Left: sticky ToC */}
        <aside className="tos-toc">
          <TableOfContents sections={SECTIONS} activeId={activeId} />
        </aside>

        {/* Right: accordion */}
        <div>
          {/* Preamble */}
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.82rem",
              color: "#888580",
              lineHeight: 1.8,
              borderLeft: "2px solid #e8e8e4",
              paddingLeft: 20,
              marginBottom: 48,
              fontStyle: "italic",
            }}
          >
            These Terms of Service ("Terms") apply to all clients, prospective
            clients, and visitors engaging with Élan Climat &amp; Énergie Ltd, a
            company incorporated in Kenya. If you have any questions about these
            terms before engaging our services, please write to us at{" "}
            <a
              href="mailto:legal@elanclimat.co.ke"
              style={{ color: "var(--sage-dark)", textDecoration: "underline" }}
            >
              legal@elanclimat.co.ke
            </a>
            .
          </p>

          {/* Accordion */}
          <div style={{ borderTop: "1px solid #e8e8e4" }}>
            {SECTIONS.map((section) => (
              <AccordionItem
                key={section.id}
                section={section}
                isOpen={openId === section.id}
                onToggle={() => toggle(section.id)}
              />
            ))}
          </div>

          {/* Footer note */}
          <div
            style={{
              marginTop: 64,
              padding: "32px",
              background: "#f2f1ee",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.6rem",
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#b0b0a8",
              }}
            >
              A Note from Our Team
            </span>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.1rem",
                fontWeight: 400,
                color: "#1a1a18",
                lineHeight: 1.7,
                margin: 0,
                fontStyle: "italic",
              }}
            >
              "We believe in long relationships — not fine print. These terms
              exist to protect both parties fairly. If anything here feels
              unclear or concerns you before a project, please reach out. We'd
              rather have a conversation than a contract dispute."
            </p>
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.72rem",
                color: "#888580",
              }}
            >
              — The Élan Climat &amp; Énergie Team
            </span>
          </div>
        </div>
      </div>

      {/* ── Back to top ──────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showBackToTop && (
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
      <Footer />
    </main>
  );
}
