// components/admin-components/AdminAdminsTab.tsx
"use client";

import { useState } from "react";
import { Trash2, KeyRound, ShieldCheck, Shield, UserPen } from "lucide-react";
import Modal from "@/components/Modal";
import type { User } from "@/lib/types/admin";
import {
  INPUT_STYLE,
  INPUT_ERROR_STYLE,
  LABEL_STYLE,
  ERROR_TEXT,
} from "./_adminStyles";

export function AdminAdminsTab({
  admins,
  currentUserId,
  isTrueSuperadmin,
  deleteAdmin,
  changeAdminPassword,
  onOpenCreateAdmin,
  toast,
}: {
  admins: User[];
  currentUserId: string;
  isTrueSuperadmin: boolean;
  deleteAdmin: (id: string) => void;
  changeAdminPassword: (id: string, newPassword: string) => Promise<void>;
  changeAdminUsername: (id: string, newName: string) => Promise<void>;
  onOpenCreateAdmin: (admin?: {
    _id: string;
    name: string;
    email: string;
    role: string;
  }) => void;
  toast: (msg: string) => void;
}) {
  // Password modal
  const [pwTarget, setPwTarget] = useState<User | null>(null);
  const [pwValue, setPwValue] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");
  const [pwError, setPwError] = useState("");
  const [pwSaving, setPwSaving] = useState(false);

  const openPasswordModal = (admin: User) => {
    setPwTarget(admin);
    setPwValue("");
    setPwConfirm("");
    setPwError("");
  };
  const closePasswordModal = () => {
    setPwTarget(null);
    setPwValue("");
    setPwConfirm("");
    setPwError("");
  };
  const submitPassword = async () => {
    if (pwValue.length < 8) {
      setPwError("Password must be at least 8 characters.");
      return;
    }
    if (pwValue !== pwConfirm) {
      setPwError("Passwords do not match.");
      return;
    }
    setPwSaving(true);
    try {
      await changeAdminPassword(pwTarget!._id, pwValue);
      toast("Password updated successfully.");
      closePasswordModal();
    } catch {
      setPwError("Failed to update password. Please try again.");
    } finally {
      setPwSaving(false);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "clamp(1.6rem, 5vw, 2.2rem)",
            fontWeight: 600,
            color: "var(--charcoal)",
          }}
        >
          Admins
        </h1>
        <p
          style={{
            fontFamily: "DM Sans",
            fontSize: "0.85rem",
            color: "var(--text-muted)",
            marginTop: 4,
          }}
        >
          {admins.length} {admins.length === 1 ? "user" : "users"} with admin
          access
        </p>
      </div>

      {pwTarget && (
        <Modal
          open={!!pwTarget}
          onClose={closePasswordModal}
          title={`Change Password — ${pwTarget.name}`}
          maxWidth={440}
        >
          <div style={{ display: "grid", gap: 16 }}>
            <div>
              <label style={LABEL_STYLE}>New Password *</label>
              <input
                type="password"
                value={pwValue}
                onChange={(e) => {
                  setPwValue(e.target.value);
                  setPwError("");
                }}
                style={pwError ? INPUT_ERROR_STYLE : INPUT_STYLE}
                placeholder="Min. 8 characters"
                autoFocus
              />
            </div>
            <div>
              <label style={LABEL_STYLE}>Confirm Password *</label>
              <input
                type="password"
                value={pwConfirm}
                onChange={(e) => {
                  setPwConfirm(e.target.value);
                  setPwError("");
                }}
                style={pwError ? INPUT_ERROR_STYLE : INPUT_STYLE}
                placeholder="Repeat password"
              />
            </div>
            {pwError && <span style={ERROR_TEXT}>{pwError}</span>}
            <div
              style={{
                display: "flex",
                gap: 10,
                justifyContent: "flex-end",
                paddingTop: 4,
              }}
            >
              <button
                onClick={closePasswordModal}
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
                onClick={submitPassword}
                disabled={pwSaving}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 24px",
                  background: pwSaving
                    ? "var(--text-muted)"
                    : "var(--charcoal)",
                  color: "white",
                  border: "none",
                  cursor: pwSaving ? "not-allowed" : "pointer",
                  fontFamily: "DM Sans",
                  fontSize: "0.85rem",
                }}
              >
                <KeyRound size={14} />{" "}
                {pwSaving ? "Saving..." : "Update Password"}
              </button>
            </div>
          </div>
        </Modal>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {admins.map((a) => {
          const isSelf = a._id === currentUserId;
          const isSuperadmin = a.role === "superadmin";
          return (
            <div
              key={a._id}
              style={{
                background: "white",
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "14px 16px",
                borderLeft: isSelf
                  ? "3px solid var(--sage-dark)"
                  : "3px solid transparent",
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: isSuperadmin ? "#111" : "var(--off-white)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  color: isSuperadmin ? "white" : "var(--text-muted)",
                }}
              >
                {isSuperadmin ? (
                  <ShieldCheck size={18} />
                ) : (
                  <Shield size={18} />
                )}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "DM Sans",
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      color: "var(--charcoal)",
                    }}
                  >
                    {a.name}
                  </span>
                  {isSelf && (
                    <span
                      style={{
                        fontFamily: "DM Sans",
                        fontSize: "0.6rem",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        background: "var(--sage-pale)",
                        color: "var(--sage-dark)",
                        padding: "2px 8px",
                        borderRadius: 9999,
                      }}
                    >
                      You
                    </span>
                  )}
                </div>
                <div
                  style={{
                    fontFamily: "DM Sans",
                    fontSize: "0.75rem",
                    color: "var(--text-muted)",
                    marginTop: 2,
                  }}
                >
                  {a.email}
                </div>
              </div>

              <div style={{ width: 96, flexShrink: 0 }}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    fontFamily: "DM Sans",
                    fontSize: "0.6rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    background: isSuperadmin ? "#111" : "var(--off-white)",
                    color: isSuperadmin ? "white" : "var(--text-muted)",
                    padding: "3px 10px",
                    borderRadius: 9999,
                    whiteSpace: "nowrap",
                  }}
                >
                  {isSuperadmin ? "Super Admin" : "Admin"}
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: 6,
                  flexShrink: 0,
                  alignItems: "center",
                  width: 160,
                  justifyContent: "flex-end",
                }}
              >
                {isTrueSuperadmin && !isSelf && !isSuperadmin ? (
                  <div
                    onClick={() => deleteAdmin(a._id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "7px 10px",
                      background: "#fef2f2",
                      border: "none",
                      cursor: "pointer",
                      color: "#c0392b",
                    }}
                  >
                    <Trash2 size={13} />
                  </div>
                ) : (
                  <div style={{ width: 36 }} />
                )}
                <button
                  onClick={() =>
                    onOpenCreateAdmin({
                      _id: a._id,
                      name: a.name ?? "",
                      email: a.email ?? "",
                      role: a.role ?? "admin",
                    })
                  }
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    padding: "7px 10px",
                    background: "var(--off-white)",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--charcoal)",
                    fontFamily: "DM Sans",
                    fontSize: "0.75rem",
                  }}
                >
                  <UserPen size={13} /> Edit
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
