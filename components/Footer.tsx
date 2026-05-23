"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

const SERVICES = [
  "HVAC Installation",
  "Solar Power Systems",
  "Battery Storage",
  "Maintenance & Repair",
  "Energy Audits",
];

const COMPANY_LINKS = [
  { label: "About Us", href: "/#about" },
  { label: "Blog & News", href: "/blog" },
  { label: "Shop", href: "/shop" },
  { label: "Contact", href: "/#contact" },
  { label: "Admin", href: "/admin" },
];

const CONTACT_METHODS = [
  {
    icon: <Phone size={14} />,
    text: "+254 796 952 717",
    href: "tel:+254796952717",
  },
  {
    icon: <Mail size={14} />,
    text: "hello@elanclimat.co.ke",
    href: "mailto:hello@elanclimat.co.ke",
  },
  {
    icon: <MapPin size={14} />,
    text: "Ananas Business Park, Off Garissa Road, Thika",
    href: "https://maps.google.com",
  },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--charcoal)",
        color: "white",
      }}
    >
      {/* Top */}
      <div
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "56px 32px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 48,
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ marginBottom: 20 }}>
              <div
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "1.7rem",
                  fontWeight: 600,
                  lineHeight: 1,
                }}
              >
                Élan Climat
              </div>

              <div
                style={{
                  fontFamily: "DM Sans",
                  fontSize: "0.68rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--sage)",
                  marginTop: 4,
                }}
              >
                &amp; Énergie
              </div>
            </div>

            <p
              style={{
                fontFamily: "DM Sans",
                fontSize: "0.88rem",
                lineHeight: 1.8,
                color: "rgba(255,255,255,0.55)",
                maxWidth: 300,
              }}
            >
              Premium climate control and renewable energy solutions designed
              for lasting comfort, efficiency, and sustainability.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4
              style={{
                fontFamily: "DM Sans",
                fontSize: "0.72rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--sage)",
                marginBottom: 18,
              }}
            >
              Services
            </h4>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {SERVICES.map((service) => (
                <Link
                  key={service}
                  href="/#services"
                  style={{
                    fontFamily: "DM Sans",
                    fontSize: "0.88rem",
                    color: "rgba(255,255,255,0.55)",
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                    width: "fit-content",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(255,255,255,0.55)";
                  }}
                >
                  {service}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4
              style={{
                fontFamily: "DM Sans",
                fontSize: "0.72rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--sage)",
                marginBottom: 18,
              }}
            >
              Company
            </h4>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {COMPANY_LINKS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    width: "fit-content",
                    fontFamily: "DM Sans",
                    fontSize: "0.88rem",
                    color: "rgba(255,255,255,0.55)",
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(255,255,255,0.55)";
                  }}
                >
                  {item.label}
                  <ArrowUpRight size={12} />
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4
              style={{
                fontFamily: "DM Sans",
                fontSize: "0.72rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--sage)",
                marginBottom: 18,
              }}
            >
              Contact
            </h4>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              {CONTACT_METHODS.map((item) => (
                <a
                  key={item.text}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    item.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 10,
                    textDecoration: "none",
                    color: "rgba(255,255,255,0.55)",
                    transition: "all 0.2s ease",
                    cursor: "pointer",
                    width: "fit-content",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(255,255,255,0.55)";
                  }}
                >
                  <span
                    style={{
                      color: "var(--sage)",
                      marginTop: 2,
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </span>

                  <span
                    style={{
                      fontFamily: "DM Sans",
                      fontSize: "0.88rem",
                      lineHeight: 1.6,
                    }}
                  >
                    {item.text}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "22px 32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 14,
        }}
      >
        <p
          style={{
            fontFamily: "DM Sans",
            fontSize: "0.78rem",
            color: "rgba(255,255,255,0.32)",
            margin: 0,
          }}
        >
          © 2019 - {new Date().getFullYear()} Élan Climat &amp; Énergie. All
          rights reserved.
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
          }}
        >
          {["Privacy Policy", "Terms of Service"].map((item) => (
            <a
              key={item}
              href="#"
              style={{
                fontFamily: "DM Sans",
                fontSize: "0.78rem",
                color: "rgba(255,255,255,0.32)",
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(255,255,255,0.32)";
              }}
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
