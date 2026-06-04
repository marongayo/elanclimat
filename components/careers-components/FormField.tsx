import { C } from "@/lib/constants";

export function FormField({
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
