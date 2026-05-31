// login/page.tsx
"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";

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
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

        .login-input {
          width: 100%;
          padding: 11px 14px;
          border: 1px solid #e8e8e4;
          background: #fafaf8;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem;
          color: #1a1a18;
          outline: none;
          box-sizing: border-box;
          transition: border-color 0.2s ease, background 0.2s ease;
          border-radius: 0;
          -webkit-appearance: none;
        }
        .login-input::placeholder {
          color: #c0c0bb;
          font-size: 0.82rem;
        }
        .login-input:focus {
          border-color: #8fa68e;
          background: #ffffff;
        }

        .login-submit {
          width: 100%;
          padding: 13px;
          background: #1a1a18;
          color: #f9f7f4;
          border: none;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background 0.2s ease;
        }
        .login-submit:hover:not(:disabled) { background: #2e2e2c; }
        .login-submit:disabled { opacity: 0.5; cursor: not-allowed; }

        .login-back {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.72rem;
          color: #888580;
          text-decoration: none;
          letter-spacing: 0.04em;
          transition: color 0.2s ease;
        }
        .login-back:hover { color: #1a1a18; }

        .eye-btn {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          display: flex;
          align-items: center;
          color: #b0b0a8;
          transition: color 0.2s ease;
        }
        .eye-btn:hover { color: #1a1a18; }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f9f7f4",
          padding: 20,
        }}
      >
        <div
          style={{
            background: "white",
            width: "100%",
            maxWidth: 360,
            border: "1px solid #ede9e2",
            padding: "44px 36px 36px",
          }}
        >
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            {/* Eyebrow */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                marginBottom: 16,
              }}
            >
              <div style={{ width: 20, height: 1, background: "#8fa68e" }} />
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.58rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#8fa68e",
                }}
              >
                Secure Access
              </span>
              <div style={{ width: 20, height: 1, background: "#8fa68e" }} />
            </div>

            <div
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.7rem",
                fontWeight: 400,
                color: "#1a1a18",
                letterSpacing: "-0.01em",
                lineHeight: 1.1,
              }}
            >
              Élan Admin
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: "#ede9e2", marginBottom: 32 }} />

          {/* Fields */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
              marginBottom: 24,
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.6rem",
                  fontWeight: 500,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "#b0b0a8",
                  marginBottom: 8,
                }}
              >
                Email
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

            <div>
              <label
                style={{
                  display: "block",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.6rem",
                  fontWeight: 500,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "#b0b0a8",
                  marginBottom: 8,
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
                  style={{ paddingRight: 40 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="eye-btn"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff size={15} strokeWidth={1.5} />
                  ) : (
                    <Eye size={15} strokeWidth={1.5} />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Error */}
          {error && (
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.75rem",
                color: "#a0522d",
                marginBottom: 16,
                padding: "10px 12px",
                background: "rgba(160,82,45,0.06)",
                borderLeft: "2px solid rgba(160,82,45,0.4)",
              }}
            >
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            onClick={login}
            disabled={loading || !email || !password}
            className="login-submit"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>

          {/* Back link */}
          <div style={{ textAlign: "center", marginTop: 24 }}>
            <Link href="/" className="login-back">
              <ArrowLeft size={12} strokeWidth={1.5} />
              Back to Website
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
