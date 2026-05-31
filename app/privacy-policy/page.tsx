"use client";
import Footer from "@/components/Footer";

const LAST_UPDATED = "30 May 2025";

const SECTIONS = [
  {
    index: "01",
    title: "Who we are",
    content: `Élan Climat & Énergie is a Nairobi-based energy solutions company specialising in HVAC systems, solar PV installations, and battery storage. Our registered address is Nairobi, Kenya. When this policy refers to "Élan", "we", "us", or "our", it means Élan Climat & Énergie.

You can reach us at any time at privacy@elanclimat.co.ke.`,
  },
  {
    index: "02",
    title: "What information we collect",
    content: `We collect only what we need to serve you well.

Information you give us directly — when you fill in a contact or quote request form, send us an email, or apply for a job, we receive your name, email address, phone number, and any details you choose to share.

Information collected automatically — when you browse our website, our hosting infrastructure records your IP address, browser type, pages visited, and time spent. We use this only in aggregate to understand how the site is used.

Information from third parties — if you reach us through a referral partner or social platform, we may receive limited contact details they have permission to share.

We do not collect sensitive personal data such as identity documents, financial account details, or health information unless you explicitly provide them as part of a project brief.`,
  },
  {
    index: "03",
    title: "How we use your information",
    content: `We use your information to:

— Respond to enquiries and provide quotations for our services
— Process and manage installation projects you commission
— Send you updates directly relevant to your project or order
— Review and respond to job applications
— Improve our website and understand which content is useful
— Meet our legal and regulatory obligations in Kenya

We do not use your data for automated decision-making or profiling.`,
  },
  {
    index: "04",
    title: "Legal basis for processing",
    content: `We process your personal data on the following legal bases under the Kenya Data Protection Act, 2019:

Contractual necessity — when processing is required to fulfil a service agreement or take pre-contractual steps at your request.

Legitimate interests — for website analytics and internal business improvement, where our interest does not override your rights.

Consent — for any marketing communications, which we will only send if you have explicitly opted in. You may withdraw consent at any time.

Legal obligation — where we are required to retain or disclose information by Kenyan law or regulation.`,
  },
  {
    index: "05",
    title: "Who we share your data with",
    content: `We do not sell, rent, or trade your personal data. We share it only where necessary:

Service providers — we work with carefully selected suppliers (hosting, email delivery, accounting software) who process data on our behalf under strict confidentiality agreements.

Professional advisers — our lawyers and accountants may access data where legally required.

Regulatory authorities — we will disclose data if required by law, court order, or a competent Kenyan authority.

Business transfers — if Élan Climat & Énergie is acquired or merges with another entity, your data may transfer as part of that transaction, subject to the same protections described here.

We do not transfer your data outside Kenya unless the receiving country provides an equivalent level of data protection or appropriate safeguards are in place.`,
  },
  {
    index: "06",
    title: "How long we keep your data",
    content: `We retain your data only for as long as necessary:

Enquiries and quotes — 2 years from last contact, unless a project follows.

Project records — 7 years from project completion, for warranty and legal purposes.

Job applications — 6 months from the closing date, or 1 year if you consented to being considered for future roles.

Website analytics — aggregated data only; no identifiable records retained beyond 90 days.

After the applicable retention period, data is securely deleted or anonymised.`,
  },
  {
    index: "07",
    title: "Your rights",
    content: `Under the Kenya Data Protection Act, 2019, you have the right to:

— Access the personal data we hold about you
— Correct inaccurate or incomplete data
— Request erasure of your data (subject to legal retention obligations)
— Object to or restrict certain types of processing
— Withdraw consent where processing is based on consent
— Lodge a complaint with the Office of the Data Protection Commissioner (ODPC)

To exercise any of these rights, write to us at privacy@elanclimat.co.ke. We will respond within 21 days.`,
  },
  {
    index: "08",
    title: "Cookies",
    content: `Our website uses a small number of cookies:

Essential cookies — required for the site to function (session management, security). These cannot be disabled.

Analytics cookies — we use privacy-respecting, aggregated analytics to understand page performance. No cross-site tracking. You can disable these in your browser settings at any time.

We do not use advertising or third-party tracking cookies.`,
  },
  {
    index: "09",
    title: "Security",
    content: `We take reasonable and appropriate technical and organisational measures to protect your data against unauthorised access, loss, or disclosure. Our website is served over HTTPS. Access to personal data within our team is limited to those who need it.

No transmission over the internet is completely secure. If you have concerns about a specific communication, please contact us directly.`,
  },
  {
    index: "10",
    title: "Changes to this policy",
    content: `We may update this policy from time to time. When we do, we will revise the "Last updated" date at the top of this page. For material changes, we will notify affected individuals directly where we have contact details.

Continued use of our website after an update constitutes acceptance of the revised policy.`,
  },
  {
    index: "11",
    title: "Contact us",
    content: `For any questions, requests, or concerns about this privacy policy or how we handle your data, please contact:

Élan Climat & Énergie
Email: privacy@elanclimat.co.ke
Location: Nairobi, Kenya

If you are unsatisfied with our response, you have the right to contact the Office of the Data Protection Commissioner (ODPC) at www.odpc.go.ke.`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main style={{ background: "#f9f7f4", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .pp-root { font-family: 'DM Sans', sans-serif; }

        /* ── HERO ── */
        .pp-hero {
          background: #1a1a18;
          padding: 80px 64px 72px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: end;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .pp-eyebrow {
          display: flex; align-items: center; gap: 12px; margin-bottom: 40px;
        }
        .pp-eyebrow-line { width: 28px; height: 1px; background: rgba(255,255,255,0.3); }
        .pp-eyebrow-text {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.6rem; letter-spacing: 0.22em;
          text-transform: uppercase; color: rgba(255,255,255,0.35);
        }
        .pp-h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.6rem, 5vw, 4rem);
          font-weight: 300;
          line-height: 1.05;
          letter-spacing: -0.025em;
          color: #ffffff;
        }
        .pp-h1 em {
          font-style: italic;
          font-weight: 300;
          color: #c9a96e;
        }
        .pp-hero-right {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          gap: 20px;
          padding-bottom: 4px;
        }
        .pp-updated {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.68rem;
          color: rgba(255,255,255,0.28);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .pp-intro {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.84rem;
          color: rgba(255,255,255,0.45);
          line-height: 1.85;
          max-width: 380px;
        }
        .pp-contact-link {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.76rem;
          color: #c9a96e;
          text-decoration: none;
          border-bottom: 1px solid rgba(201,169,110,0.3);
          padding-bottom: 2px;
          display: inline-block;
          letter-spacing: 0.04em;
        }

        /* ── TOC ── */
        .pp-toc-band {
          background: #ffffff;
          border-bottom: 1px solid #e8e4dd;
          padding: 40px 64px;
          display: flex;
          flex-wrap: wrap;
          gap: 6px 0;
          align-items: center;
        }
        .pp-toc-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.6rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #b0b0a8;
          margin-right: 24px;
          white-space: nowrap;
        }
        .pp-toc-item {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.7rem;
          color: #888580;
          text-decoration: none;
          padding: 5px 12px;
          border: 1px solid #e8e4dd;
          margin-right: 6px;
          margin-bottom: 6px;
          transition: all 0.2s;
          white-space: nowrap;
        }
        .pp-toc-item:hover {
          background: #1a1a18;
          color: #ffffff;
          border-color: #1a1a18;
        }

        /* ── BODY ── */
        .pp-body {
          max-width: 1100px;
          margin: 0 auto;
          padding: 80px 64px 120px;
        }

        .pp-section {
          display: grid;
          grid-template-columns: 120px 1fr;
          gap: 48px;
          padding: 52px 0;
          border-bottom: 1px solid #e8e4dd;
        }
        .pp-section:first-child { padding-top: 0; }

        .pp-section-left {
          padding-top: 4px;
        }
        .pp-section-index {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.55rem;
          letter-spacing: 0.16em;
          color: #c8c4bc;
          display: block;
          margin-bottom: 10px;
        }
        .pp-section-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          font-weight: 400;
          color: #1a1a18;
          line-height: 1.2;
          letter-spacing: -0.01em;
        }

        .pp-section-content {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.84rem;
          color: #6b6b68;
          line-height: 1.9;
          white-space: pre-line;
        }

        .pp-section-content a {
          color: #1a1a18;
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        /* ── FOOTER BAND ── */
        .pp-footer {
          background: #1a1a18;
          padding: 64px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: end;
        }
        .pp-footer-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.4rem, 2.5vw, 1.9rem);
          font-weight: 300;
          color: #fff;
          line-height: 1.2;
          letter-spacing: -0.02em;
          margin-bottom: 14px;
        }
        .pp-footer-heading em { font-style: italic; color: #c9a96e; }
        .pp-footer-body {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.76rem;
          color: rgba(255,255,255,0.35);
          line-height: 1.8;
        }
        .pp-footer-right {
          display: flex;
          flex-direction: column;
          gap: 10px;
          align-items: flex-end;
        }
        .pp-footer-meta {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.6rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.18);
          text-align: right;
        }
        .pp-footer-email {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem;
          color: #c9a96e;
          text-decoration: none;
          border-bottom: 1px solid rgba(201,169,110,0.3);
          padding-bottom: 2px;
          letter-spacing: 0.04em;
        }

        @media (max-width: 860px) {
          .pp-hero { grid-template-columns: 1fr; padding: 56px 28px 52px; gap: 36px; }
          .pp-toc-band { padding: 28px 28px; }
          .pp-body { padding: 56px 28px 80px; }
          .pp-section { grid-template-columns: 1fr; gap: 16px; }
          .pp-section-left { display: flex; align-items: baseline; gap: 12px; }
          .pp-footer { grid-template-columns: 1fr; padding: 48px 28px; gap: 40px; }
          .pp-footer-right { align-items: flex-start; }
        }
      `}</style>

      <div className="pp-root">
        {/* ── HERO ── */}
        <section className="pp-hero">
          <div>
            <div className="pp-eyebrow">
              <div className="pp-eyebrow-line" />
              <span className="pp-eyebrow-text">Legal</span>
            </div>
            <h1 className="pp-h1">
              Privacy
              <br />
              <em>Policy</em>
            </h1>
          </div>
          <div className="pp-hero-right">
            <span className="pp-updated">Last updated — {LAST_UPDATED}</span>
            <p className="pp-intro">
              We keep this simple: we collect only what we need, we hold it only
              as long as necessary, and we never sell it. This policy explains
              exactly how we handle your personal data in compliance with the
              Kenya Data Protection Act, 2019.
            </p>
            <a
              href="mailto:privacy@elanclimat.co.ke"
              className="pp-contact-link"
            >
              privacy@elanclimat.co.ke
            </a>
          </div>
        </section>

        {/* ── TABLE OF CONTENTS ── */}
        <nav className="pp-toc-band" aria-label="Table of contents">
          <span className="pp-toc-label">Contents</span>
          {SECTIONS.map((s) => (
            <a
              key={s.index}
              href={`#section-${s.index}`}
              className="pp-toc-item"
            >
              {s.index}. {s.title}
            </a>
          ))}
        </nav>

        {/* ── SECTIONS ── */}
        <div className="pp-body">
          {SECTIONS.map((s) => (
            <div key={s.index} id={`section-${s.index}`} className="pp-section">
              <div className="pp-section-left">
                <span className="pp-section-index">{s.index}</span>
                <h2 className="pp-section-title">{s.title}</h2>
              </div>
              <div className="pp-section-content">{s.content}</div>
            </div>
          ))}
        </div>

        {/* ── FOOTER ── */}
        <section className="pp-footer">
          <div>
            <h2 className="pp-footer-heading">
              Questions about
              <br />
              <em>your data?</em>
            </h2>
            <p className="pp-footer-body">
              We're happy to clarify anything in this policy or tell you exactly
              what data we hold about you. Write to us and we'll respond within
              21 days.
            </p>
          </div>
          <div className="pp-footer-right">
            <span className="pp-footer-meta">
              Élan Climat & Énergie · Nairobi, Kenya
            </span>
            <a
              href="mailto:privacy@elanclimat.co.ke"
              className="pp-footer-email"
            >
              privacy@elanclimat.co.ke
            </a>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
