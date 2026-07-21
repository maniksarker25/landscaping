import * as React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/common/container";
import { PoolDetailHero } from "@/components/pools/pool-detail-hero";
import { PoolDynamicRenderer } from "@/components/pools/pool-dynamic-renderer";
import { PoolSidebarForm } from "@/components/pools/pool-sidebar-form";
import { PoolBottomContact } from "@/components/pools/pool-bottom-contact";
import { PoolDropUsALine } from "@/components/pools/pool-drop-us-a-line";
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
      images: [{ url: pool.heroImage }],
    },
  };
}

export default async function PoolDetailPage({ params }: PoolPageProps) {
  const { slug } = await params;
  const pool = getPoolDetailBySlug(slug);

  if (!pool) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Dynamic Header Hero Banner */}
      <PoolDetailHero
        title={pool.title}
        subtitle={pool.subtitle}
        heroImage={pool.heroImage}
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
          <div className="lg:col-span-4 w-full">
            <PoolSidebarForm currentPoolTitle={pool.title} />
          </div>
        </div>

        {/* Bottom Contact & Map Sections */}
        <PoolBottomContact />
        <PoolDropUsALine />
      </Container>
    </main>
  );
}
