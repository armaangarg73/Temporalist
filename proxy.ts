import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const proxy = auth((req) => {


  const isLoggedIn = !!req.auth;

  const protectedRoutes = [
    "/dashboard",
    "/inbox",
    "/calendar",
    "/agent",
    "/settings",
    "/activity",
  ];

  const pathname = req.nextUrl.pathname;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (isProtected && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/inbox/:path*",
    "/calendar/:path*",
    "/agent/:path*",
    "/settings/:path*",
    "/activity/:path*",
  ],
};
