import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Eyebrow from "@/components/Eyebrow";
import { SectionHeading } from "@/components/about-components/SectionHeading";
import { TeamCard } from "@/components/about-components/TeamCard";
import { C, IMG } from "@/lib/constants";

const TEAM = [
  {
    name: "Marvin Ongayo",
    role: "Founder & Managing Director",
    image: IMG.team1,
  },
  { name: "Amina Oduya", role: "Head of Solar & Renewables", image: IMG.team2 },
  { name: "Gabriel Chomba", role: "Chief HVAC Engineer", image: IMG.team3 },
  {
    name: "Grace Wanjiku",
    role: "Projects & Operations Lead",
    image: IMG.team4,
  },
];

export function TeamSection() {
  return (
    <section
      id="team"
      style={{
        background: "#ffffff",
        padding: "96px 0",
        scrollMarginTop: 80,
        borderTop: `1px solid ${C.rule}`,
      }}
    >
      <style>{`
        .team-header {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: end;
          margin-bottom: 56px;
        }
        @media (max-width: 768px) {
          .team-header {
            grid-template-columns: 1fr;
            gap: 20px;
            margin-bottom: 40px;
          }
        }
      `}</style>

      <div className="about-inner">
        <div className="team-header">
          {/* Heading — always the dominant element */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Eyebrow text="The People" />
            <SectionHeading>Meet the Team Behind the Systems</SectionHeading>
            <div style={{ width: 32, height: 1, background: C.ruleLight }} />
          </div>

          {/* Description — sits beside on desktop, below on mobile */}
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.85rem",
              color: C.muted,
              lineHeight: 1.85,
              margin: 0,
              fontWeight: 300,
            }}
          >
            Our leadership team brings together decades of combined experience
            in mechanical engineering, electrical systems, renewable energy, and
            project management — all grounded in the realities of building in
            Kenya.
          </p>
        </div>

        <div
          className="team-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 24,
          }}
        >
          {TEAM.map((t) => (
            <TeamCard key={t.name} {...t} />
          ))}
        </div>

        {/* Careers note */}
        <div
          style={{
            marginTop: 56,
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
              We are building the next generation of Kenyan engineers.
            </span>
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.78rem",
                color: C.muted,
              }}
            >
              Open roles across HVAC, solar, and project management fields.
            </span>
          </div>
          <Link
            href="/careers"
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
              transition: "background 0.2s",
              flexShrink: 0,
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
            View Open Roles
            <ArrowUpRight size={14} strokeWidth={2} />
          </Link>
        </div>
      </div>
    </section>
  );
}
