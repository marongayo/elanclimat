// app/api/seed/route.ts  ← DELETE THIS AFTER USE
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createUser } from "@/lib/db";

export async function GET() {
  const password = await bcrypt.hash("superadmin2024", 10);
  await createUser({
    name: "Super Admin",
    email: "superadmin@elanclimat.co.ke",
    password,
    role: "superadmin",
  });
  return NextResponse.json({ ok: true });
}
