// app/login/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Eye, EyeOff, ArrowLeft, ArrowUpRight, Loader2 } from "lucide-react";

// ─── Design tokens ────────────────────────────────────────────────────────────
const C = {
  charcoal: "#1a1a18",
  warmWhite: "#f9f7f4",
  offWhite: "#ede9e2",
  sage: "#8fa68e",
  accent: "#c9a96e",
  muted: "#888580",
  body: "#6b6b68",
  rule: "#e8e4dd",
  ruleLight: "#c8c8c4",
  dim: "#b0b0a8",
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function login() {
    setError("");
    setLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (res?.error) {
      setError("Invalid email or password.");
    } else {
      window.location.href = "/admin";
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        .login-input {
          width: 100%;
          padding: 13px 16px;
          border: 1px solid ${C.rule};
          background: #ffffff;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem;
          color: ${C.charcoal};
          outline: none;
          transition: border-color 0.2s;
          border-radius: 0;
          -webkit-appearance: none;
          font-weight: 300;
        }
        .login-input::placeholder { color: ${C.dim}; font-size: 0.84rem; }
        .login-input:focus { border-color: ${C.sage}; }

        .login-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 100vh;
        }

        @media (max-width: 860px) {
          .login-grid { grid-template-columns: 1fr; }
          .login-image-col { display: none; }
        }
      `}</style>

      <div className="login-grid">
        {/* ── Left: full-bleed image — same hero treatment as other pages ── */}
        <div
          className="login-image-col"
          style={{ position: "relative", overflow: "hidden" }}
        >
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=85"
            alt="Élan Admin"
            fill
            priority
            sizes="50vw"
            style={{ objectFit: "cover", objectPosition: "center 30%" }}
            quality={85}
          />
          {/* Same left-dark gradient as hero pages */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(26,26,24,0.35) 0%, rgba(26,26,24,0.65) 100%)",
            }}
          />

          {/* Brand mark overlay — bottom-left */}
          <div
            style={{
              position: "absolute",
              bottom: 48,
              left: 48,
              zIndex: 2,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {/* Eyebrow */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span
                style={{
                  display: "inline-block",
                  width: 24,
                  height: 1,
                  background: "rgba(255,255,255,0.35)",
                }}
              />
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.6rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.45)",
                }}
              >
                Secure Access
              </span>
            </div>

            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "2.2rem",
                fontWeight: 300,
                color: "#ffffff",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                margin: 0,
              }}
            >
              Élan Climat
              <br />
              <em style={{ fontStyle: "italic", color: C.accent }}>
                &amp; Énergie
              </em>
            </h2>

            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.76rem",
                color: "rgba(255,255,255,0.45)",
                lineHeight: 1.7,
                maxWidth: 280,
                margin: 0,
                fontWeight: 300,
              }}
            >
              Administration portal. Authorised personnel only.
            </p>

            {/* Back to website link */}
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.68rem",
                color: "rgba(255,255,255,0.4)",
                textDecoration: "none",
                letterSpacing: "0.04em",
                marginTop: 8,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  "rgba(255,255,255,0.75)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  "rgba(255,255,255,0.4)")
              }
            >
              <ArrowLeft size={11} strokeWidth={1.5} />
              Back to website
            </Link>
          </div>
        </div>

        {/* ── Right: form panel ── */}
        <div
          style={{
            backgroundColor: C.warmWhite,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "48px 40px",
            position: "relative",
          }}
        >
          {/* Mobile-only back link */}
          <Link
            href="/"
            style={{
              display: "none",
              position: "absolute",
              top: 28,
              left: 28,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.68rem",
              color: C.muted,
              textDecoration: "none",
              letterSpacing: "0.04em",
              alignItems: "center",
              gap: 6,
            }}
            className="login-mobile-back"
          >
            <ArrowLeft size={11} strokeWidth={1.5} />
            Back to website
          </Link>

          <div style={{ width: "100%", maxWidth: 360 }}>
            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              {/* Eyebrow — same as about/contact */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  marginBottom: 16,
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: 20,
                    height: 1,
                    background: C.sage,
                  }}
                />
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.58rem",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: C.sage,
                    fontWeight: 500,
                  }}
                >
                  Admin Portal
                </span>
                <span
                  style={{
                    display: "inline-block",
                    width: 20,
                    height: 1,
                    background: C.sage,
                  }}
                />
              </div>

              <h1
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "2rem",
                  fontWeight: 400,
                  color: C.charcoal,
                  letterSpacing: "-0.015em",
                  lineHeight: 1.1,
                  margin: 0,
                }}
              >
                Sign In
              </h1>

              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.78rem",
                  color: C.muted,
                  lineHeight: 1.6,
                  margin: "10px 0 0",
                  fontWeight: 300,
                }}
              >
                Enter your credentials to access the dashboard.
              </p>
            </div>

            {/* Divider — same 32px rule from about/contact */}
            <div
              style={{
                width: "100%",
                height: 1,
                background: C.rule,
                marginBottom: 36,
              }}
            />

            {/* Form */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {/* Email */}
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                <label
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.6rem",
                    fontWeight: 500,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: C.dim,
                  }}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && login()}
                  placeholder="admin@elanclimat.co.ke"
                  className="login-input"
                />
              </div>

              {/* Password */}
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                <label
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.6rem",
                    fontWeight: 500,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: C.dim,
                  }}
                >
                  Password
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && login()}
                    placeholder="••••••••"
                    className="login-input"
                    style={{ paddingRight: 44 }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    style={{
                      position: "absolute",
                      right: 13,
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      display: "flex",
                      alignItems: "center",
                      color: C.dim,
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLButtonElement).style.color =
                        C.charcoal)
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLButtonElement).style.color =
                        C.dim)
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={15} strokeWidth={1.5} />
                    ) : (
                      <Eye size={15} strokeWidth={1.5} />
                    )}
                  </button>
                </div>
              </div>

              {/* Error — same left-border style as terms preamble */}
              {error && (
                <div
                  style={{
                    borderLeft: "2px solid rgba(160,82,45,0.5)",
                    paddingLeft: 14,
                    padding: "10px 14px",
                    background: "rgba(160,82,45,0.05)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.75rem",
                      color: "#a0522d",
                      margin: 0,
                      fontWeight: 400,
                    }}
                  >
                    {error}
                  </p>
                </div>
              )}

              {/* Submit — same pill CTA as contact/services pages */}
              <button
                onClick={login}
                disabled={loading || !email || !password}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  width: "100%",
                  background:
                    loading || !email || !password ? C.muted : C.charcoal,
                  color: "#ffffff",
                  border: "none",
                  padding: "13px 10px 13px 24px",
                  borderRadius: 9999,
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  cursor:
                    loading || !email || !password ? "not-allowed" : "pointer",
                  transition: "background 0.25s",
                  marginTop: 4,
                }}
              >
                {loading ? "Signing in…" : "Sign In"}
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
                  {loading ? (
                    <Loader2
                      size={13}
                      strokeWidth={2}
                      style={{ animation: "login-spin 0.9s linear infinite" }}
                    />
                  ) : (
                    <ArrowUpRight size={13} strokeWidth={2} />
                  )}
                </span>
              </button>
            </div>

            {/* Footer — back link for desktop */}
            <div style={{ textAlign: "center", marginTop: 32 }}>
              <Link
                href="/"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 7,
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.68rem",
                  color: C.dim,
                  textDecoration: "none",
                  letterSpacing: "0.06em",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color =
                    C.charcoal)
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color = C.dim)
                }
              >
                <ArrowLeft size={11} strokeWidth={1.5} />
                Back to Website
              </Link>
            </div>

            {/* Fine print */}
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.62rem",
                color: C.ruleLight,
                textAlign: "center",
                margin: "24px 0 0",
                letterSpacing: "0.04em",
                lineHeight: 1.6,
              }}
            >
              Élan Climat &amp; Énergie · Nairobi, Kenya
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes login-spin { to { transform: rotate(360deg); } }
        @media (max-width: 860px) {
          .login-mobile-back { display: inline-flex !important; }
        }
      `}</style>
    </>
  );
}
