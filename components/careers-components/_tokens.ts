import type { Job } from "@/lib/types/jobs";

export type Role = Job & { index: string };
export type AppStatus = "idle" | "form" | "sending" | "success";

export const VALUES = [
  { num: "01", label: "Precision over speed" },
  { num: "02", label: "Sustainability as identity" },
  { num: "03", label: "Craft in everything" },
  { num: "04", label: "Long-term thinking" },
];

export const STATS = [
  { num: "12+", label: "Years Operating" },
  { num: "400+", label: "Projects Delivered" },
  { num: "5", label: "Open Roles" },
];
