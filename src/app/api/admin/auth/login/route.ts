import { NextRequest, NextResponse } from "next/server";
import {
  validateAdminCredentials,
  signAdminToken,
  ADMIN_COOKIE_NAME,
} from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 },
      );
    }

    const isValid = validateAdminCredentials(email, password);

    if (!isValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password. Please check your credentials.",
        },
        { status: 401 },
      );
    }

    const token = await signAdminToken({
      email: email.trim().toLowerCase(),
      role: "admin",
    });

    const response = NextResponse.json({
      success: true,
      message: "Admin authentication successful",
      user: {
        email: email.trim().toLowerCase(),
        role: "admin",
      },
    });

    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred during login" },
      { status: 500 },
    );
  }
}
