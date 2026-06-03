import Eyebrow from "@/components/Eyebrow";
import { SectionHeading } from "@/components/about-components/SectionHeading";
import { ValueRow } from "@/components/about-components/ValueRow";
import { C } from "@/lib/constants";

const VALUES = [
  {
    num: "01",
    title: "Precision Over Speed",
    body: "We plan meticulously before we touch a single pipe or cable. A well-engineered installation takes the time it takes — but it doesn't need to be revisited. Our rework rate across 340+ projects is under 3%.",
  },
  {
    num: "02",
    title: "Honest Advice, Always",
    body: "We'll tell you when a system is oversized for your needs, when a cheaper alternative will perform just as well, and when a project is outside our expertise. Trust is our longest-running asset.",
  },
  {
    num: "03",
    title: "Energy as an Investment",
    body: "Every system we spec is evaluated on its total cost of ownership — not just purchase price. We provide energy audits, lifecycle cost analysis, and ROI projections on all major installations.",
  },
  {
    num: "04",
    title: "Safety Without Negotiation",
    body: "All work complies with EPRA guidelines, Kenya Standards, and manufacturer specifications. Our engineers are OSHA-certified and we carry full public liability and professional indemnity insurance.",
  },
  {
    num: "05",
    title: "Local Talent, Global Standards",
    body: "We actively invest in developing Kenyan engineers — through sponsored certifications, mentorship, and international training partnerships — because the future of this industry should be built here.",
  },
];

export function ValuesSection() {
  return (
    <section style={{ background: C.charcoal, padding: "96px 0" }}>
      <div className="about-inner">
        <div
          className="values-layout"
          style={{
            display: "grid",
            gridTemplateColumns: "320px 1fr",
            gap: 96,
            alignItems: "start",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <Eyebrow text="What We Stand For" light />
            <SectionHeading light>
              Principles That Guide Every Project
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
                fontSize: "0.82rem",
                color: "rgba(255,255,255,0.45)",
                lineHeight: 1.8,
                margin: 0,
                fontWeight: 300,
              }}
            >
              These are not values we framed for a website. They are the
              standards our engineers hold themselves to on every site, every
              day.
            </p>
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            {VALUES.map((v) => (
              <ValueRow key={v.num} {...v} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
