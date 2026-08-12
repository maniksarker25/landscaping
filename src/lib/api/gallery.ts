import { baseUrl } from "@/lib/helper";
import type { GetGalleryQueryParams, GalleryApiResponse } from "@/types/gallery";

/**
 * Fetch gallery items with support for query filters.
 * Works on both Server-Side (getServerSideProps / App Router Server Components) and Client-Side.
 */
export async function fetchGalleryData(
  queryParams?: GetGalleryQueryParams,
): Promise<GalleryApiResponse> {
  try {
    const params = new URLSearchParams();

    if (queryParams) {
      if (queryParams.page !== undefined)
        params.append("page", String(queryParams.page));
      if (queryParams.limit !== undefined)
        params.append("limit", String(queryParams.limit));
      if (queryParams.sortBy) params.append("sortBy", queryParams.sortBy);
      if (queryParams.sortOrder)
        params.append("sortOrder", queryParams.sortOrder);
      if (queryParams.searchTerm)
        params.append("searchTerm", queryParams.searchTerm);
      if (queryParams.category && queryParams.category !== "all") {
        params.append("category", queryParams.category);
      }
    }

    const queryString = params.toString();
    const url = `${baseUrl}/gallery/get-all${queryString ? `?${queryString}` : ""}`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch gallery data: ${res.status} ${res.statusText}`);
    }

    const data: GalleryApiResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching gallery data:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to load gallery items",
      meta: {
        page: queryParams?.page || 1,
        limit: queryParams?.limit || 10,
        total: 0,
        totalPage: 0,
      },
      data: [],
    };
  }
}
