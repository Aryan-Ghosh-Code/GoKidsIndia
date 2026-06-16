import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth.edge";

const PROTECTED_ROUTES: Record<string, string[]> = {
  "/parent": ["parent", "admin", "superadmin"],
  "/instructor": ["instructor", "admin", "superadmin"],
  "/mentor": ["mentor", "admin", "superadmin"],
  "/admin": ["admin", "superadmin"],
  "/superadmin": ["superadmin"],
};

const ROLE_REDIRECTS: Record<string, string> = {
  parent: "/parent/dashboard",
  instructor: "/instructor/dashboard",
  mentor: "/mentor/dashboard",
  admin: "/admin/dashboard",
  superadmin: "/superadmin/dashboard",
};

// Pages that logged-in users should be bounced away from
const AUTH_ONLY_PATHS = ["/login", "/register"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // edgeAuth() is the edge-safe Auth.js v5 function — handles __Secure- cookie
  // prefixes correctly in both local (HTTP) and production (HTTPS / Vercel).
  // The old getToken() from next-auth/jwt silently returns null on Vercel because
  // it looks for "next-auth.session-token" while Auth.js v5 writes
  // "__Secure-authjs.session-token" on HTTPS, causing dashboard access to fail.
  const session = await auth();
  const userRole = (session?.user as { role?: string })?.role;

  // ── Development-only logging — never leaks PII to Vercel logs ───
  if (process.env.NODE_ENV !== "production") {
    console.log(
      `[Middleware] ${pathname} | User: ${session?.user?.email ?? "anonymous"} | Role: ${userRole ?? "none"}`
    );
  }

  // Only redirect away from auth pages if the session has a known, valid role.
  // A session with no role (stale/partial token) must NOT block access to /login.
  if (session && userRole && AUTH_ONLY_PATHS.includes(pathname)) {
    const redirect = ROLE_REDIRECTS[userRole] || "/";
    return NextResponse.redirect(new URL(redirect, req.url));
  }

  // Check protected routes
  for (const [route, allowedRoles] of Object.entries(PROTECTED_ROUTES)) {
    if (pathname.startsWith(route)) {
      if (!session) {
        const loginUrl = new URL("/login", req.url);
        // Only set callbackUrl for safe internal paths — prevents open-redirect injection
        if (
          pathname.startsWith("/") &&
          !pathname.startsWith("//") &&
          Object.keys(PROTECTED_ROUTES).some((r) => pathname.startsWith(r))
        ) {
          loginUrl.searchParams.set("callbackUrl", pathname);
        }
        return NextResponse.redirect(loginUrl);
      }

      if (!userRole || !allowedRoles.includes(userRole)) {
        const redirect = ROLE_REDIRECTS[userRole ?? ""] || "/";
        return NextResponse.redirect(new URL(redirect, req.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/parent/:path*",
    "/instructor/:path*",
    "/mentor/:path*",
    "/admin/:path*",
    "/superadmin/:path*",
    "/login",
    "/register",
  ],
};
