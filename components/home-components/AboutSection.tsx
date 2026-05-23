"use client";

import Image from "next/image";
import Link from "next/link";

import { Shield, Star, CheckCircle, Phone, ArrowRight } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" style={{ padding: "100px 0" }} className="mesh-bg">
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        <div className="flex flex-col-reverse md:grid md:grid-cols-2 gap-20 items-center">
          <div style={{ position: "relative" }}>
            <div className="relative w-full sm:w-[90%] md:w-full aspect-4/5 min-h-105 overflow-hidden mx-auto">
              <Image
                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=700&q=80"
                alt="HVAC technician at work"
                fill
                className="object-cover"
              />
            </div>
            <div
              style={{
                position: "absolute",
                bottom: -24,
                right: -24,
                background: "white",
                padding: "24px 28px",
                boxShadow: "0 8px 40px rgba(0,0,0,0.1)",
                minWidth: 180,
              }}
            >
              <div
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "2.4rem",
                  fontWeight: 600,
                  color: "var(--charcoal)",
                  lineHeight: 1,
                }}
              >
                18
              </div>
              <div
                style={{
                  fontFamily: "DM Sans",
                  fontSize: "0.78rem",
                  color: "var(--text-muted)",
                  marginTop: 4,
                }}
              >
                Years of Excellence
              </div>
              <div
                style={{
                  width: 32,
                  height: 2,
                  background: "var(--sage)",
                  marginTop: 12,
                }}
              />
            </div>
            <div
              style={{
                position: "absolute",
                top: -20,
                left: -20,
                background: "var(--charcoal)",
                padding: "16px 20px",
              }}
            >
              <div
                style={{
                  fontFamily: "DM Sans",
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--sage-light)",
                  marginBottom: 4,
                }}
              >
                Certified
              </div>
              <div
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "1.2rem",
                  color: "white",
                }}
              >
                Experts
              </div>
            </div>
          </div>

          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 16,
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
                  color: "var(--sage-dark)",
                }}
              >
                About Us
              </span>
            </div>
            <h2
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                fontWeight: 600,
                color: "var(--charcoal)",
                lineHeight: 1.2,
                marginBottom: 24,
              }}
            >
              Engineering comfort{" "}
              <em style={{ fontStyle: "italic", color: "var(--sage-dark)" }}>
                &amp; sustainability,
              </em>{" "}
              since 2007
            </h2>
            <p
              style={{
                fontFamily: "DM Sans",
                fontSize: "0.93rem",
                lineHeight: 1.8,
                color: "var(--text-muted)",
                marginBottom: 20,
              }}
            >
              Founded on the belief that comfort and responsibility are not
              trade-offs, Élan Climat &amp; Énergie has grown from a two-person
              HVAC firm into a full-spectrum climate and energy company trusted
              by over a thousand households and businesses. <br />
              We are a professionalized company for the sale, project design,
              installation and maintenance of ventilation, heating and cooling
              systems. Although it is a newly established company, E-Clima
              always provides highest quality to customers with qualified
              personnel with upto 20 years of experience in this field,
              successfully demonstrating its quality with project design,
              installation and technical service in many important projects.
            </p>
            <p
              style={{
                fontFamily: "DM Sans",
                fontSize: "0.93rem",
                lineHeight: 1.8,
                color: "var(--text-muted)",
                marginBottom: 36,
              }}
            >
              Our engineers hold manufacturer certifications across all major
              HVAC brands and solar platforms. Every installation is
              precision-engineered — from thermal load calculations to inverter
              sizing.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
                marginBottom: 36,
              }}
            >
              {[
                {
                  label: "Manufacturer Certified",
                  icon: <Shield size={15} />,
                },
                { label: "Energy-Star Partners", icon: <Star size={15} /> },
                {
                  label: "10-Year Warranty",
                  icon: <CheckCircle size={15} />,
                },
                {
                  label: "24/7 Emergency Service",
                  icon: <Phone size={15} />,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    fontFamily: "DM Sans",
                    fontSize: "0.83rem",
                    color: "var(--charcoal)",
                  }}
                >
                  <span style={{ color: "var(--sage-dark)" }}>{item.icon}</span>
                  {item.label}
                </div>
              ))}
            </div>
            <Link
              href="/#contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 28px",
                background: "var(--charcoal)",
                color: "white",
                fontFamily: "DM Sans",
                fontSize: "0.88rem",
                textDecoration: "none",
              }}
            >
              Work With Us <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
