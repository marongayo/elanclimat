import Link from "next/link";
import Eyebrow from "@/components/Eyebrow";
import { SectionHeading } from "@/components/about-components/SectionHeading";
import { ArticleBlock } from "@/components/csr-esg-components/ArticleBlock";
import { C, IMG } from "@/lib/constants";

const ESG_ARTICLES = [
  {
    eyebrowNum: "01",
    eyebrowLabel: "Environmental",
    title: "Designing Down Our Footprint, By Default",
    image: IMG.serviceSolar,
    imageAlt: "Solar PV installation by Élan engineers",
    paragraphs: [
      "Environmental performance at Élan is not a separate review stage bolted onto a finished design — it's a constraint applied at the point of specification. Refrigerants with low global warming potential are our default recommendation, not an upsell, and every installation ships with an energy performance benchmark so clients can verify, in real terms, what they're getting against the alternative they didn't choose.",
      "On average, our installations deliver 38% energy savings against the baseline equipment they replace, a figure we track on a rolling basis across completed projects rather than citing once and leaving stale. Decommissioned units are routed through certified e-waste handlers, which costs more and takes longer than informal disposal, but is the only approach consistent with the rest of our environmental commitments.",
      "The Nairobi Green Sites programme, which has resulted in more than 2,400 trees planted since 2021, exists to account visibly for the footprint of our fleet and operations — not as an offset purchased on a spreadsheet, but as a physical, verifiable commitment tied to specific sites and partner institutions.",
    ],
  },
  {
    eyebrowNum: "02",
    eyebrowLabel: "Social",
    title: "Capacity Building, Measured in People",
    image: IMG.team2,
    imageAlt: "Élan engineering team on-site",
    paragraphs: [
      "Our social performance is anchored in two commitments we track year over year: twelve sponsored engineering scholars annually through the Élan Scholar programme, each guaranteed an internship on completion, and an 85% rate of locally sourced labour and materials across our project base, which keeps the economic value of our work circulating within Kenyan communities rather than flowing outward.",
      "Site safety sits inside the social pillar as much as the operational one. Every team operates under OSHA-aligned protocols — daily toolbox talks, full PPE provision, and a no-blame incident reporting culture — and we've maintained zero lost-time incidents on a trailing three-year average, a figure reviewed at board level monthly rather than audited once a year.",
      "We treat workforce development the same way we treat any other long-term investment: with a budget, a timeline, and a measurable target. The goal isn't a single standout statistic, but a steady, compounding improvement in how many Kenyan engineers and technicians we've helped become qualified, employed, and retained.",
    ],
  },
  {
    eyebrowNum: "03",
    eyebrowLabel: "Governance",
    title: "Accountability Written Into Every Contract",
    image: IMG.csrCommunity,
    imageAlt: "Élan leadership reviewing project documentation",
    paragraphs: [
      "Every supplier relationship at Élan is governed by a standing ethical procurement policy — conflict-of-interest declarations, anti-bribery clauses, and documented quality benchmarks are standard contract terms, not negotiated exceptions for larger vendors. The same policy applies whether the supplier is a multinational distributor or a small local fabricator we're actively developing.",
      "Project-level ESG and safety performance is reviewed at board level on a monthly cadence, alongside commercial and operational metrics, so that sustainability commitments are weighed with the same seriousness as revenue targets rather than discussed in isolation once a year. We believe this is the only structure that keeps governance from becoming a paper exercise.",
      "We publish an annual ESG report covering emissions, waste, and community investment, available to clients, partners, and the public on request. It is not a polished summary written for marketing purposes — it includes the figures that moved in the right direction and the ones that didn't, because an ESG report that only contains good news isn't reporting anything at all.",
    ],
  },
];

export function EsgSection() {
  return (
    <section id="esg" style={{ padding: "96px 0 0", scrollMarginTop: 80 }}>
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
          <Eyebrow text="Environmental, Social & Governance" />
          <SectionHeading>
            Held to a Higher Standard, On the Record
          </SectionHeading>
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
            Sustainability is not a department at Élan — it is embedded in
            how we specify equipment, how we dispose of old units, and how
            we measure project success. These are the three pillars we
            report against.
          </p>
        </div>

        <div>
          {ESG_ARTICLES.map((article, i) => (
            <ArticleBlock
              key={article.eyebrowNum}
              {...article}
              reverse={i % 2 !== 0}
            />
          ))}
        </div>

        {/* Report CTA */}
        <div
          style={{
            marginTop: 56,
            marginBottom: 96,
            padding: "32px",
            background: C.warmWhite,
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
                color: C.charcoal,
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
                color: C.muted,
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
              background: C.charcoal,
              color: "#ffffff",
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
                "#333330")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.background =
                C.charcoal)
            }
          >
            Request ESG Report
          </Link>
        </div>
      </div>
    </section>
  );
}
