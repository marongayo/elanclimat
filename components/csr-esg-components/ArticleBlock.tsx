import Image from "next/image";
import { C } from "@/lib/constants";

export function ArticleBlock({
  eyebrowNum,
  eyebrowLabel,
  title,
  paragraphs,
  image,
  imageAlt,
  reverse = false,
}: {
  eyebrowNum: string;
  eyebrowLabel: string;
  title: string;
  paragraphs: string[];
  image: string;
  imageAlt: string;
  reverse?: boolean;
}) {
  return (
    <div
      className="article-block"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 80,
        alignItems: "center",
        padding: "64px 0",
        borderBottom: `1px solid ${C.rule}`,
      }}
    >
      {/* Image */}
      <div
        className="article-block-image"
        style={{
          order: reverse ? 2 : 1,
          position: "relative",
          aspectRatio: "4/3",
          overflow: "hidden",
        }}
      >
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          style={{ objectFit: "cover" }}
        />
      </div>

      {/* Text */}
      <div
        className="article-block-text"
        style={{
          order: reverse ? 1 : 2,
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 12,
          }}
        >
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.6rem",
              color: C.dim,
              letterSpacing: "0.14em",
            }}
          >
            {eyebrowNum}
          </span>
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.64rem",
              fontWeight: 500,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: C.sageDark,
            }}
          >
            {eyebrowLabel}
          </span>
        </div>

        <h3
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(1.6rem, 2.4vw, 2.1rem)",
            fontWeight: 400,
            color: C.charcoal,
            letterSpacing: "-0.015em",
            lineHeight: 1.18,
            margin: 0,
          }}
        >
          {title}
        </h3>

        <div style={{ width: 32, height: 1, background: C.ruleLight }} />

        {paragraphs.map((p, i) => (
          <p
            key={i}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.85rem",
              color: C.body,
              lineHeight: 1.85,
              margin: 0,
              fontWeight: 300,
            }}
          >
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}
