// components/admin-components/AdminBlogTab.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Edit3, Trash2, Eye, Save, FileText } from "lucide-react";
import Modal from "@/components/Modal";
import type { BlogPost, BlogForm } from "@/lib/types/blog";
import {
  INPUT_STYLE,
  LABEL_STYLE,
  SECTION_HEADING,
  EYEBROW,
  BTN_PRIMARY,
  BTN_GHOST,
  BTN_DANGER,
  CHARCOAL,
  SAGE,
  SAGE_DARK,
  MUTED,
  OFF_WHITE,
  RULE,
} from "./_adminStyles";

export function AdminBlogTab({
  posts,
  blogForm,
  setBlogForm,
  saving,
  uploadingBlog,
  setUploadingBlog,
  saveBlog,
  deleteBlog,
  uploadImage,
}: {
  posts: BlogPost[];
  blogForm: BlogForm | null;
  setBlogForm: (f: BlogForm | null) => void;
  saving: boolean;
  uploadingBlog: boolean;
  setUploadingBlog: (v: boolean) => void;
  saveBlog: () => void;
  deleteBlog: (id: string) => void;
  uploadImage: (
    file: File,
    setter: (url: string) => void,
    setUploading: (v: boolean) => void,
  ) => Promise<void>;
}) {
  return (
    <div>
      {/* Page header */}
      <div style={{ marginBottom: 40 }}>
        <p style={EYEBROW}>Content</p>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, marginTop: 8 }}>
          <div>
            <h1 style={SECTION_HEADING}>Blog Posts</h1>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.82rem",
                color: MUTED,
                marginTop: 6,
                fontWeight: 300,
              }}
            >
              {posts.length} {posts.length === 1 ? "article" : "articles"} published
            </p>
          </div>
        </div>
        <div style={{ width: 32, height: 1, background: "#c9a96e", marginTop: 16 }} />
      </div>

      {/* Edit/Create modal */}
      {blogForm && (
        <Modal
          open={!!blogForm}
          onClose={() => setBlogForm(null)}
          title={blogForm._id ? "Edit Blog Post" : "New Blog Post"}
          maxWidth={820}
        >
          <div style={{ display: "grid", gap: 20 }}>
            <div>
              <label style={LABEL_STYLE}>Title *</label>
              <input
                value={blogForm.title}
                onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                style={INPUT_STYLE}
                placeholder="How Heat Pumps Work in Tropical Climates"
              />
            </div>
            <div>
              <label style={LABEL_STYLE}>Excerpt</label>
              <textarea
                value={blogForm.excerpt}
                onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                rows={2}
                style={{ ...INPUT_STYLE, resize: "vertical" }}
                placeholder="A concise summary shown on the blog listing page..."
              />
            </div>
            <div>
              <label style={LABEL_STYLE}>Content (HTML)</label>
              <textarea
                value={blogForm.content}
                onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                rows={10}
                style={{
                  ...INPUT_STYLE,
                  resize: "vertical",
                  fontFamily: "'DM Mono', 'Courier New', monospace",
                  fontSize: "0.8rem",
                  lineHeight: 1.7,
                }}
                placeholder="<h2>Section Title</h2>&#10;<p>Your content here...</p>"
              />
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                gap: 16,
              }}
            >
              <div>
                <label style={LABEL_STYLE}>Category</label>
                <select
                  value={blogForm.category}
                  onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
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
                  onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                  style={INPUT_STYLE}
                  placeholder="Élan Editorial"
                />
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.65rem",
                    color: MUTED,
                    marginTop: 4,
                    display: "block",
                  }}
                >
                  Auto-filled from your session
                </span>
              </div>
              <div>
                <label style={LABEL_STYLE}>Read Time</label>
                <input
                  value={blogForm.readTime ?? ""}
                  onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })}
                  style={INPUT_STYLE}
                  placeholder="5 min"
                />
              </div>
            </div>

            {/* Cover image */}
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
                      (url) => setBlogForm(blogForm ? { ...blogForm, image: url } : null),
                      setUploadingBlog,
                    );
                }}
                style={{ width: "100%", marginBottom: 8 }}
              />
              {uploadingBlog && (
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <div
                    style={{
                      width: 12,
                      height: 12,
                      border: `2px solid ${SAGE_DARK}`,
                      borderTopColor: "transparent",
                      borderRadius: "50%",
                      animation: "spin 0.7s linear infinite",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.75rem",
                      color: SAGE_DARK,
                    }}
                  >
                    Uploading...
                  </span>
                </div>
              )}
              <input
                value={blogForm.image}
                onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })}
                style={INPUT_STYLE}
                placeholder="Or paste image URL"
              />
              {blogForm.image && (
                <div
                  style={{
                    marginTop: 12,
                    height: 140,
                    width: "100%",
                    position: "relative",
                    overflow: "hidden",
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
                gap: 10,
                justifyContent: "flex-end",
                paddingTop: 8,
                flexWrap: "wrap",
                borderTop: `1px solid ${OFF_WHITE}`,
              }}
            >
              <button onClick={() => setBlogForm(null)} style={BTN_GHOST}>
                Cancel
              </button>
              <button
                onClick={saveBlog}
                disabled={saving}
                style={{
                  ...BTN_PRIMARY,
                  opacity: saving ? 0.6 : 1,
                  cursor: saving ? "not-allowed" : "pointer",
                }}
              >
                <Save size={14} />
                {saving ? "Saving..." : "Save Post"}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Posts list */}
      {posts.length === 0 ? (
        <div
          style={{
            background: "#ffffff",
            padding: "64px 32px",
            textAlign: "center",
            border: `1px solid ${OFF_WHITE}`,
          }}
        >
          <FileText size={32} style={{ color: MUTED, opacity: 0.3, marginBottom: 12 }} />
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.85rem",
              color: MUTED,
              margin: 0,
            }}
          >
            No blog posts yet. Use the + button to create one.
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {posts.map((p) => (
            <div
              key={p._id}
              style={{
                background: "white",
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "16px 20px",
                borderLeft: `3px solid ${OFF_WHITE}`,
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLDivElement).style.borderLeftColor = SAGE)
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLDivElement).style.borderLeftColor = OFF_WHITE)
              }
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  flexShrink: 0,
                  overflow: "hidden",
                  background: OFF_WHITE,
                }}
              >
                {p.image && (
                  <img
                    src={p.image}
                    alt={p.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.05rem",
                    fontWeight: 500,
                    color: CHARCOAL,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {p.title}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.72rem",
                    color: MUTED,
                    marginTop: 3,
                    display: "flex",
                    gap: 8,
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      background: OFF_WHITE,
                      padding: "1px 8px",
                      fontSize: "0.6rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                    }}
                  >
                    {p.category}
                  </span>
                  <span>{p.date}</span>
                  {p.author && <span>· {p.author}</span>}
                </div>
              </div>
              <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                <Link
                  href={`/blog/${p.slug}`}
                  target="_blank"
                  style={{
                    padding: "7px 10px",
                    background: "#f0f5f0",
                    color: SAGE_DARK,
                    display: "flex",
                    alignItems: "center",
                    textDecoration: "none",
                  }}
                >
                  <Eye size={13} />
                </Link>
                <button
                  onClick={() => setBlogForm({ ...p })}
                  style={{
                    padding: "7px 10px",
                    background: OFF_WHITE,
                    border: "none",
                    cursor: "pointer",
                    color: CHARCOAL,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Edit3 size={13} />
                </button>
                <button
                  onClick={() => p._id && deleteBlog(p._id)}
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
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
