"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Flame, X } from "lucide-react";
import type { Product } from "@/app/lib/products-store";

const CATEGORIES = ["Solar Panels","HVAC Systems","Plumbing","Electrical","Generators","Batteries"];
const ICONS = ["☀️","🌞","🔆","🌡️","❄️","💨","🔧","💧","🛠️","⚡","🔌","📦","⚙️","🏭","🔋","🗄️","🌿","🏠"];
const EMPTY = { name:"", cat:"Solar Panels", price:"", desc:"", badge:"" as Product["badge"], icon:"☀️" };

const CAT_COLOR: Record<string, string> = {
  "Solar Panels":"bg-stone-amber/15 text-stone-amber-dk",
  "HVAC Systems":"bg-stone-sand-bg text-stone-char-lt",
  "Plumbing":"bg-blue-100 text-blue-700",
  "Electrical":"bg-orange-100 text-orange-700",
  "Generators":"bg-purple-100 text-purple-700",
  "Batteries":"bg-emerald-100 text-emerald-700",
};

const BADGE_COLOR: Record<string, string> = {
  eco:"bg-stone-charcoal/10 text-stone-charcoal",
  hot:"bg-stone-amber/15 text-stone-amber-dk",
  new:"bg-blue-100 text-blue-700",
};

const inputCls = "w-full px-4 py-2.5 rounded-xl border border-stone-sandstone/30 bg-stone-titanium text-stone-charcoal text-[13px] font-sans placeholder:text-stone-char-xlt/40 outline-none focus:border-stone-amber focus:ring-1 focus:ring-stone-amber/30 transition-all duration-200";

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm]         = useState({ ...EMPTY });
  const [toast, setToast]       = useState<string | null>(null);
  const [loading, setLoading]   = useState(true);
  const [busy, setBusy]         = useState(false);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2400); };

  const fetchProducts = useCallback(async () => {
    const res = await fetch("/api/products");
    setProducts(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const handleAdd = async () => {
    if (!form.name.trim() || !form.price || !form.desc.trim()) {
      showToast("⚠ Please fill in name, price and description.");
      return;
    }
    setBusy(true);
    const res = await fetch("/api/products", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, price: Number(form.price) }),
    });
    if (res.ok) {
      const created = await res.json();
      setProducts(p => [created, ...p]);
      setForm({ ...EMPTY });
      showToast(`✓ "${created.name}" added to store`);
    }
    setBusy(false);
  };

  const handleRemove = async (id: number, name: string) => {
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    setProducts(p => p.filter(x => x.id !== id));
    showToast(`Removed "${name}"`);
  };

  const f = (label: string, node: React.ReactNode) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-bold text-stone-amber tracking-[.1em]">{label}</label>
      {node}
    </div>
  );

  return (
    <div className="min-h-screen bg-stone-titanium font-sans">

      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-stone-charcoal shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-stone-amber rounded-full flex items-center justify-center">
              <Flame size={15} className="text-white" />
            </div>
            <div>
              <div className="font-serif font-bold text-stone-titanium text-[15px] leading-tight">Admin Panel</div>
              <div className="text-[8px] text-stone-amber tracking-[.18em] font-semibold">ÉLAN SHOP</div>
            </div>
          </div>
          <div className="flex gap-3">
            <Link href="/shop" className="text-stone-sand-lt/60 text-[13px] font-medium px-4 py-1.5 rounded-full border border-stone-sandstone/20 hover:border-stone-sandstone/50 hover:text-stone-sand-lt transition-all">
              ← Store
            </Link>
            <Link href="/" className="text-stone-sand-lt/60 text-[13px] font-medium px-4 py-1.5 rounded-full border border-stone-sandstone/20 hover:border-stone-sandstone/50 hover:text-stone-sand-lt transition-all">
              🏠 Main Site
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* PAGE HEADER + STATS */}
        <div className="flex flex-wrap items-start justify-between gap-6 mb-10">
          <div>
            <h1 className="font-serif font-bold text-stone-charcoal leading-tight mb-1" style={{ fontSize: "clamp(24px,3.5vw,38px)" }}>
              Product <em className="text-stone-amber not-italic">Management</em>
            </h1>
            <p className="text-stone-char-xlt text-sm font-light">Add new products or remove existing ones from the store.</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            {[
              { num: products.length,                        lbl: "PRODUCTS" },
              { num: new Set(products.map(p => p.cat)).size, lbl: "CATEGORIES" },
              { num: `€${products.reduce((s,p)=>s+p.price,0).toLocaleString()}`, lbl: "VALUE" },
            ].map(s => (
              <div key={s.lbl} className="bg-white border border-stone-sandstone/25 rounded-xl px-5 py-3 text-center min-w-[90px]">
                <div className="font-serif text-stone-charcoal text-xl font-bold">{s.num}</div>
                <div className="text-[9px] text-stone-amber font-bold tracking-[.1em] mt-0.5">{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ADD FORM */}
        <div className="bg-white rounded-2xl border border-stone-sandstone/20 p-7 mb-7 shadow-sm">
          <h2 className="font-serif text-stone-charcoal text-xl mb-6 flex items-center gap-2">
            ➕ Add New Product
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {f("PRODUCT NAME",
              <input className={inputCls} placeholder="e.g. SunPower 400W Panel"
                value={form.name} onChange={e => setForm(x => ({ ...x, name: e.target.value }))} />
            )}
            {f("CATEGORY",
              <select className={inputCls} value={form.cat} onChange={e => setForm(x => ({ ...x, cat: e.target.value }))}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            )}
            {f("PRICE (€ excl. VAT)",
              <input className={inputCls} type="number" min="0" placeholder="0"
                value={form.price} onChange={e => setForm(x => ({ ...x, price: e.target.value }))} />
            )}
            {f("BADGE",
              <select className={inputCls} value={form.badge} onChange={e => setForm(x => ({ ...x, badge: e.target.value as Product["badge"] }))}>
                <option value="">None</option>
                <option value="new">NEW</option>
                <option value="hot">HOT</option>
                <option value="eco">ECO</option>
              </select>
            )}
            {f("ICON",
              <select className={inputCls} value={form.icon} onChange={e => setForm(x => ({ ...x, icon: e.target.value }))}>
                {ICONS.map(ic => <option key={ic} value={ic}>{ic} {ic}</option>)}
              </select>
            )}
          </div>
          {f("DESCRIPTION",
            <textarea className={`${inputCls} resize-none min-h-[72px]`}
              placeholder="Short product description…"
              value={form.desc} onChange={e => setForm(x => ({ ...x, desc: e.target.value }))} />
          )}
          <button onClick={handleAdd} disabled={busy}
            className={`mt-5 btn-primary ${busy ? "opacity-60 cursor-not-allowed" : ""}`}>
            {busy ? "Adding…" : "➕ Add Product to Store"}
          </button>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-2xl border border-stone-sandstone/20 overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-stone-sandstone/15 flex items-center justify-between">
            <h2 className="font-serif text-stone-charcoal text-lg">All Products</h2>
            <span className="bg-stone-sand-bg text-stone-char-lt text-[11px] font-bold rounded-full px-3 py-1">{products.length} items</span>
          </div>

          {loading ? (
            <div className="p-10 text-center text-stone-char-xlt/50 text-sm">Loading…</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-stone-sand-bg/50">
                    {["Product","Category","Price","Badge","Action"].map(h => (
                      <th key={h} className="px-5 py-3 text-left text-[10px] font-bold text-stone-amber tracking-[.1em] border-b border-stone-sandstone/15">
                        {h.toUpperCase()}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p.id} className="border-b border-stone-sandstone/10 hover:bg-stone-sand-bg/30 transition-colors group">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-stone-sand-bg rounded-lg flex items-center justify-center text-xl flex-shrink-0">{p.icon}</div>
                          <div>
                            <div className="font-semibold text-stone-charcoal text-[13px]">{p.name}</div>
                            <div className="text-stone-char-xlt/50 text-[11px] font-light">
                              {p.desc.length > 50 ? p.desc.slice(0,50) + "…" : p.desc}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`${CAT_COLOR[p.cat] ?? "bg-stone-sand-bg text-stone-char-lt"} text-[10px] font-bold rounded-full px-3 py-1`}>
                          {p.cat}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 font-serif font-bold text-stone-charcoal text-[15px]">
                        €{p.price.toLocaleString()}
                      </td>
                      <td className="px-5 py-3.5">
                        {p.badge
                          ? <span className={`${BADGE_COLOR[p.badge]} text-[10px] font-bold rounded-full px-2.5 py-0.5`}>{p.badge.toUpperCase()}</span>
                          : <span className="text-stone-sandstone/40 text-sm">—</span>}
                      </td>
                      <td className="px-5 py-3.5">
                        <button onClick={() => handleRemove(p.id, p.name)}
                          className="text-[11px] font-semibold text-red-500 border border-red-200 bg-red-50 rounded-full px-3 py-1 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-200 flex items-center gap-1">
                          <X size={11} /> Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* TOAST */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-stone-charcoal text-stone-titanium px-5 py-3 rounded-xl text-[13px] font-medium shadow-2xl z-50 animate-fade-up flex items-center gap-2">
          <span className="text-stone-amber">✓</span> {toast}
        </div>
      )}
    </div>
  );
}
