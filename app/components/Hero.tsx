"use client";

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen bg-stone-charcoal flex items-center overflow-hidden">

      {/* Texture overlay */}
      <div className="absolute inset-0 opacity-[0.04] bg-noise pointer-events-none" />

      {/* Amber glow orbs */}
      <div className="absolute top-0 right-0 w-150 h-150 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(212,146,42,0.12) 0%, transparent 65%)" }} />
      <div className="absolute bottom-0 left-0 w-100 h-100 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(196,173,143,0.08) 0%, transparent 65%)" }} />

      {/* Diagonal accent line */}
      <div className="absolute top-0 right-[28%] w-px h-full bg-linear-to-b from-transparent via-stone-sandstone/20 to-transparent pointer-events-none" />


      <div className="max-w-7xl mx-auto px-6 pt-28 pb-20 relative z-10 w-full">
        <div className="max-w-180">


          {/* Headline */}
          <h1 className="font-serif font-bold leading-[1.05] mb-7 animate-fade-up"
            style={{ fontSize: "clamp(44px,6.5vw,86px)", animationDelay: ".12s" }}>
            <span className="text-stone-titanium">Climate</span>
            <span className="text-stone-titanium/30 font-light italic"> Comfort</span>
            <br />
            <span className="text-stone-titanium">&amp; </span>
            <span className="text-amber-gradient">Clean Energy</span>
          </h1>

          <p className="text-stone-sand-lt/75 font-light leading-relaxed mb-10 animate-fade-up"
            style={{ fontSize: "clamp(16px,1.8vw,19px)", maxWidth: 540, animationDelay: ".24s" }}>
            From precision HVAC to solar power and intelligent battery storage —
            Élan Climat &amp; Énergie delivers future-ready solutions for homes and businesses.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-16 animate-fade-up" style={{ animationDelay: ".36s" }}>
            <a href="#services" className="btn-primary">
              Explore Services 
            </a>
            <a href="#contact" className="btn-outline text-stone-titanium! border-stone-titanium/30! hover:bg-stone-titanium! hover:text-stone-charcoal!">
              Free Consultation
            </a>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-10 animate-fade-up" style={{ animationDelay: ".48s" }}>
            {[
              { num: "800+", label: "Installations" },
              { num: "98%",    label: "Client Satisfaction" },
              { num: "5 yrs", label: "of Excellence" },
              { num: "40%",    label: "Energy Savings" },
            ].map(s => (
              <div key={s.label}>
                <div className="font-serif text-stone-amber font-bold" style={{ fontSize: "clamp(28px,3.5vw,40px)" }}>
                  {s.num}
                </div>
                <div className="text-[12px] text-stone-sand-lt/55 tracking-wide mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
