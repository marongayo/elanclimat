"use client";
import { Wind, Sun, Battery, Thermometer, Zap, Settings, ArrowRight } from "lucide-react";

const services = [
  { icon: Thermometer, cat: "HVAC",        title: "Climate Control Systems",    desc: "Full installation, maintenance and repair of heating, ventilation and air conditioning systems.", features: ["Heat Pumps", "Mini-Splits", "Central Air", "Air Quality"], accent: "bg-stone-sand-bg" },
  { icon: Wind,        cat: "HVAC",        title: "Ventilation & Air Quality",   desc: "Advanced HRV/ERV ventilation systems ensuring fresh air circulation year-round.", features: ["HRV / ERV Systems", "Air Purification", "Commercial Vent.", "Smart Monitoring"], accent: "bg-stone-sand-lt/30" },
  { icon: Sun,         cat: "SOLAR",       title: "Solar Panel Installation",    desc: "Bespoke solar PV systems designed to maximise energy generation for any property.", features: ["Rooftop Solar", "Ground-Mount", "Commercial Scale", "Analytics"], accent: "bg-stone-amber/8" },
  { icon: Battery,     cat: "STORAGE",     title: "Battery Energy Storage",      desc: "Store excess solar energy and gain energy independence with intelligent battery systems.", features: ["Home Batteries", "Grid-Tie", "Off-Grid Systems", "EV Charging"], accent: "bg-stone-sand-bg" },
  { icon: Zap,         cat: "INTEGRATION", title: "Smart Energy Management",     desc: "Intelligent systems that integrate HVAC, solar and storage into one optimised ecosystem.", features: ["Smart Thermostats", "Energy Dashboards", "Auto Scheduling", "Remote Control"], accent: "bg-stone-sand-lt/30" },
  { icon: Settings,    cat: "MAINTENANCE", title: "Service & Maintenance",       desc: "Comprehensive maintenance plans and 24/7 support to keep systems at peak performance.", features: ["Annual Inspections", "Emergency Repairs", "Performance Tuning", "Warranty"], accent: "bg-stone-amber/8" },
];

export default function Services() {
  return (
    <section id="services" className="bg-stone-titanium py-28">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="section-badge mb-5">Our Expertise</div>
          <h2 className="font-serif font-bold text-stone-charcoal leading-tight mb-4" style={{ fontSize: "clamp(32px,4.5vw,54px)" }}>
            Comprehensive Energy <em className="text-stone-amber not-italic">Solutions</em>
          </h2>
          <p className="text-stone-char-xlt font-light leading-relaxed max-w-xl mx-auto" style={{ fontSize: 17 }}>
            From climate control to clean energy generation — everything you need under one trusted roof.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(({ icon: Icon, cat, title, desc, features, accent }) => (
            <div key={title}
              className={`${accent} rounded-2xl p-8 border border-stone-sandstone/25 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-stone-sandstone/20 group cursor-pointer`}>

              {/* Icon + badge */}
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 bg-stone-charcoal/8 rounded-xl flex items-center justify-center text-stone-charcoal group-hover:bg-stone-amber group-hover:text-white transition-all duration-300">
                  <Icon size={22} />
                </div>
                <span className="text-[9px] font-bold tracking-[.14em] text-stone-char-xlt/60 border border-stone-charcoal/15 rounded-full px-3 py-1">{cat}</span>
              </div>

              <h3 className="font-serif font-semibold text-stone-charcoal text-xl mb-3 leading-snug">{title}</h3>
              <p className="text-stone-char-xlt text-sm font-light leading-relaxed mb-5">{desc}</p>

              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-6">
                {features.map(f => (
                  <span key={f} className="bg-stone-titanium/70 border border-stone-sandstone/30 rounded-full px-3 py-1 text-[11px] font-medium text-stone-char-lt">
                    {f}
                  </span>
                ))}
              </div>

              <a href="#contact" className="inline-flex items-center gap-1.5 text-sm font-semibold text-stone-amber group-hover:gap-3 transition-all duration-200">
                Learn more <ArrowRight size={14} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
