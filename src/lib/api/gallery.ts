import { baseUrl } from "@/lib/helper";
import type { GetGalleryQueryParams, GalleryApiResponse } from "@/types/gallery";
import { defaultGalleryItems } from "@/data/default-gallery-items";

/**
 * Fetch gallery items with support for query filters.
 * Works on both Server-Side (getServerSideProps / App Router Server Components) and Client-Side.
 */
export async function fetchGalleryData(
  queryParams?: GetGalleryQueryParams,
): Promise<GalleryApiResponse> {
  const filterDefaultItems = () => {
    let items = [...defaultGalleryItems];
    if (queryParams?.category && queryParams.category !== "all") {
      const targetCat = queryParams.category.toLowerCase().trim();
      items = items.filter(
        (i) => i.category.toLowerCase().trim() === targetCat,
      );
    }
    const limit = queryParams?.limit || 50;
    const paged = items.slice(0, limit);
    return {
      success: true,
      message: "Loaded projects",
      meta: {
        page: queryParams?.page || 1,
        limit,
        total: items.length,
        totalPage: Math.ceil(items.length / limit),
      },
      data: paged,
    };
  };

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
      signal: AbortSignal.timeout(2000),
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch gallery data: ${res.status} ${res.statusText}`);
    }

    const data: GalleryApiResponse = await res.json();
    if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
      return data;
    }
    return filterDefaultItems();
  } catch {
    return filterDefaultItems();
  }
}

