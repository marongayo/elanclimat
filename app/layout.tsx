// app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import Schema from "./seo/Schema";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { DM_Sans, Cormorant_Garamond } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-sans",
  weight: "variable",
  axes: ["opsz"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-serif",
  weight: ["300", "400", "500", "600", "700"],
});

const SITE_URL = "https://www.elanclimat.co.ke";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Élan Climat & Énergie",
    template: "%s | Élan Climat & Énergie",
  },

  description:
    "Solar, HVAC, refrigeration, electrical, lithium battery, elevator and generator solutions for homes and businesses across East & Central Africa.",

  authors: [{ name: "Élan Climat & Énergie" }],
  creator: "Élan Climat & Énergie",

  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Élan Climat & Énergie",
    title:
      "Élan Climat & Énergie | Solar · HVAC · Cold Rooms · Electrical Solutions",
    description:
      "Experts in solar energy, HVAC, refrigeration, cold rooms, electrical systems, elevators, lithium batteries, and backup generators across Kenya and East Africa.",
    locale: "en_KE",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Élan Climat & Énergie — Engineering Services Kenya",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Élan Climat & Énergie | Solar · HVAC · Cold Rooms · Electrical Solutions",
    description:
      "Experts in solar energy, HVAC, refrigeration, cold rooms, electrical systems, elevators, lithium batteries, and backup generators across Kenya and East Africa.",
    images: ["/images/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${cormorant.variable}`}>
      <head>
        <Schema />
      </head>
      <body>
        <Providers>{children}</Providers>

        <SpeedInsights />
      </body>
    </html>
  );
}
