import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { TestimonialModel } from "@/models/Testimonial";
import { defaultTestimonials } from "@/data/default-testimonials";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectToDatabase();
    const items = await TestimonialModel.find({ status: { $ne: "draft" } })
      .sort({ createdAt: -1 })
      .lean();

    if (items && items.length > 0) {
      const mapped = items.map((doc) => ({
        _id: String(doc._id),
        name: doc.name,
        roleOrLocation: doc.roleOrLocation || "Client, Dubai",
        quote: doc.quote,
        rating: doc.rating || 5,
        image: doc.image || "",
        status: doc.status || "published",
        createdAt: doc.createdAt
          ? new Date(doc.createdAt).toISOString()
          : new Date().toISOString(),
        updatedAt: doc.updatedAt
          ? new Date(doc.updatedAt).toISOString()
          : new Date().toISOString(),
      }));

      return NextResponse.json({
        success: true,
        count: mapped.length,
        data: mapped,
      });
    }

    const fallback = defaultTestimonials.map((t) => ({
      _id: t.id,
      name: t.name,
      roleOrLocation: t.role,
      quote: t.quote,
      rating: t.rating,
      image: t.avatar,
      status: "published",
    }));

    return NextResponse.json({
      success: true,
      count: fallback.length,
      data: fallback,
    });
  } catch (error) {
    console.error("Public testimonials GET error:", error);
    const fallback = defaultTestimonials.map((t) => ({
      _id: t.id,
      name: t.name,
      roleOrLocation: t.role,
      quote: t.quote,
      rating: t.rating,
      image: t.avatar,
      status: "published",
    }));

    return NextResponse.json({
      success: true,
      count: fallback.length,
      data: fallback,
    });
  }
}
