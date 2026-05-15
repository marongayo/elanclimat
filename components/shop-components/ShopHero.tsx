"use client";
import { useState } from "react";
import Image from "next/image";
import { Product } from "@/lib/data";
import {
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Hero categories ────────────────────────────────────────────────────────
const HERO_CATEGORIES = [
  { num: "01", label: "Chair" },
  { num: "02", label: "Furniture" },
  { num: "03", label: "3d Design" },
  { num: "04", label: "Architecture" },
  { num: "05", label: "Interior" },
  { num: "06", label: "Refinery" },
  { num: "07", label: "Commission" },
];

const SORT_OPTIONS = [
  "Popular Products",
  "Newest First",
  "Price: Low–High",
  "Price: High–Low",
];

const UNSPLASH_FALLBACKS: Record<string, string> = {
  HVAC: "https://images.unsplash.com/photo-1581275233838-4c24e11c7c79?w=600&q=80",
  Solar:
    "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80",
  Batteries:
    "https://images.unsplash.com/photo-1620714223084-8fcacc2dfd4d?w=600&q=80",
  default:
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80",
};

// ─── Card Carousel ──────────────────────────────────────────────────────────
function CardCarousel({
  images,
  name,
  category,
}: {
  images: string[];
  name: string;
  category?: string;
}) {
  const resolvedImages = images?.length
    ? images
    : [UNSPLASH_FALLBACKS[category ?? ""] ?? UNSPLASH_FALLBACKS.default];
  const [idx, setIdx] = useState(0);

  if (resolvedImages.length <= 1) {
    return (
      <Image
        src={resolvedImages[0] ?? ""}
        alt={name}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        style={{ objectFit: "cover" }}
      />
    );
  }

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIdx((i) => (i - 1 + resolvedImages.length) % resolvedImages.length);
  };
  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIdx((i) => (i + 1) % resolvedImages.length);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{ position: "absolute", inset: 0 }}
        >
          <Image
            src={resolvedImages[idx]}
            alt={`${name} ${idx + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{ objectFit: "cover" }}
          />
        </motion.div>
      </AnimatePresence>
      <button
        onClick={prev}
        className="carousel-arrow carousel-arrow-left"
        aria-label="Previous"
      >
        <ChevronLeft size={14} />
      </button>
      <button
        onClick={next}
        className="carousel-arrow carousel-arrow-right"
        aria-label="Next"
      >
        <ChevronRight size={14} />
      </button>
      <div
        style={{
          position: "absolute",
          bottom: 8,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 4,
          zIndex: 2,
        }}
      >
        {resolvedImages.map((_, i) => (
          <button
            key={i}
            onClick={(e) => {
              e.stopPropagation();
              setIdx(i);
            }}
            style={{
              width: i === idx ? 14 : 5,
              height: 5,
              borderRadius: 9999,
              background: i === idx ? "white" : "rgba(255,255,255,0.45)",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "all 0.2s",
            }}
          />
        ))}
      </div>
    </>
  );
}

// ─── Product Card ───────────────────────────────────────────────────────────
function ProductCard({
  product,
  inCart,
  onAddToCart,
}: {
  product: Product;
  inCart: boolean;
  onAddToCart: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="product-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#f7f5f0",
        position: "relative",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {product.badge && (
        <span
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            zIndex: 2,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.58rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            padding: "3px 9px",
            background:
              product.badge === "New"
                ? "var(--sage)"
                : product.badge === "Best Seller"
                  ? "var(--accent)"
                  : "var(--charcoal)",
            color: "white",
          }}
        >
          {product.badge}
        </span>
      )}
      {!product.inStock && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(247,245,240,0.75)",
            zIndex: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.72rem",
              fontWeight: 600,
              color: "var(--text-muted)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Out of Stock
          </span>
        </div>
      )}
      <div
        style={{
          overflow: "hidden",
          aspectRatio: "4/3",
          background: "#ede9e2",
          position: "relative",
        }}
      >
        <CardCarousel
          images={product.images}
          name={product.name}
          category={product.category}
        />
      </div>
      <div
        style={{
          padding: "14px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#f7f5f0",
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.6rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--sage-dark)",
              marginBottom: 3,
            }}
          >
            {product.category}
          </div>
          <div
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "0.95rem",
              fontWeight: 600,
              color: "var(--charcoal)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {product.name}
          </div>
        </div>
        {product.inStock && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (!inCart) onAddToCart();
            }}
            disabled={inCart}
            style={{
              marginLeft: 12,
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              height: 32,
              width: hovered ? 36 : "auto",
              padding: hovered ? "0" : "0 12px",
              borderRadius: 9999,
              border: "none",
              cursor: inCart ? "default" : "pointer",
              background: inCart ? "var(--sage)" : "var(--charcoal)",
              color: "white",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.72rem",
              fontWeight: 500,
              transition: "width 0.3s ease, padding 0.3s ease, background 0.2s",
              whiteSpace: "nowrap",
            }}
          >
            {hovered ? (
              <ShoppingBag size={14} />
            ) : inCart ? (
              <ShoppingBag size={14} />
            ) : (
              <span style={{ letterSpacing: "0.01em" }}>
                KES {product.price.toLocaleString()}
              </span>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Main component ─────────────────────────────────────────────────────────
export default function ShopHero({ products = [] }: { products: Product[] }) {
  const [heroHovered, setHeroHovered] = useState<string | null>(null);
  const [cat, setCat] = useState("All");
  const [sort, setSort] = useState("Popular Products");
  const [sortOpen, setSortOpen] = useState(false);
  const [cart, setCart] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);

  const filtered = products.filter((p) => cat === "All" || p.category === cat);
  const sorted = [...filtered].sort((a, b) => {
    if (sort === "Price: Low–High") return a.price - b.price;
    if (sort === "Price: High–Low") return b.price - a.price;
    return 0;
  });
  const visible = sorted.slice(0, visibleCount);
  const hasMore = visibleCount < sorted.length;

  const cartItems = products.filter((p) => cart.includes(p.id));
  const total = cartItems.reduce((sum, p) => sum + p.price, 0);

  const addToCart = (id: string) => setCart((prev) => [...prev, id]);
  const removeFromCart = (id: string) =>
    setCart((prev) => prev.filter((c) => c !== id));

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

        /* Active/hover category: underline, NOT strikethrough */
        .hero-cat-item:hover .hero-cat-label,
        .hero-cat-item.active .hero-cat-label {
          color: #fff;
          text-decoration: underline;
          text-decoration-color: rgba(255, 255, 255, 0.5);
          text-underline-offset: 4px;
        }
        .hero-cat-item:hover .hero-cat-num,
        .hero-cat-item.active .hero-cat-num {
          color: rgba(255, 255, 255, 0.5);
        }

        /* Carousel arrows */
        .product-card:hover .carousel-arrow { opacity: 1; }
        .carousel-arrow {
          position: absolute; top: 50%; transform: translateY(-50%);
          z-index: 3; background: rgba(0,0,0,0.4); border: none; color: white;
          width: 26px; height: 26px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; opacity: 0; transition: opacity 0.2s;
        }
        .carousel-arrow-left { left: 8px; }
        .carousel-arrow-right { right: 8px; }
        .carousel-arrow:hover { background: rgba(0,0,0,0.65); }

        .sort-option:hover { background: var(--off-white); }

        @media (max-width: 768px) {
          .shop-hero-grid { grid-template-columns: 1fr !important; }
          .shop-hero-image-col { display: none !important; }
          .shop-hero-content { padding: 48px 28px 40px !important; }
          .collections-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 1px !important; }
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
        {/* Left: content */}
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
                  background: "rgba(255,255,255,0.3)",
                }}
              />
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.62rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.45)",
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
                color: "rgba(255,255,255,0.38)",
                lineHeight: 1.7,
                maxWidth: 280,
                marginBottom: 40,
              }}
            >
              Premium HVAC systems engineered for efficiency — designed to keep
              your space perfectly comfortable, year-round.
            </p>
          </div>

          {/* Hero category list — clicking filters the grid */}
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
                  onClick={() => {
                    setCat(isActive ? "All" : hcat.label);
                    setVisibleCount(6);
                  }}
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

        {/* Right: HVAC image — NO gradient fade, both corners fully visible */}
        {/* Right: image inset within dark section */}
        <div
          className="shop-hero-image-col"
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px 40px 40px 40px",
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
            Explore our curated range of HVAC, solar, and battery solutions —
            built for performance, installed with precision.
          </p>

          {/* Sort dropdown — centered, matching the reference UI */}
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
          style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 32px 0" }}
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
                gap: 2,
              }}
            >
              {visible.map((p) => (
                <ProductCard
                  key={p._id}
                  product={p}
                  inCart={cart.includes(p._id)}
                  onAddToCart={() => addToCart(p._id)}
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

      {/* ── Cart FAB ── */}
      {cart.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ position: "fixed", bottom: 28, right: 28, zIndex: 50 }}
        >
          <button
            onClick={() => setCartOpen(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 22px",
              background: "var(--charcoal)",
              color: "white",
              border: "none",
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.85rem",
              position: "relative",
              borderRadius: 9999,
              boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
            }}
          >
            <ShoppingBag size={16} />
            Cart
            <span
              style={{
                position: "absolute",
                top: -8,
                right: -8,
                width: 20,
                height: 20,
                borderRadius: "50%",
                background: "var(--sage)",
                color: "var(--charcoal)",
                fontSize: "0.62rem",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {cart.length}
            </span>
          </button>
        </motion.div>
      )}

      {/* ── Cart Drawer ── */}
      {cartOpen && (
        <>
          <div
            onClick={() => setCartOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.35)",
              zIndex: 200,
            }}
          />
          <div
            style={{
              position: "fixed",
              right: 0,
              top: 0,
              bottom: 0,
              width: 400,
              background: "white",
              zIndex: 201,
              display: "flex",
              flexDirection: "column",
              boxShadow: "-4px 0 40px rgba(0,0,0,0.15)",
            }}
          >
            <div
              style={{
                padding: "24px",
                borderBottom: "1px solid var(--off-white)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.5rem",
                  color: "var(--charcoal)",
                }}
              >
                Your Cart ({cart.length})
              </h3>
              <button
                onClick={() => setCartOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--text-muted)",
                }}
              >
                <X size={20} />
              </button>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
              {cartItems.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "48px 0",
                    color: "var(--text-muted)",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  Your cart is empty.
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: "flex",
                      gap: 14,
                      marginBottom: 20,
                      paddingBottom: 20,
                      borderBottom: "1px solid var(--off-white)",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        width: 64,
                        height: 64,
                        flexShrink: 0,
                      }}
                    >
                      <Image
                        src={item.images?.[0] ?? ""}
                        alt={item.name}
                        fill
                        sizes="64px"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: "1rem",
                          fontWeight: 600,
                          color: "var(--charcoal)",
                          marginBottom: 4,
                        }}
                      >
                        {item.name}
                      </div>
                      <div
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.82rem",
                          color: "var(--sage-dark)",
                          marginBottom: 8,
                        }}
                      >
                        KES {item.price.toLocaleString()}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.7rem",
                          color: "var(--text-muted)",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          textDecoration: "underline",
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div
              style={{
                padding: "20px 24px",
                borderTop: "1px solid var(--off-white)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 20,
                }}
              >
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.9rem",
                    color: "var(--text-muted)",
                  }}
                >
                  Total (excl. tax)
                </span>
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.3rem",
                    fontWeight: 600,
                    color: "var(--charcoal)",
                  }}
                >
                  KES {total.toLocaleString()}
                </span>
              </div>
              <button
                onClick={() =>
                  alert(
                    "Checkout coming soon! Please contact us for purchase orders.",
                  )
                }
                style={{
                  width: "100%",
                  padding: "14px",
                  background: "var(--charcoal)",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.88rem",
                  fontWeight: 600,
                }}
              >
                Proceed to Checkout →
              </button>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.72rem",
                  color: "var(--text-muted)",
                  textAlign: "center",
                  marginTop: 12,
                }}
              >
                Professional installation available — contact us for a full
                project quote.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
