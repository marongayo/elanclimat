// lib/emails/generateWithdrawToken.ts
import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.AUTH_SECRET!);

export async function generateWithdrawToken(
  jobId: string,
  email: string,
): Promise<string> {
  return new SignJWT({ jobId, email })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("30d")
    .sign(secret);
}

export async function verifyWithdrawToken(
  token: string,
): Promise<{ jobId: string; email: string } | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as { jobId: string; email: string };
  } catch {
    return null;
  }
}
