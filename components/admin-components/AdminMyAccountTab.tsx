// components/admin-components/AdminMyAccountTab.tsx
"use client";

import { useState } from "react";
import { Save, KeyRound, ShieldCheck, UserCircle, UserPen } from "lucide-react";
import Modal from "@/components/Modal";
import type { User, Role } from "@/lib/types/admin";
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
  ACCENT,
} from "./_adminStyles";

export function AdminMyAccountTab({
  currentAdmin,
  role,
  changeAdminPassword,
  changeAdminUsername,
  toast,
}: {
  currentAdmin: User | undefined;
  role: Role;
  changeAdminPassword: (id: string, newPassword: string) => Promise<void>;
  changeAdminUsername: (id: string, newName: string) => Promise<void>;
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

  // Username modal
  const [unTarget, setUnTarget] = useState<User | null>(null);
  const [unValue, setUnValue] = useState("");
  const [unError, setUnError] = useState("");
  const [unSaving, setUnSaving] = useState(false);

  const openUsernameModal = (admin: User) => {
    setUnTarget(admin);
    setUnValue(admin.name ?? "");
    setUnError("");
  };
  const closeUsernameModal = () => {
    setUnTarget(null);
    setUnValue("");
    setUnError("");
  };
  const submitUsername = async () => {
    if (!unValue.trim()) {
      setUnError("Name cannot be empty.");
      return;
    }
    setUnSaving(true);
    try {
      await changeAdminUsername(unTarget!._id, unValue.trim());
      toast("Username updated successfully.");
      closeUsernameModal();
    } catch {
      setUnError("Failed to update username. Please try again.");
    } finally {
      setUnSaving(false);
    }
  };

  const initials = currentAdmin?.name
    ? currentAdmin.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : role === "superadmin"
      ? "SA"
      : "A";

  return (
    <div style={{ maxWidth: 580 }}>
      {/* Page header */}
      <div style={{ marginBottom: 40 }}>
        <p style={EYEBROW}>Profile</p>
        <h1 style={{ ...SECTION_HEADING, marginTop: 8 }}>My Account</h1>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.82rem",
            color: MUTED,
            marginTop: 8,
            fontWeight: 300,
          }}
        >
          Manage your personal admin credentials and display name.
        </p>
        <div style={{ width: 32, height: 1, background: ACCENT, marginTop: 16 }} />
      </div>

      {/* Username modal */}
      {unTarget && (
        <Modal
          open={!!unTarget}
          onClose={closeUsernameModal}
          title="Change Username"
          maxWidth={440}
        >
          <div style={{ display: "grid", gap: 16 }}>
            <div>
              <label style={LABEL_STYLE}>New Display Name *</label>
              <input
                value={unValue}
                onChange={(e) => {
                  setUnValue(e.target.value);
                  setUnError("");
                }}
                style={unError ? INPUT_ERROR_STYLE : INPUT_STYLE}
                placeholder="Your full name"
                autoFocus
              />
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.65rem",
                  color: MUTED,
                  marginTop: 5,
                  display: "block",
                  fontWeight: 300,
                }}
              >
                This name will be auto-filled as the author on new blog posts.
              </span>
            </div>
            {unError && <span style={ERROR_TEXT}>{unError}</span>}
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", paddingTop: 4 }}>
              <button onClick={closeUsernameModal} style={BTN_GHOST}>
                Cancel
              </button>
              <button
                onClick={submitUsername}
                disabled={unSaving}
                style={{
                  ...BTN_PRIMARY,
                  opacity: unSaving ? 0.6 : 1,
                  cursor: unSaving ? "not-allowed" : "pointer",
                }}
              >
                <Save size={14} />
                {unSaving ? "Saving..." : "Update Name"}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Password modal */}
      {pwTarget && (
        <Modal
          open={!!pwTarget}
          onClose={closePasswordModal}
          title="Change Password"
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
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", paddingTop: 4 }}>
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

      {currentAdmin && (
        <>
          {/* Profile card */}
          <div
            style={{
              background: CHARCOAL,
              padding: "32px 28px",
              marginBottom: 1,
              display: "flex",
              alignItems: "center",
              gap: 20,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Decorative accent line */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: 2,
                background: `linear-gradient(to right, ${ACCENT}, transparent 50%)`,
              }}
            />
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background:
                  role === "superadmin"
                    ? "rgba(201,169,110,0.15)"
                    : "rgba(255,255,255,0.08)",
                border: `1px solid ${role === "superadmin" ? "rgba(201,169,110,0.4)" : "rgba(255,255,255,0.15)"}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                color:
                  role === "superadmin" ? ACCENT : "rgba(255,255,255,0.5)",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1.1rem",
                fontWeight: 700,
                letterSpacing: "0.04em",
              }}
            >
              {initials}
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.5rem",
                  fontWeight: 400,
                  color: "#ffffff",
                  letterSpacing: "-0.015em",
                  lineHeight: 1.1,
                }}
              >
                {currentAdmin.name}
              </div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.75rem",
                  color: "rgba(255,255,255,0.45)",
                  marginTop: 4,
                }}
              >
                {currentAdmin.email}
              </div>
              <span
                style={{
                  display: "inline-flex",
                  marginTop: 10,
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.58rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  background:
                    role === "superadmin"
                      ? "rgba(201,169,110,0.15)"
                      : "rgba(255,255,255,0.08)",
                  color: role === "superadmin" ? ACCENT : "rgba(255,255,255,0.5)",
                  padding: "3px 12px",
                  border: `1px solid ${role === "superadmin" ? "rgba(201,169,110,0.3)" : "rgba(255,255,255,0.12)"}`,
                }}
              >
                {role === "superadmin" ? "Super Admin · Full Access" : "Admin · Content Manager"}
              </span>
            </div>
          </div>

          {/* Action rows */}
          {[
            {
              icon: <UserPen size={17} />,
              title: "Change Display Name",
              desc: "Your name is auto-filled as the author when you create blog posts.",
              action: () => openUsernameModal(currentAdmin),
              label: "Change Name",
            },
            {
              icon: <KeyRound size={17} />,
              title: "Change Password",
              desc: "Set a new password for your account. Minimum 8 characters.",
              action: () => openPasswordModal(currentAdmin),
              label: "Change Password",
            },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                background: "white",
                padding: "20px 24px",
                marginBottom: 1,
                display: "flex",
                alignItems: "center",
                gap: 16,
                borderLeft: "3px solid transparent",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLDivElement).style.borderLeftColor = OFF_WHITE)
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLDivElement).style.borderLeftColor = "transparent")
              }
            >
              <div style={{ color: MUTED, flexShrink: 0 }}>{item.icon}</div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.88rem",
                    fontWeight: 600,
                    color: CHARCOAL,
                  }}
                >
                  {item.title}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.72rem",
                    color: MUTED,
                    marginTop: 3,
                    fontWeight: 300,
                  }}
                >
                  {item.desc}
                </div>
              </div>
              <button
                onClick={item.action}
                style={{
                  flexShrink: 0,
                  padding: "8px 18px",
                  background: "none",
                  border: `1px solid ${OFF_WHITE}`,
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: CHARCOAL,
                  transition: "border-color 0.15s, background 0.15s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = CHARCOAL;
                  (e.currentTarget as HTMLButtonElement).style.color = "#ffffff";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = CHARCOAL;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "none";
                  (e.currentTarget as HTMLButtonElement).style.color = CHARCOAL;
                  (e.currentTarget as HTMLButtonElement).style.borderColor = OFF_WHITE;
                }}
              >
                {item.label}
              </button>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
