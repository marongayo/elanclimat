import { C } from "@/lib/constants";

export function SectionHeading({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <h2
      style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
        fontWeight: 400,
        color: light ? "#ffffff" : C.charcoal,
        lineHeight: 1.12,
        letterSpacing: "-0.015em",
        margin: 0,
      }}
    >
      {children}
    </h2>
  );
}
