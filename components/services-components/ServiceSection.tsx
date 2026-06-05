// app/services/ServiceSection.tsx
// SERVER COMPONENT — no "use client", fully static and indexable

import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { C } from "@/lib/constants";
import type { SERVICES } from "@/app/services/page";

type Service = (typeof SERVICES)[0];

function Eyebrow({ text, light = false }: { text: string; light?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <span
        style={{
          display: "inline-block",
          width: 24,
          height: 1,
          background: light ? "rgba(255,255,255,0.35)" : C.ruleLight,
        }}
      />
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.62rem",
          letterSpacing: "0.22em",
          textTransform: "uppercase" as const,
          color: light ? "rgba(255,255,255,0.45)" : C.sage,
          fontWeight: 500,
        }}
      >
        {text}
      </span>
    </div>
  );
}

function Feature({ text, dark }: { text: string; dark: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <CheckCircle2
        size={14}
        strokeWidth={1.8}
        style={{ color: C.sage, flexShrink: 0, marginTop: 1 }}
      />
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.82rem",
          color: dark ? "rgba(255,255,255,0.65)" : C.body,
          lineHeight: 1.5,
          fontWeight: 300,
        }}
      >
        {text}
      </span>
    </div>
  );
}

export default function ServiceSection({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  const bg = service.dark ? C.charcoal : C.warmWhite;
  const isEven = index % 2 === 0;

  return (
    <section
      id={service.anchor}
      aria-label={service.seoTitle}
      style={{ backgroundColor: bg, padding: "96px 0", scrollMarginTop: 80 }}
    >
      <style>{`
        .svc-inner-${service.id} {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 64px;
        }
        .svc-grid-${service.id} {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 72px;
          align-items: start;
          margin-top: 56px;
        }
        @media (max-width: 1024px) {
          .svc-inner-${service.id} { padding: 0 32px; }
          .svc-grid-${service.id} { grid-template-columns: 1fr; gap: 40px; }
          .svc-img-col-${service.id} { display: none; }
        }
        @media (max-width: 640px) {
          .svc-inner-${service.id} { padding: 0 24px; }
        }
      `}</style>

      <div className={`svc-inner-${service.id}`}>
        {/* Section header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 24,
            borderBottom: `1px solid ${
              service.dark ? "rgba(255,255,255,0.1)" : C.rule
            }`,
            paddingBottom: 28,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Eyebrow text={service.eyebrow} light={service.dark} />

            {/* h2 — keyword-rich seoTitle, fully visible and indexed */}
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1.6rem, 2.8vw, 2.4rem)",
                fontWeight: 400,
                color: service.dark ? "#ffffff" : C.charcoal,
                lineHeight: 1.1,
                letterSpacing: "-0.015em",
                margin: 0,
              }}
            >
              {service.seoTitle}
            </h2>

            {/* Creative subheading — visual only, not an h tag */}
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
                fontWeight: 300,
                fontStyle: "italic",
                color: service.dark ? "rgba(255,255,255,0.4)" : C.muted,
                margin: 0,
                letterSpacing: "0.01em",
              }}
            >
              {service.headline}
            </p>
          </div>

          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(3rem, 6vw, 5rem)",
              fontWeight: 300,
              color: service.dark ? "rgba(255,255,255,0.08)" : C.offWhite,
              lineHeight: 1,
              letterSpacing: "-0.04em",
              flexShrink: 0,
            }}
          >
            {service.num}
          </span>
        </div>

        {/* Grid */}
        <div
          className={`svc-grid-${service.id}`}
          style={{ direction: isEven ? "ltr" : "rtl" }}
        >
          {/* Text column */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 24,
              direction: "ltr",
            }}
          >
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.88rem",
                color: service.dark ? "rgba(255,255,255,0.55)" : C.body,
                lineHeight: 1.85,
                margin: 0,
                fontWeight: 300,
              }}
            >
              {service.description}
            </p>

            <div
              style={{
                width: 32,
                height: 1,
                background: service.dark
                  ? "rgba(255,255,255,0.15)"
                  : C.ruleLight,
              }}
            />

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {service.features.map((f) => (
                <Feature key={f} text={f} dark={service.dark} />
              ))}
            </div>

            <Link
              href="/contact"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.72rem",
                fontWeight: 500,
                color: service.dark ? "#ffffff" : C.charcoal,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                alignSelf: "flex-start",
                marginTop: 8,
                borderBottomWidth: 1,
                borderBottomStyle: "solid",
                borderBottomColor: service.dark
                  ? "rgba(255,255,255,0.35)"
                  : C.charcoal,
                paddingBottom: 2,
              }}
            >
              Request a Quote
            </Link>
          </div>

          {/* Image collage column */}
          <div
            className={`svc-img-col-${service.id}`}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gridTemplateRows: "60% 40%",
              gap: 10,
              height: 480,
              direction: "ltr",
            }}
          >
            <div
              style={{
                gridColumn: "1 / -1",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Image
                src={service.heroImg}
                alt={service.heroAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
                quality={80}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 16,
                  left: 16,
                  background: "rgba(26,26,24,0.72)",
                  backdropFilter: "blur(8px)",
                  padding: "6px 14px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  borderRadius: 9999,
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                <span
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: C.sage,
                    flexShrink: 0,
                    display: "inline-block",
                  }}
                />
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.62rem",
                    color: "rgba(255,255,255,0.85)",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  {service.title}
                </span>
              </div>
            </div>

            <div style={{ position: "relative", overflow: "hidden" }}>
              <Image
                src={service.colA}
                alt={service.colAlt[0]}
                fill
                sizes="25vw"
                style={{ objectFit: "cover" }}
                quality={80}
              />
            </div>
            <div style={{ position: "relative", overflow: "hidden" }}>
              <Image
                src={service.colB}
                alt={service.colAlt[1]}
                fill
                sizes="25vw"
                style={{ objectFit: "cover" }}
                quality={80}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
