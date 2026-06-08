// app/api/jobs/withdraw/route.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyWithdrawToken } from "@/lib/emails/generateWithdrawToken";
import { removeApplicant } from "@/lib/db";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }

  const payload = await verifyWithdrawToken(token);

  if (!payload) {
    return NextResponse.redirect(
      new URL("/careers/withdraw?success=false", request.url),
    );
  }

  try {
    await removeApplicant(payload.jobId, payload.email);
  } catch (error) {
    console.error("Withdraw error (possibly already removed):", error);
  }

  // Always redirect to success if token was valid
  return NextResponse.redirect(
    new URL("/careers/withdraw?success=true", request.url),
  );
}
