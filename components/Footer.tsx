"use client";

// components/footer/Footer.tsx
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ElanLogo from "./ElanLogo";

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/elanclimat",
    icon: (
      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/%C3%A9lan-climat-%C3%A9nergie/?viewAsMember=true",
    icon: (
      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/elanclimat",
    icon: (
      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "call us",
    href: "tel:+254796952717",
    icon: (
      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
      </svg>
    ),
  },
  {
    label: "email us",
    href: "mailto:hello@elanclimat.co.ke",
    icon: (
      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
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
  { label: "Admin", href: "/admin" },
  { label: "Blog", href: "/blog" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

const CONTACT_INFO = [
  { label: "+254 796 952 717", href: "tel:+254796952717" },
  { label: "hello@elanclimat.co.ke", href: "mailto:hello@elanclimat.co.ke" },
  { label: "www.elanclimat.co.ke", href: "https://www.elanclimat.co.ke" },
];

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#1a1a18",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

        .footer-section-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.6rem;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #b0b0a8;
          display: block;
          margin-bottom: 20px;
        }

        .footer-link {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem;
          color: rgba(249,247,244,0.45);
          text-decoration: none;
          transition: color 0.2s ease;
          display: block;
          line-height: 1;
        }
        .footer-link:hover {
          color: #f9f7f4;
        }

        .footer-social-btn {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 1px solid rgba(249,247,244,0.12);
          background: none;
          color: rgba(249,247,244,0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
          flex-shrink: 0;
        }
        .footer-social-btn:hover {
          border-color: #8fa68e;
          color: #8fa68e;
          background: rgba(143,166,142,0.08);
        }

        .footer-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 9px 9px 9px 20px;
          border-radius: 9999px;
          border: 1px solid rgba(249,247,244,0.15);
          background: none;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(249,247,244,0.75);
          text-decoration: none;
          transition: all 0.25s ease;
        }
        .footer-cta-btn:hover {
          border-color: #8fa68e;
          color: #f9f7f4;
          background: rgba(143,166,142,0.06);
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
          flex-shrink: 0;
        }
        .footer-cta-btn:hover .footer-cta-icon {
          transform: rotate(45deg);
        }

        .footer-divider {
          border: none;
          border-top: 1px solid rgba(249,247,244,0.07);
          margin: 0;
        }

        @media (max-width: 768px) {
          .footer-main-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .footer-brand-col {
            grid-column: 1 / -1 !important;
          }
          .footer-top-row {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
        }

        @media (max-width: 480px) {
          .footer-main-grid {
            grid-template-columns: 1fr !important;
          }
          .footer-brand-col {
            grid-column: auto !important;
          }
        }
      `}</style>

      {/* ── Top CTA band ── */}
      <div
        className="footer-top-row"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "52px 64px 48px",
          gap: 32,
        }}
      >
        {/* Headline */}
        <div style={{ maxWidth: 480 }}>
          <span className="footer-section-label">Get in touch</span>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
              fontWeight: 400,
              color: "#f9f7f4",
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
              margin: 0,
            }}
          >
            Let's design your solution
          </h2>
        </div>

        {/* CTA */}
        <div style={{ flexShrink: 0 }}>
          <Link href="/contact" className="footer-cta-btn">
            Request a Call
            <span className="footer-cta-icon">
              <ArrowUpRight size={14} />
            </span>
          </Link>
        </div>
      </div>

      <hr className="footer-divider" />

      {/* ── Main link grid ── */}
      <div
        className="footer-main-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: "48px 40px",
          padding: "52px 64px",
        }}
      >
        {/* Brand column */}
        <div
          className="footer-brand-col"
          style={{ display: "flex", flexDirection: "column", gap: 24 }}
        >
          <div style={{ opacity: 0.9 }}>
            <ElanLogo size={130} />
          </div>

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.8rem",
              color: "rgba(249,247,244,0.38)",
              lineHeight: 1.8,
              maxWidth: 240,
              margin: 0,
            }}
          >
            Smart solutions for HVAC, solar, refrigeration, electrical, and
            elevator systems across Kenya.
          </p>

          {/* Socials */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {SOCIALS.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="footer-social-btn"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Company */}
        <div>
          <span className="footer-section-label">Company</span>
          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            {QUICK_LINKS.map(({ label, href }) => (
              <li key={label}>
                <Link href={href} className="footer-link">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <span className="footer-section-label">Services</span>
          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            {SERVICES.map((service) => (
              <li key={service}>
                <Link
                  href={`/services#${service.toLowerCase().replace(" ", "-")}`}
                  className="footer-link"
                >
                  {service}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <span className="footer-section-label">Contact</span>
          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            {CONTACT_INFO.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className="footer-link"
                  style={{ wordBreak: "break-all" }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <hr className="footer-divider" />

      {/* ── Bottom bar ── */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          padding: "20px 64px",
        }}
      >
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.7rem",
            color: "rgba(249,247,244,0.28)",
            margin: 0,
            letterSpacing: "0.02em",
          }}
        >
          © {`2018\u2013${new Date().getFullYear()}`} Élan Climat & Énergie. All
          rights reserved.
        </p>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.7rem",
            color: "rgba(249,247,244,0.28)",
            margin: 0,
            letterSpacing: "0.05em",
          }}
        >
          smart solutions.{" "}
          <span
            style={{
              color: "#8fa68e",
              fontWeight: 500,
            }}
          >
            sustainable future.
          </span>
        </p>
      </div>
    </footer>
  );
}
