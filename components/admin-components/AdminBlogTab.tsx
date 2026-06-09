// components/admin-components/AdminBlogTab.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Edit3, Trash2, Eye, Save } from "lucide-react";
import Modal from "@/components/Modal";
import type { BlogPost, BlogForm } from "@/lib/types/blog";
import { INPUT_STYLE, LABEL_STYLE } from "./_adminStyles";

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
                onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                style={INPUT_STYLE}
                placeholder="How Heat Pumps Work"
              />
            </div>
            <div>
              <label style={LABEL_STYLE}>Excerpt</label>
              <textarea
                value={blogForm.excerpt}
                onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                rows={2}
                style={{ ...INPUT_STYLE, resize: "vertical" }}
                placeholder="A brief summary..."
              />
            </div>
            <div>
              <label style={LABEL_STYLE}>Content (HTML)</label>
              <textarea
                value={blogForm.content}
                onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                rows={8}
                style={{ ...INPUT_STYLE, resize: "vertical", fontFamily: "DM Mono, monospace" }}
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
                      (url) => setBlogForm(blogForm ? { ...blogForm, image: url } : null),
                      setUploadingBlog,
                    );
                }}
                style={{ width: "100%", marginBottom: 8 }}
              />
              {uploadingBlog && (
                <span style={{ fontFamily: "DM Sans", fontSize: "0.78rem", color: "var(--sage-dark)" }}>
                  Uploading...
                </span>
              )}
              <input
                value={blogForm.image}
                onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })}
                style={INPUT_STYLE}
                placeholder="Or paste image URL"
              />
              {blogForm.image && (
                <div style={{ marginTop: 10, height: 120, width: "100%", position: "relative" }}>
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
            <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", paddingTop: 8, flexWrap: "wrap" }}>
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
              style={{ width: 52, height: 52, objectFit: "cover", flexShrink: 0 }}
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
              <div style={{ fontFamily: "DM Sans", fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>
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
                onClick={() => p._id && deleteBlog(p._id)}
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
  );
}
