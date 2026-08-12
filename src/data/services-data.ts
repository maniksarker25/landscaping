import type { ServiceData } from "@/types/service";
import {
  getServiceBySlugFromApi,
  fetchServicesData,
} from "@/lib/api/services";

export const defaultGoogleReviews = {
  averageRating: 5.0,
  totalReviews: 128,
  badgeTitle: "EXCELLENT",
  reviews: [],
};

// Deprecated static array removed in favor of backend API data
export const serviceData: ServiceData[] = [];

export async function getServiceDetailBySlugAsync(
  slug: string,
): Promise<ServiceData | undefined> {
  if (!slug) return undefined;
  return getServiceBySlugFromApi(slug);
}

export function getServiceDetailBySlug(
  slug: string,
): ServiceData | undefined {
  if (!slug) return undefined;
  return undefined;
}

export async function getAllServiceSlugsAsync(): Promise<string[]> {
  const slugsSet = new Set<string>();

  try {
    const apiRes = await fetchServicesData();
    if (apiRes.success && apiRes.data) {
      apiRes.data.forEach((item) => {
        if (item.slug) slugsSet.add(item.slug);
      });
    }
  } catch (err) {
    console.error("Failed to fetch API slugs:", err);
  }

  return Array.from(slugsSet);
}

export function getAllServiceSlugs(): string[] {
  return [];
}

// Keep legacy mappings for compatibility
export const poolsDetailData = serviceData;
export const getPoolDetailBySlug = getServiceDetailBySlug;
export const getAllPoolSlugs = getAllServiceSlugs;
