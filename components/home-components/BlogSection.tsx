// components/home-components/BlogSection.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import type { BlogPost } from "@/lib/types/blog";
import styles from "./BlogSection.module.css";

export default function BlogSection({ posts }: { posts: BlogPost[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!posts || posts.length === 0) return null;

  return (
    <section
      aria-label="Latest engineering insights and articles from Élan Climat Kenya"
      className={styles.section}
    >
      <div className={styles.inner}>
        {/* ── Section header ── */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            {/* Eyebrow */}
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowLine} />
              <span className={styles.eyebrowText}>Latest Insights</span>
            </div>

            {/* h2 */}
            <h2 className={styles.heading}>
              HVAC, Solar & Energy
              <br />
              <span className={styles.headingThin}>Insights from Kenya</span>
            </h2>
          </div>

          <Link href="/blog" className={styles.allLink}>
            All Articles
          </Link>
        </div>

        {/* ── Main grid ── */}
        <div className={styles.grid}>
          {/* LEFT — post list + active content */}
          <div className={styles.left}>
            {/* Post tabs — always rendered, Google indexes all titles */}
            {posts.length > 1 && (
              <div className={styles.postList}>
                {posts.map((p, i) => (
                  <button
                    key={p.slug}
                    className={styles.postTab}
                    onClick={() => setActiveIndex(i)}
                    aria-pressed={activeIndex === i}
                    data-active={activeIndex === i}
                  >
                    <span className={styles.postTabCategory}>{p.category}</span>
                    <span className={styles.postTabTitle}>{p.title}</span>
                  </button>
                ))}
              </div>
            )}

            {/* All post excerpts in DOM — active one shown, rest hidden */}
            <div className={styles.excerptContainer}>
              {posts.map((p, i) => (
                <div
                  key={p.slug}
                  aria-hidden={activeIndex !== i}
                  data-active={activeIndex === i}
                  className={styles.excerptPanel}
                >
                  {/* Meta */}
                  <div className={styles.meta}>
                    <span className={styles.metaDate}>
                      {new Date(p.date).toLocaleDateString("en-KE", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    <span className={styles.metaDivider} />
                    <span className={styles.metaReadTime}>{p.readTime}</span>
                  </div>

                  {/* Title for single-post mode */}
                  {posts.length === 1 && (
                    <h3 className={styles.singleTitle}>{p.title}</h3>
                  )}

                  {/* Excerpt */}
                  <p className={styles.excerpt}>{p.excerpt}</p>

                  {/* CTAs */}
                  <div className={styles.ctas}>
                    <Link href={`/blog/${p.slug}`} className={styles.readLink}>
                      Read Article
                    </Link>
                    <Link href="/blog" className={styles.allLink}>
                      All Articles
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — image, animates on tab switch */}
          <div className={styles.imageCol}>
            <motion.div
              key={posts[activeIndex]?.slug + "-img"}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className={styles.imageWrapper}
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
              <div className={styles.imageCounter}>
                <span className={styles.imageCounterText}>
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
