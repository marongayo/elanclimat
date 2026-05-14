// lib/auth.config.ts

import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 2, // 2 hours
  },

  providers: [],

  callbacks: {
    async jwt({ token, user }) {
      // Runs on login
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }

      return token;
    },

    async session({ session, token }) {
      // Make custom fields available in client session
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};
