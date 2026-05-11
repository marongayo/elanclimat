"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { BlogPost, Product } from "@/lib/data";
import {
  Trash2,
  Edit3,
  X,
  Save,
  LogIn,
  LayoutDashboard,
  FileText,
  Package,
  Eye,
  ArrowLeft,
  Menu,
  Inbox,
  Mail,
  CheckCheck,
  Archive,
  Bell,
  SquareCheckBig,
} from "lucide-react";
import Link from "next/link";
import Modal from "@/components/Modal";
import { motion, AnimatePresence } from "framer-motion";

const ADMIN_PASSWORD = "elan2024";

type Tab = "dashboard" | "blog" | "products";

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
  date: string;
  read: boolean;
}

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

const INPUT_ERROR_STYLE: React.CSSProperties = {
  ...INPUT_STYLE,
  border: "1px solid #c0392b",
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

const ERROR_TEXT: React.CSSProperties = {
  fontFamily: "DM Sans",
  fontSize: "0.72rem",
  color: "#c0392b",
  marginTop: 4,
  display: "block",
};

const SidebarButton = ({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) => (
  <button
    onClick={onClick}
    style={{
      display: "flex",
      alignItems: "center",
      gap: 10,
      width: "100%",
      padding: "12px 16px",
      background: active ? "var(--sage-pale)" : "transparent",
      border: "none",
      cursor: "pointer",
      fontFamily: "DM Sans",
      fontSize: "0.85rem",
      color: active ? "var(--sage-dark)" : "var(--text-muted)",
      textAlign: "left",
      fontWeight: active ? 500 : 400,
      transition: "all 0.2s",
    }}
  >
    {icon} {label}
  </button>
);

const SidebarContent = ({
  tab,
  unread,
  navTo,
  onBell,
}: {
  tab: Tab;
  unread: number;
  navTo: (t: Tab) => void;
  onBell: () => void;
}) => (
  <>
    <div
      style={{
        padding: "24px 16px",
        borderBottom: "1px solid var(--off-white)",
      }}
    >
      <div
        style={{
          fontFamily: "Cormorant Garamond, serif",
          fontSize: "1.15rem",
          fontWeight: 600,
          color: "var(--charcoal)",
        }}
      >
        Élan Admin
      </div>
      <div
        style={{
          fontFamily: "DM Sans",
          fontSize: "0.62rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--sage-dark)",
          marginTop: 2,
        }}
      >
        Content Manager
      </div>
    </div>
    <nav style={{ padding: "16px 8px", flex: 1 }}>
      <SidebarButton
        active={tab === "dashboard"}
        onClick={() => navTo("dashboard")}
        icon={<LayoutDashboard size={16} />}
        label="Dashboard"
      />
      <SidebarButton
        active={tab === "blog"}
        onClick={() => navTo("blog")}
        icon={<FileText size={16} />}
        label="Blog Posts"
      />
      <SidebarButton
        active={tab === "products"}
        onClick={() => navTo("products")}
        icon={<Package size={16} />}
        label="Products"
      />
    </nav>
    <div
      style={{
        padding: "12px 16px",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        background: "var(--charcoal)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Link
        href="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontFamily: "DM Sans",
          fontSize: "0.78rem",
          color: "rgba(255,255,255,0.55)",
          textDecoration: "none",
          transition: "color 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
        onMouseLeave={(e) =>
          (e.currentTarget.style.color = "rgba(255,255,255,0.55)")
        }
      >
        <ArrowLeft size={14} /> View Site
      </Link>
      <button
        onClick={onBell}
        style={{
          position: "relative",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "rgba(255,255,255,0.55)",
          display: "flex",
          alignItems: "center",
          padding: 4,
          transition: "color 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
        onMouseLeave={(e) =>
          (e.currentTarget.style.color = "rgba(255,255,255,0.55)")
        }
      >
        <>
          {unread > 0 ? (
            <motion.div
              animate={{ rotate: [-10, 10, -10] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                display: "inline-block",
                originX: 0.5,
                originY: 0,
              }}
            >
              <Bell size={25} />
            </motion.div>
          ) : (
            <Bell size={16} />
          )}
        </>
        {unread > 0 && (
          <span
            style={{
              position: "absolute",
              top: -2,
              right: -2,
              background: "#c0392b",
              color: "white",
              fontSize: "0.55rem",
              fontWeight: 700,
              padding: "1px 4px",
              borderRadius: 9999,
              minWidth: 14,
              textAlign: "center",
              lineHeight: 1.6,
            }}
          >
            {unread}
          </span>
        )}
      </button>
    </div>
  </>
);

export default function AdminClient({
  initialPosts,
  initialProducts,
}: {
  initialPosts: BlogPost[];
  initialProducts: Product[];
}) {
  const [authed, setAuthed] = useState(true);
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState("");
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
  const [open, setOpen] = useState(false);

  const [messages, setMessages] = useState<Message[]>([]);
  const [unread, setUnread] = useState(0);
  const [messagesLoaded, setMessagesLoaded] = useState(false);
  const [archivedMessages, setArchivedMessages] = useState<Message[]>([]);
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [archiveLoaded, setArchiveLoaded] = useState(false);
  const [loadingArchive, setLoadingArchive] = useState(false);
  const [msgPanelOpen, setMsgPanelOpen] = useState(false);
  const [ellipsisOpen, setEllipsisOpen] = useState(false);

  const imgUrlRef = useRef<HTMLInputElement>(null);

  const loadMessages = async () => {
    try {
      const res = await fetch("/api/messages");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const arr = Array.isArray(data) ? data : [];
      setMessages(arr);
      setUnread(arr.filter((m: Message) => !m.read).length);
      setMessagesLoaded(true);
    } catch (err) {
      console.error("load messages error:", err);
    }
  };

  useEffect(() => {
    loadMessages();
    const interval = setInterval(loadMessages, 30000);
    return () => clearInterval(interval);
  }, []);

  const login = () => {
    if (pw === ADMIN_PASSWORD) {
      setAuthed(true);
      setPwError("");
    } else setPwError("Incorrect password. Try again.");
  };

  const toast = (m: string) => {
    setMsg(m);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
      setTimeout(() => setMsg(""), 400);
    }, 3100);
  };

  const uploadImage = async (
    file: File,
    setter: (url: string) => void,
    setUploading: (v: boolean) => void,
  ) => {
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setter(data.url);
    } catch (err) {
      console.error("Upload error:", err);
      toast("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const saveBlog = async () => {
    if (!blogForm) return;
    setSaving(true);
    const post = {
      ...blogForm,
      id: blogForm.id || Date.now().toString(),
      slug:
        blogForm.slug ||
        blogForm.title
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, ""),
    };
    await fetch("/api/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    });
    const updated = await fetch("/api/blog").then((r) => r.json());
    setPosts(Array.isArray(updated) ? updated : []);
    setBlogForm(null);
    setSaving(false);
    toast("Blog post saved successfully!");
  };

  const deleteBlog = async (id: string) => {
    if (!confirm("Delete this blog post?")) return;
    await fetch("/api/blog", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setPosts((p) => p.filter((x) => x.id !== id));
    toast("Post deleted.");
  };

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

  const saveProduct = async () => {
    if (!productForm) return;
    const errs = validateProduct(productForm);
    if (Object.keys(errs).length > 0) {
      setProductErrors(errs);
      setTimeout(() => {
        document
          .querySelector("[data-product-error]")
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 50);
      return;
    }
    setProductErrors({});
    setSaving(true);
    const product = {
      ...productForm,
      id: productForm.id || Date.now().toString(),
      price: parseFloat(productForm.price) || 0,
    };
    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    const updated = await fetch("/api/products").then((r) => r.json());
    setProducts(Array.isArray(updated) ? updated : []);
    setProductForm(null);
    setProductErrors({});
    setSaving(false);
    toast("Product saved!");
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    await fetch("/api/products", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setProducts((p) => p.filter((x) => x.id !== id));
    toast("Product deleted.");
  };

  const markRead = async (id: string) => {
    const m = messages.find((m) => m.id === id);
    if (!m) return;
    await fetch("/api/messages", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...m, read: true }),
    });
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, read: true } : m)),
    );
    setUnread((n) => Math.max(0, n - 1));
  };

  const deleteMessage = async (id: string, fromArchive = false) => {
    if (!confirm("Delete this message?")) return;
    const wasUnread = messages.find((m) => m.id === id)?.read === false;
    await fetch("/api/messages", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (fromArchive) {
      setArchivedMessages((prev) => prev.filter((m) => m.id !== id));
    } else {
      setMessages((prev) => prev.filter((m) => m.id !== id));
      if (wasUnread) setUnread((n) => Math.max(0, n - 1));
    }
    toast("Message deleted.");
  };

  const toggleArchive = async () => {
    const opening = !archiveOpen;
    setArchiveOpen(opening);
    if (opening && !archiveLoaded) {
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

  const navTo = (t: Tab) => {
    setTab(t);
    setSidebarOpen(false);
  };

  const clearError = (field: keyof ProductErrors) => {
    if (productErrors[field])
      setProductErrors((e) => ({ ...e, [field]: undefined }));
  };

  const openBell = () => {
    setMsgPanelOpen(true);
    setEllipsisOpen(false);
    loadMessages();
  };

  if (!authed) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--warm-white)",
          padding: "20px",
        }}
        className="mesh-bg"
      >
        <div
          style={{
            background: "white",
            padding: "40px 28px",
            width: "100%",
            maxWidth: 380,
            boxShadow: "0 4px 40px rgba(0,0,0,0.08)",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "1.5rem",
                fontWeight: 600,
                color: "var(--charcoal)",
              }}
            >
              Élan Admin
            </div>
            <div
              style={{
                fontFamily: "DM Sans",
                fontSize: "0.72rem",
                color: "var(--text-muted)",
                marginTop: 4,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Secure Access
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={LABEL_STYLE}>Password</label>
            <input
              type="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && login()}
              placeholder="Enter admin password"
              style={INPUT_STYLE}
            />
          </div>
          {pwError && (
            <p
              style={{
                fontFamily: "DM Sans",
                fontSize: "0.8rem",
                color: "#c0392b",
                marginBottom: 12,
              }}
            >
              {pwError}
            </p>
          )}
          <button
            onClick={login}
            style={{
              width: "100%",
              padding: "12px",
              background: "var(--charcoal)",
              color: "white",
              border: "none",
              cursor: "pointer",
              fontFamily: "DM Sans",
              fontSize: "0.88rem",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <LogIn size={16} /> Sign In
          </button>
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <Link
              href="/"
              style={{
                fontFamily: "DM Sans",
                fontSize: "0.78rem",
                color: "var(--text-muted)",
                textDecoration: "none",
              }}
            >
              ← Back to Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "var(--warm-white)",
      }}
    >
      <style>{`
        @media (min-width: 768px) {
          .admin-sidebar-desktop { display: flex !important; }
          .admin-topbar { display: none !important; }
          .admin-main { margin-left: 220px !important; }
        }
        @media (max-width: 767px) {
          .admin-sidebar-desktop { display: none !important; }
          .admin-topbar { display: flex !important; }
          .admin-main { margin-left: 0 !important; padding: 20px 16px 100px !important; padding-top: 70px !important; }
          .msg-panel { bottom: 80px !important; left: 12px !important; right: 12px !important; width: auto !important; height: min(55vh, 420px) !important; }
        }
        @keyframes fadeIn { from { opacity:0; transform:scale(0.9); } to { opacity:1; transform:scale(1); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        .sd-pill { display:flex; align-items:center; justify-content:center; background:var(--charcoal); border-radius:9999px; box-shadow:0 4px 24px rgba(0,0,0,0.35); overflow:hidden; transition:all 0.4s cubic-bezier(0.34,1.2,0.64,1); }
        .sd-pill.closed { width:52px; height:52px; cursor:pointer; }
        .sd-pill.expanded { width:280px; height:52px; }
        @media (max-width:767px) { .sd-pill.expanded { width:calc(100vw - 48px); max-width:300px; } }
        .sd-toggle-icon { color:white; display:flex; align-items:center; justify-content:center; }
        .sd-action { display:flex; align-items:center; justify-content:center; gap:6px; background:var(--charcoal); border:none; cursor:pointer; color:white; font-family:"DM Sans",sans-serif; font-size:0.82rem; white-space:nowrap; transition:opacity 0.15s ease; animation:fadeIn 0.2s ease both; flex:1; height:100%; }
        .sd-action:hover { opacity:0.8; }
        .sd-divider { width:1px; height:24px; background:rgba(255,255,255,0.2); flex-shrink:0; }
        .sd-close { background:none; border:none; cursor:pointer; color:rgba(255,255,255,0.6); display:flex; align-items:center; justify-content:center; padding:0 14px; height:100%; flex-shrink:0; transition:color 0.15s ease; }
        .sd-close:hover { color:white; }
        .msg-item:hover { background: #f9fafb !important; }
      `}</style>

      {/* Desktop sidebar */}
      <aside
        className="admin-sidebar-desktop"
        style={{
          width: 220,
          background: "white",
          borderRight: "1px solid var(--off-white)",
          flexDirection: "column",
          position: "fixed",
          top: 0,
          bottom: 0,
          zIndex: 50,
        }}
      >
        <SidebarContent
          tab={tab}
          unread={unread}
          navTo={navTo}
          onBell={openBell}
        />
      </aside>

      {/* Mobile top bar */}
      <div
        className="admin-topbar"
        style={{
          display: "none",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: "white",
          borderBottom: "1px solid var(--off-white)",
          padding: "14px 16px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "1.1rem",
            fontWeight: 600,
            color: "var(--charcoal)",
          }}
        >
          Élan Admin
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            onClick={openBell}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              position: "relative",
              display: "flex",
              alignItems: "center",
              color: "var(--charcoal)",
            }}
          >
            <Bell size={unread > 0 ? 24 : 20} />
            {unread > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: -4,
                  right: -4,
                  background: "#c0392b",
                  color: "white",
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  padding: "1px 4px",
                  borderRadius: 9999,
                }}
              >
                {unread}
              </span>
            )}
          </button>
          <button
            onClick={() => setSidebarOpen(true)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              color: "var(--charcoal)",
            }}
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.4)",
                zIndex: 150,
              }}
            />
            <motion.aside
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                bottom: 0,
                width: 240,
                background: "white",
                zIndex: 200,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  padding: "12px 12px 0",
                }}
              >
                <button
                  onClick={() => setSidebarOpen(false)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--text-muted)",
                  }}
                >
                  <X size={20} />
                </button>
              </div>
              <SidebarContent
                tab={tab}
                unread={unread}
                navTo={navTo}
                onBell={() => {
                  setSidebarOpen(false);
                  openBell();
                }}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Messages Panel */}
      <AnimatePresence>
        {msgPanelOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setMsgPanelOpen(false);
                setEllipsisOpen(false);
              }}
              style={{ position: "fixed", inset: 0, zIndex: 300 }}
            />
            <motion.div
              className="msg-panel"
              initial={{ opacity: 0, scale: 0.92, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 12 }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              style={{
                position: "fixed",
                bottom: 72,
                left: 12,
                width: 340,
                maxWidth: "calc(100vw - 24px)",
                height: "min(50vh, 520px)",
                maxHeight: "calc(100vh - 90px)",
                background: "white",
                zIndex: 301,
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
                borderRadius: 12,
                overflow: "hidden",
                border: "1px solid var(--off-white)",
              }}
            >
              {/* Panel header */}
              <div
                style={{
                  padding: "14px 16px 10px",
                  borderBottom: "1px solid var(--off-white)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexShrink: 0,
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      color: "var(--charcoal)",
                    }}
                  >
                    Admin
                  </div>
                  <div
                    style={{
                      fontFamily: "DM Sans",
                      fontSize: "0.7rem",
                      color: "var(--text-muted)",
                      marginTop: 1,
                    }}
                  >
                    {messages.length} active · {unread} unread
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <div style={{ position: "relative" }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEllipsisOpen((v) => !v);
                      }}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "var(--text-muted)",
                        padding: "4px 8px",
                        borderRadius: 6,
                        fontFamily: "DM Sans",
                        fontSize: "1.2rem",
                        letterSpacing: "0.12em",
                        lineHeight: 1,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      ···
                    </button>
                    <AnimatePresence>
                      {ellipsisOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -6, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -6, scale: 0.95 }}
                          transition={{ duration: 0.12 }}
                          style={{
                            position: "absolute",
                            top: "calc(100% + 4px)",
                            right: 0,
                            background: "white",
                            border: "1px solid var(--off-white)",
                            borderRadius: 8,
                            boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
                            zIndex: 10,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            minWidth: 140,
                          }}
                        >
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setEllipsisOpen(false);
                              toggleArchive();
                            }}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                              padding: "10px 16px",
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              fontFamily: "DM Sans",
                              fontSize: "0.82rem",
                              color: "var(--charcoal)",
                              width: "100%",
                              transition: "background 0.15s",
                            }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.background =
                                "var(--sage-pale)")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.background = "none")
                            }
                          >
                            <Archive size={13} />
                            {archiveOpen ? "Hide Archive" : "Load Archive"}
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <button
                    onClick={() => {
                      setMsgPanelOpen(false);
                      setEllipsisOpen(false);
                    }}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "var(--text-muted)",
                      display: "flex",
                      alignItems: "center",
                      padding: 4,
                      borderRadius: 6,
                    }}
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Panel body */}
              <div style={{ flex: 1, overflowY: "auto" }}>
                {messages.length === 0 && !archiveOpen && (
                  <div style={{ padding: "48px 24px", textAlign: "center" }}>
                    <Inbox
                      size={28}
                      style={{
                        color: "var(--text-muted)",
                        opacity: 0.3,
                        marginBottom: 10,
                      }}
                    />
                    <p
                      style={{
                        fontFamily: "DM Sans",
                        fontSize: "0.82rem",
                        color: "var(--text-muted)",
                      }}
                    >
                      No messages yet.
                    </p>
                  </div>
                )}

                {messages.map((m) => (
                  <div
                    key={m.id}
                    className="msg-item"
                    style={{
                      padding: "14px 16px",
                      borderBottom: "1px solid var(--off-white)",
                      background: m.read ? "white" : "var(--sage-pale)",
                      borderLeft: m.read
                        ? "3px solid transparent"
                        : "3px solid var(--sage-dark)",
                      transition: "background 0.15s",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: 8,
                        marginBottom: 4,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          flexWrap: "wrap",
                          minWidth: 0,
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "DM Sans",
                            fontSize: "0.85rem",
                            fontWeight: 600,
                            color: "var(--charcoal)",
                          }}
                        >
                          {m.name}
                        </span>
                        {!m.read && (
                          <span
                            style={{
                              background: "#c0392b",
                              color: "white",
                              fontSize: "0.55rem",
                              fontWeight: 700,
                              padding: "2px 6px",
                              borderRadius: 9999,
                              textTransform: "uppercase",
                              letterSpacing: "0.05em",
                              flexShrink: 0,
                            }}
                          >
                            New
                          </span>
                        )}
                        {m.service && (
                          <span
                            style={{
                              background: "var(--sage)",
                              color: "var(--charcoal)",
                              fontSize: "0.62rem",
                              padding: "2px 7px",
                              borderRadius: 9999,
                              fontFamily: "DM Sans",
                              flexShrink: 0,
                            }}
                          >
                            {m.service}
                          </span>
                        )}
                      </div>
                      <span
                        style={{
                          fontFamily: "DM Sans",
                          fontSize: "0.65rem",
                          color: "var(--text-muted)",
                          whiteSpace: "nowrap",
                          flexShrink: 0,
                        }}
                      >
                        {new Date(m.date).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                        })}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: 12,
                        marginBottom: 8,
                        flexWrap: "wrap",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "DM Sans",
                          fontSize: "0.72rem",
                          color: "var(--text-muted)",
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <Mail size={10} /> {m.email}
                      </span>
                      {m.phone && (
                        <span
                          style={{
                            fontFamily: "DM Sans",
                            fontSize: "0.72rem",
                            color: "var(--text-muted)",
                          }}
                        >
                          {m.phone}
                        </span>
                      )}
                    </div>
                    {m.message && (
                      <p
                        style={{
                          fontFamily: "DM Sans",
                          fontSize: "0.8rem",
                          color: "var(--charcoal)",
                          lineHeight: 1.6,
                          margin: "0 0 10px",
                          padding: "8px 10px",
                          background: "rgba(0,0,0,0.03)",
                          borderRadius: 4,
                        }}
                      >
                        {m.message}
                      </p>
                    )}
                    <div
                      style={{
                        display: "flex",
                        gap: 6,
                        justifyContent: "flex-end",
                      }}
                    >
                      {!m.read && (
                        <button
                          onClick={() => markRead(m.id)}
                          style={{
                            padding: "4px 10px",
                            background: "var(--sage-pale)",
                            border: "1px solid var(--sage)",
                            cursor: "pointer",
                            color: "var(--sage-dark)",
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                            fontFamily: "DM Sans",
                            fontSize: "0.68rem",
                            borderRadius: 4,
                          }}
                        >
                          <CheckCheck size={11} /> Mark read
                        </button>
                      )}
                      <button
                        onClick={() => deleteMessage(m.id)}
                        style={{
                          padding: "4px 8px",
                          background: "#fef2f2",
                          border: "none",
                          cursor: "pointer",
                          color: "#c0392b",
                          display: "flex",
                          alignItems: "center",
                          borderRadius: 4,
                        }}
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                ))}

                {archiveOpen &&
                  (loadingArchive ? (
                    <div
                      style={{
                        padding: "24px",
                        textAlign: "center",
                        fontFamily: "DM Sans",
                        fontSize: "0.8rem",
                        color: "var(--text-muted)",
                      }}
                    >
                      Loading archive...
                    </div>
                  ) : archivedMessages.length === 0 ? (
                    <div
                      style={{
                        padding: "14px 16px",
                        fontFamily: "DM Sans",
                        fontSize: "0.78rem",
                        color: "var(--text-muted)",
                        borderTop:
                          messages.length > 0
                            ? "1px solid var(--off-white)"
                            : "none",
                      }}
                    >
                      No archived messages.
                    </div>
                  ) : (
                    <>
                      <div
                        style={{
                          padding: "8px 16px",
                          fontFamily: "DM Sans",
                          fontSize: "0.62rem",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "var(--text-muted)",
                          background: "var(--warm-white)",
                          borderTop:
                            messages.length > 0
                              ? "1px solid var(--off-white)"
                              : "none",
                          borderBottom: "1px solid var(--off-white)",
                          position: "sticky",
                          top: 0,
                          zIndex: 2,
                        }}
                      >
                        Archive · {archivedMessages.length}
                      </div>
                      {archivedMessages.map((m) => (
                        <div
                          key={m.id}
                          style={{
                            padding: "12px 16px",
                            borderBottom: "1px solid var(--off-white)",
                            background: "var(--warm-white)",
                            borderLeft: "3px solid var(--off-white)",
                            opacity: 0.8,
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "flex-start",
                              gap: 8,
                              marginBottom: 4,
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 6,
                                flexWrap: "wrap",
                              }}
                            >
                              <span
                                style={{
                                  fontFamily: "DM Sans",
                                  fontSize: "0.83rem",
                                  fontWeight: 600,
                                  color: "var(--charcoal)",
                                }}
                              >
                                {m.name}
                              </span>
                              {m.service && (
                                <span
                                  style={{
                                    background: "var(--sage)",
                                    color: "var(--charcoal)",
                                    fontSize: "0.62rem",
                                    padding: "2px 7px",
                                    borderRadius: 9999,
                                    fontFamily: "DM Sans",
                                  }}
                                >
                                  {m.service}
                                </span>
                              )}
                            </div>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 6,
                                flexShrink: 0,
                              }}
                            >
                              <span
                                style={{
                                  fontFamily: "DM Sans",
                                  fontSize: "0.63rem",
                                  color: "var(--text-muted)",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {new Date(m.date).toLocaleDateString("en-GB", {
                                  day: "numeric",
                                  month: "short",
                                  year: "2-digit",
                                })}
                              </span>
                              <button
                                onClick={() => deleteMessage(m.id, true)}
                                style={{
                                  padding: "3px 5px",
                                  background: "#fef2f2",
                                  border: "none",
                                  cursor: "pointer",
                                  color: "#c0392b",
                                  borderRadius: 3,
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Trash2 size={11} />
                              </button>
                            </div>
                          </div>
                          <div
                            style={{
                              fontFamily: "DM Sans",
                              fontSize: "0.7rem",
                              color: "var(--text-muted)",
                              display: "flex",
                              alignItems: "center",
                              gap: 4,
                              marginBottom: m.message ? 6 : 0,
                            }}
                          >
                            <Mail size={10} /> {m.email}
                          </div>
                          {m.message && (
                            <p
                              style={{
                                fontFamily: "DM Sans",
                                fontSize: "0.76rem",
                                color: "var(--text-muted)",
                                lineHeight: 1.55,
                                margin: 0,
                              }}
                            >
                              {m.message}
                            </p>
                          )}
                        </div>
                      ))}
                    </>
                  ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main
        className="admin-main"
        style={{
          marginLeft: 220,
          flex: 1,
          padding: "32px 40px",
          minHeight: "100vh",
        }}
      >
        {/* DASHBOARD */}
        {tab === "dashboard" && (
          <div>
            <h1
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(1.6rem, 5vw, 2.2rem)",
                fontWeight: 600,
                color: "var(--charcoal)",
                marginBottom: 8,
              }}
            >
              Dashboard
            </h1>
            <p
              style={{
                fontFamily: "DM Sans",
                fontSize: "0.88rem",
                color: "var(--text-muted)",
                marginBottom: 36,
              }}
            >
              Welcome back. Manage your website content below.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                gap: 12,
                marginBottom: 40,
              }}
            >
              {[
                {
                  label: "Blog Posts",
                  value: posts.length,
                  color: "var(--sage)",
                  icon: <FileText size={22} />,
                },
                {
                  label: "Products",
                  value: products.length,
                  color: "var(--accent)",
                  icon: <Package size={22} />,
                },
                {
                  label: "In Stock",
                  value: products.filter((p) => p.inStock).length,
                  color: "var(--sage-dark)",
                  icon: <Eye size={22} />,
                },
              ].map((s, i) => (
                <div
                  key={i}
                  style={{
                    background: "white",
                    padding: "24px 20px",
                    borderLeft: `3px solid ${s.color}`,
                  }}
                >
                  <div style={{ color: s.color, marginBottom: 12 }}>
                    {s.icon}
                  </div>
                  <div
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                      fontSize: "2.2rem",
                      fontWeight: 600,
                      color: "var(--charcoal)",
                      lineHeight: 1,
                    }}
                  >
                    {s.value}
                  </div>
                  <div
                    style={{
                      fontFamily: "DM Sans",
                      fontSize: "0.78rem",
                      color: "var(--text-muted)",
                      marginTop: 4,
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BLOG */}
        {tab === "blog" && (
          <div>
            <div style={{ marginBottom: 32 }}>
              <h1
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "clamp(1.6rem, 5vw, 2.2rem)",
                  fontWeight: 600,
                  color: "var(--charcoal)",
                }}
              >
                Blog Posts
              </h1>
              <p
                style={{
                  fontFamily: "DM Sans",
                  fontSize: "0.85rem",
                  color: "var(--text-muted)",
                  marginTop: 4,
                }}
              >
                {posts.length} articles published
              </p>
            </div>

            {blogForm && (
              <Modal
                open={!!blogForm}
                onClose={() => setBlogForm(null)}
                title={blogForm.id ? "Edit Blog Post" : "New Blog Post"}
                maxWidth={800}
              >
                <div style={{ display: "grid", gap: 18 }}>
                  <div>
                    <label style={LABEL_STYLE}>Title *</label>
                    <input
                      value={blogForm.title}
                      onChange={(e) =>
                        setBlogForm({ ...blogForm, title: e.target.value })
                      }
                      style={INPUT_STYLE}
                      placeholder="How Heat Pumps Work"
                    />
                  </div>
                  <div>
                    <label style={LABEL_STYLE}>Excerpt</label>
                    <textarea
                      value={blogForm.excerpt}
                      onChange={(e) =>
                        setBlogForm({ ...blogForm, excerpt: e.target.value })
                      }
                      rows={2}
                      style={{ ...INPUT_STYLE, resize: "vertical" }}
                      placeholder="A brief summary..."
                    />
                  </div>
                  <div>
                    <label style={LABEL_STYLE}>Content (HTML)</label>
                    <textarea
                      value={blogForm.content}
                      onChange={(e) =>
                        setBlogForm({ ...blogForm, content: e.target.value })
                      }
                      rows={8}
                      style={{
                        ...INPUT_STYLE,
                        resize: "vertical",
                        fontFamily: "DM Mono, monospace",
                      }}
                      placeholder="<h2>Section Title</h2><p>Your content here...</p>"
                    />
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(140px, 1fr))",
                      gap: 16,
                    }}
                  >
                    <div>
                      <label style={LABEL_STYLE}>Category</label>
                      <select
                        value={blogForm.category}
                        onChange={(e) =>
                          setBlogForm({ ...blogForm, category: e.target.value })
                        }
                        style={INPUT_STYLE}
                      >
                        <option>HVAC</option>
                        <option>Solar</option>
                        <option>Batteries</option>
                        <option>Guides</option>
                        <option>News</option>
                      </select>
                    </div>
                    <div>
                      <label style={LABEL_STYLE}>Author</label>
                      <input
                        value={blogForm.author}
                        onChange={(e) =>
                          setBlogForm({ ...blogForm, author: e.target.value })
                        }
                        style={INPUT_STYLE}
                        placeholder="Élan Editorial"
                      />
                    </div>
                  </div>
                  <div>
                    <label style={LABEL_STYLE}>Cover Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f)
                          uploadImage(
                            f,
                            (url) =>
                              setBlogForm((bf) =>
                                bf ? { ...bf, image: url } : bf,
                              ),
                            setUploadingBlog,
                          );
                      }}
                      style={{ width: "100%", marginBottom: 8 }}
                    />
                    {uploadingBlog && (
                      <span
                        style={{
                          fontFamily: "DM Sans",
                          fontSize: "0.78rem",
                          color: "var(--sage-dark)",
                        }}
                      >
                        Uploading...
                      </span>
                    )}
                    <input
                      value={blogForm.image}
                      onChange={(e) =>
                        setBlogForm({ ...blogForm, image: e.target.value })
                      }
                      style={INPUT_STYLE}
                      placeholder="Or paste image URL"
                    />
                    {blogForm.image && (
                      <div
                        style={{
                          marginTop: 10,
                          height: 120,
                          width: "100%",
                          position: "relative",
                        }}
                      >
                        <Image
                          src={blogForm.image}
                          alt="preview"
                          fill
                          style={{ objectFit: "cover" }}
                          sizes="800px"
                        />
                      </div>
                    )}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: 12,
                      justifyContent: "flex-end",
                      paddingTop: 8,
                      flexWrap: "wrap",
                    }}
                  >
                    <button
                      onClick={() => setBlogForm(null)}
                      style={{
                        padding: "10px 20px",
                        background: "none",
                        border: "1px solid var(--off-white)",
                        cursor: "pointer",
                        fontFamily: "DM Sans",
                        fontSize: "0.85rem",
                        color: "var(--text-muted)",
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={saveBlog}
                      disabled={saving}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "10px 24px",
                        background: "var(--charcoal)",
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                        fontFamily: "DM Sans",
                        fontSize: "0.85rem",
                      }}
                    >
                      <Save size={15} /> {saving ? "Saving..." : "Save Post"}
                    </button>
                  </div>
                </div>
              </Modal>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {posts.map((p) => (
                <div
                  key={p.id}
                  style={{
                    background: "white",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "14px 16px",
                  }}
                >
                  <img
                    src={p.image}
                    alt={p.title}
                    style={{
                      width: 52,
                      height: 52,
                      objectFit: "cover",
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontFamily: "Cormorant Garamond, serif",
                        fontSize: "1rem",
                        fontWeight: 600,
                        color: "var(--charcoal)",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {p.title}
                    </div>
                    <div
                      style={{
                        fontFamily: "DM Sans",
                        fontSize: "0.72rem",
                        color: "var(--text-muted)",
                        marginTop: 2,
                      }}
                    >
                      {p.category} · {p.date}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                    <Link
                      href={`/blog/${p.slug}`}
                      target="_blank"
                      style={{
                        padding: "7px",
                        background: "var(--sage-pale)",
                        color: "var(--sage-dark)",
                        display: "flex",
                        alignItems: "center",
                        textDecoration: "none",
                      }}
                    >
                      <Eye size={14} />
                    </Link>
                    <button
                      onClick={() => setBlogForm({ ...p })}
                      style={{
                        padding: "7px",
                        background: "var(--off-white)",
                        border: "none",
                        cursor: "pointer",
                        color: "var(--charcoal)",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Edit3 size={14} />
                    </button>
                    <button
                      onClick={() => deleteBlog(p.id)}
                      style={{
                        padding: "7px",
                        background: "#fef2f2",
                        border: "none",
                        cursor: "pointer",
                        color: "#c0392b",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PRODUCTS */}
        {tab === "products" && (
          <div>
            <div style={{ marginBottom: 32 }}>
              <h1
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "clamp(1.6rem, 5vw, 2.2rem)",
                  fontWeight: 600,
                  color: "var(--charcoal)",
                }}
              >
                Products
              </h1>
              <p
                style={{
                  fontFamily: "DM Sans",
                  fontSize: "0.85rem",
                  color: "var(--text-muted)",
                  marginTop: 4,
                }}
              >
                {products.length} products in catalogue
              </p>
            </div>

            {productForm && (
              <div
                style={{
                  position: "fixed",
                  inset: 0,
                  background: "rgba(0,0,0,0.4)",
                  zIndex: 200,
                  overflow: "auto",
                  padding: "20px 16px",
                }}
              >
                <div
                  style={{
                    background: "white",
                    maxWidth: 640,
                    margin: "0 auto",
                    padding: "32px 24px",
                    boxShadow: "0 20px 80px rgba(0,0,0,0.2)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 8,
                    }}
                  >
                    <h2
                      style={{
                        fontFamily: "Cormorant Garamond, serif",
                        fontSize: "1.7rem",
                        color: "var(--charcoal)",
                      }}
                    >
                      {productForm.id ? "Edit" : "New"} Product
                    </h2>
                    <button
                      onClick={() => {
                        setProductForm(null);
                        setProductErrors({});
                      }}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {Object.keys(productErrors).length > 0 && (
                    <div
                      data-product-error
                      style={{
                        background: "#fef2f2",
                        border: "1px solid #fca5a5",
                        padding: "12px 16px",
                        marginBottom: 20,
                        borderRadius: 2,
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "DM Sans",
                          fontSize: "0.8rem",
                          color: "#c0392b",
                          fontWeight: 600,
                          margin: "0 0 6px",
                        }}
                      >
                        Please fix the following before saving:
                      </p>
                      <ul style={{ margin: 0, paddingLeft: 18 }}>
                        {Object.values(productErrors).map((e, i) => (
                          <li
                            key={i}
                            style={{
                              fontFamily: "DM Sans",
                              fontSize: "0.78rem",
                              color: "#c0392b",
                            }}
                          >
                            {e}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div style={{ display: "grid", gap: 18 }}>
                    <div>
                      <label style={LABEL_STYLE}>Product Name *</label>
                      <input
                        value={productForm.name}
                        onChange={(e) => {
                          setProductForm({
                            ...productForm,
                            name: e.target.value,
                          });
                          clearError("name");
                        }}
                        style={
                          productErrors.name ? INPUT_ERROR_STYLE : INPUT_STYLE
                        }
                        placeholder="EcoBreeze 3.5kW Heat Pump"
                      />
                      {productErrors.name && (
                        <span style={ERROR_TEXT}>{productErrors.name}</span>
                      )}
                    </div>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fit, minmax(130px, 1fr))",
                        gap: 16,
                      }}
                    >
                      <div>
                        <label style={LABEL_STYLE}>Price (KES) *</label>
                        <input
                          type="number"
                          value={productForm.price}
                          onChange={(e) => {
                            setProductForm({
                              ...productForm,
                              price: e.target.value,
                            });
                            clearError("price");
                          }}
                          style={
                            productErrors.price
                              ? INPUT_ERROR_STYLE
                              : INPUT_STYLE
                          }
                          placeholder="1299"
                          min="1"
                        />
                        {productErrors.price && (
                          <span style={ERROR_TEXT}>{productErrors.price}</span>
                        )}
                      </div>
                      <div>
                        <label style={LABEL_STYLE}>Category *</label>
                        <select
                          value={productForm.category}
                          onChange={(e) => {
                            setProductForm({
                              ...productForm,
                              category: e.target.value,
                            });
                            clearError("category");
                          }}
                          style={
                            productErrors.category
                              ? INPUT_ERROR_STYLE
                              : INPUT_STYLE
                          }
                        >
                          <option>HVAC</option>
                          <option>Solar</option>
                          <option>Batteries</option>
                        </select>
                        {productErrors.category && (
                          <span style={ERROR_TEXT}>
                            {productErrors.category}
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <label style={LABEL_STYLE}>Description *</label>
                      <textarea
                        value={productForm.description}
                        onChange={(e) => {
                          setProductForm({
                            ...productForm,
                            description: e.target.value,
                          });
                          clearError("description");
                        }}
                        rows={3}
                        style={{
                          ...(productErrors.description
                            ? INPUT_ERROR_STYLE
                            : INPUT_STYLE),
                          resize: "vertical",
                        }}
                        placeholder="Describe the product features, specs, and benefits..."
                      />
                      {productErrors.description && (
                        <span style={ERROR_TEXT}>
                          {productErrors.description}
                        </span>
                      )}
                    </div>

                    <div>
                      <label style={LABEL_STYLE}>
                        Product Images *{" "}
                        <span
                          style={{
                            color:
                              productForm.images.length >= 2
                                ? "var(--sage-dark)"
                                : "#c0392b",
                            fontWeight: 600,
                          }}
                        >
                          ({productForm.images.length}/2 minimum)
                        </span>
                      </label>
                      <div
                        style={{ display: "flex", gap: 6, marginBottom: 12 }}
                      >
                        {[0, 1].map((i) => (
                          <div
                            key={i}
                            style={{
                              flex: 1,
                              height: 4,
                              borderRadius: 2,
                              background:
                                productForm.images.length > i
                                  ? "var(--sage-dark)"
                                  : "var(--off-white)",
                              transition: "background 0.2s",
                            }}
                          />
                        ))}
                        <div
                          style={{
                            flex: 3,
                            height: 4,
                            borderRadius: 2,
                            background:
                              productForm.images.length > 2
                                ? "var(--sage)"
                                : "var(--off-white)",
                            transition: "background 0.2s",
                          }}
                        />
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const f = e.target.files?.[0];
                          if (!f) return;
                          setUploadingProduct(true);
                          const fd = new FormData();
                          fd.append("file", f);
                          try {
                            const res = await fetch("/api/upload", {
                              method: "POST",
                              body: fd,
                            });
                            const data = await res.json();
                            if (!res.ok) throw new Error(data.error);
                            setProductForm((pf) => {
                              if (!pf) return pf;
                              const updated = {
                                ...pf,
                                images: [...pf.images, data.url],
                              };
                              if (updated.images.length >= 2)
                                clearError("images");
                              return updated;
                            });
                          } catch (err) {
                            console.error(err);
                            toast("Upload failed. Please try again.");
                          } finally {
                            setUploadingProduct(false);
                            e.target.value = "";
                          }
                        }}
                        style={{ width: "100%", marginBottom: 8 }}
                      />
                      {uploadingProduct && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            marginBottom: 8,
                          }}
                        >
                          <div
                            style={{
                              width: 14,
                              height: 14,
                              border: "2px solid var(--sage-dark)",
                              borderTopColor: "transparent",
                              borderRadius: "50%",
                              animation: "spin 0.7s linear infinite",
                            }}
                          />
                          <span
                            style={{
                              fontFamily: "DM Sans",
                              fontSize: "0.78rem",
                              color: "var(--sage-dark)",
                            }}
                          >
                            Uploading image...
                          </span>
                        </div>
                      )}
                      <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                        <input
                          ref={imgUrlRef}
                          placeholder="Or paste image URL and click Add"
                          style={{ ...INPUT_STYLE, flex: 1 }}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const val = imgUrlRef.current?.value.trim();
                            if (!val) return;
                            setProductForm((pf) => {
                              if (!pf) return pf;
                              const updated = {
                                ...pf,
                                images: [...pf.images, val],
                              };
                              if (updated.images.length >= 2)
                                clearError("images");
                              return updated;
                            });
                            if (imgUrlRef.current) imgUrlRef.current.value = "";
                          }}
                          style={{
                            padding: "10px 16px",
                            background: "var(--charcoal)",
                            color: "white",
                            border: "none",
                            cursor: "pointer",
                            fontFamily: "DM Sans",
                            fontSize: "0.85rem",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Add
                        </button>
                      </div>
                      {productErrors.images && (
                        <span style={{ ...ERROR_TEXT, marginTop: 8 }}>
                          {productErrors.images}
                        </span>
                      )}
                      {productForm.images.length > 0 && (
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns:
                              "repeat(auto-fill, minmax(90px, 1fr))",
                            gap: 8,
                            marginTop: 12,
                          }}
                        >
                          {productForm.images.map((url, i) => (
                            <div key={i} style={{ position: "relative" }}>
                              {i === 0 && (
                                <span
                                  style={{
                                    position: "absolute",
                                    bottom: 4,
                                    left: 4,
                                    background: "var(--charcoal)",
                                    color: "white",
                                    fontSize: "0.55rem",
                                    padding: "2px 6px",
                                    fontFamily: "DM Sans",
                                    zIndex: 1,
                                  }}
                                >
                                  Main
                                </span>
                              )}
                              <Image
                                src={url}
                                alt={`img-${i}`}
                                width={90}
                                height={90}
                                style={{
                                  objectFit: "cover",
                                  width: "100%",
                                  height: 90,
                                  display: "block",
                                }}
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  setProductForm((pf) =>
                                    pf
                                      ? {
                                          ...pf,
                                          images: pf.images.filter(
                                            (_, j) => j !== i,
                                          ),
                                        }
                                      : pf,
                                  )
                                }
                                style={{
                                  position: "absolute",
                                  top: 4,
                                  right: 4,
                                  background: "rgba(0,0,0,0.6)",
                                  border: "none",
                                  cursor: "pointer",
                                  color: "white",
                                  borderRadius: "50%",
                                  width: 20,
                                  height: 20,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <X size={11} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                      <p
                        style={{
                          fontFamily: "DM Sans",
                          fontSize: "0.7rem",
                          color: "var(--text-muted)",
                          marginTop: 6,
                        }}
                      >
                        First image is the main thumbnail. Minimum 2 images
                        required.
                      </p>
                    </div>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fit, minmax(130px, 1fr))",
                        gap: 16,
                      }}
                    >
                      <div>
                        <label style={LABEL_STYLE}>Badge</label>
                        <input
                          value={productForm.badge}
                          onChange={(e) =>
                            setProductForm({
                              ...productForm,
                              badge: e.target.value,
                            })
                          }
                          style={INPUT_STYLE}
                          placeholder="New, Best Seller, Sale..."
                        />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          paddingTop: 24,
                        }}
                      >
                        <input
                          type="checkbox"
                          id="inStock"
                          checked={productForm.inStock}
                          onChange={(e) =>
                            setProductForm({
                              ...productForm,
                              inStock: e.target.checked,
                            })
                          }
                        />
                        <label
                          htmlFor="inStock"
                          style={{
                            fontFamily: "DM Sans",
                            fontSize: "0.85rem",
                            color: "var(--charcoal)",
                            cursor: "pointer",
                          }}
                        >
                          In Stock
                        </label>
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        gap: 12,
                        justifyContent: "flex-end",
                        paddingTop: 8,
                        flexWrap: "wrap",
                      }}
                    >
                      <button
                        onClick={() => {
                          setProductForm(null);
                          setProductErrors({});
                        }}
                        style={{
                          padding: "10px 20px",
                          background: "none",
                          border: "1px solid var(--off-white)",
                          cursor: "pointer",
                          fontFamily: "DM Sans",
                          fontSize: "0.85rem",
                          color: "var(--text-muted)",
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={saveProduct}
                        disabled={saving || uploadingProduct}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          padding: "10px 24px",
                          background:
                            saving || uploadingProduct
                              ? "var(--text-muted)"
                              : "var(--charcoal)",
                          color: "white",
                          border: "none",
                          cursor:
                            saving || uploadingProduct
                              ? "not-allowed"
                              : "pointer",
                          fontFamily: "DM Sans",
                          fontSize: "0.85rem",
                        }}
                      >
                        <Save size={15} />{" "}
                        {saving
                          ? "Saving..."
                          : uploadingProduct
                            ? "Uploading..."
                            : "Save Product"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
                gap: 12,
              }}
            >
              {products.map((p) => (
                <div
                  key={p.id}
                  style={{ background: "white", overflow: "hidden" }}
                >
                  <div
                    style={{
                      aspectRatio: "1/1",
                      overflow: "hidden",
                      background: "var(--off-white)",
                      position: "relative",
                    }}
                  >
                    {p.images?.[0] ? (
                      <Image
                        src={p.images[0]}
                        alt={p.name}
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="160px"
                      />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "var(--text-muted)",
                        }}
                      >
                        <Package size={32} />
                      </div>
                    )}
                    {p.images?.length > 1 && (
                      <span
                        style={{
                          position: "absolute",
                          bottom: 6,
                          right: 6,
                          background: "rgba(0,0,0,0.55)",
                          color: "white",
                          fontSize: "0.65rem",
                          padding: "2px 6px",
                          borderRadius: 4,
                          fontFamily: "DM Sans",
                        }}
                      >
                        +{p.images.length - 1}
                      </span>
                    )}
                  </div>
                  <div style={{ padding: "12px" }}>
                    <div
                      style={{
                        fontFamily: "DM Sans",
                        fontSize: "0.62rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "var(--sage-dark)",
                        marginBottom: 4,
                      }}
                    >
                      {p.category}
                    </div>
                    <div
                      style={{
                        fontFamily: "Cormorant Garamond, serif",
                        fontSize: "0.95rem",
                        fontWeight: 600,
                        color: "var(--charcoal)",
                        marginBottom: 4,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {p.name}
                    </div>
                    <div
                      style={{
                        fontFamily: "DM Sans",
                        fontSize: "0.85rem",
                        color: "var(--text-muted)",
                        marginBottom: 10,
                      }}
                    >
                      KES {p.price.toLocaleString()}
                    </div>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button
                        onClick={() => {
                          setProductForm({
                            ...p,
                            price: String(p.price),
                            images: p.images ?? [],
                          });
                          setProductErrors({});
                        }}
                        style={{
                          flex: 1,
                          padding: "7px",
                          background: "var(--off-white)",
                          border: "none",
                          cursor: "pointer",
                          color: "var(--charcoal)",
                          fontFamily: "DM Sans",
                          fontSize: "0.75rem",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 4,
                        }}
                      >
                        <Edit3 size={12} /> Edit
                      </button>
                      <button
                        onClick={() => deleteProduct(p.id)}
                        style={{
                          padding: "7px 10px",
                          background: "#fef2f2",
                          border: "none",
                          cursor: "pointer",
                          color: "#c0392b",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* FAB Speed Dial + Toast */}
      <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 999 }}>
        <motion.div
          animate={{ width: open ? "auto" : toastVisible ? "auto" : 52 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          style={{
            height: 52,
            borderRadius: 9999,
            background:
              toastVisible && !open ? "var(--sage)" : "var(--charcoal)",
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
                style={{
                  width: 52,
                  minWidth: 52,
                  height: 52,
                  border: "none",
                  background: "transparent",
                  color: "white",
                  cursor: "pointer",
                  display: "grid",
                  placeItems: "center",
                  flexShrink: 0,
                  padding: 0,
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
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
                style={{
                  height: 52,
                  padding: "0 20px",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  color: "var(--charcoal)",
                  fontFamily: "DM Sans",
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                }}
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
                style={{
                  height: 52,
                  display: "flex",
                  alignItems: "center",
                  padding: "0 8px 0 20px",
                  whiteSpace: "nowrap",
                  gap: 4,
                }}
              >
                <button
                  className="sd-action"
                  onClick={() => {
                    setTab("blog");
                    setBlogForm(emptyBlog());
                    setOpen(false);
                  }}
                  style={{
                    height: 36,
                    border: "none",
                    background: "transparent",
                    color: "white",
                    cursor: "pointer",
                    fontFamily: "DM Sans",
                    fontWeight: 500,
                    padding: "0 8px",
                  }}
                >
                  New Blog
                </button>
                <div
                  style={{
                    margin: "0 8px",
                    height: 20,
                    width: 1,
                    background: "rgba(255,255,255,0.18)",
                    flexShrink: 0,
                  }}
                />
                <button
                  className="sd-action"
                  onClick={() => {
                    setTab("products");
                    setProductForm(emptyProduct());
                    setProductErrors({});
                    setOpen(false);
                  }}
                  style={{
                    height: 36,
                    border: "none",
                    background: "transparent",
                    color: "white",
                    cursor: "pointer",
                    fontFamily: "DM Sans",
                    fontWeight: 500,
                    padding: "0 8px",
                  }}
                >
                  New Product
                </button>
                <button
                  className="sd-close"
                  onClick={() => setOpen(false)}
                  style={{
                    width: 36,
                    minWidth: 36,
                    height: 36,
                    marginLeft: 8,
                    borderRadius: "50%",
                    display: "grid",
                    placeItems: "center",
                    background: "rgba(255,255,255,0.1)",
                    border: "none",
                    color: "white",
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
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
