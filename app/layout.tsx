// app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import Schema from "./seo/Schema";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
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

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://elanclimat.co.ke";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
  },

  title: {
    default: "Élan Climat | HVAC, Solar & Engineering Services in Kenya",
    template: "%s | Élan Climat & Énergie",
  },

  description:
    "Élan Climat delivers certified HVAC, solar, plumbing, cold-room, elevator, and electrical engineering services across Nairobi, Mombasa, Kisumu, Eldoret, and East Africa.",

  authors: [{ name: "Élan Climat & Énergie" }],
  creator: "Élan Climat & Énergie",

  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Élan Climat & Énergie",
    title: "Élan Climat | HVAC, Solar & Engineering Services in Kenya",
    description:
      "Élan Climat delivers certified HVAC, solar, plumbing, cold-room, elevator, and electrical engineering services across Nairobi, Mombasa, Kisumu, Eldoret, and East Africa.",
    locale: "en_KE",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Élan Climat & Énergie — Engineering Services Kenya",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Élan Climat | HVAC, Solar & Engineering Services in Kenya",
    description:
      "Élan Climat delivers certified HVAC, solar, plumbing, cold-room, elevator, and electrical engineering services across Nairobi, Mombasa, Kisumu, Eldoret, and East Africa.",
    images: ["/images/og-image.png"],
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
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "x6z04k6kpn");
            `,
          }}
        />
      </head>
      <body>
        <Providers>{children}</Providers>

        <SpeedInsights />
      </body>
    </html>
  );
}
