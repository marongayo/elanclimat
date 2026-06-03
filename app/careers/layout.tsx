// app/careers/layout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Elan Climat and help us build the future of climate risk management. Explore our open roles and apply today.",
};

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
