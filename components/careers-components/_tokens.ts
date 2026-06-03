export const C = {
  charcoal:  "#1a1a18",
  warmWhite: "#f9f7f4",
  offWhite:  "#ede9e2",
  sage:      "#8fa68e",
  sageDark:  "#5a7a59",
  accent:    "#c9a96e",
  muted:     "#888580",
  body:      "#6b6b68",
  rule:      "#e8e4dd",
  ruleLight: "#c8c8c4",
  dim:       "#b0b0a8",
};

export const ROLES = [
  {
    id: "hvac-tech",
    title: "HVAC Installation Technician",
    category: "Technical",
    location: "Nairobi, KE",
    type: "Full-time",
    index: "01",
    description:
      "Install, commission, and service high-efficiency HVAC systems across residential and commercial projects. You'll work alongside our senior engineers on premium builds where precision matters.",
    requirements: [
      "3+ years HVAC installation experience",
      "Familiarity with inverter split systems and VRF",
      "Valid electrical or mechanical certification",
      "Clean driving licence",
    ],
  },
  {
    id: "solar-engineer",
    title: "Solar Systems Engineer",
    category: "Technical",
    location: "Nairobi, KE",
    type: "Full-time",
    index: "02",
    description:
      "Design and oversee solar PV and battery storage installations from site survey through commissioning. You care about clean energy as much as we do.",
    requirements: [
      "Degree in Electrical or Renewable Energy Engineering",
      "Experience with off-grid and grid-tied systems",
      "Proficiency in PVsyst or similar design tools",
      "Strong client-facing communication skills",
    ],
  },
  {
    id: "project-coordinator",
    title: "Project Coordinator",
    category: "Operations",
    location: "Nairobi, KE",
    type: "Full-time",
    index: "03",
    description:
      "Keep our installation projects running on time and on budget. You'll coordinate between clients, procurement, and field teams — the connective tissue that makes everything work.",
    requirements: [
      "2+ years project coordination or site management",
      "Experience with MS Project or similar tools",
      "Excellent written and verbal communication",
      "Background in construction or MEP preferred",
    ],
  },
  {
    id: "sales-consultant",
    title: "Energy Solutions Consultant",
    category: "Sales",
    location: "Nairobi, KE",
    type: "Full-time",
    index: "04",
    description:
      "Introduce clients to our range of HVAC, solar, and battery solutions. You'll guide them from initial inquiry through system selection — warm conversations with people who already want what we offer.",
    requirements: [
      "Proven track record in consultative sales",
      "Genuine interest in sustainable energy and technology",
      "Ability to interpret technical product specifications",
      "Existing network in real estate or construction a plus",
    ],
  },
  {
    id: "brand-intern",
    title: "Brand & Communications Intern",
    category: "Creative",
    location: "Nairobi / Remote",
    type: "Internship",
    index: "05",
    description:
      "Help shape how Élan looks and sounds — from social content to product photography briefs. Real experience with a brand that takes aesthetics seriously.",
    requirements: [
      "Studying design, communications, or marketing",
      "Strong portfolio of visual work",
      "Familiarity with Adobe Creative Suite or Figma",
      "A genuine eye for quality and detail",
    ],
  },
];

export const VALUES = [
  { num: "01", label: "Precision over speed" },
  { num: "02", label: "Sustainability as identity" },
  { num: "03", label: "Craft in everything" },
  { num: "04", label: "Long-term thinking" },
];

export const STATS = [
  { num: "12+", label: "Years Operating" },
  { num: "400+", label: "Projects Delivered" },
  { num: "5",   label: "Open Roles" },
];

export type Role = (typeof ROLES)[number];
export type AppStatus = "idle" | "form" | "sending" | "success";
