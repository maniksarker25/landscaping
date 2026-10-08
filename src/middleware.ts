import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const ADMIN_COOKIE_NAME = "admin_session_token";

function getJwtSecretKey(): Uint8Array {
  const secret =
    process.env.JWT_SECRET ||
    "dream-floor-landscaping-secret-key-super-secure-token-2026";
  return new TextEncoder().encode(secret);
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;

  let isValidSession = false;
  if (token) {
    try {
      await jwtVerify(token, getJwtSecretKey());
      isValidSession = true;
    } catch {
      isValidSession = false;
    }
  }

  // 1. If trying to access /admin-dashboard without a valid session, redirect to login
  if (pathname.startsWith("/admin-dashboard")) {
    if (!isValidSession) {
      const loginUrl = new URL("/admin-login", req.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 2. If already logged in and visiting /admin-login, redirect directly to dashboard
  if (pathname === "/admin-login") {
    if (isValidSession) {
      return NextResponse.redirect(new URL("/admin-dashboard", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin-dashboard/:path*", "/admin-login"],
};
