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

      {/* Image area */}
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

  const highlights: string[] =
    selectedProduct && Array.isArray((selectedProduct as any).highlights)
      ? (selectedProduct as any).highlights
      : [];

  return (
    <div
      id="collections"
      className="about-collections-root"
      style={{ position: "relative", zIndex: 2 }}
    >
      <style>{`
        /* ══════════════════════════════════════════
           ABOUT SECTION
        ══════════════════════════════════════════ */
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

        /*
          LAYOUT:
          ┌──────────────────────────────────────────────┐
          │  [Headline — full width]                      │  row 1
          ├────────────────┬─────────────────────────────┤
          │  [Portrait img]│  [Description + CTA]        │  row 2
          │  (smaller)     │  [Landscape img — wider]    │
          └────────────────┴─────────────────────────────┘
          │  [Highlights + price — full width below]      │  row 3
          └──────────────────────────────────────────────┘

          Right column (col 2) is split into two sub-rows:
          top = description+CTA, bottom = landscape image.
          Portrait image (col 1) spans both of those sub-rows but
          is capped shorter than the landscape to keep proportions.
        */
        .about-grid {
          display: grid;
          grid-template-columns: 5fr 7fr;
          grid-template-rows: auto auto auto auto;
          column-gap: 40px;
          row-gap: 0;
          align-items: start;
        }

        .about-grid-headline   { grid-column: 1 / -1; grid-row: 1; }
        .about-grid-portrait   { grid-column: 1;      grid-row: 2 / 4; align-self: start; }
        .about-grid-body       { grid-column: 2;      grid-row: 2;     padding-bottom: 28px; }
        .about-grid-landscape  { grid-column: 2;      grid-row: 3; }
        .about-grid-highlights { grid-column: 1 / -1; grid-row: 4;     padding-top: 32px; }

        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            grid-template-rows: unset !important;
            row-gap: 20px !important;
            column-gap: 0 !important;
          }
          .about-grid-headline  { grid-column: 1 !important; grid-row: 1 !important; }
          .about-grid-portrait  { grid-column: 1 !important; grid-row: 2 !important; }
          .about-grid-body      { grid-column: 1 !important; grid-row: 3 !important; padding-bottom: 0 !important; }
          .about-grid-landscape { grid-column: 1 !important; grid-row: 4 !important; }
          .about-grid-highlights{ grid-column: 1 !important; grid-row: 5 !important; padding-top: 20px !important; }
        }

        /* ══════════════════════════════════════════
           COLLECTIONS SECTION
        ══════════════════════════════════════════ */
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

        /* Highlights list */
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

      {/* ════════════════════════════════════════════════
          ABOUT SECTION
      ════════════════════════════════════════════════ */}
      <div className="about-section">
        <div className="about-grid">
          {/* ── Row 1: Full-width headline ── */}
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

          {/* ── Col 1: Portrait image (spans body + landscape rows) ── */}
          <div
            className="about-grid-portrait"
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

          {/* ── Col 2 / Row 2: Description + CTA ── */}
          <div
            className="about-grid-body"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 24,
              paddingTop: 8,
            }}
          >
            {/* Label */}
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
              {selectedProduct ? selectedProduct.category : "Our Story"}
            </span>

            {/* Body */}
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

          {/* ── Col 2 / Row 3: Landscape image (immediately after description) ── */}
          <div
            className="about-grid-landscape"
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
                      ? (selectedProduct.images[1] ?? selectedProduct.images[0])
                      : "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80"
                  }
                  alt={
                    selectedProduct ? selectedProduct.name : "Store collection"
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

          {/* ── Row 4: Highlights + price (full width, only when product selected) ── */}
          {selectedProduct && (
            <div className="about-grid-highlights">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedProduct._id + "-highlights"}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 20,
                      borderTop: "1px solid #e8e8e4",
                      paddingTop: 32,
                    }}
                  >
                    {highlights.length > 0 && (
                      <>
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
                          Key Features
                        </span>
                        <ul className="highlights-list">
                          {highlights.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </>
                    )}

                    {/* Price */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 4,
                        paddingTop: highlights.length > 0 ? 8 : 0,
                        borderTop:
                          highlights.length > 0 ? "1px solid #e8e8e4" : "none",
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
                          color: selectedProduct.inStock
                            ? "#1a1a18"
                            : "#c0c0c0",
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
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
      {/* end .about-section */}

      {/* ════════════════════════════════════════════════
          FEATURED / RELATED PRODUCTS
      ════════════════════════════════════════════════ */}
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
    </div>
  );
}
