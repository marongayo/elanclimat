"use client";
import { Send } from "lucide-react";
import { useState } from "react";

const FORM_PLACEHOLDERS = [
  {
    name: "name",
    label: "Full Name",
    type: "text",
    placeholder: "Joan Dupont",
    required: true,
  },
  {
    name: "email",
    label: "Email Address",
    type: "email",
    placeholder: "joan.dupont@example.you",
    required: true,
  },
  {
    name: "phone",
    label: "Phone (optional)",
    type: "tel",
    placeholder: "+254 796 952 717",
    required: false,
  },
];

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("Send us a message.");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target as HTMLFormElement;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to send message");

      setSubmitted(true);
      setMsg("Message sent!");
      form.reset();
    } catch {
      setMsg("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "11px 14px",
    background: "#f7f8f7",
    border: "1px solid rgba(40,45,42,0.14)",
    color: "#0a0a0a",
    fontFamily: "DM Sans",
    fontSize: "0.88rem",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: "DM Sans",
    fontSize: "0.72rem",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "var(--sage)",
    marginBottom: 8,
  };

  return (
    <div
      id="contact-form"
      style={{
        background: "#f9faf9",
        padding: "48px 40px",
        border: "1px solid rgba(143,175,159,0.2)",
      }}
    >
      <h3
        style={{
          fontFamily: "Cormorant Garamond, serif",
          fontSize: "1.6rem",
          color: "#0a0a0a",
          marginBottom: 28,
        }}
      >
        {msg}
      </h3>

      {submitted ? (
        <div
          style={{
            padding: "40px 32px",
            background: "rgba(143,175,159,0.1)",
            borderRadius: 8,
            textAlign: "center",
            border: "1px solid rgba(143,175,159,0.25)",
          }}
        >
          <p
            style={{
              fontFamily: "DM Sans",
              fontSize: "1.1rem",
              color: "#333",
              lineHeight: 1.7,
            }}
          >
            Thank you for reaching out to us. We have received your message. One
            of our client relations executives will get back to you within 12
            working hours.
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: 18 }}
        >
          {FORM_PLACEHOLDERS.map((field) => (
            <div key={field.name}>
              <label style={labelStyle}>{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                required={field.required}
                style={inputStyle}
                onFocus={(e) =>
                  (e.currentTarget.style.borderColor = "var(--sage)")
                }
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(40,45,42,0.14)")
                }
              />
            </div>
          ))}

          <div>
            <label style={labelStyle}>Service Needed</label>
            <select
              name="service"
              style={{
                ...inputStyle,
                background: "#f7f8f7",
                cursor: "pointer",
              }}
              onFocus={(e) =>
                (e.currentTarget.style.borderColor = "var(--sage)")
              }
              onBlur={(e) =>
                (e.currentTarget.style.borderColor = "rgba(40,45,42,0.14)")
              }
            >
              <option value="">Select a service</option>
              <option>HVAC Installation</option>
              <option>HVAC Maintenance</option>
              <option>Solar Installation</option>
              <option>Battery Storage</option>
              <option>Energy Audit</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Message</label>
            <textarea
              name="message"
              rows={4}
              placeholder="Tell us about your project or question..."
              style={{ ...inputStyle, resize: "vertical" }}
              onFocus={(e) =>
                (e.currentTarget.style.borderColor = "var(--sage)")
              }
              onBlur={(e) =>
                (e.currentTarget.style.borderColor = "rgba(40,45,42,0.14)")
              }
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              background: "var(--charcoal)",
              color: "white",
              fontFamily: "DM Sans",
              fontSize: "0.88rem",
              fontWeight: 600,
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              letterSpacing: "0.04em",
              opacity: loading ? 0.7 : 1,
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => {
              if (!loading) e.currentTarget.style.background = "var(--sage)";
            }}
            onMouseLeave={(e) => {
              if (!loading)
                e.currentTarget.style.background = "var(--charcoal)";
            }}
          >
            {loading ? (
              "Sending..."
            ) : (
              <>
                Send Message <Send size={16} />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
