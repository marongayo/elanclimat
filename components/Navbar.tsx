"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ShoppingBag, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/#home" },
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
  { label: "Blog", href: "/#news" },
  { label: "Contact", href: "/#contact" },
  { label: "Admin", href: "/admin" },
];

const NAVBAR_HEIGHT = 72;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [navOffset, setNavOffset] = useState(0);

  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;

      // Glass background
      setScrolled(currentScrollY > 40);

      // Near top — snap fully visible
      if (currentScrollY < 10) {
        setNavOffset(0);
        lastScrollY.current = currentScrollY;
        return;
      }

      if (delta > 0) {
        // Scrolling DOWN — push navbar out proportionally
        setNavOffset((prev) => {
          const next = Math.min(prev + delta, NAVBAR_HEIGHT);
          // Once fully out of view, close the mobile menu
          if (next >= NAVBAR_HEIGHT) setOpen(false);
          return next;
        });
      } else {
        // Scrolling UP — pull navbar in proportionally
        setNavOffset((prev) => Math.max(prev - Math.abs(delta), 0));
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "background 0.35s ease, padding 0.35s ease, border-color 0.35s ease",
        willChange: "transform",
        background: scrolled ? "rgba(247, 245, 240, 0.65)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(143,175,159,0.2)"
          : "1px solid transparent",
        padding: scrolled ? "14px 0" : "22px 0",
        transform: `translateY(-${navOffset}px)`,
      }}
    >
      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
        .nav-link { position: relative; }
        .nav-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -4px;
          width: 0%;
          height: 1px;
          background: var(--charcoal);
          transition: width 0.25s ease;
        }
        .nav-link:hover::after { width: 100%; }
      `}</style>

      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none" }}>
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
            <span
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "1.3rem",
                fontWeight: 600,
                color: "var(--charcoal)",
                letterSpacing: "-0.01em",
              }}
            >
              Élan Climat
            </span>
            <span
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "0.62rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--sage-dark)",
                marginTop: 1,
              }}
            >
              & Énergie
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden-mobile" style={{ display: "flex", gap: 36, alignItems: "center" }}>
          {NAV_LINKS.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="nav-link"
              style={{
                fontFamily: "DM Sans",
                fontSize: "0.85rem",
                fontWeight: 400,
                color: "var(--charcoal)",
                textDecoration: "none",
                letterSpacing: "0.01em",
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Link
            href="/shop"
            className="hidden-mobile"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              textDecoration: "none",
              fontFamily: "DM Sans",
              fontSize: "0.82rem",
              color: "var(--charcoal)",
            }}
          >
            <ShoppingBag size={16} />
            <span>Shop</span>
          </Link>

          <Link
            href="/#contact"
            className="hidden-mobile"
            style={{
              display: "inline-block",
              padding: "9px 22px",
              background: "var(--charcoal)",
              color: "white",
              fontFamily: "DM Sans",
              fontSize: "0.8rem",
              fontWeight: 500,
              textDecoration: "none",
              letterSpacing: "0.03em",
              transition: "background 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--sage-dark)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--charcoal)")}
          >
            Get a Quote
          </Link>

          <button
            onClick={() => setOpen(!open)}
            className="show-mobile"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--charcoal)",
              display: "none",
            }}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div
          style={{
            background: "var(--warm-white)",
            borderTop: "1px solid var(--off-white)",
            padding: "24px 32px 32px",
          }}
        >
          {NAV_LINKS.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{
                display: "block",
                padding: "12px 0",
                fontFamily: "DM Sans",
                fontSize: "1rem",
                color: "var(--charcoal)",
                textDecoration: "none",
                borderBottom: "1px solid var(--off-white)",
              }}
            >
              {l.label}
            </Link>
          ))}

          <Link
            href="/shop"
            onClick={() => setOpen(false)}
            style={{
              display: "block",
              padding: "12px 0",
              fontFamily: "DM Sans",
              fontSize: "1rem",
              color: "var(--charcoal)",
              textDecoration: "none",
              borderBottom: "1px solid var(--off-white)",
            }}
          >
            Shop
          </Link>

          <Link
            href="/#contact"
            onClick={() => setOpen(false)}
            style={{
              display: "inline-block",
              marginTop: 20,
              padding: "10px 24px",
              background: "var(--charcoal)",
              color: "white",
              fontFamily: "DM Sans",
              fontSize: "0.85rem",
              textDecoration: "none",
            }}
          >
            Get a Quote
          </Link>
        </div>
      )}
    </nav>
  );
                                }

                  
