'use client';
import { useState } from 'react';
import Image from 'next/image';
import { BlogPost, Product } from '@/lib/data';
import { Plus, Trash2, Edit3, X, Save, LogIn, LayoutDashboard, FileText, Package, Eye, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Modal from '@/components/Modal';

const ADMIN_PASSWORD = 'elan2024';

type Tab = 'dashboard' | 'blog' | 'products';

interface BlogForm {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
}

interface ProductForm {
  id: string;
  name: string;
  price: string;
  category: string;
  image: string;
  description: string;
  inStock: boolean;
  badge: string;
}

const emptyBlog = (): BlogForm => ({ id: '', title: '', slug: '', excerpt: '', content: '', category: 'HVAC', image: '', author: 'Élan Editorial', date: new Date().toISOString().split('T')[0], readTime: '5 min' });
const emptyProduct = (): ProductForm => ({ id: '', name: '', price: '', category: 'HVAC', image: '', description: '', inStock: true, badge: '' });

export default function AdminClient({ initialPosts, initialProducts }: { initialPosts: BlogPost[], initialProducts: Product[] }) {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState('');
  const [pwError, setPwError] = useState('');
  const [tab, setTab] = useState<Tab>('dashboard');

  const [posts, setPosts] = useState(initialPosts);
  const [products, setProducts] = useState(initialProducts);

  const [blogForm, setBlogForm] = useState<BlogForm | null>(null);
  const [productForm, setProductForm] = useState<ProductForm | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadingBlog, setUploadingBlog] = useState(false);
  const [uploadingProduct, setUploadingProduct] = useState(false);
  const [msg, setMsg] = useState('');

  const login = () => {
    if (pw === ADMIN_PASSWORD) { setAuthed(true); setPwError(''); }
    else { setPwError('Incorrect password. Try again.'); }
  };

  const toast = (m: string) => { setMsg(m); setTimeout(() => setMsg(''), 3500); };

  // Image upload helper
  const uploadImage = async (file: File, setter: (url: string) => void, setUploading: (v: boolean) => void) => {
    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      setter(data.url);
    } catch { toast('Upload failed'); }
    finally { setUploading(false); }
  };

  // Blog CRUD
  const saveBlog = async () => {
    if (!blogForm) return;
    setSaving(true);
    const post = { ...blogForm, id: blogForm.id || Date.now().toString(), slug: blogForm.slug || blogForm.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') };
    await fetch('/api/blog', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(post) });
    const updated = await fetch('/api/blog').then(r => r.json());
    setPosts(updated);
    setBlogForm(null);
    setSaving(false);
    toast('Blog post saved successfully!');
  };

  const deleteBlog = async (id: string) => {
    if (!confirm('Delete this blog post?')) return;
    await fetch('/api/blog', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    setPosts(p => p.filter(x => x.id !== id));
    toast('Post deleted.');
  };

  // Product CRUD
  const saveProduct = async () => {
    if (!productForm) return;
    setSaving(true);
    const product = { ...productForm, id: productForm.id || Date.now().toString(), price: parseFloat(productForm.price) || 0 };
    await fetch('/api/products', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(product) });
    const updated = await fetch('/api/products').then(r => r.json());
    setProducts(updated);
    setProductForm(null);
    setSaving(false);
    toast('Product saved!');
  };

  const deleteProduct = async (id: string) => {
    if (!confirm('Delete this product?')) return;
    await fetch('/api/products', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    setProducts(p => p.filter(x => x.id !== id));
    toast('Product deleted.');
  };

  const inp: React.CSSProperties = { width: '100%', padding: '10px 12px', border: '1px solid var(--off-white)', fontFamily: 'DM Sans', fontSize: '0.88rem', color: 'var(--charcoal)', outline: 'none', background: 'white' };
  const label: React.CSSProperties = { display: 'block', fontFamily: 'DM Sans', fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 6 };

  if (!authed) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--warm-white)' }} className="mesh-bg">
        <div style={{ background: 'white', padding: '48px 40px', width: '100%', maxWidth: 380, boxShadow: '0 4px 40px rgba(0,0,0,0.08)' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', fontWeight: 600, color: 'var(--charcoal)' }}>Élan Admin</div>
            <div style={{ fontFamily: 'DM Sans', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 4, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Secure Access</div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={label}>Password</label>
            <input type="password" value={pw} onChange={e => setPw(e.target.value)} onKeyDown={e => e.key === 'Enter' && login()} placeholder="Enter admin password" style={inp} />
          </div>
          {pwError && <p style={{ fontFamily: 'DM Sans', fontSize: '0.8rem', color: '#c0392b', marginBottom: 12 }}>{pwError}</p>}
          <button onClick={login} style={{ width: '100%', padding: '12px', background: 'var(--charcoal)', color: 'white', border: 'none', cursor: 'pointer', fontFamily: 'DM Sans', fontSize: '0.88rem', fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <LogIn size={16} /> Sign In
          </button>
          <div style={{ textAlign: 'center', marginTop: 20 }}>
            <Link href="/" style={{ fontFamily: 'DM Sans', fontSize: '0.78rem', color: 'var(--text-muted)', textDecoration: 'none' }}>← Back to Website</Link>
          </div>
        </div>
      </div>
    );
  }

  const sideBtn = (t: Tab, icon: React.ReactNode, label: string) => (
    <button onClick={() => setTab(t)} style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '12px 16px', background: tab === t ? 'var(--sage-pale)' : 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'DM Sans', fontSize: '0.85rem', color: tab === t ? 'var(--sage-dark)' : 'var(--text-muted)', textAlign: 'left', fontWeight: tab === t ? 500 : 400, transition: 'all 0.2s' }}>
      {icon}{label}
    </button>
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--warm-white)' }}>
      {/* Sidebar */}
      <aside style={{ width: 220, background: 'white', borderRight: '1px solid var(--off-white)', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, bottom: 0, zIndex: 50 }}>
        <div style={{ padding: '24px 16px', borderBottom: '1px solid var(--off-white)' }}>
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.15rem', fontWeight: 600, color: 'var(--charcoal)' }}>Élan Admin</div>
          <div style={{ fontFamily: 'DM Sans', fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--sage-dark)', marginTop: 2 }}>Content Manager</div>
        </div>
        <nav style={{ padding: '16px 8px', flex: 1 }}>
          {sideBtn('dashboard', <LayoutDashboard size={16} />, 'Dashboard')}
          {sideBtn('blog', <FileText size={16} />, 'Blog Posts')}
          {sideBtn('products', <Package size={16} />, 'Products')}
        </nav>
        <div style={{ padding: '16px', borderTop: '1px solid var(--off-white)' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'DM Sans', fontSize: '0.78rem', color: 'var(--text-muted)', textDecoration: 'none' }}>
            <ArrowLeft size={14} /> View Site
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main style={{ marginLeft: 220, flex: 1, padding: '32px 40px', minHeight: '100vh' }}>
        {/* Toast */}
        {msg && (
          <div style={{ position: 'fixed', top: 20, right: 20, background: 'var(--sage)', color: 'var(--charcoal)', padding: '12px 20px', fontFamily: 'DM Sans', fontSize: '0.85rem', fontWeight: 500, zIndex: 999, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
            ✓ {msg}
          </div>
        )}

        {/* DASHBOARD */}
        {tab === 'dashboard' && (
          <div>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.2rem', fontWeight: 600, color: 'var(--charcoal)', marginBottom: 8 }}>Dashboard</h1>
            <p style={{ fontFamily: 'DM Sans', fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: 36 }}>Welcome back. Manage your website content below.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 40 }}>
              {[
                { label: 'Blog Posts', value: posts.length, color: 'var(--sage)', icon: <FileText size={22} /> },
                { label: 'Products', value: products.length, color: 'var(--accent)', icon: <Package size={22} /> },
                { label: 'In Stock', value: products.filter(p => p.inStock).length, color: 'var(--sage-dark)', icon: <Eye size={22} /> },
              ].map((s, i) => (
                <div key={i} style={{ background: 'white', padding: '28px 24px', borderLeft: `3px solid ${s.color}` }}>
                  <div style={{ color: s.color, marginBottom: 12 }}>{s.icon}</div>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.2rem', fontWeight: 600, color: 'var(--charcoal)', lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontFamily: 'DM Sans', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <button onClick={() => { setTab('blog'); setBlogForm(emptyBlog()); }} style={{ padding: '20px', background: 'white', border: '2px dashed var(--off-white)', cursor: 'pointer', fontFamily: 'DM Sans', fontSize: '0.9rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center', transition: 'border-color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--sage)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--off-white)')}>
                <Plus size={18} /> New Blog Post
              </button>
              <button onClick={() => { setTab('products'); setProductForm(emptyProduct()); }} style={{ padding: '20px', background: 'white', border: '2px dashed var(--off-white)', cursor: 'pointer', fontFamily: 'DM Sans', fontSize: '0.9rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center', transition: 'border-color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--sage)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--off-white)')}>
                <Plus size={18} /> New Product
              </button>
            </div>
          </div>
        )}

        {/* BLOG */}
        {tab === 'blog' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
              <div>
                <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.2rem', fontWeight: 600, color: 'var(--charcoal)' }}>Blog Posts</h1>
                <p style={{ fontFamily: 'DM Sans', fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: 4 }}>{posts.length} articles published</p>
              </div>
              <button onClick={() => setBlogForm(emptyBlog())} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: 'var(--charcoal)', color: 'white', border: 'none', cursor: 'pointer', fontFamily: 'DM Sans', fontSize: '0.85rem' }}>
                <Plus size={15} /> New Post
              </button>
            </div>

            {/* Blog form modal */}
            {blogForm && (
              <Modal
                open={!!blogForm}
                onClose={() => setBlogForm(null)}
                title={blogForm.id ? 'Edit Blog Post' : 'New Blog Post'}
                maxWidth={800}
              >
                <div style={{ display: 'grid', gap: 18 }}>
                  <div>
                    <label style={label}>Title *</label>
                    <input value={blogForm.title} onChange={e => setBlogForm({ ...blogForm, title: e.target.value })} style={inp} placeholder="How Heat Pumps Work: A Beginner's Guide" />
                  </div>
                  <div>
                    <label style={label}>Excerpt</label>
                    <textarea value={blogForm.excerpt} onChange={e => setBlogForm({ ...blogForm, excerpt: e.target.value })} rows={2} style={{ ...inp, resize: 'vertical' }} placeholder="A brief summary of the article for preview purposes." />
                  </div>
                  <div>
                    <label style={label}>Content (Markdown)</label>
                    <textarea value={blogForm.content} onChange={e => setBlogForm({ ...blogForm, content: e.target.value })} rows={8} style={{ ...inp, resize: 'vertical', fontFamily: 'DM Mono, monospace' }} placeholder="Write the full article content here using Markdown syntax." />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div>
                      <label style={label}>Category</label>
                      <select value={blogForm.category} onChange={e => setBlogForm({ ...blogForm, category: e.target.value })} style={inp}>
                        <option>HVAC</option><option>Solar</option><option>Batteries</option><option>Guides</option><option>News</option>
                      </select>
                    </div>
                    <div>
                      <label style={label}>Author</label>
                      <input value={blogForm.author} onChange={e => setBlogForm({ ...blogForm, author: e.target.value })} style={inp} placeholder="Élan Editorial" />
                    </div>
                  </div>
                  <div>
                    <label style={label}>Cover Image</label>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                      <input type="file" accept="image/*" onChange={e => { const f = e.target.files?.[0]; if (f) uploadImage(f, url => setBlogForm(bf => bf ? { ...bf, image: url } : bf), setUploadingBlog); }} style={{ flex: 1 }} />
                      {uploadingBlog && <span style={{ fontFamily: 'DM Sans', fontSize: '0.78rem', color: 'var(--sage-dark)' }}>Uploading...</span>}
                    </div>
                    <input value={blogForm.image} onChange={e => setBlogForm({ ...blogForm, image: e.target.value })} style={{ ...inp, marginTop: 8 }} placeholder="Or paste image URL" />
                    {blogForm.image && <div style={{ marginTop: 10, height: 120, width: '100%', position: 'relative' }}><Image src={blogForm.image} alt="preview" fill style={{ objectFit: 'cover' }} /></div>}
                  </div>
                  <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', paddingTop: 8 }}>
                    <button onClick={() => setBlogForm(null)} style={{ padding: '10px 20px', background: 'none', border: '1px solid var(--off-white)', cursor: 'pointer', fontFamily: 'DM Sans', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Cancel</button>
                    <button onClick={saveBlog} disabled={saving} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 24px', background: 'var(--charcoal)', color: 'white', border: 'none', cursor: 'pointer', fontFamily: 'DM Sans', fontSize: '0.85rem' }}>
                      <Save size={15} /> {saving ? 'Saving...' : 'Save Post'}
                    </button>
                  </div>
                </div>
              </Modal>
            )}

            {/* Blog list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {posts.map(p => (
                <div key={p.id} style={{ background: 'white', display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px' }}>
                  <img src={p.image} alt={p.title} style={{ width: 60, height: 60, objectFit: 'cover', flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', fontWeight: 600, color: 'var(--charcoal)' }}>{p.title}</div>
                    <div style={{ fontFamily: 'DM Sans', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 3 }}>{p.category} · {p.date} · {p.readTime}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <Link href={`/blog/${p.slug}`} target="_blank" style={{ padding: '7px', background: 'var(--sage-pale)', border: 'none', cursor: 'pointer', color: 'var(--sage-dark)', display: 'flex', alignItems: 'center', textDecoration: 'none' }}><Eye size={14} /></Link>
                    <button onClick={() => setBlogForm({ ...p })} style={{ padding: '7px', background: 'var(--off-white)', border: 'none', cursor: 'pointer', color: 'var(--charcoal)', display: 'flex', alignItems: 'center' }}><Edit3 size={14} /></button>
                    <button onClick={() => deleteBlog(p.id)} style={{ padding: '7px', background: '#fef2f2', border: 'none', cursor: 'pointer', color: '#c0392b', display: 'flex', alignItems: 'center' }}><Trash2 size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PRODUCTS */}
        {tab === 'products' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
              <div>
                <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.2rem', fontWeight: 600, color: 'var(--charcoal)' }}>Products</h1>
                <p style={{ fontFamily: 'DM Sans', fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: 4 }}>{products.length} products in catalogue</p>
              </div>
              <button onClick={() => setProductForm(emptyProduct())} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: 'var(--charcoal)', color: 'white', border: 'none', cursor: 'pointer', fontFamily: 'DM Sans', fontSize: '0.85rem' }}>
                <Plus size={15} /> New Product
              </button>
            </div>

            {/* Product form modal */}
            {productForm && (
              <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 200, overflow: 'auto', padding: '40px 20px' }}>
                <div style={{ background: 'white', maxWidth: 640, margin: '0 auto', padding: '40px', boxShadow: '0 20px 80px rgba(0,0,0,0.2)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                    <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.7rem', color: 'var(--charcoal)' }}>{productForm.id ? 'Edit' : 'New'} Product</h2>
                    <button onClick={() => setProductForm(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
                  </div>
                  <div style={{ display: 'grid', gap: 18 }}>
                    <div>
                      <label style={label}>Product Name *</label>
                      <input value={productForm.name} onChange={e => setProductForm({ ...productForm, name: e.target.value })} style={inp} placeholder="EcoBreeze 3.5kW Heat Pump" />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                      <div>
                        <label style={label}>Price ($) *</label>
                        <input type="number" value={productForm.price} onChange={e => setProductForm({ ...productForm, price: e.target.value })} style={inp} placeholder="1299" />
                      </div>
                      <div>
                        <label style={label}>Category</label>
                        <select value={productForm.category} onChange={e => setProductForm({ ...productForm, category: e.target.value })} style={inp}>
                          <option>HVAC</option><option>Solar</option><option>Batteries</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label style={label}>Description</label>
                      <textarea value={productForm.description} onChange={e => setProductForm({ ...productForm, description: e.target.value })} rows={3} style={{ ...inp, resize: 'vertical' }} />
                    </div>
                    <div>
                      <label style={label}>Product Image *</label>
                      <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                        <input type="file" accept="image/*" onChange={e => { const f = e.target.files?.[0]; if (f) uploadImage(f, url => setProductForm(pf => pf ? { ...pf, image: url } : pf), setUploadingProduct); }} style={{ flex: 1 }} />
                        {uploadingProduct && <span style={{ fontFamily: 'DM Sans', fontSize: '0.78rem', color: 'var(--sage-dark)' }}>Uploading...</span>}
                      </div>
                      <input value={productForm.image} onChange={e => setProductForm({ ...productForm, image: e.target.value })} style={{ ...inp, marginTop: 8 }} placeholder="Or paste image URL" />
                      {productForm.image && <div style={{ marginTop: 10, height: 100, width: '100%', position: 'relative' }}><Image src={productForm.image} alt="preview" fill style={{ objectFit: 'cover' }} /></div>}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                      <div>
                        <label style={label}>Badge (optional)</label>
                        <input value={productForm.badge} onChange={e => setProductForm({ ...productForm, badge: e.target.value })} style={inp} placeholder="New, Best Seller..." />
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 24 }}>
                        <input type="checkbox" id="inStock" checked={productForm.inStock} onChange={e => setProductForm({ ...productForm, inStock: e.target.checked })} />
                        <label htmlFor="inStock" style={{ fontFamily: 'DM Sans', fontSize: '0.85rem', color: 'var(--charcoal)', cursor: 'pointer' }}>In Stock</label>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', paddingTop: 8 }}>
                      <button onClick={() => setProductForm(null)} style={{ padding: '10px 20px', background: 'none', border: '1px solid var(--off-white)', cursor: 'pointer', fontFamily: 'DM Sans', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Cancel</button>
                      <button onClick={saveProduct} disabled={saving} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 24px', background: 'var(--charcoal)', color: 'white', border: 'none', cursor: 'pointer', fontFamily: 'DM Sans', fontSize: '0.85rem' }}>
                        <Save size={15} /> {saving ? 'Saving...' : 'Save Product'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Products grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
              {products.map(p => (
                <div key={p.id} style={{ background: 'white', overflow: 'hidden' }}>
                  <div style={{ aspectRatio: '1/1', overflow: 'hidden', background: 'var(--off-white)' }}>
                    {p.image ? <div style={{ width: '100%', height: '100%', position: 'relative' }}><Image src={p.image} alt={p.name} fill style={{ objectFit: 'cover' }} /></div> : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}><Package size={32} /></div>}
                  </div>
                  <div style={{ padding: '14px 14px' }}>
                    <div style={{ fontFamily: 'DM Sans', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--sage-dark)', marginBottom: 4 }}>{p.category}</div>
                    <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem', fontWeight: 600, color: 'var(--charcoal)', marginBottom: 4 }}>{p.name}</div>
                    <div style={{ fontFamily: 'DM Sans', fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: 10 }}>${p.price.toLocaleString()}</div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={() => setProductForm({ ...p, price: String(p.price) })} style={{ flex: 1, padding: '7px', background: 'var(--off-white)', border: 'none', cursor: 'pointer', color: 'var(--charcoal)', fontFamily: 'DM Sans', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}><Edit3 size={13} /> Edit</button>
                      <button onClick={() => deleteProduct(p.id)} style={{ padding: '7px 10px', background: '#fef2f2', border: 'none', cursor: 'pointer', color: '#c0392b', display: 'flex', alignItems: 'center' }}><Trash2 size={13} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
