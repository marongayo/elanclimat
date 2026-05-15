import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { Product } from "@/lib/data";
import { ShoppingBag } from "lucide-react";

const UNSPLASH_FALLBACKS: Record<string, string> = {
  HVAC: "https://images.unsplash.com/photo-1581275233838-4c24e11c7c79?w=600&q=80",
  Solar: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80",
  Batteries: "https://images.unsplash.com/photo-1620714223084-8fcacc2dfd4d?w=600&q=80",
  default: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80",
};

export default function ProductCard({
  product,
  inCart,
  onAddToCart,
  onSelect,
}: {
  product: Product;
  inCart: boolean;
  onAddToCart: () => void;
  onSelect?: () => void; // optional — only passed from ShopHero
}) {
  const [hovered, setHovered] = useState(false);

  const src =
    product.images?.filter(Boolean)[0] ??
    UNSPLASH_FALLBACKS[product.category] ??
    UNSPLASH_FALLBACKS.default;

  function handleImageClick() {
    onSelect?.();
    // Scroll to #collections smoothly
    const el = document.getElementById("collections");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

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
        border: "1px solid #e8e8e8",
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

      {/* Image area — click selects product and scrolls to #collections */}
      <div
        onClick={handleImageClick}
        style={{
          background: "#f2f1ee",
          position: "relative",
          aspectRatio: "4 / 3",
        }}
      >
        <Image
          src={src}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{
            objectFit: "contain",
            padding: "20px",
            transition: "transform 0.4s ease",
            transform: hovered ? "scale(1.04)" : "scale(1)",
          }}
        />

        {/* Floating pill info bar */}
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
