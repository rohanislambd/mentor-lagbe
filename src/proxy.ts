import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const isAuthRoute = pathname === "/sign-in" || pathname === "/sign-up";
  const isProtectedRoute =
    pathname.startsWith("/dashboard") || pathname.startsWith("/payment");

  // Logged-in users cannot access sign-in or sign-up pages (redirect to home)
  if (session && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Non-logged-in users cannot access protected routes
  if (!session && isProtectedRoute) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/payment",
    "/payment/:path*",
    "/sign-in",
    "/sign-up",
  ],
};
