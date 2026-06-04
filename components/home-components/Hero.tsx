// components/home-components/Hero.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const TAGS = [
  { label: "HVAC Services", href: "/services#hvac" },
  { label: "Plumbing Services", href: "/services#plumbing" },
  { label: "Solar Installation", href: "/services#solar" },
  { label: "Cold Room Installation", href: "/services#cold-room" },
  { label: "Elevator Installation", href: "/services#elevator" },
  { label: "Electrical", href: "/services#electrical" },
];

export default function Hero() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

        .hero-tag {
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.16);
          transition: background 0.2s, border-color 0.2s;
        }
        .hero-tag:hover {
          background: rgba(255,255,255,0.16);
          border-color: rgba(255,255,255,0.28);
        }

        .hero-cta {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: #1a1a18;
          color: #1a1a18;
          border: 1.5px solid #1a1a18;
          padding: 10px 10px 10px 22px;
          border-radius: 9999px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.79rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-decoration: none;
          transition: background 0.3s, color 0.3s;
          color: white;
        }
        .hero-cta:hover {
          background: transparent;
          color: white;
          border-color: white;
        }
        .hero-cta:hover .hero-cta-icon {
          background: white;
          color: #1a1a18;
          transform: rotate(45deg);
        }
        .hero-cta-icon {
          background: white;
          color: black;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.3s, color 0.3s, transform 0.3s;
          flex-shrink: 0;
        }

        .hero-eyebrow {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
        }
        .hero-eyebrow-line {
          width: 24px;
          height: 1px;
          background: #8fa68e;
        }
        .hero-eyebrow-text {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.62rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #8fa68e;
        }
      `}</style>

      <div className="relative w-full min-h-screen overflow-hidden">
        <Image
          src="/images/qwerty.png"
          alt="HVAC and solar installation services in Kenya"
          fill
          priority
          className="object-cover object-[center_40%]"
          sizes="100vw"
          quality={85}
        />

        {/* Gradient overlay — same dark-left fade the shop uses in its hero */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(to right, rgba(26,26,24,0.72) 0%, rgba(26,26,24,0.28) 60%, rgba(26,26,24,0.08) 100%)",
          }}
        />

        <div className="relative z-20 flex flex-col min-h-screen">
          <div className="mt-auto flex flex-col md:flex-row md:items-end md:justify-between gap-10 px-8 md:px-20 pb-14">
            {/* Left: eyebrow + headline + CTA */}
            <div className="max-w-xl md:max-w-2xl">
              <div className="hero-eyebrow">
                <span className="hero-eyebrow-line" />
                <span className="hero-eyebrow-text">
                  Climate &amp; Energy Solutions
                </span>
              </div>

              <h1
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(2.8rem, 5.5vw, 4.4rem)",
                  fontWeight: 500,
                  color: "#ffffff",
                  lineHeight: 1.08,
                  letterSpacing: "-0.015em",
                  marginBottom: "1.25rem",
                }}
              >
                Redefining Comfort
                <br />
                <span style={{ fontWeight: 300 }}>and Sustainability</span>
              </h1>

              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.88rem",
                  color: "rgba(255,255,255,0.78)",
                  lineHeight: 1.75,
                  maxWidth: 380,
                  marginBottom: "2.25rem",
                  fontWeight: 300,
                }}
              >
                Professional HVAC, solar, and refrigeration installation
                services across Nairobi, Mombasa, Kisumu, Eldoret, Nakuru, and
                Nyeri. Our services are engineered for homes, offices, hotels,
                and cold storage facilities in Kenya and across Uganda, Tanzania
                and Rwanda.
              </p>

              <Link href="/contact" className="hero-cta">
                <span>Request a Quote</span>
                <span className="hero-cta-icon">
                  <ArrowUpRight size={15} strokeWidth={2} />
                </span>
              </Link>
            </div>

            {/* Right: service tags */}
            <div className="flex flex-wrap justify-start md:justify-end gap-2 max-w-xs md:max-w-sm shrink-0">
              {TAGS.map((tag) => (
                <Link
                  key={tag.label}
                  href={tag.href}
                  className="hero-tag flex items-center gap-2 px-4 py-2 text-white rounded-full"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.72rem",
                    fontWeight: 400,
                    letterSpacing: "0.02em",
                  }}
                >
                  <span
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: "#8fa68e",
                      flexShrink: 0,
                      display: "inline-block",
                    }}
                  />
                  {tag.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
