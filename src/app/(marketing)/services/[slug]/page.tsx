import * as React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/common/container";
import { ServiceDetailHero } from "@/components/services/service-detail-hero";
import { ServiceSidebarForm } from "@/components/services/service-sidebar-form";
import { ServiceDynamicRenderer } from "@/components/services/service-dynamic-renderer";
import { ServiceBottomContact } from "@/components/services/service-bottom-contact";
import { PoolStaticDetailView } from "@/components/pools/pool-static-detail-view";
import {
  getServiceDetailBySlugAsync,
  getAllServiceSlugsAsync,
} from "@/data/services-data";
import {
  getPoolStaticDataBySlug,
  getAllStaticPoolSlugs,
} from "@/data/pools-static-data";
import {
  getLandscapingStaticDataBySlug,
  getAllStaticLandscapingSlugs,
} from "@/data/landscaping-static-data";
import { fetchTestimonialsData } from "@/lib/api/testimonials";
import { fetchGalleryData } from "@/lib/api/gallery";

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const serviceSlugs = await getAllServiceSlugsAsync();
  const poolSlugs = getAllStaticPoolSlugs();
  const landscapingSlugs = getAllStaticLandscapingSlugs();
  const allSlugs = Array.from(
    new Set([...serviceSlugs, ...poolSlugs, ...landscapingSlugs]),
  );
  return allSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const poolStatic = getPoolStaticDataBySlug(slug);

  if (poolStatic) {
    return {
      title: `${poolStatic.metaTitle || poolStatic.title} | Dream Floor Landscaping Landscaping Dubai`,
      description: poolStatic.metaDescription,
      openGraph: {
        title: poolStatic.metaTitle || poolStatic.title,
        description: poolStatic.metaDescription,
        images: [{ url: poolStatic.heroImage || poolStatic.ogImage }],
      },
    };
  }

  const landscapingStatic = getLandscapingStaticDataBySlug(slug);
  if (landscapingStatic) {
    return {
      title: `${landscapingStatic.metaTitle || landscapingStatic.title} | Dream Floor Landscaping Landscaping Dubai`,
      description: landscapingStatic.metaDescription,
      openGraph: {
        title: landscapingStatic.metaTitle || landscapingStatic.title,
        description: landscapingStatic.metaDescription,
        images: [
          { url: landscapingStatic.heroImage || landscapingStatic.ogImage },
        ],
      },
    };
  }

  const service = await getServiceDetailBySlugAsync(slug);

  if (!service) {
    return {
      title: "Service Not Found | Poolscape",
      description: "The requested service page could not be found.",
    };
  }

  return {
    title: `${service?.seo?.metaTitle || service?.title} | Dream Floor Landscaping Landscaping Dubai`,
    description: service?.seo?.metaDescription || "",
    keywords: service?.seo?.keywords || [],
    openGraph: {
      title: service?.seo?.metaTitle || service?.title,
      description: service?.seo?.metaDescription || "",
      images: [{ url: service?.heroImage || service?.featuredImage || "" }],
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;

  // Fetch live gallery items from the API to show real project works
  const galleryRes = await fetchGalleryData({ limit: 100 });
  const allGalleryItems = galleryRes.data || [];

  // Categorize API gallery items: Pools vs Landscaping
  const poolGalleryImages = allGalleryItems
    .filter((item) => {
      const cat = (item.category || "").toLowerCase().trim();
      return cat === "pools" || cat.includes("pool");
    })
    .map((item) => ({
      url: item.image,
      alt: item.imageAlt || item.location || "Luxury Swimming Pool Project Dubai",
      title: item.imageAlt || item.location,
    }));

  const landscapingGalleryImages = allGalleryItems
    .filter((item) => {
      const cat = (item.category || "").toLowerCase().trim();
      return (
        cat === "landscaping" ||
        cat.includes("landscap") ||
        cat.includes("garden") ||
        cat === "outdoor-living" ||
        cat.includes("outdoor") ||
        cat.includes("living") ||
        cat.includes("pergola")
      );
    })
    .map((item) => ({
      url: item.image,
      alt: item.imageAlt || item.location || "Luxury Villa Landscaping Project Dubai",
      title: item.imageAlt || item.location,
    }));

  // 1. Check if this route matches one of the static pool pages
  const poolStatic = getPoolStaticDataBySlug(slug);

  if (poolStatic) {
    return (
      <PoolStaticDetailView
        data={poolStatic}
        recentWorkGallery={poolGalleryImages}
        recentWorkTitle="Get Inspired By Our Recent Work Gallery"
      />
    );
  }

  // 2. Check if this route matches one of the static landscaping pages
  const landscapingStatic = getLandscapingStaticDataBySlug(slug);

  if (landscapingStatic) {
    return (
      <PoolStaticDetailView
        data={landscapingStatic}
        typesTitle={
          landscapingStatic.typesTitle || "Types of Landscaping in Dubai"
        }
        recentWorkGallery={landscapingGalleryImages}
        recentWorkTitle="Get Inspired By Our Recent Work Gallery"
      />
    );
  }

  // 3. Fallback for other dynamic/fallback services
  const [service, testimonialsRes] = await Promise.all([
    getServiceDetailBySlugAsync(slug),
    fetchTestimonialsData(),
  ]);

  if (!service) {
    notFound();
  }

  const isPool =
    (service?.category || "").toLowerCase().includes("pool") ||
    slug.includes("pool");

  const relevantGalleryItems = isPool
    ? allGalleryItems.filter((item) => (item.category || "").toLowerCase().includes("pool"))
    : allGalleryItems.filter((item) => !(item.category || "").toLowerCase().includes("pool"));

  const heroSection = service?.sections?.find(
    (s) => s.blockType === "hero_section" || s.type === "hero_section",
  );
  const heroData = heroSection?.content?.hero;

  return (
    <main className="min-h-screen bg-background">
      <ServiceDetailHero
        title={heroData?.headline || service?.title}
        subtitle={heroData?.subheadline || service?.subtitle}
        heroImage={heroData?.bgImage || service?.featuredImage}
        badge={service?.badge}
      />

      <Container className="py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-8 space-y-8">
            <ServiceDynamicRenderer
              serviceCategory={service?.category}
              sections={service?.sections}
              googleReviews={service?.googleReviews}
              initialTestimonials={testimonialsRes.data || []}
              initialGalleryItems={relevantGalleryItems}
            />
          </div>

          <div className="lg:col-span-4 w-full lg:sticky lg:top-24 h-fit">
            <ServiceSidebarForm currentServiceTitle={service?.title} />
          </div>
        </div>

        <ServiceBottomContact />
      </Container>
    </main>
  );
}
