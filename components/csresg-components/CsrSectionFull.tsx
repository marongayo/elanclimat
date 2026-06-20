import Eyebrow from "@/components/Eyebrow";
import { SectionHeading } from "@/components/about-components/SectionHeading";
import { InitiativeCard } from "@/components/csresg-components/InitiativeCard";
import { C } from "@/lib/constants";

const INITIATIVES = [
  {
    num: "01",
    title: "Community & Education",
    description:
      "Through the Élan Scholar programme, we sponsor engineering students at Kenyan polytechnics and universities annually, with guaranteed internship placements and mentorship from our senior engineers on completion of their studies.",
    metricValue: "12",
    metricLabel: "Scholars sponsored / year",
  },
  {
    num: "02",
    title: "Environmental Stewardship",
    description:
      "Our Nairobi Green Sites programme has been running since 2021, offsetting the carbon footprint of our installation fleet and replanting indigenous tree cover at project sites and partner schools across the region.",
    metricValue: "2,400+",
    metricLabel: "Trees planted since 2021",
  },
  {
    num: "03",
    title: "Local Employment & Supplier Development",
    description:
      "We prioritise hiring and training Kenyan technicians over importing labour, and run a structured vendor development track that helps small local suppliers meet the quality and compliance standards our projects require.",
    metricValue: "85%",
    metricLabel: "Locally sourced labour & materials",
  },
  {
    num: "04",
    title: "Health & Safety Culture",
    description:
      "Every site team operates under OSHA-aligned protocols with mandatory daily toolbox talks, PPE provision, and incident reporting. Safety performance is reviewed monthly at board level, not just at project close-out.",
    metricValue: "0",
    metricLabel: "Lost-time incidents, 3-yr average",
  },
  {
    num: "05",
    title: "Charitable Partnerships",
    description:
      "We partner with local NGOs and county health facilities to provide pro-bono refrigeration and electrical work for clinics, children's homes, and community centres that could not otherwise afford reliable systems.",
    metricValue: "9",
    metricLabel: "Pro-bono installations to date",
  },
];

export function CsrSectionFull() {
  return (
    <section id="csr" style={{ padding: "96px 0", scrollMarginTop: 80 }}>
      <div className="about-inner">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
            marginBottom: 56,
            textAlign: "center",
          }}
        >
          <Eyebrow text="Corporate Social Responsibility" />
          <SectionHeading>Investing in People and Place</SectionHeading>
          <div style={{ width: 32, height: 1, background: C.ruleLight }} />
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.85rem",
              color: C.muted,
              lineHeight: 1.85,
              maxWidth: 560,
              margin: 0,
              fontWeight: 300,
            }}
          >
            Élan exists inside the communities we build for. Our CSR programme
            is built around five commitments that go beyond any single project —
            to the students, suppliers, workers, and neighbourhoods that make
            our work possible.
          </p>
        </div>

        <div
          className="initiatives-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
          }}
        >
          {INITIATIVES.map((item) => (
            <InitiativeCard key={item.num} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
