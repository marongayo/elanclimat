"use client";

import Image from "next/image";
import { useState } from "react";

const IMAGES = [
  { src: "/muhammed.jpg", alt: "Solar Project" },
  { src: "/newpowa.jpg", alt: "Solar Remote Project" },
  { src: "/mostafa.jpg", alt: "Electricals Project" },
  { src: "/andrianto.jpg", alt: "HVAC Project" },
  { src: "/everett.jpg", alt: "Interior shot 5" },
];

const HANDLE = "elan climat & energy || shop the look of energy sustainability";

export default function ImageStrip() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      style={{
        width: "100%",
        background: "#ffffff",
        paddingBottom: 0,
      }}
    >
      <style>{`
        .strip-handle {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          font-weight: 400;
          letter-spacing: 0.08em;
          color: #1a1a18;
          display: block;
          text-align: center;
          padding: 28px 0 20px;
          margin: 0;
        }

        .strip-grid {
          display: flex;
          width: 100%;
          overflow: hidden;
          height: 420px;
        }

        @media (max-width: 768px) {
          .strip-grid { height: 320px; }
          .strip-cell:nth-child(4),
          .strip-cell:nth-child(5) {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .strip-grid { height: 260px; }
          .strip-cell:nth-child(3),
          .strip-cell:nth-child(4),
          .strip-cell:nth-child(5) {
            display: none;
          }
        }

        .strip-cell {
          position: relative;
          flex: 1;
          overflow: hidden;
          transition: flex 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .strip-cell:hover {
          flex: 2.2;
        }

        .strip-overlay {
          position: absolute;
          inset: 0;
          background: rgba(26, 26, 24, 0.15);
          transition: background 0.4s ease;
          z-index: 2;
        }

        .strip-cell:hover .strip-overlay {
          background: rgba(26, 26, 24, 0);
        }
      `}</style>

      {/* Handle */}

      <p className="strip-handle">{HANDLE}</p>
    </section>
  );
}
