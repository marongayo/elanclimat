"use client";

import { useState } from "react";
import { Product } from "@/lib/data";

import Navbar from "@/components/Navbar";
import ShopHero from "@/components/shop-components/ShopHero";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Image from "next/image";
import AboutCollections from "@/components/shop-components/AboutCollections";
import ImageStrip from "@/components/shop-components/ImageStrip";

export default function ShopClient({ products = [] }: { products: Product[] }) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
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

      {/* About / Hero Section */}
      <AboutCollections
        products={products}
        cart={cart}
        onAddToCart={addToCart}
        selectedProduct={selectedProduct}
        onSelectProduct={setSelectedProduct}
      />

      {/* Sticky image separator — 80vh container gives 40vh of visible scroll time */}
      <div style={{ position: "relative", height: "80vh" }}>
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "40vh",
            width: "100%",
            zIndex: 0,
          }}
        >
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <Image
              src="/everett.jpg"
              alt="Interior scene"
              fill
              priority
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </div>
        </div>
      </div>

      {/* ShopHero */}
      <ShopHero
        products={products}
        onClearFilters={() => {
          setCat("All");
          setSearch("");
          setSelectedProduct(null);
        }}
        onSelectProduct={setSelectedProduct}
      />

      <ImageStrip />
    </main>
  );
}