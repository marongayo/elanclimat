// components/shop-components/SpecsModal.tsx
"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/lib/types/product";
import { SpecsCarousel } from "./SpecsCarousel";

interface Specification {
  key: string;
  value: string;
  _id?: string;
}

export function SpecsModal({
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
                boxShadow: "0 32px 80px rgba(0,0,0,0.10), 0 4px 16px rgba(0,0,0,0.06)",
              }}
            >
              {/* Close */}
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
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#1a1a18")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#b0b0a8")}
              >
                <X size={18} strokeWidth={1.5} />
              </button>

              {/* Header */}
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

              {/* Images */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                  marginBottom: 36,
                }}
              >
                {[product.images[0], product.images[1] ?? product.images[0]].map((src, i) => (
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

              {/* Specs table */}
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
                  <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
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
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "#b0b0a8", margin: 0 }}>
                  No technical specifications available for this product.
                </p>
              )}

              <SpecsCarousel images={product.images} productName={product.name} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
