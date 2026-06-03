import Hero from "@/components/home-components/Hero";
import AboutSection from "@/components/home-components/AboutSection";
import Footer from "@/components/Footer";
import BlogSection from "@/components/home-components/BlogSection";
import { getBlogPosts } from "@/lib/db";
import BackToTop from "@/components/BackToTop";

import Navbar from "@/components/Navbar";

export default async function Home() {
  const blogPosts = await getBlogPosts();

  return (
    <div>
      <Navbar />
      <Hero />
      <AboutSection />
      {blogPosts.length > 0 && <BlogSection posts={blogPosts} />}
      <Footer />
      <BackToTop />
    </div>
  );
}
