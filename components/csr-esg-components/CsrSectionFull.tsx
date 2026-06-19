import Eyebrow from "@/components/Eyebrow";
import { SectionHeading } from "@/components/about-components/SectionHeading";
import { ArticleBlock } from "@/components/csr-esg-components/ArticleBlock";
import { C, IMG } from "@/lib/constants";

const CSR_ARTICLES = [
  {
    eyebrowNum: "01",
    eyebrowLabel: "Community & Education",
    title: "Building the Next Generation of Kenyan Engineers",
    image: IMG.team1,
    imageAlt: "Élan Scholar programme participants",
    paragraphs: [
      "Every year, twelve engineering students at Kenyan polytechnics and universities are sponsored through the Élan Scholar programme, covering tuition, materials, and a monthly stipend for the duration of their studies. The programme was founded on a simple observation: Kenya does not lack engineering talent, it lacks the financial runway for that talent to complete its training without compromise.",
      "Scholars are paired with a mentor from our senior engineering staff from their first semester, and every recipient is guaranteed an internship placement with Élan on completion of their coursework — not a vague promise, but a structured six-month rotation through our HVAC, solar, and electrical divisions before they enter the job market.",
      "We've found that the relationship rarely ends at graduation. A number of our current site supervisors and project engineers came through this programme, which tells us more about its long-term value than any single statistic could. It is, in our view, the most direct lever we have over the future quality of the trade in this country.",
    ],
  },
  {
    eyebrowNum: "02",
    eyebrowLabel: "Environmental Stewardship",
    title: "Replacing What We Use, One Site at a Time",
    image: IMG.csrTree,
    imageAlt: "Nairobi Green Sites tree planting initiative",
    paragraphs: [
      "Since 2021, our Nairobi Green Sites programme has paired every major installation with a corresponding tree-planting commitment, working with local schools, county environment offices, and community groups to identify sites in need of indigenous tree cover. The logic is straightforward: our fleet and our equipment have a footprint, and we'd rather account for it visibly than offset it on paper alone.",
      "Beyond planting, environmental responsibility shows up earlier in the process — in how systems are specified. We default to refrigerants with low global warming potential wherever a project's budget and equipment compatibility allow it, and we route decommissioned units through certified e-waste handlers rather than informal scrap channels, which remains uncommon practice in this market.",
      "None of this is positioned as a marketing layer on top of our engineering work. It is treated as a design constraint, in the same category as load calculations or electrical compliance — something every project either satisfies or doesn't, and we hold ourselves to satisfying it.",
    ],
  },
  {
    eyebrowNum: "03",
    eyebrowLabel: "Local Employment & Supplier Development",
    title: "Keeping the Value Where the Work Happens",
    image: IMG.storyLeft,
    imageAlt: "Élan technicians on-site in Nairobi",
    paragraphs: [
      "We staff the overwhelming majority of our site work with Kenyan technicians rather than imported labour, and we invest directly in their certification — sponsoring EBK registration, manufacturer-specific training, and, where it makes sense, international short courses tied to a specific system or technology we're bringing into the market.",
      "The same philosophy extends to our supplier base. We run an informal but consistent vendor development track for smaller local fabricators and suppliers, working alongside them to meet the documentation, quality control, and compliance standards that larger institutional clients require. A supplier that struggles with paperwork today can, with the right support, become a fully qualified vendor within a year or two.",
      "This isn't purely altruistic — a stronger local supply chain makes our own projects more resilient and less exposed to import delays or currency volatility. But the side effect is a slightly more capable, more formalised local trade ecosystem than existed before, and that matters to us independent of the commercial case.",
    ],
  },
  {
    eyebrowNum: "04",
    eyebrowLabel: "Health & Safety Culture",
    title: "Safety as a Daily Discipline, Not a Checklist",
    image: IMG.serviceElectrical,
    imageAlt: "Élan site safety briefing",
    paragraphs: [
      "Every site team begins the day with a toolbox talk — a short, mandatory briefing covering the specific hazards of that day's work, whether that's working at height, handling refrigerants, or live electrical isolation. It's a small ritual, but it is non-negotiable, and it's the single biggest factor behind our safety record across more than 340 completed projects.",
      "Our engineers operate under OSHA-aligned protocols, with full PPE provision, documented permit-to-work systems for high-risk activities, and a no-blame incident reporting culture that encourages near-misses to be logged rather than quietly absorbed. We carry full public liability and professional indemnity insurance on every contract, not just the larger ones.",
      "Safety performance is reviewed at board level monthly, alongside commercial metrics — not relegated to an annual audit. We think that's the only way it stays a living priority rather than a framed certificate in a site office.",
    ],
  },
  {
    eyebrowNum: "05",
    eyebrowLabel: "Charitable Partnerships",
    title: "Pro-Bono Work Where It Is Needed Most",
    image: IMG.serviceRefrigeration,
    imageAlt: "Pro-bono cold room installation at a community clinic",
    paragraphs: [
      "We partner with local NGOs, county health facilities, and children's homes to provide refrigeration, electrical, and HVAC work at no cost, prioritising institutions that could not otherwise afford reliable systems — vaccine cold chains at rural clinics, lighting and wiring at children's homes, ventilation at community centres serving elderly residents.",
      "These projects are scoped and resourced the same way any commercial contract would be: proper site surveys, signed-off designs, and the same engineers who work on our flagship commercial installations. We don't treat pro-bono work as a lesser-effort category, because the people relying on a working cold room at a rural clinic depend on it just as much as a hospitality client depends on a chiller plant.",
      "We don't publicise every one of these projects, and we won't pretend the number is large in absolute terms. But each one represents a facility that now has a working system it wouldn't have had otherwise, and we intend to keep growing this list steadily rather than treating it as a one-off gesture.",
    ],
  },
];

export function CsrSectionFull() {
  return (
    <section id="csr" style={{ padding: "96px 0 0", scrollMarginTop: 80 }}>
      <div className="about-inner">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
            marginBottom: 24,
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
            Élan exists inside the communities we build for. Our CSR
            programme is built around five commitments that go beyond any
            single project — to the students, suppliers, workers, and
            neighbourhoods that make our work possible.
          </p>
        </div>

        <div>
          {CSR_ARTICLES.map((article, i) => (
            <ArticleBlock
              key={article.eyebrowNum}
              {...article}
              reverse={i % 2 !== 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
