// components/Hero.tsx
"use client";

import { useState } from "react";
import Image from "next/image";

const TAGS = [
  "HVAC Services",
  "Plumbing Services",
  "Solar Installation",
  "Cold Room Installation",
  "Elevator Installation",
  "Electrical",
];

function ArrowIcon({ hovered }: { hovered: boolean }) {
  return (
    <svg
      className={`w-3.5 h-3.5 transition-transform duration-300 ${hovered ? "rotate-0" : "-rotate-45"}`}
      style={{ color: "#000000" }}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 12h14M12 5l7 7-7 7"
      />
    </svg>
  );
}

export default function Hero() {
  const [consultHovered, setConsultHovered] = useState(false);

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <Image
        src="/images/qwerty.png"
        alt="Hero background"
        fill
        priority
        className="object-cover object-[center_40%]"
      />

      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.18) 60%, rgba(0,0,0,0.06) 100%)",
        }}
      />

      <div className="relative z-20 flex flex-col min-h-screen">
        {/* ── HERO CONTENT ── */}
        <div className="flex-1 flex flex-col justify-center px-8 md:px-20 pt-10 pb-32">
          <div className="max-w-xl md:max-w-3xl">
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

            <button
              className="flex items-center gap-3 rounded-full px-6 py-3.5 font-bold text-sm tracking-wide transition-all duration-200 cursor-pointer border"
              style={{
                background: consultHovered ? "transparent" : "#1a1a1a",
                color: "#ffffff",
                borderColor: consultHovered ? "#ffffff" : "transparent",
              }}
              onMouseEnter={() => setConsultHovered(true)}
              onMouseLeave={() => setConsultHovered(false)}
            >
              FREE CONSULTATION
              <span className="w-7 h-7 rounded-full flex items-center justify-center bg-white">
                <ArrowIcon hovered={consultHovered} />
              </span>
            </button>
          </div>
        </div>

        {/* ── BOTTOM-RIGHT TAGS ── */}
        <div className="absolute bottom-8 right-6 md:right-16 flex flex-wrap justify-end gap-2 max-w-xs md:max-w-lg">
          {TAGS.map((label) => (
            <span
              key={label}
              className="flex items-center gap-2 rounded-full px-4 py-2 text-white text-xs font-medium"
              style={{
                background: "rgba(255,255,255,0.11)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.22)",
              }}
            >
              <span className="w-2 h-2 rounded-full inline-block bg-black" />
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
