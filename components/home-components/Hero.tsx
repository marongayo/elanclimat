// components/home-components/Hero.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import styles from "./Hero.module.css";

const TAGS = [
  { label: "HVAC Services", href: "/services#hvac" },
  { label: "Plumbing Services", href: "/services#plumbing" },
  { label: "Solar Installation", href: "/services#solar" },
  { label: "Cold Room Installation", href: "/services#cold-room" },
  { label: "Elevator Installation", href: "/services#elevator" },
  { label: "Electrical", href: "/services#electrical" },
];

export default function Hero() {
  return (
    <div className={styles.wrapper}>
      <Image
        src="/images/qwerty.png"
        alt="HVAC and solar installation services in Kenya"
        fill
        priority
        className="object-cover object-[center_40%]"
        sizes="100vw"
        quality={85}
      />

      <div className={styles.overlay} />

      <div className={styles.content}>
        <div className={styles.bottom}>
          {/* Left: eyebrow + headline + CTA */}
          <div className={styles.copy}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowLine} />
              <span className={styles.eyebrowText}>
                Climate &amp; Energy Solutions
              </span>
            </div>

            <h1 className={styles.heading}>
              Redefining Comfort
              <br />
              <span className={styles.headingThin}>and Sustainability</span>
            </h1>

            <p className={styles.subheading}>
              Professional Heating, Ventilation & Air Conditioning (HVAC),
              solar, and refrigeration installation services across Nairobi,
              Mombasa, Kisumu, Eldoret, Nakuru, and Nyeri. Our services are
              engineered for homes, offices, hotels, and cold storage facilities
              in Kenya and across Uganda, Tanzania and Rwanda.
            </p>

            <Link href="/contact" className={styles.cta}>
              <span>Request a Quote</span>
              <span className={styles.ctaIcon}>
                <ArrowUpRight size={15} strokeWidth={2} />
              </span>
            </Link>
          </div>

          {/* Right: service tags */}
          <div className={styles.tags}>
            {TAGS.map((tag) => (
              <Link key={tag.label} href={tag.href} className={styles.tag}>
                <span className={styles.tagDot} />
                {tag.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
