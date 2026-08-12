import type { ServiceData } from "@/types/service";
import {
  getServiceBySlugFromApi,
  fetchServicesData,
} from "@/lib/api/services";

export const defaultGoogleReviews = {
  averageRating: 5.0,
  totalReviews: 128,
  badgeTitle: "EXCELLENT",
  reviews: [
    {
      id: "rev-1",
      authorName: "Mohamed Al Nuaimi",
      timeAgo: "2 months ago",
      rating: 5,
      text: "Outstanding service quality! DFL transformed our backyard into a stunning luxury oasis. Highly professional engineering team and seamless project delivery in Dubai.",
      verified: true,
    },
    {
      id: "rev-2",
      authorName: "Sarah & David Jenkins",
      timeAgo: "1 month ago",
      rating: 5,
      text: "We hired them for a complete outdoor project in Emirates Hills. Their attention to detail, tile finishes, planting design, and plant room setup is world-class. Truly 5-star quality!",
      verified: true,
    },
    {
      id: "rev-3",
      authorName: "Rashid Al Maktoum",
      timeAgo: "3 weeks ago",
      rating: 5,
      text: "Extremely reliable and creative team. They delivered on schedule, handled all structural permits, and provided continuous maintenance support.",
      verified: true,
    },
  ],
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
