import Eyebrow from "@/components/Eyebrow";
import type { Service } from "@/lib/services-data";
import { C } from "@/lib/constants";

export function ServiceUseCases({ service }: { service: Service }) {
  return (
    <div
      className="svc-detail-inner"
      style={{ paddingTop: 48, paddingBottom: 32 }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          marginBottom: 36,
        }}
      >
        <Eyebrow text="Where It's Used" />
        <h3
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(1.5rem, 2.4vw, 2rem)",
            fontWeight: 400,
            color: C.charcoal,
            lineHeight: 1.15,
            letterSpacing: "-0.015em",
            margin: 0,
          }}
        >
          {service.title} Across Kenyan Industries
        </h3>
      </div>

      <div
        className="use-cases-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 0,
          borderTop: `1px solid ${C.rule}`,
          borderLeft: `1px solid ${C.rule}`,
        }}
      >
        {service.useCases.map((uc) => (
          <div
            key={uc.sector}
            style={{
              padding: "24px 22px",
              borderRight: `1px solid ${C.rule}`,
              borderBottom: `1px solid ${C.rule}`,
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.64rem",
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: C.sageDark,
              }}
            >
              {uc.sector}
            </span>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.8rem",
                color: C.muted,
                lineHeight: 1.7,
                margin: 0,
                fontWeight: 300,
              }}
            >
              {uc.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
