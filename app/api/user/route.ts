// app/api/user/route.ts

import { NextRequest, NextResponse } from "next/server";
import {
  getUserByEmail,
  getAllUsers,
  createUser,
  updateUserPassword,
  deleteUser,
} from "@/lib/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (email) {
    const user = await getUserByEmail(email);
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    return NextResponse.json(user);
  }
  const users = await getAllUsers();
  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  await createUser(body);
  const user = await getUserByEmail(body.email);
  return NextResponse.json(user, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  const { id, password } = await req.json();
  if (!id || !password) {
    return NextResponse.json(
      { error: "id and password are required" },
      { status: 400 },
    );
  }
  await updateUserPassword(id, password);
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  await deleteUser(id);
  return NextResponse.json({ ok: true });
}
