// components/shop-components/ProductCard.tsx

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { Product } from "@/lib/types/product";
import { ShoppingBag } from "lucide-react";

const UNSPLASH_FALLBACKS: Record<string, string> = {
  HVAC: "https://images.unsplash.com/photo-1581275233838-4c24e11c7c79?w=600&q=80",
  Solar:
    "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80",
  Batteries:
    "https://images.unsplash.com/photo-1620714223084-8fcacc2dfd4d?w=600&q=80",
  default:
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80",
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
  onSelect?: () => void;
}) {
  const [pillHovered, setPillHovered] = useState(false);

  const src =
    product.images?.filter(Boolean)[0] ??
    UNSPLASH_FALLBACKS[product.category] ??
    UNSPLASH_FALLBACKS.default;

  // URL update is handled upstream by handleSelectProduct in ShopClient.
  // This component just calls onSelect() and scrolls to the panel.
  function handleImageClick() {
    onSelect?.();
    document
      .getElementById("collections")
      ?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div
      className="relative min-h-110 bg-white border border-gray-200 rounded-2xl overflow-hidden flex flex-col
                 hover:shadow-lg transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1"
    >
      {/* Out of stock overlay */}
      {!product.inStock && (
        <div className="absolute inset-0 bg-white/70 z-10 flex items-center justify-center rounded-2xl">
          <span className="text-[11px] font-medium text-gray-400 uppercase tracking-widest">
            Out of Stock
          </span>
        </div>
      )}

      <div
        onClick={handleImageClick}
        className="cursor-pointer relative p-4 pt-6 h-75 md:h-80 flex items-center justify-center bg-white"
      >
        <Image
          src={src}
          alt={product.name}
          width={250}
          height={350}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* Bottom info section */}
      <div className="p-3 md:p-4 flex flex-col grow text-center">
        <h3
          onClick={handleImageClick}
          className="cursor-pointer text-xs sm:text-sm font-medium text-gray-800 line-clamp-2 min-h-9 md:min-h-10 mb-2"
        >
          {product.name}
        </h3>

        {/* Floating pill info bar */}
        <div
          onMouseEnter={() => setPillHovered(true)}
          onMouseLeave={() => setPillHovered(false)}
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
            {product.category}
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
                    {pillHovered && (
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
