// components/Schema.tsx
import { getProducts } from "@/lib/db";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default async function Schema() {
  const products = await getProducts();

  // Derive price range dynamically from actual product prices
  const prices = products.map((p) => p.price).filter(Boolean);
  const minPrice = prices.length > 0 ? Math.min(...prices).toLocaleString() : "0";
  const maxPrice = prices.length > 0 ? Math.max(...prices).toLocaleString() : "0";
  const priceRange = `KES ${minPrice} – KES ${maxPrice}`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      // ─── Primary business entity ───────────────────────────────────────────
      {
        // @type lists the closest Schema.org business classifications.
        // HVACBusiness, ElectricalContractor, and Plumber are specific types.
        // GeneralContractor covers cold rooms, elevators, and generators.
        // LocalBusiness and ProfessionalService are broad fallbacks that
        // ensure Google classifies Élan correctly for all engineering services.
        "@type": [
          "HVACBusiness",
          "ElectricalContractor",
          "Plumber",
          "GeneralContractor",
          "LocalBusiness",
          "ProfessionalService",
        ],

        // /@id is NOT a real URL — it is a JSON-LD identifier used internally
        // by Google to link related schema blocks across pages together.
        // Other schemas (e.g. shop/page.tsx) reference this same @id to tell
        // Google they belong to the same business entity. It never needs to
        // exist as an actual page on the website.
        "@id": `${BASE_URL}/#business`,

        name: "Élan Climat & Énergie",

        // All known name variants — French, English, shorthand, and common
        // misspellings. Helps Google's Knowledge Graph resolve searches
        // regardless of how users spell or translate the company name.
        alternateName: [
          // French variants (official name)
          "Élan Climat Énergie",
          "Elan Climat Energie",
          "Élan Climat & Énergie",
          "Elan Climat & Energie",

          // English translations
          "Elan Climate and Energy",
          "Elan Climate & Energy",
          "Élan Climate and Energy",
          "Élan Climate & Energy",
          "Elan Climate Energy",

          // Kenyan market shorthand
          "Elan Climat Kenya",
          "Elan Climate Kenya",
          "Élan Kenya",
          "Elan Kenya",

          // Common misspellings / no-accent variants
          "Elan Climat",
          "Elan Energie",
          "Elan Energy Kenya",
        ],

        url: BASE_URL,
        foundingDate: "2018",
        priceRange,

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

        sameAs: [
          "https://www.facebook.com/profile.php?id=61590493237677",
          "https://www.linkedin.com/company/%C3%A9lan-climat-%C3%A9nergie",
          "https://www.instagram.com/elanclimat",
          "https://www.x.com/elanclimat",
        ],

        // hasOfferCatalog lists all 8 services in detail.
        // This is where Google reads the full scope of what Élan does —
        // the @type array above only covers broad business classifications.
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Engineering Services — Kenya & East Africa",
          itemListElement: [
            // 1. HVAC
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
            // 2. Solar
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
            // 3. Plumbing
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
            // 4. Cold Room & Refrigeration
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
            // 5. Elevator & Lift
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
            // 6. Electrical
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
            // 7. Lithium Battery Storage
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
            // 8. Generators
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
          "Certified HVAC, solar, plumbing, cold room, elevator, electrical, battery storage, and generator engineering services across Kenya and East Africa.",
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
