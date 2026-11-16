import type { GetGalleryQueryParams, GalleryApiResponse, GalleryItem } from "@/types/gallery";

/**
 * Fetch gallery items strictly from database / live API.
 * NO dummy or fake static data fallback from pools-static-data or landscaping-static-data.
 * Priority:
 * 1. Direct MongoDB Query (Server-side)
 * 2. Production API fallback if direct MongoDB fails (Server-side)
 * 3. Internal /api/gallery API endpoint (Client-side)
 * 4. Production API fallback (Client-side)
 */
export async function fetchGalleryData(
  queryParams?: GetGalleryQueryParams,
): Promise<GalleryApiResponse> {
  const limit = queryParams?.limit || 100;
  const page = queryParams?.page || 1;

  // Build query string for API requests
  const params = new URLSearchParams();
  if (page) params.append("page", String(page));
  if (limit) params.append("limit", String(limit));
  if (queryParams?.searchTerm) params.append("searchTerm", queryParams.searchTerm);
  if (queryParams?.category && queryParams.category !== "all") {
    params.append("category", queryParams.category);
  }
  const queryString = params.toString();

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

      if (mapped.length > 0) {
        return {
          success: true,
          message: "Loaded projects from database",
          meta: {
            page,
            limit,
            total,
            totalPage: Math.ceil(total / limit) || 0,
          },
          data: mapped,
        };
      }
    } catch (dbError) {
      console.warn("MongoDB fetch in fetchGalleryData failed, falling back to API:", dbError);
    }
  }

  // 2. Server-side live API fallback (if MongoDB failed or returned 0)
  if (typeof window === "undefined") {
    try {
      const liveUrl = `https://www.dreamfloor.ae/api/gallery${queryString ? `?${queryString}` : ""}`;
      const res = await fetch(liveUrl, {
        headers: { "Content-Type": "application/json" },
        next: { revalidate: 60 },
        signal: AbortSignal.timeout(5000),
      });

      if (res.ok) {
        const data: GalleryApiResponse = await res.json();
        if (data.data && data.data.length > 0) {
          return data;
        }
      }
    } catch (liveErr) {
      console.warn("Server-side live API fallback failed:", liveErr);
    }
  }

  // 3. Client-side fetch via internal /api/gallery endpoint
  if (typeof window !== "undefined") {
    try {
      const url = `/api/gallery${queryString ? `?${queryString}` : ""}`;
      const res = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        const data: GalleryApiResponse = await res.json();
        if (data.data && data.data.length > 0) {
          return {
            success: true,
            message: data.message || "Loaded projects",
            meta: data.meta || { page, limit, total: data.data.length, totalPage: 1 },
            data: data.data,
          };
        }
      }
    } catch (err) {
      console.warn("Client fetch to /api/gallery failed:", err);
    }

    // 4. Client-side live production API fallback
    try {
      const prodUrl = `https://www.dreamfloor.ae/api/gallery${queryString ? `?${queryString}` : ""}`;
      const res = await fetch(prodUrl, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        const data: GalleryApiResponse = await res.json();
        if (data.data && data.data.length > 0) {
          return data;
        }
      }
    } catch (prodErr) {
      console.warn("Client fetch to live production API failed:", prodErr);
    }
  }

  // 5. Strictly empty array fallback (NEVER dummy/fake data from pools-static-data or landscaping-static-data)
  return {
    success: true,
    message: "No projects found",
    meta: {
      page: 1,
      limit,
      total: 0,
      totalPage: 0,
    },
    data: [],
  };
}
