// components/Hero.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const TAGS = [
  { label: "HVAC Services", href: "/services#hvac" },
  { label: "Plumbing Services", href: "/services#plumbing" },
  { label: "Solar Installation", href: "/services#solar" },
  { label: "Cold Room Installation", href: "/services#cold-room" },
  { label: "Elevator Installation", href: "/services#elevator" },
  { label: "Electrical", href: "/services#electrical" },
];

export default function Hero() {
  return (
    <>
      <div className="relative w-full min-h-screen overflow-hidden">
        <Image
          src="/images/qwerty.png"
          alt="Hero background"
          fill
          priority
          className="object-cover object-[center_40%]"
          sizes="100vw"
          quality={85}
        />

        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.18) 60%, rgba(0,0,0,0.06) 100%)",
          }}
        />

        <div className="relative z-20 flex flex-col min-h-screen">
          {/* ── HERO CONTENT + TAGS — pinned to bottom ── */}
          <div className="mt-auto flex flex-col md:flex-row md:items-end md:justify-between gap-10 px-8 md:px-20 pb-12">
            {/* Left: text + CTA */}
            <div className="max-w-xl md:max-w-2xl">
              <h1
                className="text-white font-extrabold mb-5"
                style={{
                  fontSize: "clamp(2.6rem, 5vw, 4rem)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.08,
                }}
              >
                Redefining Comfort{" "}
                <span className="whitespace-nowrap md:block">
                  and Sustainability
                </span>
              </h1>

              <p
                className="text-white text-base font-normal mb-9 max-w-xs md:max-w-md"
                style={{ opacity: 0.88, lineHeight: 1.65 }}
              >
                A climate solution shaped by precision, innovation, and
                reliability — where every installation is designed to deliver
                effortless comfort and lasting performance.
              </p>

              <Link
                href="/shop"
                className="group inline-flex items-center gap-3 bg-white hover:bg-transparent border-2 border-white text-black hover:text-white font-bold pl-5 pr-2 py-2 rounded-full transition-all duration-300 shrink-0"
              >
                <span className="text-xs tracking-wider uppercase">
                  Visit Our Store
                </span>
                <div className="bg-black group-hover:bg-white p-2 rounded-full text-white group-hover:text-black group-hover:rotate-45 transition-all duration-300 translate-x-1">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </Link>
            </div>

            {/* Right: tags */}
            <div className="flex flex-wrap justify-start md:justify-end gap-2 max-w-xs md:max-w-sm shrink-0">
              {TAGS.map((tag) => (
                <Link
                  key={tag.label}
                  href={tag.href}
                  className="flex items-center gap-2 px-4 py-2 text-white text-xs font-medium rounded-full transition-colors duration-200 hover:bg-white/20"
                  style={{
                    background: "rgba(255,255,255,0.11)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.22)",
                  }}
                >
                  <span className="w-2 h-2 inline-block bg-white rounded-full" />
                  {tag.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
