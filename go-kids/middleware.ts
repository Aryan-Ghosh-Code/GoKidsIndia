import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

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

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Redirect logged-in users away from auth pages
  if (token && (pathname === "/login" || pathname === "/register")) {
    const role = token.role as string;
    const redirect = ROLE_REDIRECTS[role] || "/";
    return NextResponse.redirect(new URL(redirect, req.url));
  }

  // Check protected routes
  for (const [route, allowedRoles] of Object.entries(PROTECTED_ROUTES)) {
    if (pathname.startsWith(route)) {
      if (!token) {
        const loginUrl = new URL("/login", req.url);
        loginUrl.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(loginUrl);
      }

      const role = token.role as string;
      if (!allowedRoles.includes(role)) {
        const redirect = ROLE_REDIRECTS[role] || "/";
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
