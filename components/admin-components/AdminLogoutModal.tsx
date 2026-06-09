// components/admin-components/AdminLogoutModal.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";

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
            background: "rgba(0,0,0,0.4)",
            zIndex: 400,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px 16px",
          }}
        >
          <motion.div
            key="logout-modal"
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "white",
              width: "100%",
              maxWidth: 380,
              padding: "32px 28px",
              boxShadow: "0 20px 80px rgba(0,0,0,0.2)",
            }}
          >
            <h2
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "1.6rem",
                fontWeight: 600,
                color: "var(--charcoal)",
                margin: "0 0 8px",
              }}
            >
              Sign out?
            </h2>
            <p
              style={{
                fontFamily: "DM Sans",
                fontSize: "0.85rem",
                color: "var(--text-muted)",
                margin: "0 0 28px",
              }}
            >
              Log out <strong>{displayName}</strong> from this session? You'll be redirected to the login page.
            </p>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button
                onClick={onClose}
                style={{
                  padding: "10px 20px",
                  background: "none",
                  border: "1px solid var(--off-white)",
                  cursor: "pointer",
                  fontFamily: "DM Sans",
                  fontSize: "0.85rem",
                  color: "var(--text-muted)",
                }}
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                style={{
                  padding: "10px 24px",
                  background: "#c0392b",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "DM Sans",
                  fontSize: "0.85rem",
                }}
              >
                Sign Out
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
