import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { TestimonialModel } from "@/models/Testimonial";
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

    const item = await TestimonialModel.findById(id).lean();
    if (!item) {
      return NextResponse.json(
        { success: false, message: "Testimonial not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: item });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch testimonial";
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
    const { name, roleOrLocation, quote, rating, image, cloudinaryPublicId, status } =
      body;

    await connectToDatabase();

    const existing = await TestimonialModel.findById(id);
    if (!existing) {
      return NextResponse.json(
        { success: false, message: "Testimonial not found" },
        { status: 404 },
      );
    }

    // Clean up old Cloudinary photo if replaced
    if (
      cloudinaryPublicId &&
      existing.cloudinaryPublicId &&
      existing.cloudinaryPublicId !== cloudinaryPublicId
    ) {
      deleteFromCloudinary(existing.cloudinaryPublicId).catch(console.error);
    }

    if (name !== undefined) existing.name = name.trim();
    if (roleOrLocation !== undefined)
      existing.roleOrLocation = roleOrLocation.trim();
    if (quote !== undefined) existing.quote = quote.trim();
    if (rating !== undefined && typeof rating === "number") {
      existing.rating = Math.min(Math.max(rating, 1), 5);
    }
    if (image !== undefined) existing.image = image.trim();
    if (cloudinaryPublicId !== undefined) {
      existing.cloudinaryPublicId = cloudinaryPublicId.trim();
    }
    if (status !== undefined) {
      existing.status = status === "draft" ? "draft" : "published";
    }

    await existing.save();

    return NextResponse.json({
      success: true,
      message: "Testimonial updated successfully",
      data: existing,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to update testimonial";
    console.error("Admin Testimonial PUT error:", error);
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

    const existing = await TestimonialModel.findById(id);
    if (!existing) {
      return NextResponse.json(
        { success: false, message: "Testimonial not found" },
        { status: 404 },
      );
    }

    if (existing.cloudinaryPublicId) {
      await deleteFromCloudinary(existing.cloudinaryPublicId).catch(console.error);
    }

    await TestimonialModel.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Testimonial deleted successfully",
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to delete testimonial";
    console.error("Admin Testimonial DELETE error:", error);
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
