// components/admin-components/AdminFab.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SquareCheckBig, FileText, Package, Briefcase, UserPlus } from "lucide-react";
import type { Role } from "@/lib/types/admin";
import { SAGE, CHARCOAL, ACCENT } from "./_adminStyles";

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
    {
      label: "New Blog Post",
      icon: <FileText size={16} />,
      onClick: () => { onNewBlog(); setOpen(false); },
      color: SAGE,
    },
    {
      label: "New Product",
      icon: <Package size={16} />,
      onClick: () => { onNewProduct(); setOpen(false); },
      color: ACCENT,
    },
    {
      label: "New Vacancy",
      icon: <Briefcase size={16} />,
      onClick: () => { onNewVacancy(); setOpen(false); },
      color: "#8a8680",
    },
    ...(role === "superadmin"
      ? [
          {
            label: "New Admin",
            icon: <UserPlus size={16} />,
            onClick: () => { onNewAdmin(); setOpen(false); },
            color: CHARCOAL,
          },
        ]
      : []),
  ];

  const RADIUS = 88;
  const START_ANGLE = 270;
  const END_ANGLE = 180;
  const FAB_CENTER = 26;

  return (
    <div style={{ position: "fixed", bottom: 28, right: 28, zIndex: 999 }}>
      {/* Backdrop when open */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: -1,
            }}
          />
        )}
      </AnimatePresence>

      {/* Action buttons */}
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
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.4 }}
                transition={{
                  type: "spring",
                  damping: 20,
                  stiffness: 260,
                  delay: i * 0.04,
                }}
                style={{ position: "absolute", bottom: -y, right: -x }}
              >
                {/* Tooltip label */}
                <div
                  style={{
                    position: "absolute",
                    right: "calc(100% + 10px)",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: CHARCOAL,
                    color: "white",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.68rem",
                    fontWeight: 500,
                    letterSpacing: "0.06em",
                    whiteSpace: "nowrap",
                    padding: "4px 10px",
                    pointerEvents: "none",
                    opacity: 0.9,
                  }}
                >
                  {action.label}
                </div>

                <button
                  onClick={action.onClick}
                  title={action.label}
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: "50%",
                    background: "white",
                    border: `2px solid ${action.color}`,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: action.color,
                    boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                    transition: "background 0.15s, transform 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = action.color;
                    (e.currentTarget as HTMLButtonElement).style.color = "white";
                    (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.08)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "white";
                    (e.currentTarget as HTMLButtonElement).style.color = action.color;
                    (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
                  }}
                >
                  {action.icon}
                </button>
              </motion.div>
            );
          })}
      </AnimatePresence>

      {/* Main FAB pill */}
      <motion.div
        animate={{
          width: toastVisible && !open ? "auto" : 52,
          background: toastVisible && !open ? "#f0f5f0" : CHARCOAL,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        style={{
          height: 52,
          borderRadius: 9999,
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          boxShadow: "0 6px 28px rgba(0,0,0,0.22)",
          position: "relative",
          zIndex: 1,
          minWidth: 52,
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {!open && toastVisible ? (
            <motion.div
              key="toast"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              style={{
                height: 52,
                padding: "0 20px",
                display: "flex",
                alignItems: "center",
                gap: 10,
                color: "#2d5a2c",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                whiteSpace: "nowrap",
              }}
            >
              <SquareCheckBig size={15} />
              <span style={{ fontSize: "0.82rem" }}>{toastMsg}</span>
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
                fontSize: "1.6rem",
                lineHeight: 1,
                fontWeight: 300,
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
