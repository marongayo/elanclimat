// app/seo/Schema.tsx
export default function Schema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    name: "Élan Climat & Énergie",
    url: "https://www.elanclimat.co.ke",
    logo: "https://www.elanclimat.co.ke/logo.png",
    description:
      "Solar energy, HVAC systems, refrigeration, cold rooms, electrical services, lithium batteries, elevator installation, and generator maintenance across East & Central Africa.",

    address: {
      "@type": "PostalAddress",
      addressCountry: "KE",
      addressRegion: "Nyeri",
      // Tip: Adding streetAddress and addressLocality here will prevent Google Search Console warnings.
    },

    areaServed: [
      "Kenya",
      "Uganda",
      "Tanzania",
      "Rwanda",
      "East Africa",
      "Central Africa",
    ],

    // Add your social media links here instead of your own website URL
    sameAs: [
      "https://www.facebook.com/elanclimat",
      "https://www.linkedin.com/company/elanclimat",
      "https://twitter.com/elanclimat",
    ],

    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Solar Panel Installation" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "HVAC Installation" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "HVAC Maintenance" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Refrigeration Systems" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Cold Rooms" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Electrical Services" },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Lithium Battery Storage Systems",
          },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Generator Installation" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Generator Maintenance" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Lift Installation" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Elevator Installation" },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
