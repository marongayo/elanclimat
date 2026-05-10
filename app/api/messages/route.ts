// api/messages/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getMessages, saveMessage, deleteMessage } from "@/lib/db";
import { randomUUID } from "crypto";

export async function GET() {
  try {
    const messages = await getMessages();
    return NextResponse.json(messages);
  } catch (err) {
    console.error("GET /api/messages error:", err);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const msg = {
      ...body,
      id: body.id || randomUUID(),
      date: body.date || new Date().toISOString(),
      read: false,
    };
    await saveMessage(msg);
    return NextResponse.json(msg, { status: 201 });
  } catch (err) {
    console.error("POST /api/messages error:", err);
    return NextResponse.json(
      { error: "Failed to save message" },
      { status: 500 },
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id } = await req.json();
    const messages = await getMessages();
    const msg = messages.find((m) => m.id === id);
    if (!msg) return NextResponse.json({ ok: false }, { status: 404 });
    await saveMessage({ ...msg, read: true });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("PATCH /api/messages error:", err);
    return NextResponse.json(
      { error: "Failed to update message" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    await deleteMessage(id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("DELETE /api/messages error:", err);
    return NextResponse.json(
      { error: "Failed to delete message" },
      { status: 500 },
    );
  }
}
