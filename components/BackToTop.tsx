"use client";

import { useEffect, useState } from "react";
import { ArrowUp, SquareCheckBig } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function BackToTop() {
  const [showTop, setShowTop] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const msg = (e as CustomEvent<string>).detail;
      setToastMsg(msg);
      setToastVisible(true);
      setTimeout(() => {
        setToastVisible(false);
        setTimeout(() => setToastMsg(""), 400);
      }, 3100);
    };
    window.addEventListener("app-toast", handler);
    return () => window.removeEventListener("app-toast", handler);
  }, []);

  return (
    <>
      <AnimatePresence>
        {toastVisible && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            style={{
              position: "fixed",
              bottom: 28,
              right: 28,
              zIndex: 9999,
              height: 44,
              padding: "0 18px",
              borderRadius: 9999,
              background: "#1a1a18",
              display: "flex",
              alignItems: "center",
              gap: 10,
              color: "white",
              fontFamily: "DM Sans",
              fontWeight: 500,
              whiteSpace: "nowrap",
              boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
            }}
          >
            <SquareCheckBig size={15} color="#8fa68e" />
            <span style={{ fontSize: "0.82rem" }}>{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showTop && !toastVisible && (
          <motion.button
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.25 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{
              position: "fixed",
              bottom: 28,
              right: 28,
              zIndex: 9999,
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "#1a1a18",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
            }}
            aria-label="Back to top"
          >
            <ArrowUp size={16} color="#ffffff" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
