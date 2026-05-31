// app/contact/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/Footer";
import {
  ArrowUpRight,
  CheckCircle2,
  Loader2,
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";

// ─── Shared design tokens ─────────────────────────────────────────────────────
const C = {
  charcoal: "#1a1a18",
  warmWhite: "#f9f7f4",
  offWhite: "#ede9e2",
  sage: "#8fa68e",
  sageDark: "#5a7a59",
  accent: "#c9a96e",
  muted: "#888580",
  body: "#6b6b68",
  rule: "#e8e8e4",
  ruleLight: "#c8c8c4",
  dim: "#b0b0a8",
};

const SERVICES = [
  "HVAC Services",
  "Plumbing Services",
  "Solar Installation",
  "Cold Room Installation",
  "Elevator Installation",
  "Electrical",
  "General Enquiry",
];

const CONTACT_DETAILS = [
  {
    icon: MapPin,
    label: "Visit Us",
    lines: ["Westlands Business Park, Suite 4A", "Nairobi, Kenya"],
  },
  {
    icon: Phone,
    label: "Call Us",
    lines: ["+254 796 952 717", "+254 782 726 118"],
  },
  {
    icon: Mail,
    label: "Email Us",
    lines: ["hello@elanclimat.co.ke", "service@elanclimat.co.ke"],
  },
  {
    icon: Clock,
    label: "Working Hours",
    lines: ["Mon – Fri: 8:00 AM – 6:00 PM", "Sat: 9:00 AM – 1:00 PM"],
  },
];

// ─── Eyebrow ──────────────────────────────────────────────────────────────────
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

// ─── Form field wrapper ───────────────────────────────────────────────────────
function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
      <label
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.68rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase" as const,
          color: C.muted,
          fontWeight: 500,
        }}
      >
        {label}
        {required && <span style={{ color: C.sage, marginLeft: 3 }}>*</span>}
      </label>
      {children}
    </div>
  );
}

// ─── Input styles (shared) ────────────────────────────────────────────────────
const inputBase: React.CSSProperties = {
  fontFamily: "'DM Sans', sans-serif",
  fontSize: "0.88rem",
  color: C.charcoal,
  background: "#ffffff",
  border: `1px solid ${C.rule}`,
  borderRadius: 0,
  padding: "13px 16px",
  width: "100%",
  outline: "none",
  fontWeight: 300,
  transition: "border-color 0.2s",
  appearance: "none" as const,
};

// ─── Contact form ─────────────────────────────────────────────────────────────
function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [focused, setFocused] = useState<string | null>(null);
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [error, setError] = useState("");

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const borderFor = (field: string) => (focused === field ? C.sage : C.rule);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      setError("Please fill in your name and email.");
      return;
    }
    setError("");
    setStatus("sending");

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          date: new Date().toISOString(),
          read: false,
          archived: false,
        }),
      });

      if (!res.ok) throw new Error("Server error");
      setStatus("success");
      setForm({ name: "", email: "", phone: "", service: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 20,
          padding: "64px 32px",
          background: "#ffffff",
          border: `1px solid ${C.rule}`,
        }}
      >
        <CheckCircle2 size={40} strokeWidth={1.4} style={{ color: C.sage }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <h3
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.8rem",
              fontWeight: 400,
              color: C.charcoal,
              margin: 0,
              letterSpacing: "-0.015em",
            }}
          >
            Message Received
          </h3>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.84rem",
              color: C.body,
              lineHeight: 1.75,
              margin: 0,
              fontWeight: 300,
              maxWidth: 340,
            }}
          >
            Thank you for reaching out. One of our engineers will be in touch
            within one business day.
          </p>
        </div>
        <button
          onClick={() => setStatus("idle")}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.68rem",
            fontWeight: 500,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: C.muted,
            background: "none",
            border: "none",
            cursor: "pointer",
            borderBottom: `1px solid ${C.ruleLight}`,
            paddingBottom: 2,
          }}
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {/* Name + Email row */}
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
        >
          <Field label="Full Name" required>
            <input
              type="text"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              onFocus={() => setFocused("name")}
              onBlur={() => setFocused(null)}
              placeholder="Jane Mwangi"
              style={{ ...inputBase, borderColor: borderFor("name") }}
            />
          </Field>
          <Field label="Email Address" required>
            <input
              type="email"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              onFocus={() => setFocused("email")}
              onBlur={() => setFocused(null)}
              placeholder="jane@company.co.ke"
              style={{ ...inputBase, borderColor: borderFor("email") }}
            />
          </Field>
        </div>

        {/* Phone + Service row */}
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
        >
          <Field label="Phone Number">
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
              onFocus={() => setFocused("phone")}
              onBlur={() => setFocused(null)}
              placeholder="+254 700 000 000"
              style={{ ...inputBase, borderColor: borderFor("phone") }}
            />
          </Field>
          <Field label="Service of Interest">
            <div style={{ position: "relative" }}>
              <select
                value={form.service}
                onChange={(e) => set("service", e.target.value)}
                onFocus={() => setFocused("service")}
                onBlur={() => setFocused(null)}
                style={{
                  ...inputBase,
                  borderColor: borderFor("service"),
                  paddingRight: 36,
                  cursor: "pointer",
                  color: form.service ? C.charcoal : C.dim,
                }}
              >
                <option value="" disabled>
                  Select a service…
                </option>
                {SERVICES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              {/* Custom chevron */}
              <svg
                style={{
                  position: "absolute",
                  right: 14,
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                }}
                width="12"
                height="7"
                viewBox="0 0 12 7"
                fill="none"
              >
                <path
                  d="M1 1L6 6L11 1"
                  stroke={C.dim}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </Field>
        </div>

        {/* Message */}
        <Field label="Your Message">
          <textarea
            value={form.message}
            onChange={(e) => set("message", e.target.value)}
            onFocus={() => setFocused("message")}
            onBlur={() => setFocused(null)}
            placeholder="Describe your project or enquiry…"
            rows={5}
            style={{
              ...inputBase,
              resize: "vertical",
              minHeight: 120,
              borderColor: borderFor("message"),
            }}
          />
        </Field>

        {/* Error */}
        <AnimatePresence>
          {(error || status === "error") && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.78rem",
                color: "#c0392b",
                margin: 0,
                fontWeight: 400,
              }}
            >
              {error || "Something went wrong. Please try again."}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Submit */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
            marginTop: 4,
          }}
        >
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.72rem",
              color: C.dim,
              margin: 0,
              fontWeight: 300,
            }}
          >
            Fields marked <span style={{ color: C.sage }}>*</span> are required.
          </p>

          <button
            type="submit"
            disabled={status === "sending"}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: status === "sending" ? C.muted : C.charcoal,
              color: "#ffffff",
              border: "none",
              padding: "12px 10px 12px 24px",
              borderRadius: 9999,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.75rem",
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              cursor: status === "sending" ? "not-allowed" : "pointer",
              transition: "background 0.25s",
            }}
          >
            {status === "sending" ? "Sending…" : "Send Message"}
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
              {status === "sending" ? (
                <Loader2
                  size={13}
                  strokeWidth={2}
                  style={{ animation: "spin 1s linear infinite" }}
                />
              ) : (
                <ArrowUpRight size={13} strokeWidth={2} />
              )}
            </span>
          </button>
        </div>
      </div>
    </form>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ContactPage() {
  return (
    <main style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

        * { box-sizing: border-box; }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .contact-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 64px;
        }
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 520px;
          gap: 80px;
          align-items: start;
        }
        .contact-details-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
        }
        @media (max-width: 1100px) {
          .contact-inner { padding: 0 32px; }
          .contact-grid { grid-template-columns: 1fr; gap: 48px; }
          .contact-sidebar { display: none; }
        }
        @media (max-width: 640px) {
          .contact-inner { padding: 0 24px; }
          .contact-details-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* ── Hero ── */}
      <div
        style={{
          position: "relative",
          height: "52vh",
          minHeight: 400,
          overflow: "hidden",
        }}
      >
        <Image
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1800&q=85"
          alt="Contact hero"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center 30%" }}
          quality={85}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(26,26,24,0.82) 0%, rgba(26,26,24,0.48) 55%, rgba(26,26,24,0.15) 100%)",
            zIndex: 1,
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            height: "100%",
            paddingBottom: 56,
          }}
        >
          <div className="contact-inner">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: "flex", flexDirection: "column", gap: 16 }}
            >
              {/* Breadcrumb */}
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
                  style={{
                    color: "rgba(255,255,255,0.25)",
                    fontSize: "0.6rem",
                  }}
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
                  Contact
                </span>
              </div>

              <Eyebrow text="Get in Touch" light />

              <h1
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
                  fontWeight: 500,
                  color: "#ffffff",
                  lineHeight: 1.08,
                  letterSpacing: "-0.015em",
                  margin: 0,
                  maxWidth: 540,
                }}
              >
                Start the Conversation,
                <br />
                <span style={{ fontWeight: 300 }}>We'll Handle the Rest</span>
              </h1>

              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.84rem",
                  color: "rgba(255,255,255,0.6)",
                  lineHeight: 1.8,
                  maxWidth: 400,
                  margin: 0,
                  fontWeight: 300,
                }}
              >
                No calls, no emails to compose. Fill in the form and our team
                will respond within one business day.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Contact details strip ── */}
      <section style={{ backgroundColor: C.charcoal, padding: "0" }}>
        <div className="contact-inner">
          <div className="contact-details-grid">
            {CONTACT_DETAILS.map((detail, i) => {
              const Icon = detail.icon;
              return (
                <div
                  key={detail.label}
                  style={{
                    padding: "32px 28px",
                    borderRight:
                      i % 2 === 0 ? "1px solid rgba(255,255,255,0.07)" : "none",
                    borderBottom:
                      i < 2 ? "1px solid rgba(255,255,255,0.07)" : "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                  }}
                >
                  <Icon size={16} strokeWidth={1.5} style={{ color: C.sage }} />
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.6rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.3)",
                        fontWeight: 500,
                      }}
                    >
                      {detail.label}
                    </span>
                    {detail.lines.map((line) => (
                      <span
                        key={line}
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.82rem",
                          color: "rgba(255,255,255,0.7)",
                          fontWeight: 300,
                          lineHeight: 1.6,
                        }}
                      >
                        {line}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Main form + sidebar ── */}
      <section style={{ backgroundColor: C.warmWhite, padding: "96px 0" }}>
        <div className="contact-inner">
          <div className="contact-grid">
            {/* LEFT: form */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: "flex", flexDirection: "column", gap: 36 }}
            >
              {/* Form header */}
              <div
                style={{ display: "flex", flexDirection: "column", gap: 14 }}
              >
                <Eyebrow text="Send a Message" />
                <h2
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                    fontWeight: 400,
                    color: C.charcoal,
                    lineHeight: 1.12,
                    letterSpacing: "-0.015em",
                    margin: 0,
                  }}
                >
                  Tell Us About Your Project
                </h2>
                <div
                  style={{ width: 32, height: 1, background: C.ruleLight }}
                />
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.84rem",
                    color: C.body,
                    lineHeight: 1.8,
                    margin: 0,
                    fontWeight: 300,
                    maxWidth: 440,
                  }}
                >
                  Whether it's a new installation, a maintenance contract, or an
                  urgent repair — describe your needs below and we'll connect
                  you with the right specialist.
                </p>
              </div>

              {/* The form itself */}
              <div
                style={{
                  background: "#ffffff",
                  border: `1px solid ${C.rule}`,
                  padding: "40px 36px",
                }}
              >
                <ContactForm />
              </div>
            </motion.div>

            {/* RIGHT: sidebar */}
            <motion.aside
              className="contact-sidebar"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.15,
              }}
              style={{ display: "flex", flexDirection: "column", gap: 20 }}
            >
              {/* Map placeholder */}
              <div
                style={{
                  position: "relative",
                  aspectRatio: "4/3",
                  overflow: "hidden",
                  background: C.offWhite,
                }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=900&q=80"
                  alt="Our location"
                  fill
                  sizes="520px"
                  style={{ objectFit: "cover" }}
                  quality={80}
                />
                {/* Overlay badge */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 16,
                    left: 16,
                    background: "rgba(26,26,24,0.80)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    padding: "10px 16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.58rem",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: C.sage,
                      fontWeight: 500,
                    }}
                  >
                    Headquarters
                  </span>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.78rem",
                      color: "rgba(255,255,255,0.8)",
                      fontWeight: 300,
                    }}
                  >
                    Westlands, Nairobi
                  </span>
                </div>
              </div>

              {/* Why contact us */}
              <div
                style={{
                  background: C.charcoal,
                  padding: "36px 32px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 24,
                }}
              >
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 10 }}
                >
                  <Eyebrow text="Why Us" light />
                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1.5rem",
                      fontWeight: 400,
                      color: "#ffffff",
                      margin: 0,
                      letterSpacing: "-0.01em",
                      lineHeight: 1.2,
                    }}
                  >
                    Expert Response,
                    <br />
                    <span style={{ fontWeight: 300 }}>Every Time</span>
                  </h3>
                </div>

                <div
                  style={{ display: "flex", flexDirection: "column", gap: 16 }}
                >
                  {[
                    "Response within one business day",
                    "No-obligation site assessments",
                    "Certified engineers on every project",
                    "Transparent pricing & detailed proposals",
                    "Serving all counties across Kenya",
                  ].map((item) => (
                    <div
                      key={item}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 10,
                      }}
                    >
                      <span
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: "50%",
                          background: C.sage,
                          flexShrink: 0,
                          marginTop: 6,
                          display: "inline-block",
                        }}
                      />
                      <span
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.80rem",
                          color: "rgba(255,255,255,0.55)",
                          lineHeight: 1.6,
                          fontWeight: 300,
                        }}
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Quick service links */}
                <div
                  style={{
                    borderTop: "1px solid rgba(255,255,255,0.08)",
                    paddingTop: 20,
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.58rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.25)",
                      fontWeight: 500,
                    }}
                  >
                    Our Services
                  </span>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 6,
                      marginTop: 4,
                    }}
                  >
                    {[
                      "HVAC",
                      "Solar",
                      "Plumbing",
                      "Cold Room",
                      "Elevators",
                      "Electrical",
                    ].map((s) => (
                      <Link
                        key={s}
                        href={`/services#${s.toLowerCase().replace(" ", "-")}`}
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.62rem",
                          color: "rgba(255,255,255,0.45)",
                          textDecoration: "none",
                          border: "1px solid rgba(255,255,255,0.12)",
                          padding: "4px 10px",
                          borderRadius: 9999,
                          transition: "color 0.2s, border-color 0.2s",
                          letterSpacing: "0.04em",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLAnchorElement).style.color =
                            "rgba(255,255,255,0.8)";
                          (
                            e.currentTarget as HTMLAnchorElement
                          ).style.borderColor = "rgba(255,255,255,0.3)";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLAnchorElement).style.color =
                            "rgba(255,255,255,0.45)";
                          (
                            e.currentTarget as HTMLAnchorElement
                          ).style.borderColor = "rgba(255,255,255,0.12)";
                        }}
                      >
                        {s}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
