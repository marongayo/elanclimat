// api/messages/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getProducts, saveProduct, deleteProduct } from '@/lib/data';
import { randomUUID } from 'crypto';

export async function GET() {
  return NextResponse.json(getProducts());
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const product = { ...body, id: body.id || randomUUID() };
  saveProduct(product);
  return NextResponse.json(product, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  deleteProduct(id);
  return NextResponse.json({ ok: true });
}
