// app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import Schema from "./seo/Schema";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { Geist } from "next/font/google";

const font = Geist({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-sans",
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
    <html lang="en" className={font.variable}>
      <head>
        <Schema />
        <SpeedInsights />
      </head>

      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
