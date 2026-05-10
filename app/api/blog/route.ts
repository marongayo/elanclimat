// api/blog/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getBlogPosts, saveBlogPost, deleteBlogPost } from "@/lib/db";
import { randomUUID } from "crypto";

export async function GET() {
  const posts = await getBlogPosts();
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const post = {
    ...body,
    id: body.id || randomUUID(),
    date: body.date || new Date().toISOString().split("T")[0],
  };
  await saveBlogPost(post);
  return NextResponse.json(post, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  await deleteBlogPost(id);
  return NextResponse.json({ ok: true });
}
