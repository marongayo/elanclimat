// api/blog/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getBlogPosts, saveBlogPost, deleteBlogPost } from "@/lib/db";

export async function GET() {
  const posts = await getBlogPosts();
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const post = {
      ...body,
      date: body.date || new Date().toISOString().split("T")[0],
    };
    await saveBlogPost(post);
    return NextResponse.json(post, { status: 201 });
  } catch (err: any) {
    console.error("POST /api/blog error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  await deleteBlogPost(id);
  return NextResponse.json({ ok: true });
}
