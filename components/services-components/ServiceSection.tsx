// components/services-components/ServiceSection.tsx
// SERVER COMPONENT — no "use client", fully static and indexable

import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import type { Service } from "@/lib/services-data";
import { C } from "@/lib/constants";
import Eyebrow from "@/components/Eyebrow";

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
          fontSize: "0.84rem",
          color: dark ? C.body : C.body,
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
  const bg = service.dark ? "#ffffff" : C.warmWhite;
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
            borderBottom: `1px solid ${C.rule}`,
            paddingBottom: 28,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Eyebrow text={service.eyebrow} light={false} />
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1.6rem, 2.8vw, 2.4rem)",
                fontWeight: 400,
                color: C.charcoal,
                lineHeight: 1.1,
                letterSpacing: "-0.015em",
                margin: 0,
              }}
            >
              {service.seoTitle}
            </h2>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
                fontWeight: 300,
                fontStyle: "italic",
                color: C.muted,
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
              color: C.offWhite,
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
                fontSize: "0.9rem",
                color: C.body,
                lineHeight: 1.9,
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
                background: C.ruleLight,
              }}
            />

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {service.features.map((f) => (
                <Feature key={f} text={f} dark={false} />
              ))}
            </div>

            {/* Link to dedicated service page + anchor */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                marginTop: 8,
              }}
            >
              <Link
                href={`/services/${service.slug}`}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: 500,
                  color: C.charcoal,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  borderBottomWidth: 1,
                  borderBottomStyle: "solid",
                  borderBottomColor: C.charcoal,
                  paddingBottom: 2,
                }}
              >
                Learn More
              </Link>
              <Link
                href="/contact"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: 500,
                  color: C.muted,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  borderBottomWidth: 1,
                  borderBottomStyle: "solid",
                  borderBottomColor: C.ruleLight,
                  paddingBottom: 2,
                }}
              >
                Request a Quote
              </Link>
            </div>
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
