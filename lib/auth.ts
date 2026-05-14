// lib/auth.ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";
import { getUserByEmail } from "@/lib/db";

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
        console.log("user found:", user);
        if (!user) return null;

        const valid = await bcrypt.compare(
          credentials?.password as string,
          user.password,
        );
        console.log("password valid:", valid); // false = password mismatch
        if (!valid) return null;

        return { id: user._id, email: user.email, role: user.role };
      },
    }),
  ],
});
