import { NextRequest, NextResponse } from "next/server";
import {
  getMessages,
  getArchivedMessages,
  saveMessage,
  deleteMessage,
} from "@/lib/db";
import { randomUUID } from "crypto";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  if (searchParams.get("archived") === "true") {
    const messages = await getArchivedMessages();
    return NextResponse.json(messages);
  }
  const messages = await getMessages();
  return NextResponse.json(messages);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const msg = { ...body, id: body.id || randomUUID(), read: false };
  await saveMessage(msg);
  return NextResponse.json(msg, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  await saveMessage({ ...body, read: true });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  await deleteMessage(id);
  return NextResponse.json({ ok: true });
}
