// app/services/ServicesClient.tsx
// CLIENT COMPONENT — handles only sticky nav highlight and back-to-top
// Kept minimal so the page body remains server-rendered

"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

type ServiceNav = { id: string; anchor: string; title: string };

export default function ServicesClient({
  services,
}: {
  services: ServiceNav[];
}) {
  const [activeAnchor, setActiveAnchor] = useState(services[0]?.anchor ?? "");
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveAnchor(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    services.forEach((s) => {
      const el = document.getElementById(s.anchor);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [services]);

  return (
    <>
      {/* Sticky service nav */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          backgroundColor: "#f9f7f4",
          borderBottom: "1px solid #e8e8e4",
        }}
      >
        <nav className="svc-nav-inner" aria-label="Service sections">
          {services.map((s) => (
            <a
              key={s.id}
              href={`#${s.anchor}`}
              className={`svc-nav-link${activeAnchor === s.anchor ? " active" : ""}`}
              style={{
                borderBottomColor:
                  activeAnchor === s.anchor ? "#8fa68e" : "transparent",
                color: activeAnchor === s.anchor ? "#1a1a18" : "#888580",
              }}
            >
              {s.title}
            </a>
          ))}
        </nav>
      </div>

      {/* Back to top */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            position: "fixed",
            bottom: 28,
            right: 28,
            zIndex: 9999,
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: "#1a1a18",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
          }}
          aria-label="Back to top"
        >
          <ArrowUp size={16} color="#ffffff" />
        </button>
      )}
    </>
  );
}
