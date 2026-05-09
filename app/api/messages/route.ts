// api/messages/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getMessages, saveMessage, deleteMessage } from '@/lib/data';
import { randomUUID } from 'crypto';

export async function GET() {
  return NextResponse.json(getMessages());
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const msg = {
    ...body,
    id: body.id || randomUUID(),
    date: body.date || new Date().toISOString(),
    read: false,
  };
  saveMessage(msg);
  return NextResponse.json(msg, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  const { id } = await req.json();
  const messages = getMessages();
  const msg = messages.find(m => m.id === id);
  if (!msg) return NextResponse.json({ ok: false }, { status: 404 });
  saveMessage({ ...msg, read: true });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  deleteMessage(id);
  return NextResponse.json({ ok: true });
}