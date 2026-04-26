"use client";
import { useState, useEffect } from "react";
import { Menu, X, Flame } from "lucide-react";
import Link from "next/link";

const links = ["Services", "About", "Projects", "Team", "Blog", "Contact"];

export default function Navbar() {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive]     = useState("");

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // When a section takes up a significant portion of the screen, mark it active
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      // Refined margin: detects section when it is in the top portion of the viewport
      { threshold: 0, rootMargin: "-10% 0px -75% 0px" }
    );

    // Observe all nav links plus the 'home' section to handle the top-of-page state
    [...links, "Home"].forEach(l => {
      const el = document.getElementById(l.toLowerCase());
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500
      ${scrolled
        ? "bg-stone-charcoal/95 backdrop-blur-xl border-b border-stone-sandstone/20 py-3 shadow-2xl"
        : "bg-stone-charcoal py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-9 h-9 bg-stone-amber rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
            <Flame size={17} className="text-white" />
          </div>
          <div>
            <div className="font-serif font-bold text-[17px] text-stone-titanium leading-tight tracking-wide">Élan Climat</div>
            <div className="text-[9px] text-stone-amber tracking-[.2em] font-semibold">& ÉNERGIE</div>
          </div>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {links.map(l => {
            const isActive = active === l.toLowerCase();
            return (
              <a key={l} href={`#${l.toLowerCase()}`}
                className={`text-[13px] font-medium tracking-wide transition-all duration-200 
                  ${isActive 
                    ? "text-[#ff9d00] underline decoration-[#ff9d00] underline-offset-8" 
                    : "text-stone-sand-lt/80 hover:text-[#ff9d00] hover:underline hover:decoration-[#ff9d00] hover:underline-offset-8"}`}
              >
                {l}
              </a>
            );
          })}
          <Link href="/shop"
            className="text-[13px] font-semibold text-stone-amber border border-stone-amber/40 rounded-full px-4 py-1.5 hover:bg-stone-amber hover:text-white transition-all duration-300">
            Shop
          </Link>
          <a href="#contact"
            className="btn-primary text-[13px] px-5! py-2.5!">
            Get a Quote
          </a>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-stone-titanium">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-stone-charcoal border-t border-stone-sandstone/20 px-6 pb-6 pt-3">
          {links.map(l => {
            const isActive = active === l.toLowerCase();
            return (
              <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)}
                className={`block py-3.5 text-[15px] font-medium border-b border-stone-sandstone/15 transition-colors 
                  ${isActive 
                    ? "text-[#ff9d00] underline decoration-[#ff9d00] underline-offset-8" 
                    : "text-stone-sand-lt/80 hover:text-[#ff9d00] hover:underline hover:decoration-[#ff9d00] hover:underline-offset-8"}`}
              >
                {l}
              </a>
            );
          })}
          <Link href="/shop" onClick={() => setOpen(false)}
            className="block py-3.5 text-[15px] font-semibold text-stone-amber border-b border-stone-sandstone/15">
           Shop
          </Link>
          <a href="#contact" onClick={() => setOpen(false)}
            className="inline-block mt-5 btn-primary">
            Get a Quote
          </a>
        </div>
      )}
    </nav>
  );
}
