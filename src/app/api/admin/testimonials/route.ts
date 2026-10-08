import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { TestimonialModel } from "@/models/Testimonial";
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

    const query: Record<string, unknown> = {};

    if (search.trim()) {
      const searchRegex = new RegExp(search.trim(), "i");
      query.$or = [
        { name: searchRegex },
        { roleOrLocation: searchRegex },
        { quote: searchRegex },
      ];
    }

    const items = await TestimonialModel.find(query)
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch testimonials";
    console.error("Admin Testimonials GET error:", error);
    return NextResponse.json({ success: false, message }, { status: 500 });
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
    const { name, roleOrLocation, quote, rating, image, cloudinaryPublicId, status } =
      body;

    if (!name || !name.trim()) {
      return NextResponse.json(
        { success: false, message: "Customer name is required" },
        { status: 400 },
      );
    }

    if (!quote || !quote.trim()) {
      return NextResponse.json(
        { success: false, message: "Customer review / quote is required" },
        { status: 400 },
      );
    }

    await connectToDatabase();

    const newTestimonial = await TestimonialModel.create({
      name: name.trim(),
      roleOrLocation: roleOrLocation ? roleOrLocation.trim() : "Client, Dubai",
      quote: quote.trim(),
      rating: typeof rating === "number" ? Math.min(Math.max(rating, 1), 5) : 5,
      image: image ? image.trim() : "",
      cloudinaryPublicId: cloudinaryPublicId ? cloudinaryPublicId.trim() : "",
      status: status === "draft" ? "draft" : "published",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Testimonial created successfully",
        data: newTestimonial,
      },
      { status: 201 },
    );
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to create testimonial";
    console.error("Admin Testimonial POST error:", error);
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
