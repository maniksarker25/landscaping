import { baseUrl } from "@/lib/helper";
import type { ServiceData } from "@/types/service";

export interface ServicesApiResponse {
  success: boolean;
  message: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: ServiceData[];
}

/**
 * Fetch all published services from backend API.
 * Works on both server side and client side.
 */
export async function fetchServicesData(): Promise<ServicesApiResponse> {
  try {
    const url = `${baseUrl}/service/get-all`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch services data: ${res.status} ${res.statusText}`);
    }

    const data: ServicesApiResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching services data:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to load services",
      data: [],
    };
  }
}

/**
 * Lookup a specific service by slug from the API response.
 */
export async function getServiceBySlugFromApi(
  slug: string,
): Promise<ServiceData | undefined> {
  if (!slug) return undefined;
  const normalizedSlug = slug.toLowerCase().trim();

  const response = await fetchServicesData();
  if (!response.success || !response.data || response.data.length === 0) {
    return undefined;
  }

  // 1. Direct slug match
  const directMatch = response.data.find(
    (item) => item.slug?.toLowerCase().trim() === normalizedSlug,
  );
  if (directMatch) return directMatch;

  // 2. Alias or title slugification match
  const aliasMatch = response.data.find((item) =>
    item.aliases?.some((a) => a.toLowerCase().trim() === normalizedSlug),
  );
  if (aliasMatch) return aliasMatch;

  // 3. Fallback partial match
  return response.data.find(
    (item) =>
      item.slug?.toLowerCase().includes(normalizedSlug) ||
      normalizedSlug.includes(item.slug?.toLowerCase() || ""),
  );
}
