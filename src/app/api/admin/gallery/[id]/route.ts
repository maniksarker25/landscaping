import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { GalleryModel } from "@/models/Gallery";
import { getAdminSession } from "@/lib/auth";
import { deleteFromCloudinary } from "@/lib/cloudinary";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const session = await getAdminSession(req);
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const { id } = await params;
    await connectToDatabase();

    const item = await GalleryModel.findById(id).lean();
    if (!item) {
      return NextResponse.json(
        { success: false, message: "Gallery item not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: item });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch gallery item";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: RouteParams) {
  try {
    const session = await getAdminSession(req);
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const { id } = await params;
    const body = await req.json();
    const { location, image, imageAlt, category, slug, cloudinaryPublicId } = body;

    await connectToDatabase();

    const existing = await GalleryModel.findById(id);
    if (!existing) {
      return NextResponse.json(
        { success: false, message: "Gallery item not found" },
        { status: 404 },
      );
    }

    // If an existing cloudinary image was replaced with a new one, clean up the old image
    if (
      cloudinaryPublicId &&
      existing.cloudinaryPublicId &&
      existing.cloudinaryPublicId !== cloudinaryPublicId
    ) {
      deleteFromCloudinary(existing.cloudinaryPublicId).catch(console.error);
    }

    if (location !== undefined) existing.location = location.trim();
    if (image !== undefined) existing.image = image.trim();
    if (imageAlt !== undefined) existing.imageAlt = imageAlt.trim();
    if (category !== undefined) existing.category = category.toLowerCase().trim();
    if (slug !== undefined) existing.slug = slug.trim();
    if (cloudinaryPublicId !== undefined) {
      existing.cloudinaryPublicId = cloudinaryPublicId.trim();
    }

    await existing.save();

    return NextResponse.json({
      success: true,
      message: "Gallery item updated successfully",
      data: existing,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to update gallery item";
    console.error("Admin Gallery PUT error:", error);
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    const session = await getAdminSession(req);
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const { id } = await params;
    await connectToDatabase();

    const existing = await GalleryModel.findById(id);
    if (!existing) {
      return NextResponse.json(
        { success: false, message: "Gallery item not found" },
        { status: 404 },
      );
    }

    // If item was stored in Cloudinary, delete from Cloudinary CDN
    if (existing.cloudinaryPublicId) {
      await deleteFromCloudinary(existing.cloudinaryPublicId);
    }

    await GalleryModel.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Gallery item deleted successfully",
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to delete gallery item";
    console.error("Admin Gallery DELETE error:", error);
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
