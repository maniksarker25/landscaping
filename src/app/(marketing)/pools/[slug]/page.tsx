import * as React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/common/container";
import { PoolDetailHero } from "@/components/pools/pool-detail-hero";
import { PoolDynamicRenderer } from "@/components/pools/pool-dynamic-renderer";
import { PoolSidebarForm } from "@/components/pools/pool-sidebar-form";
import { PoolBottomContact } from "@/components/pools/pool-bottom-contact";
import { getPoolDetailBySlug, getAllPoolSlugs } from "@/data/pools-detail-data";

interface PoolPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllPoolSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PoolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const pool = getPoolDetailBySlug(slug);

  if (!pool) {
    return {
      title: "Pool Service Not Found | Poolscape",
      description: "The requested swimming pool service page could not be found.",
    };
  }

  return {
    title: `${pool.seo.metaTitle} | Poolscape Dubai`,
    description: pool.seo.metaDescription,
    keywords: pool.seo.keywords,
    openGraph: {
      title: pool.seo.metaTitle,
      description: pool.seo.metaDescription,
      images: [{ url: pool.heroImage || pool.featuredImage || "" }],
    },
  };
}

export default async function PoolDetailPage({ params }: PoolPageProps) {
  const { slug } = await params;
  const pool = getPoolDetailBySlug(slug);

  if (!pool) {
    notFound();
  }

  const heroSection = pool.sections.find((s) => s.blockType === "hero_section" || s.type === "hero_section");
  const heroData = heroSection?.content?.hero;

  return (
    <main className="min-h-screen bg-background">
      {/* Dynamic Header Hero Banner */}
      <PoolDetailHero
        title={heroData?.headline || pool.title}
        subtitle={heroData?.subheadline || pool.subtitle}
        heroImage={heroData?.bgImage || pool.featuredImage}
        badge={pool.badge}
      />

      {/* Main Content Layout with 2-Column Responsive Split */}
      <Container className="py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Main Left Column (Dynamic Data-Driven Content) */}
          <div className="lg:col-span-8 space-y-8">
            <PoolDynamicRenderer
              sections={pool.sections}
              googleReviews={pool.googleReviews}
            />
          </div>

          {/* Right Column (Sticky Quick Consultation Form) */}
          <div className="lg:col-span-4 w-full lg:sticky lg:top-24 h-fit">
            <PoolSidebarForm currentPoolTitle={pool.title} />
          </div>
        </div>

        {/* Bottom Contact Section */}
        <PoolBottomContact />
      </Container>
    </main>
  );
}
