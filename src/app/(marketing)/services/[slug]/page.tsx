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
  const allSlugs = Array.from(new Set([...serviceSlugs, ...poolSlugs]));
  return allSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const poolStatic = getPoolStaticDataBySlug(slug);

  if (poolStatic) {
    return {
      title: `${poolStatic.metaTitle || poolStatic.title} | Four Seasons Landscaping Dubai`,
      description: poolStatic.metaDescription,
      openGraph: {
        title: poolStatic.metaTitle || poolStatic.title,
        description: poolStatic.metaDescription,
        images: [{ url: poolStatic.heroImage || poolStatic.ogImage }],
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
    title: `${service?.seo?.metaTitle || service?.title} | Four Seasons Landscaping Dubai`,
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

  // 1. Check if this route matches one of the static pool pages
  const poolStatic = getPoolStaticDataBySlug(slug);

  if (poolStatic) {
    return <PoolStaticDetailView data={poolStatic} />;
  }

  // 2. Fallback for non-pool services (e.g. landscaping services)
  const [service, testimonialsRes, galleryRes] = await Promise.all([
    getServiceDetailBySlugAsync(slug),
    fetchTestimonialsData(),
    fetchGalleryData({ limit: 60 }),
  ]);

  if (!service) {
    notFound();
  }

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
              initialGalleryItems={galleryRes?.data || []}
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
