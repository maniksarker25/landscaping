import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { TestimonialModel } from "@/models/Testimonial";
import { getAdminSession } from "@/lib/auth";
import { defaultTestimonials } from "@/data/default-testimonials";

export async function POST(req: NextRequest) {
  try {
    const session = await getAdminSession(req);
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    await connectToDatabase();

    const count = await TestimonialModel.countDocuments();
    if (count > 0) {
      return NextResponse.json({
        success: false,
        message: `Database already contains ${count} testimonials. Seeding was skipped to prevent duplicates.`,
      });
    }

    const initialDocs = defaultTestimonials.map((t) => ({
      name: t.name,
      roleOrLocation: t.role || "Client, Dubai",
      quote: t.quote,
      rating: t.rating || 5,
      image: t.avatar || "",
      cloudinaryPublicId: "",
      status: "published",
    }));

    const inserted = await TestimonialModel.insertMany(initialDocs);

    return NextResponse.json({
      success: true,
      message: `Successfully seeded ${inserted.length} customer testimonials into MongoDB`,
      count: inserted.length,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to seed testimonials";
    console.error("Testimonial seed error:", error);
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
