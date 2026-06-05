// app/seo/Schema.tsx
// Rendered ONCE in the root layout only — do not duplicate in Footer or page components.

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function Schema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        /*
         * HVACBusiness is the most specific type — keep it.
         * Stacking LocalBusiness + ProfessionalService maps the entity to
         * both service and local search surfaces in Google's Knowledge Graph.
         */
        "@type": ["HVACBusiness", "LocalBusiness", "ProfessionalService"],
        "@id": `${BASE_URL}/#business`,
        name: "Élan Climat & Énergie",
        alternateName: ["Elan Climat Kenya", "Élan Climat Énergie"],
        url: BASE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${BASE_URL}/logo.png`,
        },
        image: `${BASE_URL}/images/og-image.jpg`,
        description:
          "Kenya's leading HVAC, solar energy, refrigeration, cold room, electrical, elevator, and generator engineering company. Certified engineers serving Nairobi, Mombasa, Kisumu, Eldoret, Nakuru, Nyeri, and across East and Central Africa since 2018.",
        foundingDate: "2018",
        telephone: "+254796952717",
        email: "hello@elanclimat.co.ke",

        address: {
          "@type": "PostalAddress",
          // ← Replace streetAddress with your actual street once confirmed.
          // Leaving it vague triggers a Google Search Console warning.
          streetAddress: "Nairobi",
          addressLocality: "Nairobi",
          addressRegion: "Nairobi County",
          addressCountry: "KE",
        },

        geo: {
          "@type": "GeoCoordinates",
          latitude: -1.286389,
          longitude: 36.817223,
        },

        /*
         * areaServed: typed City/Country nodes link to Google's Knowledge
         * Graph. Plain strings ("Kenya") do not — that was the original bug.
         */
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
          "https://www.facebook.com/elanclimat",
          // Corrected slug — original had /company/elanclimat (wrong)
          "https://www.linkedin.com/company/%C3%A9lan-climat-%C3%A9nergie",
          "https://www.instagram.com/elanclimat",
          // Uncomment only if the Twitter/X account is active:
          // "https://twitter.com/elanclimat",
        ],

        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "HVAC & Energy Engineering Services — Kenya & East Africa",
          /*
           * Each Service now has:
           *   - "@id"  → a stable entity identifier Google can deduplicate
           *   - "url"  → the exact anchor URL that resolves on your site
           *
           * Previously these were name-only strings. Without url/id, Google
           * cannot connect the schema entity to the actual page content,
           * meaning the service pages get zero schema benefit.
           *
           * Anchors here EXACTLY match the `anchor:` values in:
           *   - ServicesSection.tsx  (home cards)
           *   - ServiceSection.tsx   (id={service.anchor} on the section)
           *   - Hero.tsx             (tag hrefs)
           * so every internal link and schema entry point to the same fragment.
           */
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
              },
            },
            // These two services appear in your original Schema.tsx but have
            // no dedicated anchor on the services page yet. Once you add them,
            // give them anchors and update the url fields below.
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                "@id": `${BASE_URL}/services#lithium-batteries`,
                name: "Lithium Battery Storage Systems Kenya",
                url: `${BASE_URL}/services#lithium-batteries`,
                description:
                  "Lithium-ion and LiFePO4 battery storage systems for solar, backup power, and off-grid applications across Kenya.",
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
              },
            },
          ],
        },
      },

      /*
       * WebSite entity — enables Google Sitelinks Searchbox.
       * The SearchAction tells Google your site has internal search.
       * Remove the SearchAction block if you don't have a /search route.
       */
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        url: BASE_URL,
        name: "Élan Climat & Énergie",
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
