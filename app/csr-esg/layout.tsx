import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const metadata: Metadata = {
  title: "CSR and ESG Strategies",
  description:
    "Élan Climat & Énergie's approach to corporate social responsibility and ESG strategy. Operating sustainable engineering, community impact, and responsible energy solutions across Kenya.",
  alternates: {
    canonical:`${BASE_URL}/csr-esg`,
  },
  openGraph: {
    title: "CSR and ESG Strategies | Élan Climat & Énergie",
    description:
      "Élan Climat & Énergie's approach to corporate social responsibility and ESG strategy. Operating sustainable engineering, community impact, and responsible energy solutions across Kenya.",
    url: `${BASE_URL}/csr-esg`,
    siteName: "Élan Climat & Énergie",
    type: "article",
  },
};

export default function CsrEsgLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
