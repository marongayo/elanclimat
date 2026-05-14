// blog/page.tsx

import { getBlogPosts } from "@/lib/db";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Clock } from "lucide-react";
// import { getBlogPosts } from '@/lib/data';
export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <>
      <Navbar />
      <main
        style={{
          paddingTop: 80,
          minHeight: "100vh",
          background: "var(--warm-white)",
        }}
      >
        {/* Header */}
        <div
          style={{ background: "var(--charcoal)", padding: "64px 32px 80px" }}
        >
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 20,
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
                  color: "var(--sage)",
                }}
              >
                Insights
              </span>
            </div>
            <h1
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                fontWeight: 600,
                color: "white",
                lineHeight: 1.1,
              }}
            >
              The Élan Blog
            </h1>
            <p
              style={{
                fontFamily: "DM Sans",
                fontSize: "1rem",
                color: "rgba(255,255,255,0.5)",
                marginTop: 16,
                maxWidth: 480,
              }}
            >
              Expert insights on HVAC, solar energy, battery storage, and
              sustainable living from our team of engineers.
            </p>
          </div>
        </div>

        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "64px 32px" }}>
          {/* Featured post */}
          {featured && (
            <Link
              href={`/blog/${featured.slug}`}
              style={{
                textDecoration: "none",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 0,
                background: "white",
                marginBottom: 48,
                overflow: "hidden",
              }}
              className="blog-card"
            >
              <div
                style={{
                  overflow: "hidden",
                  aspectRatio: "1/1",
                  position: "relative",
                }}
              >
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div
                style={{
                  padding: "48px 48px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "DM Sans",
                    fontSize: "0.68rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--sage-dark)",
                    background: "var(--sage-pale)",
                    padding: "4px 12px",
                    display: "inline-block",
                    marginBottom: 20,
                    width: "fit-content",
                  }}
                >
                  {featured.category}
                </span>
                <h2
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: "2.2rem",
                    fontWeight: 600,
                    color: "var(--charcoal)",
                    lineHeight: 1.2,
                    marginBottom: 16,
                  }}
                >
                  {featured.title}
                </h2>
                <p
                  style={{
                    fontFamily: "DM Sans",
                    fontSize: "0.9rem",
                    lineHeight: 1.75,
                    color: "var(--text-muted)",
                    marginBottom: 28,
                  }}
                >
                  {featured.excerpt}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 20,
                    marginBottom: 24,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      fontFamily: "DM Sans",
                      fontSize: "0.78rem",
                      color: "var(--text-muted)",
                    }}
                  >
                    <Calendar size={13} />
                    {featured.date}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      fontFamily: "DM Sans",
                      fontSize: "0.78rem",
                      color: "var(--text-muted)",
                    }}
                  >
                    <Clock size={13} />
                    {featured.readTime} read
                  </div>
                </div>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    fontFamily: "DM Sans",
                    fontSize: "0.85rem",
                    color: "var(--charcoal)",
                    fontWeight: 500,
                  }}
                >
                  Read article <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          )}

          {/* Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: 28,
            }}
          >
            {rest.map((post) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug}`}
                style={{
                  textDecoration: "none",
                  background: "white",
                  display: "block",
                  overflow: "hidden",
                }}
                className="blog-card"
              >
                <div
                  style={{
                    overflow: "hidden",
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
                <div style={{ padding: "28px 28px" }}>
                  <div
                    style={{
                      display: "flex",
                      gap: 10,
                      marginBottom: 12,
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "DM Sans",
                        fontSize: "0.65rem",
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
                      fontSize: "1.4rem",
                      fontWeight: 600,
                      color: "var(--charcoal)",
                      lineHeight: 1.25,
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
                      marginBottom: 20,
                    }}
                  >
                    {post.excerpt}
                  </p>
                  <div
                    style={{
                      fontFamily: "DM Sans",
                      fontSize: "0.75rem",
                      color: "var(--text-muted)",
                    }}
                  >
                    {post.date}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
