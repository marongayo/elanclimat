import { getBlogPosts, getBlogPost } from '@/lib/data';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();
  const related = getBlogPosts().filter(p => p.id !== post.id).slice(0, 2);

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 80, background: 'var(--warm-white)', minHeight: '100vh' }}>
        {/* Hero */}
        <div style={{ position: 'relative', height: 420, overflow: 'hidden' }}>
          <Image src={post.image} alt={post.title} fill style={{ objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(30,35,32,0.3), rgba(30,35,32,0.75))' }} />
          <div style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 760, padding: '0 32px' }}>
            <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'DM Sans', fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', marginBottom: 16 }}>
              <ArrowLeft size={14} /> Back to Blog
            </Link>
            <span style={{ display: 'inline-block', fontFamily: 'DM Sans', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--sage-light)', background: 'rgba(143,175,159,0.25)', padding: '4px 12px', marginBottom: 14 }}>{post.category}</span>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 600, color: 'white', lineHeight: 1.2 }}>{post.title}</h1>
          </div>
        </div>

        {/* Meta + content */}
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '48px 32px 80px' }}>
          <div style={{ display: 'flex', gap: 24, marginBottom: 40, paddingBottom: 24, borderBottom: '1px solid var(--off-white)', flexWrap: 'wrap' }}>
            {[
              { icon: <Calendar size={14} />, text: post.date },
              { icon: <Clock size={14} />, text: `${post.readTime} read` },
              { icon: <Tag size={14} />, text: post.author },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'DM Sans', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                <span style={{ color: 'var(--sage-dark)' }}>{item.icon}</span>{item.text}
              </div>
            ))}
          </div>

          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.25rem', fontStyle: 'italic', lineHeight: 1.7, color: 'var(--charcoal)', marginBottom: 36 }}>{post.excerpt}</p>

          <div className="prose-custom" dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div style={{ background: 'white', padding: '64px 32px' }}>
            <div style={{ maxWidth: 1280, margin: '0 auto' }}>
              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', color: 'var(--charcoal)', marginBottom: 32 }}>More Articles</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
                {related.map(p => (
                  <Link key={p.id} href={`/blog/${p.slug}`} style={{ textDecoration: 'none' }} className="blog-card">
                    <div style={{ overflow: 'hidden', aspectRatio: '16/9', marginBottom: 16, position: 'relative' }}>
                      <Image src={p.image} alt={p.title} fill style={{ objectFit: 'cover' }} />
                    </div>
                    <span style={{ fontFamily: 'DM Sans', fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--sage-dark)', background: 'var(--sage-pale)', padding: '3px 10px', marginBottom: 10, display: 'inline-block' }}>{p.category}</span>
                    <h4 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.25rem', fontWeight: 600, color: 'var(--charcoal)', lineHeight: 1.3 }}>{p.title}</h4>
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
