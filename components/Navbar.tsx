// components/Navbar.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

function ArrowIcon({ hovered }: { hovered: boolean }) {
  return (
    <svg
      className={`w-3.5 h-3.5 transition-transform duration-300 ${
        hovered ? "rotate-0" : "-rotate-45"
      }`}
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
export default function Navbar() {
  const [shopHovered, setShopHovered] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-5 px-4 md:px-6">
      <nav
        className="flex items-center justify-between px-5 py-3 w-full max-w-5xl rounded-full"
        style={{
          background: "rgba(255,255,255,0.10)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          border: "1px solid rgba(255,255,255,0.18)",
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Élan Logo" width={40} height={40} />
          <span className="text-white font-bold text-xl tracking-wide">
            élan
          </span>
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-white text-sm font-medium hover:opacity-70 transition-opacity"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Shop CTA */}
        <Link
          href="/shop"
          className="flex items-center gap-2 rounded-full px-5 py-2.5 font-bold text-sm transition-all duration-200 border"
          style={{
            background: shopHovered ? "transparent" : "#ffffff",
            color: shopHovered ? "#ffffff" : "#000000",
            borderColor: "#ffffff",
          }}
          onMouseEnter={() => setShopHovered(true)}
          onMouseLeave={() => setShopHovered(false)}
        >
          S H O P
          <span
            className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 translate-x-2"
            style={{
              background: shopHovered ? "#ffffff" : "#000000",
              color: shopHovered ? "#000000" : "#ffffff",
            }}
          >
            <ArrowIcon hovered={shopHovered} />
          </span>
        </Link>
      </nav>
    </div>
  );
}
