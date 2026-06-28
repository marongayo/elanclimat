// components/admin-components/AdminDashboardTab.tsx
"use client";

import { FileText, Package, Eye, Users, Briefcase, TrendingUp } from "lucide-react";
import type { BlogPost } from "@/lib/types/blog";
import type { Product } from "@/lib/types/product";
import type { User, Role } from "@/lib/types/admin";
import type { Job } from "@/lib/types/jobs";
import { CHARCOAL, SAGE, ACCENT, MUTED, WARM_WHITE, OFF_WHITE, RULE } from "./_adminStyles";

export function AdminDashboardTab({
  posts,
  products,
  admins,
  jobs,
  role,
  userName,
}: {
  posts: BlogPost[];
  products: Product[];
  admins: User[];
  jobs?: Job[];
  role: Role;
  userName?: string;
}) {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  const stats = [
    {
      label: "Blog Posts",
      value: posts.length,
      icon: <FileText size={18} />,
      accent: SAGE,
      sub: "Articles published",
    },
    {
      label: "Products",
      value: products.length,
      icon: <Package size={18} />,
      accent: ACCENT,
      sub: "In catalogue",
    },
    {
      label: "In Stock",
      value: products.filter((p) => p.inStock).length,
      icon: <TrendingUp size={18} />,
      accent: "#5c7a5b",
      sub: "Available now",
    },
    {
      label: "Open Roles",
      value: jobs?.length ?? 0,
      icon: <Briefcase size={18} />,
      accent: "#a08060",
      sub: "Active vacancies",
    },
    ...(role === "superadmin"
      ? [
          {
            label: "Admins",
            value: admins.length,
            icon: <Users size={18} />,
            accent: CHARCOAL,
            sub: "Team members",
          },
        ]
      : []),
  ];

  return (
    <div>
      {/* Hero greeting */}
      <div
        style={{
          background: CHARCOAL,
          margin: "-32px -40px 40px",
          padding: "48px 40px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative rule lines — echoes about page's gold accents */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            background: `linear-gradient(to right, ${ACCENT}, transparent 60%)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 40,
            top: "50%",
            transform: "translateY(-50%)",
            opacity: 0.04,
          }}
        >
          <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
            <polygon
              points="100,5 195,55 195,145 100,195 5,145 5,55"
              stroke="white"
              strokeWidth="1"
              fill="none"
            />
            <polygon
              points="100,30 170,68 170,132 100,170 30,132 30,68"
              stroke="white"
              strokeWidth="1"
              fill="none"
            />
            <circle cx="100" cy="100" r="20" stroke="white" strokeWidth="1" fill="none" />
          </svg>
        </div>

        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.62rem",
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: ACCENT,
            margin: "0 0 12px",
          }}
        >
          {greeting}
        </p>
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            fontWeight: 400,
            color: "#ffffff",
            margin: 0,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          {userName ? `${userName.split(" ")[0]}.` : "Welcome back."}
        </h1>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.82rem",
            color: "rgba(255,255,255,0.4)",
            margin: "10px 0 0",
            fontWeight: 300,
          }}
        >
          Here's the current state of your website.
        </p>
      </div>

      {/* Stats grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: 1,
          background: OFF_WHITE,
          marginBottom: 1,
        }}
      >
        {stats.map((s, i) => (
          <div
            key={i}
            style={{
              background: "#ffffff",
              padding: "28px 24px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 3,
                height: "100%",
                background: s.accent,
              }}
            />
            <div
              style={{
                color: s.accent,
                marginBottom: 14,
                paddingLeft: 12,
              }}
            >
              {s.icon}
            </div>
            <div
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "2.6rem",
                fontWeight: 400,
                color: CHARCOAL,
                lineHeight: 1,
                letterSpacing: "-0.02em",
                paddingLeft: 12,
              }}
            >
              {s.value}
            </div>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.72rem",
                fontWeight: 500,
                color: CHARCOAL,
                marginTop: 6,
                paddingLeft: 12,
              }}
            >
              {s.label}
            </div>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.65rem",
                color: MUTED,
                marginTop: 2,
                paddingLeft: 12,
              }}
            >
              {s.sub}
            </div>
          </div>
        ))}
      </div>

      {/* Recent posts */}
      {posts.length > 0 && (
        <div style={{ marginTop: 48 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 20 }}>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.62rem",
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: SAGE,
                margin: 0,
              }}
            >
              Recent Posts
            </p>
            <div style={{ flex: 1, height: 1, background: OFF_WHITE }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {posts.slice(0, 4).map((p) => (
              <div
                key={p._id}
                style={{
                  background: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: "14px 20px",
                  borderLeft: `3px solid ${OFF_WHITE}`,
                }}
              >
                {p.image && (
                  <img
                    src={p.image}
                    alt={p.title}
                    style={{
                      width: 44,
                      height: 44,
                      objectFit: "cover",
                      flexShrink: 0,
                    }}
                  />
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1rem",
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
                      fontSize: "0.7rem",
                      color: MUTED,
                      marginTop: 3,
                    }}
                  >
                    {p.category} · {p.date}
                  </div>
                </div>
                <Eye size={14} style={{ color: MUTED, flexShrink: 0 }} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
