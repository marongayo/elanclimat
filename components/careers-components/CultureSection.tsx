import Image from "next/image";
import { Eyebrow } from "@/components/careers-components/Eyebrow";
import { C } from "@/lib/constants";

const PERKS = [
  "Competitive compensation and growth path",
  "On-the-job training with certified engineers",
  "Real projects, real responsibility from day one",
  "A culture of care, precision, and honesty",
];

export function CultureSection() {
  return (
    <section style={{ backgroundColor: C.warmWhite, padding: "96px 0" }}>
      <div className="careers-inner">
        <div
          className="careers-culture-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 72,
            alignItems: "center",
          }}
        >
          {/* Left: image collage */}
          <div
            className="careers-culture-images"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gridTemplateRows: "60% 40%",
              gap: 10,
              height: 480,
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
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&q=80"
                alt="Team collaboration"
                fill
                sizes="(max-width:640px) 100vw, (max-width:1024px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
                quality={80}
              />
            </div>
            <div style={{ position: "relative", overflow: "hidden" }}>
              <Image
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80"
                alt="Team meeting"
                fill
                sizes="25vw"
                style={{ objectFit: "cover" }}
                quality={80}
              />
            </div>
            <div style={{ position: "relative", overflow: "hidden" }}>
              <Image
                src="/images/contact.jpg"
                alt="On-site work"
                fill
                sizes="25vw"
                style={{ objectFit: "cover" }}
                quality={80}
              />
            </div>
          </div>

          {/* Right: text */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <Eyebrow text="Life at Élan" />
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
                fontWeight: 400,
                color: C.charcoal,
                lineHeight: 1.1,
                letterSpacing: "-0.015em",
                margin: 0,
              }}
            >
              Precision work,
              <br />
              <span style={{ fontWeight: 300 }}>meaningful impact</span>
            </h2>
            <div style={{ width: 32, height: 1, background: C.ruleLight }} />
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.86rem",
                color: C.body,
                lineHeight: 1.85,
                margin: 0,
                fontWeight: 300,
              }}
            >
              Every person at Élan works on systems that genuinely matter —
              cooling hospitals, powering schools with solar, keeping food
              supply chains running. We take our work seriously, invest in
              craft, and build careers alongside the infrastructure of a better
              East Africa.
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                marginTop: 4,
              }}
            >
              {PERKS.map((item) => (
                <div
                  key={item}
                  style={{ display: "flex", alignItems: "center", gap: 10 }}
                >
                  <span
                    style={{
                      width: 4,
                      height: 4,
                      borderRadius: "50%",
                      background: C.sage,
                      flexShrink: 0,
                      display: "inline-block",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.82rem",
                      color: C.body,
                      fontWeight: 300,
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
