// lib/auth.ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
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
        console.log("=== LOGIN ATTEMPT ===");
        console.log("email received:", credentials?.email);
        console.log("password received:", credentials?.password);

        const user = await getUserByEmail(credentials?.email as string);
        console.log("user found:", user);
        if (!user) return null;

        const valid = credentials?.password === user.password;
        console.log("password valid:", valid);
        if (!valid) return null;

        return { id: user._id, email: user.email, role: user.role };
      },
    }),
  ],
});
