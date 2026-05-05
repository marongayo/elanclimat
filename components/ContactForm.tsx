"use client";
import { useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [msg, setMsg] = useState("Send us a message.");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setMsg("Message sent!");;

    (e.target as HTMLFormElement).reset();
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
    <>
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
                fontSize: "1.25rem",
                color: "rgba(255,255,255,0.75)",
              }}
            >
              Thank you for reaching out to us. We have received your message.
              One of our client relations executives will get back to you within
              12 working hours.
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
              style={{
                width: "100%",
                padding: "14px",
                background: "var(--sage)",
                color: "var(--charcoal)",
                fontFamily: "DM Sans",
                fontSize: "0.88rem",
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
                letterSpacing: "0.04em",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "var(--sage-light)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "var(--sage)")
              }
            >
              Send Message →
            </button>
          </form>
        )}
      </div>
    </>
  );
}
