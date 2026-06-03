import { Eyebrow } from "@/components/careers-components/Eyebrow";
import { C } from "@/components/careers-components/_tokens";

export function CtaSection() {
  return (
    <section style={{ background: C.charcoal }}>
      <style>{`
        .careers-cta-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 280px;
        }
        .careers-cta-left {
          padding: 72px 64px;
          border-right: 1px solid rgba(255,255,255,0.07);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .careers-cta-right {
          padding: 72px 64px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }

        /* Tablet: stack columns, tighten padding */
        @media (max-width: 1024px) {
          .careers-cta-grid {
            grid-template-columns: 1fr;
          }
          .careers-cta-left {
            border-right: none;
            border-bottom: 1px solid rgba(255,255,255,0.07);
            padding: 56px 32px;
          }
          .careers-cta-right {
            padding: 48px 32px;
          }
        }

        /* Mobile: compact padding */
        @media (max-width: 640px) {
          .careers-cta-left {
            padding: 48px 20px;
          }
          .careers-cta-right {
            padding: 40px 20px;
          }
          /* Hide the company details block on small screens — redundant at this size */
          .careers-cta-right-body {
            font-size: 0.82rem !important;
          }
        }
      `}</style>

      <div className="careers-cta-grid">
        {/* Left — open application */}
        <div className="careers-cta-left">
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <Eyebrow text="Don't see your role?" light />
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1.8rem, 2.8vw, 2.6rem)",
                fontWeight: 400,
                color: "#ffffff",
                lineHeight: 1.12,
                letterSpacing: "-0.02em",
                margin: 0,
              }}
            >
              Write to us.
              <br />
              <em
                style={{
                  fontStyle: "italic",
                  color: C.accent,
                  fontWeight: 300,
                }}
              >
                We read everything.
              </em>
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.8rem",
                color: "rgba(255,255,255,0.38)",
                lineHeight: 1.8,
                maxWidth: 340,
                fontWeight: 300,
                margin: 0,
              }}
            >
              We hire for character as much as credentials. Send us a short note
              about who you are and what you would bring. No templates needed.
            </p>
          </div>

          <a
            href="mailto:careers@elanclimat.co.ke"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.78rem",
              color: C.accent,
              letterSpacing: "0.06em",
              textDecoration: "none",
              borderBottom: "1px solid rgba(201,169,110,0.35)",
              paddingBottom: 2,
              display: "inline-block",
              alignSelf: "flex-start",
              marginTop: 32,
            }}
          >
            careers@elanclimat.co.ke
          </a>
        </div>

        {/* Right — company note */}
        <div className="careers-cta-right">
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.58rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.2)",
              marginBottom: 12,
            }}
          >
            Élan Climat &amp; Énergie
          </div>
          <div
            className="careers-cta-right-body"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "0.92rem",
              color: "rgba(255,255,255,0.22)",
              lineHeight: 1.75,
              maxWidth: 260,
            }}
          >
            Nairobi, Kenya
            <br />
            HVAC · Solar · Battery Storage
            <br />
            Refrigeration · Elevators · Electrical
            <br />
            Est. 2012
          </div>
        </div>
      </div>
    </section>
  );
}
