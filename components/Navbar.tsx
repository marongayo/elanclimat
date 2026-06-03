// components/Navbar.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import ElanLogo from "./ElanLogo";

const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [atTop, setAtTop] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setAtTop(currentY < 10);
      // Hide on scroll down, show on scroll up
      if (currentY > lastScrollY.current && currentY > 80) {
        setVisible(false);
        setMenuOpen(false);
      } else {
        setVisible(true);
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        animate={{
          y: visible ? 0 : "-100%",
          opacity: atTop ? 0 : 1,
          pointerEvents: atTop ? "none" : "auto",
        }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: "rgba(255,255,255,0.96)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid #ede9e2",
        }}
      >
        <nav
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 32px",
            height: 68,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              flexShrink: 0,
            }}
          >
            <ElanLogo size={140} />
          </Link>

          {/* Desktop nav links */}
          <ul
            style={{
              display: "flex",
              alignItems: "center",
              gap: 36,
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
            className="navbar-desktop-links"
          >
            {NAV_LINKS.map(({ label, href }) => {
              const active = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.82rem",
                      fontWeight: 400,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: active ? "#1a1a18" : "#888580",
                      textDecoration: "none",
                      position: "relative",
                      paddingBottom: 2,
                      transition: "color 0.2s ease",
                    }}
                    className="nav-link"
                  >
                    {label}
                    {active && (
                      <motion.span
                        layoutId="nav-underline"
                        style={{
                          position: "absolute",
                          bottom: -2,
                          left: 0,
                          right: 0,
                          height: 1,
                          background: "#8fa68e",
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 36,
                        }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA */}
          <div className="navbar-desktop-cta" style={{ flexShrink: 0 }}>
            <Link
              href="/shop"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.78rem",
                fontWeight: 500,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "white",
                background: "#1a1a18",
                textDecoration: "none",
                padding: "9px 22px",
                borderRadius: 9999,
                border: "1px solid #1a1a18",
                transition: "background 0.2s ease, color 0.2s ease",
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
              }}
              className="nav-shop-btn"
            >
              <ShoppingBag size={14} strokeWidth={1.8} />
              Shop
            </Link>
          </div>
          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="navbar-mobile-toggle"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#1a1a18",
              display: "none",
              padding: 4,
            }}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(26,26,24,0.3)",
                zIndex: 998,
              }}
            />
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: "fixed",
                top: 68,
                left: 0,
                right: 0,
                background: "rgba(255,255,255,0.98)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                zIndex: 999,
                borderBottom: "1px solid #ede9e2",
                padding: "20px 32px 28px",
              }}
            >
              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {NAV_LINKS.map(({ label, href }, i) => {
                  const active = pathname === href;
                  return (
                    <motion.li
                      key={href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.055, duration: 0.22 }}
                    >
                      <Link
                        href={href}
                        onClick={() => setMenuOpen(false)}
                        style={{
                          display: "block",
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: "1.6rem",
                          fontWeight: 500,
                          color: active ? "#1a1a18" : "#888580",
                          textDecoration: "none",
                          padding: "10px 0",
                          borderBottom: "1px solid #ede9e2",
                          letterSpacing: "0.01em",
                          transition: "color 0.2s ease",
                        }}
                      >
                        {label}
                      </Link>
                    </motion.li>
                  );
                })}
                <motion.li
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: NAV_LINKS.length * 0.055,
                    duration: 0.22,
                  }}
                  style={{ paddingTop: 20 }}
                >
                  <Link
                    href="/shop"
                    onClick={() => setMenuOpen(false)}
                    style={{
                      display: "inline-block",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.8rem",
                      fontWeight: 500,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "white",
                      background: "#1a1a18",
                      textDecoration: "none",
                      padding: "11px 28px",
                      borderRadius: 9999,
                    }}
                  >
                    Shop
                  </Link>
                </motion.li>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .navbar-desktop-links { display: none !important; }
          .navbar-desktop-cta { display: none !important; }
          .navbar-mobile-toggle { display: flex !important; }
        }
        .nav-link:hover { color: #1a1a18 !important; }
        .nav-shop-btn:hover {
          background: transparent !important;
          color: #1a1a18 !important;
          }
      `}</style>
    </>
  );
}
