import Hero from "@/components/home-components/Hero";
import AboutSection from "@/components/home-components/AboutSection";
import Footer from "@/components/Footer";
import BlogSection from "@/components/home-components/BlogSection";
import { getBlogPosts } from "@/lib/db";

export default async function Home() {
  const blogPosts = await getBlogPosts();

  return (
    <div>
      <Hero />
      <AboutSection />
      {blogPosts.length > 0 && <BlogSection post={blogPosts[0]} />}
      <Footer />
    </div>
  );
}
