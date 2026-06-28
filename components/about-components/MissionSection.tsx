import Image from "next/image";
import Eyebrow from "@/components/Eyebrow";
import { C } from "@/lib/constants";

/**
 * MissionSection — Mission, Vision & Purpose
 * Zigzag layout: alternating image-left/text-right rows.
 * Images: Unsplash (free, commercial use, no attribution required).
 * SEO: JSON-LD Organization schema + semantic landmarks.
 *
 * Place between <StorySection /> and <ValuesSection /> in page.tsx.
 */

const PILLARS = [
  {
    id: "mission",
    label: "Mission",
    headline: "Why We Exist",
    body: "To improve lives and power progress across East Africa by providing innovative, reliable, and sustainable engineering solutions — from climate control to clean energy — with integrity, precision, and a deep commitment to the communities we serve.",
    image:
      "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=700&q=75&fit=crop",
    imageAlt: "Solar panels in the field",
    reverse: false,
  },
  {
    id: "vision",
    label: "Vision",
    headline: "Where We Are Headed",
    body: "To be East Africa's most trusted engineering partner — the firm that every developer, facility manager, and institution calls first when the system must work, without exception, for the life of the building.",
    image:
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=700&q=75&fit=crop",
    imageAlt: "Engineer reviewing building systems",
    reverse: true,
  },
  {
    id: "purpose",
    label: "Purpose",
    headline: "What Drives Every Decision",
    body: "Buildings should perform as well on day 3,000 as they do on day one. We exist to make that standard attainable in Kenya and across the region — not as a luxury, but as a baseline expectation.",
    image:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&q=75&fit=crop",
    imageAlt: "Modern commercial building exterior",
    reverse: false,
  },
];

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Élan Climat & Énergie",
  url: "https://www.elanclimat.co.ke",
  foundingDate: "2018",
  description:
    "To improve lives and power progress across East Africa by providing innovative, reliable, and sustainable engineering solutions — from climate control to clean energy — with integrity, precision, and a deep commitment to the communities we serve.",
  areaServed: ["Kenya", "East Africa"],
  knowsAbout: [
    "HVAC Systems",
    "Solar Installation",
    "Refrigeration",
    "Electrical Works",
    "Elevator Systems",
  ],
};

export function MissionSection() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      <section
        aria-label="Mission, Vision and Purpose"
        style={{ padding: "80px 0", background: C.warmWhite }}
      >
        <style>{`
          /* ── Eyebrow row ── */
          .mvp-header {
            display: flex;
            align-items: center;
            gap: 20px;
            margin-bottom: 48px;
          }
          .mvp-rule { flex: 1; height: 1px; background: ${C.rule}; }

          /* ── Zigzag row ── */
          .mvp-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            border-top: 1px solid ${C.rule};
          }
          .mvp-row:last-child { border-bottom: 1px solid ${C.rule}; }

          /* ── Image cell: fixed aspect ratio so it never towers ── */
          .mvp-image-wrap {
            position: relative;
            aspect-ratio: 4 / 3;
            overflow: hidden;
          }

          /* ── Text cell ── */
          .mvp-text {
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 20px;
            padding: 48px 56px;
          }

          /* ── Zigzag: reverse rows flip column order ── */
          .mvp-row.reverse .mvp-image-wrap { order: 2; }
          .mvp-row.reverse .mvp-text       { order: 1; }

          /* ── Tablet: narrower padding ── */
          @media (max-width: 1024px) {
            .mvp-text { padding: 36px 40px; }
          }

          /* ── Mobile: stack vertically, image always on top ── */
          @media (max-width: 768px) {
            .mvp-row {
              grid-template-columns: 1fr;
            }
            .mvp-image-wrap {
              aspect-ratio: 16 / 9;
              order: 0 !important;
            }
            .mvp-text {
              order: 1 !important;
              padding: 32px 24px;
              gap: 16px;
            }
          }
        `}</style>

        {/* Centred eyebrow */}
        <div className="about-inner">
          <div className="mvp-header">
            <div className="mvp-rule" aria-hidden="true" />
            <Eyebrow text="Mission, Vision & Purpose" />
            <div className="mvp-rule" aria-hidden="true" />
          </div>
        </div>

        {/* Zigzag rows — full width inside about-inner */}
        <div className="about-inner">
          {PILLARS.map((pillar, i) => (
            <article
              key={pillar.id}
              id={pillar.id}
              className={`mvp-row${pillar.reverse ? " reverse" : ""}`}
              itemScope
              itemType="https://schema.org/CreativeWork"
            >
              {/* Image */}
              <div className="mvp-image-wrap">
                <Image
                  src={pillar.image}
                  alt={pillar.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                />
                {/* Subtle tint */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(26,26,24,0.15)",
                  }}
                />
              </div>

              {/* Text */}
              <div
                className="mvp-text"
                style={{ background: i % 2 === 0 ? C.warmWhite : "#ffffff" }}
              >
                {/* Pill label */}
                <span
                  style={{
                    alignSelf: "flex-start",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.6rem",
                    fontWeight: 500,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: C.sage,
                    border: `1px solid ${C.sage}`,
                    borderRadius: 9999,
                    padding: "3px 12px",
                  }}
                >
                  {pillar.label}
                </span>

                <h3
                  itemProp="name"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(1.5rem, 2.2vw, 2.1rem)",
                    fontWeight: 400,
                    color: C.charcoal,
                    lineHeight: 1.15,
                    letterSpacing: "-0.018em",
                    margin: 0,
                  }}
                >
                  {pillar.headline}
                </h3>

                <div
                  aria-hidden="true"
                  style={{ width: 28, height: 1, background: C.ruleLight }}
                />

                <p
                  itemProp="description"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.85rem",
                    color: C.body,
                    lineHeight: 1.85,
                    margin: 0,
                    fontWeight: 300,
                    maxWidth: 400,
                  }}
                >
                  {pillar.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
