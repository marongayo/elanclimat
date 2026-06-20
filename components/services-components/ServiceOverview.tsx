import Eyebrow from "@/components/Eyebrow";
import { ServiceArticleBlock } from "@/components/services-components/ServiceArticleBlock";
import { ServiceUseCases } from "@/components/services-components/ServiceUseCases";
import type { Service } from "@/lib/services-data";
import { C } from "@/lib/constants";

export function ServiceOverview({ service }: { service: Service }) {
  // Cycle through available images across however many content sections exist,
  // so the zig-zag layout never runs out of imagery regardless of section count.
  const imagePool = [service.colA, service.colB, service.heroImg];
  const altPool = [service.colAlt[0], service.colAlt[1], service.heroAlt];

  return (
    <section
      aria-label={`${service.title} overview`}
      style={{ backgroundColor: C.warmWhite, padding: "80px 0 16px" }}
    >
      <div className="svc-detail-inner">
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
          <Eyebrow text="Overview" />
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.9rem, 3.2vw, 2.8rem)",
              fontWeight: 400,
              color: C.charcoal,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              margin: 0,
              maxWidth: 640,
            }}
          >
            {service.seoTitle}
          </h2>
          <div style={{ width: 32, height: 1, background: C.ruleLight }} />
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.88rem",
              color: C.muted,
              lineHeight: 1.85,
              maxWidth: 560,
              margin: 0,
              fontWeight: 300,
            }}
          >
            {service.description}
          </p>
        </div>

        <div>
          {service.contentSections.map((section, i) => {
            // Attach the features checklist to whichever section covers
            // equipment/materials — the most natural home for a feature list.
            const isEquipmentSection = /equipment|materials/i.test(
              section.heading,
            );

            return (
              <ServiceArticleBlock
                key={section.heading}
                eyebrowNum={String(i + 1).padStart(2, "0")}
                eyebrowLabel={section.heading}
                title={section.heading}
                paragraphs={section.body}
                features={isEquipmentSection ? service.features : undefined}
                image={imagePool[i % imagePool.length]}
                imageAlt={altPool[i % altPool.length]}
                reverse={i % 2 !== 0}
              />
            );
          })}
        </div>
      </div>

      <ServiceUseCases service={service} />
    </section>
  );
}
