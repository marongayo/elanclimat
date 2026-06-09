// components/admin-components/AdminFab.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SquareCheckBig, FileText, Package, Briefcase, UserPlus } from "lucide-react";
import type { Role } from "@/lib/types/admin";

export function AdminFab({
  toastVisible,
  toastMsg,
  role,
  onNewBlog,
  onNewProduct,
  onNewVacancy,
  onNewAdmin,
}: {
  toastVisible: boolean;
  toastMsg: string;
  role: Role;
  onNewBlog: () => void;
  onNewProduct: () => void;
  onNewVacancy: () => void;
  onNewAdmin: () => void;
}) {
  const [open, setOpen] = useState(false);

  const actions = [
    { label: "New Blog Post", icon: <FileText size={18} />, onClick: () => { onNewBlog(); setOpen(false); } },
    { label: "New Product", icon: <Package size={18} />, onClick: () => { onNewProduct(); setOpen(false); } },
    { label: "New Vacancy", icon: <Briefcase size={18} />, onClick: () => { onNewVacancy(); setOpen(false); } },
    ...(role === "superadmin"
      ? [{ label: "New Admin", icon: <UserPlus size={18} />, onClick: () => { onNewAdmin(); setOpen(false); } }]
      : []),
  ];

  const RADIUS = 90;
  const START_ANGLE = 270;
  const END_ANGLE = 180;
  const FAB_CENTER = 26;

  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 999 }}>
      <AnimatePresence>
        {open &&
          actions.map((action, i) => {
            const total = actions.length - 1 || 1;
            const angle = START_ANGLE - (i / total) * (START_ANGLE - END_ANGLE);
            const rad = (angle * Math.PI) / 180;
            const x = Math.cos(rad) * RADIUS - 24 + FAB_CENTER;
            const y = Math.sin(rad) * RADIUS - 24 + FAB_CENTER;

            return (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, scale: 0.3 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.3 }}
                transition={{ type: "spring", damping: 20, stiffness: 260, delay: i * 0.05 }}
                style={{ position: "absolute", bottom: -y, right: -x }}
              >
                <button
                  onClick={action.onClick}
                  title={action.label}
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: "white",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--charcoal)",
                    boxShadow: "0 2px 14px rgba(0,0,0,0.13)",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#f3f4f6")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
                >
                  {action.icon}
                </button>
              </motion.div>
            );
          })}
      </AnimatePresence>

      <motion.div
        animate={{ width: toastVisible && !open ? "auto" : 52 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        style={{
          height: 52,
          borderRadius: 9999,
          background: toastVisible && !open ? "var(--sage)" : "var(--charcoal)",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {!open && toastVisible ? (
            <motion.div
              key="toast"
              initial={{ width: 52, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              exit={{ width: 52, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              style={{ height: 52, padding: "0 20px", display: "flex", alignItems: "center", gap: 10, color: "var(--charcoal)", fontFamily: "DM Sans", fontWeight: 500, whiteSpace: "nowrap" }}
            >
              <SquareCheckBig size={16} />
              <span style={{ fontSize: "0.85rem" }}>{toastMsg}</span>
            </motion.div>
          ) : (
            <motion.button
              key="fab"
              animate={{ rotate: open ? 45 : 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              onClick={() => setOpen((o) => !o)}
              style={{
                width: 52,
                minWidth: 52,
                height: 52,
                border: "none",
                background: "transparent",
                color: "white",
                cursor: "pointer",
                display: "grid",
                placeItems: "center",
                flexShrink: 0,
                padding: 0,
                fontSize: "1.5rem",
                lineHeight: 1,
              }}
            >
              +
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
