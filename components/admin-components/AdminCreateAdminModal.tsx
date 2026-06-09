// components/admin-components/AdminCreateAdminModal.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { UserPlus, X, Save } from "lucide-react";
import type { AdminForm, AdminFormErrors, Role } from "@/lib/types/admin";
import { INPUT_STYLE, INPUT_ERROR_STYLE, LABEL_STYLE, ERROR_TEXT } from "./_adminStyles";

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
          background: "rgba(0,0,0,0.4)",
          zIndex: 300,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px 16px",
        }}
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <motion.div
          key="admin-modal"
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 12 }}
          transition={{ type: "spring", damping: 28, stiffness: 300 }}
          style={{
            background: "white",
            width: "100%",
            maxWidth: 480,
            padding: "32px 28px",
            boxShadow: "0 20px 80px rgba(0,0,0,0.2)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <UserPlus size={18} color="var(--charcoal)" />
              <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.7rem", fontWeight: 600, color: "var(--charcoal)", margin: 0 }}>
                {editAdminId ? "Edit Admin" : "New Admin"}
              </h2>
            </div>
            <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", display: "flex", alignItems: "center" }}>
              <X size={20} />
            </button>
          </div>

          <div style={{ display: "grid", gap: 18 }}>
            <div>
              <label style={LABEL_STYLE}>Full Name *</label>
              <input
                value={adminForm.name}
                onChange={(e) => { onChange({ ...adminForm, name: e.target.value }); onErrorClear("name"); }}
                style={adminErrors.name ? INPUT_ERROR_STYLE : INPUT_STYLE}
                placeholder="Jane Smith"
              />
              {adminErrors.name && <span style={ERROR_TEXT}>{adminErrors.name}</span>}
            </div>

            <div>
              <label style={LABEL_STYLE}>Email Address *</label>
              <input
                type="email"
                value={adminForm.email}
                onChange={(e) => { onChange({ ...adminForm, email: e.target.value }); onErrorClear("email"); }}
                style={adminErrors.email ? INPUT_ERROR_STYLE : INPUT_STYLE}
                placeholder="jane@example.com"
              />
              {adminErrors.email && <span style={ERROR_TEXT}>{adminErrors.email}</span>}
            </div>

            <div>
              <label style={LABEL_STYLE}>Password {editAdminId ? "(leave blank to keep current)" : "*"}</label>
              <input
                type="password"
                value={adminForm.password}
                onChange={(e) => { onChange({ ...adminForm, password: e.target.value }); onErrorClear("password"); }}
                style={adminErrors.password ? INPUT_ERROR_STYLE : INPUT_STYLE}
                placeholder={editAdminId ? "Leave blank to keep unchanged" : "Minimum 8 characters"}
              />
              {adminErrors.password && <span style={ERROR_TEXT}>{adminErrors.password}</span>}
            </div>

            <div>
              <label style={LABEL_STYLE}>Role *</label>
              <select
                value={adminForm.role}
                onChange={(e) => onChange({ ...adminForm, role: e.target.value as Role })}
                style={INPUT_STYLE}
              >
                <option value="admin">Admin — Content Manager</option>
                <option value="superadmin">Superadmin — Full Access</option>
              </select>
            </div>

            <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", paddingTop: 4 }}>
              <button
                onClick={onClose}
                style={{ padding: "10px 20px", background: "none", border: "1px solid var(--off-white)", cursor: "pointer", fontFamily: "DM Sans", fontSize: "0.85rem", color: "var(--text-muted)" }}
              >
                Cancel
              </button>
              <button
                onClick={onSave}
                disabled={savingAdmin}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 24px",
                  background: savingAdmin ? "var(--text-muted)" : "var(--charcoal)",
                  color: "white",
                  border: "none",
                  cursor: savingAdmin ? "not-allowed" : "pointer",
                  fontFamily: "DM Sans",
                  fontSize: "0.85rem",
                }}
              >
                <Save size={15} />
                {savingAdmin
                  ? editAdminId ? "Saving..." : "Creating..."
                  : editAdminId ? "Save Changes" : "Create Admin"}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
