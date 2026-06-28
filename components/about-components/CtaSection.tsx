import Link from "next/link";
import Eyebrow from "@/components/Eyebrow";
import { C } from "@/lib/constants";

export function CtaSection() {
  return (
    <section style={{ background: C.charcoal, padding: "80px 0" }}>
      <div
        className="about-inner"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 24,
        }}
      >
        <Eyebrow text="Ready to Begin?" light />
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 400,
            color: "#ffffff",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            margin: 0,
            maxWidth: 520,
          }}
        >
          Let's engineer something exceptional together.
        </h2>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.82rem",
            color: "rgba(255,255,255,0.45)",
            lineHeight: 1.7,
            maxWidth: 380,
            margin: 0,
            fontWeight: 300,
          }}
        >
          Whether you're planning a new building, upgrading an existing system,
          or exploring solar; start with a conversation.
        </p>
        <div
          style={{
            display: "flex",
            gap: 16,
            flexWrap: "wrap",
            justifyContent: "center",
            marginTop: 8,
          }}
        >
          {[
            { label: "Get in Touch", href: "/contact" },
            { label: "Browse the Shop", href: "/shop" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                display: "inline-flex",
                alignItems: "center",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.72rem",
                fontWeight: 500,
                color: "rgba(255,255,255,0.5)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                textDecoration: "none",
                borderBottom: "1px solid rgba(255,255,255,0.2)",
                paddingBottom: 2,
                transition: "color 0.2s",
              }}
            >
              {link.label}
              
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
