// app/services/[slug]/page.tsx
// SERVER COMPONENT — statically generated per service, fully SEO-optimised

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CheckCircle2, ChevronDown, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import { SERVICES } from "@/lib/services-data";
import Eyebrow from "@/components/Eyebrow";
import { C } from "@/lib/constants";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// ─── Static params ────────────────────────────────────────────────────────────
export async function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

// ─── Per-service metadata ─────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: [
      `${service.title.toLowerCase()} Kenya`,
      `${service.title.toLowerCase()} Nairobi`,
      `${service.title.toLowerCase()} installation Kenya`,
      `${service.title.toLowerCase()} services Kenya`,
      "Élan Climat Kenya",
    ],
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `${BASE_URL}/services/${service.slug}`,
      images: [
        {
          url: service.heroImg.startsWith("http")
            ? service.heroImg
            : `${BASE_URL}${service.heroImg}`,
        },
      ],
    },
    alternates: {
      canonical: `${BASE_URL}/services/${service.slug}`,
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  const related = SERVICES.filter((s) => s.id !== service.id).slice(0, 3);
  const serviceIndex = SERVICES.findIndex((s) => s.id === service.id);
  const prevService = serviceIndex > 0 ? SERVICES[serviceIndex - 1] : null;
  const nextService =
    serviceIndex < SERVICES.length - 1 ? SERVICES[serviceIndex + 1] : null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.seoTitle,
    description: service.description,
    provider: {
      "@type": "LocalBusiness",
      name: "Élan Climat & Énergie",
      url: BASE_URL,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Nairobi",
        addressCountry: "KE",
      },
    },
    areaServed: [
      "Nairobi",
      "Mombasa",
      "Kisumu",
      "Eldoret",
      "Nakuru",
      "Nyeri",
      "Kenya",
    ],
    serviceType: service.title,
  };

  return (
    <main
      style={{ fontFamily: "'DM Sans', sans-serif", background: C.warmWhite }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <Navbar />

      <style>{`
        * { box-sizing: border-box; }

        .svc-detail-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 64px;
        }
        @media (max-width: 1024px) { .svc-detail-inner { padding: 0 32px; } }
        @media (max-width: 640px)  { .svc-detail-inner { padding: 0 24px; } }

        /* ── Overview (Component 1 layout) ── */
        .overview-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 64px;
        }
        @media (max-width: 1024px) { .overview-inner { padding: 0 32px; } }
        @media (max-width: 640px)  { .overview-inner { padding: 0 24px; } }

        /* Top row: heading left, image right */
        .overview-header {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: center;
          margin-bottom: 48px;
        }
        @media (max-width: 860px) {
          .overview-header { grid-template-columns: 1fr; }
          .overview-header-img { display: none; }
        }

        /* Bottom row: two cards side by side */
        .overview-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        @media (max-width: 768px) {
          .overview-cards { grid-template-columns: 1fr; }
        }

        /* Each card: text-block LEFT, tall portrait image RIGHT */
        .overview-card {
          display: flex;
          flex-direction: row;
          align-items: stretch;
          background: #e2e4e6;
        }
        @media (max-width: 560px) {
          .overview-card { flex-direction: column; }
          .overview-card-img-col { width: 100% !important; height: 220px; }
        }

        .overview-card-text {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 40px 28px;
          order: 1;
        }

        .overview-card-img-col {
          width: 210px;
          flex-shrink: 0;
          position: relative;
          overflow: hidden;
          order: 2;
        }

        .overview-learn-more {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #1a1a18;
          text-decoration: underline;
          text-underline-offset: 4px;
          transition: color 0.2s;
          margin-top: auto;
          padding-top: 20px;
        }
        .overview-learn-more:hover { color: #8fa68e; }

        /* ── Why grid ── */
        .why-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0;
        }
        @media (max-width: 640px) { .why-grid { grid-template-columns: 1fr; } }

        /* ── Related grid ── */
        .related-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: ${C.rule};
        }
        @media (max-width: 900px) { .related-grid { grid-template-columns: 1fr; } }

        /* ── FAQ ── */
        .faq-item summary {
          list-style: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          padding: 24px 0;
          border-top: 1px solid ${C.rule};
        }
        .faq-item summary::-webkit-details-marker { display: none; }
        .faq-item[open] summary .faq-chevron { transform: rotate(180deg); }
        .faq-chevron { transition: transform 0.25s ease; flex-shrink: 0; color: ${C.sage}; }
        .faq-item .faq-answer { padding: 0 0 24px 0; }

        /* ── Prev / Next ── */
        .nav-prev-next {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          background: ${C.rule};
        }
        @media (max-width: 640px) { .nav-prev-next { grid-template-columns: 1fr; } }
      `}</style>

      {/* ── Hero ── */}
      <div
        style={{
          position: "relative",
          height: "60vh",
          minHeight: 460,
          overflow: "hidden",
        }}
      >
        <Image
          src={service.heroImg}
          alt={service.heroAlt}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center 40%" }}
          quality={85}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(26,26,24,0.88) 0%, rgba(26,26,24,0.55) 60%, rgba(26,26,24,0.2) 100%)",
            zIndex: 1,
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            height: "100%",
            paddingBottom: 56,
          }}
        >
          <div className="svc-detail-inner">
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <nav aria-label="Breadcrumb">
                <ol
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    listStyle: "none",
                    margin: 0,
                    padding: 0,
                  }}
                  itemScope
                  itemType="https://schema.org/BreadcrumbList"
                >
                  <li
                    itemScope
                    itemType="https://schema.org/ListItem"
                    itemProp="itemListElement"
                  >
                    <Link
                      href="/"
                      itemProp="item"
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.65rem",
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.35)",
                        textDecoration: "none",
                      }}
                    >
                      <span itemProp="name">Home</span>
                    </Link>
                    <meta itemProp="position" content="1" />
                  </li>
                  <li
                    style={{
                      color: "rgba(255,255,255,0.2)",
                      fontSize: "0.6rem",
                    }}
                  >
                    /
                  </li>
                  <li
                    itemScope
                    itemType="https://schema.org/ListItem"
                    itemProp="itemListElement"
                  >
                    <Link
                      href="/services"
                      itemProp="item"
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.65rem",
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.35)",
                        textDecoration: "none",
                      }}
                    >
                      <span itemProp="name">Services</span>
                    </Link>
                    <meta itemProp="position" content="2" />
                  </li>
                  <li
                    style={{
                      color: "rgba(255,255,255,0.2)",
                      fontSize: "0.6rem",
                    }}
                  >
                    /
                  </li>
                  <li
                    itemScope
                    itemType="https://schema.org/ListItem"
                    itemProp="itemListElement"
                  >
                    <span
                      itemProp="name"
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.65rem",
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: C.sage,
                      }}
                    >
                      {service.title}
                    </span>
                    <meta itemProp="position" content="3" />
                  </li>
                </ol>
              </nav>

              <Eyebrow text={service.eyebrow} light />

              <h1
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)",
                  fontWeight: 500,
                  color: "#ffffff",
                  lineHeight: 1.08,
                  letterSpacing: "-0.018em",
                  margin: 0,
                  maxWidth: 640,
                }}
              >
                {service.seoTitle}
              </h1>

              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(1rem, 1.8vw, 1.35rem)",
                  fontWeight: 300,
                  fontStyle: "italic",
                  color: "rgba(255,255,255,0.5)",
                  margin: 0,
                  maxWidth: 480,
                }}
              >
                {service.headline}
              </p>

              <div
                style={{
                  display: "flex",
                  gap: 12,
                  flexWrap: "wrap",
                  marginTop: 4,
                }}
              >
                <Link
                  href="/contact"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    background: "#ffffff",
                    color: C.charcoal,
                    textDecoration: "none",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.72rem",
                    fontWeight: 500,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    padding: "11px 10px 11px 22px",
                    borderRadius: 9999,
                  }}
                >
                  Request a Quote
                  <span
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: C.charcoal,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <ArrowUpRight size={12} color="#ffffff" />
                  </span>
                </Link>
                <Link
                  href="/services"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.68rem",
                    fontWeight: 400,
                    color: "rgba(255,255,255,0.45)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    borderBottom: "1px solid rgba(255,255,255,0.18)",
                    paddingBottom: 2,
                    alignSelf: "center",
                  }}
                >
                  All Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main content — Component 1 layout ── */}
      <section
        aria-label={`${service.title} details`}
        style={{ backgroundColor: "#e2e4e6", padding: "80px 0" }}
      >
        <div className="overview-inner">
          {/* Top row: h2 + description left | hero image right */}
          <div className="overview-header">
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <Eyebrow text="Overview" />
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                  fontWeight: 400,
                  color: C.charcoal,
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  margin: 0,
                }}
              >
                {service.seoTitle}
              </h2>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.9rem",
                  color: C.body,
                  lineHeight: 1.85,
                  margin: 0,
                  fontWeight: 300,
                }}
              >
                {service.description}
              </p>
            </div>

            <div
              className="overview-header-img"
              style={{ position: "relative", height: 340, overflow: "hidden" }}
            >
              <Image
                src={service.heroImg}
                alt={service.heroAlt}
                fill
                sizes="(max-width: 860px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
                quality={82}
              />
            </div>
          </div>

          {/* Bottom row: two cards — text left, portrait image right */}
          <div className="overview-cards">
            {/* Card 1 — extended description + colA */}
            <div className="overview-card">
              <div className="overview-card-text">
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    background: C.sage,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 20,
                    flexShrink: 0,
                  }}
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                  </svg>
                </div>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.35rem",
                    fontWeight: 500,
                    color: C.charcoal,
                    margin: "0 0 12px",
                    letterSpacing: "-0.01em",
                    lineHeight: 1.2,
                  }}
                >
                  About this Service
                </h3>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.82rem",
                    color: C.body,
                    lineHeight: 1.8,
                    margin: 0,
                    fontWeight: 300,
                  }}
                >
                  {service.extendedDescription.slice(0, 200)}…
                </p>
                <Link
                  href={`/services/${service.slug}`}
                  className="overview-learn-more"
                >
                  Learn More
                </Link>
              </div>
              <div className="overview-card-img-col">
                <Image
                  src={service.colA}
                  alt={service.colAlt[0]}
                  fill
                  sizes="210px"
                  style={{ objectFit: "cover" }}
                  quality={78}
                />
              </div>
            </div>

            {/* Card 2 — features checklist + colB */}
            <div className="overview-card">
              <div className="overview-card-text">
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    background: C.charcoal,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 20,
                    flexShrink: 0,
                  }}
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="9 11 12 14 22 4" />
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                  </svg>
                </div>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.35rem",
                    fontWeight: 500,
                    color: C.charcoal,
                    margin: "0 0 16px",
                    letterSpacing: "-0.01em",
                    lineHeight: 1.2,
                  }}
                >
                  What&apos;s Included
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    width: "100%",
                    alignItems: "flex-start",
                  }}
                >
                  {service.features.slice(0, 3).map((f) => (
                    <div
                      key={f}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 10,
                      }}
                    >
                      <CheckCircle2
                        size={13}
                        strokeWidth={1.8}
                        style={{ color: C.sage, flexShrink: 0, marginTop: 2 }}
                      />
                      <span
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.82rem",
                          color: C.body,
                          lineHeight: 1.6,
                          fontWeight: 300,
                          textAlign: "left",
                        }}
                      >
                        {f}
                      </span>
                    </div>
                  ))}
                  {service.features.length > 3 && (
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.7rem",
                        color: C.muted,
                        marginTop: 2,
                      }}
                    >
                      + {service.features.length - 3} more
                    </span>
                  )}
                </div>
                <Link href="/contact" className="overview-learn-more">
                  Request a Quote
                </Link>
              </div>
              <div className="overview-card-img-col">
                <Image
                  src={service.colB}
                  alt={service.colAlt[1]}
                  fill
                  sizes="210px"
                  style={{ objectFit: "cover" }}
                  quality={78}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Élan Climat ── */}
      <section
        style={{ backgroundColor: "white", padding: "64px 0" }}
        aria-label={`Why choose Élan Climat for ${service.title}`}
      >
        <div className="svc-detail-inner">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              marginBottom: 40,
              maxWidth: 560,
            }}
          >
            <Eyebrow text="Why Élan Climat" />
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                fontWeight: 400,
                color: C.charcoal,
                lineHeight: 1.1,
                letterSpacing: "-0.015em",
                margin: 0,
              }}
            >
              What Sets Our {service.title} Apart
            </h2>
          </div>

          <div
            className="why-grid"
            style={{ borderTop: `1px solid ${C.rule}` }}
          >
            {service.whyPoints.map((point, i) => (
              <div
                key={point.title}
                style={{
                  padding: "28px 32px 28px 0",
                  borderBottom: `1px solid ${C.rule}`,
                  borderRight: i % 2 === 0 ? `1px solid ${C.rule}` : "none",
                  paddingRight: i % 2 === 0 ? 48 : 0,
                  paddingLeft: i % 2 !== 0 ? 48 : 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "2rem",
                    fontWeight: 300,
                    color: C.rule,
                    lineHeight: 1,
                    letterSpacing: "-0.04em",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.2rem",
                    fontWeight: 500,
                    color: C.charcoal,
                    margin: 0,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {point.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.82rem",
                    color: C.muted,
                    lineHeight: 1.8,
                    margin: 0,
                    fontWeight: 300,
                  }}
                >
                  {point.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section
        style={{ backgroundColor: C.offWhite, padding: "88px 0" }}
        aria-label={`${service.title} frequently asked questions`}
      >
        <div className="svc-detail-inner" style={{ maxWidth: 800 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              marginBottom: 48,
            }}
          >
            <Eyebrow text="FAQ" />
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                fontWeight: 400,
                color: C.charcoal,
                lineHeight: 1.1,
                letterSpacing: "-0.015em",
                margin: 0,
              }}
            >
              Common Questions About {service.title} in Kenya
            </h2>
          </div>

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: service.faq.map((item) => ({
                  "@type": "Question",
                  name: item.q,
                  acceptedAnswer: { "@type": "Answer", text: item.a },
                })),
              }),
            }}
          />

          <div style={{ borderBottom: `1px solid ${C.rule}` }}>
            {service.faq.map((item) => (
              <details key={item.q} className="faq-item">
                <summary>
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
                      fontWeight: 400,
                      color: C.charcoal,
                      lineHeight: 1.4,
                    }}
                  >
                    {item.q}
                  </span>
                  <ChevronDown size={16} className="faq-chevron" />
                </summary>
                <div className="faq-answer">
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.86rem",
                      color: C.body,
                      lineHeight: 1.85,
                      margin: 0,
                      fontWeight: 300,
                    }}
                  >
                    {item.a}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Related services ── */}
      <section
        style={{ backgroundColor: C.warmWhite, padding: "88px 0" }}
        aria-label="Related services"
      >
        <div className="svc-detail-inner">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              marginBottom: 48,
            }}
          >
            <Eyebrow text="Also From Élan" />
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)",
                fontWeight: 400,
                color: C.charcoal,
                lineHeight: 1.1,
                letterSpacing: "-0.015em",
                margin: 0,
              }}
            >
              Related Services in Kenya
            </h2>
          </div>

          <div className="related-grid">
            {related.map((rel) => (
              <Link
                key={rel.id}
                href={`/services/${rel.slug}`}
                style={{
                  textDecoration: "none",
                  background: C.warmWhite,
                  padding: "36px 32px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                }}
              >
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.6rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: C.sage,
                    fontWeight: 500,
                  }}
                >
                  {rel.eyebrow}
                </span>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.25rem",
                    fontWeight: 400,
                    color: C.charcoal,
                    margin: 0,
                    lineHeight: 1.25,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {rel.seoTitle}
                </h3>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.8rem",
                    color: C.muted,
                    lineHeight: 1.7,
                    margin: 0,
                    fontWeight: 300,
                  }}
                >
                  {rel.description.slice(0, 110)}…
                </p>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.68rem",
                    fontWeight: 500,
                    color: C.charcoal,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    marginTop: 4,
                    borderBottom: `1px solid ${C.charcoal}`,
                    paddingBottom: 2,
                    alignSelf: "flex-start",
                  }}
                >
                  Learn More
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Prev / Next service nav ── */}
      {(prevService || nextService) && (
        <div
          className="nav-prev-next"
          style={{ borderTop: `1px solid ${C.rule}` }}
        >
          {prevService ? (
            <Link
              href={`/services/${prevService.slug}`}
              style={{
                textDecoration: "none",
                padding: "32px 40px",
                display: "flex",
                flexDirection: "column",
                gap: 8,
                borderRight: nextService ? `1px solid ${C.rule}` : "none",
              }}
            >
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.6rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: C.muted,
                }}
              >
                ← Previous
              </span>
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.1rem",
                  fontWeight: 400,
                  color: C.charcoal,
                  letterSpacing: "-0.01em",
                }}
              >
                {prevService.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
          {nextService && (
            <Link
              href={`/services/${nextService.slug}`}
              style={{
                textDecoration: "none",
                padding: "32px 40px",
                display: "flex",
                flexDirection: "column",
                gap: 8,
                alignItems: "flex-end",
                textAlign: "right",
              }}
            >
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.6rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: C.muted,
                }}
              >
                Next →
              </span>
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.1rem",
                  fontWeight: 400,
                  color: C.charcoal,
                  letterSpacing: "-0.01em",
                }}
              >
                {nextService.title}
              </span>
            </Link>
          )}
        </div>
      )}

      {/* ── CTA band ── */}
      <section
        aria-label={`Get a quote for ${service.title} in Kenya`}
        style={{ background: C.charcoal, padding: "88px 0" }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 64px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: 24,
          }}
        >
          <Eyebrow text="Ready to Begin?" light />
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              fontWeight: 400,
              color: "#ffffff",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              margin: 0,
              maxWidth: 540,
            }}
          >
            Get a Quote for {service.title} in Kenya
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.84rem",
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.75,
              maxWidth: 420,
              margin: 0,
              fontWeight: 300,
            }}
          >
            Our engineers are ready to assess your requirements and provide a
            detailed, itemised proposal — at no cost to you.
          </p>
          <div
            style={{
              display: "flex",
              gap: 16,
              flexWrap: "wrap",
              justifyContent: "center",
              marginTop: 8,
            }}
          >
            <Link
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background: "#ffffff",
                color: C.charcoal,
                textDecoration: "none",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.72rem",
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "12px 10px 12px 24px",
                borderRadius: 9999,
              }}
            >
              Get in Touch
              <span
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  background: C.charcoal,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </span>
            </Link>
            <Link
              href="/services"
              style={{
                display: "inline-flex",
                alignItems: "center",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.72rem",
                fontWeight: 500,
                color: "rgba(255,255,255,0.45)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                textDecoration: "none",
                borderBottom: "1px solid rgba(255,255,255,0.18)",
                paddingBottom: 2,
                alignSelf: "center",
              }}
            >
              All Services
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
