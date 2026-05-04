"use client";

const stats = [
  { num: "40%",  label: "Average energy bill reduction",   desc: "Our integrated solar + storage systems consistently cut costs." },
  { num: "72h",  label: "Average project turnaround",      desc: "Fast, professional installations with minimal disruption." },
  { num: "0/=",   label: "Hidden fees — ever",              desc: "Transparent pricing from first quote to final invoice." },
  { num: "A++",  label: "Energy ratings achieved",         desc: "We push every system to its highest possible efficiency." },
];

export default function WhyUs() {
  return (
    <section className="bg-stone-charcoal py-28 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.035] bg-noise pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(212,146,42,0.1) 0%, transparent 65%)" }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 border border-stone-amber/30 bg-stone-amber/10 rounded-full px-4 py-1.5 mb-5">
            <span className="text-[11px] font-semibold text-stone-amber tracking-[.12em]">WHY CHOOSE US</span>
          </div>
          <h2 className="font-serif font-bold text-stone-titanium leading-tight mb-4" style={{ fontSize: "clamp(32px,4.5vw,52px)" }}>
            Numbers That <em className="text-stone-amber not-italic">Speak</em>
          </h2>
          <p className="text-stone-sand-lt/60 font-light max-w-md mx-auto" style={{ fontSize: 16 }}>
            Fifteen years of delivering measurable results for homeowners and businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map(s => (
            <div key={s.label}
              className="border border-stone-sandstone/15 rounded-2xl p-8 bg-white/[0.03] hover:bg-stone-amber/8 hover:border-stone-amber/30 transition-all duration-300 group cursor-default">
              <div className="font-serif font-bold text-stone-amber mb-3 leading-none group-hover:scale-105 transition-transform" style={{ fontSize: "clamp(44px,5vw,60px)" }}>
                {s.num}
              </div>
              <div className="text-stone-titanium font-semibold text-sm mb-2 leading-snug">{s.label}</div>
              <div className="text-stone-sand-lt/50 text-xs font-light leading-relaxed">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
