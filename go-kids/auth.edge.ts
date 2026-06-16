/**
 * Edge-safe Auth.js export — NO Node.js-only imports (bcryptjs, mongoose, stream, etc.)
 *
 * This file is intentionally separate from auth.ts.
 * auth.ts imports authOptions which pulls in bcryptjs + mongoose (Node.js only).
 * Even if you only import `edgeAuth` from auth.ts, the bundler evaluates the
 * entire module, bringing those Node.js deps into the Edge Runtime → crash.
 *
 * Solution: this file is a completely isolated module that only imports the
 * edge-safe authConfig. Middleware imports from here; nothing else does.
 *
 * Used by:
 *   - middleware.ts  (Edge Runtime)
 *
 * NOT used by:
 *   - app/api/auth/[...nextauth]/route.ts  (imports handlers from auth.ts)
 *   - Server Components / Server Actions   (import auth from auth.ts)
 */
import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth/authConfig";

export const { auth } = NextAuth(authConfig);
