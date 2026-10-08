import type { GetGalleryQueryParams, GalleryApiResponse, GalleryItem } from "@/types/gallery";

/**
 * Fetch gallery items strictly from database / API.
 * NO dummy or fake data fallback.
 * Priority:
 * 1. Direct MongoDB Query (Server-side)
 * 2. Internal /api/gallery API endpoint (Client-side)
 * 3. Empty list if no data in database
 */
export async function fetchGalleryData(
  queryParams?: GetGalleryQueryParams,
): Promise<GalleryApiResponse> {
  const limit = queryParams?.limit || 50;
  const page = queryParams?.page || 1;

  // 1. Direct MongoDB Query (Server-side)
  if (typeof window === "undefined" && process.env.MONGODB_URI) {
    try {
      const { connectToDatabase } = await import("@/lib/db");
      const { GalleryModel } = await import("@/models/Gallery");
      await connectToDatabase();

      const query: Record<string, unknown> = {};
      if (queryParams?.category && queryParams.category !== "all") {
        query.category = queryParams.category.toLowerCase().trim();
      }

      if (queryParams?.searchTerm && queryParams.searchTerm.trim()) {
        const regex = new RegExp(queryParams.searchTerm.trim(), "i");
        query.$or = [
          { location: regex },
          { imageAlt: regex },
          { category: regex },
          { slug: regex },
        ];
      }

      const total = await GalleryModel.countDocuments(query);
      const dbItems = await GalleryModel.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean();

      const mapped: GalleryItem[] = (dbItems || []).map((doc) => ({
        _id: String(doc._id),
        location: doc.location,
        image: doc.image || "/images/about-intro-pool.jpg",
        imageAlt: doc.imageAlt,
        category: doc.category,
        slug: doc.slug,
        createdAt: doc.createdAt
          ? new Date(doc.createdAt).toISOString()
          : new Date().toISOString(),
        updatedAt: doc.updatedAt
          ? new Date(doc.updatedAt).toISOString()
          : new Date().toISOString(),
      }));

      return {
        success: true,
        message:
          mapped.length > 0
            ? "Loaded projects from database"
            : "No projects found",
        meta: {
          page,
          limit,
          total,
          totalPage: Math.ceil(total / limit) || 0,
        },
        data: mapped,
      };
    } catch (dbError) {
      console.warn("MongoDB fetch in fetchGalleryData failed:", dbError);
    }
  }

  // 2. Client-side fetch via internal /api/gallery endpoint
  if (typeof window !== "undefined") {
    try {
      const params = new URLSearchParams();
      if (queryParams) {
        if (queryParams.page !== undefined)
          params.append("page", String(queryParams.page));
        if (queryParams.limit !== undefined)
          params.append("limit", String(queryParams.limit));
        if (queryParams.searchTerm)
          params.append("searchTerm", queryParams.searchTerm);
        if (queryParams.category && queryParams.category !== "all") {
          params.append("category", queryParams.category);
        }
      }

      const queryString = params.toString();
      const url = `/api/gallery${queryString ? `?${queryString}` : ""}`;

      const res = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        const data: GalleryApiResponse = await res.json();
        return {
          success: true,
          message: data.message || "Loaded projects",
          meta: data.meta || { page, limit, total: data.data?.length || 0, totalPage: 1 },
          data: data.data || [],
        };
      }
    } catch (err) {
      console.warn("Client fetch to /api/gallery failed:", err);
    }
  }

  // 3. Fallback: Strictly empty array (NO dummy/fake data)
  return {
    success: true,
    message: "No recent projects found",
    meta: {
      page: 1,
      limit,
      total: 0,
      totalPage: 0,
    },
    data: [],
  };
}
