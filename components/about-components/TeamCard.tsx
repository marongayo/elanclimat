import Image from "next/image";
import { C } from "@/app/about/_tokens";

export function TeamCard({
  name,
  role,
  image,
}: {
  name: string;
  role: string;
  image: string;
}) {
  return (
    <div>
      <div
        style={{
          position: "relative",
          aspectRatio: "3/4",
          overflow: "hidden",
          marginBottom: 16,
          background: C.offWhite,
        }}
      >
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          style={{ objectFit: "cover", objectPosition: "center top" }}
        />
      </div>
      <span
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1.05rem",
          fontWeight: 500,
          color: C.charcoal,
          display: "block",
          letterSpacing: "-0.01em",
        }}
      >
        {name}
      </span>
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.72rem",
          color: C.muted,
          letterSpacing: "0.04em",
        }}
      >
        {role}
      </span>
    </div>
  );
}
