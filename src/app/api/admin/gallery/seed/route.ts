import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { GalleryModel } from "@/models/Gallery";
import { getAdminSession } from "@/lib/auth";
import { defaultGalleryItems } from "@/data/default-gallery-items";

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

    const count = await GalleryModel.countDocuments();
    if (count > 0) {
      return NextResponse.json({
        success: false,
        message: `Database already contains ${count} projects. Seeding was skipped to prevent duplicates.`,
      });
    }

    const initialDocs = defaultGalleryItems.slice(0, 30).map((item) => ({
      location: item.location || "Dubai, UAE",
      image: item.image,
      imageAlt: item.imageAlt || "Dream Floor Landscaping Project",
      category: (item.category || "pools").toLowerCase().trim(),
      slug: item.slug || "",
      cloudinaryPublicId: "",
    }));

    const inserted = await GalleryModel.insertMany(initialDocs);

    return NextResponse.json({
      success: true,
      message: `Successfully seeded ${inserted.length} initial projects into MongoDB`,
      count: inserted.length,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to seed gallery data";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
