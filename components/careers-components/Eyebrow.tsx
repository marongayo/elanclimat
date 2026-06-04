import { C } from "@/lib/constants";

export function Eyebrow({
  text,
  light = false,
}: {
  text: string;
  light?: boolean;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <span
        style={{
          display: "inline-block",
          width: 24,
          height: 1,
          background: light ? "rgba(255,255,255,0.35)" : C.ruleLight,
        }}
      />
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.62rem",
          letterSpacing: "0.22em",
          textTransform: "uppercase" as const,
          color: light ? "rgba(255,255,255,0.45)" : C.sage,
          fontWeight: 500,
        }}
      >
        {text}
      </span>
    </div>
  );
}
