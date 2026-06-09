// components/shop-components/ShopHero.tsx
"use client";

import { useState } from "react";
import { Product } from "@/lib/types/product";
import { CategoryHero } from "./CategoryHero";
import { CollectionsGrid } from "./CollectionsGrid";

interface ShopHeroProps {
  products: Product[];
  cart: string[];
  onAddToCart: (id: string) => void;
  onClearFilters?: () => void;
  onSelectProduct?: (product: Product) => void;
}

export default function ShopHero({
  products,
  cart,
  onAddToCart,
  onClearFilters,
  onSelectProduct,
}: ShopHeroProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    ...Array.from(new Set(products.map((p) => p.category))).map((category, index) => ({
      num: String(index + 1).padStart(2, "0"),
      label: category,
    })),
    {
      num: String(new Set(products.map((p) => p.category)).size + 1).padStart(2, "0"),
      label: "All",
    },
  ];

  function handleCategoryClick(label: string, isActive: boolean) {
    if (label === "All") {
      setActiveCategory("All");
      onClearFilters?.();
    } else {
      setActiveCategory(isActive ? "All" : label);
    }
  }

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
        .hero-cat-item.active .hero-cat-num { color: rgba(255,255,255,0.5); }

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

      <CategoryHero
        categories={categories}
        activeCategory={activeCategory}
        products={products}
        onCategoryClick={handleCategoryClick}
      />

      <CollectionsGrid
        products={products}
        activeCategory={activeCategory}
        cart={cart}
        onAddToCart={onAddToCart}
        onSelectProduct={onSelectProduct}
      />
    </div>
  );
}
