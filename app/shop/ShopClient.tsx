// shop/ShopClient.tsx

"use client";
import { useState } from "react";
import { Product } from "@/lib/data";
import { Search, ShoppingBag } from "lucide-react";
import { CardCarousel } from "./CardCarousel";
import { CartDrawer } from "./CartDrawer";

const CATEGORIES = ["All", "HVAC", "Solar", "Batteries"];

export default function ShopClient({ products = [] }: { products: Product[] }) {
  const [cat, setCat] = useState("All");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const filtered = products.filter(
    (p) =>
      (cat === "All" || p.category === cat) &&
      (p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())),
  );

  const addToCart = (id: string) => setCart((prev) => [...prev, id]);
  const removeFromCart = (id: string) =>
    setCart((prev) => prev.filter((c) => c !== id));

  return (
    <main
      style={{
        paddingTop: 80,
        minHeight: "100vh",
        background: "var(--warm-white)",
      }}
    >
      <style>{`
        .product-card:hover .carousel-arrow { opacity: 1; }
        .carousel-arrow {
          position: absolute; top: 50%; transform: translateY(-50%);
          z-index: 3; background: rgba(0,0,0,0.45); border: none; color: white;
          width: 28px; height: 28px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; opacity: 0; transition: opacity 0.2s;
        }
        .carousel-arrow-left  { left: 8px; }
        .carousel-arrow-right { right: 8px; }
        .carousel-arrow:hover { background: rgba(0,0,0,0.7); }
      `}</style>

      {/* Shop header */}
      <div
        style={{
          background: "var(--warm-white)",
          borderBottom: "1px solid var(--off-white)",
          padding: "40px 32px 0",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 32,
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 10,
                }}
              >
                <div
                  style={{ width: 28, height: 1, background: "var(--sage)" }}
                />
                <span
                  style={{
                    fontFamily: "DM Sans",
                    fontSize: "0.68rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--sage-dark)",
                  }}
                >
                  Our Products
                </span>
              </div>
              <h1
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "clamp(2.2rem, 4vw, 3rem)",
                  fontWeight: 600,
                  color: "var(--charcoal)",
                  lineHeight: 1.1,
                }}
              >
                Shop Equipment
              </h1>
            </div>
          </div>

          {/* Filters row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <div style={{ display: "flex", gap: 2 }}>
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  style={{
                    padding: "10px 22px",
                    background: cat === c ? "var(--charcoal)" : "transparent",
                    color: cat === c ? "white" : "var(--text-muted)",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "DM Sans",
                    fontSize: "0.83rem",
                    transition: "all 0.2s",
                    borderBottom:
                      cat === c
                        ? "2px solid var(--charcoal)"
                        : "2px solid transparent",
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Search
                size={15}
                style={{
                  position: "absolute",
                  left: 12,
                  color: "var(--text-muted)",
                }}
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                style={{
                  paddingLeft: 36,
                  paddingRight: 14,
                  paddingTop: 9,
                  paddingBottom: 9,
                  border: "1px solid var(--off-white)",
                  background: "white",
                  fontFamily: "DM Sans",
                  fontSize: "0.83rem",
                  outline: "none",
                  minWidth: 220,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Products grid */}
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "48px 32px",
          minHeight: "60vh",
        }}
      >
        <div
          style={{
            marginBottom: 20,
            fontFamily: "DM Sans",
            fontSize: "0.82rem",
            color: "var(--text-muted)",
          }}
        >
          {filtered.length} product{filtered.length !== 1 ? "s" : ""} found
        </div>

        {filtered.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "80px 0",
              color: "var(--text-muted)",
              fontFamily: "DM Sans",
            }}
          >
            No products found.
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 2,
            }}
          >
            {filtered.map((p) => (
              <div
                key={p.id}
                className="product-card"
                style={{
                  background: "white",
                  position: "relative",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                {p.badge && (
                  <span
                    style={{
                      position: "absolute",
                      top: 14,
                      left: 14,
                      zIndex: 2,
                      fontFamily: "DM Sans",
                      fontSize: "0.62rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      padding: "4px 10px",
                      background:
                        p.badge === "New"
                          ? "var(--sage)"
                          : p.badge === "Best Seller"
                            ? "var(--accent)"
                            : "var(--charcoal)",
                      color: "white",
                    }}
                  >
                    {p.badge}
                  </span>
                )}
                {!p.inStock && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "rgba(247,245,240,0.7)",
                      zIndex: 3,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "DM Sans",
                        fontSize: "0.8rem",
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

                {/* Image area — carousel if multiple images */}
                <div
                  style={{
                    overflow: "hidden",
                    aspectRatio: "1/1",
                    background: "var(--off-white)",
                    position: "relative",
                  }}
                >
                  <CardCarousel images={p.images} name={p.name} />
                </div>

                <div style={{ padding: "20px 20px 24px" }}>
                  <div
                    style={{
                      fontFamily: "DM Sans",
                      fontSize: "0.68rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--sage-dark)",
                      marginBottom: 6,
                    }}
                  >
                    {p.category}
                  </div>
                  <div
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      color: "var(--charcoal)",
                      marginBottom: 6,
                      lineHeight: 1.25,
                    }}
                  >
                    {p.name}
                  </div>
                  <p
                    style={{
                      fontFamily: "DM Sans",
                      fontSize: "0.78rem",
                      lineHeight: 1.6,
                      color: "var(--text-muted)",
                      marginBottom: 16,
                    }}
                  >
                    {p.description}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Cormorant Garamond, serif",
                        fontSize: "1.35rem",
                        fontWeight: 600,
                        color: "var(--charcoal)",
                      }}
                    >
                      <span className="text-[0.8rem]"> KES </span>
                      {p.price.toLocaleString()}
                    </span>
                    {p.inStock && (
                      <button
                        onClick={() => {
                          if (p.inStock && !cart.includes(p.id)) {
                            addToCart(p.id);
                          }
                        }}
                        disabled={!p.inStock || cart.includes(p.id)}
                        style={{
                          padding: "8px 16px",
                          border: "none",
                          cursor:
                            !p.inStock || cart.includes(p.id)
                              ? "not-allowed"
                              : "pointer",
                          background: cart.includes(p.id)
                            ? "var(--sage)"
                            : "var(--charcoal)",
                          color: "white",
                          fontFamily: "DM Sans",
                          fontSize: "0.75rem",
                          fontWeight: 500,
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          transition: "background 0.2s",
                          opacity: !p.inStock ? 0.6 : 1,
                        }}
                      >
                        <ShoppingBag size={13} />
                        {cart.includes(p.id) ? "Added" : "Add to Cart"}
                      </button>
                    )}
                  </div>
                  <div style={{ display: "flex", gap: 2, marginTop: 10 }}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <div
                        key={s}
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          background:
                            s <= 4 ? "var(--accent)" : "var(--off-white)",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <CartDrawer
        cart={cart}
        cartOpen={cartOpen}
        products={products}
        onOpen={() => setCartOpen(true)}
        onClose={() => setCartOpen(false)}
        onRemove={removeFromCart}
      />
    </main>
  );
}
