// app/blog/page.tsx

import { getBlogPosts } from "@/lib/db";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

        .blog-card {
          background: #ffffff;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: box-shadow 0.3s ease;
          border: 1px solid #ede9e2;
        }
        .blog-card:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.07); }

        .blog-card-img img {
          transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .blog-card:hover .blog-card-img img { transform: scale(1.04); }

        .blog-arrow-btn {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 1px solid rgba(26,26,24,0.18);
          background: none;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1a1a18;
          flex-shrink: 0;
          transition: all 0.25s ease;
        }
        .blog-card:hover .blog-arrow-btn {
          background: #1a1a18;
          color: #f9f7f4;
          border-color: #1a1a18;
          transform: rotate(45deg);
        }

        .blog-category-pill {
          display: inline-block;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.58rem;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #8fa68e;
          border: 1px solid rgba(143,166,142,0.35);
          padding: 4px 10px;
          background: rgba(143,166,142,0.06);
        }

        .featured-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 9px 9px 9px 22px;
          border-radius: 9999px;
          border: 1px solid rgba(26,26,24,0.18);
          background: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #1a1a18;
          text-decoration: none;
          transition: all 0.25s ease;
        }
        .featured-cta:hover {
          border-color: #1a1a18;
          background: #1a1a18;
          color: #f9f7f4;
        }
        .featured-cta-icon {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #1a1a18;
          color: #f9f7f4;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.25s ease, background 0.25s ease, color 0.25s ease;
          flex-shrink: 0;
        }
        .featured-cta:hover .featured-cta-icon {
          background: #8fa68e;
          color: #1a1a18;
          transform: rotate(45deg);
        }

        .featured-card {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border: 1px solid #ede9e2;
          overflow: hidden;
          transition: box-shadow 0.3s ease;
        }
        .featured-card:hover { box-shadow: 0 12px 48px rgba(0,0,0,0.08); }
        .featured-card img {
          transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .featured-card:hover img { transform: scale(1.03); }

        @media (max-width: 768px) {
          .featured-card { grid-template-columns: 1fr !important; }
          .blog-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .blog-header-inner { padding: 56px 28px 56px !important; }
          .blog-content-inner { padding: 48px 28px !important; }
        }

        @media (max-width: 480px) {
          .blog-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <main
        style={{ background: "#f9f7f4", minHeight: "100vh", paddingTop: 80 }}
      >
        {/* ── HEADER ── */}
        <div style={{ background: "#1a1a18", width: "100%" }}>
          <div
            className="blog-header-inner"
            style={{
              maxWidth: 1100,
              margin: "0 auto",
              padding: "72px 64px 64px",
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
              <div style={{ width: 24, height: 1, background: "#8fa68e" }} />
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.62rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#8fa68e",
                }}
              >
                Insights
              </span>
            </div>

            <h1
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2.4rem, 5vw, 3.6rem)",
                fontWeight: 400,
                color: "#f9f7f4",
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
                marginBottom: 16,
              }}
            >
              The Élan Blog
            </h1>

            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.82rem",
                color: "rgba(249,247,244,0.45)",
                lineHeight: 1.8,
                maxWidth: 360,
                margin: 0,
              }}
            >
              Expert insights on HVAC, solar energy, battery storage, and
              sustainable living from our team of engineers.
            </p>
          </div>
        </div>

        <div
          className="blog-content-inner"
          style={{ maxWidth: 1100, margin: "0 auto", padding: "64px 64px" }}
        >
          {/* ── FEATURED POST ── */}
          {featured && (
            <Link
              href={`/blog/${featured.slug}`}
              className="featured-card"
              style={{
                display: "grid",
                marginBottom: 48,
                textDecoration: "none",
              }}
            >
              {/* Image */}
              <div
                className="blog-card-img"
                style={{
                  position: "relative",
                  aspectRatio: "1 / 1",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                />
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
                <span
                  className="blog-category-pill"
                  style={{ alignSelf: "flex-start", marginBottom: 24 }}
                >
                  {featured.category}
                </span>

                <h2
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)",
                    fontWeight: 500,
                    color: "#1a1a18",
                    lineHeight: 1.15,
                    letterSpacing: "-0.01em",
                    marginBottom: 16,
                  }}
                >
                  {featured.title}
                </h2>

                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.82rem",
                    color: "#888580",
                    lineHeight: 1.8,
                    marginBottom: 24,
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
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.72rem",
                      color: "#b0b0a8",
                    }}
                  >
                    <Calendar size={11} />
                    {featured.date}
                  </span>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.72rem",
                      color: "#b0b0a8",
                    }}
                  >
                    <Clock size={11} />
                    {featured.readTime} read
                  </span>
                </div>

                <div>
                  <span className="featured-cta">
                    Read Article
                    <span className="featured-cta-icon">
                      <ArrowUpRight size={13} />
                    </span>
                  </span>
                </div>
              </div>
            </Link>
          )}

          {/* ── SECTION LABEL ── */}
          {rest.length > 0 && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                marginBottom: 32,
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
                All Articles
              </span>
              <div style={{ flex: 1, height: 1, background: "#ede9e2" }} />
            </div>
          )}

          {/* ── GRID ── */}
          <div
            className="blog-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 12,
            }}
          >
            {rest.map((post) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug}`}
                className="blog-card"
                style={{ textDecoration: "none" }}
              >
                {/* Thumbnail */}
                <div
                  className="blog-card-img"
                  style={{
                    position: "relative",
                    aspectRatio: "16 / 10",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
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
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 16,
                    }}
                  >
                    <span className="blog-category-pill">{post.category}</span>
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.68rem",
                        color: "#b0b0a8",
                      }}
                    >
                      <Clock size={10} />
                      {post.readTime}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1.15rem",
                      fontWeight: 500,
                      color: "#1a1a18",
                      lineHeight: 1.25,
                      letterSpacing: "-0.005em",
                      marginBottom: 10,
                    }}
                  >
                    {post.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.78rem",
                      color: "#888580",
                      lineHeight: 1.75,
                      marginBottom: 20,
                      flex: 1,
                    }}
                  >
                    {post.excerpt}
                  </p>

                  {/* Footer row */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingTop: 16,
                      borderTop: "1px solid #ede9e2",
                    }}
                  >
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.68rem",
                        color: "#b0b0a8",
                      }}
                    >
                      <Calendar size={10} />
                      {post.date}
                    </span>
                    <span className="blog-arrow-btn">
                      <ArrowUpRight size={13} strokeWidth={1.5} />
                    </span>
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
