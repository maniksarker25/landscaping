import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { GalleryModel } from "@/models/Gallery";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const search = searchParams.get("searchTerm") || searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "50", 10);

    const query: Record<string, unknown> = {};

    if (category && category !== "all") {
      query.category = category.toLowerCase().trim();
    }

    if (search && search.trim()) {
      const regex = new RegExp(search.trim(), "i");
      query.$or = [
        { location: regex },
        { imageAlt: regex },
        { category: regex },
        { slug: regex },
      ];
    }

    const total = await GalleryModel.countDocuments(query);
    const docs = await GalleryModel.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const mapped = (docs || []).map((d) => ({
      _id: String(d._id),
      location: d.location,
      image: d.image,
      imageAlt: d.imageAlt,
      category: d.category,
      slug: d.slug,
      createdAt: d.createdAt
        ? new Date(d.createdAt).toISOString()
        : new Date().toISOString(),
      updatedAt: d.updatedAt
        ? new Date(d.updatedAt).toISOString()
        : new Date().toISOString(),
    }));

    if (mapped.length > 0) {
      return NextResponse.json({
        success: true,
        count: mapped.length,
        meta: {
          page,
          limit,
          total,
          totalPage: Math.ceil(total / limit) || 0,
        },
        data: mapped,
      });
    }
  } catch (error) {
    console.warn("Public gallery MongoDB query error:", error);
  }

  // Fallback to production API if local connection failed or returned 0
  try {
    const prodRes = await fetch(`https://www.dreamfloor.ae/api/gallery${req.nextUrl.search}`, {
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(4000),
    });
    if (prodRes.ok) {
      const prodData = await prodRes.json();
      return NextResponse.json(prodData);
    }
  } catch (prodErr) {
    console.warn("Public gallery production API fallback failed:", prodErr);
  }

  return NextResponse.json({
    success: true,
    count: 0,
    meta: { page: 1, limit: 50, total: 0, totalPage: 0 },
    data: [],
  });
}
