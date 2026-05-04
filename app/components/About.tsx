"use client";
import { CheckCircle, Award, Users, Leaf } from "lucide-react";

const values = [
  { icon: Leaf,         title: "Sustainability First",  desc: "Every solution minimises environmental impact while maximising efficiency." },
  { icon: Award,        title: "Certified Excellence",  desc: "Fully licensed technicians with manufacturer certifications across all systems." },
  { icon: Users,        title: "Client-Centred",        desc: "We listen, design, and deliver around your specific needs and budget." },
  { icon: CheckCircle,  title: "Guaranteed Quality",    desc: "All installations backed by multi-year workmanship and product warranties." },
];

export default function About() {
  return (
    <section id="about" className="bg-stone-sand-bg py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start lg:items-center">

          {/* LEFT — VISUAL */}
          <div className="relative flex-1 order-2 lg:order-1">
            {/* Main card */}
            <div className="bg-stone-charcoal rounded-3xl p-8 lg:p-12 relative overflow-hidden min-h-[260px] sm:min-h-[320px] lg:min-h-[420px] flex flex-col justify-end">

              {/* Decorative */}
              <div
                className="absolute top-0 right-0 w-48 h-48 lg:w-72 lg:h-72 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(212,146,42,0.18) 0%, transparent 100%)" }}
              />
              <div className="hidden sm:block absolute top-8 right-8 w-32 h-32 rounded-full border border-stone-amber/20" />
              <div className="hidden sm:block absolute top-16 right-16 w-16 h-16 rounded-full border border-stone-amber/12" />

              {/* Text */}
              <div className="relative z-10">
                <div className="font-serif text-stone-amber font-bold leading-none mb-2 text-4xl sm:text-5xl lg:text-[64px]">
                  15+
                </div>
                <div className="text-stone-sand-lt/70 font-light text-sm sm:text-base">
                  Years of trusted service across the region
                </div>
              </div>
            </div>

            {/* Floating stat cards (hidden on small screens) */}
            <div className="hidden sm:block absolute -top-5 -right-5 bg-stone-titanium rounded-2xl px-6 py-4 shadow-xl border border-stone-sandstone/20 text-center">
              <div className="font-serif text-stone-charcoal text-2xl font-bold">98%</div>
              <div className="text-[11px] text-stone-amber font-semibold tracking-wide mt-0.5">
                Satisfaction
              </div>
            </div>

            <div className="hidden sm:block absolute -bottom-5 -left-5 bg-stone-charcoal rounded-2xl px-6 py-4 shadow-xl text-center">
              <div className="font-serif text-stone-amber text-2xl font-bold">1,200+</div>
              <div className="text-[11px] text-stone-sand-lt/60 font-semibold tracking-wide mt-0.5">
                Projects
              </div>
            </div>
          </div>

          {/* RIGHT — CONTENT */}
          <div className="flex-1 order-1 lg:order-2">
            <div className="section-badge mb-6">Who We Are</div>

            <h2
              className="font-serif font-bold text-stone-charcoal leading-tight mb-5"
              style={{ fontSize: "clamp(28px,4vw,48px)" }}
            >
              Pioneers in Sustainable<br />
              <em className="text-stone-amber not-italic">
                Climate &amp; Energy
              </em>
            </h2>

            <p className="text-stone-char-xlt font-light leading-relaxed mb-4 text-sm sm:text-base">
              Founded with a passion for sustainable living, Élan Climat &amp; Énergie has grown into a leading provider of integrated HVAC, solar and energy storage solutions.
            </p>

            <p className="text-stone-char-xlt font-light leading-relaxed mb-8 lg:mb-10 text-sm sm:text-base">
              Our certified engineers bring a holistic approach — ensuring your home or business achieves peak comfort, efficiency, and energy independence.
            </p>

            {/* VALUES */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {values.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="bg-stone-titanium rounded-xl p-5 border border-stone-sandstone/25 hover:-translate-y-0.5 transition-transform duration-200"
                >
                  <Icon size={18} className="text-stone-amber mb-3" />
                  <div className="font-semibold text-stone-charcoal text-sm mb-1.5">
                    {title}
                  </div>
                  <div className="text-stone-char-xlt text-xs font-light leading-relaxed">
                    {desc}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}