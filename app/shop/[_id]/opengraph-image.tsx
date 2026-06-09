// app/shop/[_id]/opengraph-image.tsx
import { ImageResponse } from "next/og";
import { getProductById } from "@/lib/db";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({
  params,
}: {
  params: Promise<{ _id: string }>;
}) {
  const { _id } = await params;
  const product = await getProductById(_id);

  // Fallback for missing products
  if (!product) {
    return new ImageResponse(
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "#f9f7f4",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ fontSize: 24, color: "#888580" }}>
          Élan Climat & Énergie
        </span>
      </div>,
      { ...size },
    );
  }

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        background: "#f9f7f4",
      }}
    >
      {/* Left: product image */}
      <div
        style={{
          width: 630,
          height: 630,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          padding: 48,
        }}
      >
        {/* Plain <img> — next/image is not supported inside ImageResponse */}
        <img
          src={product.images?.[0]}
          alt={product.name}
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
          }}
        />
      </div>

      {/* Right: text */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "48px 56px",
          gap: 16,
        }}
      >
        <span
          style={{
            fontSize: 13,
            color: "#8fa68e",
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          {product.category}
        </span>

        <span
          style={{
            fontSize: 32,
            color: "#1a1a18",
            lineHeight: 1.2,
            fontWeight: 500,
          }}
        >
          {product.fullName || product.name}
        </span>

        <span style={{ fontSize: 14, color: "#888580", marginTop: 8 }}>
          elanclimat.co.ke
        </span>
      </div>
    </div>,
    { ...size },
  );
}
