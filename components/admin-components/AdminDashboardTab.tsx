// components/admin-components/AdminDashboardTab.tsx
"use client";

import { FileText, Package, Eye, Users } from "lucide-react";
import type { BlogPost } from "@/lib/types/blog";
import type { Product } from "@/lib/types/product";
import type { User } from "@/lib/types/admin";
import type { Role } from "@/lib/types/admin";

export function AdminDashboardTab({
  posts,
  products,
  admins,
  role,
}: {
  posts: BlogPost[];
  products: Product[];
  admins: User[];
  role: Role;
}) {
  const stats = [
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
  ];

  return (
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
        {stats.map((s, i) => (
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
  );
}
