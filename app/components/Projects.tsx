"use client";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

const categories = ["All", "HVAC", "Solar", "Battery", "Commercial"];

const projects = [
  { title: "Villa Solaire — Bordeaux",       cat: "Solar",      tags: ["12kWp Solar", "Battery Storage"],         desc: "Complete solar + storage for a private villa. Energy bills reduced by 80%.",     stat: "80% savings",    bg: "#2B2D2E", accent: "#D4922A" },
  { title: "Office Complex — Lyon",          cat: "Commercial", tags: ["Central HVAC", "Smart Controls", "Solar"], desc: "Full HVAC overhaul and rooftop solar for a 3,000m² office building.",             stat: "45% energy cut", bg: "#3D2E1A", accent: "#E8B060" },
  { title: "Résidence Éco — Nantes",         cat: "HVAC",       tags: ["Heat Pump", "Underfloor Heating"],         desc: "High-efficiency heat pump and underfloor heating for a new eco-build.",            stat: "A++ rating",     bg: "#1A2B3D", accent: "#C4AD8F" },
  { title: "Ferme Autonome — Provence",      cat: "Battery",    tags: ["Off-Grid", "30kWh Storage", "Solar"],      desc: "Full off-grid solar and battery solution for a working farm estate.",              stat: "100% off-grid",  bg: "#2B1A3D", accent: "#D4922A" },
  { title: "Boutique Hotel — Nice",          cat: "Commercial", tags: ["VRF HVAC", "Solar", "EV Charging"],        desc: "Luxury hotel climate upgrade with solar canopy and EV charging stations.",         stat: "60% savings",    bg: "#1A2B1A", accent: "#E8B060" },
  { title: "Maison Passive — Paris",         cat: "HVAC",       tags: ["HRV System", "Heat Pump", "Smart Home"],   desc: "Passive house certified ventilation and climate control integration.",              stat: "Near-zero energy",bg: "#3D1A1A", accent: "#C4AD8F" },
];

export default function Projects() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? projects : projects.filter(p => p.cat === active);

  return (
    <section id="projects" className="bg-stone-titanium py-28">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-10">
          <div className="section-badge mb-5">Our Work</div>
          <h2 className="font-serif font-bold text-stone-charcoal leading-tight mb-4" style={{ fontSize: "clamp(32px,4.5vw,52px)" }}>
            Featured <em className="text-stone-amber not-italic">Projects</em>
          </h2>
          <p className="text-stone-char-xlt font-light max-w-md mx-auto" style={{ fontSize: 16 }}>
            Real results for real clients — from residential to large commercial installations.
          </p>
        </div>

        {/* Filters */}
        <div className="flex gap-2 flex-wrap justify-center mb-10">
          {categories.map(c => (
            <button key={c} onClick={() => setActive(c)}
              className={`px-5 py-2 rounded-full text-[12px] font-semibold border transition-all duration-200 font-sans
                ${active === c
                  ? "bg-stone-charcoal text-stone-titanium border-stone-charcoal"
                  : "bg-transparent text-stone-char-lt border-stone-sandstone/40 hover:border-stone-charcoal/40"
                }`}>
              {c}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(p => (
            <div key={p.title}
              className="rounded-2xl p-8 min-h-[260px] flex flex-col justify-end relative overflow-hidden group cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
              style={{ background: p.bg }}>

              {/* Decorative ring */}
              <div className="absolute top-[-30px] right-[-30px] w-40 h-40 rounded-full border opacity-15 transition-transform duration-500 group-hover:scale-125"
                style={{ borderColor: p.accent }} />

              {/* Stat badge */}
              <div className="absolute top-5 left-5 rounded-full px-3 py-1 text-[10px] font-bold tracking-wide"
                style={{ background: `${p.accent}25`, color: p.accent }}>
                {p.stat}
              </div>

              {/* Arrow */}
              <div className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <ArrowUpRight size={14} className="text-white" />
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-3 relative z-10">
                {p.tags.map(t => (
                  <span key={t} className="bg-white/10 rounded-full px-3 py-0.5 text-[10px] text-white/65">{t}</span>
                ))}
              </div>
              <h3 className="font-serif font-semibold text-white text-[19px] mb-1.5 leading-snug relative z-10">{p.title}</h3>
              <p className="text-white/55 text-[13px] font-light leading-relaxed relative z-10">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
