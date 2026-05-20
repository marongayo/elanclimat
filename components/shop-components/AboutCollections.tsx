"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Product } from "@/lib/types/product";
import { ShoppingBag, SlidersHorizontal, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "@/components/shop-components/ProductCard";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Specification {
  key: string;
  value: string;
  _id?: string;
}

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

// ─── Frosted Glass Specs Modal ────────────────────────────────────────────────
function SpecsModal({
  open,
  onClose,
  product,
}: {
  open: boolean;
  onClose: () => void;
  product: Product;
}) {
  const specs: Specification[] = Array.isArray((product as any).specifications)
    ? (product as any).specifications
    : [];

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Frosted glass backdrop */}
          <motion.div
            key="specs-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 100,
              backdropFilter: "blur(18px) saturate(0.7)",
              WebkitBackdropFilter: "blur(18px) saturate(0.7)",
              background: "rgba(240, 239, 236, 0.55)",
            }}
          />

          {/* Modal panel */}
          <motion.div
            key="specs-panel"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 101,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "24px",
              pointerEvents: "none",
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                pointerEvents: "auto",
                background: "#ffffff",
                width: "100%",
                maxWidth: 780,
                maxHeight: "90vh",
                overflowY: "auto",
                padding: "40px 48px",
                position: "relative",
                boxShadow:
                  "0 32px 80px rgba(0,0,0,0.10), 0 4px 16px rgba(0,0,0,0.06)",
              }}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                aria-label="Close"
                style={{
                  position: "absolute",
                  top: 20,
                  right: 20,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 6,
                  color: "#b0b0a8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.color =
                    "#1a1a18")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.color =
                    "#b0b0a8")
                }
              >
                <X size={18} strokeWidth={1.5} />
              </button>

              {/* Modal header */}
              <div style={{ marginBottom: 32 }}>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.6rem",
                    fontWeight: 500,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "#b0b0a8",
                    display: "block",
                    marginBottom: 8,
                  }}
                >
                  Technical Specifications
                </span>
                <h2
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.6rem",
                    fontWeight: 400,
                    color: "#1a1a18",
                    margin: 0,
                    lineHeight: 1.2,
                  }}
                >
                  {(product as any).fullName ?? product.name}
                </h2>
              </div>

              {/* Images — clean, no background */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                  marginBottom: 36,
                }}
              >
                {[
                  product.images[0],
                  product.images[1] ?? product.images[0],
                ].map((src, i) => (
                  <div
                    key={i}
                    style={{
                      position: "relative",
                      aspectRatio: i === 0 ? "3/4" : "16/10",
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={src}
                      alt={`${product.name} view ${i + 1}`}
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                ))}
              </div>

              {/* Category + price row */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  paddingBottom: 20,
                  marginBottom: 24,
                  borderBottom: "1px solid #e8e8e4",
                }}
              >
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.65rem",
                    fontWeight: 500,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "#b0b0a8",
                  }}
                >
                  {(product as any).category ?? "Product"}
                </span>
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.4rem",
                    fontWeight: 500,
                    color: product.inStock ? "#1a1a18" : "#c0c0c0",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {product.price.toLocaleString()}/=
                </span>
              </div>

              {/* Specs — plain rows, no backgrounds, no borders */}
              {specs.length > 0 ? (
                <div>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.6rem",
                      fontWeight: 500,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "#b0b0a8",
                      display: "block",
                      marginBottom: 16,
                    }}
                  >
                    Details
                  </span>
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 0 }}
                  >
                    {specs.map((spec, i) => (
                      <div
                        key={spec._id ?? i}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "180px 1fr",
                          padding: "11px 0",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            color: "#6b6b68",
                            letterSpacing: "0.02em",
                          }}
                        >
                          {spec.key}
                        </span>
                        <span
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "0.75rem",
                            color: "#1a1a18",
                            letterSpacing: "0.01em",
                          }}
                        >
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.85rem",
                    color: "#b0b0a8",
                    margin: 0,
                  }}
                >
                  No technical specifications available for this product.
                </p>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
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
  const [specsOpen, setSpecsOpen] = useState(false);

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
    ? selectedProduct.fullName
    : "About Our Elan Store.";
  const aboutBody = selectedProduct
    ? selectedProduct.description
    : "A destination for the unexpected and rare. Our designers bring you handcrafted furniture and objects for every room. We stand behind premium materiality, durability, and artistic vision.";

  const keyFeatures: string[] =
    selectedProduct && Array.isArray((selectedProduct as any).keyFeatures)
      ? (selectedProduct as any).keyFeatures
      : [];

  return (
    <div
      id="collections"
      className="about-collections-root"
      style={{ position: "relative", zIndex: 2 }}
    >
      <style>{`
        .about-section {
          background: #ffffff;
          padding: 80px 60px;
        }
        @media (max-width: 768px) {
          .about-section { padding: 52px 24px !important; }
        }
        @media (max-width: 480px) {
          .about-section { padding: 40px 18px !important; }
        }

        .about-grid {
          display: grid;
          grid-template-columns: 5fr 7fr;
          column-gap: 40px;
          align-items: start;
        }
        .about-grid-headline { grid-column: 1 / -1; grid-row: 1; }
        .about-grid-left     { grid-column: 1; grid-row: 2; display: flex; flex-direction: column; gap: 0; }
        .about-grid-right    { grid-column: 2; grid-row: 2; display: flex; flex-direction: column; gap: 0; }

        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            row-gap: 20px !important;
            column-gap: 0 !important;
          }
          .about-grid-headline { grid-column: 1 !important; grid-row: 1 !important; }
          .about-grid-left     { grid-column: 1 !important; grid-row: 2 !important; }
          .about-grid-right    { grid-column: 1 !important; grid-row: 3 !important; }
        }

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

        .collections-grid { grid-template-columns: repeat(3, 1fr); }
        @media (max-width: 900px) {
          .collections-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .collections-grid { grid-template-columns: 1fr !important; }
        }

        .highlights-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .highlights-list li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.84rem;
          color: #4a4a47;
          line-height: 1.5;
        }
        .highlights-list li::before {
          content: '';
          display: block;
          flex-shrink: 0;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #1a1a18;
          margin-top: 7px;
        }
      `}</style>

      {/* ── ABOUT SECTION ── */}
      <div className="about-section">
        <div className="about-grid">
          {/* Row 1: full-width headline */}
          <div className="about-grid-headline">
            <div
              style={{
                width: "100%",
                height: 1,
                background: "#e8e8e4",
                marginBottom: 28,
              }}
            />
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem, 4.5vw, 3.4rem)",
                fontWeight: 400,
                color: "#1a1a18",
                margin: "0 0 28px",
                lineHeight: 1.12,
                letterSpacing: "-0.015em",
                overflow: "hidden",
              }}
            >
              <FadeText text={aboutTitle} />
            </h2>
          </div>

          {/* Left column */}
          <div className="about-grid-left">
            {/* Portrait image */}
            <div
              style={{
                position: "relative",
                aspectRatio: "3 / 4",
                overflow: "hidden",
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
                    }}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Key Features */}
            <AnimatePresence>
              {selectedProduct && keyFeatures.length > 0 && (
                <motion.div
                  key={selectedProduct._id + "-features"}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    borderTop: "1px solid #e8e8e4",
                    paddingTop: 24,
                    marginTop: 24,
                    display: "flex",
                    flexDirection: "column",
                    gap: 14,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.6rem",
                      fontWeight: 500,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "#b0b0a8",
                    }}
                  >
                    Key Features
                  </span>
                  <ul className="highlights-list">
                    {keyFeatures.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Buttons */}
            <AnimatePresence mode="wait">
              {selectedProduct ? (
                <motion.div
                  key="product-buttons"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    display: "flex",
                    gap: 20,
                    alignItems: "center",
                    marginTop: 24,
                    paddingTop: 20,
                    borderTop: "1px solid #e8e8e4",
                    flexWrap: "wrap",
                  }}
                >
                  <button
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
                      background: "none",
                      border: "none",
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
                  </button>

                  <span
                    style={{
                      display: "block",
                      width: 1,
                      height: 16,
                      background: "#d8d8d4",
                      flexShrink: 0,
                    }}
                  />

                  <button
                    onClick={() => setSpecsOpen(true)}
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.75rem",
                      fontWeight: 500,
                      color: "#6b6b68",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      background: "none",
                      border: "none",
                      borderBottom: "1px solid #c8c8c4",
                      borderRadius: 0,
                      cursor: "pointer",
                      padding: 0,
                      paddingBottom: 2,
                    }}
                  >
                    <SlidersHorizontal size={13} strokeWidth={1.5} />
                    Technical Specifications
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="shop-now"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  style={{ marginTop: 24 }}
                >
                  <a
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
                    }}
                  >
                    Shop Now
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right column */}
          <div className="about-grid-right">
            {/* Description */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
                paddingTop: 8,
                paddingBottom: 28,
              }}
            >
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.65rem",
                  fontWeight: 500,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#b0b0a8",
                }}
              >
                {selectedProduct
                  ? (selectedProduct as any).category
                  : "Our Story"}
              </span>

              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.9rem",
                  color: "#6b6b68",
                  lineHeight: 1.8,
                  minHeight: "5rem",
                }}
              >
                <FadeText text={aboutBody} />
              </div>

              <AnimatePresence>
                {selectedProduct && (
                  <motion.div
                    key={selectedProduct._id + "-price"}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 4,
                      paddingTop: 16,
                      borderTop: "1px solid #e8e8e4",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.65rem",
                        fontWeight: 500,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "#b0b0a8",
                      }}
                    >
                      Price
                    </span>
                    <span
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "clamp(1.6rem, 2.5vw, 2rem)",
                        fontWeight: 500,
                        color: selectedProduct.inStock ? "#1a1a18" : "#c0c0c0",
                        letterSpacing: "-0.01em",
                        lineHeight: 1.1,
                      }}
                    >
                      {selectedProduct.price.toLocaleString()}/=
                    </span>
                    {!selectedProduct.inStock && (
                      <span
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.7rem",
                          color: "#c0c0c0",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                        }}
                      >
                        Currently out of stock
                      </span>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Landscape image */}
            <div
              style={{
                position: "relative",
                aspectRatio: "16 / 10",
                overflow: "hidden",
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
                        ? (selectedProduct.images[1] ??
                          selectedProduct.images[0])
                        : "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80"
                    }
                    alt={
                      selectedProduct
                        ? selectedProduct.name
                        : "Store collection"
                    }
                    fill
                    style={{
                      objectFit: selectedProduct ? "contain" : "cover",
                      padding: selectedProduct ? "24px" : 0,
                    }}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* ── FEATURED / RELATED PRODUCTS ── */}
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
                style={{ pointerEvents: "auto" }}
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
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* ── SPECS MODAL ── */}
      {selectedProduct && (
        <SpecsModal
          open={specsOpen}
          onClose={() => setSpecsOpen(false)}
          product={selectedProduct}
        />
      )}
    </div>
  );
}
