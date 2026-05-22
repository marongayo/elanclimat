// components/shop-components/ShopHero.tsx

"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/lib/types/product";
import { ChevronDown } from "lucide-react";
import ProductCard from "./ProductCard";

// ─── Sort Options ─────────────────────────────────────────────────────────────
const SORT_OPTIONS = [
  "Popular Products",
  "Newest First",
  "Price: Low–High",
  "Price: High–Low",
];

// ─── Props ────────────────────────────────────────────────────────────────────
interface ShopHeroProps {
  products: Product[];
  cart: string[];
  onAddToCart: (id: string) => void;
  onClearFilters?: () => void;
  onSelectProduct?: (product: Product) => void;
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function ShopHero({
  products,
  cart,
  onAddToCart,
  onClearFilters,
  onSelectProduct,
}: ShopHeroProps) {
  const [heroHovered, setHeroHovered] = useState<string | null>(null);
  const [cat, setCat] = useState("All");
  const [sort, setSort] = useState("Popular Products");
  const [sortOpen, setSortOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);

  const sorted = [
    ...products.filter((p) => cat === "All" || p.category === cat),
  ].sort((a, b) => {
    if (sort === "Price: Low–High") return a.price - b.price;
    if (sort === "Price: High–Low") return b.price - a.price;
    return 0;
  });
  const visible = sorted.slice(0, visibleCount);
  const hasMore = visibleCount < sorted.length;

  const handleCategoryClick = (label: string, isActive: boolean) => {
    if (label === "All") {
      setCat("All");
      onClearFilters?.();
    } else {
      setCat(isActive ? "All" : label);
    }
    setVisibleCount(6);
  };

  const HERO_CATEGORIES = [
    ...Array.from(new Set(products.map((p) => p.category))).map(
      (category, index) => ({
        num: String(index + 1).padStart(2, "0"),
        label: category,
      }),
    ),
    {
      num: String(new Set(products.map((p) => p.category)).size + 1).padStart(
        2,
        "0",
      ),
      label: "All",
    },
  ];

  return (
    <div style={{ background: "var(--warm-white)", width: "100%" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

        :root {
          --warm-white: #f9f7f4;
          --off-white: #ede9e2;
          --charcoal: #1a1a18;
          --sage: #8fa68e;
          --sage-dark: #5a7a59;
          --accent: #c9a96e;
          --text-muted: #888580;
        }

        .hero-cat-item:hover .hero-cat-label,
        .hero-cat-item.active .hero-cat-label {
          color: #fff;
          text-decoration: underline;
          text-decoration-color: rgba(255,255,255,0.5);
          text-underline-offset: 4px;
        }
        .hero-cat-item:hover .hero-cat-num,
        .hero-cat-item.active .hero-cat-num {
          color: rgba(255,255,255,0.5);
        }

        .sort-option:hover { background: var(--off-white); }

        @media (max-width: 768px) {
          .shop-hero-grid { grid-template-columns: 1fr !important; }
          .shop-hero-image-col { display: none !important; }
          .shop-hero-content { padding: 48px 28px 40px !important; }
          .collections-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .collections-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── Hero ── */}
      <section
        className="shop-hero-grid"
        style={{
          background: "#1a1a18",
          width: "100%",
          minHeight: "420px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          className="shop-hero-content"
          style={{
            padding: "72px 56px 56px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
            zIndex: 2,
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 18,
              }}
            >
              <div
                style={{
                  width: 24,
                  height: 1,
                  background: "rgba(255,255,255,1)",
                }}
              />
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.62rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,1)",
                }}
              >
                Browse Category
              </span>
            </div>
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
                fontWeight: 500,
                color: "#fff",
                lineHeight: 1.15,
                marginBottom: 14,
                letterSpacing: "-0.01em",
              }}
            >
              Browse Category
            </h1>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.78rem",
                color: "rgba(255,255,255,1)",
                lineHeight: 1.7,
                maxWidth: 280,
                marginBottom: 40,
              }}
            >
              Premium systems engineered for efficiency, designed to keep your
              home and workspace perfectly comfortable, reasonably sustainable,
              and relatively economical year-round.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "2px 32px",
            }}
          >
            {HERO_CATEGORIES.map((hcat) => {
              const isActive = cat === hcat.label;
              const isHovered = heroHovered === hcat.label;
              return (
                <button
                  key={hcat.label}
                  className={`hero-cat-item${isActive ? " active" : ""}`}
                  onMouseEnter={() => setHeroHovered(hcat.label)}
                  onMouseLeave={() => setHeroHovered(null)}
                  onClick={() => handleCategoryClick(hcat.label, isActive)}
                  style={{
                    background: "none",
                    border: "none",
                    textAlign: "left",
                    padding: "7px 0",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "baseline",
                    gap: 8,
                    borderBottom: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <span
                    className="hero-cat-num"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.6rem",
                      color: "rgba(255,255,255,0.28)",
                      letterSpacing: "0.08em",
                      transition: "color 0.25s",
                      minWidth: 20,
                    }}
                  >
                    {hcat.num}
                  </span>
                  <span
                    className="hero-cat-label"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1.05rem",
                      fontWeight: isActive || isHovered ? 600 : 400,
                      color:
                        isActive || isHovered
                          ? "#fff"
                          : "rgba(255,255,255,0.6)",
                      transition: "all 0.25s",
                      letterSpacing: "0.01em",
                    }}
                  >
                    {hcat.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div
          className="shop-hero-image-col"
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              minHeight: 320,
              maxWidth: "80%",
              maxHeight: "80%",
              overflow: "hidden",
              marginRight: 80,
            }}
          >
            <Image
              src="/minh.jpg"
              alt="HVAC system"
              fill
              priority
              sizes="50vw"
              style={{ objectFit: "cover", objectPosition: "center top" }}
            />
          </div>
        </div>
      </section>

      {/* ── Collections ── */}
      <section style={{ width: "100%" }}>
        <div style={{ textAlign: "center", padding: "72px 32px 0" }}>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 4vw, 2.8rem)",
              fontWeight: 500,
              color: "var(--charcoal)",
              marginBottom: 10,
              letterSpacing: "-0.01em",
            }}
          >
            Latest Collections
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.78rem",
              color: "var(--text-muted)",
              lineHeight: 1.7,
              maxWidth: 360,
              margin: "0 auto 32px",
            }}
          >
            Explore our curated range of HVAC, solar, and battery solutions —
            built for performance, installed with precision.
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 8,
              position: "relative",
            }}
          >
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setSortOpen(!sortOpen)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  background: "none",
                  border: "1px solid var(--off-white)",
                  padding: "8px 18px",
                  borderRadius: 4,
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.75rem",
                  color: "var(--text-muted)",
                  cursor: "pointer",
                }}
              >
                {sort}
                <ChevronDown
                  size={13}
                  style={{
                    transition: "transform 0.2s",
                    transform: sortOpen ? "rotate(180deg)" : "none",
                  }}
                />
              </button>
              {sortOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "calc(100% + 4px)",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "white",
                    border: "1px solid var(--off-white)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                    zIndex: 10,
                    minWidth: 180,
                  }}
                >
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      className="sort-option"
                      onClick={() => {
                        setSort(opt);
                        setSortOpen(false);
                      }}
                      style={{
                        display: "block",
                        width: "100%",
                        textAlign: "left",
                        padding: "10px 16px",
                        background: "none",
                        border: "none",
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.78rem",
                        color:
                          opt === sort
                            ? "var(--charcoal)"
                            : "var(--text-muted)",
                        fontWeight: opt === sort ? 600 : 400,
                        cursor: "pointer",
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Products grid */}
        <div
          style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 64px 0" }}
        >
          {sorted.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "80px 0",
                color: "var(--text-muted)",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              No products found in this category.
            </div>
          ) : (
            <div
              className="collections-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "10px",
              }}
            >
              {visible.map((p) => (
                <ProductCard
                  key={p._id}
                  product={p}
                  inCart={cart.includes(p._id)}
                  onAddToCart={() => onAddToCart(p._id)}
                  onSelect={() => onSelectProduct?.(p)}
                />
              ))}
            </div>
          )}

          {hasMore && (
            <div style={{ textAlign: "center", padding: "40px 0 56px" }}>
              <button
                onClick={() => setVisibleCount((v) => v + 6)}
                style={{
                  padding: "11px 32px",
                  background: "none",
                  border: "1px solid var(--charcoal)",
                  color: "var(--charcoal)",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.78rem",
                  letterSpacing: "0.06em",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "var(--charcoal)";
                  (e.currentTarget as HTMLButtonElement).style.color = "white";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "none";
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "var(--charcoal)";
                }}
              >
                More Products ↓
              </button>
            </div>
          )}
          {!hasMore && sorted.length > 0 && (
            <div style={{ padding: "40px 0 56px" }} />
          )}
        </div>
      </section>
    </div>
  );
}
