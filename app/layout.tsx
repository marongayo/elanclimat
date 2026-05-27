// app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import Schema from "./seo/Schema";

// ✅ ADD THIS: Load your font via next/font instead of globals.css/@import.
//    next/font automatically sets display:swap, self-hosts the font (no extra
//    network round-trip to Google), and injects a preload link in <head> —
//    all of which directly reduce your FCP.
//    Replace "Geist" with whatever font you're currently using.
import { Geist } from "next/font/google";

const font = Geist({
  subsets: ["latin"],
  display: "swap", // prevents invisible text during font load (FOIT)
  preload: true,
  variable: "--font-sans", // use as a CSS variable in globals.css if needed
});

export const metadata: Metadata = {
  metadataBase: new URL("https://elanclimat.co.ke"),

  title: {
    default: "Élan Climat & Énergie ",
    template: "%s | Élan Climat & Énergie",
  },

  description:
    "Solar, HVAC, refrigeration, electrical, lithium battery, elevator and generator solutions for homes and businesses across East & Central Africa.",

  keywords: [
    "solar panels",
    "solar installation",
    "HVAC",
    "air conditioning",
    "refrigeration",
    "cold rooms",
    "electrician services",
    "electrical installation",
    "lithium batteries",
    "battery storage",
    "backup generators",
    "generator installation",
    "generator maintenance",
    "lift installation",
    "elevator installation",
    "elevator maintenance",
    "renewable energy",
    "commercial cooling",
    "industrial refrigeration",
    "energy solutions",
  ],

  authors: [{ name: "Élan Climat & Énergie" }],

  creator: "Élan Climat & Énergie",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title:
      "Élan Climat & Énergie | Solar · HVAC · Cold Rooms · Electrical Solutions",

    description:
      "Experts in solar energy, HVAC, refrigeration, cold rooms, electrical systems, elevators, lithium batteries, and backup generators.",

    url: "https://elanclimat.co.ke",

    siteName: "Élan Climat & Énergie",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // ✅ ADD THIS: Apply the font variable to the html element so it cascades
    //    to every component without needing to import it again anywhere.
    <html lang="en" className={font.variable}>
      <head>
        <Schema />
      </head>

      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
