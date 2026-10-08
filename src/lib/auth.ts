import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export const ADMIN_COOKIE_NAME = "admin_session_token";

export interface AdminPayload {
  email: string;
  role: "admin";
}

function getJwtSecretKey(): Uint8Array {
  const secret =
    process.env.JWT_SECRET ||
    "dream-floor-landscaping-secret-key-super-secure-token-2026";
  return new TextEncoder().encode(secret);
}

/**
 * Validate admin credentials against environment variables or sensible defaults
 */
export function validateAdminCredentials(
  email: string,
  pass: string,
): boolean {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@dreamfloor.ae";
  const adminPass = process.env.ADMIN_PASSWORD || "Admin@123456";

  return (
    email.trim().toLowerCase() === adminEmail.trim().toLowerCase() &&
    pass === adminPass
  );
}

/**
 * Sign a JWT token for the admin session valid for 7 days
 */
export async function signAdminToken(payload: AdminPayload): Promise<string> {
  const secret = getJwtSecretKey();
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

/**
 * Verify a JWT session token
 */
export async function verifyAdminToken(
  token?: string,
): Promise<AdminPayload | null> {
  if (!token) return null;
  try {
    const secret = getJwtSecretKey();
    const { payload } = await jwtVerify(token, secret);
    return payload as unknown as AdminPayload;
  } catch {
    return null;
  }
}

/**
 * Extract and verify session from NextRequest or next/headers cookies
 */
export async function getAdminSession(
  req?: NextRequest,
): Promise<AdminPayload | null> {
  let token: string | undefined;

  if (req) {
    token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  } else {
    try {
      const cookieStore = await cookies();
      token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    } catch {
      return null;
    }
  }

  return verifyAdminToken(token);
}
