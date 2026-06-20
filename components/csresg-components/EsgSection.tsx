import Link from "next/link";
import Eyebrow from "@/components/Eyebrow";
import { SectionHeading } from "@/components/about-components/SectionHeading";
import { C } from "@/lib/constants";

const PILLARS = [
  {
    num: "01",
    label: "Environmental",
    title: "Designing Down Our Footprint",
    body: "We specify refrigerants with low global warming potential by default, route equipment disposal through certified e-waste handlers, and benchmark the energy performance of every installation against industry baselines. Our Nairobi Green Sites programme has offset the carbon footprint of our installation fleet since 2021.",
    metrics: [
      { value: "38%", label: "Avg. energy saved vs. baseline" },
      { value: "2,400+", label: "Trees planted since 2021" },
    ],
  },
  {
    num: "02",
    label: "Social",
    title: "Building Capacity, Not Just Systems",
    body: "Twelve engineering students are sponsored annually through the Élan Scholar programme, with guaranteed internship placements. Our site teams operate under OSHA-aligned safety protocols, and we maintain an 85% local labour and materials sourcing rate to keep value circulating within Kenyan communities.",
    metrics: [
      { value: "12", label: "Scholars sponsored / year" },
      { value: "85%", label: "Locally sourced labour & materials" },
    ],
  },
  {
    num: "03",
    label: "Governance",
    title: "Accountability Built Into Every Contract",
    body: "All supplier relationships are governed by our ethical procurement policy, with conflict-of-interest declarations and anti-bribery clauses standard across every contract. Project safety and ESG performance are reviewed at board level monthly, and we publish an annual ESG report covering emissions, waste, and community investment.",
    metrics: [
      { value: "100%", label: "Suppliers under ethical procurement policy" },
      { value: "Annual", label: "ESG report publication cadence" },
    ],
  },
];

export function EsgSection() {
  return (
    <section
      id="esg"
      style={{
        background: C.charcoal,
        padding: "96px 0",
        scrollMarginTop: 80,
      }}
    >
      <div className="about-inner">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
            marginBottom: 64,
            textAlign: "center",
          }}
        >
          <Eyebrow text="Environmental, Social & Governance" light />
          <SectionHeading light>
            Held to a Higher Standard, On the Record
          </SectionHeading>
          <div
            style={{
              width: 32,
              height: 1,
              background: "rgba(255,255,255,0.15)",
            }}
          />
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.85rem",
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.85,
              maxWidth: 560,
              margin: 0,
              fontWeight: 300,
            }}
          >
            Sustainability is not a department at Élan — it is embedded in how
            we specify equipment, how we dispose of old units, and how we
            measure project success. These are the three pillars we report
            against.
          </p>
        </div>

        <div
          className="esg-pillars-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 0,
            borderTop: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {PILLARS.map((pillar, i) => (
            <div
              key={pillar.num}
              style={{
                padding: "36px 28px",
                borderRight:
                  i < PILLARS.length - 1
                    ? "1px solid rgba(255,255,255,0.1)"
                    : "none",
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 12,
                }}
              >
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.58rem",
                    color: "rgba(255,255,255,0.25)",
                    letterSpacing: "0.14em",
                  }}
                >
                  {pillar.num}
                </span>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.64rem",
                    fontWeight: 500,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: C.sage,
                  }}
                >
                  {pillar.label}
                </span>
              </div>

              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.35rem",
                  fontWeight: 400,
                  color: "#ffffff",
                  letterSpacing: "-0.01em",
                  margin: 0,
                  lineHeight: 1.2,
                }}
              >
                {pillar.title}
              </h3>

              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.8rem",
                  color: "rgba(255,255,255,0.5)",
                  lineHeight: 1.85,
                  margin: 0,
                  fontWeight: 300,
                  flex: 1,
                }}
              >
                {pillar.body}
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  borderTop: "1px solid rgba(255,255,255,0.1)",
                  paddingTop: 18,
                  marginTop: 4,
                }}
              >
                {pillar.metrics.map((m) => (
                  <div
                    key={m.label}
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: 10,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "1.3rem",
                        fontWeight: 400,
                        color: "#ffffff",
                        letterSpacing: "-0.015em",
                        lineHeight: 1,
                      }}
                    >
                      {m.value}
                    </span>
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.64rem",
                        color: "rgba(255,255,255,0.4)",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Report CTA */}
        <div
          style={{
            marginTop: 56,
            padding: "32px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 24,
          }}
        >
          <div>
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.2rem",
                fontWeight: 400,
                color: "#ffffff",
                display: "block",
                marginBottom: 6,
                letterSpacing: "-0.01em",
              }}
            >
              Want the full picture?
            </span>
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.78rem",
                color: "rgba(255,255,255,0.45)",
              }}
            >
              Request our latest annual ESG report, covering emissions, waste,
              and community investment in detail.
            </span>
          </div>
          <Link
            href="mailto:info@elanclimat.co.ke?subject=Requesting%20ESG%20Report&body=Hello%20Élan%20Team%2C%0A%0AI%20would%20like%20to%20request%20a%20copy%20of%20your%20latest%20ESG%20report.%20Please%20let%20me%20know%20if%20there's%20any%20additional%20information%20you%20need.%0A%0AThank%20you!"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: "#ffffff",
              color: C.charcoal,
              textDecoration: "none",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.72rem",
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "12px 22px",
              borderRadius: 9999,
              flexShrink: 0,
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.background =
                "rgba(255,255,255,0.85)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.background =
                "#ffffff")
            }
          >
            Request ESG Report
          </Link>
        </div>
      </div>
    </section>
  );
}
