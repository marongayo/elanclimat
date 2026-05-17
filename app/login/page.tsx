// login/page.tsx
"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { LogIn, Eye, EyeOff } from "lucide-react";

const LABEL_STYLE: React.CSSProperties = {
  display: "block",
  fontFamily: "DM Sans",
  fontSize: "0.78rem",
  color: "var(--text-muted)",
  marginBottom: 6,
  letterSpacing: "0.05em",
  textTransform: "uppercase",
};

const INPUT_STYLE: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  border: "1px solid #e0e0e0",
  fontFamily: "DM Sans",
  fontSize: "0.9rem",
  marginBottom: 16,
  outline: "none",
  boxSizing: "border-box",
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function login() {
    setError("");
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (res?.error) {
      setError("Invalid email or password.");
    } else {
      window.location.href = "/admin";
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--warm-white)",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px 28px",
          width: "100%",
          maxWidth: 380,
          boxShadow: "0 4px 40px rgba(0,0,0,0.08)",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "1.5rem",
              fontWeight: 600,
              color: "var(--charcoal)",
            }}
          >
            Élan Admin
          </div>
          <div
            style={{
              fontFamily: "DM Sans",
              fontSize: "0.72rem",
              color: "var(--text-muted)",
              marginTop: 4,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Secure Access
          </div>
        </div>

        {/* Fields */}
        <div style={{ marginBottom: 16 }}>
          <label style={LABEL_STYLE}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && login()}
            placeholder="Enter admin email"
            style={INPUT_STYLE}
          />

          <label style={LABEL_STYLE}>Password</label>
          <div style={{ position: "relative", marginBottom: 16 }}>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && login()}
              placeholder="Enter admin password"
              style={{ ...INPUT_STYLE, marginBottom: 0, paddingRight: 40 }}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              style={{
                position: "absolute",
                right: 10,
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                display: "flex",
                alignItems: "center",
                color: "var(--text-muted)",
              }}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <p
            style={{
              fontFamily: "DM Sans",
              fontSize: "0.8rem",
              color: "#c0392b",
              marginBottom: 12,
            }}
          >
            {error}
          </p>
        )}

        {/* Submit */}
        <button
          onClick={login}
          style={{
            width: "100%",
            padding: "12px",
            background: "var(--charcoal)",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontFamily: "DM Sans",
            fontSize: "0.88rem",
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <LogIn size={16} /> Sign In
        </button>

        {/* Back link */}
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <Link
            href="/"
            style={{
              fontFamily: "DM Sans",
              fontSize: "0.78rem",
              color: "var(--text-muted)",
              textDecoration: "none",
            }}
          >
            ← Back to Website
          </Link>
        </div>
      </div>
    </div>
  );
}
