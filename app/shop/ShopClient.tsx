// shop/ShopClient.tsx

"use client";

import { useState } from "react";
import { Product } from "@/lib/data";

import Navbar from "@/components/Navbar";
import ShopHero from "@/components/shop-components/ShopHero";
import { CardCarousel } from "@/components/shop-components/CardCarousel";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";

const CATEGORIES = ["All", "HVAC", "Solar", "Batteries"];

export default function ShopClient({ products = [] }: { products: Product[] }) {
  const [cat, setCat] = useState("All");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [showNav, setShowNav] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setShowNav(latest > 80);
  });

  const filtered = products.filter(
    (p) =>
      (cat === "All" || p.category === cat) &&
      (p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())),
  );

  const addToCart = (id: string) => {
    setCart((prev) => [...prev, id]);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((c) => c !== id));
  };

  return (
    <main>
      {/* Floating Navbar */}
      <motion.div
        initial={false}
        animate={{
          opacity: showNav ? 1 : 0,
          y: showNav ? 0 : -30,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 50,
          pointerEvents: showNav ? "auto" : "none",
        }}
      >
        <Navbar />
      </motion.div>

      {/* Hero Section */}
      <ShopHero products={products} />

      {/* Example Product Section */}
      <section
        style={{
          padding: "4rem 2rem",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <CardCarousel
          products={filtered}
          title="Featured Products"
          addToCart={addToCart}
        />
      </section>
    </main>
  );
}
