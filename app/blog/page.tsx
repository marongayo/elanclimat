// app/blog/page.tsx
// SERVER COMPONENT — no "use client", fully static and indexable

import { getBlogPosts } from "@/lib/db";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import BackToTop from "@/components/BackToTop";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// ─── Metadata — shown in Google search results ────────────────────────────────
export const metadata: Metadata = {
  title: "HVAC, Solar & Energy Blog — Engineering Insights from Kenya",
  description:
    "Expert articles on HVAC installation, solar energy systems, cold rooms, electrical engineering, and sustainable building solutions from Élan Climat's engineers in Kenya.",
  keywords: [
    "HVAC blog Kenya",
    "solar energy articles Kenya",
    "cold room installation guide",
    "electrical engineering Kenya",
    "energy efficiency Kenya",
    "sustainable buildings Kenya",
    "HVAC maintenance tips",
    "solar panels Kenya guide",
  ],
  alternates: {
    canonical: `${BASE_URL}/blog`,
  },
  openGraph: {
    title: "HVAC, Solar & Energy Blog — Engineering Insights from Kenya",
    description:
      "Expert articles on HVAC, solar energy, cold rooms, and sustainable engineering from Élan Climat's team across Kenya.",
    url: `${BASE_URL}/blog`,
    siteName: "Élan Climat Engineering Blog",
    type: "website",
  },
};

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <>
      <Navbar />
      <BackToTop />
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }

        .blog-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 64px;
        }
        .blog-pill {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-family: var(--font-sans), sans-serif;
          font-size: 0.58rem;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #8fa68e;
          border: 1px solid rgba(143,166,142,0.35);
          padding: 4px 12px 4px 8px;
          background: rgba(143,166,142,0.06);
          border-radius: 9999px;
        }
        .blog-pill-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #8fa68e;
          flex-shrink: 0;
          display: inline-block;
        }
        .featured-card {
          display: grid;
          grid-template-columns: 1fr 1fr;
          overflow: hidden;
          border: 1px solid #e8e4dd;
          text-decoration: none;
          transition: box-shadow 0.3s ease;
        }
        .featured-card:hover { box-shadow: 0 12px 48px rgba(0,0,0,0.08); }
        .featured-card-img img {
          transition: transform 0.7s cubic-bezier(0.22,1,0.36,1);
        }
        .featured-card:hover .featured-card-img img { transform: scale(1.04); }
        .blog-card {
          background: #ffffff;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          border: 1px solid #e8e4dd;
          text-decoration: none;
          transition: box-shadow 0.3s ease;
        }
        .blog-card:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.07); }
        .blog-card-img img {
          transition: transform 0.7s cubic-bezier(0.22,1,0.36,1);
        }
        .blog-card:hover .blog-card-img img { transform: scale(1.04); }
        .blog-arrow {
          width: 32px; height: 32px;
          border-radius: 50%;
          border: 1px solid #e8e4dd;
          background: none;
          display: flex; align-items: center; justify-content: center;
          color: #1a1a18;
          flex-shrink: 0;
          transition: all 0.25s ease;
        }
        .blog-card:hover .blog-arrow,
        .featured-card:hover .blog-arrow {
          background: #1a1a18;
          color: #f9f7f4;
          border-color: #1a1a18;
          transform: rotate(45deg);
        }
        .blog-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #1a1a18;
          color: #ffffff;
          text-decoration: none;
          padding: 11px 10px 11px 22px;
          border-radius: 9999px;
          font-family: var(--font-sans), sans-serif;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          border: 1.5px solid #1a1a18;
          transition: background 0.25s, color 0.25s;
          align-self: flex-start;
        }
        .blog-cta:hover { background: transparent; color: #1a1a18; }
        .blog-cta:hover .blog-cta-icon { background: #1a1a18; color: #ffffff; transform: rotate(45deg); }
        .blog-cta-icon {
          width: 28px; height: 28px;
          border-radius: 50%;
          background: rgba(255,255,255,0.15);
          display: flex; align-items: center; justify-content: center;
          transition: background 0.25s, color 0.25s, transform 0.3s;
          flex-shrink: 0;
        }
        .explore-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 0;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          text-decoration: none;
          gap: 16px;
          transition: border-color 0.2s;
        }
        .explore-link:hover { border-bottom-color: rgba(255,255,255,0.2); }
        @media (max-width: 1100px) {
          .blog-inner { padding: 0 32px; }
          .featured-card { grid-template-columns: 1fr; }
          .featured-img-col { aspect-ratio: 16/9 !important; }
          .blog-grid-3 { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .blog-inner { padding: 0 24px; }
          .blog-grid-3 { grid-template-columns: 1fr !important; }
          .blog-hero-grid { grid-template-columns: 1fr !important; }
          .blog-hero-right { display: none !important; }
        }
      `}</style>

      <main
        style={{ background: "#f9f7f4", minHeight: "100vh" }}
        itemScope
        itemType="https://schema.org/Blog"
      >
        {/* Hidden schema metadata — read by Google, invisible to users */}
        <meta itemProp="name" content="Élan Climat Engineering Blog — Kenya" />
        <meta
          itemProp="description"
          content="Expert articles on HVAC installation, solar energy, cold rooms, and sustainable building engineering from Kenya."
        />

        {/* ── Hero ── */}
        <div
          style={{
            position: "relative",
            height: "52vh",
            minHeight: 400,
            overflow: "hidden",
          }}
        >
          {featured ? (
            <Image
              src={featured.image}
              alt={`${featured.title} — Élan Climat Kenya engineering blog`}
              fill
              priority
              sizes="100vw"
              style={{ objectFit: "cover", objectPosition: "center 40%" }}
              quality={85}
            />
          ) : (
            <div
              style={{ position: "absolute", inset: 0, background: "#1a1a18" }}
            />
          )}

          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to right, rgba(26,26,24,0.88) 0%, rgba(26,26,24,0.58) 55%, rgba(26,26,24,0.18) 100%)",
              zIndex: 1,
            }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
              padding: "48px 0 56px",
            }}
          >
            {/* Breadcrumb with schema */}
            <div className="blog-inner">
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
                        fontFamily: "var(--font-sans), sans-serif",
                        fontSize: "0.65rem",
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.4)",
                        textDecoration: "none",
                      }}
                    >
                      <span itemProp="name">Home</span>
                    </Link>
                    <meta itemProp="position" content="1" />
                  </li>
                  <li
                    style={{
                      color: "rgba(255,255,255,0.25)",
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
                        fontFamily: "var(--font-sans), sans-serif",
                        fontSize: "0.65rem",
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "#8fa68e",
                      }}
                    >
                      Blog
                    </span>
                    <meta itemProp="position" content="2" />
                  </li>
                </ol>
              </nav>
            </div>

            {/* Hero copy */}
            <div className="blog-inner">
              <div
                className="blog-hero-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 80,
                  alignItems: "flex-end",
                }}
              >
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 16 }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        width: 24,
                        height: 1,
                        background: "rgba(255,255,255,0.35)",
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "var(--font-sans), sans-serif",
                        fontSize: "0.62rem",
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.45)",
                        fontWeight: 500,
                      }}
                    >
                      Engineering Insights
                    </span>
                  </div>

                  {/* h1 — keyword rich */}
                  <h1
                    style={{
                      fontFamily: "var(--font-serif), serif",
                      fontSize: "clamp(2.6rem, 5vw, 4rem)",
                      fontWeight: 400,
                      lineHeight: 1.05,
                      letterSpacing: "-0.025em",
                      color: "#ffffff",
                      margin: 0,
                    }}
                  >
                    HVAC, Solar & Energy
                    <br />
                    <em
                      style={{
                        fontStyle: "italic",
                        fontWeight: 300,
                        color: "#c9a96e",
                      }}
                    >
                      Insights from Kenya
                    </em>
                  </h1>

                  {/* Supporting copy — adds keyword depth */}
                  <p
                    style={{
                      fontFamily: "var(--font-sans), sans-serif",
                      fontSize: "0.84rem",
                      color: "rgba(255,255,255,0.55)",
                      lineHeight: 1.85,
                      maxWidth: 400,
                      margin: 0,
                      fontWeight: 300,
                    }}
                  >
                    Expert guides on HVAC installation, solar panel systems,
                    cold room design, electrical engineering, and sustainable
                    building solutions across Nairobi, Mombasa, and Kenya.
                  </p>
                </div>

                {/* Post count */}
                <div
                  className="blog-hero-right"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: 4,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-serif), serif",
                      fontSize: "4rem",
                      fontWeight: 300,
                      color: "rgba(255,255,255,0.12)",
                      lineHeight: 1,
                      letterSpacing: "-0.04em",
                    }}
                  >
                    {String(posts.length).padStart(2, "0")}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-sans), sans-serif",
                      fontSize: "0.58rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.25)",
                    }}
                  >
                    Articles published
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gradient bar */}
        <div
          style={{
            height: 3,
            background:
              "linear-gradient(to right, #8fa68e 0%, #c9a96e 55%, #f9f7f4 100%)",
          }}
        />

        {/* ── Featured post ── */}
        {featured && (
          <section
            aria-label="Featured article"
            style={{ backgroundColor: "#f9f7f4", padding: "72px 0 0" }}
            itemScope
            itemType="https://schema.org/BlogPosting"
          >
            {/* Schema metadata for featured post */}
            <meta itemProp="headline" content={featured.title} />
            <meta itemProp="description" content={featured.excerpt} />
            <meta itemProp="datePublished" content={featured.date} />
            <meta itemProp="image" content={featured.image} />
            <meta
              itemProp="url"
              content={`${BASE_URL}/blog/${featured.slug}`}
            />
            <div
              itemProp="publisher"
              itemScope
              itemType="https://schema.org/Organization"
            >
              <meta itemProp="name" content="Élan Climat & Énergie" />
              <meta itemProp="url" content={`${BASE_URL}/`} />
            </div>

            <div className="blog-inner">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 32,
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: 24,
                    height: 1,
                    background: "#c8c8c4",
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-sans), sans-serif",
                    fontSize: "0.62rem",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "#8fa68e",
                    fontWeight: 500,
                  }}
                >
                  Featured
                </span>
                <div style={{ flex: 1, height: 1, background: "#e8e4dd" }} />
              </div>

              <Link
                href={`/blog/${featured.slug}`}
                className="featured-card"
                aria-label={`Read: ${featured.title}`}
              >
                {/* Image */}
                <div
                  className="featured-card-img featured-img-col"
                  style={{
                    position: "relative",
                    aspectRatio: "1/1",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={featured.image}
                    alt={`${featured.title} — Élan Climat Kenya`}
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                    sizes="(max-width:1100px) 100vw, 50vw"
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: 20,
                      left: 20,
                      background: "rgba(26,26,24,0.72)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      padding: "6px 14px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      borderRadius: 9999,
                    }}
                  >
                    <span
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        background: "#8fa68e",
                        display: "inline-block",
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "var(--font-sans), sans-serif",
                        fontSize: "0.62rem",
                        color: "rgba(255,255,255,0.85)",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                      }}
                    >
                      {featured.category}
                    </span>
                  </div>
                </div>

                {/* Text */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "52px 56px",
                    background: "#ffffff",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      marginBottom: 20,
                    }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        width: 24,
                        height: 1,
                        background: "#c8c8c4",
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "var(--font-sans), sans-serif",
                        fontSize: "0.62rem",
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: "#8fa68e",
                        fontWeight: 500,
                      }}
                    >
                      Latest article
                    </span>
                  </div>

                  {/* h2 — post title, fully indexable */}
                  <h2
                    style={{
                      fontFamily: "var(--font-serif), serif",
                      fontSize: "clamp(1.6rem, 2.5vw, 2.4rem)",
                      fontWeight: 400,
                      color: "#1a1a18",
                      lineHeight: 1.12,
                      letterSpacing: "-0.015em",
                      margin: "0 0 12px",
                    }}
                  >
                    {featured.title}
                  </h2>

                  <div
                    style={{
                      width: 32,
                      height: 1,
                      background: "#c8c8c4",
                      marginBottom: 20,
                    }}
                  />

                  <p
                    style={{
                      fontFamily: "var(--font-sans), sans-serif",
                      fontSize: "0.86rem",
                      color: "#6b6b68",
                      lineHeight: 1.85,
                      margin: "0 0 28px",
                      fontWeight: 300,
                    }}
                  >
                    {featured.excerpt}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 20,
                      marginBottom: 32,
                    }}
                  >
                    <time
                      dateTime={featured.date}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        fontFamily: "var(--font-sans), sans-serif",
                        fontSize: "0.68rem",
                        color: "#b0b0a8",
                      }}
                    >
                      <Calendar size={11} strokeWidth={1.5} />
                      {new Date(featured.date).toLocaleDateString("en-KE", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                    <span
                      style={{ width: 1, height: 12, background: "#e8e4dd" }}
                    />
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        fontFamily: "var(--font-sans), sans-serif",
                        fontSize: "0.68rem",
                        color: "#b0b0a8",
                      }}
                    >
                      <Clock size={11} strokeWidth={1.5} />
                      {featured.readTime}
                    </span>
                  </div>

                  <span className="blog-cta">
                    Read Article
                    <span className="blog-cta-icon">
                      <ArrowUpRight size={13} strokeWidth={2} />
                    </span>
                  </span>
                </div>
              </Link>
            </div>
          </section>
        )}

        {/* ── All articles grid ── */}
        {rest.length > 0 && (
          <section
            aria-label="All engineering articles from Élan Climat Kenya"
            style={{ padding: "72px 0 96px" }}
          >
            <div className="blog-inner">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  marginBottom: 40,
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: 24,
                    height: 1,
                    background: "#c8c8c4",
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-sans), sans-serif",
                    fontSize: "0.62rem",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "#8fa68e",
                    fontWeight: 500,
                  }}
                >
                  All Articles
                </span>
                <div style={{ flex: 1, height: 1, background: "#e8e4dd" }} />
                <span
                  style={{
                    fontFamily: "var(--font-sans), sans-serif",
                    fontSize: "0.62rem",
                    color: "#b0b0a8",
                    letterSpacing: "0.1em",
                  }}
                >
                  {String(rest.length).padStart(2, "0")} articles
                </span>
              </div>

              {/* 3-column grid — all cards server-rendered, fully indexed */}
              <div
                className="blog-grid-3"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 16,
                }}
                role="list"
              >
                {rest.map((post) => (
                  <article
                    key={post._id}
                    role="listitem"
                    itemScope
                    itemType="https://schema.org/BlogPosting"
                  >
                    {/* Schema metadata per card */}
                    <meta itemProp="headline" content={post.title} />
                    <meta itemProp="description" content={post.excerpt} />
                    <meta itemProp="datePublished" content={post.date} />
                    <meta itemProp="image" content={post.image} />
                    <meta
                      itemProp="url"
                      content={`${BASE_URL}/blog/${post.slug}`}
                    />

                    <Link
                      href={`/blog/${post.slug}`}
                      className="blog-card"
                      aria-label={`Read article: ${post.title}`}
                      style={{ height: "100%" }}
                    >
                      {/* Thumbnail */}
                      <div
                        className="blog-card-img"
                        style={{
                          position: "relative",
                          aspectRatio: "16/10",
                          overflow: "hidden",
                        }}
                      >
                        <Image
                          src={post.image}
                          alt={`${post.title} — Élan Climat Kenya`}
                          fill
                          style={{ objectFit: "cover" }}
                          sizes="(max-width:640px) 100vw, (max-width:1100px) 50vw, 33vw"
                        />
                        <div
                          style={{
                            position: "absolute",
                            bottom: 12,
                            left: 12,
                            background: "rgba(26,26,24,0.72)",
                            backdropFilter: "blur(6px)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            padding: "4px 10px",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 6,
                            borderRadius: 9999,
                          }}
                        >
                          <span
                            style={{
                              width: 4,
                              height: 4,
                              borderRadius: "50%",
                              background: "#8fa68e",
                              display: "inline-block",
                            }}
                          />
                          <span
                            style={{
                              fontFamily: "var(--font-sans), sans-serif",
                              fontSize: "0.56rem",
                              color: "rgba(255,255,255,0.8)",
                              letterSpacing: "0.12em",
                              textTransform: "uppercase",
                            }}
                          >
                            {post.category}
                          </span>
                        </div>
                      </div>

                      {/* Body */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          flex: 1,
                          padding: "24px 24px 20px",
                        }}
                      >
                        <h3
                          itemProp="name"
                          style={{
                            fontFamily: "var(--font-serif), serif",
                            fontSize: "1.2rem",
                            fontWeight: 400,
                            color: "#1a1a18",
                            lineHeight: 1.2,
                            letterSpacing: "-0.01em",
                            margin: "0 0 10px",
                          }}
                        >
                          {post.title}
                        </h3>

                        <p
                          itemProp="description"
                          style={{
                            fontFamily: "var(--font-sans), sans-serif",
                            fontSize: "0.78rem",
                            color: "#888580",
                            lineHeight: 1.75,
                            margin: "0 0 20px",
                            flex: 1,
                            fontWeight: 300,
                          }}
                        >
                          {post.excerpt}
                        </p>

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            paddingTop: 16,
                            borderTop: "1px solid #e8e4dd",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 14,
                            }}
                          >
                            <time
                              dateTime={post.date}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 5,
                                fontFamily: "var(--font-sans), sans-serif",
                                fontSize: "0.65rem",
                                color: "#b0b0a8",
                              }}
                            >
                              <Calendar size={10} strokeWidth={1.5} />
                              {new Date(post.date).toLocaleDateString("en-KE", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </time>
                            <span
                              style={{
                                width: 1,
                                height: 10,
                                background: "#e8e4dd",
                              }}
                            />
                            <span
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 5,
                                fontFamily: "var(--font-sans), sans-serif",
                                fontSize: "0.65rem",
                                color: "#b0b0a8",
                              }}
                            >
                              <Clock size={10} strokeWidth={1.5} />
                              {post.readTime}
                            </span>
                          </div>
                          <span className="blog-arrow">
                            <ArrowUpRight size={13} strokeWidth={1.5} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Empty state ── */}
        {posts.length === 0 && (
          <section style={{ padding: "96px 0", textAlign: "center" }}>
            <div className="blog-inner">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  marginBottom: 20,
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: 24,
                    height: 1,
                    background: "#c8c8c4",
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-sans), sans-serif",
                    fontSize: "0.62rem",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "#8fa68e",
                    fontWeight: 500,
                  }}
                >
                  Coming Soon
                </span>
                <span
                  style={{
                    display: "inline-block",
                    width: 24,
                    height: 1,
                    background: "#c8c8c4",
                  }}
                />
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-serif), serif",
                  fontSize: "2.4rem",
                  fontWeight: 400,
                  color: "#1a1a18",
                  letterSpacing: "-0.015em",
                  margin: "0 0 12px",
                }}
              >
                Engineering Articles Coming Soon
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-sans), sans-serif",
                  fontSize: "0.84rem",
                  color: "#888580",
                  lineHeight: 1.8,
                  maxWidth: 360,
                  margin: "0 auto 32px",
                  fontWeight: 300,
                }}
              >
                Our engineers are writing guides on HVAC, solar panels, and
                sustainable systems across Kenya. Check back soon.
              </p>
              <Link
                href="/contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background: "#1a1a18",
                  color: "#ffffff",
                  textDecoration: "none",
                  padding: "12px 10px 12px 24px",
                  borderRadius: 9999,
                  fontFamily: "var(--font-sans), sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Get in touch
                <span
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ArrowUpRight size={13} strokeWidth={2} />
                </span>
              </Link>
            </div>
          </section>
        )}

        {/* ── CTA band ── */}
        <section
          aria-label="Contact Élan Climat for engineering services in Kenya"
          style={{ background: "#1a1a18" }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              maxWidth: 1200,
              margin: "0 auto",
              padding: "0 64px",
            }}
          >
            <div
              style={{
                padding: "72px 0",
                borderRight: "1px solid rgba(255,255,255,0.07)",
                paddingRight: 64,
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span
                  style={{
                    display: "inline-block",
                    width: 24,
                    height: 1,
                    background: "rgba(255,255,255,0.35)",
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-sans), sans-serif",
                    fontSize: "0.62rem",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.45)",
                    fontWeight: 500,
                  }}
                >
                  Stay informed
                </span>
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-serif), serif",
                  fontSize: "clamp(1.8rem, 2.8vw, 2.6rem)",
                  fontWeight: 400,
                  color: "#ffffff",
                  lineHeight: 1.12,
                  letterSpacing: "-0.02em",
                  margin: 0,
                }}
              >
                Need HVAC or Solar
                <br />
                <em
                  style={{
                    fontStyle: "italic",
                    color: "#c9a96e",
                    fontWeight: 300,
                  }}
                >
                  Services in Kenya?
                </em>
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-sans), sans-serif",
                  fontSize: "0.8rem",
                  color: "rgba(255,255,255,0.38)",
                  lineHeight: 1.8,
                  maxWidth: 340,
                  fontWeight: 300,
                }}
              >
                Our engineers are on hand for site assessments, quotations, and
                technical advice across Nairobi, Mombasa, and Kenya. No
                obligation, just a conversation.
              </p>
              <div style={{ marginTop: 8 }}>
                <Link
                  href="/contact"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    background: "#ffffff",
                    color: "#1a1a18",
                    textDecoration: "none",
                    padding: "12px 10px 12px 24px",
                    borderRadius: 9999,
                    fontFamily: "var(--font-sans), sans-serif",
                    fontSize: "0.72rem",
                    fontWeight: 500,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    border: "1.5px solid #ffffff",
                  }}
                >
                  Get in touch
                  <span
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: "#1a1a18",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <ArrowUpRight size={13} color="#ffffff" strokeWidth={2} />
                  </span>
                </Link>
              </div>
            </div>

            <div
              style={{
                padding: "72px 0 72px 64px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-sans), sans-serif",
                    fontSize: "0.58rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.2)",
                    marginBottom: 4,
                  }}
                >
                  Explore
                </span>
                {[
                  {
                    label: "Our Services",
                    href: "/services",
                    desc: "HVAC, solar, elevators & more",
                  },
                  {
                    label: "About Us",
                    href: "/about",
                    desc: "Our story, values, and team",
                  },
                  {
                    label: "Careers",
                    href: "/careers",
                    desc: "Open roles at Élan",
                  },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="explore-link"
                  >
                    <div>
                      <div
                        style={{
                          fontFamily: "var(--font-serif), serif",
                          fontSize: "1.1rem",
                          fontWeight: 400,
                          color: "#ffffff",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {link.label}
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-sans), sans-serif",
                          fontSize: "0.72rem",
                          color: "rgba(255,255,255,0.3)",
                          fontWeight: 300,
                          marginTop: 2,
                        }}
                      >
                        {link.desc}
                      </div>
                    </div>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M2 12L12 2M12 2H5M12 2V9"
                        stroke="rgba(255,255,255,0.25)"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                ))}
              </div>

              <div
                style={{
                  fontFamily: "var(--font-serif), serif",
                  fontSize: "0.88rem",
                  color: "rgba(255,255,255,0.18)",
                  lineHeight: 1.75,
                  maxWidth: 260,
                  marginTop: 32,
                }}
              >
                Élan Climat & Énergie
                <br />
                Nairobi, Kenya · Est. 2018
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
