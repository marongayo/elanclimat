"use client";

import ContactForm from "@/components/ContactForm";
import { Phone, Mail, MapPin } from "lucide-react";

export default function ContactSection() {
  return (
    <section
      id="contact"
      style={{
        padding: "100px 0",
        background: "#ffffff",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle background accent */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          right: "-8%",
          width: 480,
          height: 480,
          borderRadius: "50%",
          background: "rgba(143,175,159,0.08)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-15%",
          left: "-5%",
          width: 340,
          height: 340,
          borderRadius: "50%",
          background: "rgba(143,175,159,0.05)",
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
          {/* Left column */}
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
                color: "#0a0a0a",
                lineHeight: 1.15,
                marginBottom: 28,
              }}
            >
              Let&apos;s design your{" "}
              <em style={{ color: "var(--sage)", fontStyle: "italic" }}>
                ideal system
              </em>
            </h2>

            <p
              style={{
                fontFamily: "DM Sans",
                fontSize: "0.93rem",
                lineHeight: 1.8,
                color: "#444",
                marginBottom: 48,
                maxWidth: 420,
              }}
            >
              Whether you need a simple HVAC tune-up or a complete
              solar-plus-battery installation, start with a free consultation.
              Transparent proposals, no pressure.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                {
                  icon: <Phone size={16} />,
                  label: "Call us",
                  value: "+254 796 952 717",
                  href: "tel:+254796952717",
                },
                {
                  icon: <Mail size={16} />,
                  label: "Email",
                  value: "hello@elanclimat.co.ke",
                  href: "mailto:hello@elanclimat.co.ke",
                },
                {
                  icon: <MapPin size={16} />,
                  label: "Address",
                  value: "Ananas Business Park, Off Garrissa Road, Thika",
                  href: "https://maps.google.com/?q=Ananas+Business+Park,+Off+Garrissa+Road,+Thika",
                },
              ].map((item) => (
                <a
                  key={item.label}
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
                    gap: 16,
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    const valueEl = e.currentTarget.querySelector(
                      ".contact-value",
                    ) as HTMLElement | null;
                    if (valueEl) valueEl.style.color = "var(--sage)";
                  }}
                  onMouseLeave={(e) => {
                    const valueEl = e.currentTarget.querySelector(
                      ".contact-value",
                    ) as HTMLElement | null;
                    if (valueEl) valueEl.style.color = "#222";
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
                      color: "var(--sage)",
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
                      className="contact-value"
                      style={{
                        fontFamily: "DM Sans",
                        fontSize: "0.9rem",
                        color: "#222",
                        transition: "color 0.2s ease",
                      }}
                    >
                      {item.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right column — form */}
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
