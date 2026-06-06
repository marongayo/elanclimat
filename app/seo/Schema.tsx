// app/seo/Schema.tsx
// Rendered ONCE in the root layout only — do not duplicate in page components.

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function Schema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      // ─── Primary business entity ───────────────────────────────────────────
      {
        "@type": ["HVACBusiness", "LocalBusiness", "ProfessionalService"],
        "@id": `${BASE_URL}/#business`,
        name: "Élan Climat & Énergie",
        alternateName: ["Elan Climat Kenya", "Élan Climat Énergie"],
        url: BASE_URL,
        foundingDate: "2018",

        logo: {
          "@type": "ImageObject",
          "@id": `${BASE_URL}/#logo`,
          url: `${BASE_URL}/logo.png`,
          contentUrl: `${BASE_URL}/logo.png`,
          width: 200,
          height: 60,
          caption: "Élan Climat & Énergie",
        },

        image: {
          "@type": "ImageObject",
          url: `${BASE_URL}/images/HVAC.png`,
          width: 1200,
          height: 630,
        },

        description:
          "Kenya's leading HVAC, solar energy, refrigeration, cold room, electrical, elevator, and generator engineering company. Certified engineers serving Nairobi, Mombasa, Kisumu, Eldoret, Nakuru, Nyeri, and across East and Central Africa since 2018.",

        telephone: "+254796952717",
        email: "hello@elanclimat.co.ke",

        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+254796952717",
          email: "hello@elanclimat.co.ke",
          contactType: "customer service",
          areaServed: "KE",
          availableLanguage: ["English", "Swahili"],
        },

        address: {
          "@type": "PostalAddress",
          addressLocality: "Nairobi",
          addressRegion: "Nairobi County",
          postalCode: "00100",
          addressCountry: "KE",
          // streetAddress: "Your Street, Building Name" ← uncomment once confirmed
        },

        geo: {
          "@type": "GeoCoordinates",
          latitude: -1.286389,
          longitude: 36.817223,
        },

        // Typed City/Country nodes — links to Google's Knowledge Graph
        areaServed: [
          { "@type": "City", name: "Nairobi" },
          { "@type": "City", name: "Mombasa" },
          { "@type": "City", name: "Kisumu" },
          { "@type": "City", name: "Eldoret" },
          { "@type": "City", name: "Nakuru" },
          { "@type": "City", name: "Nyeri" },
          { "@type": "Country", name: "Kenya" },
          { "@type": "Country", name: "Uganda" },
          { "@type": "Country", name: "Tanzania" },
          { "@type": "Country", name: "Rwanda" },
        ],

        // Verified social profiles only — unverified pages omitted
        sameAs: [
          "https://www.facebook.com/elanclimat",
          "https://www.linkedin.com/company/%C3%A9lan-climat-%C3%A9nergie",
          "https://www.instagram.com/elanclimat",
          "https://www.x.com/elanclimat",
        ],

        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "HVAC & Energy Engineering Services — Kenya & East Africa",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                "@id": `${BASE_URL}/services#hvac`,
                name: "HVAC Installation & Maintenance Kenya",
                url: `${BASE_URL}/services#hvac`,
                description:
                  "Split units, VRF systems, and ducted AC designed, installed, and serviced for homes, offices, and hotels across Nairobi, Mombasa, and Kisumu.",
                provider: { "@id": `${BASE_URL}/#business` },
                areaServed: { "@type": "Country", name: "Kenya" },
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                "@id": `${BASE_URL}/services#solar`,
                name: "Solar Panel Installation Kenya — Grid-Tied & Off-Grid",
                url: `${BASE_URL}/services#solar`,
                description:
                  "Grid-tied, off-grid, and hybrid solar PV systems with battery storage for homes, businesses, and farms across Kenya.",
                provider: { "@id": `${BASE_URL}/#business` },
                areaServed: { "@type": "Country", name: "Kenya" },
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                "@id": `${BASE_URL}/services#plumbing`,
                name: "Commercial & Residential Plumbing Kenya",
                url: `${BASE_URL}/services#plumbing`,
                description:
                  "Supply lines, riser systems, and sanitary installations for commercial buildings, apartments, and hospitals across Kenya.",
                provider: { "@id": `${BASE_URL}/#business` },
                areaServed: { "@type": "Country", name: "Kenya" },
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                "@id": `${BASE_URL}/services#cold-room`,
                name: "Cold Room & Refrigeration Installation Kenya",
                url: `${BASE_URL}/services#cold-room`,
                description:
                  "Walk-in cold rooms and blast freezers for food processors, hotels, and pharmaceuticals across Nairobi, Mombasa, and Nakuru.",
                provider: { "@id": `${BASE_URL}/#business` },
                areaServed: { "@type": "Country", name: "Kenya" },
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                "@id": `${BASE_URL}/services#elevator`,
                name: "Elevator & Lift Installation Nairobi Kenya",
                url: `${BASE_URL}/services#elevator`,
                description:
                  "Passenger, goods, and hospital lifts for residential and commercial buildings across Nairobi. KEBS-compliant with 24/7 maintenance.",
                provider: { "@id": `${BASE_URL}/#business` },
                areaServed: { "@type": "City", name: "Nairobi" },
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                "@id": `${BASE_URL}/services#electrical`,
                name: "Electrical Installation & Engineering Kenya",
                url: `${BASE_URL}/services#electrical`,
                description:
                  "LV distribution, standby generators, earthing, and smart building automation for offices, hospitals, and industrial facilities across Kenya.",
                provider: { "@id": `${BASE_URL}/#business` },
                areaServed: { "@type": "Country", name: "Kenya" },
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                "@id": `${BASE_URL}/services#lithium-batteries`,
                name: "Lithium Battery Storage Systems Kenya",
                url: `${BASE_URL}/services#lithium-batteries`,
                description:
                  "Lithium-ion and LiFePO4 battery storage systems for solar, backup power, and off-grid applications across Kenya.",
                provider: { "@id": `${BASE_URL}/#business` },
                areaServed: { "@type": "Country", name: "Kenya" },
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                "@id": `${BASE_URL}/services#generators`,
                name: "Generator Installation & Maintenance Kenya",
                url: `${BASE_URL}/services#generators`,
                description:
                  "Diesel and gas generator installation, servicing, and 24/7 maintenance for commercial and industrial clients across Kenya.",
                provider: { "@id": `${BASE_URL}/#business` },
                areaServed: { "@type": "Country", name: "Kenya" },
              },
            },
          ],
        },
      },

      // ─── WebSite entity ────────────────────────────────────────────────────
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        url: BASE_URL,
        name: "Élan Climat & Énergie",
        description:
          "Certified HVAC, solar, plumbing, cold-room, elevator, and electrical engineering services across Kenya and East Africa.",
        publisher: { "@id": `${BASE_URL}/#business` },
        inLanguage: "en-KE",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
