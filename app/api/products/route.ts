// api/products/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getProducts, saveProduct, deleteProduct } from '@/lib/db';
import { randomUUID } from 'crypto';

export async function GET() {
  const products = await getProducts();
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const product = { ...body, id: body.id || randomUUID() };
  await saveProduct(product);
  const products = await getProducts();
  return NextResponse.json(products, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  await deleteProduct(id);
  return NextResponse.json({ ok: true });
}