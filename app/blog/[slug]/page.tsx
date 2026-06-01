// app/blog/[slug]/page.tsx

import { getBlogPosts, getBlogPost } from "@/lib/db";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, Calendar, Clock, Tag } from "lucide-react";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();
  const related = await getBlogPosts();
  const filteredRelated = related.filter((p) => p._id !== post._id).slice(0, 2);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400;1,500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

        /* ── Back link ── */
        .blog-post-back {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.72rem;
          letter-spacing: 0.06em;
          color: rgba(249,247,244,0.5);
          text-decoration: none;
          margin-bottom: 20px;
          transition: color 0.2s ease;
        }
        .blog-post-back:hover { color: rgba(249,247,244,0.9); }

        /* ── Meta icons ── */
        .blog-meta-item {
          display: flex;
          align-items: center;
          gap: 7px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem;
          color: #888580;
        }

        /* ── Excerpt blockquote ── */
        .blog-excerpt {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.15rem, 2vw, 1.35rem);
          font-style: italic;
          font-weight: 400;
          line-height: 1.75;
          color: #4a4a48;
          margin-bottom: 44px;
          padding-left: 22px;
          border-left: 2px solid #8fa68e;
        }

        /* ── Prose ── */
        .blog-content {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.92rem;
          color: #3a3a38;
          line-height: 1.9;
        }
        .blog-content h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.4rem, 2.5vw, 1.9rem);
          font-weight: 500;
          color: #1a1a18;
          letter-spacing: -0.01em;
          line-height: 1.2;
          margin: 48px 0 18px;
        }
        .blog-content h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.1rem, 2vw, 1.45rem);
          font-weight: 500;
          color: #1a1a18;
          margin: 36px 0 14px;
        }
        .blog-content p {
          margin: 0 0 24px;
        }
        .blog-content ul, .blog-content ol {
          padding-left: 20px;
          margin: 0 0 24px;
        }
        .blog-content li {
          margin-bottom: 8px;
        }
        .blog-content strong {
          color: #1a1a18;
          font-weight: 600;
        }
        .blog-content a {
          color: #5a7a59;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .blog-content a:hover { color: #1a1a18; }
        .blog-content blockquote {
          border-left: 2px solid #8fa68e;
          padding-left: 20px;
          margin: 32px 0;
          color: #6b6b68;
          font-style: italic;
        }
        .blog-content img {
          width: 100%;
          height: auto;
          margin: 32px 0;
        }
        .blog-content hr {
          border: none;
          border-top: 1px solid #ede9e2;
          margin: 40px 0;
        }

        /* ── Related card ── */
        .related-card {
          text-decoration: none;
          display: block;
        }
        .related-card-img {
          position: relative;
          aspect-ratio: 16 / 10;
          overflow: hidden;
          margin-bottom: 18px;
        }
        .related-card-img img {
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .related-card:hover .related-card-img img { transform: scale(1.04); }

        .related-card-arrow {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 1px solid rgba(26,26,24,0.18);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1a1a18;
          flex-shrink: 0;
          transition: all 0.25s ease;
        }
        .related-card:hover .related-card-arrow {
          background: #1a1a18;
          color: #f9f7f4;
          border-color: #1a1a18;
          transform: rotate(45deg);
        }

        @media (max-width: 768px) {
          .blog-post-hero-text { padding: 0 24px !important; }
          .blog-post-body { padding: 40px 24px 64px !important; }
          .blog-related-inner { padding: 52px 24px !important; }
          .blog-related-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <main
        style={{
          paddingTop: 80,
          backgroundColor: "#f9f7f4",
          minHeight: "100vh",
        }}
      >
        {/* ── Hero ── */}
        <div style={{ position: "relative", height: 460, overflow: "hidden" }}>
          <Image
            src={post.image}
            alt={post.title}
            fill
            style={{ objectFit: "cover" }}
            priority
          />
          {/* Gradient overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(26,26,24,0.2) 0%, rgba(26,26,24,0.82) 100%)",
            }}
          />

          {/* Hero text */}
          <div
            className="blog-post-hero-text"
            style={{
              position: "absolute",
              bottom: 44,
              left: "50%",
              transform: "translateX(-50%)",
              width: "100%",
              maxWidth: 800,
              padding: "0 64px",
            }}
          >
            <Link href="/blog" className="blog-post-back">
              <ArrowLeft size={13} strokeWidth={1.5} />
              Back to Blog
            </Link>

            <div style={{ marginBottom: 16 }}>
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.58rem",
                  fontWeight: 500,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "#8fa68e",
                  border: "1px solid rgba(143,166,142,0.4)",
                  padding: "4px 10px",
                  background: "rgba(143,166,142,0.08)",
                }}
              >
                {post.category}
              </span>
            </div>

            <h1
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 400,
                color: "#f9f7f4",
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
                margin: 0,
              }}
            >
              {post.title}
            </h1>
          </div>
        </div>

        {/* ── Meta + content ── */}
        <div
          className="blog-post-body"
          style={{ maxWidth: 800, margin: "0 auto", padding: "52px 64px 88px" }}
        >
          {/* Meta row */}
          <div
            style={{
              display: "flex",
              gap: 28,
              marginBottom: 44,
              paddingBottom: 28,
              borderBottom: "1px solid #ede9e2",
              flexWrap: "wrap",
            }}
          >
            {[
              {
                icon: <Calendar size={12} strokeWidth={1.5} />,
                text: post.date,
              },
              {
                icon: <Clock size={12} strokeWidth={1.5} />,
                text: `${post.readTime} read`,
              },
              { icon: <Tag size={12} strokeWidth={1.5} />, text: post.author },
            ].map((item, i) => (
              <div key={i} className="blog-meta-item">
                <span style={{ color: "#8fa68e" }}>{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>

          {/* Excerpt */}
          <p className="blog-excerpt">{post.excerpt}</p>

          {/* Content */}
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        {/* ── Related posts ── */}
        {filteredRelated.length > 0 && (
          <div
            style={{ borderTop: "1px solid #ede9e2", background: "#ffffff" }}
          >
            <div
              className="blog-related-inner"
              style={{ maxWidth: 1100, margin: "0 auto", padding: "64px 64px" }}
            >
              {/* Section label */}
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
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.6rem",
                    fontWeight: 500,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "#b0b0a8",
                  }}
                >
                  Keep Reading
                </span>
                <div style={{ flex: 1, height: 1, background: "#ede9e2" }} />
              </div>

              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                  fontWeight: 400,
                  color: "#1a1a18",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.15,
                  marginBottom: 36,
                }}
              >
                More Articles
              </h3>

              <div
                className="blog-related-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: 12,
                  marginBottom: 100,
                }}
              >
                {filteredRelated.map((p) => (
                  <Link
                    key={p._id}
                    href={`/blog/${p.slug}`}
                    className="related-card"
                  >
                    <div
                      className="related-card-img"
                      style={{ border: "1px solid #ede9e2" }}
                    >
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        gap: 16,
                      }}
                    >
                      <div>
                        <span
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "0.58rem",
                            fontWeight: 500,
                            letterSpacing: "0.16em",
                            textTransform: "uppercase",
                            color: "#8fa68e",
                            border: "1px solid rgba(143,166,142,0.35)",
                            padding: "3px 9px",
                            background: "rgba(143,166,142,0.06)",
                            display: "inline-block",
                            marginBottom: 12,
                          }}
                        >
                          {p.category}
                        </span>

                        <h4
                          style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "1.2rem",
                            fontWeight: 500,
                            color: "#1a1a18",
                            lineHeight: 1.25,
                            letterSpacing: "-0.005em",
                            margin: 0,
                          }}
                        >
                          {p.title}
                        </h4>
                      </div>

                      <span
                        className="related-card-arrow"
                        style={{ marginTop: 4 }}
                      >
                        <ArrowUpRight size={12} strokeWidth={1.5} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
