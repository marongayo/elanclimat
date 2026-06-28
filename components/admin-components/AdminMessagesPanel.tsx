// components/admin-components/AdminMessagesPanel.tsx
"use client";

import { X, Trash2, Mail, Archive, Inbox, CheckCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Message } from "@/lib/types/message";
import { CHARCOAL, SAGE, SAGE_DARK, MUTED, OFF_WHITE, ACCENT } from "./_adminStyles";

const formatMessageDate = (raw: string | undefined): string => {
  if (!raw) return "—";
  const date = new Date(raw);
  if (isNaN(date.getTime())) return "—";
  const now = Date.now();
  const diffMs = now - date.getTime();
  const diffMins = Math.floor(diffMs / 60_000);
  const diffHours = Math.floor(diffMs / 3_600_000);
  const diffDays = Math.floor(diffMs / 86_400_000);
  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 6) return `${diffDays}d ago`;
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
};

export default function AdminMessagesPanel({
  msgPanelOpen,
  setMsgPanelOpen,
  messages,
  archivedMessages,
  showingArchive,
  loadingArchive,
  ellipsisOpen,
  setEllipsisOpen,
  markRead,
  deleteMessage,
  toggleArchive,
}: {
  msgPanelOpen: boolean;
  setMsgPanelOpen: (v: boolean) => void;
  messages: Message[];
  archivedMessages: Message[];
  showingArchive: boolean;
  loadingArchive: boolean;
  ellipsisOpen: boolean;
  setEllipsisOpen: (v: boolean | ((prev: boolean) => boolean)) => void;
  markRead: (id: string) => void;
  deleteMessage: (id: string, fromArchive?: boolean) => void;
  toggleArchive: () => void;
}) {
  return (
    <AnimatePresence>
      {msgPanelOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setMsgPanelOpen(false);
              setEllipsisOpen(false);
            }}
            style={{ position: "fixed", inset: 0, zIndex: 300 }}
          />

          {/* Panel */}
          <motion.div
            className="msg-panel"
            initial={{ opacity: 0, x: -12, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -12, scale: 0.97 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            style={{
              position: "fixed",
              bottom: 72,
              left: 232,
              width: 360,
              maxWidth: "calc(100vw - 24px)",
              height: "min(52vh, 560px)",
              maxHeight: "calc(100vh - 90px)",
              background: "white",
              zIndex: 301,
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 12px 48px rgba(0,0,0,0.18)",
              border: `1px solid ${OFF_WHITE}`,
              overflow: "hidden",
            }}
          >
            {/* Accent top bar */}
            <div
              style={{
                height: 2,
                background: `linear-gradient(to right, ${SAGE}, transparent 70%)`,
                flexShrink: 0,
              }}
            />

            {/* Header */}
            <div
              style={{
                padding: "14px 18px 12px",
                borderBottom: `1px solid ${OFF_WHITE}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexShrink: 0,
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.15rem",
                    fontWeight: 400,
                    color: CHARCOAL,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {showingArchive ? "Archive" : "Messages"}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.68rem",
                    color: MUTED,
                    marginTop: 1,
                    fontWeight: 300,
                  }}
                >
                  {showingArchive
                    ? `${archivedMessages.length} archived`
                    : `${messages.length} active · ${messages.filter((m) => !m.read).length} unread`}
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                {/* Ellipsis menu */}
                <div style={{ position: "relative" }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEllipsisOpen((v) => !v);
                    }}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: MUTED,
                      padding: "4px 8px",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "1.1rem",
                      letterSpacing: "0.12em",
                      lineHeight: 1,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    ···
                  </button>
                  <AnimatePresence>
                    {ellipsisOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -4, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -4, scale: 0.97 }}
                        transition={{ duration: 0.12 }}
                        style={{
                          position: "absolute",
                          top: "calc(100% + 4px)",
                          right: 0,
                          background: "white",
                          border: `1px solid ${OFF_WHITE}`,
                          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                          zIndex: 10,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          minWidth: 150,
                        }}
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEllipsisOpen(false);
                            toggleArchive();
                          }}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "10px 16px",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "0.8rem",
                            color: CHARCOAL,
                            width: "100%",
                            transition: "background 0.12s",
                          }}
                          onMouseEnter={(e) =>
                            ((e.currentTarget as HTMLButtonElement).style.background =
                              "#f9f7f4")
                          }
                          onMouseLeave={(e) =>
                            ((e.currentTarget as HTMLButtonElement).style.background =
                              "none")
                          }
                        >
                          <Archive size={13} style={{ color: MUTED }} />
                          {showingArchive ? "← Active Messages" : "View Archive"}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <button
                  onClick={() => {
                    setMsgPanelOpen(false);
                    setEllipsisOpen(false);
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: MUTED,
                    display: "flex",
                    alignItems: "center",
                    padding: 4,
                  }}
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Body */}
            <div style={{ flex: 1, overflowY: "auto" }}>
              {/* Archive view */}
              {showingArchive &&
                (loadingArchive ? (
                  <div
                    style={{
                      padding: "32px",
                      textAlign: "center",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.8rem",
                      color: MUTED,
                      fontWeight: 300,
                    }}
                  >
                    Loading archive...
                  </div>
                ) : archivedMessages.length === 0 ? (
                  <div
                    style={{
                      padding: "48px 24px",
                      textAlign: "center",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.82rem",
                      color: MUTED,
                      fontWeight: 300,
                    }}
                  >
                    No archived messages.
                  </div>
                ) : (
                  <>
                    <div
                      style={{
                        padding: "8px 18px",
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.58rem",
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: MUTED,
                        background: "#fafaf8",
                        borderBottom: `1px solid ${OFF_WHITE}`,
                        position: "sticky",
                        top: 0,
                        zIndex: 2,
                      }}
                    >
                      Archive · {archivedMessages.length}
                    </div>
                    {archivedMessages.map((m) => (
                      <div
                        key={m._id}
                        style={{
                          padding: "14px 18px",
                          borderBottom: `1px solid ${OFF_WHITE}`,
                          background: "#fafaf8",
                          opacity: 0.75,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            gap: 8,
                            marginBottom: 4,
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <span
                              style={{
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: "0.82rem",
                                fontWeight: 600,
                                color: CHARCOAL,
                              }}
                            >
                              {m.name}
                            </span>
                            {m.service && (
                              <span
                                style={{
                                  background: "#f0f5f0",
                                  color: SAGE_DARK,
                                  fontSize: "0.58rem",
                                  padding: "2px 7px",
                                  fontFamily: "'DM Sans', sans-serif",
                                  fontWeight: 600,
                                  letterSpacing: "0.06em",
                                }}
                              >
                                {m.service}
                              </span>
                            )}
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <span
                              style={{
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: "0.62rem",
                                color: MUTED,
                                whiteSpace: "nowrap",
                              }}
                            >
                              {formatMessageDate(m.createdAt)}
                            </span>
                            <button
                              onClick={() => deleteMessage(m._id, true)}
                              style={{
                                padding: "3px 5px",
                                background: "#fef2f2",
                                border: "none",
                                cursor: "pointer",
                                color: "#c0392b",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <Trash2 size={11} />
                            </button>
                          </div>
                        </div>
                        <div
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "0.68rem",
                            color: MUTED,
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                            marginBottom: m.message ? 6 : 0,
                          }}
                        >
                          <Mail size={9} /> {m.email}
                        </div>
                        {m.message && (
                          <p
                            style={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: "0.75rem",
                              color: MUTED,
                              lineHeight: 1.6,
                              margin: 0,
                              fontWeight: 300,
                            }}
                          >
                            {m.message}
                          </p>
                        )}
                      </div>
                    ))}
                  </>
                ))}

              {/* Active messages view */}
              {!showingArchive &&
                (messages.length === 0 ? (
                  <div
                    style={{ padding: "56px 24px", textAlign: "center" }}
                  >
                    <Inbox
                      size={24}
                      style={{ color: MUTED, opacity: 0.25, marginBottom: 12 }}
                    />
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.82rem",
                        color: MUTED,
                        fontWeight: 300,
                      }}
                    >
                      No messages yet.
                    </p>
                  </div>
                ) : (
                  messages.map((m) => (
                    <div
                      key={m._id}
                      className="msg-item"
                      style={{
                        padding: "14px 18px",
                        borderBottom: `1px solid ${OFF_WHITE}`,
                        background: m.read ? "white" : "#f5faf5",
                        borderLeft: m.read
                          ? "3px solid transparent"
                          : `3px solid ${SAGE_DARK}`,
                        transition: "background 0.15s",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          gap: 8,
                          marginBottom: 4,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            flexWrap: "wrap",
                            minWidth: 0,
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: "0.85rem",
                              fontWeight: 600,
                              color: CHARCOAL,
                            }}
                          >
                            {m.name}
                          </span>
                          {!m.read && (
                            <span
                              style={{
                                background: "#c0392b",
                                color: "white",
                                fontSize: "0.52rem",
                                fontWeight: 700,
                                padding: "2px 6px",
                                textTransform: "uppercase",
                                letterSpacing: "0.08em",
                                flexShrink: 0,
                              }}
                            >
                              New
                            </span>
                          )}
                          {m.service && (
                            <span
                              style={{
                                background: "#f0f5f0",
                                color: SAGE_DARK,
                                fontSize: "0.58rem",
                                fontWeight: 600,
                                padding: "2px 7px",
                                fontFamily: "'DM Sans', sans-serif",
                                letterSpacing: "0.06em",
                                flexShrink: 0,
                              }}
                            >
                              {m.service}
                            </span>
                          )}
                        </div>
                        <span
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "0.62rem",
                            color: MUTED,
                            whiteSpace: "nowrap",
                            flexShrink: 0,
                          }}
                        >
                          {formatMessageDate(m.createdAt)}
                        </span>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          gap: 12,
                          marginBottom: 8,
                          flexWrap: "wrap",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "0.7rem",
                            color: MUTED,
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                          }}
                        >
                          <Mail size={9} /> {m.email}
                        </span>
                        {m.phone && (
                          <span
                            style={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: "0.7rem",
                              color: MUTED,
                            }}
                          >
                            {m.phone}
                          </span>
                        )}
                      </div>

                      {m.message && (
                        <p
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "0.78rem",
                            color: CHARCOAL,
                            lineHeight: 1.65,
                            margin: "0 0 10px",
                            padding: "8px 12px",
                            background: "rgba(0,0,0,0.025)",
                            fontWeight: 300,
                          }}
                        >
                          {m.message}
                        </p>
                      )}

                      <div
                        style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}
                      >
                        {!m.read && (
                          <button
                            onClick={() => markRead(m._id)}
                            style={{
                              padding: "4px 10px",
                              background: "#f0f5f0",
                              border: `1px solid ${SAGE}`,
                              cursor: "pointer",
                              color: SAGE_DARK,
                              display: "flex",
                              alignItems: "center",
                              gap: 5,
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: "0.65rem",
                              fontWeight: 500,
                              letterSpacing: "0.04em",
                            }}
                          >
                            <CheckCheck size={11} /> Mark read
                          </button>
                        )}
                        <button
                          onClick={() => deleteMessage(m._id)}
                          style={{
                            padding: "4px 8px",
                            background: "#fef2f2",
                            border: "none",
                            cursor: "pointer",
                            color: "#c0392b",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  ))
                ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
