import { C } from "@/lib/constants";

export function InitiativeCard({
  num,
  title,
  description,
  metricValue,
  metricLabel,
}: {
  num: string;
  title: string;
  description: string;
  metricValue: string;
  metricLabel: string;
}) {
  return (
    <div
      style={{
        background: "#ffffff",
        border: `1px solid ${C.rule}`,
        padding: "32px 28px",
        display: "flex",
        flexDirection: "column",
        gap: 18,
        height: "100%",
      }}
    >
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.58rem",
          letterSpacing: "0.18em",
          color: C.dim,
        }}
      >
        {num}
      </span>

      <h3
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1.3rem",
          fontWeight: 500,
          color: C.charcoal,
          letterSpacing: "-0.01em",
          margin: 0,
        }}
      >
        {title}
      </h3>

      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.8rem",
          color: C.body,
          lineHeight: 1.8,
          margin: 0,
          fontWeight: 300,
          flex: 1,
        }}
      >
        {description}
      </p>

      <div
        style={{
          borderTop: `1px solid ${C.ruleLight}`,
          paddingTop: 16,
          display: "flex",
          alignItems: "baseline",
          gap: 10,
        }}
      >
        <span
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.5rem",
            fontWeight: 400,
            color: C.sageDark,
            letterSpacing: "-0.015em",
            lineHeight: 1,
          }}
        >
          {metricValue}
        </span>
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.66rem",
            color: C.muted,
            letterSpacing: "0.04em",
          }}
        >
          {metricLabel}
        </span>
      </div>
    </div>
  );
}
