import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { uploadBufferToCloudinary } from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    const session = await getAdminSession(req);
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Admin login required." },
        { status: 401 },
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "No image file provided" },
        { status: 400 },
      );
    }

    // Verify it's an image
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        {
          success: false,
          message: "Uploaded file must be a valid image (JPEG, PNG, WebP, etc.)",
        },
        { status: 400 },
      );
    }

    // Check size (max 10MB)
    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        {
          success: false,
          message: "File size exceeds 10MB limit. Please upload a smaller image.",
        },
        { status: 400 },
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await uploadBufferToCloudinary(
      buffer,
      "dreamfloor-landscaping/gallery",
    );

    return NextResponse.json({
      success: true,
      message: "Image uploaded to Cloudinary successfully",
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      format: uploadResult.format,
      width: uploadResult.width,
      height: uploadResult.height,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to upload image";
    console.error("Cloudinary upload route error:", error);
    return NextResponse.json(
      { success: false, message },
      { status: 500 },
    );
  }
}
