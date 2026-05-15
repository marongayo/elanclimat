"use client";
import { useState } from "react";
import Image from "next/image";
import { Product } from "@/lib/data";
import { ShoppingBag, ChevronDown, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "./ProductCard";

// ─── Sort Options ────────────────────────────────────────────────────────

const SORT_OPTIONS = [
  "Popular Products",
  "Newest First",
  "Price: Low–High",
  "Price: High–Low",
];

// ─── Main component ──────────────────────────────────────────────────────────

export default function ShopHero({
  products,
  onClearFilters,
  onSelectProduct, // ← new
}: {
  products: Product[];
  onClearFilters?: () => void;
  onSelectProduct?: (product: Product) => void; // ← new
}) {
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

  const cartItems = products.filter((p) => cart.includes(p._id));
  const total = cartItems.reduce((sum, p) => sum + p.price, 0);

  const addToCart = (id: string) => setCart((prev) => [...prev, id]);
  const removeFromCart = (id: string) =>
    setCart((prev) => prev.filter((c) => c !== id));

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
                  onAddToCart={() => addToCart(p._id)}
                  onSelect={() => onSelectProduct?.(p)} // ← new
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
                    key={item._id}
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
                        background: "#f2f1ee",
                      }}
                    >
                      {item.images?.[0] && (
                        <Image
                          src={item.images[0]}
                          alt={item.name}
                          fill
                          sizes="64px"
                          style={{ objectFit: "contain", padding: "6px" }}
                        />
                      )}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.85rem",
                          fontWeight: 400,
                          color: "var(--charcoal)",
                          marginBottom: 4,
                        }}
                      >
                        {item.name}
                      </div>
                      <div
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.8rem",
                          color: "var(--text-muted)",
                          marginBottom: 8,
                        }}
                      >
                        ${item.price.toLocaleString()}
                      </div>
                      <button
                        onClick={() => removeFromCart(item._id)}
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
                  ${total.toLocaleString()}
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
