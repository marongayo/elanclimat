// components/admin-components/AdminProductsTab.tsx
"use client";

import { useRef } from "react";
import Image from "next/image";
import { Edit3, Trash2, Package, Save, X } from "lucide-react";
import type { Product } from "@/lib/types/product";
import type { ProductForm, ProductErrors } from "@/lib/types/product";
import {
  INPUT_STYLE,
  INPUT_ERROR_STYLE,
  LABEL_STYLE,
  ERROR_TEXT,
  SECTION_HEADING,
  EYEBROW,
  BTN_PRIMARY,
  BTN_GHOST,
  CHARCOAL,
  SAGE,
  SAGE_DARK,
  ACCENT,
  MUTED,
  OFF_WHITE,
} from "./_adminStyles";

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
  setProductForm: (
    f: ProductForm | ((prev: ProductForm | null) => ProductForm | null) | null,
  ) => void;
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
      {/* Page header */}
      <div style={{ marginBottom: 40 }}>
        <p style={EYEBROW}>Shop</p>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 16,
            marginTop: 8,
          }}
        >
          <div>
            <h1 style={SECTION_HEADING}>Products</h1>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.82rem",
                color: MUTED,
                marginTop: 6,
                fontWeight: 300,
              }}
            >
              {products.length} {products.length === 1 ? "product" : "products"} in catalogue
            </p>
          </div>
        </div>
        <div style={{ width: 32, height: 1, background: ACCENT, marginTop: 16 }} />
      </div>

      {/* Product form overlay */}
      {productForm && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(26,26,24,0.5)",
            zIndex: 200,
            overflow: "auto",
            padding: "24px 16px",
            backdropFilter: "blur(2px)",
          }}
        >
          <div
            style={{
              background: "white",
              maxWidth: 660,
              margin: "0 auto",
              padding: "36px 32px",
              boxShadow: "0 24px 80px rgba(0,0,0,0.25)",
            }}
          >
            {/* Modal header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: 28,
                paddingBottom: 20,
                borderBottom: `1px solid ${OFF_WHITE}`,
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.6rem",
                    fontWeight: 600,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: ACCENT,
                    margin: "0 0 6px",
                  }}
                >
                  Shop
                </p>
                <h2
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.8rem",
                    fontWeight: 400,
                    color: CHARCOAL,
                    margin: 0,
                    letterSpacing: "-0.015em",
                  }}
                >
                  {productForm._id ? "Edit Product" : "New Product"}
                </h2>
              </div>
              <button
                onClick={() => {
                  setProductForm(null);
                  setProductErrors({});
                }}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: MUTED,
                  display: "flex",
                  alignItems: "center",
                  padding: 4,
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Validation summary */}
            {Object.keys(productErrors).length > 0 && (
              <div
                data-product-error
                style={{
                  background: "#fef2f2",
                  borderLeft: "3px solid #c0392b",
                  padding: "14px 18px",
                  marginBottom: 24,
                }}
              >
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.78rem",
                    color: "#c0392b",
                    fontWeight: 600,
                    margin: "0 0 8px",
                    letterSpacing: "0.04em",
                  }}
                >
                  Please fix the following:
                </p>
                <ul style={{ margin: 0, paddingLeft: 16 }}>
                  {Object.values(productErrors).map((e, i) => (
                    <li
                      key={i}
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.78rem",
                        color: "#c0392b",
                        marginBottom: 2,
                      }}
                    >
                      {e}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div style={{ display: "grid", gap: 20 }}>
              <div>
                <label style={LABEL_STYLE}>Short Name *</label>
                <input
                  value={productForm.name}
                  onChange={(e) => {
                    setProductForm({ ...productForm, name: e.target.value });
                    clearError("name");
                  }}
                  style={productErrors.name ? INPUT_ERROR_STYLE : INPUT_STYLE}
                  placeholder="EcoBreeze Heat Pump"
                />
                {productErrors.name && <span style={ERROR_TEXT}>{productErrors.name}</span>}
              </div>

              <div>
                <label style={LABEL_STYLE}>Full Product Name</label>
                <input
                  value={productForm.fullName}
                  onChange={(e) =>
                    setProductForm({ ...productForm, fullName: e.target.value })
                  }
                  style={INPUT_STYLE}
                  placeholder="LG 3.5kW Inverter Split Air Conditioner"
                />
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
                  gap: 16,
                }}
              >
                <div>
                  <label style={LABEL_STYLE}>Price (KES) *</label>
                  <input
                    type="number"
                    value={productForm.price}
                    onChange={(e) => {
                      setProductForm({ ...productForm, price: e.target.value });
                      clearError("price");
                    }}
                    style={productErrors.price ? INPUT_ERROR_STYLE : INPUT_STYLE}
                    placeholder="129000"
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
                      setProductForm({ ...productForm, category: e.target.value });
                      clearError("category");
                    }}
                    style={
                      productErrors.category ? INPUT_ERROR_STYLE : INPUT_STYLE
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

              <div>
                <label style={LABEL_STYLE}>Description *</label>
                <textarea
                  value={productForm.description}
                  onChange={(e) => {
                    setProductForm({ ...productForm, description: e.target.value });
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
                  <span style={ERROR_TEXT}>{productErrors.description}</span>
                )}
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
                      onClick={() =>
                        setProductForm({
                          ...productForm,
                          keyFeatures: productForm.keyFeatures.filter((_, j) => j !== i),
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
                    border: `1px dashed ${OFF_WHITE}`,
                    cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.78rem",
                    color: MUTED,
                    width: "100%",
                  }}
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
                    border: `1px dashed ${OFF_WHITE}`,
                    cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.78rem",
                    color: MUTED,
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
                      color: productForm.images.length >= 2 ? SAGE_DARK : "#c0392b",
                      fontWeight: 600,
                    }}
                  >
                    ({productForm.images.length}/2 minimum)
                  </span>
                </label>
                {/* Progress bar */}
                <div style={{ display: "flex", gap: 4, marginBottom: 12 }}>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      style={{
                        flex: 1,
                        height: 3,
                        background:
                          productForm.images.length > i
                            ? i < 2
                              ? SAGE_DARK
                              : SAGE
                            : OFF_WHITE,
                        transition: "background 0.25s",
                      }}
                    />
                  ))}
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
                      Uploading image...
                    </span>
                  </div>
                )}
                <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                  <input
                    ref={imgUrlRef}
                    placeholder="Or paste image URL and press Add"
                    style={{ ...INPUT_STYLE, flex: 1 }}
                  />
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
                    style={{
                      padding: "10px 18px",
                      background: CHARCOAL,
                      color: "white",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.78rem",
                      fontWeight: 500,
                      letterSpacing: "0.06em",
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
                      gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))",
                      gap: 8,
                      marginTop: 14,
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
                              background: CHARCOAL,
                              color: "white",
                              fontSize: "0.52rem",
                              fontWeight: 700,
                              letterSpacing: "0.1em",
                              textTransform: "uppercase",
                              padding: "2px 6px",
                              fontFamily: "'DM Sans', sans-serif",
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
                                ? { ...pf, images: pf.images.filter((_, j) => j !== i) }
                                : pf,
                            )
                          }
                          style={{
                            position: "absolute",
                            top: 4,
                            right: 4,
                            background: "rgba(0,0,0,0.65)",
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
                          <X size={10} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.68rem",
                    color: MUTED,
                    marginTop: 8,
                    fontWeight: 300,
                  }}
                >
                  First image is the main thumbnail. Minimum 2 required.
                </p>
              </div>

              {/* Badge + In Stock */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  gap: 16,
                  alignItems: "end",
                }}
              >
                <div>
                  <label style={LABEL_STYLE}>Badge</label>
                  <input
                    value={productForm.badge}
                    onChange={(e) =>
                      setProductForm({ ...productForm, badge: e.target.value })
                    }
                    style={INPUT_STYLE}
                    placeholder="New, Best Seller, Sale..."
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    paddingBottom: 11,
                  }}
                >
                  <input
                    type="checkbox"
                    id="inStock"
                    checked={productForm.inStock}
                    onChange={(e) =>
                      setProductForm({ ...productForm, inStock: e.target.checked })
                    }
                    style={{ accentColor: SAGE_DARK, width: 16, height: 16 }}
                  />
                  <label
                    htmlFor="inStock"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.82rem",
                      color: CHARCOAL,
                      cursor: "pointer",
                      userSelect: "none",
                    }}
                  >
                    In Stock
                  </label>
                </div>
              </div>

              {/* Actions */}
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
                <button
                  onClick={() => {
                    setProductForm(null);
                    setProductErrors({});
                  }}
                  style={BTN_GHOST}
                >
                  Cancel
                </button>
                <button
                  onClick={saveProduct}
                  disabled={saving || uploadingProduct}
                  style={{
                    ...BTN_PRIMARY,
                    opacity: saving || uploadingProduct ? 0.6 : 1,
                    cursor: saving || uploadingProduct ? "not-allowed" : "pointer",
                  }}
                >
                  <Save size={14} />
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

      {/* Product grid */}
      {products.length === 0 ? (
        <div
          style={{
            background: "white",
            padding: "64px 32px",
            textAlign: "center",
            border: `1px solid ${OFF_WHITE}`,
          }}
        >
          <Package size={32} style={{ color: MUTED, opacity: 0.3, marginBottom: 12 }} />
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.85rem",
              color: MUTED,
              margin: 0,
            }}
          >
            No products yet. Use the + button to add one.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(168px, 1fr))",
            gap: 1,
            background: OFF_WHITE,
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
                  background: OFF_WHITE,
                  position: "relative",
                }}
              >
                {p.images?.[0] ? (
                  <Image
                    src={p.images[0]}
                    alt={p.name}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="168px"
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: MUTED,
                    }}
                  >
                    <Package size={28} />
                  </div>
                )}
                {p.images?.length > 1 && (
                  <span
                    style={{
                      position: "absolute",
                      bottom: 6,
                      right: 6,
                      background: "rgba(26,26,24,0.7)",
                      color: "white",
                      fontSize: "0.6rem",
                      padding: "2px 7px",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    +{p.images.length - 1}
                  </span>
                )}
                {p.badge && (
                  <span
                    style={{
                      position: "absolute",
                      top: 8,
                      left: 8,
                      background: ACCENT,
                      color: CHARCOAL,
                      fontSize: "0.55rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      padding: "3px 8px",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {p.badge}
                  </span>
                )}
                {!p.inStock && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "rgba(26,26,24,0.45)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.6rem",
                        fontWeight: 700,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "white",
                        background: "rgba(0,0,0,0.6)",
                        padding: "4px 10px",
                      }}
                    >
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>
              <div style={{ padding: "14px 14px 16px" }}>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.58rem",
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: SAGE_DARK,
                    marginBottom: 5,
                  }}
                >
                  {p.category}
                </div>
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1rem",
                    fontWeight: 500,
                    color: CHARCOAL,
                    marginBottom: 2,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {p.name}
                </div>
                {p.fullName && (
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.67rem",
                      color: MUTED,
                      marginBottom: 6,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      fontWeight: 300,
                    }}
                  >
                    {p.fullName}
                  </div>
                )}
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.1rem",
                    fontWeight: 400,
                    color: CHARCOAL,
                    marginBottom: 12,
                    letterSpacing: "-0.01em",
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
                      background: OFF_WHITE,
                      border: "none",
                      cursor: "pointer",
                      color: CHARCOAL,
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.72rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 5,
                    }}
                  >
                    <Edit3 size={11} /> Edit
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
      )}
    </div>
  );
}
