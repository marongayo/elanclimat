import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "@/components/about-components/Eyebrow";
import { C, IMG } from "@/app/about/_tokens";

export function HeroSection() {
  return (
    <section
      style={{
        position: "relative",
        height: "72vh",
        minHeight: 520,
        overflow: "hidden",
      }}
    >
      <Image
        src={IMG.heroMain}
        alt="Élan Climat & Énergie — About us"
        fill
        priority
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center 30%" }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(26,26,24,0.75) 0%, rgba(26,26,24,0.3) 60%, rgba(26,26,24,0.1) 100%)",
          zIndex: 1,
        }}
      />
      <div
        className="about-inner"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          paddingBottom: 64,
        }}
      >
        {/* Breadcrumb */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 12,
          }}
        >
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
          <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.6rem" }}>
            /
          </span>
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.65rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: C.sage,
            }}
          >
            About Us
          </span>
        </div>

        <Eyebrow text="Our Company" light />

        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2.8rem, 5.5vw, 4.4rem)",
            fontWeight: 400,
            color: "#ffffff",
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            margin: "16px 0 20px",
            maxWidth: 640,
          }}
        >
          Engineered for Comfort.
          <br />
          <span style={{ fontWeight: 300 }}>Built for Tomorrow.</span>
        </h1>

        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.88rem",
            color: "rgba(255,255,255,0.65)",
            lineHeight: 1.75,
            maxWidth: 400,
            fontWeight: 300,
            margin: "0 0 32px",
          }}
        >
          A Nairobi-based engineering company designing, installing, and
          maintaining systems that make buildings perform better — and last
          longer.
        </p>

        {/* Anchor nav */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {[
            { label: "Our Story", href: "#our-story" },
            { label: "Services", href: "#our-services" },
            { label: "Team", href: "#team" },
            { label: "CSR & ESG", href: "#csr-esg" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.68rem",
                letterSpacing: "0.08em",
                color: "rgba(255,255,255,0.75)",
                background: "rgba(255,255,255,0.09)",
                border: "1px solid rgba(255,255,255,0.18)",
                borderRadius: 9999,
                padding: "6px 16px",
                textDecoration: "none",
                backdropFilter: "blur(6px)",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.background =
                  "rgba(255,255,255,0.18)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.background =
                  "rgba(255,255,255,0.09)")
              }
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
