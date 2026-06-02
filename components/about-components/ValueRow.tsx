"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ValueRow({
  num,
  title,
  body,
}: {
  num: string;
  title: string;
  body: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <button
      onClick={() => setOpen((p) => !p)}
      style={{
        width: "100%",
        background: "none",
        border: "none",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        padding: "24px 0",
        cursor: "pointer",
        textAlign: "left",
        display: "grid",
        gridTemplateColumns: "40px 1fr 24px",
        gap: 20,
        alignItems: "start",
      }}
    >
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.58rem",
          color: "rgba(255,255,255,0.25)",
          letterSpacing: "0.14em",
          paddingTop: 3,
        }}
      >
        {num}
      </span>
      <div>
        <span
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.15rem",
            fontWeight: 400,
            color: "#ffffff",
            display: "block",
            letterSpacing: "-0.01em",
            marginBottom: open ? 12 : 0,
            transition: "margin 0.2s",
          }}
        >
          {title}
        </span>
        <AnimatePresence initial={false}>
          {open && (
            <motion.p
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              style={{
                margin: 0,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.8rem",
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.8,
                fontWeight: 300,
                overflow: "hidden",
              }}
            >
              {body}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "1rem",
          color: "rgba(255,255,255,0.3)",
          lineHeight: 1,
          transition: "transform 0.3s",
          display: "inline-block",
          transform: open ? "rotate(45deg)" : "none",
          paddingTop: 2,
        }}
      >
        +
      </span>
    </button>
  );
}
