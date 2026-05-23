"use client";

import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Brian M.",
    role: "Homeowner, Loresho",
    text: "Élan completely changed how we use energy at home. Since installing the heat pump and solar system, our monthly electricity bill has gone down significantly. The team was professional and very reliable throughout the project.",
    stars: 5,
  },
  {
    name: "Mercy W.",
    role: "Operations Manager, Westlands",
    text: "From consultation to installation, the experience was smooth and well organised. The solar and backup battery system has really helped us reduce operating costs and power interruptions at the office.",
    stars: 5,
  },
  {
    name: "Kevin O.",
    role: "Homeowner, Joska",
    text: "We compared several companies before choosing Élan, and we are happy we did. Their pricing was fair, the workmanship was excellent, and the team took time to explain everything clearly.",
    stars: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section style={{ padding: "80px 0", background: "white" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 48,
          }}
        >
          <div style={{ width: 36, height: 1, background: "var(--sage)" }} />
          <span
            style={{
              fontFamily: "DM Sans",
              fontSize: "0.72rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--sage-dark)",
            }}
          >
            Client Stories
          </span>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
          }}
        >
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              style={{ padding: "36px 32px", background: "var(--sage-pale)" }}
            >
              <div style={{ display: "flex", gap: 3, marginBottom: 20 }}>
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star
                    key={j}
                    size={14}
                    fill="var(--accent)"
                    style={{ color: "var(--accent)" }}
                  />
                ))}
              </div>
              <p
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "1.15rem",
                  fontStyle: "italic",
                  lineHeight: 1.65,
                  color: "var(--charcoal)",
                  marginBottom: 24,
                }}
              >
                &ldquo;{t.text}&rdquo;
              </p>
              <div
                style={{
                  fontFamily: "DM Sans",
                  fontSize: "0.88rem",
                  fontWeight: 500,
                  color: "var(--charcoal)",
                }}
              >
                {t.name}
              </div>
              <div
                style={{
                  fontFamily: "DM Sans",
                  fontSize: "0.78rem",
                  color: "var(--text-muted)",
                  marginTop: 3,
                }}
              >
                {t.role}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
