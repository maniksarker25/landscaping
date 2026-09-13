import type { ServiceData } from "@/types/service";
import { getServiceBySlugFromApi, fetchServicesData } from "@/lib/api/services";

export const defaultGoogleReviews = {
  averageRating: 5.0,
  totalReviews: 128,
  badgeTitle: "EXCELLENT",
  reviews: [
    {
      id: "rev-1",
      authorName: "Tariq Al-Mansoori",
      timeAgo: "Arabian Ranches 2, Dubai",
      rating: 5,
      text: "Dream Floor Landscaping completely transformed our villa backyard in Arabian Ranches. Their pool construction team built a stunning infinity pool with custom water cascades. The craftsmanship and project management were top notch!",
      verified: true,
    },
    {
      id: "rev-2",
      authorName: "Sarah Jenkins",
      timeAgo: "Emirates Hills, Dubai",
      rating: 5,
      text: "Exceptional service from start to finish! Dream Floor constructed a bespoke louvered pergola, outdoor kitchen BBQ area, and lush automatic drip irrigation. They finished right on schedule and within budget.",
      verified: true,
    },
    {
      id: "rev-3",
      authorName: "Rashid Hassan",
      timeAgo: "Dubai Hills Estate, Dubai",
      rating: 5,
      text: "The best pool and landscape contractor in Dubai. They handled our skimmer pool construction and natural stone outdoor tiling with extreme attention to detail. Highly recommend Dream Floor Landscaping LLC!",
      verified: true,
    },
    {
      id: "rev-4",
      authorName: "Marcus Vance",
      timeAgo: "Palm Jumeirah, Dubai",
      rating: 5,
      text: "Outstanding pool maintenance and garden makeover! The team converted our worn patio into a modern resort-style garden with custom water features and LED lighting. Professional and reliable team.",
      verified: true,
    },
    {
      id: "rev-5",
      authorName: "Fatima Al-Zahra",
      timeAgo: "Jumeirah Golf Estates, Dubai",
      rating: 5,
      text: "Dream Floor created our outdoor living space from scratch including pergolas, artificial turf, and a custom swimming pool. Their 3D design phase made everything so easy to visualize before building.",
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

export function getServiceDetailBySlug(slug: string): ServiceData | undefined {
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
