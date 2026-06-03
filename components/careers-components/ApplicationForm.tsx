"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { Eyebrow } from "./Eyebrow";
import { C, Role } from "@/components/careers-components/_tokens";

interface AppForm {
  fullName: string;
  email: string;
  phone: string;
  linkedin: string;
  coverLetter: string;
  cvFile: File | null;
  cvFileName: string;
}

const EMPTY_FORM: AppForm = {
  fullName: "",
  email: "",
  phone: "",
  linkedin: "",
  coverLetter: "",
  cvFile: null,
  cvFileName: "",
};

// ─── Field wrapper ────────────────────────────────────────────────────────────
function Field({
  label,
  required,
  error,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: 8,
        }}
      >
        <label
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.58rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase" as const,
            color: error ? "#b05a45" : C.muted,
            fontWeight: 500,
          }}
        >
          {label}
          {required && (
            <span style={{ color: C.sage, marginLeft: 4, fontSize: "0.75rem" }}>
              ·
            </span>
          )}
        </label>
        {hint && (
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.58rem",
              color: C.dim,
              letterSpacing: "0.04em",
            }}
          >
            {hint}
          </span>
        )}
      </div>

      {children}

      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.62rem",
              color: "#b05a45",
              letterSpacing: "0.03em",
              marginTop: 6,
            }}
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── ApplicationForm ──────────────────────────────────────────────────────────
export function ApplicationForm({
  role,
  onSuccess,
  onCancel,
}: {
  role: Role;
  onSuccess: () => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<AppForm>(EMPTY_FORM);
  const [focused, setFocused] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof AppForm, string>>>(
    {},
  );
  const fileRef = useRef<HTMLInputElement>(null);

  const set = (k: keyof AppForm, v: string) =>
    setForm((p) => ({ ...p, [k]: v }));

  const lineInput = (field: string): React.CSSProperties => ({
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.88rem",
    color: C.charcoal,
    background: "transparent",
    border: "none",
    borderBottom: `1px solid ${
      errors[field as keyof AppForm]
        ? "#b05a45"
        : focused === field
          ? C.charcoal
          : C.rule
    }`,
    padding: "10px 0",
    width: "100%",
    outline: "none",
    fontWeight: 300,
    transition: "border-color 0.25s",
    borderRadius: 0,
    lineHeight: 1.5,
  });

  function validate() {
    const e: Partial<Record<keyof AppForm, string>> = {};
    if (!form.fullName.trim()) e.fullName = "Required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      e.email = "Valid email required";
    if (!form.coverLetter.trim() || form.coverLetter.trim().length < 40)
      e.coverLetter = "Please write a little more";
    if (!form.cvFile) e.cvFileName = "Please attach your CV";
    return e;
  }

  async function handleSubmit() {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setErrors({});
    setSending(true);
    await new Promise((r) => setTimeout(r, 1600));
    setSending(false);
    onSuccess();
  }

  const charCount = form.coverLetter.trim().length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="app-form-inner"
      style={{ borderTop: `1px solid ${C.rule}` }}
    >
      <style>{`
        .app-form-2col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0 48px;
        }
        @media (max-width: 640px) {
          .app-form-2col { grid-template-columns: 1fr; gap: 28px 0; }
        }
      `}</style>

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div
        style={{
          padding: "36px 0 32px",
          borderBottom: `1px solid ${C.rule}`,
          marginBottom: 40,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 20,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Eyebrow text="Your Application" />
          <h3
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.45rem, 2.5vw, 1.9rem)",
              fontWeight: 400,
              color: C.charcoal,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            {role.title}
          </h3>
        </div>

        {/* Pills */}
        <div
          style={{ display: "flex", gap: 8, flexWrap: "wrap", paddingTop: 4 }}
        >
          {[role.location, role.type, role.category].map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.58rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase" as const,
                color: C.muted,
                border: `1px solid ${C.rule}`,
                padding: "5px 11px",
                whiteSpace: "nowrap" as const,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* ── Fields ─────────────────────────────────────────────────────── */}
      <div
        style={{
          maxWidth: 720,
          display: "flex",
          flexDirection: "column",
          gap: 32,
        }}
      >
        {/* Full name + Email */}
        <div className="app-form-2col">
          <Field label="Full name" required error={errors.fullName}>
            <input
              style={lineInput("fullName")}
              value={form.fullName}
              placeholder="Ada Osei"
              onFocus={() => setFocused("fullName")}
              onBlur={() => setFocused(null)}
              onChange={(e) => {
                set("fullName", e.target.value);
                if (errors.fullName)
                  setErrors((p) => ({ ...p, fullName: undefined }));
              }}
            />
          </Field>
          <Field label="Email address" required error={errors.email}>
            <input
              style={lineInput("email")}
              type="email"
              value={form.email}
              placeholder="ada@example.com"
              onFocus={() => setFocused("email")}
              onBlur={() => setFocused(null)}
              onChange={(e) => {
                set("email", e.target.value);
                if (errors.email)
                  setErrors((p) => ({ ...p, email: undefined }));
              }}
            />
          </Field>
        </div>

        {/* Phone + LinkedIn */}
        <div className="app-form-2col">
          <Field label="Phone" hint="optional">
            <input
              style={lineInput("phone")}
              type="tel"
              value={form.phone}
              placeholder="+254 7xx xxx xxx"
              onFocus={() => setFocused("phone")}
              onBlur={() => setFocused(null)}
              onChange={(e) => set("phone", e.target.value)}
            />
          </Field>
          <Field label="LinkedIn" hint="optional">
            <input
              style={lineInput("linkedin")}
              value={form.linkedin}
              placeholder="linkedin.com/in/yourname"
              onFocus={() => setFocused("linkedin")}
              onBlur={() => setFocused(null)}
              onChange={(e) => set("linkedin", e.target.value)}
            />
          </Field>
        </div>

        {/* Cover letter */}
        <Field
          label="Cover letter"
          required
          error={errors.coverLetter}
          hint={charCount > 0 ? `${charCount} chars` : undefined}
        >
          <textarea
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.86rem",
              color: C.charcoal,
              background: "#ffffff",
              border: `1px solid ${
                errors.coverLetter
                  ? "#b05a45"
                  : focused === "coverLetter"
                    ? C.charcoal
                    : C.rule
              }`,
              padding: "16px",
              width: "100%",
              outline: "none",
              fontWeight: 300,
              lineHeight: 1.85,
              resize: "none",
              minHeight: 148,
              borderRadius: 0,
              transition: "border-color 0.25s",
            }}
            value={form.coverLetter}
            placeholder="Tell us who you are, what draws you to this role, and what you would bring to Élan."
            onFocus={() => setFocused("coverLetter")}
            onBlur={() => setFocused(null)}
            onChange={(e) => {
              set("coverLetter", e.target.value);
              if (errors.coverLetter)
                setErrors((p) => ({ ...p, coverLetter: undefined }));
            }}
          />
        </Field>

        {/* CV upload */}
        <Field
          label="CV / Résumé"
          required
          error={errors.cvFileName}
          hint="PDF · max 10 MB"
        >
          <input
            ref={fileRef}
            type="file"
            accept=".pdf"
            aria-label="Upload your CV (PDF only)"
            style={{ display: "none" }}
            onChange={(e) => {
              const file = e.target.files?.[0] ?? null;
              setForm((p) => ({
                ...p,
                cvFile: file,
                cvFileName: file?.name ?? "",
              }));
              setErrors((p) => ({ ...p, cvFileName: undefined }));
            }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "stretch",
              gap: 8,
            }}
          >
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              onFocus={() => setFocused("cv")}
              onBlur={() => setFocused(null)}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = C.charcoal;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = errors.cvFileName
                  ? "#b05a45"
                  : focused === "cv"
                    ? C.charcoal
                    : C.rule;
              }}
              style={{
                flex: 1,
                border: `1px solid ${
                  errors.cvFileName
                    ? "#b05a45"
                    : focused === "cv"
                      ? C.charcoal
                      : C.rule
                }`,
                padding: "18px 20px",
                cursor: "pointer",
                background: form.cvFileName ? "#ffffff" : "transparent",
                display: "flex",
                alignItems: "center",
                gap: 16,
                outline: "none",
                transition: "border-color 0.25s, background 0.25s",
                textAlign: "left",
              }}
              aria-label="Upload your CV PDF"
            >
              {/* Icon circle */}
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: form.cvFileName ? C.charcoal : C.offWhite,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "background 0.25s",
                }}
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={form.cvFileName ? "#ffffff" : C.muted}
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.84rem",
                    color: form.cvFileName ? C.charcoal : C.muted,
                    fontWeight: form.cvFileName ? 400 : 300,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {form.cvFileName || "Upload your CV"}
                </div>

                {!form.cvFileName && (
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.62rem",
                      color: C.dim,
                      marginTop: 3,
                      letterSpacing: "0.05em",
                    }}
                  >
                    Click to browse — PDF only
                  </div>
                )}
              </div>
            </button>

            {form.cvFileName && (
              <button
                type="button"
                aria-label="Remove uploaded CV"
                onClick={() => {
                  setForm((p) => ({
                    ...p,
                    cvFile: null,
                    cvFileName: "",
                  }));

                  if (fileRef.current) {
                    fileRef.current.value = "";
                  }
                }}
                style={{
                  width: 52,
                  border: `1px solid ${C.rule}`,
                  background: "#fff",
                  cursor: "pointer",
                  color: C.dim,
                  fontSize: "1.2rem",
                  lineHeight: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.25s",
                }}
              >
                ×
              </button>
            )}
          </div>
        </Field>
      </div>

      {/* ── Actions ─────────────────────────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 28,
          marginTop: 40,
          paddingTop: 32,
          paddingBottom: 48,
          borderTop: `1px solid ${C.rule}`,
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={handleSubmit}
          disabled={sending}
          onMouseEnter={(e) => {
            if (!sending)
              (e.currentTarget as HTMLButtonElement).style.transform =
                "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform =
              "translateY(0)";
          }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            background: sending ? C.muted : C.charcoal,
            color: "#fff",
            border: "none",
            cursor: sending ? "not-allowed" : "pointer",
            padding: "13px 12px 13px 26px",
            borderRadius: 9999,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.7rem",
            fontWeight: 500,
            letterSpacing: "0.12em",
            textTransform: "uppercase" as const,
            transition: "background 0.25s, transform 0.15s",
            transform: "translateY(0)",
          }}
        >
          {sending ? "Submitting…" : "Submit Application"}
          <span
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {sending ? (
              <Loader2
                size={13}
                strokeWidth={2}
                style={{ animation: "careers-spin 0.9s linear infinite" }}
              />
            ) : (
              <ArrowUpRight size={13} strokeWidth={2} />
            )}
          </span>
        </button>

        <button
          onClick={onCancel}
          disabled={sending}
          onMouseEnter={(e) => {
            if (!sending)
              (e.currentTarget as HTMLButtonElement).style.color = C.muted;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = C.dim;
          }}
          style={{
            background: "none",
            border: "none",
            cursor: sending ? "not-allowed" : "pointer",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.65rem",
            color: C.dim,
            letterSpacing: "0.1em",
            textTransform: "uppercase" as const,
            paddingBottom: 2,
            borderBottom: `1px solid ${C.rule}`,
            opacity: sending ? 0.4 : 1,
            transition: "color 0.2s, opacity 0.2s",
          }}
        >
          Cancel
        </button>

        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.58rem",
            color: C.dim,
            letterSpacing: "0.06em",
            marginLeft: "auto",
          }}
        >
          · required fields
        </span>
      </div>
    </motion.div>
  );
}
