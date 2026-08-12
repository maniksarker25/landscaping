import * as React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/common/container";
import { ServiceDetailHero } from "@/components/services/service-detail-hero";
import { ServiceDynamicRenderer } from "@/components/services/service-dynamic-renderer";
import { ServiceSidebarForm } from "@/components/services/service-sidebar-form";
import { ServiceBottomContact } from "@/components/services/service-bottom-contact";
import {
  getServiceDetailBySlugAsync,
  getAllServiceSlugsAsync,
} from "@/data/services-data";

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = await getAllServiceSlugsAsync();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceDetailBySlugAsync(slug);

  if (!service) {
    return {
      title: "Service Not Found | Poolscape",
      description: "The requested service page could not be found.",
    };
  }

  return {
    title: `${service.seo?.metaTitle || service.title} | Poolscape Dubai`,
    description: service.seo?.metaDescription || "",
    keywords: service.seo?.keywords || [],
    openGraph: {
      title: service.seo?.metaTitle || service.title,
      description: service.seo?.metaDescription || "",
      images: [{ url: service.heroImage || service.featuredImage || "" }],
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = await getServiceDetailBySlugAsync(slug);

  if (!service) {
    notFound();
  }


  const heroSection = service.sections.find((s) => s.blockType === "hero_section" || s.type === "hero_section");
  const heroData = heroSection?.content?.hero;

  return (
    <main className="min-h-screen bg-background">
      {/* Dynamic Header Hero Banner */}
      <ServiceDetailHero
        title={heroData?.headline || service.title}
        subtitle={heroData?.subheadline || service.subtitle}
        heroImage={heroData?.bgImage || service.featuredImage}
        badge={service.badge}
      />

      {/* Main Content Layout with 2-Column Responsive Split */}
      <Container className="py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Main Left Column (Dynamic Data-Driven Content) */}
          <div className="lg:col-span-8 space-y-8">
            <ServiceDynamicRenderer
              sections={service.sections}
              googleReviews={service.googleReviews}
            />
          </div>

          {/* Right Column (Sticky Quick Consultation Form) */}
          <div className="lg:col-span-4 w-full lg:sticky lg:top-24 h-fit">
            <ServiceSidebarForm currentServiceTitle={service.title} />
          </div>
        </div>

        {/* Bottom Contact Section */}
        <ServiceBottomContact />
      </Container>
    </main>
  );
}
