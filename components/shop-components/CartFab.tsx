// components/shop-components/CartFab.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";

export function CartFab({
  count,
  onClick,
}: {
  count: number;
  onClick: () => void;
}) {
  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.button
          key="cart-fab"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.25 }}
          onClick={onClick}
          style={{
            position: "fixed",
            bottom: 28,
            right: 28,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "12px 22px",
            background: "#1a1a18",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.85rem",
            borderRadius: 9999,
            boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
          }}
        >
          <ShoppingBag size={16} />
          Cart
          <span
            style={{
              position: "absolute",
              top: -8,
              right: -8,
              width: 20,
              height: 20,
              borderRadius: "50%",
              background: "#8fa68e",
              color: "#1a1a18",
              fontSize: "0.62rem",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {count}
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
