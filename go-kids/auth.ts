/**
 * Full NextAuth instance — includes bcryptjs + MongoDB (Node.js only).
 *
 * Used by:
 *   - app/api/auth/[...nextauth]/route.ts  (auth API handler)
 *   - Server Components / Server Actions   (reading session data)
 *
 * NOT used by middleware — middleware uses auth.edge.ts instead.
 */
import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
