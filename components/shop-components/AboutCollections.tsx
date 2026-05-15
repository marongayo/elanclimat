"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Product } from "@/lib/data";
import { ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Animated text swap ───────────────────────────────────────────────────────
function FadeText({
  text,
  style,
}: {
  text: string;
  style?: React.CSSProperties;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={text}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        style={{ display: "block", ...style }}
      >
        {text}
      </motion.span>
    </AnimatePresence>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({
  product,
  inCart,
  onAddToCart,
  onSelect,
  isSelected,
}: {
  product: Product;
  inCart: boolean;
  onAddToCart: () => void;
  onSelect: () => void;
  isSelected: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#f2f1ee",
        position: "relative",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        border: "none",
        transition: "border-color 0.2s ease",
      }}
    >
      {/* Out of stock overlay */}
      {!product.inStock && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(255,255,255,0.72)",
            zIndex: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.65rem",
              fontWeight: 500,
              color: "#b0b0b0",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            Out of Stock
          </span>
        </div>
      )}

      {/* Image area — clicking triggers selection */}
      <div
        onClick={onSelect}
        style={{
          background: "#f2f1ee",
          position: "relative",
          aspectRatio: "4 / 3",
        }}
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          style={{
            objectFit: "contain",
            padding: "32px",
            transition: "transform 0.4s ease",
            transform: hovered ? "scale(1.04)" : "scale(1)",
          }}
        />

        {/* Info bar */}
        <div
          style={{
            position: "absolute",
            bottom: 12,
            left: 20,
            right: 20,
            background: "#ffffff",
            borderRadius: "5px",
            padding: "3px 3px 3px 12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
            boxShadow: "0 1px 6px rgba(0,0,0,0.07)",
            zIndex: 2,
          }}
        >
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.78rem",
              fontWeight: 400,
              color: "#1a1a18",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              letterSpacing: "0.005em",
            }}
          >
            {product.name}
          </span>

          {product.inStock ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (!inCart) onAddToCart();
              }}
              disabled={inCart}
              style={{
                flexShrink: 0,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.72rem",
                fontWeight: 400,
                color: inCart ? "#8fa68e" : "#1a1a18",
                background: "none",
                border: "1px solid #d8d8d8",
                borderRadius: "9999px",
                cursor: inCart ? "default" : "pointer",
                padding: "5px 13px",
                whiteSpace: "nowrap",
                display: "flex",
                alignItems: "center",
                gap: 6,
                overflow: "hidden",
              }}
            >
              {inCart ? (
                <ShoppingBag size={13} strokeWidth={1.5} />
              ) : (
                <>
                  <AnimatePresence>
                    {hovered && (
                      <motion.span
                        key="bag"
                        initial={{ width: 0, opacity: 0, marginRight: -6 }}
                        animate={{ width: 13, opacity: 1, marginRight: 0 }}
                        exit={{ width: 0, opacity: 0, marginRight: -6 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          overflow: "hidden",
                          flexShrink: 0,
                        }}
                      >
                        <ShoppingBag size={13} strokeWidth={1.5} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {`${product.price.toLocaleString()}/=`}
                </>
              )}
            </button>
          ) : (
            <span
              style={{
                flexShrink: 0,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.72rem",
                fontWeight: 400,
                color: "#c0c0c0",
                border: "1px solid #e8e8e8",
                borderRadius: "9999px",
                padding: "5px 13px",
                whiteSpace: "nowrap",
              }}
            >
              {product.price.toLocaleString()}/=
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AboutCollections({
  products,
  cart,
  onAddToCart,
  selectedProduct,
  onSelectProduct,
}: {
  products: Product[];
  cart: string[];
  onAddToCart: (id: string) => void;
  selectedProduct: Product | null;
  onSelectProduct: (p: Product | null) => void;
}) {
  const featured = useMemo(() => products.slice(0, 3), [products]);

  const related = useMemo(() => {
    if (!selectedProduct) return [];
    const sameCategory = products.filter(
      (p) =>
        p._id !== selectedProduct._id &&
        p.category === selectedProduct.category,
    );
    if (sameCategory.length >= 3) return sameCategory.slice(0, 3);
    const others = products.filter(
      (p) =>
        p._id !== selectedProduct._id &&
        p.category !== selectedProduct.category,
    );
    return [...sameCategory, ...others].slice(0, 3);
  }, [selectedProduct, products]);

  const bottomProducts = selectedProduct ? related : featured;
  const bottomLabel = selectedProduct
    ? "Related Products"
    : "Featured Products";
  const aboutTitle = selectedProduct
    ? selectedProduct.name
    : "About Our Elan Store.";
  const aboutBody = selectedProduct
    ? selectedProduct.description
    : "A destination for the unexpected and rare. Our designers bring you handcrafted furniture and objects for every room. We stand behind premium materiality, durability, and artistic vision.";

  return (
    <div
      id="collections"
      className="about-collections-root"
      style={{ position: "relative", zIndex: 2 }}
    >
      <style>{`
        /* ── About section wrapper — white background ── */
        .about-section {
          background: #ffffff;
          padding: 80px 60px 80px;
        }
        @media (max-width: 768px) {
          .about-section { padding: 52px 24px 52px !important; }
        }
        @media (max-width: 480px) {
          .about-section { padding: 40px 18px 40px !important; }
        }

        /* ── Collections section wrapper — off-white background ── */
        .collections-section {
          background: #f2f1ee;
          padding: 60px 60px 80px;
        }
        @media (max-width: 768px) {
          .collections-section { padding: 48px 24px 60px !important; }
        }
        @media (max-width: 480px) {
          .collections-section { padding: 36px 18px 48px !important; }
        }

        /* ── Desktop: 2-col grid ── */
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto auto;
          row-gap: 28px;
          column-gap: 20px;
          align-items: start;
        }

        /* Desktop explicit placement */
        .about-grid-heading   { grid-column: 1; grid-row: 1; }
        .about-grid-body      { grid-column: 2; grid-row: 1; }
        .about-grid-portrait  { grid-column: 1; grid-row: 2; }
        .about-grid-landscape { grid-column: 2; grid-row: 2; }

        /* ── Mobile: single column, strict order ── */
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            grid-template-rows: unset !important;
            row-gap: 20px !important;
            column-gap: 0 !important;
          }
          .about-grid-heading {
            grid-column: 1 !important;
            grid-row: 1 !important;
          }
          .about-grid-body {
            grid-column: 1 !important;
            grid-row: 2 !important;
          }
          .about-grid-portrait {
            grid-column: 1 !important;
            grid-row: 3 !important;
            max-width: 100% !important;
            aspect-ratio: 3 / 2 !important;
          }
          /* Hide landscape on mobile — restore original behaviour */
          .about-grid-landscape {
            display: none !important;
          }
        }

        /* ── Collections grid ── */
        .collections-grid { grid-template-columns: repeat(3, 1fr); }
        @media (max-width: 900px) {
          .collections-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .collections-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── About section (white) ────────────────────────────────────────────── */}
      <div className="about-section">
        <div className="about-grid">
          {/* Heading — top-left desktop, row-1 mobile */}
          <h2
            className="about-grid-heading"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 400,
              color: "#1a1a18",
              margin: 0,
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
              overflow: "hidden",
            }}
          >
            <FadeText text={aboutTitle} />
          </h2>

          {/* Body + CTA — top-right desktop, row-2 mobile */}
          <div
            className="about-grid-body"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
              paddingTop: 6,
            }}
          >
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.88rem",
                color: "#6b6b68",
                lineHeight: 1.75,
                maxWidth: 420,
                minHeight: "5rem",
              }}
            >
              <FadeText text={aboutBody} />
            </div>

            {/* CTA */}
            <AnimatePresence mode="wait">
              {selectedProduct ? (
                <motion.button
                  key="add-to-cart"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  onClick={() => {
                    if (!cart.includes(selectedProduct._id))
                      onAddToCart(selectedProduct._id);
                  }}
                  disabled={cart.includes(selectedProduct._id)}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    color: cart.includes(selectedProduct._id)
                      ? "#8fa68e"
                      : "#1a1a18",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    width: "fit-content",
                    background: "none",
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "none",
                    borderBottom: cart.includes(selectedProduct._id)
                      ? "1px solid #8fa68e"
                      : "1px solid #1a1a18",
                    borderRadius: 0,
                    cursor: cart.includes(selectedProduct._id)
                      ? "default"
                      : "pointer",
                    padding: 0,
                    paddingBottom: 2,
                  }}
                >
                  <ShoppingBag size={13} strokeWidth={1.5} />
                  {cart.includes(selectedProduct._id)
                    ? "In Cart"
                    : "Add to Cart"}
                </motion.button>
              ) : (
                <motion.a
                  key="shop-now"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  href="#"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    color: "#1a1a18",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    borderBottom: "1px solid #1a1a18",
                    paddingBottom: 2,
                    width: "fit-content",
                  }}
                >
                  Shop Now
                </motion.a>
              )}
            </AnimatePresence>
          </div>

          {/* Portrait image — bottom-left desktop, row-3 mobile */}
          <div
            className="about-grid-portrait"
            style={{
              position: "relative",
              aspectRatio: "4 / 5",
              overflow: "hidden",
              maxWidth: 340,
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedProduct?._id ?? "default-portrait"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                style={{ position: "absolute", inset: 0 }}
              >
                <Image
                  src={
                    selectedProduct
                      ? selectedProduct.images[0]
                      : "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80"
                  }
                  alt={
                    selectedProduct ? selectedProduct.name : "Store interior"
                  }
                  fill
                  style={{
                    objectFit: selectedProduct ? "contain" : "cover",
                    padding: selectedProduct ? "24px" : 0,
                    background: selectedProduct ? "#ffffff" : "transparent",
                  }}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Landscape image — bottom-right desktop, row-4 mobile */}
          <div
            className="about-grid-landscape"
            style={{
              position: "relative",
              aspectRatio: "16 / 10",
              overflow: "hidden",
              alignSelf: "end",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={(selectedProduct?._id ?? "default") + "-landscape"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                style={{ position: "absolute", inset: 0 }}
              >
                <Image
                  src={
                    selectedProduct
                      ? selectedProduct.images[1]
                      : "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80"
                  }
                  alt={
                    selectedProduct ? selectedProduct.name : "Store collection"
                  }
                  fill
                  style={{
                    objectFit: selectedProduct ? "contain" : "cover",
                    padding: selectedProduct ? "24px" : 0,
                    background: selectedProduct ? "#ffffff" : "transparent",
                  }}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      {/* end .about-section */}

      {/* ── Featured / Related Products (off-white) ──────────────────────────── */}
      <div className="collections-section">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            marginBottom: 36,
          }}
        >
          <h3
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
              fontWeight: 400,
              color: "#1a1a18",
              margin: 0,
              letterSpacing: "-0.01em",
            }}
          >
            <FadeText text={bottomLabel} />
          </h3>
          <div style={{ width: 32, height: 1, background: "#c8c8c4" }} />
        </div>

        <div style={{ display: "grid", gap: 16 }} className="collections-grid">
          <AnimatePresence mode="wait">
            {bottomProducts.map((product, i) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
              >
                <ProductCard
                  product={product}
                  inCart={cart.includes(product._id)}
                  onAddToCart={() => onAddToCart(product._id)}
                  onSelect={() => {
                    onSelectProduct(
                      selectedProduct?._id === product._id ? null : product,
                    );
                    document
                      .getElementById("collections")
                      ?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  isSelected={selectedProduct?._id === product._id}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      {/* end .collections-section */}
    </div>
  );
}
