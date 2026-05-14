// lib/auth.config.ts
import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 2,
  },
  providers: [], // ✅ leave empty, real logic is in lib/auth.ts
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = (user as any).role;
      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.role = token.role as string;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
