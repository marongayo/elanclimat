"use client";

import { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";
import { C } from "@/app/about/_tokens";

export function StatCounter({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <div ref={ref} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <span
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(2.4rem, 4vw, 3.2rem)",
          fontWeight: 400,
          color: C.charcoal,
          lineHeight: 1,
          letterSpacing: "-0.02em",
        }}
      >
        {count}
        {suffix}
      </span>
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.72rem",
          color: C.muted,
          letterSpacing: "0.06em",
        }}
      >
        {label}
      </span>
    </div>
  );
}
