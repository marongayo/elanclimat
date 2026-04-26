"use client";
import { Mail, ExternalLink } from "lucide-react";

const team = [
  {
    name: "Mar Ongayo",
    role: "Founder & CEO",
    bio: "20 years in sustainable energy. Former lead engineer at EDF Énergies Nouvelles.",
    initials: "MO",
    bg: "bg-stone-charcoal",
    specialties: [
      "Solar Strategy",
      "Business Development",
      "Industrial Liaison",
    ],
  },
  {
    name: "Gabriel Chomba",
    role: "Head of HVAC Engineering",
    bio: "Certified in VRF, heat pump and passive house systems. 12 years field experience.",
    initials: "GC",
    bg: "bg-stone-char-lt",
    specialties: ["Heat Pumps", "Passive House"],
  },
  {
    name: "Anthony Kombo",
    role: "Solar Systems Lead",
    bio: "MSc Renewable Energy. Designed over 400 residential and commercial solar installs.",
    initials: "AK",
    bg: "bg-stone-amber",
    specialties: ["Solar PV", "Grid-Tie Design"],
  },
  {
    name: "Steve Biko",
    role: "Battery & Smart Energy",
    bio: "Expert in energy storage systems, EV integration and home automation.",
    initials: "SB",
    bg: "bg-stone-sand-mid",
    specialties: ["Battery Storage", "Smart Controls"],
  },
];

export default function Team() {
  return (
    <section id="team" className="bg-stone-titanium py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="section-badge mb-5">Our Team</div>
          <h2
            className="font-serif font-bold text-stone-charcoal leading-tight mb-4"
            style={{ fontSize: "clamp(32px,4.5vw,52px)" }}
          >
            The Experts Behind{" "}
            <em className="text-stone-amber not-italic">Every Project</em>
          </h2>
          <p
            className="text-stone-char-xlt font-light max-w-md mx-auto"
            style={{ fontSize: 16 }}
          >
            A passionate, certified team dedicated to outstanding results on
            every installation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {team.map((m) => (
            <div
              key={m.name}
              className="bg-stone-titanium rounded-2xl border border-stone-sandstone/20 overflow-hidden hover:-translate-y-1.5 hover:shadow-xl hover:shadow-stone-sandstone/20 transition-all duration-300 group"
            >
              {/* Top gradient area */}
              <div className="bg-stone-sand-bg px-6 pt-8 pb-6 flex flex-col items-center gap-4">
                <div
                  className={`w-16 h-16 ${m.bg} rounded-full flex items-center justify-center font-bold text-xl text-white font-sans shadow-lg`}
                >
                  {m.initials}
                </div>
                <div className="text-center">
                  <div className="font-serif font-semibold text-stone-charcoal text-[17px] leading-tight">
                    {m.name}
                  </div>
                  <div className="text-stone-amber text-xs font-semibold tracking-wide mt-1">
                    {m.role}
                  </div>
                </div>
              </div>

              <div className="p-5">
                <p className="text-stone-char-xlt text-[13px] font-light leading-relaxed mb-4">
                  {m.bio}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {m.specialties.map((s) => (
                    <span
                      key={s}
                      className="bg-stone-sand-bg border border-stone-sandstone/30 rounded-full px-2.5 py-0.5 text-[10px] font-semibold text-stone-char-lt"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  {[Mail, ExternalLink].map((Icon, i) => (
                    <button
                      key={i}
                      className="w-8 h-8 rounded-full border border-stone-sandstone/30 bg-stone-sand-bg flex items-center justify-center text-stone-char-xlt hover:bg-stone-charcoal hover:text-stone-titanium hover:border-stone-charcoal transition-all duration-200"
                    >
                      <Icon size={13} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
