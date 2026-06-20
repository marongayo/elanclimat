// components/shop-components/ShopClient.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Product } from "@/lib/types/product";
import ShopHero from "./ShopHero";
import AboutCollections from "./AboutCollections";
import ImageStrip from "./ImageStrip";
import { CartFab } from "./CartFab";
import { CartDrawer } from "./CartDrawer";

export default function ShopClient({
  products = [],
  initialProduct = null,
}: {
  products: Product[];
  initialProduct?: Product | null;
}) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(initialProduct);
  const [cart, setCart] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  // Scroll to collections on initial product load
  useEffect(() => {
    if (initialProduct) {
      const t = setTimeout(() => {
        document.getElementById("collections")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 120);
      return () => clearTimeout(t);
    }
  }, [initialProduct]);

  function handleSelectProduct(product: Product | null) {
    setSelectedProduct(product);
    const url = product ? `/shop/${product._id}` : "/shop";
    window.history.pushState({ productId: product?._id ?? null }, "", url);
    document.title = product
      ? `${product.name} | Élan Climat & Énergie`
      : "Shop | Élan Climat & Énergie";
  }

  const addToCart = (id: string) =>
    setCart((prev) => (prev.includes(id) ? prev : [...prev, id]));

  const removeFromCart = (id: string) =>
    setCart((prev) => prev.filter((c) => c !== id));

  return (
    <main>
      {/* About / product detail section */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <AboutCollections
          products={products}
          cart={cart}
          onAddToCart={addToCart}
          selectedProduct={selectedProduct}
          onSelectProduct={handleSelectProduct}
        />
      </div>

      {/* Sticky background + ShopHero */}
      <div style={{ position: "relative" }}>
        <div style={{ position: "sticky", top: 0, height: "40vh", width: "100%", zIndex: 0 }}>
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <Image
              src="/sticky.png"
              alt="Interior scene"
              fill
              priority
              style={{ objectFit: "cover", objectPosition: "70% 20%" }}
            />
          </div>
        </div>

        <div style={{ position: "relative", zIndex: 1, marginTop: "-40vh" }}>
          <div style={{ height: "40vh" }} />
          <ShopHero
            products={products}
            cart={cart}
            onAddToCart={addToCart}
            onClearFilters={() => handleSelectProduct(null)}
            onSelectProduct={handleSelectProduct}
          />
        </div>
      </div>

      <ImageStrip />

      {/* Cart */}
      <CartFab count={cart.length} onClick={() => setCartOpen(true)} />
      <CartDrawer
        cart={cart}
        cartOpen={cartOpen}
        products={products}
        onClose={() => setCartOpen(false)}
        onRemove={removeFromCart}
      />
    </main>
  );
}
