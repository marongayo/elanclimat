// components/admin-components/AdminSidebar.tsx
"use client";

import {
  Bell,
  LayoutDashboard,
  Briefcase,
  FileText,
  Package,
  Eye,
  LogIn,
  Mail,
  X,
  Menu,
  Users,
  UserCircle,
  KeyRound,
  UserPen,
  ChevronUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import type { Role, Tab } from "@/lib/types/admin";

// ── Nav primitives ────────────────────────────────────────────────────────────

const NavItem = ({
  active,
  onClick,
  icon,
  label,
  badge,
  light = true,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  badge?: number;
  light?: boolean;
}) => (
  <button
    onClick={onClick}
    style={{
      display: "flex",
      alignItems: "center",
      gap: 10,
      width: "100%",
      padding: "9px 12px",
      background: active ? "rgba(255,255,255,0.1)" : "transparent",
      border: "none",
      borderLeft: active ? "2px solid #c9a96e" : "2px solid transparent",
      cursor: "pointer",
      fontFamily: "'DM Sans', sans-serif",
      fontSize: "0.82rem",
      color: active ? "#ffffff" : "rgba(255,255,255,0.55)",
      textAlign: "left" as const,
      fontWeight: active ? 500 : 400,
      transition: "background 0.15s, color 0.15s, border-color 0.15s",
      position: "relative" as const,
      letterSpacing: "0.01em",
    }}
    onMouseEnter={(e) => {
      if (!active) {
        e.currentTarget.style.background = "rgba(255,255,255,0.06)";
        e.currentTarget.style.color = "rgba(255,255,255,0.85)";
      }
    }}
    onMouseLeave={(e) => {
      if (!active) {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.color = "rgba(255,255,255,0.55)";
      }
    }}
  >
    <span
      style={{
        display: "flex",
        alignItems: "center",
        color: active ? "#c9a96e" : "rgba(255,255,255,0.35)",
        flexShrink: 0,
        transition: "color 0.15s",
      }}
    >
      {icon}
    </span>
    <span style={{ flex: 1 }}>{label}</span>
    {badge !== undefined && badge > 0 && (
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.6rem",
          fontWeight: 700,
          background: "#c0392b",
          color: "white",
          borderRadius: 9999,
          padding: "1px 6px",
          lineHeight: 1.7,
          minWidth: 18,
          textAlign: "center" as const,
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
  <div style={{ marginTop: 28 }}>
    <div
      style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "0.58rem",
        fontWeight: 600,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.2)",
        padding: "0 14px",
        marginBottom: 6,
      }}
    >
      {label}
    </div>
    {children}
  </div>
);

// ── UserFooter with popover ───────────────────────────────────────────────────

const UserFooter = ({
  userName,
  role,
  onLogout,
  onChangePassword,
  onChangeUsername,
}: {
  userName: string;
  role: Role;
  onLogout: () => void;
  onChangePassword: () => void;
  onChangeUsername: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const initials = userName
    ? userName
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : role === "superadmin"
      ? "SA"
      : "A";

  return (
    <div ref={ref} style={{ margin: "8px 0 0", position: "relative" }}>
      {/* Rule above footer */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", margin: "0 14px 8px" }} />

      {/* Popover */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            style={{
              position: "absolute",
              bottom: "calc(100% + 10px)",
              left: 12,
              right: 12,
              background: "#f9f7f4",
              border: "1px solid #ede9e2",
              boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
              overflow: "hidden",
              zIndex: 300,
            }}
          >
            <div
              style={{
                padding: "14px 16px 10px",
                borderBottom: "1px solid #ede9e2",
              }}
            >
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.1rem",
                  fontWeight: 400,
                  color: "#1a1a18",
                  letterSpacing: "-0.01em",
                }}
              >
                {userName || "—"}
              </div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.68rem",
                  color: "#8a8680",
                  marginTop: 2,
                  letterSpacing: "0.04em",
                }}
              >
                {role === "superadmin" ? "Super Admin · Full Access" : "Admin · Content Manager"}
              </div>
            </div>

            {[
              {
                icon: <UserPen size={13} />,
                label: "Change Username",
                action: () => { setOpen(false); onChangeUsername(); },
              },
              {
                icon: <KeyRound size={13} />,
                label: "Change Password",
                action: () => { setOpen(false); onChangePassword(); },
              },
            ].map((item) => (
              <button
                key={item.label}
                onClick={item.action}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  width: "100%",
                  padding: "10px 16px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.8rem",
                  color: "#3d3d3b",
                  textAlign: "left",
                  transition: "background 0.12s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#ede9e2")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
              >
                <span style={{ color: "#8a8680" }}>{item.icon}</span>
                {item.label}
              </button>
            ))}

            <div style={{ borderTop: "1px solid #ede9e2" }}>
              <button
                onClick={() => { setOpen(false); onLogout(); }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  width: "100%",
                  padding: "10px 16px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.8rem",
                  color: "#c0392b",
                  textAlign: "left",
                  transition: "background 0.12s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#fef2f2")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
              >
                <LogIn size={13} style={{ transform: "rotate(180deg)" }} />
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer card */}
      <div
        onClick={() => setOpen((v) => !v)}
        style={{
          margin: "0 8px 12px",
          padding: "10px 12px",
          background: open ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.05)",
          display: "flex",
          alignItems: "center",
          gap: 10,
          cursor: "pointer",
          transition: "background 0.15s",
        }}
        onMouseEnter={(e) => { if (!open) (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.08)"; }}
        onMouseLeave={(e) => { if (!open) (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.05)"; }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: role === "superadmin" ? "#c9a96e" : "rgba(255,255,255,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            color: role === "superadmin" ? "#1a1a18" : "rgba(255,255,255,0.8)",
            fontSize: "0.68rem",
            fontWeight: 700,
            fontFamily: "'DM Sans', sans-serif",
            letterSpacing: "0.04em",
            border: role === "superadmin" ? "none" : "1px solid rgba(255,255,255,0.2)",
          }}
        >
          {initials}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.82rem",
              fontWeight: 500,
              color: "rgba(255,255,255,0.9)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {userName || "—"}
          </div>
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.65rem",
              color: "rgba(255,255,255,0.35)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {role === "superadmin" ? "Full Access" : "Content Manager"}
          </div>
        </div>
        <ChevronUp
          size={14}
          style={{
            color: "rgba(255,255,255,0.3)",
            transition: "transform 0.2s",
            transform: open ? "rotate(0deg)" : "rotate(180deg)",
            flexShrink: 0,
          }}
        />
      </div>
    </div>
  );
};

// ── SidebarContent ────────────────────────────────────────────────────────────

const SidebarContent = ({
  tab,
  unread,
  navTo,
  onBell,
  role,
  onLogout,
  userName,
  onChangePassword,
  onChangeUsername,
}: {
  tab: Tab;
  userName: string;
  unread: number;
  navTo: (t: Tab) => void;
  onBell: () => void;
  role: Role;
  onLogout: () => void;
  onChangePassword: () => void;
  onChangeUsername: () => void;
}) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      height: "100%",
      background: "#1a1a18",
    }}
  >
    {/* Logo / Brand */}
    <div style={{ padding: "24px 16px 20px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {/* Geometric mark matching about page aesthetic */}
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
          <polygon points="13,1 25,8 25,20 13,25 1,20 1,8" stroke="#c9a96e" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
          <circle cx="13" cy="13" r="3" fill="#c9a96e" />
        </svg>
        <div>
          <div
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.05rem",
              fontWeight: 400,
              color: "#ffffff",
              letterSpacing: "0.01em",
              lineHeight: 1,
            }}
          >
            Élan Admin
          </div>
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.58rem",
              color: "rgba(255,255,255,0.3)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginTop: 2,
            }}
          >
            Control Panel
          </div>
        </div>
      </div>
    </div>

    {/* Thin gold rule */}
    <div style={{ height: 1, background: "rgba(201,169,110,0.2)", margin: "0 14px 16px" }} />

    {/* Nav */}
    <div style={{ padding: "0 2px", flex: 1, overflowY: "auto" }}>
      <NavItem
        active={tab === "dashboard"}
        onClick={() => navTo("dashboard")}
        icon={<LayoutDashboard size={14} />}
        label="Dashboard"
      />
      <NavItem
        active={false}
        onClick={onBell}
        icon={
          <span style={{ position: "relative", display: "flex" }}>
            {unread > 0 ? (
              <motion.div
                animate={{ rotate: [-8, 8, -8] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                style={{ display: "inline-flex", originX: 0.5, originY: 0 }}
              >
                <Bell size={14} />
              </motion.div>
            ) : (
              <Bell size={14} />
            )}
          </span>
        }
        label="Inbox"
        badge={unread}
      />
      <NavItem
        active={false}
        onClick={() => window.open("/", "_blank")}
        icon={<Eye size={14} />}
        label="View Site"
      />

      <NavSection label="Content">
        <NavItem
          active={tab === "blog"}
          onClick={() => navTo("blog")}
          icon={<FileText size={14} />}
          label="Blog Posts"
        />
        <NavItem
          active={tab === "products"}
          onClick={() => navTo("products")}
          icon={<Package size={14} />}
          label="Products"
        />
        <NavItem
          active={tab === "jobs"}
          onClick={() => navTo("jobs")}
          icon={<Briefcase size={14} />}
          label="Vacancies"
        />
      </NavSection>

      <NavSection label="Account">
        <NavItem
          active={false}
          onClick={onBell}
          icon={<Mail size={14} />}
          label="Messages"
          badge={unread}
        />
        <NavItem
          active={tab === "myaccount"}
          onClick={() => navTo("myaccount")}
          icon={<UserCircle size={14} />}
          label="My Account"
        />
        {role === "superadmin" && (
          <NavItem
            active={tab === "admins"}
            onClick={() => navTo("admins")}
            icon={<Users size={14} />}
            label="Admins"
          />
        )}
      </NavSection>
    </div>

    <UserFooter
      userName={userName}
      role={role}
      onLogout={onLogout}
      onChangePassword={onChangePassword}
      onChangeUsername={onChangeUsername}
    />
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
  userName,
  onChangePassword,
  onChangeUsername,
}: {
  tab: Tab;
  unread: number;
  navTo: (t: Tab) => void;
  onBell: () => void;
  userName: string;
  role: Role;
  onLogout: () => void;
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
  onChangePassword: () => void;
  onChangeUsername: () => void;
}) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="admin-sidebar-desktop"
        style={{
          width: 220,
          background: "#1a1a18",
          flexDirection: "column",
          position: "fixed",
          top: 0,
          bottom: 0,
          zIndex: 50,
        }}
      >
        <SidebarContent
          tab={tab}
          unread={unread}
          navTo={navTo}
          onBell={onBell}
          role={role}
          userName={userName}
          onLogout={onLogout}
          onChangePassword={onChangePassword}
          onChangeUsername={onChangeUsername}
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
          background: "#1a1a18",
          padding: "14px 20px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.15rem",
            fontWeight: 400,
            color: "#ffffff",
            letterSpacing: "-0.01em",
          }}
        >
          Élan Admin
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button
            onClick={onBell}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              position: "relative",
              display: "flex",
              alignItems: "center",
              color: "rgba(255,255,255,0.6)",
            }}
          >
            <Bell size={19} />
            {unread > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: -4,
                  right: -4,
                  background: "#c0392b",
                  color: "white",
                  fontSize: "0.58rem",
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
              color: "rgba(255,255,255,0.6)",
            }}
          >
            <Menu size={20} />
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
                background: "rgba(0,0,0,0.6)",
                zIndex: 150,
              }}
            />
            <motion.aside
              initial={{ x: -240 }}
              animate={{ x: 0 }}
              exit={{ x: -240 }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                bottom: 0,
                width: 240,
                background: "#1a1a18",
                zIndex: 200,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  padding: "14px 14px 0",
                }}
              >
                <button
                  onClick={() => setSidebarOpen(false)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "rgba(255,255,255,0.4)",
                  }}
                >
                  <X size={18} />
                </button>
              </div>
              <SidebarContent
                tab={tab}
                unread={unread}
                userName={userName}
                navTo={(t) => { setSidebarOpen(false); navTo(t); }}
                onBell={() => { setSidebarOpen(false); onBell(); }}
                role={role}
                onLogout={onLogout}
                onChangePassword={() => { setSidebarOpen(false); onChangePassword(); }}
                onChangeUsername={() => { setSidebarOpen(false); onChangeUsername(); }}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
