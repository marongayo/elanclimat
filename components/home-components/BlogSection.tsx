// components/home-components/BlogSection.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { BlogPost } from "@/lib/types/blog";

export default function BlogSection({ posts }: { posts: BlogPost[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!posts || posts.length === 0) return null;

  const post = posts[activeIndex];

  return (
    <section
      style={{
        backgroundColor: "#ffffff",
        padding: "70px 0",
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
          padding: 0;
          text-align: left;
          display: flex;
          flex-direction: column;
          gap: 4px;
          transition: opacity 0.2s;
        }

        .blog-post-tab:hover { opacity: 1 !important; }

        .blog-read-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #1a1a18;
          text-decoration: none;
          background: white;
          padding: 10px 10px 10px 20px;
          border-radius: 9999px;
          transition: background 0.2s, color 0.2s;
          border: 1.5px solid #1a1a18;
          align-self: flex-start;
        }

        .blog-read-link:hover {
          background: #1a1a18;
          color: white;
        }

        .blog-read-link:hover .blog-link-icon {
          background: white;
          color: #1a1a18;
          transform: rotate(45deg);
        }

        .blog-link-icon {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: #1a1a18;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s, color 0.2s, transform 0.3s;
          flex-shrink: 0;
        }
      `}</style>

      <div className="blog-section-inner">
        {/* Section eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 28,
          }}
        >
          <div
            style={{
              width: 24,
              height: 1,
              background: "rgba(26,26,24,0.15)",
            }}
          />
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.62rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(26,26,24,0.55)",
              fontWeight: 500,
            }}
          >
            Latest Insights
          </span>
        </div>

        <div
          className="blog-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 520px",
            gap: 64,
            alignItems: "start",
          }}
        >
          {/* LEFT */}
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {/* Tabs */}
            {posts.length > 1 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  borderTop: "1px solid rgba(26,26,24,0.1)",
                  marginBottom: 28,
                }}
              >
                {posts.map((p, i) => (
                  <button
                    key={p.slug}
                    className="blog-post-tab"
                    onClick={() => setActiveIndex(i)}
                    style={{
                      borderBottom: "1px solid rgba(26,26,24,0.1)",
                      padding: "18px 0",
                      opacity: activeIndex === i ? 1 : 0.5,
                    }}
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

            {/* Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                {/* Meta */}
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
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
                    {new Date(post.date).toLocaleDateString("en-KE", {
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
                    {post.readTime}
                  </span>
                </div>

                {/* Title (single post mode only) */}
                {posts.length === 1 && (
                  <h2
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
                    {post.title}
                  </h2>
                )}

                {/* Excerpt */}
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.88rem",
                    color: "#1a1a18",
                    lineHeight: 1.8,
                    margin: 0,
                    fontWeight: 300,
                  }}
                >
                  {post.excerpt}
                </p>

                {/* CTA */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 24,
                    marginTop: 8,
                  }}
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.72rem",
                      fontWeight: 500,
                      color: "#1a1a18",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      textDecoration: "none",
                      borderBottom: "1px solid rgba(26,26,24,0.2)",
                      paddingBottom: 2,
                      transition: "color 0.2s, border-color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        "rgba(26,26,24,0.7)";
                      (e.currentTarget as HTMLAnchorElement).style.borderColor =
                        "rgba(26,26,24,0.4)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        "#1a1a18";
                      (e.currentTarget as HTMLAnchorElement).style.borderColor =
                        "rgba(26,26,24,0.2)";
                    }}
                  >
                    Read Article
                  </Link>

                  <Link
                    href="/blog"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.72rem",
                      fontWeight: 500,
                      color: "rgba(26,26,24,0.6)",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      textDecoration: "none",
                      borderBottom: "1px solid rgba(26,26,24,0.2)",
                      paddingBottom: 2,
                      transition: "color 0.2s, border-color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        "#1a1a18";
                      (e.currentTarget as HTMLAnchorElement).style.borderColor =
                        "rgba(26,26,24,0.4)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        "rgba(26,26,24,0.6)";
                      (e.currentTarget as HTMLAnchorElement).style.borderColor =
                        "rgba(26,26,24,0.2)";
                    }}
                  >
                    All Articles
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT */}
          <div className="blog-image-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={post.slug + "-img"}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: "relative",
                  aspectRatio: "16 / 12",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover object-center"
                  loading="lazy"
                  sizes="520px"
                  quality={80}
                />
              </motion.div>
            </AnimatePresence>

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
