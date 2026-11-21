import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const sessionToken =
    request.cookies.get("better-auth.session_token")?.value ||
    request.cookies.get("__Secure-better-auth.session_token")?.value;

  const isAuthRoute = pathname === "/sign-in" || pathname === "/sign-up";

  // If already logged in and visiting sign-in or sign-up, redirect to callbackUrl or home
  if (sessionToken && isAuthRoute) {
    const callbackUrl = request.nextUrl.searchParams.get("callbackUrl");
    const redirectUrl =
      callbackUrl && callbackUrl.startsWith("/") ? callbackUrl : "/";
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  // Protected routes requiring authentication
  const isProtectedRoute =
    pathname.startsWith("/payment") || pathname.startsWith("/dashboard");

  if (!sessionToken && isProtectedRoute) {
    const callback = `${pathname}${search}`;
    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set("callbackUrl", callback);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/payment",
    "/payment/:path*",
    "/dashboard",
    "/dashboard/:path*",
    "/sign-in",
    "/sign-up",
  ],
};
