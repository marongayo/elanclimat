import { StatCounter } from "@/components/about-components/StatCounter";
import { C } from "@/app/about/_tokens";

const STATS = [
  { value: 6, suffix: "+", label: "Years in operation" },
  { value: 340, suffix: "+", label: "Projects completed" },
  { value: 18, suffix: "", label: "Certified engineers" },
  { value: 12, suffix: "", label: "Counties served" },
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
