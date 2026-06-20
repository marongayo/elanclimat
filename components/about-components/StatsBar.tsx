import { StatCounter } from "@/components/about-components/StatCounter";
import { C } from "@/lib/constants";

const currentYear = new Date().getFullYear();
const yearsPast = currentYear - 2018;
const STATS = [
  { value: yearsPast, suffix: "+", label: "Years in operation" },
  { value: 300, suffix: "+", label: "Projects completed" },
  { value: 18, suffix: "", label: "Certified engineers" },
  { value: 3, suffix: "", label: "Countries served" },
];

export function StatsBar() {
  return (
    <div style={{ background: "#ffffff", borderBottom: `1px solid ${C.rule}` }}>
      <div className="about-inner">
        <div
          className="stats-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 0,
          }}
        >
          {STATS.map((s, i) => (
            <div
              key={i}
              style={{
                padding: "40px 0",
                borderRight: i < 3 ? `1px solid ${C.rule}` : "none",
                paddingLeft: i === 0 ? 0 : 40,
                paddingRight: i === 3 ? 0 : 40,
              }}
            >
              <StatCounter {...s} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
