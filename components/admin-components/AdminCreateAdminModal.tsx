// components/admin-components/AdminCreateAdminModal.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { UserPlus, X, Save } from "lucide-react";
import type { AdminForm, AdminFormErrors, Role } from "@/lib/types/admin";
import {
  INPUT_STYLE,
  INPUT_ERROR_STYLE,
  LABEL_STYLE,
  ERROR_TEXT,
  BTN_PRIMARY,
  BTN_GHOST,
  CHARCOAL,
  MUTED,
  OFF_WHITE,
  ACCENT,
} from "./_adminStyles";

export function AdminCreateAdminModal({
  adminForm,
  adminErrors,
  editAdminId,
  savingAdmin,
  onClose,
  onSave,
  onChange,
  onErrorClear,
}: {
  adminForm: AdminForm | null;
  adminErrors: AdminFormErrors;
  editAdminId: string | null;
  savingAdmin: boolean;
  onClose: () => void;
  onSave: () => void;
  onChange: (form: AdminForm) => void;
  onErrorClear: (field: keyof AdminFormErrors) => void;
}) {
  if (!adminForm) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="admin-modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(26,26,24,0.55)",
          zIndex: 300,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px 16px",
          backdropFilter: "blur(2px)",
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          key="admin-modal"
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          transition={{ type: "spring", damping: 28, stiffness: 300 }}
          style={{
            background: "white",
            width: "100%",
            maxWidth: 480,
            boxShadow: "0 24px 80px rgba(0,0,0,0.22)",
            overflow: "hidden",
          }}
        >
          {/* Accent bar */}
          <div
            style={{
              height: 3,
              background: `linear-gradient(to right, ${ACCENT}, transparent 60%)`,
            }}
          />

          <div style={{ padding: "28px 28px 24px" }}>
            {/* Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: 24,
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.58rem",
                    fontWeight: 600,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: ACCENT,
                    margin: "0 0 6px",
                  }}
                >
                  Team
                </p>
                <h2
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.7rem",
                    fontWeight: 400,
                    color: CHARCOAL,
                    margin: 0,
                    letterSpacing: "-0.015em",
                  }}
                >
                  {editAdminId ? "Edit Admin" : "New Admin"}
                </h2>
              </div>
              <button
                onClick={onClose}
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
                <X size={18} />
              </button>
            </div>

            <div style={{ display: "grid", gap: 18 }}>
              <div>
                <label style={LABEL_STYLE}>Full Name *</label>
                <input
                  value={adminForm.name}
                  onChange={(e) => {
                    onChange({ ...adminForm, name: e.target.value });
                    onErrorClear("name");
                  }}
                  style={adminErrors.name ? INPUT_ERROR_STYLE : INPUT_STYLE}
                  placeholder="Jane Smith"
                  autoFocus
                />
                {adminErrors.name && (
                  <span style={ERROR_TEXT}>{adminErrors.name}</span>
                )}
              </div>

              <div>
                <label style={LABEL_STYLE}>Email Address *</label>
                <input
                  type="email"
                  value={adminForm.email}
                  onChange={(e) => {
                    onChange({ ...adminForm, email: e.target.value });
                    onErrorClear("email");
                  }}
                  style={adminErrors.email ? INPUT_ERROR_STYLE : INPUT_STYLE}
                  placeholder="jane@elanclimat.co.ke"
                />
                {adminErrors.email && (
                  <span style={ERROR_TEXT}>{adminErrors.email}</span>
                )}
              </div>

              <div>
                <label style={LABEL_STYLE}>
                  Password{" "}
                  {editAdminId ? (
                    <span style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>
                      (leave blank to keep current)
                    </span>
                  ) : (
                    "*"
                  )}
                </label>
                <input
                  type="password"
                  value={adminForm.password}
                  onChange={(e) => {
                    onChange({ ...adminForm, password: e.target.value });
                    onErrorClear("password");
                  }}
                  style={adminErrors.password ? INPUT_ERROR_STYLE : INPUT_STYLE}
                  placeholder={
                    editAdminId ? "Leave blank to keep unchanged" : "Minimum 8 characters"
                  }
                />
                {adminErrors.password && (
                  <span style={ERROR_TEXT}>{adminErrors.password}</span>
                )}
              </div>

              <div>
                <label style={LABEL_STYLE}>Role *</label>
                <select
                  value={adminForm.role}
                  onChange={(e) =>
                    onChange({ ...adminForm, role: e.target.value as Role })
                  }
                  style={INPUT_STYLE}
                >
                  <option value="admin">Admin — Content Manager</option>
                  <option value="superadmin">Superadmin — Full Access</option>
                </select>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: 10,
                  justifyContent: "flex-end",
                  paddingTop: 8,
                  borderTop: `1px solid ${OFF_WHITE}`,
                }}
              >
                <button onClick={onClose} style={BTN_GHOST}>
                  Cancel
                </button>
                <button
                  onClick={onSave}
                  disabled={savingAdmin}
                  style={{
                    ...BTN_PRIMARY,
                    opacity: savingAdmin ? 0.6 : 1,
                    cursor: savingAdmin ? "not-allowed" : "pointer",
                  }}
                >
                  <Save size={14} />
                  {savingAdmin
                    ? editAdminId
                      ? "Saving..."
                      : "Creating..."
                    : editAdminId
                      ? "Save Changes"
                      : "Create Admin"}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
