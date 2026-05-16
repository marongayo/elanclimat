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

      {/* 
        Sticky image + ShopHero share a parent.
        Parent height = 40vh (image) + 420px (dark section height).
        This means the sticky image runs out of scroll room exactly
        when the dark section's bottom has passed it.
      */}
      <div style={{ position: "relative", height: "calc(40vh + 420px)" }}>
        {/* Sticky image */}
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

        {/* ShopHero overlaps the sticky image and scrolls over it */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            marginTop: "-40vh",
          }}
        >
          <ShopHero
            products={products}
            onClearFilters={() => {
              setCat("All");
              setSearch("");
              setSelectedProduct(null);
            }}
            onSelectProduct={setSelectedProduct}
          />
        </div>
      </div>

      <ImageStrip />
    </main>
  );
}