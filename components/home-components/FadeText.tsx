// components/shop-components/FadeText.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";

export function FadeText({
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
