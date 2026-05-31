// app/careers/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/Footer";
import { ArrowUpRight, CheckCircle2, Loader2 } from "lucide-react";

// ─── Design tokens — exact match to about/contact/services ───────────────────
const C = {
  charcoal: "#1a1a18",
  warmWhite: "#f9f7f4",
  offWhite: "#ede9e2",
  sage: "#8fa68e",
  sageDark: "#5a7a59",
  accent: "#c9a96e",
  muted: "#888580",
  body: "#6b6b68",
  rule: "#e8e4dd",
  ruleLight: "#c8c8c4",
  dim: "#b0b0a8",
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const ROLES = [
  {
    id: "hvac-tech",
    title: "HVAC Installation Technician",
    category: "Technical",
    location: "Nairobi, KE",
    type: "Full-time",
    index: "01",

    description:
      "Install, commission, and service high-efficiency HVAC systems across residential and commercial projects. You'll work alongside our senior engineers on premium builds where precision matters.",
    requirements: [
      "3+ years HVAC installation experience",
      "Familiarity with inverter split systems and VRF",
      "Valid electrical or mechanical certification",
      "Clean driving licence",
    ],
  },
  {
    id: "solar-engineer",
    title: "Solar Systems Engineer",
    category: "Technical",
    location: "Nairobi, KE",
    type: "Full-time",
    index: "02",

    description:
      "Design and oversee solar PV and battery storage installations from site survey through commissioning. You care about clean energy as much as we do.",
    requirements: [
      "Degree in Electrical or Renewable Energy Engineering",
      "Experience with off-grid and grid-tied systems",
      "Proficiency in PVsyst or similar design tools",
      "Strong client-facing communication skills",
    ],
  },
  {
    id: "project-coordinator",
    title: "Project Coordinator",
    category: "Operations",
    location: "Nairobi, KE",
    type: "Full-time",
    index: "03",

    description:
      "Keep our installation projects running on time and on budget. You'll coordinate between clients, procurement, and field teams — the connective tissue that makes everything work.",
    requirements: [
      "2+ years project coordination or site management",
      "Experience with MS Project or similar tools",
      "Excellent written and verbal communication",
      "Background in construction or MEP preferred",
    ],
  },
  {
    id: "sales-consultant",
    title: "Energy Solutions Consultant",
    category: "Sales",
    location: "Nairobi, KE",
    type: "Full-time",
    index: "04",

    description:
      "Introduce clients to our range of HVAC, solar, and battery solutions. You'll guide them from initial inquiry through system selection — warm conversations with people who already want what we offer.",
    requirements: [
      "Proven track record in consultative sales",
      "Genuine interest in sustainable energy and technology",
      "Ability to interpret technical product specifications",
      "Existing network in real estate or construction a plus",
    ],
  },
  {
    id: "brand-intern",
    title: "Brand & Communications Intern",
    category: "Creative",
    location: "Nairobi / Remote",
    type: "Internship",
    index: "05",

    description:
      "Help shape how Élan looks and sounds — from social content to product photography briefs. Real experience with a brand that takes aesthetics seriously.",
    requirements: [
      "Studying design, communications, or marketing",
      "Strong portfolio of visual work",
      "Familiarity with Adobe Creative Suite or Figma",
      "A genuine eye for quality and detail",
    ],
  },
];

const VALUES = [
  { num: "01", label: "Precision over speed" },
  { num: "02", label: "Sustainability as identity" },
  { num: "03", label: "Craft in everything" },
  { num: "04", label: "Long-term thinking" },
];

const STATS = [
  { num: "12+", label: "Years Operating" },
  { num: "400+", label: "Projects Delivered" },
  { num: "5", label: "Open Roles" },
];

type AppStatus = "idle" | "form" | "sending" | "success";
interface AppForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  portfolio: string;
  coverLetter: string;
  cvFile: File | null;
  cvFileName: string;
}
const EMPTY_FORM: AppForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  location: "",
  linkedin: "",
  portfolio: "",
  coverLetter: "",
  cvFile: null,
  cvFileName: "",
};
type Role = (typeof ROLES)[number];

// ─── Shared eyebrow — same as about/contact ───────────────────────────────────
function Eyebrow({ text, light = false }: { text: string; light?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <span
        style={{
          display: "inline-block",
          width: 24,
          height: 1,
          background: light ? "rgba(255,255,255,0.35)" : C.ruleLight,
        }}
      />
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.62rem",
          letterSpacing: "0.22em",
          textTransform: "uppercase" as const,
          color: light ? "rgba(255,255,255,0.45)" : C.sage,
          fontWeight: 500,
        }}
      >
        {text}
      </span>
    </div>
  );
}

// ─── Form field — same pattern as contact page ────────────────────────────────
function FormField({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.6rem",
          letterSpacing: "0.16em",
          textTransform: "uppercase" as const,
          color: error ? "#b05a45" : C.dim,
          fontWeight: 500,
        }}
      >
        {label}
        {required && <span style={{ color: C.sage, marginLeft: 3 }}>*</span>}
      </label>
      {children}
      {error && (
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.65rem",
            color: "#b05a45",
            letterSpacing: "0.03em",
          }}
        >
          {error}
        </span>
      )}
    </div>
  );
}

// ─── Application form ─────────────────────────────────────────────────────────
function ApplicationForm({
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

  const inputStyle = (field: string): React.CSSProperties => ({
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.84rem",
    color: C.charcoal,
    background: "#ffffff",
    border: `1px solid ${errors[field as keyof AppForm] ? "#b05a45" : focused === field ? C.sage : C.rule}`,
    borderRadius: 0,
    padding: "11px 14px",
    width: "100%",
    outline: "none",
    fontWeight: 300,
    transition: "border-color 0.2s",
    appearance: "none" as const,
  });

  function validate() {
    const e: Partial<Record<keyof AppForm, string>> = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim()) e.lastName = "Required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      e.email = "Valid email required";
    if (!form.coverLetter.trim()) e.coverLetter = "Required";
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
    await new Promise((r) => setTimeout(r, 1400));
    setSending(false);
    onSuccess();
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      onClick={(e) => e.stopPropagation()}
      style={{
        background: C.offWhite,
        borderTop: `1px solid ${C.rule}`,
        padding: "40px 0 48px 80px",
      }}
    >
      {/* Form heading */}
      <div style={{ marginBottom: 32 }}>
        <Eyebrow text="Application" />
        <h3
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.6rem",
            fontWeight: 400,
            color: C.charcoal,
            letterSpacing: "-0.015em",
            lineHeight: 1.2,
            marginTop: 12,
          }}
        >
          Apply for{" "}
          <em style={{ fontStyle: "italic", color: C.sageDark }}>
            {role.title}
          </em>
        </h3>
      </div>

      <div style={{ maxWidth: 680 }}>
        {/* Name */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
            marginBottom: 16,
          }}
        >
          <FormField label="First name" required error={errors.firstName}>
            <input
              style={inputStyle("firstName")}
              value={form.firstName}
              placeholder="Ada"
              onFocus={() => setFocused("firstName")}
              onBlur={() => setFocused(null)}
              onChange={(e) => set("firstName", e.target.value)}
            />
          </FormField>
          <FormField label="Last name" required error={errors.lastName}>
            <input
              style={inputStyle("lastName")}
              value={form.lastName}
              placeholder="Osei"
              onFocus={() => setFocused("lastName")}
              onBlur={() => setFocused(null)}
              onChange={(e) => set("lastName", e.target.value)}
            />
          </FormField>
        </div>

        {/* Email + phone */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
            marginBottom: 16,
          }}
        >
          <FormField label="Email address" required error={errors.email}>
            <input
              style={inputStyle("email")}
              type="email"
              value={form.email}
              placeholder="ada@example.com"
              onFocus={() => setFocused("email")}
              onBlur={() => setFocused(null)}
              onChange={(e) => set("email", e.target.value)}
            />
          </FormField>
          <FormField label="Phone number">
            <input
              style={inputStyle("phone")}
              type="tel"
              value={form.phone}
              placeholder="+254 7xx xxx xxx"
              onFocus={() => setFocused("phone")}
              onBlur={() => setFocused(null)}
              onChange={(e) => set("phone", e.target.value)}
            />
          </FormField>
        </div>

        {/* Location + LinkedIn */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
            marginBottom: 16,
          }}
        >
          <FormField label="Current location">
            <input
              style={inputStyle("location")}
              value={form.location}
              placeholder="Nairobi, Kenya"
              onFocus={() => setFocused("location")}
              onBlur={() => setFocused(null)}
              onChange={(e) => set("location", e.target.value)}
            />
          </FormField>
          <FormField label="LinkedIn profile">
            <input
              style={inputStyle("linkedin")}
              value={form.linkedin}
              placeholder="linkedin.com/in/yourname"
              onFocus={() => setFocused("linkedin")}
              onBlur={() => setFocused(null)}
              onChange={(e) => set("linkedin", e.target.value)}
            />
          </FormField>
        </div>

        {/* Portfolio */}
        <div style={{ marginBottom: 16 }}>
          <FormField label="Portfolio / Website">
            <input
              style={inputStyle("portfolio")}
              value={form.portfolio}
              placeholder="yoursite.com"
              onFocus={() => setFocused("portfolio")}
              onBlur={() => setFocused(null)}
              onChange={(e) => set("portfolio", e.target.value)}
            />
          </FormField>
        </div>

        {/* Cover letter */}
        <div style={{ marginBottom: 16 }}>
          <FormField label="Cover letter" required error={errors.coverLetter}>
            <textarea
              style={{
                ...inputStyle("coverLetter"),
                resize: "vertical",
                minHeight: 128,
                lineHeight: 1.8,
              }}
              value={form.coverLetter}
              placeholder="Tell us who you are, what draws you to this role, and what you'd bring to Élan…"
              onFocus={() => setFocused("coverLetter")}
              onBlur={() => setFocused(null)}
              onChange={(e) => set("coverLetter", e.target.value)}
            />
          </FormField>
        </div>

        {/* CV upload */}
        <div style={{ marginBottom: 36 }}>
          <FormField label="CV / Résumé" required error={errors.cvFileName}>
            <input
              ref={fileRef}
              type="file"
              accept=".pdf,.doc,.docx"
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
              role="button"
              tabIndex={0}
              onClick={() => fileRef.current?.click()}
              onKeyDown={(e) => e.key === "Enter" && fileRef.current?.click()}
              style={{
                border: `1px dashed ${errors.cvFileName ? "#b05a45" : focused === "cv" ? C.sage : C.ruleLight}`,
                padding: "18px 16px",
                cursor: "pointer",
                background: "#ffffff",
                display: "flex",
                alignItems: "center",
                gap: 14,
                transition: "border-color 0.2s",
                outline: "none",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLDivElement).style.borderColor = C.sage)
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLDivElement).style.borderColor =
                  errors.cvFileName ? "#b05a45" : C.ruleLight)
              }
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke={form.cvFileName ? C.sageDark : C.dim}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.82rem",
                    color: form.cvFileName ? C.charcoal : C.muted,
                    fontWeight: form.cvFileName ? 400 : 300,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {form.cvFileName || "Click to upload your CV"}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.64rem",
                    color: C.dim,
                    marginTop: 2,
                    letterSpacing: "0.04em",
                  }}
                >
                  PDF, DOC or DOCX — max 10 MB
                </div>
              </div>
              {form.cvFileName && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setForm((p) => ({ ...p, cvFile: null, cvFileName: "" }));
                    if (fileRef.current) fileRef.current.value = "";
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: C.dim,
                    fontSize: "1.1rem",
                    lineHeight: 1,
                    padding: "0 2px",
                    flexShrink: 0,
                  }}
                >
                  ×
                </button>
              )}
            </div>
          </FormField>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <button
            onClick={handleSubmit}
            disabled={sending}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: sending ? C.muted : C.charcoal,
              color: "#fff",
              border: "none",
              cursor: sending ? "not-allowed" : "pointer",
              padding: "12px 10px 12px 24px",
              borderRadius: 9999,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.74rem",
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase" as const,
              transition: "background 0.25s",
            }}
          >
            {sending ? "Submitting…" : "Submit Application"}
            <span
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.15)",
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
            style={{
              background: "none",
              border: "none",
              cursor: sending ? "not-allowed" : "pointer",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.68rem",
              color: C.muted,
              letterSpacing: "0.1em",
              textTransform: "uppercase" as const,
              borderBottom: `1px solid ${C.ruleLight}`,
              paddingBottom: 2,
              opacity: sending ? 0.5 : 1,
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Role row ─────────────────────────────────────────────────────────────────
function RoleRow({
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
              fontSize: "1.35rem",
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

        {/* Meta */}
        <div
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

        {/* Chevron — same pill style as about section tabs */}
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
              {/* Role detail — image + text two-column */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 380px",
                  gap: 48,
                  padding: "0 0 40px 80px",
                  alignItems: "start",
                }}
              >
                {/* Left: description + requirements + CTA */}
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 24 }}
                >
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
                      }}
                    >
                      {role.description}
                    </p>
                  </div>

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
                      What we're looking for
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

                  {/* Status-driven CTA */}
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
                      }}
                    >
                      <CheckCircle2
                        size={18}
                        strokeWidth={1.5}
                        style={{
                          color: C.sageDark,
                          marginTop: 1,
                          flexShrink: 0,
                        }}
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
                          We'll be in touch within one business day.
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
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

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function CareersPage() {
  const [openRole, setOpenRole] = useState<string | null>(null);
  const [appStatus, setAppStatus] = useState<Record<string, AppStatus>>({});

  function getStatus(id: string): AppStatus {
    return appStatus[id] ?? "idle";
  }
  function setStatus(id: string, s: AppStatus) {
    setAppStatus((p) => ({ ...p, [id]: s }));
  }

  function toggle(role: Role) {
    setOpenRole((prev) => (prev === role.id ? null : role.id));
  }

  return (
    <main style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        @keyframes careers-spin { to { transform: rotate(360deg); } }

        .careers-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 64px;
        }
        @media (max-width: 1024px) {
          .careers-inner { padding: 0 32px; }
          .careers-hero-grid { grid-template-columns: 1fr !important; }
          .careers-hero-right { display: none !important; }
          .careers-roles-detail { grid-template-columns: 1fr !important; }
          .careers-roles-img { display: none !important; }
          .role-row-meta { display: none !important; }
          .careers-cta-grid { grid-template-columns: 1fr !important; }
          .app-form-inner { padding-left: 0 !important; }
          .role-detail-left { padding-left: 0 !important; }
        }
        @media (max-width: 640px) {
          .careers-inner { padding: 0 24px; }
          .careers-stats { gap: 28px !important; }
        }
      `}</style>

      {/* ══════════════════════════════════════════════════════════════════════
          HERO — dark split matching contact/services hero language
      ══════════════════════════════════════════════════════════════════════ */}
      <div
        style={{ position: "relative", minHeight: "88vh", overflow: "hidden" }}
      >
        <Image
          src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1800&q=85"
          alt="Careers hero"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center 35%" }}
          quality={85}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(26,26,24,0.90) 0%, rgba(26,26,24,0.60) 55%, rgba(26,26,24,0.20) 100%)",
            zIndex: 1,
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            minHeight: "88vh",
            padding: "56px 0",
          }}
        >
          {/* Top: breadcrumb */}
          <div className="careers-inner">
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Link
                href="/"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.65rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.4)",
                  textDecoration: "none",
                }}
              >
                Home
              </Link>
              <span
                style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.6rem" }}
              >
                /
              </span>
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.65rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: C.sage,
                }}
              >
                Careers
              </span>
            </div>
          </div>

          {/* Bottom: hero copy + stats */}
          <div className="careers-inner">
            <div
              className="careers-hero-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 80,
                alignItems: "flex-end",
              }}
            >
              {/* Left */}
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: "flex", flexDirection: "column", gap: 20 }}
              >
                <Eyebrow text="Careers at Élan" light />

                <h1
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(3rem, 6vw, 5rem)",
                    fontWeight: 300,
                    lineHeight: 1.02,
                    letterSpacing: "-0.025em",
                    color: "#ffffff",
                    margin: 0,
                  }}
                >
                  Build what
                  <br />
                  <em style={{ fontStyle: "italic", color: C.accent }}>
                    matters.
                  </em>
                  <br />
                  Work with
                  <br />
                  <span style={{ fontWeight: 300 }}>care.</span>
                </h1>

                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.84rem",
                    color: "rgba(255,255,255,0.55)",
                    lineHeight: 1.85,
                    maxWidth: 360,
                    margin: 0,
                    fontWeight: 300,
                  }}
                >
                  We're building the infrastructure for a more sustainable East
                  Africa — one installation at a time. If precision, craft, and
                  clean energy matter to you, you might belong here.
                </p>

                {/* Stats */}
                <div
                  className="careers-stats"
                  style={{
                    display: "flex",
                    gap: 48,
                    paddingTop: 40,
                    marginTop: 20,
                    borderTop: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  {STATS.map((s) => (
                    <div key={s.label}>
                      <div
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: "2.2rem",
                          fontWeight: 300,
                          color: "#ffffff",
                          lineHeight: 1,
                          letterSpacing: "-0.03em",
                        }}
                      >
                        {s.num}
                      </div>
                      <div
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.58rem",
                          letterSpacing: "0.18em",
                          textTransform: "uppercase",
                          color: "rgba(255,255,255,0.28)",
                          marginTop: 6,
                        }}
                      >
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Right — values list (hidden on mobile) */}
              <motion.div
                className="careers-hero-right"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.15,
                }}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.58rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#ffffff",
                    marginBottom: 20,
                    display: "block",
                  }}
                >
                  What we stand for
                </span>

                {VALUES.map((v, i) => (
                  <div
                    key={v.label}
                    style={{
                      padding: "18px 0",
                      borderTop: "1px solid rgba(255,255,255,0.07)",
                      borderBottom:
                        i === VALUES.length - 1
                          ? "1px solid rgba(255,255,255,0.07)"
                          : "none",
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.55rem",
                        color: "rgba(255,255,255,0.2)",
                        letterSpacing: "0.08em",
                        minWidth: 18,
                      }}
                    >
                      {v.num}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "1.15rem",
                        fontWeight: 400,
                        color: "rgba(255,255,255,0.55)",
                        letterSpacing: "0.01em",
                      }}
                    >
                      {v.label}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          CULTURE STRIP — three images + text, warm white bg like about section
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: C.warmWhite, padding: "96px 0" }}>
        <div className="careers-inner">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 72,
              alignItems: "center",
            }}
          >
            {/* Left: image collage — same 3-image grid as about section */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gridTemplateRows: "60% 40%",
                gap: 10,
                height: 480,
              }}
            >
              <div
                style={{
                  gridColumn: "1 / -1",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&q=80"
                  alt="Team collaboration"
                  fill
                  sizes="(max-width:1024px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                  quality={80}
                />
              </div>
              <div style={{ position: "relative", overflow: "hidden" }}>
                <Image
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80"
                  alt="Team meeting"
                  fill
                  sizes="25vw"
                  style={{ objectFit: "cover" }}
                  quality={80}
                />
              </div>
              <div style={{ position: "relative", overflow: "hidden" }}>
                <Image
                  src="/images/contact.jpg"
                  alt="On-site work"
                  fill
                  sizes="25vw"
                  style={{ objectFit: "cover" }}
                  quality={80}
                />
              </div>
            </div>

            {/* Right: text */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <Eyebrow text="Life at Élan" />
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
                  fontWeight: 400,
                  color: C.charcoal,
                  lineHeight: 1.1,
                  letterSpacing: "-0.015em",
                  margin: 0,
                }}
              >
                Precision work,
                <br />
                <span style={{ fontWeight: 300 }}>meaningful impact</span>
              </h2>
              <div style={{ width: 32, height: 1, background: C.ruleLight }} />
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.86rem",
                  color: C.body,
                  lineHeight: 1.85,
                  margin: 0,
                  fontWeight: 300,
                }}
              >
                Every person at Élan works on systems that genuinely matter —
                cooling hospitals, powering schools with solar, keeping food
                supply chains running. We take our work seriously, invest in
                craft, and build careers alongside the infrastructure of a
                better East Africa.
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  marginTop: 4,
                }}
              >
                {[
                  "Competitive compensation and growth path",
                  "On-the-job training with certified engineers",
                  "Real projects, real responsibility from day one",
                  "A culture of care, precision, and honesty",
                ].map((item) => (
                  <div
                    key={item}
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <span
                      style={{
                        width: 4,
                        height: 4,
                        borderRadius: "50%",
                        background: C.sage,
                        flexShrink: 0,
                        display: "inline-block",
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.82rem",
                        color: C.body,
                        fontWeight: 300,
                      }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          ROLES — accordion list on off-white
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: C.offWhite, padding: "96px 0" }}>
        <div className="careers-inner">
          {/* Section header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 64,
              marginBottom: 64,
              paddingBottom: 48,
              borderBottom: `1px solid ${C.rule}`,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <Eyebrow text="Open Positions" />
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
                  fontWeight: 400,
                  color: C.charcoal,
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  margin: 0,
                }}
              >
                {`${ROLES.length} roles, one team;`}
                <br />
                <em style={{ fontStyle: "italic", color: C.sage }}>
                  genuinely open
                </em>
              </h2>
            </div>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.84rem",
                color: C.muted,
                lineHeight: 1.85,
                paddingTop: 8,
                fontWeight: 300,
              }}
            >
              Roles across technical, operations, sales, and creative — each one
              real. We're looking for people, not just CVs. Click any role to
              read more and apply directly below.
            </p>
          </div>

          {/* Role list */}
          <div>
            {ROLES.map((role) => {
              const isOpen = openRole === role.id;
              const status = getStatus(role.id);
              return (
                <RoleRow
                  key={role.id}
                  role={role}
                  isOpen={isOpen}
                  status={status}
                  onToggle={() => toggle(role)}
                  onOpenForm={() => setStatus(role.id, "form")}
                  onFormSuccess={() => setStatus(role.id, "success")}
                  onFormCancel={() => setStatus(role.id, "idle")}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          OPEN APPLICATION CTA — dark band matching contact/services CTA
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ background: C.charcoal, padding: "0" }}>
        <div
          className="careers-cta-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            minHeight: 280,
          }}
        >
          {/* Left */}
          <div
            style={{
              padding: "72px 64px",
              borderRight: "1px solid rgba(255,255,255,0.07)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <Eyebrow text="Don't see your role?" light />
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(1.8rem, 2.8vw, 2.6rem)",
                  fontWeight: 400,
                  color: "#ffffff",
                  lineHeight: 1.12,
                  letterSpacing: "-0.02em",
                  margin: 0,
                }}
              >
                Write to us.
                <br />
                <em
                  style={{
                    fontStyle: "italic",
                    color: C.accent,
                    fontWeight: 300,
                  }}
                >
                  We read everything.
                </em>
              </h2>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.8rem",
                  color: "rgba(255,255,255,0.38)",
                  lineHeight: 1.8,
                  maxWidth: 340,
                  fontWeight: 300,
                }}
              >
                We hire for character as much as credentials. Send us a short
                note about who you are and what you'd bring — no template
                needed.
              </p>
            </div>
            <a
              href="mailto:careers@elanclimat.co.ke"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.78rem",
                color: C.accent,
                letterSpacing: "0.06em",
                textDecoration: "none",
                borderBottom: "1px solid rgba(201,169,110,0.35)",
                paddingBottom: 2,
                display: "inline-block",
                alignSelf: "flex-start",
                marginTop: 32,
              }}
            >
              careers@elanclimat.co.ke
            </a>
          </div>

          {/* Right — company note */}
          <div
            style={{
              padding: "72px 64px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.58rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.2)",
                marginBottom: 12,
              }}
            >
              Élan Climat & Énergie
            </div>
            <div
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "0.92rem",
                color: "rgba(255,255,255,0.22)",
                lineHeight: 1.75,
                maxWidth: 260,
              }}
            >
              Nairobi, Kenya
              <br />
              HVAC · Solar · Battery Storage
              <br />
              Refrigeration · Elevators · Electrical
              <br />
              Est. 2012
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
