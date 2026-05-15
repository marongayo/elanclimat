"use client";
import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function CardCarousel({
  images = [],
  name,
}: {
  images?: string[];
  name: string;
}) {
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

      <button
        onClick={prev}
        className="carousel-arrow carousel-arrow-left"
        aria-label="Previous"
      >
        <ChevronLeft size={16} />
      </button>
      <button
        onClick={next}
        className="carousel-arrow carousel-arrow-right"
        aria-label="Next"
      >
        <ChevronRight size={16} />
      </button>

      {/* Dot indicators */}
      <div
        style={{
          position: "absolute",
          bottom: 8,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 5,
          zIndex: 2,
        }}
      >
        {images.map((_, i) => (
          <button
            key={i}
            onClick={(e) => {
              e.stopPropagation();
              setIdx(i);
            }}
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
