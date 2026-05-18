export default function Schema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    name: "Élan Climat & Énergie",
    url: "https://elanclimat.co.ke",
    logo: "https://elanclimat.co.ke/logo.png",
    description:
      "Solar energy, HVAC systems, refrigeration, cold rooms, electrical services, lithium batteries, elevator installation, and generator maintenance across East & Central Africa.",

    address: {
      "@type": "PostalAddress",
      addressCountry: "KE",
      addressRegion: "Nyeri",
    },

    areaServed: [
      "Kenya",
      "Uganda",
      "Tanzania",
      "Rwanda",
      "East Africa",
      "Central Africa",
    ],

    sameAs: [
      "https://elanclimat.co.ke",
    ],

    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Solar Panel Installation" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "HVAC Installation & Maintenance" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Refrigeration & Cold Rooms" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Electrical Services" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Lithium Battery Storage Systems" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Generator Installation & Maintenance" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Lift & Elevator Installation" } },
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