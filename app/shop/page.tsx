"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, Search, X, Plus, Minus, Flame, ArrowRight } from "lucide-react";
import type { Product } from "@/app/lib/products-store";

const CATEGORIES = ["All", "Solar Panels", "HVAC Systems", "Plumbing", "Electrical", "Generators", "Batteries"];

const CAT_BG: Record<string, string> = {
  "Solar Panels":  "bg-stone-amber/8",
  "HVAC Systems":  "bg-stone-sand-bg",
  "Plumbing":      "bg-blue-50",
  "Electrical":    "bg-orange-50",
  "Generators":    "bg-purple-50",
  "Batteries":     "bg-stone-sand-lt/20",
};

const BADGE: Record<string, string> = {
  eco: "bg-stone-charcoal/10 text-stone-charcoal",
  hot: "bg-stone-amber/15 text-stone-amber-dk",
  new: "bg-blue-100 text-blue-700",
};

interface CartItem extends Product { qty: number }

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart]         = useState<CartItem[]>([]);
  const [filter, setFilter]     = useState("All");
  const [search, setSearch]     = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast]       = useState<string | null>(null);
  const [loading, setLoading]   = useState(true);

useEffect(() => {
  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();

    setProducts(data);
    setLoading(false);
  };

  fetchProducts();
}, []);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2400); };

  const removeProduct = async (id: number) => {
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    setProducts(p => p.filter(x => x.id !== id));
    setCart(c => c.filter(x => x.id !== id));
    showToast("Product removed from store");
  };

  const addToCart = (p: Product) => {
    setCart(prev => {
      const ex = prev.find(i => i.id === p.id);
      if (ex) return prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...p, qty: 1 }];
    });
    showToast(`${p.name} added to cart`);
  };

  const changeQty = (id: number, d: number) =>
    setCart(p => p.map(i => i.id === id ? { ...i, qty: i.qty + d } : i).filter(i => i.qty > 0));
  const removeFromCart = (id: number) => setCart(p => p.filter(i => i.id !== id));

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const subtotal  = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const vat       = subtotal * 0.2;

  const visible = products.filter(p => {
    const catOk  = filter === "All" || p.cat === filter;
    const srchOk = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.cat.toLowerCase().includes(search.toLowerCase());
    return catOk && srchOk;
  });

  return (
    <div className="min-h-screen bg-stone-titanium font-sans">


      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* HEADER */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-stone-charcoal/8 border border-stone-charcoal/12 rounded-full px-4 py-1.5 mb-4">
            <span className="text-[10px] font-bold text-stone-char-lt tracking-[.12em]">ENERGY SOLUTIONS MARKETPLACE</span>
          </div>
          <h1 className="font-serif font-bold text-stone-charcoal leading-tight mb-2" style={{ fontSize: "clamp(28px,4vw,44px)" }}>
            Professional <em className="text-stone-amber not-italic">Products</em>
          </h1>
          <p className="text-stone-char-xlt text-sm font-light">{products.length} products across solar, HVAC, plumbing, electrical, generators &amp; batteries.</p>
        </div>

        {/* FILTERS */}
        <div className="flex gap-2 flex-wrap mb-8 items-center">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setFilter(c)}
              className={`px-4 py-2 rounded-full text-[12px] font-semibold border transition-all duration-200
                ${filter === c ? "bg-stone-charcoal text-stone-titanium border-stone-charcoal" : "bg-white text-stone-char-lt border-stone-sandstone/35 hover:border-stone-charcoal/40"}`}>
              {c}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-2 bg-white border border-stone-sandstone/30 rounded-full px-4 py-2">
            <Search size={13} className="text-stone-char-xlt/50" />
            <input type="text" placeholder="Search products…" value={search} onChange={e => setSearch(e.target.value)}
              className="text-[13px] text-stone-charcoal bg-transparent outline-none w-44 placeholder:text-stone-char-xlt/40" />
            {search && <button onClick={() => setSearch("")}><X size={13} className="text-stone-char-xlt/50" /></button>}
          </div>
        </div>

        {/* GRID */}
        {loading ? (
          <div className="text-center py-24 text-stone-char-xlt/50">
            <div className="text-4xl mb-4 animate-pulse">⏳</div>
            <p className="text-sm">Loading products…</p>
          </div>
        ) : visible.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-5xl mb-4 opacity-30">📭</div>
            <h3 className="font-serif text-stone-charcoal text-xl mb-2">No products found</h3>
            <p className="text-stone-char-xlt text-sm font-light">Try adjusting the category or search term.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {visible.map(p => (
              <div key={p.id}
                className="bg-white rounded-2xl border border-stone-sandstone/20 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-stone-sandstone/25 group relative">

                {/* Remove btn */}
                {/* <button onClick={() => removeProduct(p.id)}
                  className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-red-100 text-red-500 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-200 hover:bg-red-500 hover:text-white z-10 text-xs">
                  ✕
                </button>
                 */}

                {/* Image */}
                <div className={`${CAT_BG[p.cat] ?? "bg-stone-sand-bg"} h-40 flex items-center justify-center text-5xl relative`}>
                  {p.badge && (
                    <span className={`absolute top-3 left-3 ${BADGE[p.badge]} text-[9px] font-bold tracking-widest rounded-full px-2.5 py-0.5`}>
                      {p.badge.toUpperCase()}
                    </span>
                  )}
                  {p.icon}
                </div>

                <div className="p-5">
                  <div className="text-[10px] font-bold text-stone-amber tracking-widest mb-1">{p.cat.toUpperCase()}</div>
                  <h3 className="font-serif font-semibold text-stone-charcoal text-[16px] leading-snug mb-2">{p.name}</h3>
                  <p className="text-stone-char-xlt text-[12px] font-light leading-relaxed mb-4">{p.desc}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-serif text-stone-charcoal text-[19px] font-bold">
                        <span className="text-[13px] mr-1">KES</span>
                        {p.price.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-stone-char-xlt/50 ml-1">excl. VAT</span>
                    </div>
                    <button onClick={() => addToCart(p)}
                      className="btn-primary bg-stone-amber hover:bg-stone-amber-dk text-white text-[12px] font-semibold px-4 py-1.5 rounded-full transition-all duration-200">
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CART DRAWER */}
      {cartOpen && (
        <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setCartOpen(false)}>
          <div className="fixed top-20 right-6 bg-white w-80 max-w-sm h-auto max-h-[80vh] flex flex-col rounded-xl shadow-lg" onClick={e => e.stopPropagation()}>

            <div className="px-6 py-5 flex items-center justify-between border-b border-stone-sandstone/15">
              <h3 className="font-serif text-stone-charcoal text-xl">Your Cart</h3>
              <button onClick={() => setCartOpen(false)} className="text-stone-char-xlt/60 hover:text-stone-charcoal transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {cart.length === 0 ? (
                <div className="text-center py-16 text-stone-char-xlt/40">
                  <ShoppingCart size={44} className="mx-auto mb-3 text-stone-char-xlt/40" />
                  <p className="text-sm">Your cart is empty.</p>
                </div>
              ) : cart.map(item => (
                <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl border border-stone-sandstone/20 mb-3 bg-stone-titanium">
                  <div className="w-10 h-10 bg-stone-sand-bg rounded-lg flex items-center justify-center text-2xl shrink-0">{item.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-semibold text-stone-charcoal truncate">{item.name}</div>
                    <div className="text-[12px] text-stone-amber font-medium">€{(item.price * item.qty).toLocaleString()}</div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button onClick={() => changeQty(item.id, -1)} className="w-6 h-6 bg-stone-sand-bg rounded-full flex items-center justify-center text-stone-charcoal hover:bg-stone-charcoal hover:text-white transition-all">
                      <Minus size={11} />
                    </button>
                    <span className="text-[13px] font-bold text-stone-charcoal w-5 text-center">{item.qty}</span>
                    <button onClick={() => changeQty(item.id, 1)} className="w-6 h-6 bg-stone-sand-bg rounded-full flex items-center justify-center text-stone-charcoal hover:bg-stone-charcoal hover:text-white transition-all">
                      <Plus size={11} />
                    </button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-stone-sandstone/50 hover:text-red-500 transition-colors ml-1">
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>

            {cart.length > 0 && (
              <div className="p-5 border-t border-stone-sandstone/20 text-stone-char-xlt">
                <div className="flex justify-between text-sm mb-1.5"><span>Subtotal</span><span>€{subtotal.toLocaleString()}</span></div>
                <div className="flex justify-between text-sm mb-4"><span>VAT (20%)</span><span>€{Math.round(vat).toLocaleString()}</span></div>
                <div className="flex justify-between font-serif text-stone-charcoal text-xl font-bold mb-5"><span>Total</span><span>€{Math.round(subtotal + vat).toLocaleString()}</span></div>
                <button onClick={() => { setCart([]); setCartOpen(false); showToast("Order placed! Thank you."); }}
                  className="w-full btn-primary justify-center rounded-xl! py-3.5!">
                  Proceed to Checkout <ArrowRight size={15} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

{/* FLOATING CART BUTTON */}
{!cartOpen && (
  <button onClick={() => setCartOpen(true)} className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full  bg-white/20 backdrop-blur-md flex items-center justify-center cursor-pointer hover:bg-[#ff9d00] hover:animate-bounce">
  <ShoppingCart size={20} />
  
  <span className="absolute -top-1 -right-1 bg-red-400 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center cursor-pointer">
    {cartCount}
  </span>
</button>

)}
      {/* TOAST */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-stone-charcoal text-stone-titanium px-5 py-3 rounded-xl text-[13px] font-medium shadow-2xl z-50 animate-fade-up flex items-center gap-2">
          <span className="text-stone-amber">✓</span> {toast}
        </div>
      )}
    </div>

    
  );
}
