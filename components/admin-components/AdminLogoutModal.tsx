// components/admin-components/AdminLogoutModal.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { LogIn } from "lucide-react";
import { CHARCOAL, MUTED, OFF_WHITE, ACCENT } from "./_adminStyles";

export function AdminLogoutModal({
  open,
  displayName,
  onClose,
  onConfirm,
}: {
  open: boolean;
  displayName: string;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="logout-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(26,26,24,0.55)",
            zIndex: 400,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px 16px",
            backdropFilter: "blur(2px)",
          }}
        >
          <motion.div
            key="logout-modal"
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "white",
              width: "100%",
              maxWidth: 380,
              boxShadow: "0 24px 80px rgba(0,0,0,0.25)",
              overflow: "hidden",
            }}
          >
            {/* Accent bar */}
            <div style={{ height: 3, background: `linear-gradient(to right, #c0392b, transparent)` }} />
            <div style={{ padding: "28px 28px 24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <LogIn size={17} style={{ color: "#c0392b", transform: "rotate(180deg)" }} />
                <h2
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.5rem",
                    fontWeight: 400,
                    color: CHARCOAL,
                    margin: 0,
                    letterSpacing: "-0.01em",
                  }}
                >
                  Sign out?
                </h2>
              </div>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.82rem",
                  color: MUTED,
                  margin: "0 0 24px",
                  lineHeight: 1.7,
                  fontWeight: 300,
                }}
              >
                You'll be signed out of{" "}
                <strong style={{ color: CHARCOAL, fontWeight: 600 }}>{displayName}</strong>'s
                session and redirected to the login page.
              </p>
              <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
                <button
                  onClick={onClose}
                  style={{
                    padding: "10px 20px",
                    background: "none",
                    border: `1px solid ${OFF_WHITE}`,
                    cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.78rem",
                    color: MUTED,
                    letterSpacing: "0.06em",
                  }}
                >
                  Stay
                </button>
                <button
                  onClick={onConfirm}
                  style={{
                    padding: "10px 24px",
                    background: "#c0392b",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.78rem",
                    fontWeight: 500,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  Sign Out
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
