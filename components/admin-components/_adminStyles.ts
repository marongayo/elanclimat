// components/admin-components/_adminStyles.ts

export const INPUT_STYLE: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  border: "1px solid #e8e4dd",
  fontFamily: "'DM Sans', sans-serif",
  fontSize: "0.85rem",
  color: "#1a1a18",
  outline: "none",
  background: "#fdfcfa",
  boxSizing: "border-box",
  borderRadius: 0,
  transition: "border-color 0.2s",
};

export const INPUT_ERROR_STYLE: React.CSSProperties = {
  ...INPUT_STYLE,
  border: "1px solid #c0392b",
  background: "#fff9f9",
};

export const LABEL_STYLE: React.CSSProperties = {
  display: "block",
  fontFamily: "'DM Sans', sans-serif",
  fontSize: "0.62rem",
  fontWeight: 600,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "#8a8680",
  marginBottom: 7,
};

export const ERROR_TEXT: React.CSSProperties = {
  fontFamily: "'DM Sans', sans-serif",
  fontSize: "0.72rem",
  color: "#c0392b",
  marginTop: 5,
  display: "block",
};

export const SECTION_HEADING: React.CSSProperties = {
  fontFamily: "'Cormorant Garamond', serif",
  fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
  fontWeight: 400,
  color: "#1a1a18",
  letterSpacing: "-0.015em",
  lineHeight: 1.1,
  margin: 0,
};

export const EYEBROW: React.CSSProperties = {
  fontFamily: "'DM Sans', sans-serif",
  fontSize: "0.62rem",
  fontWeight: 600,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "#8fa68e",
};

export const BTN_PRIMARY: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  padding: "10px 22px",
  background: "#1a1a18",
  color: "#ffffff",
  border: "none",
  cursor: "pointer",
  fontFamily: "'DM Sans', sans-serif",
  fontSize: "0.75rem",
  fontWeight: 500,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  transition: "background 0.2s",
};

export const BTN_GHOST: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  padding: "10px 20px",
  background: "none",
  color: "#8a8680",
  border: "1px solid #e8e4dd",
  cursor: "pointer",
  fontFamily: "'DM Sans', sans-serif",
  fontSize: "0.75rem",
  fontWeight: 500,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  transition: "border-color 0.2s, color 0.2s",
};

export const BTN_DANGER: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  padding: "7px 12px",
  background: "#fef2f2",
  color: "#c0392b",
  border: "none",
  cursor: "pointer",
  fontFamily: "'DM Sans', sans-serif",
  fontSize: "0.75rem",
};

export const RULE_LIGHT = "1px solid #ede9e2";
export const RULE = "1px solid #e8e4dd";
export const CHARCOAL = "#1a1a18";
export const SAGE = "#8fa68e";
export const SAGE_DARK = "#5c7a5b";
export const ACCENT = "#c9a96e";
export const WARM_WHITE = "#f9f7f4";
export const OFF_WHITE = "#ede9e2";
export const MUTED = "#8a8680";
export const BODY = "#3d3d3b";
