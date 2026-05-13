import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Élan Climat & Énergie | HVAC · Solar · Batteries",
  description:
    "Provider of HVAC services, solar power installations, and battery storage solutions. Sustainable comfort for homes and businesses.",
  keywords:
    "HVAC, solar power, battery storage, climate control, renewable energy",
};

import Providers from "./providers";

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
