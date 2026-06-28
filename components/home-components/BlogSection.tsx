// components/home-components/BlogSection.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { BlogPost } from "@/lib/types/blog";
import styles from "./BlogSection.module.css";

export default function BlogSection({ posts }: { posts: BlogPost[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  if (!posts || posts.length === 0) return null;

  // ── Track which card is most in view, and whether arrows should be enabled ──
  const updateScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    setCanScrollPrev(track.scrollLeft > 8);
    setCanScrollNext(
      track.scrollLeft < track.scrollWidth - track.clientWidth - 8,
    );

    const cards = Array.from(track.children) as HTMLElement[];
    const trackCenter = track.scrollLeft + track.clientWidth / 2;
    let closestIndex = 0;
    let closestDistance = Infinity;
    cards.forEach((card, i) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(cardCenter - trackCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = i;
      }
    });
    setActiveIndex(closestIndex);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    updateScrollState();
    track.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      track.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[0] as HTMLElement | undefined;
    const cardWidth = card ? card.offsetWidth + 24 : track.clientWidth * 0.8;
    track.scrollBy({ left: direction * cardWidth, behavior: "smooth" });
  };

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    const card = track?.children[index] as HTMLElement | undefined;
    if (!track || !card) return;
    track.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
  };

  return (
    <section
      aria-label="Latest engineering insights and articles from Élan Climat Kenya"
      className={styles.section}
    >
      <div className={styles.inner}>
        {/* ── Section header ── */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowLine} />
              <span className={styles.eyebrowText}>Latest Insights</span>
            </div>

            <h2 className={styles.heading}>
              HVAC, Solar &amp; Energy
              <br />
              <span className={styles.headingThin}>Insights from Kenya</span>
            </h2>
          </div>

          <div className={styles.headerRight}>
            {posts.length > 1 && (
              <div className={styles.arrowGroup}>
                <button
                  type="button"
                  className={styles.arrowBtn}
                  onClick={() => scrollByCard(-1)}
                  disabled={!canScrollPrev}
                  aria-label="Previous articles"
                >
                  <ChevronLeft size={16} strokeWidth={1.8} />
                </button>
                <button
                  type="button"
                  className={styles.arrowBtn}
                  onClick={() => scrollByCard(1)}
                  disabled={!canScrollNext}
                  aria-label="Next articles"
                >
                  <ChevronRight size={16} strokeWidth={1.8} />
                </button>
              </div>
            )}
            <Link href="/blog" className={styles.allLink}>
              All Articles
            </Link>
          </div>
        </div>

        {/* ── Carousel track — every post stays in the DOM for SEO ── */}
        <div
          ref={trackRef}
          className={styles.track}
          role="list"
          aria-label="Latest blog articles"
        >
          {posts.map((p, i) => (
            <article
              key={p.slug}
              role="listitem"
              className={styles.card}
              data-active={activeIndex === i}
            >
              <Link
                href={`/blog/${p.slug}`}
                className={styles.cardImageLink}
                aria-label={p.title}
                tabIndex={-1}
              >
                <div className={styles.cardImageWrapper}>
                  <Image
                    src={p.image}
                    alt={`${p.title} — Élan Climat Kenya`}
                    fill
                    className={styles.cardImage}
                    loading={i < 3 ? "eager" : "lazy"}
                    sizes="(max-width: 768px) 85vw, (max-width: 1024px) 45vw, 360px"
                    quality={80}
                  />
                  <span className={styles.cardCategoryBadge}>{p.category}</span>
                </div>
              </Link>

              <div className={styles.cardBody}>
                <div className={styles.cardMeta}>
                  <time className={styles.cardDate} dateTime={p.date}>
                    {new Date(p.date).toLocaleDateString("en-KE", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <span className={styles.metaDivider} />
                  <span className={styles.cardReadTime}>{p.readTime}</span>
                </div>

                <h3 className={styles.cardTitle}>
                  <Link
                    href={`/blog/${p.slug}`}
                    className={styles.cardTitleLink}
                  >
                    {p.title}
                  </Link>
                </h3>

                <p className={styles.cardExcerpt}>{p.excerpt}</p>

                <Link href={`/blog/${p.slug}`} className={styles.readLink}>
                  Read Article
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* ── Dot indicators ── */}
        {posts.length > 1 && (
          <div
            className={styles.dots}
            role="tablist"
            aria-label="Article navigation"
          >
            {posts.map((p, i) => (
              <button
                key={p.slug}
                role="tab"
                type="button"
                className={styles.dot}
                data-active={activeIndex === i}
                aria-selected={activeIndex === i}
                aria-label={`Go to ${p.title}`}
                onClick={() => scrollToIndex(i)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
