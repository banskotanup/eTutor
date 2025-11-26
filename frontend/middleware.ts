// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = ["/", "/login", "/register", "/api", "/_next", "/static", "/favicon.ico"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get(process.env.COOKIE_NAME || "token")?.value;

  // Redirect logged-in users away from landing page
  if (pathname === "/" && token) {
    // Here you could redirect based on role
    // For example, send teacher to /teacher/dashboard, etc.
    const role = req.cookies.get("role")?.value; // save role in cookie when login
    if (role === "admin") return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    if (role === "teacher") return NextResponse.redirect(new URL("/teacher/dashboard", req.url));
    if (role === "student") return NextResponse.redirect(new URL("/student/dashboard", req.url));
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Allow public paths without token
  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) return NextResponse.next();

  // Protect other pages
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|static|favicon.ico).*)"],
};
