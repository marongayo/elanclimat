// app/careers/withdraw/page.tsx
import Link from "next/link";
import { C } from "@/lib/constants";

export default function WithdrawPage({
  searchParams,
}: {
  searchParams: { success?: string };
}) {
  const success = searchParams.success === "true";
  const failed = searchParams.success === "false";

  return (
    <main
      style={{
        minHeight: "100vh",
        background: C.offWhite,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'DM Sans', sans-serif",
        padding: "40px 20px",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
      `}</style>

      <div
        style={{
          maxWidth: 520,
          width: "100%",
          background: C.warmWhite,
          border: `1px solid ${C.rule}`,
          borderTop: `3px solid ${success ? C.sage : failed ? "#b05a45" : C.accent}`,
        }}
      >
        {/* Logo strip */}
        <div
          style={{
            padding: "28px 48px",
            borderBottom: `1px solid ${C.rule}`,
            background: "#ffffff",
          }}
        >
          <img
            src="/logo.jpg"
            alt="Élan Climat & Énergie"
            style={{ height: 36, width: "auto", display: "block" }}
          />
        </div>

        {/* Content */}
        <div style={{ padding: "48px 48px 40px" }}>
          {/* Eyebrow */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 20,
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 24,
                height: 1,
                background: C.ruleLight,
              }}
            />
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.62rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase" as const,
                color: success ? C.sage : "#b05a45",
                fontWeight: 500,
              }}
            >
              {success ? "Application Withdrawn" : "Invalid Link"}
            </span>
          </div>

          {/* Heading */}
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "2rem",
              fontWeight: 400,
              color: C.charcoal,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              margin: "0 0 20px",
            }}
          >
            {success ? (
              <>
                Your application
                <br />
                <em style={{ fontStyle: "italic", fontWeight: 300 }}>
                  has been withdrawn.
                </em>
              </>
            ) : (
              <>
                This link
                <br />
                <em style={{ fontStyle: "italic", fontWeight: 300 }}>
                  is invalid or expired.
                </em>
              </>
            )}
          </h1>

          <div
            style={{
              width: 32,
              height: 1,
              background: C.ruleLight,
              marginBottom: 20,
            }}
          />

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.86rem",
              color: C.body,
              lineHeight: 1.85,
              fontWeight: 300,
              margin: "0 0 36px",
            }}
          >
            {success
              ? "We have removed your application and CV from our records. We are sorry to see you go and wish you all the best. You are always welcome to apply again in the future."
              : "This withdrawal link is invalid or has expired. If you still wish to withdraw your application, please contact us directly at careers@elanclimat.co.ke and we will take care of it."}
          </p>

          <Link
            href="/careers"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.72rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase" as const,
              color: C.charcoal,
              textDecoration: "none",
              borderBottom: `1px solid ${C.rule}`,
              paddingBottom: 2,
            }}
          >
            ← Back to Careers
          </Link>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "16px 48px",
            borderTop: `1px solid ${C.rule}`,
          }}
        >
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.62rem",
              color: C.dim,
              letterSpacing: "0.06em",
              margin: 0,
            }}
          >
            Élan Climat &amp; Énergie &nbsp;·&nbsp; Nairobi, Kenya
          </p>
        </div>
      </div>
    </main>
  );
}
