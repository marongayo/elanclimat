"use client";

import { X } from "lucide-react";
import { ReactNode } from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  maxWidth?: number;
};


export default function Modal({
  open,
  onClose,
  title,
  children,
  maxWidth = 720,
}: ModalProps)  {
  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.4)",
        zIndex: 200,
        overflow: "auto",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          background: "white",
          maxWidth,
          margin: "0 auto",
          padding: "40px",
          boxShadow: "0 20px 80px rgba(0,0,0,0.2)",
          position: "relative",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 28,
          }}
        >
          <h2
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "1.7rem",
              color: "var(--charcoal)",
            }}
          >
            {title}
          </h2>

          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text-muted)",
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        {children}
      </div>
    </div>
  );
}
