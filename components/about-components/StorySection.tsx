import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/about-components/SectionHeading";
import Eyebrow from "@/components/Eyebrow";
import { C, IMG } from "@/lib/constants";

export function StorySection() {
  return (
    <section id="our-story" style={{ padding: "96px 0", scrollMarginTop: 80 }}>
      <div className="about-inner">
        <div
          className="story-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            alignItems: "center",
          }}
        >
          {/* Image collage */}
          <div
            className="story-images"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gridTemplateRows: "auto auto",
              gap: 12,
            }}
          >
            <div
              style={{
                gridColumn: "1 / -1",
                position: "relative",
                aspectRatio: "16/10",
                overflow: "hidden",
              }}
            >
              <Image
                src={IMG.storyLeft}
                alt="Élan team on-site"
                fill
                sizes="50vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div
              style={{
                position: "relative",
                aspectRatio: "4/3",
                overflow: "hidden",
              }}
            >
              <Image
                src={IMG.storyTopRight}
                alt="HVAC installation"
                fill
                sizes="25vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div
              style={{
                position: "relative",
                aspectRatio: "4/3",
                overflow: "hidden",
              }}
            >
              <Image
                src={IMG.storyBottomRight}
                alt="Solar panels"
                fill
                sizes="25vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>

          {/* Text */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <Eyebrow text="Since 2018" />
            <SectionHeading>From a Vision to a Trusted Name</SectionHeading>
            <div style={{ width: 32, height: 1, background: C.ruleLight }} />
            {[
              "Élan Climat & Énergie was founded in Nairobi in 2018 by a team of mechanical and electrical engineers who shared a single conviction: that buildings across Kenya deserved infrastructure that was not merely functional but genuinely excellent.",
              "What began as a boutique HVAC consultancy has evolved into a full-spectrum building systems company — designing, installing, and servicing HVAC, solar, refrigeration, electrical, and elevator systems across residential, commercial, and industrial properties in Kenya.",
              "Every project we take on — from a single split unit in a Westlands apartment to a 1 MW solar installation for a factory in Athi River — is treated with the same precision, care, and commitment to lasting performance.",
            ].map((para, i) => (
              <p
                key={i}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.88rem",
                  color: C.body,
                  lineHeight: 1.85,
                  margin: 0,
                  fontWeight: 300,
                }}
              >
                {para}
              </p>
            ))}
            <Link
              href="/contact"
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
                gap: 6,
                borderBottom: `1px solid ${C.charcoal}`,
                paddingBottom: 2,
                alignSelf: "flex-start",
                marginTop: 8,
                transition: "color 0.2s, border-color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = C.muted;
                (e.currentTarget as HTMLAnchorElement).style.borderColor =
                  C.muted;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = C.charcoal;
                (e.currentTarget as HTMLAnchorElement).style.borderColor =
                  C.charcoal;
              }}
            >
              Partner With Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
