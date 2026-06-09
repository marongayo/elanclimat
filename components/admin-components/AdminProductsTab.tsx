// components/admin-components/AdminProductsTab.tsx
"use client";

import { useRef } from "react";
import Image from "next/image";
import { Edit3, Trash2, Package, Save, X } from "lucide-react";
import type { Product } from "@/lib/types/product";
import type { ProductForm, ProductErrors } from "@/lib/types/product";
import { INPUT_STYLE, INPUT_ERROR_STYLE, LABEL_STYLE, ERROR_TEXT } from "./_adminStyles";

export function AdminProductsTab({
  products,
  productForm,
  setProductForm,
  productErrors,
  setProductErrors,
  saving,
  uploadingProduct,
  setUploadingProduct,
  saveProduct,
  deleteProduct,
  clearError,
  toast,
}: {
  products: Product[];
  productForm: ProductForm | null;
  setProductForm: (f: ProductForm | ((prev: ProductForm | null) => ProductForm | null) | null) => void;
  productErrors: ProductErrors;
  setProductErrors: (e: ProductErrors) => void;
  saving: boolean;
  uploadingProduct: boolean;
  setUploadingProduct: (v: boolean) => void;
  saveProduct: () => void;
  deleteProduct: (id: string) => void;
  clearError: (field: keyof ProductErrors) => void;
  toast: (msg: string) => void;
}) {
  const imgUrlRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(1.6rem, 5vw, 2.2rem)", fontWeight: 600, color: "var(--charcoal)" }}>
          Products
        </h1>
        <p style={{ fontFamily: "DM Sans", fontSize: "0.85rem", color: "var(--text-muted)", marginTop: 4 }}>
          {products.length} products in catalogue
        </p>
      </div>

      {productForm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 200, overflow: "auto", padding: "20px 16px" }}>
          <div style={{ background: "white", maxWidth: 640, margin: "0 auto", padding: "32px 24px", boxShadow: "0 20px 80px rgba(0,0,0,0.2)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.7rem", color: "var(--charcoal)" }}>
                {productForm._id ? "Edit" : "New"} Product
              </h2>
              <button onClick={() => { setProductForm(null); setProductErrors({}); }} style={{ background: "none", border: "none", cursor: "pointer" }}>
                <X size={20} />
              </button>
            </div>

            {Object.keys(productErrors).length > 0 && (
              <div data-product-error style={{ background: "#fef2f2", border: "1px solid #fca5a5", padding: "12px 16px", marginBottom: 20, borderRadius: 2 }}>
                <p style={{ fontFamily: "DM Sans", fontSize: "0.8rem", color: "#c0392b", fontWeight: 600, margin: "0 0 6px" }}>
                  Please fix the following before saving:
                </p>
                <ul style={{ margin: 0, paddingLeft: 18 }}>
                  {Object.values(productErrors).map((e, i) => (
                    <li key={i} style={{ fontFamily: "DM Sans", fontSize: "0.78rem", color: "#c0392b" }}>{e}</li>
                  ))}
                </ul>
              </div>
            )}

            <div style={{ display: "grid", gap: 18 }}>
              <div>
                <label style={LABEL_STYLE}>Short Name *</label>
                <input
                  value={productForm.name}
                  onChange={(e) => { setProductForm({ ...productForm, name: e.target.value }); clearError("name"); }}
                  style={productErrors.name ? INPUT_ERROR_STYLE : INPUT_STYLE}
                  placeholder="EcoBreeze Heat Pump"
                />
                {productErrors.name && <span style={ERROR_TEXT}>{productErrors.name}</span>}
              </div>
              <div>
                <label style={LABEL_STYLE}>Full Product Name</label>
                <input
                  value={productForm.fullName}
                  onChange={(e) => setProductForm({ ...productForm, fullName: e.target.value })}
                  style={INPUT_STYLE}
                  placeholder="LG 3.5kW Inverter Split Air Conditioner"
                />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 16 }}>
                <div>
                  <label style={LABEL_STYLE}>Price (KES) *</label>
                  <input
                    type="number"
                    value={productForm.price}
                    onChange={(e) => { setProductForm({ ...productForm, price: e.target.value }); clearError("price"); }}
                    style={productErrors.price ? INPUT_ERROR_STYLE : INPUT_STYLE}
                    placeholder="1299"
                    min="1"
                  />
                  {productErrors.price && <span style={ERROR_TEXT}>{productErrors.price}</span>}
                </div>
                <div>
                  <label style={LABEL_STYLE}>Category *</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => { setProductForm({ ...productForm, category: e.target.value }); clearError("category"); }}
                    style={productErrors.category ? INPUT_ERROR_STYLE : INPUT_STYLE}
                  >
                    <option>HVAC</option>
                    <option>Solar</option>
                    <option>Batteries</option>
                  </select>
                  {productErrors.category && <span style={ERROR_TEXT}>{productErrors.category}</span>}
                </div>
              </div>
              <div>
                <label style={LABEL_STYLE}>Description *</label>
                <textarea
                  value={productForm.description}
                  onChange={(e) => { setProductForm({ ...productForm, description: e.target.value }); clearError("description"); }}
                  rows={3}
                  style={{ ...(productErrors.description ? INPUT_ERROR_STYLE : INPUT_STYLE), resize: "vertical" }}
                  placeholder="Describe the product features, specs, and benefits..."
                />
                {productErrors.description && <span style={ERROR_TEXT}>{productErrors.description}</span>}
              </div>

              {/* Key Features */}
              <div>
                <label style={LABEL_STYLE}>Key Features</label>
                {productForm.keyFeatures.map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 6, marginBottom: 6 }}>
                    <input
                      value={item}
                      onChange={(e) => {
                        const updated = [...productForm.keyFeatures];
                        updated[i] = e.target.value;
                        setProductForm({ ...productForm, keyFeatures: updated });
                      }}
                      style={{ ...INPUT_STYLE, flex: 1 }}
                      placeholder="e.g. Inverter compressor for energy efficiency"
                    />
                    <button
                      type="button"
                      onClick={() => setProductForm({ ...productForm, keyFeatures: productForm.keyFeatures.filter((_, j) => j !== i) })}
                      style={{ padding: "0 10px", background: "#fef2f2", border: "none", cursor: "pointer", color: "#c0392b", display: "flex", alignItems: "center" }}
                    >
                      <X size={13} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setProductForm({ ...productForm, keyFeatures: [...productForm.keyFeatures, ""] })}
                  style={{ marginTop: 4, padding: "8px 14px", background: "none", border: "1px dashed var(--off-white)", cursor: "pointer", fontFamily: "DM Sans", fontSize: "0.78rem", color: "var(--text-muted)", width: "100%" }}
                >
                  + Add Feature
                </button>
              </div>

              {/* Specifications */}
              <div>
                <label style={LABEL_STYLE}>Technical Specifications</label>
                {productForm.specifications.map((spec, i) => (
                  <div key={i} style={{ display: "flex", gap: 6, marginBottom: 6 }}>
                    <input
                      value={spec.key}
                      onChange={(e) => {
                        const updated = [...productForm.specifications];
                        updated[i] = { ...updated[i], key: e.target.value };
                        setProductForm({ ...productForm, specifications: updated });
                      }}
                      style={{ ...INPUT_STYLE, flex: 1 }}
                      placeholder="e.g. Cooling Capacity"
                    />
                    <input
                      value={spec.value}
                      onChange={(e) => {
                        const updated = [...productForm.specifications];
                        updated[i] = { ...updated[i], value: e.target.value };
                        setProductForm({ ...productForm, specifications: updated });
                      }}
                      style={{ ...INPUT_STYLE, flex: 2 }}
                      placeholder="e.g. 12,000 BTU"
                    />
                    <button
                      type="button"
                      onClick={() => setProductForm({ ...productForm, specifications: productForm.specifications.filter((_, j) => j !== i) })}
                      style={{ padding: "0 10px", background: "#fef2f2", border: "none", cursor: "pointer", color: "#c0392b", display: "flex", alignItems: "center" }}
                    >
                      <X size={13} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setProductForm({ ...productForm, specifications: [...productForm.specifications, { key: "", value: "" }] })}
                  style={{ marginTop: 4, padding: "8px 14px", background: "none", border: "1px dashed var(--off-white)", cursor: "pointer", fontFamily: "DM Sans", fontSize: "0.78rem", color: "var(--text-muted)", width: "100%" }}
                >
                  + Add Specification
                </button>
              </div>

              {/* Images */}
              <div>
                <label style={LABEL_STYLE}>
                  Product Images *{" "}
                  <span style={{ color: productForm.images.length >= 2 ? "var(--sage-dark)" : "#c0392b", fontWeight: 600 }}>
                    ({productForm.images.length}/2 minimum)
                  </span>
                </label>
                <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
                  {[0, 1].map((i) => (
                    <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: productForm.images.length > i ? "var(--sage-dark)" : "var(--off-white)", transition: "background 0.2s" }} />
                  ))}
                  <div style={{ flex: 3, height: 4, borderRadius: 2, background: productForm.images.length > 2 ? "var(--sage)" : "var(--off-white)", transition: "background 0.2s" }} />
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
                      const res = await fetch("/api/upload", { method: "POST", body: fd });
                      const data = await res.json();
                      if (!res.ok) throw new Error(data.error);
                      setProductForm((pf) => {
                        if (!pf) return pf;
                        const updated = { ...pf, images: [...pf.images, data.url] };
                        if (updated.images.length >= 2) clearError("images");
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
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <div style={{ width: 14, height: 14, border: "2px solid var(--sage-dark)", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
                    <span style={{ fontFamily: "DM Sans", fontSize: "0.78rem", color: "var(--sage-dark)" }}>Uploading image...</span>
                  </div>
                )}
                <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                  <input ref={imgUrlRef} placeholder="Or paste image URL and click Add" style={{ ...INPUT_STYLE, flex: 1 }} />
                  <button
                    type="button"
                    onClick={() => {
                      const val = imgUrlRef.current?.value.trim();
                      if (!val) return;
                      setProductForm((pf) => {
                        if (!pf) return pf;
                        const updated = { ...pf, images: [...pf.images, val] };
                        if (updated.images.length >= 2) clearError("images");
                        return updated;
                      });
                      if (imgUrlRef.current) imgUrlRef.current.value = "";
                    }}
                    style={{ padding: "10px 16px", background: "var(--charcoal)", color: "white", border: "none", cursor: "pointer", fontFamily: "DM Sans", fontSize: "0.85rem", whiteSpace: "nowrap" }}
                  >
                    Add
                  </button>
                </div>
                {productErrors.images && <span style={{ ...ERROR_TEXT, marginTop: 8 }}>{productErrors.images}</span>}
                {productForm.images.length > 0 && (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))", gap: 8, marginTop: 12 }}>
                    {productForm.images.map((url, i) => (
                      <div key={i} style={{ position: "relative" }}>
                        {i === 0 && (
                          <span style={{ position: "absolute", bottom: 4, left: 4, background: "var(--charcoal)", color: "white", fontSize: "0.55rem", padding: "2px 6px", fontFamily: "DM Sans", zIndex: 1 }}>
                            Main
                          </span>
                        )}
                        <Image src={url} alt={`img-${i}`} width={90} height={90} style={{ objectFit: "cover", width: "100%", height: 90, display: "block" }} />
                        <button
                          type="button"
                          onClick={() => setProductForm((pf) => pf ? { ...pf, images: pf.images.filter((_, j) => j !== i) } : pf)}
                          style={{ position: "absolute", top: 4, right: 4, background: "rgba(0,0,0,0.6)", border: "none", cursor: "pointer", color: "white", borderRadius: "50%", width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center" }}
                        >
                          <X size={11} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <p style={{ fontFamily: "DM Sans", fontSize: "0.7rem", color: "var(--text-muted)", marginTop: 6 }}>
                  First image is the main thumbnail. Minimum 2 images required.
                </p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 16 }}>
                <div>
                  <label style={LABEL_STYLE}>Badge</label>
                  <input
                    value={productForm.badge}
                    onChange={(e) => setProductForm({ ...productForm, badge: e.target.value })}
                    style={INPUT_STYLE}
                    placeholder="New, Best Seller, Sale..."
                  />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, paddingTop: 24 }}>
                  <input
                    type="checkbox"
                    id="inStock"
                    checked={productForm.inStock}
                    onChange={(e) => setProductForm({ ...productForm, inStock: e.target.checked })}
                  />
                  <label htmlFor="inStock" style={{ fontFamily: "DM Sans", fontSize: "0.85rem", color: "var(--charcoal)", cursor: "pointer" }}>
                    In Stock
                  </label>
                </div>
              </div>

              <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", paddingTop: 8, flexWrap: "wrap" }}>
                <button
                  onClick={() => { setProductForm(null); setProductErrors({}); }}
                  style={{ padding: "10px 20px", background: "none", border: "1px solid var(--off-white)", cursor: "pointer", fontFamily: "DM Sans", fontSize: "0.85rem", color: "var(--text-muted)" }}
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
                    background: saving || uploadingProduct ? "var(--text-muted)" : "var(--charcoal)",
                    color: "white",
                    border: "none",
                    cursor: saving || uploadingProduct ? "not-allowed" : "pointer",
                    fontFamily: "DM Sans",
                    fontSize: "0.85rem",
                  }}
                >
                  <Save size={15} /> {saving ? "Saving..." : uploadingProduct ? "Uploading..." : "Save Product"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12 }}>
        {products.map((p) => (
          <div key={p._id} style={{ background: "white", overflow: "hidden" }}>
            <div style={{ aspectRatio: "1/1", overflow: "hidden", background: "var(--off-white)", position: "relative" }}>
              {p.images?.[0] ? (
                <Image src={p.images[0]} alt={p.name} fill style={{ objectFit: "cover" }} sizes="160px" />
              ) : (
                <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)" }}>
                  <Package size={32} />
                </div>
              )}
              {p.images?.length > 1 && (
                <span style={{ position: "absolute", bottom: 6, right: 6, background: "rgba(0,0,0,0.55)", color: "white", fontSize: "0.65rem", padding: "2px 6px", borderRadius: 4, fontFamily: "DM Sans" }}>
                  +{p.images.length - 1}
                </span>
              )}
            </div>
            <div style={{ padding: "12px" }}>
              <div style={{ fontFamily: "DM Sans", fontSize: "0.62rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: 4 }}>
                {p.category}
              </div>
              <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "0.95rem", fontWeight: 600, color: "var(--charcoal)", marginBottom: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {p.name}
              </div>
              {p.fullName && (
                <div style={{ fontFamily: "DM Sans", fontSize: "0.68rem", color: "var(--text-muted)", marginBottom: 4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {p.fullName}
                </div>
              )}
              <div style={{ fontFamily: "DM Sans", fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: 10 }}>
                KES {p.price.toLocaleString()}
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <button
                  onClick={() => setProductForm({ _id: p._id, name: p.name, fullName: p.fullName ?? "", price: String(p.price), category: p.category, images: p.images ?? [], description: p.description, keyFeatures: p.keyFeatures ?? [], specifications: p.specifications ?? [], inStock: p.inStock, badge: p.badge ?? "" })}
                  style={{ flex: 1, padding: "7px", background: "var(--off-white)", border: "none", cursor: "pointer", color: "var(--charcoal)", fontFamily: "DM Sans", fontSize: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}
                >
                  <Edit3 size={12} /> Edit
                </button>
                <button
                  onClick={() => deleteProduct(p._id)}
                  style={{ padding: "7px 10px", background: "#fef2f2", border: "none", cursor: "pointer", color: "#c0392b", display: "flex", alignItems: "center" }}
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
