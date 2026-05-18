// app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title:
    "Élan Climat & Énergie",

  description:
    "Professional solutions for solar panel installation, HVAC systems, refrigeration, cold rooms, electrical services, lithium battery storage, lift & elevator installation, and backup generator maintenance for homes and businesses, within East and central Africa",

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

  openGraph: {
    title:
      "Élan Climat & Énergie | Solar · HVAC · Cold Rooms · Electrical Solutions",

    description:
      "Experts in solar energy, HVAC, refrigeration, cold rooms, electrical systems, elevators, lithium batteries, and backup generators.",

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
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}