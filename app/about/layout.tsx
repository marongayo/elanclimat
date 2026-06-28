// app/about/layout.tsx

import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Élan Climat & Énergie — our story, values, and the certified engineering team delivering HVAC, solar, cold-room, electrical, and elevator solutions across Kenya and East Africa.",

  alternates: {
    canonical: "/about",
  },

  openGraph: {
    title: "About",
    description:
      "Learn about Élan Climat & Énergie — our story, values, and the certified engineering team delivering HVAC, solar, cold-room, electrical, and elevator solutions across Kenya and East Africa.",
    url: `${SITE_URL}/about`,
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "About Élan Climat & Énergie — Engineering Services Kenya",
      },
    ],
  },

  twitter: {
    title: "About",
    description:
      "Learn about Élan Climat & Énergie — our story, values, and the certified engineering team delivering HVAC, solar, cold-room, electrical, and elevator solutions across Kenya and East Africa.",
    images: ["/images/og-image.png"],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
