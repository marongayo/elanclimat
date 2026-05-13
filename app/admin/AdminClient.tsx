"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { BlogPost, Product } from "@/lib/data";
import { SquareCheckBig } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import AdminSidebar from "@/components/admin-components/AdminSidebar";
import AdminMessagesPanel from "@/components/admin-components/AdminMessagesPanel";
import AdminContentTabs from "@/components/admin-components/AdminContentTabs";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type Tab = "dashboard" | "blog" | "products";
type Role = "admin" | "superadmin";

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

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

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

  if (!pf.name.trim()) {
    errs.name = "Product name is required.";
  }

  if (!pf.price || isNaN(parseFloat(pf.price)) || parseFloat(pf.price) <= 0) {
    errs.price = "A valid price is required.";
  }

  if (!pf.category) {
    errs.category = "Category is required.";
  }

  if (!pf.description.trim()) {
    errs.description = "Description is required.";
  }

  if (pf.images.length < 2) {
    errs.images = `At least 2 images are required. You have ${pf.images.length}.`;
  }

  return errs;
};

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export default function AdminClient({
  initialPosts,
  initialProducts,
}: {
  initialPosts: BlogPost[];
  initialProducts: Product[];
}) {
  // ───────────────────────────────────────────────────────────────────────────
  // Session
  // ───────────────────────────────────────────────────────────────────────────

  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          fontFamily: "DM Sans",
          background: "var(--warm-white)",
        }}
      >
        Loading admin dashboard...
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const role = session.user?.role as Role;

  // ───────────────────────────────────────────────────────────────────────────
  // App State
  // ───────────────────────────────────────────────────────────────────────────

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

  // ───────────────────────────────────────────────────────────────────────────
  // Messages State
  // ───────────────────────────────────────────────────────────────────────────

  const [messages, setMessages] = useState<Message[]>([]);
  const [unread, setUnread] = useState(0);

  const [archivedMessages, setArchivedMessages] = useState<Message[]>([]);

  const [showingArchive, setShowingArchive] = useState(false);

  const [archiveLoaded, setArchiveLoaded] = useState(false);

  const [loadingArchive, setLoadingArchive] = useState(false);

  const [msgPanelOpen, setMsgPanelOpen] = useState(false);

  const [ellipsisOpen, setEllipsisOpen] = useState(false);

  // ───────────────────────────────────────────────────────────────────────────
  // Load Messages
  // ───────────────────────────────────────────────────────────────────────────

  const loadMessages = async () => {
    try {
      const res = await fetch("/api/messages");

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

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

  // ───────────────────────────────────────────────────────────────────────────
  // Logout
  // ───────────────────────────────────────────────────────────────────────────

  const logout = async () => {
    const confirmed = confirm("Sign out of the admin panel?");

    if (!confirmed) return;

    await signOut({
      callbackUrl: "/login",
    });
  };

  // ───────────────────────────────────────────────────────────────────────────
  // Toast
  // ───────────────────────────────────────────────────────────────────────────

  const toast = (m: string) => {
    setMsg(m);

    setToastVisible(true);

    setTimeout(() => {
      setToastVisible(false);

      setTimeout(() => setMsg(""), 400);
    }, 3100);
  };

  // ───────────────────────────────────────────────────────────────────────────
  // Blog Handlers
  // ───────────────────────────────────────────────────────────────────────────

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
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });

    const updated = await fetch("/api/blog").then((r) => r.json());

    setPosts(Array.isArray(updated) ? updated : []);

    setBlogForm(null);

    setSaving(false);

    toast("Blog post saved successfully!");
  };

  const deleteBlog = async (id: string) => {
    if (!confirm("Delete this blog post?")) {
      return;
    }

    await fetch("/api/blog", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    setPosts((p) => p.filter((x) => x.id !== id));

    toast("Post deleted.");
  };

  // ───────────────────────────────────────────────────────────────────────────
  // Product Handlers
  // ───────────────────────────────────────────────────────────────────────────

  const saveProduct = async () => {
    if (!productForm) return;

    const errs = validateProduct(productForm);

    if (Object.keys(errs).length > 0) {
      setProductErrors(errs);

      setTimeout(() => {
        document.querySelector("[data-product-error]")?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
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
      headers: {
        "Content-Type": "application/json",
      },
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
    if (!confirm("Delete this product?")) {
      return;
    }

    await fetch("/api/products", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    setProducts((p) => p.filter((x) => x.id !== id));

    toast("Product deleted.");
  };

  const clearError = (field: keyof ProductErrors) => {
    if (productErrors[field]) {
      setProductErrors((e) => ({
        ...e,
        [field]: undefined,
      }));
    }
  };

  // ───────────────────────────────────────────────────────────────────────────
  // Message Handlers
  // ───────────────────────────────────────────────────────────────────────────

  const markRead = async (id: string) => {
    const m = messages.find((m) => m.id === id);

    if (!m) return;

    await fetch("/api/messages", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...m,
        read: true,
      }),
    });

    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, read: true } : m)),
    );

    setUnread((n) => Math.max(0, n - 1));
  };

  const deleteMessage = async (id: string, fromArchive = false) => {
    if (!confirm("Delete this message?")) {
      return;
    }

    const wasUnread = messages.find((m) => m.id === id)?.read === false;

    await fetch("/api/messages", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (fromArchive) {
      setArchivedMessages((prev) => prev.filter((m) => m.id !== id));
    } else {
      setMessages((prev) => prev.filter((m) => m.id !== id));

      if (wasUnread) {
        setUnread((n) => Math.max(0, n - 1));
      }
    }

    toast("Message deleted.");
  };

  const toggleArchive = async () => {
    if (showingArchive) {
      setShowingArchive(false);
      return;
    }

    setShowingArchive(true);

    if (!archiveLoaded) {
      setLoadingArchive(true);

      try {
        const res = await fetch("/api/messages?archived=true");

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

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

  // ───────────────────────────────────────────────────────────────────────────
  // Navigation
  // ───────────────────────────────────────────────────────────────────────────

  const navTo = (t: Tab) => {
    setTab(t);
    setSidebarOpen(false);
  };

  const openBell = () => {
    setMsgPanelOpen(true);
    setEllipsisOpen(false);
    loadMessages();
  };

  // ───────────────────────────────────────────────────────────────────────────
  // Render
  // ───────────────────────────────────────────────────────────────────────────

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
          .admin-sidebar-desktop {
            display: flex !important;
          }

          .admin-topbar {
            display: none !important;
          }

          .admin-main {
            margin-left: 240px !important;
          }
        }

        @media (max-width: 767px) {
          .admin-sidebar-desktop {
            display: none !important;
          }

          .admin-topbar {
            display: flex !important;
          }

          .admin-main {
            margin-left: 0 !important;
            padding: 20px 16px 100px !important;
            padding-top: 70px !important;
          }

          .msg-panel {
            bottom: 80px !important;
            left: 12px !important;
            right: 12px !important;
            width: auto !important;
            height: min(55vh, 420px) !important;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }

          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .sd-action {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          background: var(--charcoal);
          border: none;
          cursor: pointer;
          color: white;
          font-family: "DM Sans", sans-serif;
          font-size: 0.82rem;
          white-space: nowrap;
          transition: opacity 0.15s ease;
          animation: fadeIn 0.2s ease both;
          flex: 1;
          height: 100%;
        }

        .sd-action:hover {
          opacity: 0.8;
        }

        .sd-close {
          background: none;
          border: none;
          cursor: pointer;
          color: rgba(255,255,255,0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 14px;
          height: 100%;
          flex-shrink: 0;
          transition: color 0.15s ease;
        }

        .sd-close:hover {
          color: white;
        }

        .msg-item:hover {
          background: #f9fafb !important;
        }
      `}</style>

      {/* Sidebar */}
      <AdminSidebar
        tab={tab}
        unread={unread}
        navTo={navTo}
        onBell={openBell}
        role={role}
        onLogout={logout}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Messages */}
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

      {/* Main Content */}
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

      {/* FAB + Toast */}
      <div
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 999,
        }}
      >
        <motion.div
          animate={{
            width: open ? "auto" : toastVisible ? "auto" : 52,
          }}
          transition={{
            type: "spring",
            damping: 25,
            stiffness: 300,
          }}
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
                initial={{
                  opacity: 0,
                  scale: 0.85,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.85,
                }}
                transition={{
                  duration: 0.18,
                }}
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
                +
              </motion.button>
            )}

            {!open && toastVisible && (
              <motion.div
                key="toast"
                initial={{
                  width: 52,
                  opacity: 0,
                }}
                animate={{
                  width: "auto",
                  opacity: 1,
                }}
                exit={{
                  width: 52,
                  opacity: 0,
                }}
                transition={{
                  type: "spring",
                  damping: 25,
                  stiffness: 300,
                }}
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

                <span
                  style={{
                    fontSize: "0.85rem",
                  }}
                >
                  {msg}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
