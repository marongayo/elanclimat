import Image from "next/image";
import Link from "next/link";
import Eyebrow from "@/components/Eyebrow";
import { SectionHeading } from "@/components/about-components/SectionHeading";
import { C, IMG } from "@/lib/constants";

const ESG_PILLARS = [
  {
    label: "Environmental",
    text: "We offset the carbon footprint of our installation fleet, prioritise refrigerants with low global warming potential, and have planted over 2,400 trees through our Nairobi Green Sites programme since 2021.",
  },
  {
    label: "Social",
    text: "We sponsor 12 engineering students annually through the Élan Scholar programme at Kenyan polytechnics and universities, with guaranteed internship placements on completion.",
  },
  {
    label: "Governance",
    text: "All supplier relationships are governed by our ethical procurement policy. We publish an annual ESG report available on request, covering emissions, waste, and community investment.",
  },
];

const ESG_NUMBERS = [
  { value: "2,400+", label: "Trees planted" },
  { value: "12", label: "Scholars annually" },
  { value: "38%", label: "Avg energy saved" },
];

export function CsrSection() {
  return (
    <section id="csr-esg" style={{ padding: "96px 0", scrollMarginTop: 80 }}>
      <div className="about-inner">
        <div
          className="csr-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            alignItems: "start",
          }}
        >
          {/* Left: text */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <Eyebrow text="CSR & ESG Strategies" />
            <SectionHeading>
              Leading with Purpose, Building for Tomorrow
            </SectionHeading>
            <div style={{ width: 32, height: 1, background: C.ruleLight }} />
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.88rem",
                color: C.body,
                lineHeight: 1.85,
                margin: 0,
                fontWeight: 300,
              }}
            >
              Sustainability is not a department at Élan, it is embedded in how
              we specify equipment, how we dispose of old units, and how we
              measure project success. Every installation comes with an energy
              performance benchmark.
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 0,
                borderTop: `1px solid ${C.rule}`,
                marginTop: 8,
              }}
            >
              {ESG_PILLARS.map((pillar) => (
                <div
                  key={pillar.label}
                  style={{
                    borderBottom: `1px solid ${C.rule}`,
                    padding: "24px 0",
                    display: "grid",
                    gridTemplateColumns: "100px 1fr",
                    gap: 24,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.62rem",
                      fontWeight: 500,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: C.sage,
                      paddingTop: 2,
                    }}
                  >
                    {pillar.label}
                  </span>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.8rem",
                      color: C.body,
                      lineHeight: 1.8,
                      margin: 0,
                      fontWeight: 300,
                    }}
                  >
                    {pillar.text}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex flex-row gap-3">
              <Link
                href="mailto:info@elanclimat.co.ke?subject=Requesting%20ESG%20Report&body=Hello%20Élan%20Team%2C%0A%0AI%20would%20like%20to%20request%20a%20copy%20of%20your%20latest%20ESG%20report.%20Please%20let%20me%20know%20if%20there's%20any%20additional%20information%20you%20need.%0A%0AThank%20you!"
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
                }}
              >
                Request ESG Report
              </Link>
              <Link
                href="/csr-esg"
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
                }}
              >
                View Our Strategies
              </Link>
            </div>
          </div>

          {/* Right: images + numbers */}
          <div
            className="csr-images"
            style={{ display: "flex", flexDirection: "column", gap: 12 }}
          >
            <div
              style={{
                position: "relative",
                aspectRatio: "16/10",
                overflow: "hidden",
              }}
            >
              <Image
                src={IMG.csrTree}
                alt="Tree planting initiative"
                fill
                sizes="50vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div
              style={{
                position: "relative",
                aspectRatio: "16/7",
                overflow: "hidden",
              }}
            >
              <Image
                src={IMG.csrCommunity}
                alt="Community engagement"
                fill
                sizes="50vw"
                style={{ objectFit: "cover" }}
              />
            </div>

            <div
              style={{
                background: C.charcoal,
                padding: "28px 32px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 16,
              }}
            >
              {ESG_NUMBERS.map((n) => (
                <div key={n.label}>
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1.6rem",
                      fontWeight: 400,
                      color: "#ffffff",
                      display: "block",
                      letterSpacing: "-0.015em",
                      lineHeight: 1,
                      marginBottom: 6,
                    }}
                  >
                    {n.value}
                  </span>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.62rem",
                      color: "rgba(255,255,255,0.4)",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {n.label}
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
