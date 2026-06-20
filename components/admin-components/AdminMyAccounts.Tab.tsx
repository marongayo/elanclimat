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
          My Account
        </h1>
        <p
          style={{
            fontFamily: "DM Sans",
            fontSize: "0.85rem",
            color: "var(--text-muted)",
            marginTop: 4,
          }}
        >
          Manage your personal admin details
        </p>
      </div>

      {unTarget && (
        <Modal
          open={!!unTarget}
          onClose={closeUsernameModal}
          title="Change Username"
          maxWidth={440}
        >
          <div style={{ display: "grid", gap: 16 }}>
            <div>
              <label style={LABEL_STYLE}>New Name *</label>
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
            </div>
            {unError && <span style={ERROR_TEXT}>{unError}</span>}
            <div
              style={{
                display: "flex",
                gap: 10,
                justifyContent: "flex-end",
                paddingTop: 4,
              }}
            >
              <button
                onClick={closeUsernameModal}
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
                onClick={submitUsername}
                disabled={unSaving}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 24px",
                  background: unSaving
                    ? "var(--text-muted)"
                    : "var(--charcoal)",
                  color: "white",
                  border: "none",
                  cursor: unSaving ? "not-allowed" : "pointer",
                  fontFamily: "DM Sans",
                  fontSize: "0.85rem",
                }}
              >
                <Save size={14} /> {unSaving ? "Saving..." : "Update Name"}
              </button>
            </div>
          </div>
        </Modal>
      )}

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

      {currentAdmin && (
        <div style={{ maxWidth: 540 }}>
          <div
            style={{
              background: "white",
              padding: "28px 24px",
              marginBottom: 2,
              display: "flex",
              alignItems: "center",
              gap: 20,
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: role === "superadmin" ? "#111" : "var(--off-white)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                color: role === "superadmin" ? "white" : "var(--text-muted)",
              }}
            >
              {role === "superadmin" ? (
                <ShieldCheck size={24} />
              ) : (
                <UserCircle size={24} />
              )}
            </div>
            <div>
              <div
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "1.4rem",
                  fontWeight: 600,
                  color: "var(--charcoal)",
                }}
              >
                {currentAdmin.name}
              </div>
              <div
                style={{
                  fontFamily: "DM Sans",
                  fontSize: "0.78rem",
                  color: "var(--text-muted)",
                  marginTop: 2,
                }}
              >
                {currentAdmin.email}
              </div>
              <span
                style={{
                  display: "inline-flex",
                  marginTop: 8,
                  fontFamily: "DM Sans",
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  background:
                    role === "superadmin" ? "#111" : "var(--off-white)",
                  color: role === "superadmin" ? "white" : "var(--text-muted)",
                  padding: "3px 10px",
                  borderRadius: 9999,
                }}
              >
                {role === "superadmin" ? "Super Admin" : "Admin"}
              </span>
            </div>
          </div>

          {[
            {
              icon: <UserPen size={18} />,
              title: "Change Username",
              desc: "Update the display name shown across the admin panel.",
              action: () => openUsernameModal(currentAdmin),
              label: "Change Name",
            },
            {
              icon: <KeyRound size={18} />,
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
                marginBottom: 2,
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <div style={{ color: "var(--text-muted)", flexShrink: 0 }}>
                {item.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: "DM Sans",
                    fontSize: "0.88rem",
                    fontWeight: 600,
                    color: "var(--charcoal)",
                  }}
                >
                  {item.title}
                </div>
                <div
                  style={{
                    fontFamily: "DM Sans",
                    fontSize: "0.75rem",
                    color: "var(--text-muted)",
                    marginTop: 2,
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
                  background: "var(--charcoal)",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "DM Sans",
                  fontSize: "0.8rem",
                }}
              >
                {item.label}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
