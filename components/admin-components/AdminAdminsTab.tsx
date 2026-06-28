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
  SECTION_HEADING,
  EYEBROW,
  BTN_PRIMARY,
  BTN_GHOST,
  CHARCOAL,
  SAGE,
  SAGE_DARK,
  MUTED,
  OFF_WHITE,
} from "./_adminStyles";

export function AdminAdminsTab({
  admins,
  currentUserId,
  isTrueSuperadmin,
  deleteAdmin,
  changeAdminPassword,
  changeAdminUsername,
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
    <div style={{ maxWidth: 820 }}>
      {/* Page header */}
      <div style={{ marginBottom: 40 }}>
        <p style={EYEBROW}>Team</p>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 16,
            marginTop: 8,
          }}
        >
          <div>
            <h1 style={SECTION_HEADING}>Admin Users</h1>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.82rem",
                color: MUTED,
                marginTop: 6,
                fontWeight: 300,
              }}
            >
              {admins.length} {admins.length === 1 ? "user" : "users"} with access
            </p>
          </div>
          {isTrueSuperadmin && (
            <button onClick={() => onOpenCreateAdmin()} style={BTN_PRIMARY}>
              + New Admin
            </button>
          )}
        </div>
        <div style={{ width: 32, height: 1, background: "#c9a96e", marginTop: 16 }} />
      </div>

      {/* Password change modal */}
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
              style={{ display: "flex", gap: 10, justifyContent: "flex-end", paddingTop: 4 }}
            >
              <button onClick={closePasswordModal} style={BTN_GHOST}>
                Cancel
              </button>
              <button
                onClick={submitPassword}
                disabled={pwSaving}
                style={{
                  ...BTN_PRIMARY,
                  opacity: pwSaving ? 0.6 : 1,
                  cursor: pwSaving ? "not-allowed" : "pointer",
                }}
              >
                <KeyRound size={14} />
                {pwSaving ? "Saving..." : "Update Password"}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Admins list */}
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
                gap: 16,
                padding: "18px 20px",
                borderLeft: isSelf ? `3px solid ${SAGE}` : "3px solid transparent",
                transition: "border-color 0.2s",
              }}
            >
              {/* Avatar */}
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: "50%",
                  background: isSuperadmin ? CHARCOAL : OFF_WHITE,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  color: isSuperadmin ? "#c9a96e" : MUTED,
                }}
              >
                {isSuperadmin ? <ShieldCheck size={17} /> : <Shield size={17} />}
              </div>

              {/* Identity */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.88rem",
                      fontWeight: 600,
                      color: CHARCOAL,
                    }}
                  >
                    {a.name}
                  </span>
                  {isSelf && (
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.58rem",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        background: "#f0f5f0",
                        color: SAGE_DARK,
                        padding: "2px 8px",
                      }}
                    >
                      You
                    </span>
                  )}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.72rem",
                    color: MUTED,
                    marginTop: 2,
                  }}
                >
                  {a.email}
                </div>
              </div>

              {/* Role badge */}
              <div style={{ flexShrink: 0 }}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.58rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    background: isSuperadmin ? CHARCOAL : OFF_WHITE,
                    color: isSuperadmin ? "#c9a96e" : MUTED,
                    padding: "3px 12px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {isSuperadmin ? "Super Admin" : "Admin"}
                </span>
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: 6, flexShrink: 0, alignItems: "center" }}>
                {isTrueSuperadmin && !isSelf && !isSuperadmin && (
                  <button
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
                  </button>
                )}
                <button
                  onClick={() => openPasswordModal(a)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    padding: "7px 12px",
                    background: OFF_WHITE,
                    border: "none",
                    cursor: "pointer",
                    color: MUTED,
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.72rem",
                  }}
                >
                  <KeyRound size={12} />
                </button>
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
                    padding: "7px 12px",
                    background: OFF_WHITE,
                    border: "none",
                    cursor: "pointer",
                    color: CHARCOAL,
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.72rem",
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
