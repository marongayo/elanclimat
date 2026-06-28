// app/contact/layout.tsx

import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Élan Climat & Énergie for HVAC, solar, cold-room, electrical, and elevator engineering services in Nairobi and across East Africa. We respond within one business day.",

  alternates: {
    canonical: "/contact",
  },

  openGraph: {
    title: "Contact",
    description:
      "Get in touch with Élan Climat & Énergie for HVAC, solar, cold-room, electrical, and elevator engineering services in Nairobi and across East Africa. We respond within one business day.",
    url: `${SITE_URL}/contact`,
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Contact Élan Climat & Énergie — Engineering Services Kenya",
      },
    ],
  },

  twitter: {
    title: "Contact",
    description:
      "Get in touch with Élan Climat & Énergie for HVAC, solar, cold-room, electrical, and elevator engineering services in Nairobi and across East Africa. We respond within one business day.",
    images: ["/images/og-image.png"],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
