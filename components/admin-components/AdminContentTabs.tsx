// components/admin-components/AdminContentTabs.tsx
"use client";

import type { Job, JobForm } from "@/lib/types/jobs";
import type { BlogPost, BlogForm } from "@/lib/types/blog";
import type { Product } from "@/lib/types/product";
import type { ProductForm, ProductErrors } from "@/lib/types/product";
import type { User, Tab, Role, AdminForm, AdminFormErrors } from "@/lib/types/admin";
import { AdminDashboardTab } from "./AdminDashboardTab";
import { AdminBlogTab } from "./AdminBlogTab";
import { AdminJobsTab } from "./AdminJobsTab";
import { AdminProductsTab } from "./AdminProductsTab";
import { AdminAdminsTab } from "./AdminAdminsTab";
import { AdminMyAccountTab } from "./AdminMyAccountTab";

export default function AdminContentTabs({
  tab,
  role,
  currentUserId,
  isTrueSuperadmin,
  userName,
  jobs,
  jobForm,
  setJobForm,
  editJobId,
  setEditJobId,
  saveJob,
  deleteJob,
  posts,
  products,
  admins,
  blogForm,
  setBlogForm,
  productForm,
  setProductForm,
  productErrors,
  setProductErrors,
  saving,
  uploadingBlog,
  setUploadingBlog,
  uploadingProduct,
  setUploadingProduct,
  saveBlog,
  deleteBlog,
  saveProduct,
  deleteProduct,
  deleteAdmin,
  changeAdminPassword,
  changeAdminUsername,
  clearError,
  toast,
  onOpenCreateAdmin,
}: {
  tab: Tab;
  role: Role;
  currentUserId: string;
  isTrueSuperadmin: boolean;
  userName: string;
  jobs: Job[];
  jobForm: JobForm | null;
  setJobForm: (f: JobForm | null) => void;
  editJobId: string | null;
  setEditJobId: (id: string | null) => void;
  saveJob: () => void;
  deleteJob: (id: string) => void;
  posts: BlogPost[];
  products: Product[];
  admins: User[];
  blogForm: BlogForm | null;
  setBlogForm: (f: BlogForm | null) => void;
  productForm: ProductForm | null;
  setProductForm: (
    f: ProductForm | ((prev: ProductForm | null) => ProductForm | null) | null,
  ) => void;
  productErrors: ProductErrors;
  setProductErrors: (e: ProductErrors) => void;
  saving: boolean;
  uploadingBlog: boolean;
  setUploadingBlog: (v: boolean) => void;
  uploadingProduct: boolean;
  setUploadingProduct: (v: boolean) => void;
  saveBlog: () => void;
  deleteBlog: (id: string) => void;
  saveProduct: () => void;
  deleteProduct: (id: string) => void;
  deleteAdmin: (id: string) => void;
  changeAdminPassword: (id: string, newPassword: string) => Promise<void>;
  changeAdminUsername: (id: string, newName: string) => Promise<void>;
  clearError: (field: keyof ProductErrors) => void;
  toast: (msg: string) => void;
  onOpenCreateAdmin: (admin?: {
    _id: string;
    name: string;
    email: string;
    role: string;
  }) => void;
}) {
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

  const currentAdmin = admins.find((a) => a._id === currentUserId);

  return (
    <main
      className="admin-main"
      style={{
        marginLeft: 220,
        flex: 1,
        padding: "40px 48px",
        minHeight: "100vh",
        background: "#f9f7f4",
      }}
    >
      {tab === "dashboard" && (
        <AdminDashboardTab
          posts={posts}
          products={products}
          admins={admins}
          jobs={jobs}
          role={role}
          userName={userName}
        />
      )}

      {tab === "blog" && (
        <AdminBlogTab
          posts={posts}
          blogForm={blogForm}
          setBlogForm={setBlogForm}
          saving={saving}
          uploadingBlog={uploadingBlog}
          setUploadingBlog={setUploadingBlog}
          saveBlog={saveBlog}
          deleteBlog={deleteBlog}
          uploadImage={uploadImage}
        />
      )}

      {tab === "jobs" && (
        <AdminJobsTab
          jobs={jobs}
          jobForm={jobForm}
          setJobForm={setJobForm}
          editJobId={editJobId}
          setEditJobId={setEditJobId}
          saveJob={saveJob}
          deleteJob={deleteJob}
          saving={saving}
        />
      )}

      {tab === "products" && (
        <AdminProductsTab
          products={products}
          productForm={productForm}
          setProductForm={setProductForm}
          productErrors={productErrors}
          setProductErrors={setProductErrors}
          saving={saving}
          uploadingProduct={uploadingProduct}
          setUploadingProduct={setUploadingProduct}
          saveProduct={saveProduct}
          deleteProduct={deleteProduct}
          clearError={clearError}
          toast={toast}
        />
      )}

      {tab === "admins" && role === "superadmin" && (
        <AdminAdminsTab
          admins={admins}
          currentUserId={currentUserId}
          isTrueSuperadmin={isTrueSuperadmin}
          deleteAdmin={deleteAdmin}
          changeAdminPassword={changeAdminPassword}
          changeAdminUsername={changeAdminUsername}
          onOpenCreateAdmin={onOpenCreateAdmin}
          toast={toast}
        />
      )}

      {tab === "myaccount" && (
        <AdminMyAccountTab
          currentAdmin={currentAdmin}
          role={role}
          changeAdminPassword={changeAdminPassword}
          changeAdminUsername={changeAdminUsername}
          toast={toast}
        />
      )}
    </main>
  );
}
