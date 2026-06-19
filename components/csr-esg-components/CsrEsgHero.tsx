import Image from "next/image";
import Link from "next/link";
import Eyebrow from "@/components/Eyebrow";
import { C, IMG } from "@/lib/constants";

export function CsrEsgHero() {
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
        src={IMG.csrTree}
        alt="Élan Climat & Énergie — CSR & ESG"
        fill
        priority
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center 35%" }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(26,26,24,0.78) 0%, rgba(26,26,24,0.35) 60%, rgba(26,26,24,0.12) 100%)",
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
            CSR &amp; ESG
          </span>
        </div>

        <Eyebrow text="Our Commitment" light />

        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2.8rem, 5.5vw, 4.4rem)",
            fontWeight: 400,
            color: "#ffffff",
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            margin: "16px 0 20px",
            maxWidth: 680,
          }}
        >
          Engineering Good,
          <br />
          <span style={{ fontWeight: 300 }}>Beyond the Building.</span>
        </h1>

        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.88rem",
            color: "rgba(255,255,255,0.65)",
            lineHeight: 1.75,
            maxWidth: 440,
            fontWeight: 300,
            margin: "0 0 32px",
          }}
        >
          How we give back to the communities we build in, and how we hold
          ourselves accountable for the impact of every project we deliver.
        </p>

        {/* Anchor nav */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {[
            { label: "Corporate Social Responsibility", href: "#csr" },
            { label: "Environmental, Social & Governance", href: "#esg" },
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
