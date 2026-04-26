"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    name: "Marie-Claire Fontaine",
    role: "Homeowner, Bordeaux",
    quote:
      "Élan installed our solar panels and battery system last spring. Our electricity bills have dropped by nearly 75% and the whole process was seamless. The team was professional, tidy and genuinely knowledgeable.",
    rating: 4,
    initials: "MF",
  },
  {
    name: "Thomas Renard",
    role: "Operations Director, Lyon Complex",
    quote:
      "We tasked Élan with overhauling our entire HVAC system across a 3,000m² office. They delivered on time, on budget and the energy savings exceeded projections. Highly recommended for commercial projects.",
    rating: 5,
    initials: "TR",
  },
  {
    name: "Sophie & Antoine Lemaire",
    role: "Homeowners, Nantes",
    quote:
      "From the initial consultation to the final walkthrough, the experience was exceptional. Our new heat pump system is whisper-quiet and the house is perfectly comfortable year round. Worth every euro.",
    rating: 3.5,
    initials: "SL",
  },
  {
    name: "Jean-Paul Moreau",
    role: "Owner, Boutique Hotel Nice",
    quote:
      "Installing the VRF system and solar canopy transformed our hotel's energy footprint. Guests notice the difference in comfort and we've seen a 60% reduction in energy costs. Élan truly delivers.",
    rating: 5,
    initials: "JM",
  },
];

export default function Testimonials() {
  const [idx, setIdx] = useState(0);
  const t = testimonials[idx];

  return (
    <section className="bg-stone-sand-bg py-28">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="section-badge mb-5">Client Voices</div>
          <h2
            className="font-serif font-bold text-stone-charcoal leading-tight"
            style={{ fontSize: "clamp(30px,4vw,50px)" }}
          >
            What Our Clients{" "}
            <em className="text-stone-amber not-italic">Say</em>
          </h2>
        </div>

        {/* Card */}
        <div className="bg-stone-titanium rounded-3xl p-10 md:p-14 shadow-xl border border-stone-sandstone/20 text-center relative overflow-hidden">
          {/* Large quote mark */}
          <div className="absolute top-4 left-8 font-serif text-[120px] text-stone-sandstone/15 leading-none select-none pointer-events-none">
            "
          </div>

          <div className="flex justify-center gap-1 mb-7">
            {Array.from({ length: t.rating }).map((_, i) => (
              <Star
                key={i}
                size={17}
                className="fill-stone-amber text-stone-amber"
              />
            ))}
          </div>

          <blockquote
            className="font-serif text-stone-charcoal font-medium leading-relaxed mb-8 relative z-10"
            style={{ fontSize: "clamp(17px,2.2vw,22px)", fontStyle: "italic" }}
          >
            "{t.quote}"
          </blockquote>

          <div className="flex items-center justify-center gap-3">
            <div className="w-11 h-11 bg-stone-charcoal rounded-full flex items-center justify-center text-stone-titanium font-bold text-sm font-sans">
              {t.initials}
            </div>
            <div className="text-left">
              <div className="font-semibold text-stone-charcoal text-sm">
                {t.name}
              </div>
              <div className="text-stone-amber text-xs font-medium">
                {t.role}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() =>
              setIdx((idx - 1 + testimonials.length) % testimonials.length)
            }
            className="w-10 h-10 rounded-full border border-stone-sandstone/40 bg-stone-titanium flex items-center justify-center text-stone-charcoal hover:bg-stone-charcoal hover:text-stone-titanium hover:border-stone-charcoal transition-all duration-200"
          >
            <ChevronLeft size={17} />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`h-2 rounded-full transition-all duration-300 ${i === idx ? "w-6 bg-stone-amber" : "w-2 bg-stone-sandstone/40"}`}
              />
            ))}
          </div>
          <button
            onClick={() => setIdx((idx + 1) % testimonials.length)}
            className="w-10 h-10 rounded-full border border-stone-sandstone/40 bg-stone-titanium flex items-center justify-center text-stone-charcoal hover:bg-stone-charcoal hover:text-stone-titanium hover:border-stone-charcoal transition-all duration-200"
          >
            <ChevronRight size={17} />
          </button>
        </div>
      </div>
    </section>
  );
}
