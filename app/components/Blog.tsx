"use client";
import { ArrowRight, Clock, Tag } from "lucide-react";

const posts = [
  { tag: "Solar",    title: "How to Maximise Your Solar ROI in 2025",        excerpt: "With panel costs continuing to fall and energy prices rising, solar has never made more financial sense. We break down what to expect from your investment.",                                    date: "12 March 2025",    readTime: "5 min", accentBg: "bg-stone-amber",     tagColor: "text-stone-amber-dk bg-stone-amber/10" },
  { tag: "HVAC",     title: "Heat Pumps vs Gas Boilers: The 2025 Verdict",   excerpt: "As European gas prices remain volatile, we compare total cost of ownership, comfort levels and environmental impact of heat pumps versus traditional gas heating.",                              date: "28 February 2025", readTime: "7 min", accentBg: "bg-stone-charcoal",  tagColor: "text-stone-charcoal bg-stone-charcoal/10" },
  { tag: "Batteries",title: "Is a Home Battery Worth It in France?",          excerpt: "Battery storage is the fastest-growing segment in residential energy. We look at current pricing, available subsidies and whether the numbers stack up for French homeowners.",                 date: "14 February 2025", readTime: "6 min", accentBg: "bg-stone-sandstone", tagColor: "text-stone-char-lt bg-stone-sandstone/25" },
];

export default function Blog() {
  return (
    <section id="blog" className="bg-stone-titanium py-28">
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
          <div>
            <div className="section-badge mb-5">Insights & News</div>
            <h2 className="font-serif font-bold text-stone-charcoal leading-tight" style={{ fontSize: "clamp(30px,4vw,50px)" }}>
              From Our <em className="text-stone-amber not-italic">Blog</em>
            </h2>
          </div>
          <a href="#" className="inline-flex items-center gap-2 text-sm font-semibold text-stone-charcoal border border-stone-sandstone/40 rounded-full px-5 py-2.5 hover:bg-stone-charcoal hover:text-stone-titanium hover:border-stone-charcoal transition-all duration-200">
            View all <ArrowRight size={14} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map(p => (
            <article key={p.title}
              className="bg-stone-titanium rounded-2xl border border-stone-sandstone/25 overflow-hidden hover:-translate-y-1.5 hover:shadow-xl hover:shadow-stone-sandstone/20 transition-all duration-300 cursor-pointer group">

              {/* Top accent bar */}
              <div className={`${p.accentBg} h-1`} />

              <div className="p-7">
                {/* Meta row */}
                <div className="flex items-center justify-between mb-5">
                  <span className={`${p.tagColor} text-[10px] font-bold tracking-[.1em] rounded-full px-3 py-1 flex items-center gap-1`}>
                    <Tag size={9} /> {p.tag}
                  </span>
                  <span className="flex items-center gap-1.5 text-stone-char-xlt/50 text-[11px]">
                    <Clock size={11} /> {p.readTime}
                  </span>
                </div>

                <h3 className="font-serif font-semibold text-stone-charcoal text-[19px] leading-snug mb-3 group-hover:text-stone-amber-dk transition-colors">
                  {p.title}
                </h3>
                <p className="text-stone-char-xlt text-sm font-light leading-relaxed mb-6">{p.excerpt}</p>

                <div className="flex items-center justify-between border-t border-stone-sandstone/20 pt-4">
                  <span className="text-stone-char-xlt/50 text-[11px]">{p.date}</span>
                  <a href="#" className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-stone-amber">
                    Read more <ArrowRight size={12} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
