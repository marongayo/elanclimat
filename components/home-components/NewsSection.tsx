"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface NewsSectionProps {
  posts: any[];
}

export default function NewsSection({ posts }: NewsSectionProps) {
  return (
    <section id="news" style={{ padding: "100px 0" }} className="mesh-bg">
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: 56,
            flexWrap: "wrap",
            gap: 20,
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 16,
              }}
            >
              <div
                style={{ width: 36, height: 1, background: "var(--sage)" }}
              />
              <span
                style={{
                  fontFamily: "DM Sans",
                  fontSize: "0.72rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--sage-dark)",
                }}
              >
                Sector Insights
              </span>
            </div>
            <h2
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                fontWeight: 600,
                color: "var(--charcoal)",
                lineHeight: 1.2,
              }}
            >
              From {""}
              <em style={{ fontStyle: "italic", color: "var(--sage-dark)" }}>
                the Élan Blog, {""}
              </em>
              about the industry
            </h2>
          </div>
          <Link
            href="/blog"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "DM Sans",
              fontSize: "0.85rem",
              color: "var(--charcoal)",
              textDecoration: "none",
              borderBottom: "1px solid var(--charcoal)",
              paddingBottom: 2,
            }}
          >
            All articles <ArrowRight size={14} />
          </Link>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 28,
          }}
        >
          {posts.map((post) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug}`}
              style={{ textDecoration: "none", display: "block" }}
              className="blog-card"
            >
              <div
                style={{
                  overflow: "hidden",
                  marginBottom: 20,
                  aspectRatio: "16/9",
                  position: "relative",
                }}
              >
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  marginBottom: 12,
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "DM Sans",
                    fontSize: "0.68rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--sage-dark)",
                    background: "var(--sage-pale)",
                    padding: "3px 10px",
                  }}
                >
                  {post.category}
                </span>
                <span
                  style={{
                    fontFamily: "DM Sans",
                    fontSize: "0.72rem",
                    color: "var(--text-muted)",
                  }}
                >
                  {post.readTime} read
                </span>
              </div>
              <h3
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "1.35rem",
                  fontWeight: 600,
                  color: "var(--charcoal)",
                  lineHeight: 1.3,
                  marginBottom: 10,
                }}
              >
                {post.title}
              </h3>
              <p
                style={{
                  fontFamily: "DM Sans",
                  fontSize: "0.83rem",
                  lineHeight: 1.7,
                  color: "var(--text-muted)",
                }}
              >
                {post.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
