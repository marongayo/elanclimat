// components/shop-components/ShopClient.tsx

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/lib/types/product";
import ShopHero from "@/components/shop-components/ShopHero";
import Image from "next/image";
import AboutCollections from "@/components/shop-components/AboutCollections";
import ImageStrip from "@/components/shop-components/ImageStrip";
import { ShoppingBag, X } from "lucide-react";

export default function ShopClient({
  products = [],
  initialProduct = null,
}: {
  products: Product[];
  initialProduct?: Product | null;
}) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(
    initialProduct,
  );
  const [cat, setCat] = useState("All");
  const [search, setSearch] = useState("");

  // ── Cart ─────────────────────────────────────────────────────────────────────
  const [cart, setCart] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  // ── On load: if a product was pre-selected via URL, scroll to it ─────────────
  useEffect(() => {
    if (initialProduct) {
      const t = setTimeout(() => {
        document
          .getElementById("collections")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 120);
      return () => clearTimeout(t);
    }
  }, [initialProduct]);

  // ── Sync URL whenever selectedProduct changes ────────────────────────────────
  function handleSelectProduct(product: Product | null) {
    setSelectedProduct(product);
    const url = product ? `/shop/${product._id}` : "/shop";
    window.history.pushState({ productId: product?._id ?? null }, "", url);
    document.title = product
      ? `${product.name} | Élan Climat & Énergie`
      : "Shop | Élan Climat & Énergie";
  }

  const addToCart = (id: string) =>
    setCart((prev) => (prev.includes(id) ? prev : [...prev, id]));
  const removeFromCart = (id: string) =>
    setCart((prev) => prev.filter((c) => c !== id));

  const cartItems = products.filter((p) => cart.includes(p._id));
  const total = cartItems.reduce((sum, p) => sum + p.price, 0);

  return (
    <main>
      {/* AboutCollections */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <AboutCollections
          products={products}
          cart={cart}
          onAddToCart={addToCart}
          selectedProduct={selectedProduct}
          onSelectProduct={handleSelectProduct}
        />
      </div>

      {/* Sticky image + ShopHero */}
      <div style={{ position: "relative" }}>
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "40vh",
            width: "100%",
            zIndex: 0,
          }}
        >
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <Image
              src="/sticky.png"
              alt="Interior scene"
              fill
              priority
              style={{ objectFit: "cover", objectPosition: "70% 20%" }}
            />
          </div>
        </div>

        <div style={{ position: "relative", zIndex: 1, marginTop: "-40vh" }}>
          <div style={{ height: "40vh" }} />
          <ShopHero
            products={products}
            cart={cart}
            onAddToCart={addToCart}
            onClearFilters={() => {
              setCat("All");
              setSearch("");
              handleSelectProduct(null);
            }}
            onSelectProduct={handleSelectProduct}
          />
        </div>
      </div>

      <ImageStrip />

      {/* ── Cart FAB ── */}
      <AnimatePresence>
        {cart.length > 0 && (
          <motion.button
            key="cart-fab"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.25 }}
            onClick={() => setCartOpen(true)}
            style={{
              position: "fixed",
              bottom: 28,
              right: 28,
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 22px",
              background: "#1a1a18",
              color: "white",
              border: "none",
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.85rem",
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
                background: "#8fa68e",
                color: "#1a1a18",
                fontSize: "0.62rem",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {cart.length}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Cart Drawer ── */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              key="cart-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setCartOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.35)",
                zIndex: 10000,
              }}
            />
            <motion.div
              key="cart-drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: "fixed",
                right: 0,
                top: 0,
                bottom: 0,
                width: 400,
                background: "white",
                zIndex: 10001,
                display: "flex",
                flexDirection: "column",
                boxShadow: "-4px 0 40px rgba(0,0,0,0.15)",
              }}
            >
              <div
                style={{
                  padding: "24px",
                  borderBottom: "1px solid #ede9e2",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.5rem",
                    color: "#1a1a18",
                    margin: 0,
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
                    color: "#888580",
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
                      color: "#888580",
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
                        borderBottom: "1px solid #ede9e2",
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
                            color: "#1a1a18",
                            marginBottom: 4,
                          }}
                        >
                          {item.name}
                        </div>
                        <div
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "0.8rem",
                            color: "#888580",
                            marginBottom: 8,
                          }}
                        >
                          {item.price.toLocaleString()}/=
                        </div>
                        <button
                          onClick={() => removeFromCart(item._id)}
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "0.7rem",
                            color: "#888580",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            textDecoration: "underline",
                            padding: 0,
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
                  borderTop: "1px solid #ede9e2",
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
                      color: "#888580",
                    }}
                  >
                    Total (excl. tax)
                  </span>
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1.3rem",
                      fontWeight: 600,
                      color: "#1a1a18",
                    }}
                  >
                    {total.toLocaleString()}/=
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
                    background: "#1a1a18",
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
                    color: "#888580",
                    textAlign: "center",
                    marginTop: 12,
                    marginBottom: 0,
                  }}
                >
                  Professional installation available — contact us for a full
                  project quote.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
