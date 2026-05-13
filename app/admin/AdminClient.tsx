"use client";
import { useState, useEffect, useRef } from "react";
import { BlogPost, Product } from "@/lib/data";
import { LogIn, SquareCheckBig, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

import AdminSidebar from "@/components/admin-components/AdminSidebar";
import AdminMessagesPanel from "@/components/admin-components/AdminMessagesPanel";
import AdminContentTabs from "@/components/admin-components/AdminContentTabs";

// ── Auth constants ────────────────────────────────────────────────────────────
const ADMIN_PASSWORD = "elan2024";
const ADMIN_EMAIL = "admin@elanclimat.co.ke";
const SUPER_ADMIN_PASSWORD = "elanSuper2024";
const SUPER_ADMIN_EMAIL = "superadmin@elanclimat.co.ke";

type Tab = "dashboard" | "blog" | "products";
type Role = "admin" | "superadmin";

const SESSION_KEY = "elan_admin_session";
const SESSION_TIMEOUT_MS = 2 * 60 * 60 * 1000; // 2 hours

// ── Shared style constants ────────────────────────────────────────────────────
const INPUT_STYLE: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  border: "1px solid var(--off-white)",
  fontFamily: "DM Sans",
  fontSize: "0.88rem",
  color: "var(--charcoal)",
  outline: "none",
  background: "white",
  boxSizing: "border-box",
};

const LABEL_STYLE: React.CSSProperties = {
  display: "block",
  fontFamily: "DM Sans",
  fontSize: "0.7rem",
  fontWeight: 500,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "var(--text-muted)",
  marginBottom: 6,
};

// ── Types ─────────────────────────────────────────────────────────────────────
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
  images: string[];
  description: string;
  inStock: boolean;
  badge: string;
}

interface ProductErrors {
  name?: string;
  price?: string;
  category?: string;
  description?: string;
  images?: string;
}

interface Message {
  id: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message?: string;
  createdAt: string;
  read: boolean;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
const emptyBlog = (): BlogForm => ({
  id: "",
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "HVAC",
  image: "",
  author: "Élan Editorial",
  date: new Date().toISOString().split("T")[0],
  readTime: "5 min",
});

const emptyProduct = (): ProductForm => ({
  id: "",
  name: "",
  price: "",
  category: "HVAC",
  images: [],
  description: "",
  inStock: true,
  badge: "",
});

const validateProduct = (pf: ProductForm): ProductErrors => {
  const errs: ProductErrors = {};
  if (!pf.name.trim()) errs.name = "Product name is required.";
  if (!pf.price || isNaN(parseFloat(pf.price)) || parseFloat(pf.price) <= 0)
    errs.price = "A valid price is required.";
  if (!pf.category) errs.category = "Category is required.";
  if (!pf.description.trim()) errs.description = "Description is required.";
  if (pf.images.length < 2)
    errs.images = `At least 2 images are required. You have ${pf.images.length}.`;
  return errs;
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function AdminClient({
  initialPosts,
  initialProducts,
}: {
  initialPosts: BlogPost[];
  initialProducts: Product[];
}) {
  // ── Session ──────────────────────────────────────────────────────────────
  const [role, setRole] = useState<Role | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (!raw) return null;
      const { role: r, expiresAt } = JSON.parse(raw) as { role: Role; expiresAt: number };
      if (Date.now() > expiresAt) { sessionStorage.removeItem(SESSION_KEY); return null; }
      return r;
    } catch { return null; }
  });

  const persistSession = (r: Role) => {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ role: r, expiresAt: Date.now() + SESSION_TIMEOUT_MS }));
  };

  const clearSession = () => { sessionStorage.removeItem(SESSION_KEY); setRole(null); };

  const lastActivityRef = useRef(Date.now());
  useEffect(() => {
    if (!role) return;
    const bump = () => { lastActivityRef.current = Date.now(); if (role) persistSession(role); };
    window.addEventListener("mousemove", bump);
    window.addEventListener("keydown", bump);
    window.addEventListener("click", bump);
    const idleCheck = setInterval(() => { if (Date.now() - lastActivityRef.current > SESSION_TIMEOUT_MS) clearSession(); }, 60_000);
    return () => {
      window.removeEventListener("mousemove", bump);
      window.removeEventListener("keydown", bump);
      window.removeEventListener("click", bump);
      clearInterval(idleCheck);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role]);

  const [sessionWarning, setSessionWarning] = useState(false);
  useEffect(() => {
    if (!role) { setSessionWarning(false); return; }
    const warnCheck = setInterval(() => {
      if (typeof window === "undefined") return;
      try {
        const raw = sessionStorage.getItem(SESSION_KEY);
        if (!raw) return;
        const { expiresAt } = JSON.parse(raw) as { expiresAt: number };
        const remaining = expiresAt - Date.now();
        setSessionWarning(remaining > 0 && remaining < 10 * 60 * 1000);
      } catch { /* ignore */ }
    }, 30_000);
    return () => clearInterval(warnCheck);
  }, [role]);

  // ── Login form state ──────────────────────────────────────────────────────
  const [pw, setPw] = useState("");
  const [email, setEmail] = useState("");
  const [pwError, setPwError] = useState("");

  // ── App state ─────────────────────────────────────────────────────────────
  const [tab, setTab] = useState<Tab>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [posts, setPosts] = useState(initialPosts);
  const [products, setProducts] = useState(initialProducts);
  const [blogForm, setBlogForm] = useState<BlogForm | null>(null);
  const [productForm, setProductForm] = useState<ProductForm | null>(null);
  const [productErrors, setProductErrors] = useState<ProductErrors>({});
  const [saving, setSaving] = useState(false);
  const [uploadingBlog, setUploadingBlog] = useState(false);
  const [uploadingProduct, setUploadingProduct] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [msg, setMsg] = useState("");
  const [open, setOpen] = useState(false); // FAB speed dial

  // ── Messages state ────────────────────────────────────────────────────────
  const [messages, setMessages] = useState<Message[]>([]);
  const [unread, setUnread] = useState(0);
  const [archivedMessages, setArchivedMessages] = useState<Message[]>([]);
  const [showingArchive, setShowingArchive] = useState(false);
  const [archiveLoaded, setArchiveLoaded] = useState(false);
  const [loadingArchive, setLoadingArchive] = useState(false);
  const [msgPanelOpen, setMsgPanelOpen] = useState(false);
  const [ellipsisOpen, setEllipsisOpen] = useState(false);

  // ── Message loading ───────────────────────────────────────────────────────
  const loadMessages = async () => {
    try {
      const res = await fetch("/api/messages");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const arr = Array.isArray(data) ? data : [];
      setMessages(arr);
      setUnread(arr.filter((m: Message) => !m.read).length);
    } catch (err) {
      console.error("load messages error:", err);
    }
  };

  useEffect(() => {
    loadMessages();
    const interval = setInterval(loadMessages, 30000);
    return () => clearInterval(interval);
  }, []);

  // ── Auth handlers ─────────────────────────────────────────────────────────
  const login = () => {
    if (email === SUPER_ADMIN_EMAIL && pw === SUPER_ADMIN_PASSWORD) {
      setRole("superadmin"); persistSession("superadmin"); setPwError("");
    } else if (email === ADMIN_EMAIL && pw === ADMIN_PASSWORD) {
      setRole("admin"); persistSession("admin"); setPwError("");
    } else {
      setPwError("Incorrect email or password. Try again.");
    }
  };

  const logout = () => { if (!confirm("Sign out of the admin panel?")) return; clearSession(); };

  // ── Toast ─────────────────────────────────────────────────────────────────
  const toast = (m: string) => {
    setMsg(m);
    setToastVisible(true);
    setTimeout(() => { setToastVisible(false); setTimeout(() => setMsg(""), 400); }, 3100);
  };

  // ── Blog handlers ─────────────────────────────────────────────────────────
  const saveBlog = async () => {
    if (!blogForm) return;
    setSaving(true);
    const post = {
      ...blogForm,
      id: blogForm.id || Date.now().toString(),
      slug: blogForm.slug || blogForm.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
    };
    await fetch("/api/blog", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(post) });
    const updated = await fetch("/api/blog").then((r) => r.json());
    setPosts(Array.isArray(updated) ? updated : []);
    setBlogForm(null);
    setSaving(false);
    toast("Blog post saved successfully!");
  };

  const deleteBlog = async (id: string) => {
    if (!confirm("Delete this blog post?")) return;
    await fetch("/api/blog", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    setPosts((p) => p.filter((x) => x.id !== id));
    toast("Post deleted.");
  };

  // ── Product handlers ──────────────────────────────────────────────────────
  const saveProduct = async () => {
    if (!productForm) return;
    const errs = validateProduct(productForm);
    if (Object.keys(errs).length > 0) {
      setProductErrors(errs);
      setTimeout(() => { document.querySelector("[data-product-error]")?.scrollIntoView({ behavior: "smooth", block: "center" }); }, 50);
      return;
    }
    setProductErrors({});
    setSaving(true);
    const product = { ...productForm, id: productForm.id || Date.now().toString(), price: parseFloat(productForm.price) || 0 };
    await fetch("/api/products", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(product) });
    const updated = await fetch("/api/products").then((r) => r.json());
    setProducts(Array.isArray(updated) ? updated : []);
    setProductForm(null);
    setProductErrors({});
    setSaving(false);
    toast("Product saved!");
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    await fetch("/api/products", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    setProducts((p) => p.filter((x) => x.id !== id));
    toast("Product deleted.");
  };

  const clearError = (field: keyof ProductErrors) => {
    if (productErrors[field]) setProductErrors((e) => ({ ...e, [field]: undefined }));
  };

  // ── Message handlers ──────────────────────────────────────────────────────
  const markRead = async (id: string) => {
    const m = messages.find((m) => m.id === id);
    if (!m) return;
    await fetch("/api/messages", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...m, read: true }) });
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read: true } : m)));
    setUnread((n) => Math.max(0, n - 1));
  };

  const deleteMessage = async (id: string, fromArchive = false) => {
    if (!confirm("Delete this message?")) return;
    const wasUnread = messages.find((m) => m.id === id)?.read === false;
    await fetch("/api/messages", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    if (fromArchive) {
      setArchivedMessages((prev) => prev.filter((m) => m.id !== id));
    } else {
      setMessages((prev) => prev.filter((m) => m.id !== id));
      if (wasUnread) setUnread((n) => Math.max(0, n - 1));
    }
    toast("Message deleted.");
  };

  const toggleArchive = async () => {
    if (showingArchive) { setShowingArchive(false); return; }
    setShowingArchive(true);
    if (!archiveLoaded) {
      setLoadingArchive(true);
      try {
        const res = await fetch("/api/messages?archived=true");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setArchivedMessages(Array.isArray(data) ? data : []);
        setArchiveLoaded(true);
      } catch (err) {
        console.error("Failed to load archived messages:", err);
      } finally {
        setLoadingArchive(false);
      }
    }
  };

  const navTo = (t: Tab) => { setTab(t); setSidebarOpen(false); };

  const openBell = () => { setMsgPanelOpen(true); setEllipsisOpen(false); loadMessages(); };

  // ── Login screen ──────────────────────────────────────────────────────────
  if (!role) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--warm-white)", padding: "20px" }} className="mesh-bg">
        <div style={{ background: "white", padding: "40px 28px", width: "100%", maxWidth: 380, boxShadow: "0 4px 40px rgba(0,0,0,0.08)" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.5rem", fontWeight: 600, color: "var(--charcoal)" }}>
              Élan Admin
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 6 }}>
              <div style={{ fontFamily: "DM Sans", fontSize: "0.72rem", color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                Secure Access
              </div>
              {email === SUPER_ADMIN_EMAIL && (
                <span style={{ fontFamily: "DM Sans", fontSize: "0.6rem", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600, padding: "2px 8px", borderRadius: 9999, background: "var(--charcoal)", color: "white", lineHeight: 1.8 }}>
                  Super Admin
                </span>
              )}
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={LABEL_STYLE}>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={(e) => e.key === "Enter" && login()} placeholder="Enter admin email" style={INPUT_STYLE} />
            <label style={{ ...LABEL_STYLE, marginTop: 12 }}>Password</label>
            <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} onKeyDown={(e) => e.key === "Enter" && login()} placeholder="Enter admin password" style={INPUT_STYLE} />
          </div>
          {pwError && <p style={{ fontFamily: "DM Sans", fontSize: "0.8rem", color: "#c0392b", marginBottom: 12 }}>{pwError}</p>}
          <button onClick={login} style={{ width: "100%", padding: "12px", background: "var(--charcoal)", color: "white", border: "none", cursor: "pointer", fontFamily: "DM Sans", fontSize: "0.88rem", fontWeight: 500, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <LogIn size={16} /> Sign In
          </button>
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <Link href="/" style={{ fontFamily: "DM Sans", fontSize: "0.78rem", color: "var(--text-muted)", textDecoration: "none" }}>
              ← Back to Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── Authenticated shell ───────────────────────────────────────────────────
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--warm-white)" }}>
      <style>{`
        @media (min-width: 768px) {
          .admin-sidebar-desktop { display: flex !important; }
          .admin-topbar { display: none !important; }
          .admin-main { margin-left: 240px !important; }
        }
        @media (max-width: 767px) {
          .admin-sidebar-desktop { display: none !important; }
          .admin-topbar { display: flex !important; }
          .admin-main { margin-left: 0 !important; padding: 20px 16px 100px !important; padding-top: 70px !important; }
          .msg-panel { bottom: 80px !important; left: 12px !important; right: 12px !important; width: auto !important; height: min(55vh, 420px) !important; }
        }
        @keyframes fadeIn { from { opacity:0; transform:scale(0.9); } to { opacity:1; transform:scale(1); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        .sd-action { display:flex; align-items:center; justify-content:center; gap:6px; background:var(--charcoal); border:none; cursor:pointer; color:white; font-family:"DM Sans",sans-serif; font-size:0.82rem; white-space:nowrap; transition:opacity 0.15s ease; animation:fadeIn 0.2s ease both; flex:1; height:100%; }
        .sd-action:hover { opacity:0.8; }
        .sd-close { background:none; border:none; cursor:pointer; color:rgba(255,255,255,0.6); display:flex; align-items:center; justify-content:center; padding:0 14px; height:100%; flex-shrink:0; transition:color 0.15s ease; }
        .sd-close:hover { color:white; }
        .msg-item:hover { background: #f9fafb !important; }
      `}</style>

      {/* Session expiry warning */}
      {sessionWarning && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 9999, background: "#7c4a1e", color: "white", fontFamily: "DM Sans", fontSize: "0.8rem", padding: "10px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <span>⚠️ Your session expires in less than 10 minutes due to inactivity.</span>
          <button
            onClick={() => { persistSession(role!); setSessionWarning(false); }}
            style={{ background: "white", color: "#7c4a1e", border: "none", borderRadius: 4, padding: "4px 12px", fontFamily: "DM Sans", fontSize: "0.75rem", fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}
          >
            Stay signed in
          </button>
        </div>
      )}

      {/* Sidebar (desktop + mobile) */}
      <AdminSidebar
        tab={tab}
        unread={unread}
        navTo={navTo}
        onBell={openBell}
        role={role!}
        onLogout={logout}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Messages panel */}
      <AdminMessagesPanel
        msgPanelOpen={msgPanelOpen}
        setMsgPanelOpen={setMsgPanelOpen}
        messages={messages}
        archivedMessages={archivedMessages}
        showingArchive={showingArchive}
        loadingArchive={loadingArchive}
        ellipsisOpen={ellipsisOpen}
        setEllipsisOpen={setEllipsisOpen}
        markRead={markRead}
        deleteMessage={deleteMessage}
        toggleArchive={toggleArchive}
      />

      {/* Content tabs */}
      <AdminContentTabs
        tab={tab}
        posts={posts}
        products={products}
        blogForm={blogForm}
        setBlogForm={setBlogForm}
        productForm={productForm}
        setProductForm={setProductForm}
        productErrors={productErrors}
        setProductErrors={setProductErrors}
        saving={saving}
        uploadingBlog={uploadingBlog}
        setUploadingBlog={setUploadingBlog}
        uploadingProduct={uploadingProduct}
        setUploadingProduct={setUploadingProduct}
        saveBlog={saveBlog}
        deleteBlog={deleteBlog}
        saveProduct={saveProduct}
        deleteProduct={deleteProduct}
        clearError={clearError}
        toast={toast}
      />

      {/* FAB Speed Dial + Toast */}
      <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 999 }}>
        <motion.div
          animate={{ width: open ? "auto" : toastVisible ? "auto" : 52 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          style={{
            height: 52,
            borderRadius: 9999,
            background: toastVisible && !open ? "var(--sage)" : "var(--charcoal)",
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
            boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {!open && !toastVisible && (
              <motion.button
                key="fab"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.18 }}
                onClick={() => setOpen(true)}
                style={{ width: 52, minWidth: 52, height: 52, border: "none", background: "transparent", color: "white", cursor: "pointer", display: "grid", placeItems: "center", flexShrink: 0, padding: 0 }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </motion.button>
            )}

            {!open && toastVisible && (
              <motion.div
                key="toast"
                initial={{ width: 52, opacity: 0 }}
                animate={{ width: "auto", opacity: 1 }}
                exit={{ width: 52, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                style={{ height: 52, padding: "0 20px", display: "flex", alignItems: "center", gap: 10, color: "var(--charcoal)", fontFamily: "DM Sans", fontWeight: 500, whiteSpace: "nowrap" }}
              >
                <SquareCheckBig size={16} />
                <span style={{ fontSize: "0.85rem" }}>{msg}</span>
              </motion.div>
            )}

            {open && (
              <motion.div
                key="menu"
                initial={{ width: 52, opacity: 0 }}
                animate={{ width: "auto", opacity: 1 }}
                exit={{ width: 52, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                style={{ height: 52, display: "flex", alignItems: "center", padding: "0 8px 0 20px", whiteSpace: "nowrap", gap: 4 }}
              >
                <button
                  className="sd-action"
                  onClick={() => { setTab("blog"); setBlogForm(emptyBlog()); setOpen(false); }}
                  style={{ height: 36, border: "none", background: "transparent", color: "white", cursor: "pointer", fontFamily: "DM Sans", fontWeight: 500, padding: "0 8px" }}
                >
                  New Blog
                </button>
                <div style={{ margin: "0 8px", height: 20, width: 1, background: "rgba(255,255,255,0.18)", flexShrink: 0 }} />
                <button
                  className="sd-action"
                  onClick={() => { setTab("products"); setProductForm(emptyProduct()); setProductErrors({}); setOpen(false); }}
                  style={{ height: 36, border: "none", background: "transparent", color: "white", cursor: "pointer", fontFamily: "DM Sans", fontWeight: 500, padding: "0 8px" }}
                >
                  New Product
                </button>
                <button
                  className="sd-close"
                  onClick={() => setOpen(false)}
                  style={{ width: 36, minWidth: 36, height: 36, marginLeft: 8, borderRadius: "50%", display: "grid", placeItems: "center", background: "rgba(255,255,255,0.1)", border: "none", color: "white", cursor: "pointer", flexShrink: 0 }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
