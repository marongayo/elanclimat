// app/api/seed/route.ts
// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import { createUser } from "@/lib/db";

// export async function GET() {
//   const password = await bcrypt.hash("superadmin2024", 10);
//   await createUser({
//     name: "Super Admin",
//     email: "superadmin@elanclimat.co.ke",
//     password,
//     role: "superadmin",
//   });
//   return NextResponse.json({ ok: true });
// }
// app/api/seed/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { ProductModel } from "@/lib/models/Product";

const products = [
  {
    name: "Eco Breeze 3.5kW Heat Pump",
    price: 2899,
    category: "HVAC",
    image:
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    ],
    description:
      "Premium inverter heat pump, whisper-quiet at 19dB, A+++ rated. Ideal for spaces up to 50m².",
    inStock: true,
    badge: "Best Seller",
  },
  {
    name: "SolarEdge 6kW Inverter",
    price: 1450,
    category: "Solar",
    image:
      "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=600&q=80",
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80",
    ],
    description:
      "Smart string inverter with integrated monitoring. Maximises yield from every panel independently.",
    inStock: true,
    badge: "",
  },
  {
    name: "PowerVault 10kWh Battery",
    price: 6200,
    category: "Batteries",
    image:
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600&q=80",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
    ],
    description:
      "Modular lithium-iron-phosphate battery. 6000-cycle warranty, wall-mounted, compatible with any inverter.",
    inStock: true,
    badge: "New",
  },
  {
    name: "AirPure HRV System",
    price: 1890,
    category: "HVAC",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80",
    ],
    description:
      "Heat recovery ventilator, 92% efficiency, quiet 25dB operation. Whole-home fresh air solution.",
    inStock: true,
    badge: "",
  },
  {
    name: "Solar Roof Panel 400W",
    price: 320,
    category: "Solar",
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80",
      "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=600&q=80",
    ],
    description:
      "Monocrystalline black-frame panel, 22.3% efficiency, 30-year power output warranty.",
    inStock: true,
    badge: "",
  },
  {
    name: "SmartEnergy Gateway",
    price: 490,
    category: "Batteries",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600&q=80",
    ],
    description:
      "Energy management hub linking solar, batteries, and HVAC. Real-time monitoring via app.",
    inStock: false,
    badge: "Coming Soon",
  },
  {
    name: "ClimateControl Split 5kW",
    price: 1650,
    category: "HVAC",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80",
    ],
    description:
      "Multi-zone split system, Wi-Fi enabled, voice control compatible. Ideal for 2–4 rooms.",
    inStock: true,
    badge: "",
  },
  {
    name: "EcoGen Hybrid Inverter 8kW",
    price: 2100,
    category: "Solar",
    image:
      "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=600&q=80",
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80",
    ],
    description:
      "Hybrid solar inverter with built-in battery interface and backup power capability.",
    inStock: true,
    badge: "Popular",
  },
  {
    name: "BatteryGuard 5kWh Storage",
    price: 3500,
    category: "Batteries",
    image:
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600&q=80",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
    ],
    description:
      "Compact lithium-ion battery, 5000 cycles, scalable up to 20kWh. Perfect for home energy storage.",
    inStock: true,
    badge: "",
  },
];

export async function GET() {
  try {
    await connectDB();
    await ProductModel.deleteMany({});
    await ProductModel.insertMany(products);
    return NextResponse.json({
      ok: true,
      message: `Seeded ${products.length} products successfully.`,
    });
  } catch (err) {
    console.error("Seed failed:", err);
    return NextResponse.json(
      { ok: false, error: String(err) },
      { status: 500 },
    );
  }
}
