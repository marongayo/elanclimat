// components/home-components/ServicesSection.tsx
// SERVER COMPONENT — no "use client", fully static and indexable by Google

import Image from "next/image";
import Link from "next/link";
import styles from "./ServicesSection.module.css";

const SERVICES = [
  {
    id: "hvac",
    anchor: "hvac",
    num: "01",
    eyebrow: "Climate Control",
    title: "HVAC Services",
    seoTitle: "HVAC Installation & Maintenance in Kenya",
    cardDescription:
      "Split units, VRF systems, and ducted AC designed, installed, and serviced for homes, offices, and hotels across Nairobi, Mombasa, and Kisumu.",
    image: "/images/HVAC.jpg",
    imageAlt: "HVAC installation project in Nairobi Kenya",
  },
  {
    id: "plumbing",
    anchor: "plumbing",
    num: "02",
    eyebrow: "Water Systems",
    title: "Plumbing Services",
    seoTitle: "Commercial & Residential Plumbing in Kenya",
    cardDescription:
      "Supply lines, riser systems, and sanitary installations for commercial buildings, apartments, and hospitals across Nairobi, Mombasa, and Nyeri.",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    imageAlt: "Commercial plumbing installation Kenya",
  },
  {
    id: "solar",
    anchor: "solar",
    num: "03",
    eyebrow: "Renewable Energy",
    title: "Solar Installation",
    seoTitle: "Solar Panel Installation in Kenya — Grid-Tied & Off-Grid",
    cardDescription:
      "Grid-tied, off-grid, and hybrid solar PV systems with battery storage for homes, businesses, and farms across Nairobi, Nakuru, and rural Kenya.",
    image: "/images/solar.jpg",
    imageAlt: "Solar panel installation Kenya",
  },
  {
    id: "cold-room",
    anchor: "cold-room",
    num: "04",
    eyebrow: "Refrigeration",
    title: "Cold Room Installation",
    seoTitle: "Cold Room & Refrigeration Services in Kenya",
    cardDescription:
      "Walk-in cold rooms and blast freezers for food processors, hotels, and pharmaceuticals across Nairobi, Mombasa, Eldoret, and Nakuru.",
    image: "/images/coldroom.webp",
    imageAlt: "Cold room installation Kenya",
  },
  {
    id: "elevator",
    anchor: "elevator",
    num: "05",
    eyebrow: "Vertical Transport",
    title: "Elevator Installation",
    seoTitle: "Elevator & Lift Installation in Kenya",
    cardDescription:
      "Passenger, goods, and hospital lifts for residential and commercial buildings across Nairobi. KEBS-compliant with 24/7 maintenance support.",
    image: "/images/elevator.jpg",
    imageAlt: "Elevator installation Nairobi Kenya",
  },
  {
    id: "electrical",
    anchor: "electrical",
    num: "06",
    eyebrow: "Power Systems",
    title: "Electrical Services",
    seoTitle: "Electrical Installation & Engineering in Kenya",
    cardDescription:
      "LV distribution, standby generators, earthing, and smart building automation for offices, hospitals, and industrial facilities across Kenya.",
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80",
    imageAlt: "Electrical installation Kenya",
  },
];

export default function ServicesSection() {
  return (
    <section
      aria-label="Engineering services offered by Élan Climat in Kenya"
      className={styles.section}
    >
      <div className={styles.inner}>
        {/* ── Section header ── */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            {/* Eyebrow */}
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowLine} />
              <span className={styles.eyebrowText}>What We Do</span>
            </div>

            {/* h2 — keyword rich, visible to Google */}
            <h2 className={styles.heading}>
              HVAC, Solar & Engineering
              <br />
              <span className={styles.headingThin}>Services Across Kenya</span>
            </h2>

            {/* Supporting copy */}
            <p className={styles.subheading}>
              Six engineering disciplines delivered by certified technicians
              across Nairobi, Mombasa, Kisumu, Eldoret, Nakuru, and Nyeri —
              and throughout Uganda, Tanzania, and Rwanda.
            </p>
          </div>

          <Link href="/services" className={styles.viewAllLink}>
            View All Services
          </Link>
        </div>

        {/* ── Service grid ── */}
        <div className={styles.grid} role="list">
          {SERVICES.map((service) => (
            <Link
              key={service.id}
              href={`/services#${service.anchor}`}
              className={styles.card}
              role="listitem"
              aria-label={service.seoTitle}
            >
              {/* Image */}
              <div className={styles.imageWrapper}>
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className={styles.cardImage}
                  quality={80}
                />
                <span className={styles.numBadge}>{service.num}</span>
              </div>

              {/* Card body */}
              <div className={styles.cardBody}>
                <span className={styles.cardEyebrow}>{service.eyebrow}</span>

                <h3 className={styles.cardTitle}>{service.seoTitle}</h3>

                <p className={styles.cardDescription}>
                  {service.cardDescription}
                </p>

                <div className={styles.cardCta}>
                  <span className={styles.cardCtaLabel}>Learn More</span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#1a1a18"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
