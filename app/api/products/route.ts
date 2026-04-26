import { NextResponse } from "next/server";
import { getAll, create } from "@/app/lib/products-store";
import type { Product } from "@/app/lib/products-store";

export async function GET() {
  return NextResponse.json(getAll());
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, cat, price, desc, badge, icon } = body;

    if (!name?.trim() || !cat || !price || !desc?.trim()) {
      return NextResponse.json(
        { error: "name, cat, price and desc are required" },
        { status: 400 }
      );
    }

    const product = create({
      name: name.trim(),
      cat,
      price: Number(price),
      desc: desc.trim(),
      badge: badge ?? "",
      icon: icon ?? "📦",
    } as Omit<Product, "id">);

    return NextResponse.json(product, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
