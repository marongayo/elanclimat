"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { C } from "@/app/about/_tokens";

export function ServiceCard({
  num,
  title,
  description,
  image,
  href,
}: {
  num: string;
  title: string;
  description: string;
  image: string;
  href: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      style={{ textDecoration: "none" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          background: "#ffffff",
          border: `1px solid ${hovered ? C.offWhite : C.rule}`,
          transition: "border-color 0.25s, transform 0.25s",
          transform: hovered ? "translateY(-4px)" : "none",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            position: "relative",
            aspectRatio: "16/9",
            overflow: "hidden",
          }}
        >
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{
              objectFit: "cover",
              transition: "transform 0.55s cubic-bezier(0.22,1,0.36,1)",
              transform: hovered ? "scale(1.05)" : "scale(1)",
            }}
          />
        </div>
        <div style={{ padding: "24px 24px 28px" }}>
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.58rem",
              letterSpacing: "0.18em",
              color: C.dim,
              display: "block",
              marginBottom: 10,
            }}
          >
            {num}
          </span>
          <h3
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.25rem",
              fontWeight: 500,
              color: C.charcoal,
              letterSpacing: "-0.01em",
              margin: "0 0 10px",
            }}
          >
            {title}
          </h3>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.78rem",
              color: C.body,
              lineHeight: 1.75,
              margin: "0 0 18px",
              fontWeight: 300,
            }}
          >
            {description}
          </p>
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.68rem",
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: hovered ? C.sageDark : C.charcoal,
              borderBottom: `1px solid ${hovered ? C.sageDark : C.charcoal}`,
              paddingBottom: 2,
              transition: "color 0.2s, border-color 0.2s",
            }}
          >
            Learn More
          </span>
        </div>
      </div>
    </Link>
  );
}
