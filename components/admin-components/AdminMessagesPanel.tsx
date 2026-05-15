"use client";
import { X, Trash2, Mail, Archive, Inbox, CheckCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Message } from "@/lib/types/message";

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
  if (diffMins < 60) return `${diffMins} min${diffMins === 1 ? "" : "s"} ago`;
  if (diffHours < 24)
    return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
  if (diffDays < 6) return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;

  return (
    date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }) +
    " · " +
    date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })
  );
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
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 12 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            style={{
              position: "fixed",
              bottom: 72,
              left: 12,
              width: 340,
              maxWidth: "calc(100vw - 24px)",
              height: "min(50vh, 520px)",
              maxHeight: "calc(100vh - 90px)",
              background: "white",
              zIndex: 301,
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
              borderRadius: 12,
              overflow: "hidden",
              border: "1px solid var(--off-white)",
            }}
          >
            {/* Panel header */}
            <div
              style={{
                padding: "14px 16px 10px",
                borderBottom: "1px solid var(--off-white)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexShrink: 0,
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    color: "var(--charcoal)",
                  }}
                >
                  {showingArchive ? "Archive" : "Admin"}
                </div>
                <div
                  style={{
                    fontFamily: "DM Sans",
                    fontSize: "0.7rem",
                    color: "var(--text-muted)",
                    marginTop: 1,
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
                      color: "var(--text-muted)",
                      padding: "4px 8px",
                      borderRadius: 6,
                      fontFamily: "DM Sans",
                      fontSize: "1.2rem",
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
                        initial={{ opacity: 0, y: -6, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.95 }}
                        transition={{ duration: 0.12 }}
                        style={{
                          position: "absolute",
                          top: "calc(100% + 4px)",
                          right: 0,
                          background: "white",
                          border: "1px solid var(--off-white)",
                          borderRadius: 8,
                          boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
                          zIndex: 10,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          minWidth: 140,
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
                            fontFamily: "DM Sans",
                            fontSize: "0.82rem",
                            color: "var(--charcoal)",
                            width: "100%",
                            transition: "background 0.15s",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.background =
                              "var(--sage-pale)")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.background = "none")
                          }
                        >
                          <Archive size={13} />
                          {showingArchive
                            ? "← Active Messages"
                            : "Load Archive"}
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
                    color: "var(--text-muted)",
                    display: "flex",
                    alignItems: "center",
                    padding: 4,
                    borderRadius: 6,
                  }}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Panel body */}
            <div style={{ flex: 1, overflowY: "auto" }}>
              {/* ARCHIVE VIEW */}
              {showingArchive &&
                (loadingArchive ? (
                  <div
                    style={{
                      padding: "24px",
                      textAlign: "center",
                      fontFamily: "DM Sans",
                      fontSize: "0.8rem",
                      color: "var(--text-muted)",
                    }}
                  >
                    Loading archive...
                  </div>
                ) : archivedMessages.length === 0 ? (
                  <div
                    style={{
                      padding: "48px 24px",
                      textAlign: "center",
                      fontFamily: "DM Sans",
                      fontSize: "0.82rem",
                      color: "var(--text-muted)",
                    }}
                  >
                    No archived messages.
                  </div>
                ) : (
                  <>
                    <div
                      style={{
                        padding: "8px 16px",
                        fontFamily: "DM Sans",
                        fontSize: "0.62rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "var(--text-muted)",
                        background: "var(--warm-white)",
                        borderBottom: "1px solid var(--off-white)",
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
                          padding: "12px 16px",
                          borderBottom: "1px solid var(--off-white)",
                          background: "var(--warm-white)",
                          borderLeft: "3px solid var(--off-white)",
                          opacity: 0.8,
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
                            }}
                          >
                            <span
                              style={{
                                fontFamily: "DM Sans",
                                fontSize: "0.83rem",
                                fontWeight: 600,
                                color: "var(--charcoal)",
                              }}
                            >
                              {m.name}
                            </span>
                            {m.service && (
                              <span
                                style={{
                                  background: "var(--sage)",
                                  color: "var(--charcoal)",
                                  fontSize: "0.62rem",
                                  padding: "2px 7px",
                                  borderRadius: 9999,
                                  fontFamily: "DM Sans",
                                }}
                              >
                                {m.service}
                              </span>
                            )}
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 6,
                              flexShrink: 0,
                            }}
                          >
                            <span
                              style={{
                                fontFamily: "DM Sans",
                                fontSize: "0.63rem",
                                color: "var(--text-muted)",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {formatMessageDate(m.createdAt)}
                            </span>
                            <button
                              onClick={() => deleteMessage(m.id, true)}
                              style={{
                                padding: "3px 5px",
                                background: "#fef2f2",
                                border: "none",
                                cursor: "pointer",
                                color: "#c0392b",
                                borderRadius: 3,
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
                            fontFamily: "DM Sans",
                            fontSize: "0.7rem",
                            color: "var(--text-muted)",
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                            marginBottom: m.message ? 6 : 0,
                          }}
                        >
                          <Mail size={10} /> {m.email}
                        </div>
                        {m.message && (
                          <p
                            style={{
                              fontFamily: "DM Sans",
                              fontSize: "0.76rem",
                              color: "var(--text-muted)",
                              lineHeight: 1.55,
                              margin: 0,
                            }}
                          >
                            {m.message}
                          </p>
                        )}
                      </div>
                    ))}
                  </>
                ))}

              {/* ACTIVE MESSAGES VIEW */}
              {!showingArchive && (
                <>
                  {messages.length === 0 ? (
                    <div style={{ padding: "48px 24px", textAlign: "center" }}>
                      <Inbox
                        size={28}
                        style={{
                          color: "var(--text-muted)",
                          opacity: 0.3,
                          marginBottom: 10,
                        }}
                      />
                      <p
                        style={{
                          fontFamily: "DM Sans",
                          fontSize: "0.82rem",
                          color: "var(--text-muted)",
                        }}
                      >
                        No messages yet.
                      </p>
                    </div>
                  ) : (
                    messages.map((m) => (
                      <div
                        key={m.id}
                        className="msg-item"
                        style={{
                          padding: "14px 16px",
                          borderBottom: "1px solid var(--off-white)",
                          background: m.read ? "white" : "var(--sage-pale)",
                          borderLeft: m.read
                            ? "3px solid transparent"
                            : "3px solid var(--sage-dark)",
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
                                fontFamily: "DM Sans",
                                fontSize: "0.85rem",
                                fontWeight: 600,
                                color: "var(--charcoal)",
                              }}
                            >
                              {m.name}
                            </span>
                            {!m.read && (
                              <span
                                style={{
                                  background: "#c0392b",
                                  color: "white",
                                  fontSize: "0.55rem",
                                  fontWeight: 700,
                                  padding: "2px 6px",
                                  borderRadius: 9999,
                                  textTransform: "uppercase",
                                  letterSpacing: "0.05em",
                                  flexShrink: 0,
                                }}
                              >
                                New
                              </span>
                            )}
                            {m.service && (
                              <span
                                style={{
                                  background: "var(--sage)",
                                  color: "var(--charcoal)",
                                  fontSize: "0.62rem",
                                  padding: "2px 7px",
                                  borderRadius: 9999,
                                  fontFamily: "DM Sans",
                                  flexShrink: 0,
                                }}
                              >
                                {m.service}
                              </span>
                            )}
                          </div>
                          <span
                            style={{
                              fontFamily: "DM Sans",
                              fontSize: "0.65rem",
                              color: "var(--text-muted)",
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
                              fontFamily: "DM Sans",
                              fontSize: "0.72rem",
                              color: "var(--text-muted)",
                              display: "flex",
                              alignItems: "center",
                              gap: 4,
                            }}
                          >
                            <Mail size={10} /> {m.email}
                          </span>
                          {m.phone && (
                            <span
                              style={{
                                fontFamily: "DM Sans",
                                fontSize: "0.72rem",
                                color: "var(--text-muted)",
                              }}
                            >
                              {m.phone}
                            </span>
                          )}
                        </div>

                        {m.message && (
                          <p
                            style={{
                              fontFamily: "DM Sans",
                              fontSize: "0.8rem",
                              color: "var(--charcoal)",
                              lineHeight: 1.6,
                              margin: "0 0 10px",
                              padding: "8px 10px",
                              background: "rgba(0,0,0,0.03)",
                              borderRadius: 4,
                            }}
                          >
                            {m.message}
                          </p>
                        )}

                        <div
                          style={{
                            display: "flex",
                            gap: 6,
                            justifyContent: "flex-end",
                          }}
                        >
                          {!m.read && (
                            <button
                              onClick={() => markRead(m.id)}
                              style={{
                                padding: "4px 10px",
                                background: "var(--sage-pale)",
                                border: "1px solid var(--sage)",
                                cursor: "pointer",
                                color: "var(--sage-dark)",
                                display: "flex",
                                alignItems: "center",
                                gap: 4,
                                fontFamily: "DM Sans",
                                fontSize: "0.68rem",
                                borderRadius: 4,
                              }}
                            >
                              <CheckCheck size={11} /> Mark read
                            </button>
                          )}
                          <button
                            onClick={() => deleteMessage(m.id)}
                            style={{
                              padding: "4px 8px",
                              background: "#fef2f2",
                              border: "none",
                              cursor: "pointer",
                              color: "#c0392b",
                              display: "flex",
                              alignItems: "center",
                              borderRadius: 4,
                            }}
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
