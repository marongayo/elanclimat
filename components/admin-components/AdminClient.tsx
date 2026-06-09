// components/admin-components/AdminClient.tsx
"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

import type { BlogPost, BlogForm } from "@/lib/types/blog";
import type { Product, ProductForm, ProductErrors } from "@/lib/types/product";
import type { User, Tab, Role, AdminForm, AdminFormErrors } from "@/lib/types/admin";
import type { Message } from "@/lib/types/message";
import type { Job, JobForm } from "@/lib/types/jobs";

import AdminSidebar from "@/components/admin-components/AdminSidebar";
import AdminMessagesPanel from "@/components/admin-components/AdminMessagesPanel";
import AdminContentTabs from "@/components/admin-components/AdminContentTabs";
import { AdminFab } from "@/components/admin-components/AdminFab";
import { AdminLogoutModal } from "@/components/admin-components/AdminLogoutModal";
import { AdminCreateAdminModal } from "@/components/admin-components/AdminCreateAdminModal";

// ── Helpers ──────────────────────────────────────────────────────────────────

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
  const { data: session, status, update: updateSession } = useSession();

  // ── UI state ──────────────────────────────────────────────────────────────
  const [tab, setTab] = useState<Tab>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [displayName, setDisplayName] = useState("");

  // ── Data ──────────────────────────────────────────────────────────────────
  const [posts, setPosts] = useState(initialPosts);
  const [products, setProducts] = useState(initialProducts);
  const [admins, setAdmins] = useState<User[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);

  // ── Forms ─────────────────────────────────────────────────────────────────
  const [blogForm, setBlogForm] = useState<BlogForm | null>(null);
  const [productForm, setProductForm] = useState<ProductForm | null>(null);
  const [productErrors, setProductErrors] = useState<ProductErrors>({});
  const [adminForm, setAdminForm] = useState<AdminForm | null>(null);
  const [adminErrors, setAdminErrors] = useState<AdminFormErrors>({});
  const [editAdminId, setEditAdminId] = useState<string | null>(null);
  const [savingAdmin, setSavingAdmin] = useState(false);
  const [jobForm, setJobForm] = useState<JobForm | null>(null);
  const [editJobId, setEditJobId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadingBlog, setUploadingBlog] = useState(false);
  const [uploadingProduct, setUploadingProduct] = useState(false);

  // ── Messages ──────────────────────────────────────────────────────────────
  const [messages, setMessages] = useState<Message[]>([]);
  const [unread, setUnread] = useState(0);
  const [archivedMessages, setArchivedMessages] = useState<Message[]>([]);
  const [showingArchive, setShowingArchive] = useState(false);
  const [archiveLoaded, setArchiveLoaded] = useState(false);
  const [loadingArchive, setLoadingArchive] = useState(false);
  const [msgPanelOpen, setMsgPanelOpen] = useState(false);
  const [ellipsisOpen, setEllipsisOpen] = useState(false);

  // ── Data loaders ──────────────────────────────────────────────────────────

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

  // ── Effects ───────────────────────────────────────────────────────────────

  useEffect(() => {
    loadMessages();
    const interval = setInterval(loadMessages, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (status === "authenticated") loadAdmins();
  }, [status]);

  useEffect(() => {
    if (session?.user?.name) setDisplayName(session.user.name);
  }, [session?.user?.name]);

  useEffect(() => {
    const userId = session?.user?.id;
    if (!displayName && admins.length > 0 && userId) {
      const me = admins.find((a) => a._id === userId);
      if (me?.name) setDisplayName(me.name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [admins]);

  useEffect(() => { loadJobs(); }, []);

  // ── Early returns ─────────────────────────────────────────────────────────

  if (status === "loading") {
    return (
      <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", fontFamily: "DM Sans", background: "var(--warm-white)" }}>
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
      (dbRecord?.email ?? "").trim().toLowerCase() === "superadmin@elanclinat.co.ke");

  // ── Toast ─────────────────────────────────────────────────────────────────

  const toast = (m: string) => {
    setToastMsg(m);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
      setTimeout(() => setToastMsg(""), 400);
    }, 3100);
  };

  // ── CRUD Handlers ─────────────────────────────────────────────────────────

  const saveBlog = async () => {
    if (!blogForm) return;
    setSaving(true);
    const post = {
      ...blogForm,
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
    setPosts((p) => p.filter((x) => x._id !== id));
    toast("Post deleted.");
  };

  const saveJob = async () => {
    if (!jobForm) return;
    setSaving(true);
    await fetch("/api/jobs", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(editJobId ? { ...jobForm, _id: editJobId } : jobForm) });
    await loadJobs();
    setJobForm(null);
    setEditJobId(null);
    setSaving(false);
    toast("Job saved!");
  };

  const deleteJob = async (id: string) => {
    if (!confirm("Delete this vacancy?")) return;
    await fetch("/api/jobs", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    setJobs((p) => p.filter((j) => j._id !== id));
    toast("Vacancy deleted.");
  };

  const saveProduct = async () => {
    if (!productForm) return;
    const errs = validateProduct(productForm);
    if (Object.keys(errs).length > 0) {
      setProductErrors(errs);
      setTimeout(() => document.querySelector("[data-product-error]")?.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
      return;
    }
    setProductErrors({});
    setSaving(true);
    const product = { ...productForm, price: parseFloat(productForm.price) || 0 };
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
    setProducts((p) => p.filter((x) => x._id !== id));
    toast("Product deleted.");
  };

  const clearError = (field: keyof ProductErrors) => {
    if (productErrors[field]) setProductErrors((e) => ({ ...e, [field]: undefined }));
  };

  const saveAdmin = async () => {
    if (!adminForm) return;
    const isEdit = !!editAdminId;
    const errs = validateAdmin(adminForm, isEdit);
    if (Object.keys(errs).length > 0) { setAdminErrors(errs); return; }
    setAdminErrors({});
    setSavingAdmin(true);
    try {
      if (isEdit) {
        const patch: Record<string, string> = { id: editAdminId, name: adminForm.name, email: adminForm.email, role: adminForm.role };
        if (adminForm.password) patch.password = adminForm.password;
        const res = await fetch("/api/user", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(patch) });
        if (!res.ok) { const d = await res.json(); throw new Error(d.error || "Failed to update admin"); }
        toast(`${adminForm.name}'s details have been updated.`);
      } else {
        const res = await fetch("/api/user", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(adminForm) });
        if (!res.ok) { const d = await res.json(); throw new Error(d.error || "Failed to create admin"); }
        toast(`${adminForm.name}'s admin account has been created!`);
      }
      setAdminForm(null);
      setEditAdminId(null);
      await loadAdmins();
    } catch (err: any) {
      setAdminErrors({ email: err.message });
    } finally {
      setSavingAdmin(false);
    }
  };

  const deleteAdmin = async (id: string) => {
    if (!isTrueSuperadmin) { toast("Only the designated Super Admin can delete admin accounts."); return; }
    if (!confirm("Delete this admin account? This cannot be undone.")) return;
    try {
      const res = await fetch("/api/user", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
      if (!res.ok) throw new Error("Failed to delete admin");
      setAdmins((prev) => prev.filter((a) => a._id !== id));
      toast("Admin account deleted.");
    } catch (err) {
      console.error(err);
      toast("Failed to delete admin. Please try again.");
    }
  };

  const changeAdminPassword = async (id: string, newPassword: string) => {
    const res = await fetch("/api/user", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, password: newPassword }) });
    if (!res.ok) { const d = await res.json(); throw new Error(d.error || "Failed to update password"); }
  };

  const changeAdminUsername = async (id: string, newName: string) => {
    const res = await fetch("/api/user", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, name: newName }) });
    if (!res.ok) { const d = await res.json(); throw new Error(d.error || "Failed to update name"); }
    setAdmins((prev) => prev.map((a) => (a._id === id ? { ...a, name: newName } : a)));
    if (id === currentUserId) {
      setDisplayName(newName);
      try { await updateSession({ name: newName }); } catch { /* non-fatal */ }
    }
  };

  const markRead = async (id: string) => {
    const m = messages.find((m) => m._id === id);
    if (!m) return;
    await fetch("/api/messages", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...m, read: true }) });
    setMessages((prev) => prev.map((m) => (m._id === id ? { ...m, read: true } : m)));
    setUnread((n) => Math.max(0, n - 1));
  };

  const deleteMessage = async (id: string, fromArchive = false) => {
    if (!confirm("Delete this message?")) return;
    const wasUnread = messages.find((m) => m._id === id)?.read === false;
    await fetch("/api/messages", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    if (fromArchive) {
      setArchivedMessages((prev) => prev.filter((m) => m._id !== id));
    } else {
      setMessages((prev) => prev.filter((m) => m._id !== id));
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

  // ── Render ────────────────────────────────────────────────────────────────

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
        .msg-item:hover { background: #f9fafb !important; }
      `}</style>

      <AdminSidebar
        tab={tab}
        unread={unread}
        navTo={(t) => { setTab(t); setSidebarOpen(false); }}
        onBell={() => { setMsgPanelOpen(true); setEllipsisOpen(false); loadMessages(); }}
        role={role}
        onLogout={() => setShowLogoutModal(true)}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        userName={displayName || session.user?.name || ""}
        onChangePassword={() => setTab("myaccount")}
        onChangeUsername={() => setTab("myaccount")}
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
        editJobId={editJobId}
        setEditJobId={setEditJobId}
        saveJob={saveJob}
        deleteJob={deleteJob}
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
            setAdminForm({ name: admin.name, email: admin.email, password: "", role: admin.role as Role });
            setEditAdminId(admin._id);
          } else {
            setAdminForm(emptyAdmin());
            setEditAdminId(null);
          }
          setAdminErrors({});
        }}
      />

      <AdminCreateAdminModal
        adminForm={adminForm}
        adminErrors={adminErrors}
        editAdminId={editAdminId}
        savingAdmin={savingAdmin}
        onClose={() => { setAdminForm(null); setEditAdminId(null); setAdminErrors({}); }}
        onSave={saveAdmin}
        onChange={setAdminForm}
        onErrorClear={(field) => setAdminErrors((e) => ({ ...e, [field]: undefined }))}
      />

      <AdminLogoutModal
        open={showLogoutModal}
        displayName={displayName || session.user?.name || ""}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={() => signOut({ callbackUrl: `${window.location.origin}/login` })}
      />

      <AdminFab
        toastVisible={toastVisible}
        toastMsg={toastMsg}
        role={role}
        onNewBlog={() => { setTab("blog"); setBlogForm(emptyBlog()); }}
        onNewProduct={() => { setTab("products"); setProductForm(emptyProduct()); }}
        onNewVacancy={() => { setJobForm(emptyJob()); setTab("jobs"); }}
        onNewAdmin={() => { setAdminForm(emptyAdmin()); setEditAdminId(null); setAdminErrors({}); }}
      />
    </div>
  );
}
