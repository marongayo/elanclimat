// blog/page.tsx

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
      <main className="bg-[#FAF8F5] min-h-screen" style={{ paddingTop: 80 }}>
        {/* ── HEADER ── */}
        <div className="bg-[#141d14] px-8 md:px-20 pt-20 pb-24">
          <div className="max-w-7xl mx-auto">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-[#a1ad9c]" />
              <span className="text-[#a1ad9c] text-xs font-semibold tracking-[0.22em] uppercase">
                Insights
              </span>
            </div>

            <h1
              className="text-white font-extrabold tracking-tight leading-[1.06] mb-5"
              style={{ fontSize: "clamp(2.6rem, 5vw, 4rem)" }}
            >
              The Élan Blog
            </h1>

            <p className="text-white/50 text-base max-w-md leading-relaxed">
              Expert insights on HVAC, solar energy, battery storage, and
              sustainable living from our team of engineers.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-8 md:px-20 py-16">
          {/* ── FEATURED POST ── */}
          {featured && (
            <Link
              href={`/blog/${featured.slug}`}
              className="group block bg-white rounded-3xl overflow-hidden shadow-sm mb-12 grid grid-cols-1 md:grid-cols-2 transition-shadow duration-300 hover:shadow-md"
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
              </div>

              {/* Text */}
              <div className="flex flex-col justify-center p-10 md:p-14">
                {/* Category pill */}
                <span className="inline-block self-start bg-[#242d24] text-[#a1ad9c] text-xs font-semibold tracking-widest px-4 py-1.5 rounded-full uppercase mb-6">
                  {featured.category}
                </span>

                <h2
                  className="font-extrabold text-[#111111] tracking-tight leading-[1.1] mb-4"
                  style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.4rem)" }}
                >
                  {featured.title}
                </h2>

                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  {featured.excerpt}
                </p>

                <div className="flex items-center gap-5 mb-8">
                  <span className="flex items-center gap-1.5 text-gray-400 text-xs">
                    <Calendar size={12} />
                    {featured.date}
                  </span>
                  <span className="flex items-center gap-1.5 text-gray-400 text-xs">
                    <Clock size={12} />
                    {featured.readTime} read
                  </span>
                </div>

                {/* CTA button — matches main site style */}
                <div>
                  <span className="inline-flex items-center gap-3 bg-[#1a1a1a] group-hover:bg-transparent border-2 border-transparent group-hover:border-black text-white group-hover:text-black font-bold pl-6 pr-2 py-2 rounded-full text-xs tracking-wider uppercase transition-all duration-300">
                    Read Article
                    <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center group-hover:bg-black group-hover:text-white group-hover:rotate-45 transition-all duration-300">
                      <ArrowUpRight
                        className="w-4 h-4 text-black group-hover:text-white"
                        strokeWidth={3}
                      />
                    </span>
                  </span>
                </div>
              </div>
            </Link>
          )}

          {/* ── GRID ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {rest.map((post) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Body */}
                <div className="flex flex-col flex-1 p-7">
                  {/* Meta row */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-[#242d24] text-[#a1ad9c] text-[0.6rem] font-semibold tracking-widest px-3 py-1 rounded-full uppercase">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-gray-400 text-xs">
                      <Clock size={11} />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-[#111111] text-lg leading-[1.2] tracking-tight mb-3">
                    {post.title}
                  </h3>

                  <p className="text-gray-500 text-sm leading-relaxed mb-5 flex-1">
                    {post.excerpt}
                  </p>

                  {/* Footer row */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="flex items-center gap-1.5 text-gray-400 text-xs">
                      <Calendar size={11} />
                      {post.date}
                    </span>
                    <span className="w-8 h-8 rounded-full bg-[#1a1a1a] flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                      <ArrowUpRight
                        className="w-3.5 h-3.5 text-white"
                        strokeWidth={3}
                      />
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
