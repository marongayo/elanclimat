"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { BlogPost } from "@/lib/types/blog";
import { User } from "@/lib/types/admin";
import { Product } from "@/lib/types/product";
import {
  Trash2,
  Edit3,
  X,
  Save,
  FileText,
  Package,
  Eye,
  Users,
  KeyRound,
  ShieldCheck,
  Shield,
} from "lucide-react";
import Link from "next/link";
import Modal from "@/components/Modal";
import type { BlogForm } from "@/lib/types/blog";
import type { ProductForm, ProductErrors } from "@/lib/types/product";
import type { Tab } from "@/lib/types/admin";
import type { Role } from "@/lib/types/admin";

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

export default function AdminContentTabs({
  tab,
  role,
  currentUserId,
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
  clearError,
  toast,
}: {
  tab: Tab;
  role: Role;
  currentUserId: string;
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
  clearError: (field: keyof ProductErrors) => void;
  toast: (msg: string) => void;
}) {
  const imgUrlRef = useRef<HTMLInputElement>(null);

  // ── Password change modal state ──────────────────────────────────────────
  const [pwTarget, setPwTarget] = useState<User | null>(null);
  const [pwValue, setPwValue] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");
  const [pwError, setPwError] = useState("");
  const [pwSaving, setPwSaving] = useState(false);

  const openPasswordModal = (admin: User) => {
    setPwTarget(admin);
    setPwValue("");
    setPwConfirm("");
    setPwError("");
  };

  const closePasswordModal = () => {
    setPwTarget(null);
    setPwValue("");
    setPwConfirm("");
    setPwError("");
  };

  const submitPassword = async () => {
    if (pwValue.length < 8) {
      setPwError("Password must be at least 8 characters.");
      return;
    }
    if (pwValue !== pwConfirm) {
      setPwError("Passwords do not match.");
      return;
    }
    setPwSaving(true);
    try {
      await changeAdminPassword(pwTarget!._id, pwValue);
      toast("Password updated successfully.");
      closePasswordModal();
    } catch {
      setPwError("Failed to update password. Please try again.");
    } finally {
      setPwSaving(false);
    }
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

  return (
    <main
      className="admin-main"
      style={{
        marginLeft: 220,
        flex: 1,
        padding: "32px 40px",
        minHeight: "100vh",
      }}
    >
      {/* ── DASHBOARD ────────────────────────────────────────────────────── */}
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
              ...(role === "superadmin"
                ? [
                    {
                      label: "Admins",
                      value: admins.length,
                      color: "var(--charcoal)",
                      icon: <Users size={22} />,
                    },
                  ]
                : []),
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  background: "white",
                  padding: "24px 20px",
                  borderLeft: `3px solid ${s.color}`,
                }}
              >
                <div style={{ color: s.color, marginBottom: 12 }}>{s.icon}</div>
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

      {/* ── BLOG ─────────────────────────────────────────────────────────── */}
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
              title={blogForm._id ? "Edit Blog Post" : "New Blog Post"}
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
                    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
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
                            setBlogForm(
                              blogForm ? { ...blogForm, image: url } : null,
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
                key={p._id}
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
                  <div
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
                  </div>
                  <div
                    onClick={() => deleteBlog(p._id)}
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
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── PRODUCTS ─────────────────────────────────────────────────────── */}
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
                    {productForm._id ? "Edit" : "New"} Product
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
                  {/* Short Name */}
                  <div>
                    <label style={LABEL_STYLE}>Short Name *</label>
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
                      placeholder="EcoBreeze Heat Pump"
                    />
                    {productErrors.name && (
                      <span style={ERROR_TEXT}>{productErrors.name}</span>
                    )}
                  </div>

                  {/* Full Name */}
                  <div>
                    <label style={LABEL_STYLE}>Full Product Name</label>
                    <input
                      value={productForm.fullName}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          fullName: e.target.value,
                        })
                      }
                      style={INPUT_STYLE}
                      placeholder="LG 3.5kW Inverter Split Air Conditioner S3-W12JA3AA"
                    />
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
                          productErrors.price ? INPUT_ERROR_STYLE : INPUT_STYLE
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
                        <span style={ERROR_TEXT}>{productErrors.category}</span>
                      )}
                    </div>
                  </div>

                  {/* Description */}
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

                  {/* Key Features / Highlights */}
                  {/* Key Features */}
                  <div>
                    <label style={LABEL_STYLE}>Key Features</label>
                    {productForm.keyFeatures.map((item, i) => (
                      <div
                        key={i}
                        style={{ display: "flex", gap: 6, marginBottom: 6 }}
                      >
                        <input
                          value={item}
                          onChange={(e) => {
                            const updated = [...productForm.keyFeatures];
                            updated[i] = e.target.value;
                            setProductForm({
                              ...productForm,
                              keyFeatures: updated,
                            });
                          }}
                          style={{ ...INPUT_STYLE, flex: 1 }}
                          placeholder={`e.g. Inverter compressor for energy efficiency`}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setProductForm({
                              ...productForm,
                              keyFeatures: productForm.keyFeatures.filter(
                                (_, j) => j !== i,
                              ),
                            })
                          }
                          style={{
                            padding: "0 10px",
                            background: "#fef2f2",
                            border: "none",
                            cursor: "pointer",
                            color: "#c0392b",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <X size={13} />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() =>
                        setProductForm({
                          ...productForm,
                          keyFeatures: [...productForm.keyFeatures, ""],
                        })
                      }
                      style={{
                        marginTop: 4,
                        padding: "8px 14px",
                        background: "none",
                        border: "1px dashed var(--off-white)",
                        cursor: "pointer",
                        fontFamily: "DM Sans",
                        fontSize: "0.78rem",
                        color: "var(--text-muted)",
                        width: "100%",
                      }}
                    >
                      + Add Feature
                    </button>
                  </div>

                  {/* Technical Specifications */}
                  <div>
                    <label style={LABEL_STYLE}>Technical Specifications</label>
                    {productForm.specifications.map((spec, i) => (
                      <div
                        key={i}
                        style={{ display: "flex", gap: 6, marginBottom: 6 }}
                      >
                        <input
                          value={spec.key}
                          onChange={(e) => {
                            const updated = [...productForm.specifications];
                            updated[i] = { ...updated[i], key: e.target.value };
                            setProductForm({
                              ...productForm,
                              specifications: updated,
                            });
                          }}
                          style={{ ...INPUT_STYLE, flex: 1 }}
                          placeholder="e.g. Cooling Capacity"
                        />
                        <input
                          value={spec.value}
                          onChange={(e) => {
                            const updated = [...productForm.specifications];
                            updated[i] = {
                              ...updated[i],
                              value: e.target.value,
                            };
                            setProductForm({
                              ...productForm,
                              specifications: updated,
                            });
                          }}
                          style={{ ...INPUT_STYLE, flex: 2 }}
                          placeholder="e.g. 12,000 BTU"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setProductForm({
                              ...productForm,
                              specifications: productForm.specifications.filter(
                                (_, j) => j !== i,
                              ),
                            })
                          }
                          style={{
                            padding: "0 10px",
                            background: "#fef2f2",
                            border: "none",
                            cursor: "pointer",
                            color: "#c0392b",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <X size={13} />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() =>
                        setProductForm({
                          ...productForm,
                          specifications: [
                            ...productForm.specifications,
                            { key: "", value: "" },
                          ],
                        })
                      }
                      style={{
                        marginTop: 4,
                        padding: "8px 14px",
                        background: "none",
                        border: "1px dashed var(--off-white)",
                        cursor: "pointer",
                        fontFamily: "DM Sans",
                        fontSize: "0.78rem",
                        color: "var(--text-muted)",
                        width: "100%",
                      }}
                    >
                      + Add Specification
                    </button>
                  </div>

                  {/* Images */}
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

                    <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
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
                key={p._id}
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
                      marginBottom: 2,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {p.name}
                  </div>
                  {p.fullName && (
                    <div
                      style={{
                        fontFamily: "DM Sans",
                        fontSize: "0.68rem",
                        color: "var(--text-muted)",
                        marginBottom: 4,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {p.fullName}
                    </div>
                  )}
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
                      onClick={() =>
                        setProductForm({
                          _id: p._id,
                          name: p.name,
                          fullName: p.fullName ?? "",
                          price: String(p.price),
                          category: p.category,
                          images: p.images ?? [],
                          description: p.description,
                          keyFeatures: p.keyFeatures ?? [],
                          specifications: p.specifications ?? [],
                          inStock: p.inStock,
                          badge: p.badge ?? "",
                        })
                      }
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
                      onClick={() => deleteProduct(p._id)}
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

      {/* ── ADMINS ───────────────────────────────────────────────────────── */}
      {tab === "admins" && (
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
              Admins
            </h1>
            <p
              style={{
                fontFamily: "DM Sans",
                fontSize: "0.85rem",
                color: "var(--text-muted)",
                marginTop: 4,
              }}
            >
              {admins.length} {admins.length === 1 ? "user" : "users"} with
              admin access
            </p>
          </div>

          {pwTarget && (
            <Modal
              open={!!pwTarget}
              onClose={closePasswordModal}
              title={`Change Password — ${pwTarget.name}`}
              maxWidth={440}
            >
              <div style={{ display: "grid", gap: 16 }}>
                <div>
                  <label style={LABEL_STYLE}>New Password *</label>
                  <input
                    type="password"
                    value={pwValue}
                    onChange={(e) => {
                      setPwValue(e.target.value);
                      setPwError("");
                    }}
                    style={pwError ? INPUT_ERROR_STYLE : INPUT_STYLE}
                    placeholder="Min. 8 characters"
                    autoFocus
                  />
                </div>
                <div>
                  <label style={LABEL_STYLE}>Confirm Password *</label>
                  <input
                    type="password"
                    value={pwConfirm}
                    onChange={(e) => {
                      setPwConfirm(e.target.value);
                      setPwError("");
                    }}
                    style={pwError ? INPUT_ERROR_STYLE : INPUT_STYLE}
                    placeholder="Repeat password"
                  />
                </div>
                {pwError && <span style={ERROR_TEXT}>{pwError}</span>}
                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    justifyContent: "flex-end",
                    paddingTop: 4,
                  }}
                >
                  <button
                    onClick={closePasswordModal}
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
                    onClick={submitPassword}
                    disabled={pwSaving}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "10px 24px",
                      background: pwSaving
                        ? "var(--text-muted)"
                        : "var(--charcoal)",
                      color: "white",
                      border: "none",
                      cursor: pwSaving ? "not-allowed" : "pointer",
                      fontFamily: "DM Sans",
                      fontSize: "0.85rem",
                    }}
                  >
                    <KeyRound size={14} />
                    {pwSaving ? "Saving..." : "Update Password"}
                  </button>
                </div>
              </div>
            </Modal>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {admins.map((a) => {
              const isSelf = a._id === currentUserId;
              const isSuperadmin = a.role === "superadmin";

              return (
                <div
                  key={a._id}
                  style={{
                    background: "white",
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "14px 16px",
                    borderLeft: isSelf
                      ? "3px solid var(--sage-dark)"
                      : "3px solid transparent",
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: isSuperadmin ? "#111" : "var(--off-white)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      color: isSuperadmin ? "white" : "var(--text-muted)",
                    }}
                  >
                    {isSuperadmin ? (
                      <ShieldCheck size={18} />
                    ) : (
                      <Shield size={18} />
                    )}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        flexWrap: "wrap",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "DM Sans",
                          fontSize: "0.9rem",
                          fontWeight: 600,
                          color: "var(--charcoal)",
                        }}
                      >
                        {a.name}
                      </span>
                      {isSelf && (
                        <span
                          style={{
                            fontFamily: "DM Sans",
                            fontSize: "0.6rem",
                            fontWeight: 700,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            background: "var(--sage-pale)",
                            color: "var(--sage-dark)",
                            padding: "2px 8px",
                            borderRadius: 9999,
                          }}
                        >
                          You
                        </span>
                      )}
                      <span
                        style={{
                          fontFamily: "DM Sans",
                          fontSize: "0.6rem",
                          fontWeight: 700,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          background: isSuperadmin
                            ? "#111"
                            : "var(--off-white)",
                          color: isSuperadmin ? "white" : "var(--text-muted)",
                          padding: "2px 8px",
                          borderRadius: 9999,
                        }}
                      >
                        {isSuperadmin ? "Super Admin" : "Admin"}
                      </span>
                    </div>
                    <div
                      style={{
                        fontFamily: "DM Sans",
                        fontSize: "0.75rem",
                        color: "var(--text-muted)",
                        marginTop: 2,
                      }}
                    >
                      {a.email}
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                    {(role === "superadmin" || isSelf) && (
                      <button
                        onClick={() => openPasswordModal(a)}
                        style={{
                          padding: "7px 10px",
                          background: "var(--off-white)",
                          border: "none",
                          cursor: "pointer",
                          color: "var(--charcoal)",
                          display: "flex",
                          alignItems: "center",
                          gap: 5,
                          fontFamily: "DM Sans",
                          fontSize: "0.75rem",
                        }}
                      >
                        <KeyRound size={13} />
                        Password
                      </button>
                    )}

                    {role === "superadmin" && !isSelf && !isSuperadmin && (
                      <button
                        onClick={() => deleteAdmin(a._id)}
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
                        <Trash2 size={13} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </main>
  );
}
