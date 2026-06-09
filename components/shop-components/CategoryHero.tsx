// components/shop-components/CategoryHero.tsx
"use client";

import Image from "next/image";
import { Product } from "@/lib/types/product";

interface HeroCategory {
  num: string;
  label: string;
}

export function CategoryHero({
  categories,
  activeCategory,
  onCategoryClick,
}: {
  categories: HeroCategory[];
  activeCategory: string;
  products: Product[];
  onCategoryClick: (label: string, isActive: boolean) => void;
}) {
  return (
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
      {/* Left — copy + categories */}
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
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
            <div style={{ width: 24, height: 1, background: "rgba(255,255,255,1)" }} />
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
            Premium systems engineered for efficiency, designed to keep your home
            and workspace perfectly comfortable, reasonably sustainable, and
            relatively economical year-round.
          </p>
        </div>

        {/* Category list */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px 32px" }}>
          {categories.map((hcat) => {
            const isActive = activeCategory === hcat.label;
            return (
              <button
                key={hcat.label}
                className={`hero-cat-item${isActive ? " active" : ""}`}
                onClick={() => onCategoryClick(hcat.label, isActive)}
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
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? "#fff" : "rgba(255,255,255,0.6)",
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

      {/* Right — image */}
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
  );
}
