// components/shop-components/SpecsCarousel.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export function SpecsCarousel({
  images,
  productName,
}: {
  images: string[];
  productName: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div style={{ marginTop: 36, borderTop: "1px solid #e8e8e4", paddingTop: 28 }}>
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
        Gallery
      </span>

      {/* Main image */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16 / 9",
          overflow: "hidden",
          background: "#ffffff",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            style={{ position: "absolute", inset: 0 }}
          >
            <Image
              src={images[activeIndex]}
              alt={`${productName} — image ${activeIndex + 1}`}
              fill
              style={{ objectFit: "contain", padding: "20px" }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div
          style={{
            display: "flex",
            gap: 6,
            marginTop: 10,
            justifyContent: "center",
            flexWrap: "wrap",
            paddingBottom: 2,
          }}
        >
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              aria-label={`View image ${i + 1}`}
              style={{
                flexShrink: 0,
                position: "relative",
                width: 52,
                height: 40,
                background: "#ffffff",
                border: "none",
                padding: 0,
                cursor: "pointer",
                outline: "none",
              }}
            >
              <Image
                src={src}
                alt={`Thumbnail ${i + 1}`}
                fill
                style={{ objectFit: "contain", padding: "4px" }}
              />

              {/* Dim overlay for inactive */}
              {i !== activeIndex && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(255,255,255,0.5)",
                    pointerEvents: "none",
                  }}
                />
              )}

              {/* Corner brackets for active */}
              {i === activeIndex && (
                <>
                  <span style={{ position: "absolute", top: 2, left: 2, width: 7, height: 7, borderTop: "1.5px solid #1a1a18", borderLeft: "1.5px solid #1a1a18", pointerEvents: "none" }} />
                  <span style={{ position: "absolute", top: 2, right: 2, width: 7, height: 7, borderTop: "1.5px solid #1a1a18", borderRight: "1.5px solid #1a1a18", pointerEvents: "none" }} />
                  <span style={{ position: "absolute", bottom: 2, left: 2, width: 7, height: 7, borderBottom: "1.5px solid #1a1a18", borderLeft: "1.5px solid #1a1a18", pointerEvents: "none" }} />
                  <span style={{ position: "absolute", bottom: 2, right: 2, width: 7, height: 7, borderBottom: "1.5px solid #1a1a18", borderRight: "1.5px solid #1a1a18", pointerEvents: "none" }} />
                </>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
