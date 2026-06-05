// components/home-components/BlogSection.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import type { BlogPost } from "@/lib/types/blog";

export default function BlogSection({ posts }: { posts: BlogPost[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!posts || posts.length === 0) return null;

  return (
    <section
      aria-label="Latest engineering insights and articles from Élan Climat Kenya"
      style={{
        backgroundColor: "#f9f7f4",
        padding: "96px 0",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <style>{`
        .blog-section-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 64px;
        }
        @media (max-width: 768px) {
          .blog-section-inner { padding: 0 28px; }
          .blog-grid { grid-template-columns: 1fr !important; }
          .blog-image-col { display: none !important; }
        }
        .blog-post-tab {
          background: none;
          border: none;
          cursor: pointer;
          padding: 18px 0;
          text-align: left;
          display: flex;
          flex-direction: column;
          gap: 4px;
          transition: opacity 0.2s;
          border-bottom: 1px solid rgba(26,26,24,0.1);
          width: 100%;
        }
        .blog-post-tab:hover { opacity: 1 !important; }
        .blog-read-link {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #1a1a18;
          text-decoration: none;
          borderBottomWidth: 1px;
          borderBottomStyle: solid;
          borderBottomColor: rgba(26,26,24,0.2);
          padding-bottom: 2px;
          transition: color 0.2s, border-color 0.2s;
        }
        .blog-read-link:hover {
          color: rgba(26,26,24,0.6);
          border-color: rgba(26,26,24,0.4);
        }
        .blog-all-link {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(26,26,24,0.5);
          text-decoration: none;
          border-bottom: 1px solid rgba(26,26,24,0.15);
          padding-bottom: 2px;
          transition: color 0.2s, border-color 0.2s;
        }
        .blog-all-link:hover {
          color: #1a1a18;
          border-color: rgba(26,26,24,0.4);
        }
      `}</style>

      <div className="blog-section-inner">
        {/* ── Section header ── */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 24,
            flexWrap: "wrap",
            marginBottom: 48,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {/* Eyebrow */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
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
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.62rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#8fa68e",
                  fontWeight: 500,
                }}
              >
                Latest Insights
              </span>
            </div>

            {/* h2 — keyword rich */}
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                fontWeight: 400,
                color: "#1a1a18",
                lineHeight: 1.1,
                letterSpacing: "-0.015em",
                margin: 0,
              }}
            >
              HVAC, Solar & Energy
              <br />
              <span style={{ fontWeight: 300 }}>Insights from Kenya</span>
            </h2>
          </div>

          <Link href="/blog" className="blog-all-link">
            All Articles
          </Link>
        </div>

        {/* ── Main grid ── */}
        <div
          className="blog-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 520px",
            gap: 64,
            alignItems: "start",
          }}
        >
          {/* LEFT — post list + active content */}
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {/* Post tabs — always rendered, Google indexes all titles */}
            {posts.length > 1 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  borderTop: "1px solid rgba(26,26,24,0.1)",
                  marginBottom: 32,
                }}
              >
                {posts.map((p, i) => (
                  <button
                    key={p.slug}
                    className="blog-post-tab"
                    onClick={() => setActiveIndex(i)}
                    aria-pressed={activeIndex === i}
                    style={{ opacity: activeIndex === i ? 1 : 0.5 }}
                  >
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.6rem",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color:
                          activeIndex === i ? "#8fa68e" : "rgba(26,26,24,0.6)",
                        fontWeight: 500,
                      }}
                    >
                      {p.category}
                    </span>
                    {/* Post title always in DOM — Google indexes all of them */}
                    <span
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "1.15rem",
                        fontWeight: activeIndex === i ? 500 : 400,
                        color:
                          activeIndex === i ? "#1a1a18" : "rgba(26,26,24,0.65)",
                        lineHeight: 1.3,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {p.title}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/*
              SEO FIX: All post excerpts rendered in DOM, inactive ones
              visually hidden but fully readable by Google.
            */}
            <div style={{ position: "relative" }}>
              {posts.map((p, i) => (
                <div
                  key={p.slug}
                  aria-hidden={activeIndex !== i}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                    position: activeIndex !== i ? "absolute" : "relative",
                    top: 0,
                    left: 0,
                    width: "100%",
                    opacity: activeIndex === i ? 1 : 0,
                    pointerEvents: activeIndex === i ? "auto" : "none",
                    visibility: activeIndex !== i ? "hidden" : "visible",
                    transition: "opacity 0.35s ease",
                  }}
                >
                  {/* Meta */}
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 16 }}
                  >
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.65rem",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "#8fa68e",
                        fontWeight: 500,
                      }}
                    >
                      {new Date(p.date).toLocaleDateString("en-KE", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    <span
                      style={{
                        width: 1,
                        height: 12,
                        background: "rgba(26,26,24,0.15)",
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.65rem",
                        color: "rgba(26,26,24,0.5)",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {p.readTime}
                    </span>
                  </div>

                  {/* Title for single-post mode */}
                  {posts.length === 1 && (
                    <h3
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                        fontWeight: 400,
                        color: "#1a1a18",
                        lineHeight: 1.15,
                        letterSpacing: "-0.015em",
                        margin: 0,
                      }}
                    >
                      {p.title}
                    </h3>
                  )}

                  {/* Excerpt — SEO body copy, all in DOM */}
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.88rem",
                      color: "#6b6b68",
                      lineHeight: 1.8,
                      margin: 0,
                      fontWeight: 300,
                    }}
                  >
                    {p.excerpt}
                  </p>

                  {/* CTAs */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 24,
                      marginTop: 8,
                    }}
                  >
                    <Link href={`/blog/${p.slug}`} className="blog-read-link">
                      Read Article
                    </Link>
                    <Link href="/blog" className="blog-all-link">
                      All Articles
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — image, animates on tab switch */}
          <div className="blog-image-col">
            <motion.div
              key={posts[activeIndex]?.slug + "-img"}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: "relative",
                aspectRatio: "16 / 12",
                overflow: "hidden",
              }}
            >
              <Image
                src={posts[activeIndex]?.image}
                alt={`${posts[activeIndex]?.title} — Élan Climat Kenya`}
                fill
                className="object-cover object-center"
                loading="lazy"
                sizes="520px"
                quality={80}
              />
            </motion.div>

            {posts.length > 1 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: 16,
                }}
              >
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.62rem",
                    color: "rgba(26,26,24,0.5)",
                    letterSpacing: "0.12em",
                  }}
                >
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(posts.length).padStart(2, "0")}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
