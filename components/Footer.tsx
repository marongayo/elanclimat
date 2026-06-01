// components/footer/Footer.tsx
"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Phone, Mail, Globe } from "lucide-react";
import ElanLogo from "./ElanLogo";

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/elanclimat",
    icon: (
      <svg
        width="14"
        height="14"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/%C3%A9lan-climat-%C3%A9nergie/?viewAsMember=true",
    icon: (
      <svg
        width="14"
        height="14"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/elanclimat",
    icon: (
      <svg
        width="14"
        height="14"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "Call us",
    href: "tel:+254796952717",
    icon: (
      <svg
        width="14"
        height="14"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
      </svg>
    ),
  },
  {
    label: "Email us",
    href: "mailto:hello@elanclimat.co.ke",
    icon: (
      <svg
        width="14"
        height="14"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12 12.713l-11.99-7.713v13.999h23.98v-13.999l-11.99 7.713zm0-2.425l10.99-7.088h-21.98l10.99 7.088z" />
      </svg>
    ),
  },
];

const SERVICES = [
  "HVAC Systems",
  "Solar Installation",
  "Solar Water Heaters",
  "Cold Room Installation",
  "Elevator Installation",
  "Electrical",
  "Plumbing",
  "Maintenance & Repair",
];

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
  { label: "Admin", href: "/admin" },
];

const CONTACT_INFO = [
  {
    icon: <Phone size={14} />,
    label: "+254 796 952 717",
    href: "tel:+254796952717",
  },
  {
    icon: <Mail size={14} />,
    label: "hello@elanclimat.co.ke",
    href: "mailto:hello@elanclimat.co.ke",
  },
  {
    icon: <Globe size={14} />,
    label: "www.elanclimat.co.ke",
    href: "https://www.elanclimat.co.ke",
  },
];

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#1a1a18",
        fontFamily: "'DM Sans', sans-serif",
        paddingTop: "40px",
        marginTop: "60px",
      }}
    >
      <style>{`
        .footer-section-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          font-weight: 900;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #b0b0a8;
          display: block;
          margin-bottom: 20px;
        }

        .footer-link {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          font-weight: 400;
          line-height: 1;
          color: rgba(249,247,244,0.45);
          text-decoration: none;
          display: block;
          transition: color 0.2s ease;
          margin-bottom: 12px;
        }
        .footer-link:last-child { margin-bottom: 0; }
        .footer-link:hover { color: #f9f7f4; }

        .footer-brand-blurb {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          font-weight: 400;
          color: rgba(249,247,244,0.38);
          line-height: 1.8;
          max-width: 240px;
          margin: 0;
        }

        .footer-social-btn {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 1px solid rgba(249,247,244,0.12);
          color: rgba(249,247,244,0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          text-decoration: none;
          flex-shrink: 0;
        }
        .footer-social-btn:hover {
          border-color: #8fa68e;
          color: #8fa68e;
          background: rgba(143,166,142,0.08);
        }

        /* ── CTA card ── */
        .footer-cta-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 52px 64px 48px;
          gap: 32px;
          background: #ffffff;
          border-radius: 24px;
          border: 1px solid rgba(0,0,0,0.06);
          box-shadow: 0 20px 60px rgba(0,0,0,0.25);
          margin: 0 32px;
          margin-top: -120px;
          position: relative;
          z-index: 10;
        }

        .footer-cta-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.6rem;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(26,26,24,0.45);
          display: block;
          margin-bottom: 12px;
        }

        .footer-cta-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          font-weight: 400;
          color: #1a1a18;
          margin: 0;
          line-height: 1.15;
          letter-spacing: -0.015em;
        }

        .footer-cta-btn {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #1a1a18;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 9px 9px 9px 20px;
          border-radius: 9999px;
          border: 1px solid rgba(26,26,24,0.15);
          background: white;
          text-decoration: none;
          transition: all 0.25s ease;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .footer-cta-btn:hover {
          background: rgba(143,166,142,0.08);
          border-color: #8fa68e;
        }
        .footer-cta-icon {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #8fa68e;
          color: #1a1a18;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.25s ease;
        }
        .footer-cta-btn:hover .footer-cta-icon {
          transform: rotate(45deg);
        }

        /* ── Main grid ── */
        .footer-main-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 48px 40px;
          padding: 52px 64px;
        }

        /* ── Divider ── */
        .footer-divider {
          border: none;
          border-top: 1px solid rgba(249,247,244,0.07);
          margin: 0;
        }

        /* ── Bottom bar ── */
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          padding: 20px 64px;
        }
        .footer-bottom-text {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.7rem;
          font-weight: 400;
          color: rgba(249,247,244,0.28);
          margin: 0;
        }

        /* ── Responsive ── */

        /* Tablet: 768px – 1023px */
        @media (max-width: 1023px) {
          .footer-cta-card {
            padding: 40px 40px 36px;
            margin: 0 24px;
            margin-top: -100px;
          }
          .footer-main-grid {
            grid-template-columns: 1fr 1fr;
            gap: 40px 32px;
            padding: 44px 40px;
          }
          .footer-brand-col {
            grid-column: 1 / -1;
          }
          .footer-bottom {
            padding: 20px 40px;
          }
        }

        /* Mobile: ≤ 640px */
        @media (max-width: 640px) {
          .footer-cta-card {
            flex-direction: column;
            align-items: flex-start;
            padding: 32px 24px 28px;
            margin: 0 16px;
            margin-top: -80px;
            border-radius: 16px;
            gap: 24px;
          }
          .footer-main-grid {
            grid-template-columns: 1fr 1fr;
            gap: 36px 24px;
            padding: 40px 24px;
          }
          .footer-brand-col {
            grid-column: 1 / -1;
          }
          .footer-services-col {
            grid-column: 1 / -1;
          }
          .footer-bottom {
            padding: 18px 24px;
            flex-direction: column;
            gap: 6px;
          }
          .footer-bottom-text {
            font-size: 0.68rem;
          }
        }

        /* Very small: ≤ 380px */
        @media (max-width: 380px) {
          .footer-main-grid {
            grid-template-columns: 1fr;
            padding: 36px 20px;
          }
          .footer-services-col {
            grid-column: auto;
          }
          .footer-bottom {
            padding: 16px 20px;
          }
          .footer-cta-card {
            margin: 0 12px;
            margin-top: -60px;
          }
        }
      `}</style>

      {/* ── CTA CARD ── */}
      <div className="footer-cta-card">
        <div style={{ maxWidth: 480 }}>
          <span className="footer-cta-eyebrow">Get in touch</span>
          <h2 className="footer-cta-heading">
            Let&apos;s design your solution
          </h2>
        </div>

        <Link href="/contact" className="footer-cta-btn">
          Request a Call
          <span className="footer-cta-icon">
            <ArrowUpRight size={14} strokeWidth={2} aria-hidden="true" />
          </span>
        </Link>
      </div>

      <hr className="footer-divider" />

      {/* ── MAIN GRID ── */}
      <div className="footer-main-grid">
        {/* Brand column */}
        <div
          className="footer-brand-col"
          style={{ display: "flex", flexDirection: "column", gap: 24 }}
        >
          <Link href="/">
            <ElanLogo size={130} />
          </Link>

          <p className="footer-brand-blurb">
            Smart solutions for HVAC, solar, refrigeration, electrical, and
            elevator systems across Kenya.
          </p>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="footer-social-btn"
                aria-label={s.label}
                rel="noopener noreferrer"
                target={s.href.startsWith("http") ? "_blank" : undefined}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Company links */}
        <div>
          <span className="footer-section-label">Company</span>
          {QUICK_LINKS.map((l) => (
            <Link key={l.label} href={l.href} className="footer-link">
              {l.label}
            </Link>
          ))}
        </div>

        {/* Services links */}
        <div className="footer-services-col">
          <span className="footer-section-label">Services</span>
          {SERVICES.map((s) => (
            <Link
              key={s}
              href={`/services#${s.toLowerCase().replace(/\s+/g, "-")}`}
              className="footer-link"
            >
              {s}
            </Link>
          ))}
        </div>

        {/* Contact */}
        <div>
          <span className="footer-section-label">Contact</span>
          {CONTACT_INFO.map((c) => (
            <a
              key={c.label}
              href={c.href}
              className="footer-link"
              style={{
                wordBreak: "break-word",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              {c.icon} {c.label}
            </a>
          ))}
        </div>
      </div>

      <hr className="footer-divider" />

      {/* ── BOTTOM BAR ── */}
      <div className="footer-bottom">
        <p className="footer-bottom-text">
          © {`2018 - ${new Date().getFullYear()} `} Élan Climat &amp; Énergie |
          All rights reserved.
        </p>
        <p className="footer-bottom-text">
          smart solutions.{" "}
          <span style={{ color: "#8fa68e" }}>sustainable future.</span>
        </p>
      </div>
    </footer>
  );
}
