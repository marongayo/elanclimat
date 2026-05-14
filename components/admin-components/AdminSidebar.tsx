"use client";
import {
  Bell,
  LayoutDashboard,
  FileText,
  Package,
  Eye,
  LogIn,
  Mail,
  X,
  Menu,
  Users,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Tab = "dashboard" | "blog" | "products" | "admins";
type Role = "admin" | "superadmin";

// ── Nav primitives ────────────────────────────────────────────────────────────

const NavItem = ({
  active,
  onClick,
  icon,
  label,
  badge,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  badge?: number;
}) => (
  <button
    onClick={onClick}
    style={{
      display: "flex",
      alignItems: "center",
      gap: 10,
      width: "100%",
      padding: "8px 12px",
      background: active ? "#f3f4f6" : "transparent",
      border: "none",
      borderRadius: 8,
      cursor: "pointer",
      fontFamily: "'DM Sans', sans-serif",
      fontSize: "0.82rem",
      color: active ? "#111" : "#6b7280",
      textAlign: "left" as React.CSSProperties["textAlign"],
      fontWeight: active ? 600 : 400,
      transition: "background 0.15s, color 0.15s",
      position: "relative" as React.CSSProperties["position"],
    }}
    onMouseEnter={(e) => {
      if (!active) e.currentTarget.style.background = "#f9fafb";
      e.currentTarget.style.color = "#111";
    }}
    onMouseLeave={(e) => {
      if (!active) {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.color = "#6b7280";
      }
    }}
  >
    <span
      style={{
        display: "flex",
        alignItems: "center",
        color: active ? "#111" : "#9ca3af",
        flexShrink: 0,
      }}
    >
      {icon}
    </span>
    <span style={{ flex: 1 }}>{label}</span>
    {badge !== undefined && badge > 0 && (
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.65rem",
          fontWeight: 700,
          background: "#111",
          color: "white",
          borderRadius: 9999,
          padding: "1px 6px",
          lineHeight: 1.7,
          minWidth: 18,
          textAlign: "center" as React.CSSProperties["textAlign"],
        }}
      >
        {badge}
      </span>
    )}
  </button>
);

const NavSection = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div style={{ marginTop: 20 }}>
    <div
      style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "0.6rem",
        fontWeight: 700,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "#9ca3af",
        padding: "0 12px",
        marginBottom: 4,
      }}
    >
      {label}
    </div>
    {children}
  </div>
);

// ── SidebarContent ────────────────────────────────────────────────────────────

const SidebarContent = ({
  tab,
  unread,
  navTo,
  onBell,
  role,
  onLogout,
}: {
  tab: Tab;
  unread: number;
  navTo: (t: Tab) => void;
  onBell: () => void;
  role: Role;
  onLogout: () => void;
}) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      height: "100%",
      background: "white",
    }}
  >
    {/* Logo */}
    <div style={{ padding: "20px 16px 12px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 30,
            height: 30,
            background: "#111",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 1L14 5V11L8 15L2 11V5L8 1Z"
              stroke="white"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <circle cx="8" cy="8" r="2" fill="white" />
          </svg>
        </div>
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 700,
            fontSize: "0.92rem",
            color: "#111",
            letterSpacing: "-0.01em",
          }}
        >
          ÉLAN ADMIN
        </span>
      </div>
    </div>

    {/* Nav */}
    <div style={{ padding: "0 8px", flex: 1, overflowY: "auto" }}>
      <NavItem
        active={tab === "dashboard"}
        onClick={() => navTo("dashboard")}
        icon={<LayoutDashboard size={15} />}
        label="Dashboard"
      />
      <NavItem
        active={false}
        onClick={onBell}
        icon={
          <span style={{ position: "relative", display: "flex" }}>
            {unread > 0 ? (
              <motion.div
                animate={{ rotate: [-10, 10, -10] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ display: "inline-flex", originX: 0.5, originY: 0 }}
              >
                <Bell size={15} />
              </motion.div>
            ) : (
              <Bell size={15} />
            )}
          </span>
        }
        label="Inbox"
        badge={unread}
      />
      <NavItem
        active={false}
        onClick={() => window.open("/", "_blank")}
        icon={<Eye size={15} />}
        label="View Site"
      />

      <NavSection label="Content">
        <NavItem
          active={tab === "blog"}
          onClick={() => navTo("blog")}
          icon={<FileText size={15} />}
          label="Blog Posts"
        />
        <NavItem
          active={tab === "products"}
          onClick={() => navTo("products")}
          icon={<Package size={15} />}
          label="Products"
        />
      </NavSection>

      <NavSection label="Account">
        <NavItem
          active={false}
          onClick={onBell}
          icon={<Mail size={15} />}
          label="Messages"
          badge={unread}
        />

        {/* Admins tab — superadmin only */}
        {role === "superadmin" && (
          <NavItem
            active={tab === "admins"}
            onClick={() => navTo("admins")}
            icon={<Users size={15} />}
            label="Admins"
          />
        )}

        <NavItem
          active={false}
          onClick={onLogout}
          icon={<LogIn size={15} style={{ transform: "rotate(180deg)" }} />}
          label="Sign Out"
        />
      </NavSection>
    </div>

    {/* User footer */}
    <div
      style={{
        margin: "8px",
        padding: "10px 12px",
        borderRadius: 10,
        background: "#f9fafb",
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #d1d5db, #9ca3af)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          color: "white",
          fontSize: "0.75rem",
          fontWeight: 700,
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {role === "superadmin" ? "SA" : "A"}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.8rem",
            fontWeight: 600,
            color: "#111",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {role === "superadmin" ? "Super Admin" : "Admin"}
        </div>
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.68rem",
            color: "#9ca3af",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {role === "superadmin" ? "Full Access" : "Content Manager"}
        </div>
      </div>
      <button
        onClick={onLogout}
        title="Sign out"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#9ca3af",
          display: "flex",
          alignItems: "center",
          padding: 2,
          borderRadius: 4,
          transition: "color 0.15s",
          flexShrink: 0,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#111")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
          <circle cx="2" cy="8" r="1.4" />
          <circle cx="8" cy="8" r="1.4" />
          <circle cx="14" cy="8" r="1.4" />
        </svg>
      </button>
    </div>
  </div>
);

// ── AdminSidebar ──────────────────────────────────────────────────────────────

export default function AdminSidebar({
  tab,
  unread,
  navTo,
  onBell,
  role,
  onLogout,
  sidebarOpen,
  setSidebarOpen,
}: {
  tab: Tab;
  unread: number;
  navTo: (t: Tab) => void;
  onBell: () => void;
  role: Role;
  onLogout: () => void;
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
}) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="admin-sidebar-desktop"
        style={{
          width: 240,
          background: "white",
          borderRight: "1px solid #f3f4f6",
          flexDirection: "column",
          position: "fixed",
          top: 0,
          bottom: 0,
          zIndex: 50,
          boxShadow: "1px 0 0 #f3f4f6",
        }}
      >
        <SidebarContent
          tab={tab}
          unread={unread}
          navTo={navTo}
          onBell={onBell}
          role={role}
          onLogout={onLogout}
        />
      </aside>

      {/* Mobile top bar */}
      <div
        className="admin-topbar"
        style={{
          display: "none",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: "white",
          borderBottom: "1px solid var(--off-white)",
          padding: "14px 16px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "1.1rem",
            fontWeight: 600,
            color: "var(--charcoal)",
          }}
        >
          Élan Admin
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            onClick={onBell}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              position: "relative",
              display: "flex",
              alignItems: "center",
              color: "var(--charcoal)",
            }}
          >
            <Bell size={unread > 0 ? 24 : 20} />
            {unread > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: -4,
                  right: -4,
                  background: "#c0392b",
                  color: "white",
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  padding: "1px 4px",
                  borderRadius: 9999,
                }}
              >
                {unread}
              </span>
            )}
          </button>
          <button
            onClick={() => setSidebarOpen(true)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              color: "var(--charcoal)",
            }}
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.4)",
                zIndex: 150,
              }}
            />
            <motion.aside
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                bottom: 0,
                width: 240,
                background: "white",
                zIndex: 200,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  padding: "12px 12px 0",
                }}
              >
                <button
                  onClick={() => setSidebarOpen(false)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--text-muted)",
                  }}
                >
                  <X size={20} />
                </button>
              </div>
              <SidebarContent
                tab={tab}
                unread={unread}
                navTo={(t) => {
                  setSidebarOpen(false);
                  navTo(t);
                }}
                onBell={() => {
                  setSidebarOpen(false);
                  onBell();
                }}
                role={role}
                onLogout={onLogout}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
