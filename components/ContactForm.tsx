"use client";
import { Send } from "lucide-react";
import { useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("Send us a message.");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target as HTMLFormElement;
    const data = Object.fromEntries(new FormData(form).entries());

    await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    setSubmitted(true);
    setMsg("Message sent!");
    setLoading(false);
    form.reset();
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "11px 14px",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    color: "white",
    fontFamily: "DM Sans",
    fontSize: "0.88rem",
    outline: "none",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: "DM Sans",
    fontSize: "0.72rem",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "var(--sage-light)",
    marginBottom: 8,
  };

  return (
    <div
      id="contact-form"
      style={{
        background: "rgba(255,255,255,0.04)",
        padding: "48px 40px",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <h3
        style={{
          fontFamily: "Cormorant Garamond, serif",
          fontSize: "1.6rem",
          color: "white",
          marginBottom: 28,
        }}
      >
        {msg}
      </h3>

      {submitted ? (
        <div
          style={{
            padding: "40px 32px",
            background: "rgba(255,255,255,0.08)",
            borderRadius: 8,
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "DM Sans",
              fontSize: "1.1rem",
              color: "rgba(255,255,255,0.75)",
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
          {[
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
          ].map((field) => (
            <div key={field.name}>
              <label style={labelStyle}>{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                required={field.required}
                style={inputStyle}
              />
            </div>
          ))}
          <div>
            <label style={labelStyle}>Service Needed</label>
            <select
              name="service"
              style={{ ...inputStyle, background: "rgba(30,35,32,0.95)" }}
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
              background: "var(--sage)",
              color: "var(--charcoal)",
              fontFamily: "DM Sans",
              fontSize: "0.88rem",
              fontWeight: 600,
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              letterSpacing: "0.04em",
              opacity: loading ? 0.7 : 1,
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "var(--sage-light)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "var(--sage)")
            }
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
