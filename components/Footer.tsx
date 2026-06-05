"use client";

import Link from "next/link";
import Script from "next/script";
import { ArrowUpRight, Phone, Mail, Globe, MapPin } from "lucide-react";
import ElanLogo from "./ElanLogo";

// ---------------------------------------------------------------------------
// JSON-LD — LocalBusiness + Organisation schema
// Googlebot reads this on every page that renders the footer.
// ---------------------------------------------------------------------------
const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id": "https://www.elanclimat.co.ke/#business",
      name: "Élan Climat & Énergie",
      alternateName: "Elan Climat Kenya",
      url: "https://www.elanclimat.co.ke",
      logo: "https://www.elanclimat.co.ke/images/logo.png",
      image: "https://www.elanclimat.co.ke/images/og-image.jpg",
      description:
        "Kenya's trusted HVAC, solar, refrigeration, electrical, and elevator engineering company. Serving Nairobi, Mombasa, Kisumu, Eldoret, Nakuru, Nyeri, and across East Africa since 2018.",
      foundingDate: "2018",
      telephone: "+254796952717",
      email: "hello@elanclimat.co.ke",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Nairobi",
        addressLocality: "Nairobi",
        addressRegion: "Nairobi County",
        addressCountry: "KE",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: -1.286389,
        longitude: 36.817223,
      },
      areaServed: [
        { "@type": "City", name: "Nairobi" },
        { "@type": "City", name: "Mombasa" },
        { "@type": "City", name: "Kisumu" },
        { "@type": "City", name: "Eldoret" },
        { "@type": "City", name: "Nakuru" },
        { "@type": "City", name: "Nyeri" },
        { "@type": "Country", name: "Uganda" },
        { "@type": "Country", name: "Tanzania" },
        { "@type": "Country", name: "Rwanda" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "HVAC & Energy Engineering Services Kenya",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "HVAC Installation Kenya",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Solar Panel Installation Kenya",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Solar Water Heater Installation",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Cold Room Installation Kenya",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Elevator Installation Nairobi",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Electrical Engineering Kenya",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Plumbing Services Kenya",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "HVAC Maintenance & Repair",
            },
          },
        ],
      },
      sameAs: [
        "https://www.instagram.com/elanclimat",
        "https://www.linkedin.com/company/%C3%A9lan-climat-%C3%A9nergie",
        "https://www.facebook.com/elanclimat",
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------
const SOCIALS = [
  {
    label: "Follow Élan Climat on Instagram",
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
    label: "Connect with Élan Climat on LinkedIn",
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
    label: "Follow Élan Climat on Facebook",
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
];

// Services with keyword-rich labels AND descriptive hrefs
const SERVICES = [
  { label: "HVAC Installation Kenya", href: "/services#hvac-systems" },
  { label: "HVAC", href: "/services#hvac-systems" },
  { label: "HVAC installation", href: "/services#hvac-systems" },
  { label: "Solar Panel Installation", href: "/services#solar-installation" },
  { label: "Solar Water Heaters", href: "/services#solar-water-heaters" },
  { label: "Cold Room Installation", href: "/services#cold-room-installation" },
  {
    label: "Elevator Installation Nairobi",
    href: "/services#elevator-installation",
  },
  { label: "Electrical Engineering", href: "/services#electrical" },
  { label: "Plumbing Services", href: "/services#plumbing" },
  { label: "HVAC Maintenance & Repair", href: "/services#maintenance-repair" },
];

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Careers in Kenya", href: "/careers" },
  { label: "Contact Us", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      {/*
       * JSON-LD injected globally — parsed by Googlebot on every page.
       * Covers LocalBusiness NAP, areaServed, and service catalogue.
       */}
      <Script
        id="footer-local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }}
        strategy="afterInteractive"
      />

      <footer
        aria-label="Élan Climat & Énergie — HVAC and Energy Engineering Kenya"
        style={{
          backgroundColor: "#1a1a18",
          fontFamily: "'DM Sans', sans-serif",
          paddingTop: "40px",
          marginTop: "60px",
        }}
      >
        <style>{`
          /* ── Typography ── */
          .f-label {
            font-family: 'DM Sans', sans-serif;
            font-size: 0.62rem;
            font-weight: 700;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            color: #8fa68e;
            display: block;
            margin-bottom: 20px;
          }
          .f-link {
            font-family: 'DM Sans', sans-serif;
            font-size: 0.8rem;
            font-weight: 400;
            line-height: 1;
            color: rgba(249,247,244,0.42);
            text-decoration: none;
            display: block;
            margin-bottom: 13px;
            transition: color 0.2s ease;
          }
          .f-link:last-child { margin-bottom: 0; }
          .f-link:hover { color: #f9f7f4; }

          .f-blurb {
            font-family: 'DM Sans', sans-serif;
            font-size: 0.8rem;
            color: rgba(249,247,244,0.36);
            line-height: 1.85;
            margin: 0;
            max-width: 260px;
          }

          /* ── Social buttons ── */
          .f-social {
            width: 34px;
            height: 34px;
            border-radius: 50%;
            border: 1px solid rgba(249,247,244,0.1);
            color: rgba(249,247,244,0.32);
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            transition: all 0.2s ease;
            flex-shrink: 0;
          }
          .f-social:hover {
            border-color: #8fa68e;
            color: #8fa68e;
            background: rgba(143,166,142,0.08);
          }

          /* ── CTA card ── */
          .f-cta-card {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 32px;
            padding: 52px 64px 48px;
            background: #ffffff;
            border-radius: 24px;
            border: 1px solid rgba(0,0,0,0.06);
            box-shadow: 0 20px 60px rgba(0,0,0,0.28);
            margin: 0 32px;
            margin-top: -120px;
            position: relative;
            z-index: 10;
          }
          .f-cta-eyebrow {
            font-family: 'DM Sans', sans-serif;
            font-size: 0.6rem;
            font-weight: 500;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            color: rgba(26,26,24,0.4);
            display: block;
            margin-bottom: 12px;
          }
          /*
           * SEO: h2 now names the service + geography so it carries
           * keyword weight rather than generic "Let's design your solution".
           */
          .f-cta-heading {
            font-family: 'Cormorant Garamond', serif;
            font-size: clamp(1.8rem, 3.5vw, 2.8rem);
            font-weight: 400;
            color: #1a1a18;
            margin: 0;
            line-height: 1.15;
            letter-spacing: -0.015em;
          }
          .f-cta-btn {
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
          .f-cta-btn:hover { background: rgba(143,166,142,0.08); border-color: #8fa68e; }
          .f-cta-icon {
            width: 28px; height: 28px;
            border-radius: 50%;
            background: #8fa68e;
            color: #1a1a18;
            display: flex; align-items: center; justify-content: center;
            transition: transform 0.25s ease;
          }
          .f-cta-btn:hover .f-cta-icon { transform: rotate(45deg); }

          /* ── Main grid ── */
          .f-grid {
            display: grid;
            grid-template-columns: 2fr 1fr 1fr 1fr;
            gap: 48px 40px;
            padding: 52px 64px;
          }

          /* ── Divider ── */
          .f-hr {
            border: none;
            border-top: 1px solid rgba(249,247,244,0.07);
            margin: 0;
          }

          /* ── Contact address block ── */
          .f-contact-item {
            display: flex;
            align-items: center;
            gap: 9px;
            font-family: 'DM Sans', sans-serif;
            font-size: 0.8rem;
            color: rgba(249,247,244,0.42);
            text-decoration: none;
            margin-bottom: 13px;
            transition: color 0.2s;
            word-break: break-word;
          }
          .f-contact-item:last-child { margin-bottom: 0; }
          .f-contact-item:hover { color: #f9f7f4; }

          /* ── Location chip ── */
          .f-location-chip {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            font-family: 'DM Sans', sans-serif;
            font-size: 0.68rem;
            font-weight: 500;
            letter-spacing: 0.04em;
            color: rgba(249,247,244,0.3);
            border: 1px solid rgba(249,247,244,0.08);
            border-radius: 9999px;
            padding: 4px 10px;
            margin-top: 4px;
          }

          /* ── Bottom bar ── */
          .f-bottom {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 12px;
            padding: 20px 64px;
            align-items: center;
          }
          .f-bottom-text {
            font-family: 'DM Sans', sans-serif;
            font-size: 0.7rem;
            color: rgba(249,247,244,0.25);
            margin: 0;
          }

          /* ── Responsive — tablet ── */
          @media (max-width: 1023px) {
            .f-cta-card { padding: 40px 40px 36px; margin: 0 24px; margin-top: -100px; }
            .f-grid { grid-template-columns: 1fr 1fr; gap: 40px 32px; padding: 44px 40px; }
            .f-brand-col { grid-column: 1 / -1; }
            .f-bottom { padding: 20px 40px; }
          }

          /* ── Responsive — mobile ── */
          @media (max-width: 640px) {
            .f-cta-card {
              flex-direction: column; align-items: flex-start;
              padding: 32px 24px 28px; margin: 0 16px; margin-top: -80px;
              border-radius: 16px; gap: 24px;
            }
            .f-grid { grid-template-columns: 1fr 1fr; gap: 36px 24px; padding: 40px 24px; }
            .f-brand-col { grid-column: 1 / -1; }
            .f-services-col { grid-column: 1 / -1; }
            .f-bottom { padding: 18px 24px; flex-direction: column; gap: 6px; }
            .f-blurb { max-width: 100%; }
          }

          /* ── Responsive — very small ── */
          @media (max-width: 380px) {
            .f-grid { grid-template-columns: 1fr; padding: 36px 20px; }
            .f-services-col { grid-column: auto; }
            .f-bottom { padding: 16px 20px; }
            .f-cta-card { margin: 0 12px; margin-top: -60px; }
          }
        `}</style>

        {/* ── CTA CARD ── */}
        <div className="f-cta-card">
          <div style={{ maxWidth: 520 }}>
            <span className="f-cta-eyebrow">
              HVAC · Solar · Refrigeration · Electrical · Lifts
            </span>
            {/*
             * SEO: heading now names the core service + location.
             * "Let's design your solution" had zero keyword value.
             */}
            <h2 className="f-cta-heading">
              Get a Free Quote for HVAC &amp; Energy Services in Kenya
            </h2>
          </div>
          <Link
            href="/contact"
            className="f-cta-btn"
            aria-label="Request a call from Élan Climat Kenya"
          >
            Request a Call
            <span className="f-cta-icon" aria-hidden="true">
              <ArrowUpRight size={14} strokeWidth={2} />
            </span>
          </Link>
        </div>

        <hr className="f-hr" />

        {/* ── MAIN GRID ── */}
        <div className="f-grid">
          {/* Brand column */}
          <div
            className="f-brand-col"
            style={{ display: "flex", flexDirection: "column", gap: 20 }}
          >
            <Link href="/" aria-label="Élan Climat & Énergie — Home">
              <ElanLogo size={130} />
            </Link>

            {/*
             * SEO: blurb now carries keyword-rich, location-specific copy
             * instead of the vague "Smart solutions for..." original.
             */}
            <p className="f-blurb">
              Kenya&apos;s leading HVAC, solar, cold room, refrigeration,
              electrical, and elevator engineering company. Certified engineers
              serving Nairobi, Mombasa, Kisumu, Eldoret, and across East Africa
              since 2018.
            </p>

            {/* Location chip — reinforces geo signal */}
            <div>
              <span className="f-location-chip">
                <MapPin size={11} aria-hidden="true" />
                Nairobi, Kenya · Est. 2018
              </span>
            </div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="f-social"
                  aria-label={s.label}
                  rel="noopener noreferrer nofollow"
                  target="_blank"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Company links */}
          <div>
            <span className="f-label">Company</span>
            {QUICK_LINKS.map((l) => (
              <Link key={l.label} href={l.href} className="f-link">
                {l.label}
              </Link>
            ))}
          </div>

          {/* Services — keyword-rich anchor text + descriptive hrefs */}
          <div className="f-services-col">
            <span className="f-label">Services</span>
            {SERVICES.map((s) => (
              <Link key={s.href} href={s.href} className="f-link">
                {s.label}
              </Link>
            ))}
          </div>

          {/* Contact — wrapped in <address> for semantic NAP */}
          <div>
            <span className="f-label">Contact</span>
            {/*
             * <address> tells Google this block contains NAP
             * (Name, Address, Phone) data — a direct local SEO signal.
             */}
            <address style={{ fontStyle: "normal" }}>
              <a href="tel:+254796952717" className="f-contact-item">
                <Phone size={13} aria-hidden="true" />
                +254 796 952 717
              </a>
              <a
                href="mailto:hello@elanclimat.co.ke"
                className="f-contact-item"
              >
                <Mail size={13} aria-hidden="true" />
                hello@elanclimat.co.ke
              </a>
              <a href="https://www.elanclimat.co.ke" className="f-contact-item">
                <Globe size={13} aria-hidden="true" />
                www.elanclimat.co.ke
              </a>
              <span className="f-contact-item" style={{ cursor: "default" }}>
                <MapPin size={13} aria-hidden="true" />
                Nairobi, Kenya
              </span>
            </address>
          </div>
        </div>

        <hr className="f-hr" />

        {/* ── BOTTOM BAR ── */}
        <div className="f-bottom">
          {/*
           * SEO: copyright line now names the company explicitly,
           * reinforcing the brand entity signal on every page.
           */}
          <p className="f-bottom-text">
            © 2018–{year} Élan Climat &amp; Énergie Ltd · Nairobi, Kenya · All
            rights reserved.
          </p>
          <p className="f-bottom-text">
            HVAC · Solar · Refrigeration · Electrical · Lifts ·{" "}
            <span style={{ color: "#8fa68e" }}>East Africa</span>
          </p>
        </div>
      </footer>
    </>
  );
}
