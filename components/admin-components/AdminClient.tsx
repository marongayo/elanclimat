// components/admin-components/AdminClient.tsx

"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";

import { BlogPost } from "@/lib/types/blog";
import { Product } from "@/lib/types/product";
import { User } from "@/lib/types/admin";
import {
  SquareCheckBig,
  X,
  Save,
  FileText,
  Package,
  Briefcase,
  UserPlus,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AdminSidebar from "@/components/admin-components/AdminSidebar";
import AdminMessagesPanel from "@/components/admin-components/AdminMessagesPanel";
import AdminContentTabs from "@/components/admin-components/AdminContentTabs";
import type { Message } from "@/lib/types/message";
import type { ProductForm, ProductErrors } from "@/lib/types/product";
import type { BlogForm } from "@/lib/types/blog";
import type { AdminForm, AdminFormErrors } from "@/lib/types/admin";
import type { Tab } from "@/lib/types/admin";
import type { Role } from "@/lib/types/admin";
import type { Job, JobForm } from "@/lib/types/jobs";
import Image from "next/image";

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

const emptyBlog = (): BlogForm => ({
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

const emptyJob = (): JobForm => ({
  title: "",
  description: "",
  location: "",
  category: "",
  type: "Full-time",
  requirements: [],
  applicationDeadline: "",
});
const emptyProduct = (): ProductForm => ({
  name: "",
  fullName: "",
  price: "",
  category: "HVAC",
  images: [],
  description: "",
  keyFeatures: [],
  specifications: [],
  inStock: true,
  badge: "",
});

const emptyAdmin = (): AdminForm => ({
  name: "",
  email: "",
  password: "",
  role: "admin",
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

const validateAdmin = (af: AdminForm, isEdit = false): AdminFormErrors => {
  const errs: AdminFormErrors = {};
  if (!af.name.trim()) errs.name = "Name is required.";
  if (!af.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(af.email))
    errs.email = "A valid email is required.";
  if (!isEdit && (!af.password || af.password.length < 8))
    errs.password = "Password must be at least 8 characters.";
  if (isEdit && af.password && af.password.length < 8)
    errs.password = "New password must be at least 8 characters.";
  return errs;
};

// ── Shared style tokens ──────────────────────────────────────────────────────

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
  // ─── ALL HOOKS FIRST ──────────────────────────────────────────────────────

  const { data: session, status, update: updateSession } = useSession();

  const [tab, setTab] = useState<Tab>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [posts, setPosts] = useState(initialPosts);
  const [products, setProducts] = useState(initialProducts);
  const [admins, setAdmins] = useState<User[]>([]);

  const [displayName, setDisplayName] = useState<string>("");

  const [blogForm, setBlogForm] = useState<BlogForm | null>(null);
  const [productForm, setProductForm] = useState<ProductForm | null>(null);
  const [productErrors, setProductErrors] = useState<ProductErrors>({});

  const [adminForm, setAdminForm] = useState<AdminForm | null>(null);
  const [editAdminId, setEditAdminId] = useState<string | null>(null);
  const [adminErrors, setAdminErrors] = useState<AdminFormErrors>({});
  const [savingAdmin, setSavingAdmin] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [saving, setSaving] = useState(false);
  const [uploadingBlog, setUploadingBlog] = useState(false);
  const [uploadingProduct, setUploadingProduct] = useState(false);

  const [toastVisible, setToastVisible] = useState(false);
  const [msg, setMsg] = useState("");
  const [open, setOpen] = useState(false);

  const [messages, setMessages] = useState<Message[]>([]);
  const [unread, setUnread] = useState(0);
  const [archivedMessages, setArchivedMessages] = useState<Message[]>([]);
  const [showingArchive, setShowingArchive] = useState(false);
  const [archiveLoaded, setArchiveLoaded] = useState(false);
  const [loadingArchive, setLoadingArchive] = useState(false);
  const [msgPanelOpen, setMsgPanelOpen] = useState(false);
  const [ellipsisOpen, setEllipsisOpen] = useState(false);

  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobForm, setJobForm] = useState<JobForm | null>(null);
  const [editJobId, setEditJobId] = useState<string | null>(null);

  // ─── Data loaders (defined before useEffect calls that reference them) ────

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

  const loadAdmins = async () => {
    try {
      const res = await fetch("/api/user");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setAdmins(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("load admins error:", err);
    }
  };

  const loadJobs = async () => {
    const data = await fetch("/api/jobs").then((r) => r.json());
    setJobs(Array.isArray(data) ? data : []);
  };

  // ─── All useEffects together, before any early returns ────────────────────

  useEffect(() => {
    loadMessages();
    const interval = setInterval(loadMessages, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (status === "authenticated") {
      loadAdmins();
    }
  }, [status]);

  useEffect(() => {
    if (session?.user?.name) {
      setDisplayName(session.user.name);
    }
  }, [session?.user?.name]);

  useEffect(() => {
    const userId = session?.user?.id;
    if (!displayName && admins.length > 0 && userId) {
      const me = admins.find((a) => a._id === userId);
      if (me?.name) setDisplayName(me.name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [admins]);

  useEffect(() => {
    loadJobs();
  }, []);

  // ─── EARLY RETURNS ────────────────────────────────────────────────────────

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
        <Image src="/Elanlogo.svg" alt="Logo" width={300} height={300} />
        Loading admin dashboard...
      </div>
    );
  }

  if (!session) return null;

  const role = ((session.user?.role as string) ?? "").trim() as Role;
  const currentUserId = session.user?.id as string;
  const currentUserEmail = (session.user?.email as string | undefined) ?? "";

  const dbRecord = admins.find((a) => a._id === currentUserId);
  const isTrueSuperadmin =
    role === "superadmin" &&
    ((session.user?.name ?? "").trim().toLowerCase() === "super admin" ||
      (dbRecord?.name ?? "").trim().toLowerCase() === "super admin") &&
    (currentUserEmail.trim().toLowerCase() === "superadmin@elanclinat.co.ke" ||
      (dbRecord?.email ?? "").trim().toLowerCase() ===
        "superadmin@elanclinat.co.ke");

  // ─── Handlers ─────────────────────────────────────────────────────────────

  const toast = (m: string) => {
    setMsg(m);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
      setTimeout(() => setMsg(""), 400);
    }, 3100);
  };

  const logout = async () => {
    await signOut({ callbackUrl: `${window.location.origin}/login` });
  };

  const saveBlog = async () => {
    if (!blogForm) return;
    setSaving(true);
    const post = {
      ...blogForm,
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
    setPosts((p) => p.filter((x) => x._id !== id));
    toast("Post deleted.");
  };
  const saveJob = async () => {
    if (!jobForm) return;
    setSaving(true);
    await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        editJobId ? { ...jobForm, _id: editJobId } : jobForm,
      ),
    });
    await loadJobs();
    setJobForm(null);
    setEditJobId(null);
    setSaving(false);
    toast("Job saved!");
  };

  const deleteJob = async (id: string) => {
    if (!confirm("Delete this vacancy?")) return;
    await fetch("/api/jobs", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setJobs((p) => p.filter((j) => j._id !== id));
    toast("Vacancy deleted.");
  };

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
    setProducts((p) => p.filter((x) => x._id !== id));
    toast("Product deleted.");
  };

  const clearError = (field: keyof ProductErrors) => {
    if (productErrors[field]) {
      setProductErrors((e) => ({ ...e, [field]: undefined }));
    }
  };

  const saveAdmin = async () => {
    if (!adminForm) return;
    const isEdit = !!editAdminId;
    const errs = validateAdmin(adminForm, isEdit);
    if (Object.keys(errs).length > 0) {
      setAdminErrors(errs);
      return;
    }
    setAdminErrors({});
    setSavingAdmin(true);
    try {
      if (isEdit) {
        const patch: Record<string, string> = {
          id: editAdminId,
          name: adminForm.name,
          email: adminForm.email,
          role: adminForm.role,
        };
        if (adminForm.password) patch.password = adminForm.password;
        const res = await fetch("/api/user", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(patch),
        });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Failed to update admin");
        }
        setAdminForm(null);
        setEditAdminId(null);
        toast(`${adminForm.name}'s details have been updated.`);
        await loadAdmins();
      } else {
        const res = await fetch("/api/user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(adminForm),
        });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Failed to create admin");
        }
        setAdminForm(null);
        setEditAdminId(null);
        toast(`${adminForm.name}'s admin account has been created!`);
        await loadAdmins();
      }
    } catch (err: any) {
      setAdminErrors({ email: err.message });
    } finally {
      setSavingAdmin(false);
    }
  };

  const deleteAdmin = async (id: string) => {
    if (!isTrueSuperadmin) {
      toast("Only the designated Super Admin can delete admin accounts.");
      return;
    }
    if (!confirm("Delete this admin account? This cannot be undone.")) return;
    try {
      const res = await fetch("/api/user", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("Failed to delete admin");
      setAdmins((prev) => prev.filter((a) => a._id !== id));
      toast("Admin account deleted.");
    } catch (err) {
      console.error(err);
      toast("Failed to delete admin. Please try again.");
    }
  };

  const changeAdminPassword = async (id: string, newPassword: string) => {
    const res = await fetch("/api/user", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, password: newPassword }),
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || "Failed to update password");
    }
  };

  const changeAdminUsername = async (id: string, newName: string) => {
    const res = await fetch("/api/user", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, name: newName }),
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || "Failed to update name");
    }
    setAdmins((prev) =>
      prev.map((a) => (a._id === id ? { ...a, name: newName } : a)),
    );
    if (id === currentUserId) {
      setDisplayName(newName);
      try {
        await updateSession({ name: newName });
      } catch {
        // Non-fatal — displayName is already updated locally.
      }
    }
  };

  const handleSidebarChangePassword = () => {
    setTab("myaccount");
  };

  const handleSidebarChangeUsername = () => {
    setTab("myaccount");
  };

  const markRead = async (id: string) => {
    const m = messages.find((m) => m._id === id);
    if (!m) return;
    await fetch("/api/messages", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...m, read: true }),
    });
    setMessages((prev) =>
      prev.map((m) => (m._id === id ? { ...m, read: true } : m)),
    );
    setUnread((n) => Math.max(0, n - 1));
  };

  const deleteMessage = async (id: string, fromArchive = false) => {
    if (!confirm("Delete this message?")) return;
    const wasUnread = messages.find((m) => m._id === id)?.read === false;
    await fetch("/api/messages", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (fromArchive) {
      setArchivedMessages((prev) => prev.filter((m) => m._id !== id));
    } else {
      setMessages((prev) => prev.filter((m) => m._id !== id));
      if (wasUnread) setUnread((n) => Math.max(0, n - 1));
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

  const openBell = () => {
    setMsgPanelOpen(true);
    setEllipsisOpen(false);
    loadMessages();
  };

  const handleNewBlog = () => {
    setTab("blog");
    setBlogForm(emptyBlog());
    setOpen(false);
  };

  const handleNewProduct = () => {
    setTab("products");
    setProductForm(emptyProduct());
    setOpen(false);
  };

  const handleNewAdmin = () => {
    setAdminForm(emptyAdmin());
    setEditAdminId(null);
    setAdminErrors({});
    setOpen(false);
  };

  // ─── Render ───────────────────────────────────────────────────────────────

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
          .admin-main { margin-left: 240px !important; }
        }

        @media (max-width: 767px) {
          .admin-sidebar-desktop { display: none !important; }
          .admin-topbar { display: flex !important; }
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
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
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
          padding: 0 18px;
        }

        .sd-action:hover { opacity: 0.8; }

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

        .sd-close:hover { color: white; }

        .msg-item:hover { background: #f9fafb !important; }
      `}</style>

      <AdminSidebar
        tab={tab}
        unread={unread}
        navTo={navTo}
        onBell={openBell}
        role={role}
        onLogout={() => setShowLogoutModal(true)}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        userName={displayName || session.user?.name || ""}
        onChangePassword={handleSidebarChangePassword}
        onChangeUsername={handleSidebarChangeUsername}
      />

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

      <AdminContentTabs
        tab={tab}
        role={role}
        currentUserId={currentUserId}
        isTrueSuperadmin={isTrueSuperadmin}
        jobs={jobs}
        jobForm={jobForm}
        setJobForm={setJobForm}
        saveJob={saveJob}
        deleteJob={deleteJob}
        editJobId={editJobId}
        setEditJobId={setEditJobId}
        posts={posts}
        products={products}
        admins={admins}
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
        deleteAdmin={deleteAdmin}
        changeAdminPassword={changeAdminPassword}
        changeAdminUsername={changeAdminUsername}
        clearError={clearError}
        toast={toast}
        onOpenCreateAdmin={(admin) => {
          if (admin) {
            setAdminForm({
              name: admin.name,
              email: admin.email,
              password: "",
              role: admin.role as Role,
            });
            setEditAdminId(admin._id);
          } else {
            setAdminForm(emptyAdmin());
            setEditAdminId(null);
          }
          setAdminErrors({});
        }}
      />

      {/* ── Create Admin Modal ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {adminForm && (
          <motion.div
            key="admin-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.4)",
              zIndex: 300,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px 16px",
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setAdminForm(null);
                setEditAdminId(null);
                setAdminErrors({});
              }
            }}
          >
            <motion.div
              key="admin-modal"
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              style={{
                background: "white",
                width: "100%",
                maxWidth: 480,
                padding: "32px 28px",
                boxShadow: "0 20px 80px rgba(0,0,0,0.2)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 24,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <UserPlus size={18} color="var(--charcoal)" />
                  <h2
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                      fontSize: "1.7rem",
                      fontWeight: 600,
                      color: "var(--charcoal)",
                      margin: 0,
                    }}
                  >
                    {editAdminId ? "Edit Admin" : "New Admin"}
                  </h2>
                </div>
                <button
                  onClick={() => {
                    setAdminForm(null);
                    setEditAdminId(null);
                    setAdminErrors({});
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--text-muted)",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <X size={20} />
                </button>
              </div>

              <div style={{ display: "grid", gap: 18 }}>
                <div>
                  <label style={LABEL_STYLE}>Full Name *</label>
                  <input
                    value={adminForm.name}
                    onChange={(e) => {
                      setAdminForm({ ...adminForm, name: e.target.value });
                      if (adminErrors.name)
                        setAdminErrors((er) => ({ ...er, name: undefined }));
                    }}
                    style={adminErrors.name ? INPUT_ERROR_STYLE : INPUT_STYLE}
                    placeholder="Jane Smith"
                  />
                  {adminErrors.name && (
                    <span style={ERROR_TEXT}>{adminErrors.name}</span>
                  )}
                </div>

                <div>
                  <label style={LABEL_STYLE}>Email Address *</label>
                  <input
                    type="email"
                    value={adminForm.email}
                    onChange={(e) => {
                      setAdminForm({ ...adminForm, email: e.target.value });
                      if (adminErrors.email)
                        setAdminErrors((er) => ({ ...er, email: undefined }));
                    }}
                    style={adminErrors.email ? INPUT_ERROR_STYLE : INPUT_STYLE}
                    placeholder="jane@example.com"
                  />
                  {adminErrors.email && (
                    <span style={ERROR_TEXT}>{adminErrors.email}</span>
                  )}
                </div>

                <div>
                  <label style={LABEL_STYLE}>
                    Password{" "}
                    {editAdminId ? "(leave blank to keep current)" : "*"}
                  </label>
                  <input
                    type="password"
                    value={adminForm.password}
                    onChange={(e) => {
                      setAdminForm({ ...adminForm, password: e.target.value });
                      if (adminErrors.password)
                        setAdminErrors((er) => ({
                          ...er,
                          password: undefined,
                        }));
                    }}
                    style={
                      adminErrors.password ? INPUT_ERROR_STYLE : INPUT_STYLE
                    }
                    placeholder={
                      editAdminId
                        ? "Leave blank to keep unchanged"
                        : "Minimum 8 characters"
                    }
                  />
                  {adminErrors.password && (
                    <span style={ERROR_TEXT}>{adminErrors.password}</span>
                  )}
                </div>

                <div>
                  <label style={LABEL_STYLE}>Role *</label>
                  <select
                    value={adminForm.role}
                    onChange={(e) =>
                      setAdminForm({
                        ...adminForm,
                        role: e.target.value as Role,
                      })
                    }
                    style={INPUT_STYLE}
                  >
                    <option value="admin">Admin — Content Manager</option>
                    <option value="superadmin">Superadmin — Full Access</option>
                  </select>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: 12,
                    justifyContent: "flex-end",
                    paddingTop: 4,
                  }}
                >
                  <button
                    onClick={() => {
                      setAdminForm(null);
                      setEditAdminId(null);
                      setAdminErrors({});
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
                    onClick={saveAdmin}
                    disabled={savingAdmin}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "10px 24px",
                      background: savingAdmin
                        ? "var(--text-muted)"
                        : "var(--charcoal)",
                      color: "white",
                      border: "none",
                      cursor: savingAdmin ? "not-allowed" : "pointer",
                      fontFamily: "DM Sans",
                      fontSize: "0.85rem",
                    }}
                  >
                    <Save size={15} />
                    {savingAdmin
                      ? editAdminId
                        ? "Saving..."
                        : "Creating..."
                      : editAdminId
                        ? "Save Changes"
                        : "Create Admin"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Logout Modal ───────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showLogoutModal && (
          <motion.div
            key="logout-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowLogoutModal(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.4)",
              zIndex: 400,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px 16px",
            }}
          >
            <motion.div
              key="logout-modal"
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "white",
                width: "100%",
                maxWidth: 380,
                padding: "32px 28px",
                boxShadow: "0 20px 80px rgba(0,0,0,0.2)",
              }}
            >
              <h2
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "1.6rem",
                  fontWeight: 600,
                  color: "var(--charcoal)",
                  margin: "0 0 8px",
                }}
              >
                Sign out?
              </h2>
              <p
                style={{
                  fontFamily: "DM Sans",
                  fontSize: "0.85rem",
                  color: "var(--text-muted)",
                  margin: "0 0 28px",
                }}
              >
                Log out <strong>{displayName || session.user?.name}</strong>{" "}
                from this session? You'll be redirected to the login page.
              </p>
              <div
                style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}
              >
                <button
                  onClick={() => setShowLogoutModal(false)}
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
                  onClick={logout}
                  style={{
                    padding: "10px 24px",
                    background: "#c0392b",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "DM Sans",
                    fontSize: "0.85rem",
                  }}
                >
                  Sign Out
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FAB + Toast ────────────────────────────────────────────────────── */}
      <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 999 }}>
        <AnimatePresence>
          {open &&
            (() => {
              const actions = [
                {
                  label: "New Blog Post",
                  icon: <FileText size={18} />,
                  onClick: handleNewBlog,
                },
                {
                  label: "New Product",
                  icon: <Package size={18} />,
                  onClick: handleNewProduct,
                },
                {
                  label: "New Vacancy",
                  icon: <Briefcase size={18} />,
                  onClick: () => {
                    setJobForm(emptyJob());
                    setTab("jobs");
                    setOpen(false);
                  },
                },
                ...(role === "superadmin"
                  ? [
                      {
                        label: "New Admin",
                        icon: <UserPlus size={18} />,
                        onClick: handleNewAdmin,
                      },
                    ]
                  : []),
              ];

              const RADIUS = 90;
              const START_ANGLE = 270;
              const END_ANGLE = 180;
              const FAB_CENTER = 26;

              return actions.map((action, i) => {
                const total = actions.length - 1 || 1;
                const angle =
                  START_ANGLE - (i / total) * (START_ANGLE - END_ANGLE);
                const rad = (angle * Math.PI) / 180;
                const x = Math.cos(rad) * RADIUS - 24 + FAB_CENTER;
                const y = Math.sin(rad) * RADIUS - 24 + FAB_CENTER;

                return (
                  <motion.div
                    key={action.label}
                    initial={{ opacity: 0, scale: 0.3 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.3 }}
                    transition={{
                      type: "spring",
                      damping: 20,
                      stiffness: 260,
                      delay: i * 0.05,
                    }}
                    style={{
                      position: "absolute",
                      bottom: -y,
                      right: -x,
                    }}
                  >
                    <div style={{ position: "relative" }}>
                      <button
                        onClick={action.onClick}
                        title={action.label}
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: "50%",
                          background: "white",
                          border: "none",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "var(--charcoal)",
                          boxShadow: "0 2px 14px rgba(0,0,0,0.13)",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = "#f3f4f6")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "white")
                        }
                      >
                        {action.icon}
                      </button>
                    </div>
                  </motion.div>
                );
              });
            })()}
        </AnimatePresence>

        {/* Toast + FAB share the same pill container */}
        <motion.div
          animate={{ width: toastVisible && !open ? "auto" : 52 }}
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
            position: "relative",
            zIndex: 1,
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {!open && toastVisible ? (
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
            ) : (
              <motion.button
                key="fab"
                animate={{ rotate: open ? 45 : 0 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                onClick={() => setOpen((o) => !o)}
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
                  fontSize: "1.5rem",
                  lineHeight: 1,
                }}
              >
                +
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
