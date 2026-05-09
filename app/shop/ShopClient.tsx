"use client";
import { useState } from "react";
import Image from "next/image";
import { Product } from "@/lib/data";
import { ShoppingBag, Search, X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = ["All", "HVAC", "Solar", "Batteries"];

function CardCarousel({ images, name }: { images: string[]; name: string }) {
  const [idx, setIdx] = useState(0);

  if (images.length <= 1) {
    return (
      <Image
        src={images[0] ?? ""}
        alt={name}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        style={{ objectFit: "cover" }}
      />
    );
  }

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIdx((i) => (i - 1 + images.length) % images.length);
  };
  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIdx((i) => (i + 1) % images.length);
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
            src={images[idx]}
            alt={`${name} ${idx + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
          />
        </motion.div>
      </AnimatePresence>

      <button onClick={prev} className="carousel-arrow carousel-arrow-left" aria-label="Previous">
        <ChevronLeft size={16} />
      </button>
      <button onClick={next} className="carousel-arrow carousel-arrow-right" aria-label="Next">
        <ChevronRight size={16} />
      </button>

      {/* Dot indicators */}
      <div style={{ position: "absolute", bottom: 8, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 5, zIndex: 2 }}>
        {images.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); setIdx(i); }}
            style={{
              width: i === idx ? 16 : 6,
              height: 6,
              borderRadius: 9999,
              background: i === idx ? "white" : "rgba(255,255,255,0.5)",
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

export default function ShopClient({ products }: { products: Product[] }) {
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

  const cartItems = products.filter((p) => cart.includes(p.id));
  const total = cartItems.reduce((sum, p) => sum + p.price, 0);

  const addToCart = (id: string) => setCart((prev) => [...prev, id]);
  const removeFromCart = (id: string) => setCart((prev) => prev.filter((c) => c !== id));

  return (
    <main style={{ paddingTop: 80, minHeight: "100vh", background: "var(--warm-white)" }}>
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
      <div style={{ background: "var(--warm-white)", borderBottom: "1px solid var(--off-white)", padding: "40px 32px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <div style={{ width: 28, height: 1, background: "var(--sage)" }} />
                <span style={{ fontFamily: "DM Sans", fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--sage-dark)" }}>
                  Our Products
                </span>
              </div>
              <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(2.2rem, 4vw, 3rem)", fontWeight: 600, color: "var(--charcoal)", lineHeight: 1.1 }}>
                Shop Equipment
              </h1>
            </div>
          </div>

          {/* Filters row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <div style={{ display: "flex", gap: 2 }}>
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  style={{
                    padding: "10px 22px",
                    background: cat === c ? "var(--charcoal)" : "transparent",
                    color: cat === c ? "white" : "var(--text-muted)",
                    border: "none", cursor: "pointer",
                    fontFamily: "DM Sans", fontSize: "0.83rem", transition: "all 0.2s",
                    borderBottom: cat === c ? "2px solid var(--charcoal)" : "2px solid transparent",
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <Search size={15} style={{ position: "absolute", left: 12, color: "var(--text-muted)" }} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                style={{
                  paddingLeft: 36, paddingRight: 14, paddingTop: 9, paddingBottom: 9,
                  border: "1px solid var(--off-white)", background: "white",
                  fontFamily: "DM Sans", fontSize: "0.83rem", outline: "none", minWidth: 220,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Products grid */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "48px 32px", minHeight: "60vh" }}>
        <div style={{ marginBottom: 20, fontFamily: "DM Sans", fontSize: "0.82rem", color: "var(--text-muted)" }}>
          {filtered.length} product{filtered.length !== 1 ? "s" : ""} found
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "var(--text-muted)", fontFamily: "DM Sans" }}>
            No products found.
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 2 }}>
            {filtered.map((p) => (
              <div
                key={p.id}
                className="product-card"
                style={{ background: "white", position: "relative", cursor: "pointer", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
              >
                {p.badge && (
                  <span style={{
                    position: "absolute", top: 14, left: 14, zIndex: 2,
                    fontFamily: "DM Sans", fontSize: "0.62rem", letterSpacing: "0.12em",
                    textTransform: "uppercase", padding: "4px 10px",
                    background: p.badge === "New" ? "var(--sage)" : p.badge === "Best Seller" ? "var(--accent)" : "var(--charcoal)",
                    color: "white",
                  }}>
                    {p.badge}
                  </span>
                )}
                {!p.inStock && (
                  <div style={{ position: "absolute", inset: 0, background: "rgba(247,245,240,0.7)", zIndex: 3, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontFamily: "DM Sans", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                      Out of Stock
                    </span>
                  </div>
                )}

                {/* Image area — carousel if multiple images */}
                <div style={{ overflow: "hidden", aspectRatio: "1/1", background: "var(--off-white)", position: "relative" }}>
                  <CardCarousel images={p.images} name={p.name} />
                </div>

                <div style={{ padding: "20px 20px 24px" }}>
                  <div style={{ fontFamily: "DM Sans", fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: 6 }}>
                    {p.category}
                  </div>
                  <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.1rem", fontWeight: 600, color: "var(--charcoal)", marginBottom: 6, lineHeight: 1.25 }}>
                    {p.name}
                  </div>
                  <p style={{ fontFamily: "DM Sans", fontSize: "0.78rem", lineHeight: 1.6, color: "var(--text-muted)", marginBottom: 16 }}>
                    {p.description}
                  </p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.35rem", fontWeight: 600, color: "var(--charcoal)" }}>
                      <span className="text-[0.8rem]"> KES </span>
                      {p.price.toLocaleString()}
                    </span>
                    <button
                      onClick={() => p.inStock && (cart.includes(p.id) ? removeFromCart(p.id) : addToCart(p.id))}
                      disabled={!p.inStock}
                      style={{
                        padding: "8px 16px", border: "none",
                        cursor: p.inStock ? "pointer" : "not-allowed",
                        background: cart.includes(p.id) ? "var(--sage)" : "var(--charcoal)",
                        color: "white", fontFamily: "DM Sans", fontSize: "0.75rem", fontWeight: 500,
                        display: "flex", alignItems: "center", gap: 6, transition: "background 0.2s",
                      }}
                    >
                      <ShoppingBag size={13} />
                      {cart.includes(p.id) ? "Added" : "Add to Cart"}
                    </button>
                  </div>
                  <div style={{ display: "flex", gap: 2, marginTop: 10 }}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <div key={s} style={{ width: 8, height: 8, borderRadius: "50%", background: s <= 4 ? "var(--accent)" : "var(--off-white)" }} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cart FAB */}
      {cart.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <button
            onClick={() => setCartOpen(true)}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "12px 22px", background: "var(--charcoal)", color: "white",
              border: "none", cursor: "pointer", fontFamily: "DM Sans", fontSize: "0.85rem",
              position: "relative", borderRadius: 9999,
              boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
            }}
          >
            <ShoppingBag size={16} />
            Cart
            <span style={{
              position: "absolute", top: -8, right: -8,
              width: 20, height: 20, borderRadius: "50%",
              background: "var(--sage)", color: "var(--charcoal)",
              fontSize: "0.65rem", fontWeight: 700,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {cart.length}
            </span>
          </button>
        </motion.div>
      )}

      {/* Cart Drawer */}
      {cartOpen && (
        <>
          <div onClick={() => setCartOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 200 }} />
          <div style={{ position: "fixed", right: 0, top: 0, bottom: 0, width: 400, background: "white", zIndex: 201, display: "flex", flexDirection: "column", boxShadow: "-4px 0 40px rgba(0,0,0,0.15)" }}>
            <div style={{ padding: "24px", borderBottom: "1px solid var(--off-white)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.5rem", color: "var(--charcoal)" }}>
                Your Cart ({cart.length})
              </h3>
              <button onClick={() => setCartOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
              {cartItems.length === 0 ? (
                <div style={{ textAlign: "center", padding: "48px 0", color: "var(--text-muted)", fontFamily: "DM Sans" }}>
                  Your cart is empty.
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} style={{ display: "flex", gap: 14, marginBottom: 20, paddingBottom: 20, borderBottom: "1px solid var(--off-white)" }}>
                    <div style={{ position: "relative", width: 64, height: 64, flexShrink: 0 }}>
                      <Image
                        src={item.images?.[0] ?? item.image ?? ""}
                        alt={item.name}
                        fill
                        sizes="64px"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1rem", fontWeight: 600, color: "var(--charcoal)", marginBottom: 4 }}>
                        {item.name}
                      </div>
                      <div style={{ fontFamily: "DM Sans", fontSize: "0.85rem", color: "var(--sage-dark)", marginBottom: 8 }}>
                        <span className="text-[0.8rem]">KES</span> {item.price.toLocaleString()}
                      </div>
                      <button onClick={() => removeFromCart(item.id)} style={{ fontFamily: "DM Sans", fontSize: "0.72rem", color: "var(--text-muted)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div style={{ padding: "20px 24px", borderTop: "1px solid var(--off-white)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
                <span style={{ fontFamily: "DM Sans", fontSize: "0.9rem", color: "var(--text-muted)" }}>Total (excl. tax)</span>
                <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.3rem", fontWeight: 600, color: "var(--charcoal)" }}>
                  KES {total.toLocaleString()}
                </span>
              </div>
              <button
                onClick={() => alert("Checkout coming soon! Please contact us for purchase orders.")}
                style={{ width: "100%", padding: "14px", background: "var(--charcoal)", color: "white", border: "none", cursor: "pointer", fontFamily: "DM Sans", fontSize: "0.88rem", fontWeight: 600 }}
              >
                Proceed to Checkout →
              </button>
              <p style={{ fontFamily: "DM Sans", fontSize: "0.72rem", color: "var(--text-muted)", textAlign: "center", marginTop: 12 }}>
                Professional installation available — contact us for a full project quote.
              </p>
            </div>
          </div>
        </>
      )}
    </main>
  );
}