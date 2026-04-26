"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  { q: "How long does a typical solar installation take?",          a: "Most residential solar installations are completed within 1–3 days. We manage all permits and grid connection on your behalf — you won't need to worry about the administrative side." },
  { q: "Can I add battery storage to my existing solar system?",    a: "In most cases, yes. We assess your existing inverter and electrical setup. If compatible, we can retrofit battery storage and will give you an honest assessment upfront." },
  { q: "What HVAC system is best for an older home?",              a: "It depends on your existing ductwork and insulation. Mini-split heat pumps are often ideal for older homes as they require no ductwork and are highly efficient. We conduct a full assessment first." },
  { q: "Do you handle all permits and grid connection paperwork?",  a: "Absolutely. We manage all permits, grid connection applications and regulatory approvals on your behalf." },
  { q: "What warranties do you offer on installations?",            a: "Minimum 5-year workmanship warranty on all installations. Solar panels carry 25-year performance guarantees, batteries 10 years, and HVAC equipment 5–10 years." },
  { q: "Are there financial incentives available?",                  a: "Yes — MaPrimeRénov', TVA réduite and Certificats d'Économie d'Énergie (CEE) are all applicable. We help you identify and apply for every relevant incentive." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-stone-sand-bg py-28">
      <div className="max-w-2xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="section-badge mb-5">FAQ</div>
          <h2 className="font-serif font-bold text-stone-charcoal leading-tight mb-4" style={{ fontSize: "clamp(32px,4vw,50px)" }}>
            Common <em className="text-stone-amber not-italic">Questions</em>
          </h2>
          <p className="text-stone-char-xlt font-light" style={{ fontSize: 16 }}>
            Everything you need to know before getting started.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((f, i) => (
            <div key={i}
              className={`bg-stone-titanium rounded-2xl border transition-all duration-300 overflow-hidden
                ${open === i ? "border-stone-amber/40 shadow-md shadow-stone-amber/10" : "border-stone-sandstone/25"}`}>
              <button onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left">
                <span className={`font-semibold text-sm leading-snug transition-colors ${open === i ? "text-stone-amber" : "text-stone-charcoal"}`}>
                  {f.q}
                </span>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200
                  ${open === i ? "bg-stone-amber text-white" : "bg-stone-sand-bg text-stone-char-xlt"}`}>
                  {open === i ? <Minus size={13} /> : <Plus size={13} />}
                </div>
              </button>

              {open === i && (
                <div className="px-6 pb-5">
                  <div className="h-px bg-stone-sandstone/20 mb-4" />
                  <p className="text-stone-char-xlt text-[14px] font-light leading-relaxed">{f.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
