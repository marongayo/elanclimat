"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { ApplicationForm } from "./ApplicationForm";
import { Role, AppStatus } from "@/components/careers-components/_tokens";
import { C } from "@/lib/constants";

export function RoleRow({
  role,
  isOpen,
  status,
  onToggle,
  onOpenForm,
  onFormSuccess,
  onFormCancel,
}: {
  role: Role;
  isOpen: boolean;
  status: AppStatus;
  onToggle: () => void;
  onOpenForm: () => void;
  onFormSuccess: () => void;
  onFormCancel: () => void;
}) {
  return (
    <div style={{ borderBottom: `1px solid ${C.rule}` }}>
      {/* Row header */}
      <div
        onClick={() => {
          if (status !== "form") onToggle();
        }}
        className="role-row-header"
        style={{
          display: "grid",
          gridTemplateColumns: "56px 1fr auto auto",
          alignItems: "center",
          gap: 24,
          padding: "28px 0",
          cursor: status === "form" ? "default" : "pointer",
          transition: "padding-left 0.2s",
        }}
        onMouseEnter={(e) => {
          if (status !== "form")
            (e.currentTarget as HTMLDivElement).style.paddingLeft = "8px";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.paddingLeft = "0px";
        }}
      >
        {/* Index */}
        <span
          className="role-index"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.58rem",
            letterSpacing: "0.12em",
            color: C.dim,
          }}
        >
          {role.index}
        </span>

        {/* Title + category */}
        <div>
          <div
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.05rem, 2.5vw, 1.35rem)",
              fontWeight: 400,
              color: C.charcoal,
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
            }}
          >
            {role.title}
          </div>
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.62rem",
              color: C.dim,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              marginTop: 4,
            }}
          >
            {role.category}
          </div>
        </div>

        {/* Meta — hidden on small screens via CSS */}
        <div
          className="role-row-meta"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 4,
          }}
        >
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.72rem",
              color: C.muted,
            }}
          >
            {role.location}
          </span>
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.62rem",
              color: C.dim,
              letterSpacing: "0.08em",
            }}
          >
            {role.type}
          </span>
        </div>

        {/* Chevron */}
        <div
          style={{
            width: 32,
            height: 32,
            border: `1px solid ${isOpen ? "transparent" : C.rule}`,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: isOpen ? C.charcoal : "transparent",
            color: isOpen ? "#fff" : C.charcoal,
            fontSize: "1.1rem",
            lineHeight: 1,
            transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
            transform: isOpen ? "rotate(45deg)" : "none",
            flexShrink: 0,
          }}
        >
          +
        </div>
      </div>

      {/* Expanded panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div onClick={(e) => e.stopPropagation()}>
              <div
                className="role-detail-left"
                style={{
                  padding: "0 0 40px 80px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 24,
                }}
              >
                {/* Meta pills — visible on mobile only via CSS */}
                <div
                  className="role-meta-mobile"
                  style={{ display: "flex", gap: 12, flexWrap: "wrap" }}
                >
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.68rem",
                      color: C.muted,
                      background: C.rule,
                      padding: "4px 10px",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {role.location}
                  </span>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.68rem",
                      color: C.dim,
                      background: C.rule,
                      padding: "4px 10px",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {role.type}
                  </span>
                </div>

                {/* Description */}
                <div>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.58rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase" as const,
                      color: C.dim,
                      display: "block",
                      marginBottom: 10,
                    }}
                  >
                    About the role
                  </span>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.86rem",
                      color: C.body,
                      lineHeight: 1.85,
                      fontWeight: 300,
                      maxWidth: 640,
                      margin: 0,
                    }}
                  >
                    {role.description}
                  </p>
                </div>

                {/* Requirements */}
                <div>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.58rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase" as const,
                      color: C.dim,
                      display: "block",
                      marginBottom: 12,
                    }}
                  >
                    What we are looking for
                  </span>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                    }}
                  >
                    {role.requirements.map((r, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 12,
                        }}
                      >
                        <span
                          style={{
                            width: 4,
                            height: 4,
                            borderRadius: "50%",
                            background: C.sage,
                            flexShrink: 0,
                            marginTop: 8,
                            display: "inline-block",
                          }}
                        />
                        <span
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "0.82rem",
                            color: C.body,
                            lineHeight: 1.7,
                            fontWeight: 300,
                          }}
                        >
                          {r}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA — driven by status */}
                {status === "idle" && (
                  <button
                    onClick={onOpenForm}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 10,
                      background: C.charcoal,
                      color: "#ffffff",
                      border: "none",
                      cursor: "pointer",
                      padding: "12px 10px 12px 24px",
                      borderRadius: 9999,
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.74rem",
                      fontWeight: 500,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase" as const,
                      alignSelf: "flex-start",
                      marginTop: 8,
                      transition: "opacity 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLButtonElement).style.opacity =
                        "0.8")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLButtonElement).style.opacity =
                        "1")
                    }
                  >
                    Apply for this role
                    <span
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.15)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <ArrowUpRight size={13} strokeWidth={2} />
                    </span>
                  </button>
                )}

                {status === "form" && (
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.7rem",
                      color: C.sage,
                      letterSpacing: "0.06em",
                      marginTop: 8,
                    }}
                  >
                    ↓ Complete the form below
                  </p>
                )}

                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 14,
                      background: "#f3f8f3",
                      border: "1px solid #c8dbc7",
                      padding: "16px 20px",
                      marginTop: 8,
                      maxWidth: 400,
                    }}
                  >
                    <CheckCircle2
                      size={18}
                      strokeWidth={1.5}
                      style={{ color: C.sageDark, marginTop: 1, flexShrink: 0 }}
                    />
                    <div>
                      <div
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.82rem",
                          color: C.sageDark,
                          fontWeight: 500,
                        }}
                      >
                        Application received
                      </div>
                      <div
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.74rem",
                          color: C.sageDark,
                          opacity: 0.75,
                          marginTop: 2,
                        }}
                      >
                        We will be in touch within one business day.
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Application form */}
              <AnimatePresence>
                {status === "form" && (
                  <ApplicationForm
                    role={role}
                    onSuccess={onFormSuccess}
                    onCancel={onFormCancel}
                  />
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
