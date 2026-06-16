import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

/**
 * Edge-safe Auth.js config — NO Node.js-only imports (bcryptjs, mongoose, etc.)
 * Used exclusively by middleware.ts which runs in the Edge Runtime.
 *
 * The full config (with bcrypt + MongoDB) lives in lib/auth/authOptions.ts
 * and is used only in the API route handler (app/api/auth/[...nextauth]/route.ts).
 */
export const authConfig: NextAuthConfig = {
  providers: [
    // Google provider is edge-safe (no Node.js deps)
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    // JWT callback runs on the edge during middleware — must not import mongoose/bcrypt.
    // The role was already embedded into the JWT by the full config during sign-in,
    // so we just forward it here.
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role;
      }
      return token;
    },

    // Session callback — expose role and id to session.user
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        (session.user as { role?: string }).role = token.role as string;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
};
