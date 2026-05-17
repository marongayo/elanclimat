// lib/auth.ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { getUserByEmail } from "@/lib/db";
import bcrypt from "bcryptjs"; // ← add this

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const user = await getUserByEmail(credentials?.email as string);
        if (!user) return null;

        const valid = await bcrypt.compare(
          // ← replace the === line
          credentials?.password as string,
          user.password,
        );
        if (!valid) return null;

        return { id: user._id, email: user.email, role: user.role };
      },
    }),
  ],
});
