"use client";

import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/types/blog";

export default function BlogSection({ post }: { post: BlogPost }) {
  return (
    <div className="w-full px-3 sm:px-5 md:px-8 py-4">
      <div
        className="grid grid-cols-1 md:grid-cols-[1fr_580px] rounded-3xl overflow-hidden shadow-xl"
        style={{ backgroundColor: "#2B2B2B" }}
      >
        {/* Left Content Side */}
        <div className="flex flex-col justify-between p-8 sm:p-12 md:p-16">
          {/* Top Tag */}
          <div className="flex items-center justify-between">
            <span
              className="inline-block text-xs font-semibold tracking-widest px-4 py-1.5 uppercase rounded-full"
              style={{
                backgroundColor: "rgba(237,232,223,0.1)",
                color: "#EDE8DF",
                border: "1px solid rgba(237,232,223,0.18)",
              }}
            >
              {post.category}
            </span>
            <span
              className="text-xs font-medium tracking-wide"
              style={{ color: "rgba(237,232,223,0.45)" }}
            >
              {post.readTime}
            </span>
          </div>

          {/* Main Heading */}
          <div className="my-8 flex flex-col gap-4">
            <span
              className="text-xs uppercase tracking-[0.25em] font-semibold"
              style={{ color: "#C8391A" }}
            >
              {new Date(post.date).toLocaleDateString("en-KE", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>

            <h2
              className="text-3xl sm:text-4xl md:text-4xl font-extrabold leading-[1.1] tracking-tight"
              style={{ color: "#EDE8DF" }}
            >
              {post.title}
            </h2>

            <p
              className="text-sm sm:text-base leading-relaxed font-normal line-clamp-3"
              style={{ color: "rgba(237,232,223,0.6)" }}
            >
              {post.excerpt}
            </p>
          </div>

          {/* CTAs */}
          <div className="flex items-center gap-6">
            <Link
              href={`/blog/${post.slug}`}
              className="inline-block font-bold uppercase tracking-wider underline underline-offset-4 text-sm transition-colors duration-200"
              style={{ color: "#C8391A" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = "#EDE8DF")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = "#C8391A")
              }
            >
              Read more
            </Link>

            <span style={{ color: "rgba(237,232,223,0.2)" }}>|</span>

            <Link
              href="/blog"
              className="inline-block text-sm font-medium tracking-wide transition-colors duration-200"
              style={{ color: "rgba(237,232,223,0.45)" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = "#EDE8DF")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  "rgba(237,232,223,0.45)")
              }
            >
              View more blogs →
            </Link>
          </div>
        </div>

        {/* Right Image Side — fixed width, inset with padding so it floats */}
        <div className="hidden md:flex items-center justify-center p-6">
          <div className="relative w-full h-full rounded-2xl overflow-hidden min-h-64">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover object-center"
              loading="lazy"
              sizes="340px"
              quality={80}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
