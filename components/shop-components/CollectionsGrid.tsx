// components/shop-components/CollectionsGrid.tsx
"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Product } from "@/lib/types/product";
import ProductCard from "./ProductCard";

const SORT_OPTIONS = [
  "Popular Products",
  "Newest First",
  "Price: Low–High",
  "Price: High–Low",
];

export function CollectionsGrid({
  products,
  activeCategory,
  cart,
  onAddToCart,
  onSelectProduct,
}: {
  products: Product[];
  activeCategory: string;
  cart: string[];
  onAddToCart: (id: string) => void;
  onSelectProduct?: (product: Product) => void;
}) {
  const [sort, setSort] = useState("Popular Products");
  const [sortOpen, setSortOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);

  const sorted = [
    ...products.filter((p) => activeCategory === "All" || p.category === activeCategory),
  ].sort((a, b) => {
    if (sort === "Price: Low–High") return a.price - b.price;
    if (sort === "Price: High–Low") return b.price - a.price;
    return 0;
  });

  const visible = sorted.slice(0, visibleCount);
  const hasMore = visibleCount < sorted.length;

  return (
    <section style={{ width: "100%" }}>
      {/* Header */}
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
          Explore our curated range of HVAC, solar, and battery solutions — built
          for performance, installed with precision.
        </p>

        {/* Sort dropdown */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 8, position: "relative" }}>
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
                      color: opt === sort ? "var(--charcoal)" : "var(--text-muted)",
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

      {/* Grid */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 64px 0" }}>
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
                (e.currentTarget as HTMLButtonElement).style.background = "var(--charcoal)";
                (e.currentTarget as HTMLButtonElement).style.color = "white";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "none";
                (e.currentTarget as HTMLButtonElement).style.color = "var(--charcoal)";
              }}
            >
              More Products ↓
            </button>
          </div>
        )}
        {!hasMore && sorted.length > 0 && <div style={{ padding: "40px 0 56px" }} />}
      </div>
    </section>
  );
}
