import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { GalleryModel } from "@/models/Gallery";
import { getAdminSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const session = await getAdminSession(req);
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";

    const query: Record<string, unknown> = {};

    if (category && category !== "all") {
      query.category = category.toLowerCase().trim();
    }

    if (search.trim()) {
      const searchRegex = new RegExp(search.trim(), "i");
      query.$or = [
        { location: searchRegex },
        { imageAlt: searchRegex },
        { category: searchRegex },
        { slug: searchRegex },
      ];
    }

    const items = await GalleryModel.find(query)
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch gallery items";
    console.error("Admin Gallery GET error:", error);
    return NextResponse.json(
      { success: false, message },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getAdminSession(req);
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Admin session expired." },
        { status: 401 },
      );
    }

    const body = await req.json();
    const { location, image, imageAlt, category, slug, cloudinaryPublicId } = body;

    const defaultPlaceholder = "/images/about-intro-pool.jpg";
    const finalImage = image && image.trim() ? image.trim() : defaultPlaceholder;

    if (!location || !location.trim()) {
      return NextResponse.json(
        { success: false, message: "Project location is required" },
        { status: 400 },
      );
    }

    if (!imageAlt || !imageAlt.trim()) {
      return NextResponse.json(
        { success: false, message: "Image title / Alt text is required" },
        { status: 400 },
      );
    }

    await connectToDatabase();

    const newItem = await GalleryModel.create({
      location: location.trim(),
      image: finalImage,
      imageAlt: imageAlt.trim(),
      category: (category || "pools").toLowerCase().trim(),
      slug: slug ? slug.trim() : "",
      cloudinaryPublicId: cloudinaryPublicId ? cloudinaryPublicId.trim() : "",
    });

    return NextResponse.json({
      success: true,
      message: "Gallery project created successfully",
      data: newItem,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to create gallery item";
    console.error("Admin Gallery POST error:", error);
    return NextResponse.json(
      { success: false, message },
      { status: 500 },
    );
  }
}
