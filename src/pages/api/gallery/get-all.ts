import { baseUrl } from "@/lib/helper";
import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/lib/db";
import { GalleryModel } from "@/models/Gallery";
import { defaultGalleryItems } from "@/data/default-gallery-items";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { page, limit, sortBy, sortOrder, searchTerm, category } = req.query;
  const p = page ? parseInt(page as string, 10) : 1;
  const l = limit ? parseInt(limit as string, 10) : 50;

  // 1. Try fetching from MongoDB first if configured
  if (process.env.MONGODB_URI) {
    try {
      await connectToDatabase();
      const query: Record<string, unknown> = {};

      if (category && category !== "all") {
        query.category = (category as string).toLowerCase().trim();
      }

      if (searchTerm && typeof searchTerm === "string" && searchTerm.trim()) {
        const regex = new RegExp(searchTerm.trim(), "i");
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
        .skip((p - 1) * l)
        .limit(l)
        .lean();

      if (docs && docs.length > 0) {
        res.setHeader("Cache-Control", "s-maxage=30, stale-while-revalidate=15");
        return res.status(200).json({
          success: true,
          message: "Loaded from MongoDB",
          meta: {
            page: p,
            limit: l,
            total,
            totalPage: Math.ceil(total / l),
          },
          data: docs.map((d) => ({
            _id: String(d._id),
            location: d.location,
            image: d.image,
            imageAlt: d.imageAlt,
            category: d.category,
            slug: d.slug,
            createdAt: d.createdAt,
            updatedAt: d.updatedAt,
          })),
        });
      }
    } catch (dbErr) {
      console.warn("MongoDB handler query skipped:", dbErr);
    }
  }

  // 2. Try external baseUrl if available
  try {
    const params = new URLSearchParams();
    if (page) params.append("page", page as string);
    if (limit) params.append("limit", limit as string);
    if (sortBy) params.append("sortBy", sortBy as string);
    if (sortOrder) params.append("sortOrder", sortOrder as string);
    if (searchTerm) params.append("searchTerm", searchTerm as string);
    if (category) params.append("category", category as string);

    const queryString = params.toString();
    const url = `${baseUrl}/gallery/get-all${queryString ? `?${queryString}` : ""}`;

    const response = await fetch(url, {
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(2000),
    });

    if (response.ok) {
      const data = await response.json();
      res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=30");
      return res.status(200).json(data);
    }
  } catch {
    // Continue to fallback default items
  }

  // 3. If no database records found, return empty data (no fake items)
  return res.status(200).json({
    success: true,
    message: "No projects found",
    meta: {
      page: p,
      limit: l,
      total: 0,
      totalPage: 0,
    },
    data: [],
  });
}
