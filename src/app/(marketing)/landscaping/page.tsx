import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Trees, Sparkles, PhoneCall } from "lucide-react";
import { Container } from "@/components/common/container";
import { Button } from "@/components/ui/button";
import { LANDSCAPING_STATIC_DATA } from "@/data/landscaping-static-data";
import ImageGallerySection from "@/components/sections/image-gallery-section";
import CtaBannerSection from "@/components/sections/cta-banner-section";
import GoogleReviewsSection from "@/components/sections/google-reviews-section";
import ContactMapSection from "@/components/sections/contact-map-section";
import BottomInquirySection from "@/components/sections/bottom-inquiry-section";

export const metadata: Metadata = {
  title: "Landscape Design & Villa Landscaping Services in Dubai | Dream Floor",
  description:
    "Explore our premier luxury landscaping and garden design services in Dubai. Villa landscaping, residential landscaping, commercial landscaping, and professional gardening services.",
};

export default function LandscapingOverviewPage() {
  const landscapingList = Object.values(LANDSCAPING_STATIC_DATA);
  const recentWork = LANDSCAPING_STATIC_DATA["villa-landscaping"]?.recentWorkGallery || [];

  return (
    <main className="min-h-screen bg-background">
      {/* Header Banner */}
      <section className="relative bg-primary text-primary-foreground pt-16 sm:pt-24 pb-0 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/90 to-transparent" />
        <Container className="relative z-10 space-y-4 max-w-3xl pb-4 sm:pb-8">
          <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-emerald-300 bg-white/10 px-3.5 py-1 rounded-full">
            <Sparkles className="h-3.5 w-3.5" />
            Dubai Landscaping & Garden Services
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Villa Landscaping & Outdoor Living Design
          </h1>
          <p className="text-sm sm:text-base text-primary-foreground/80 leading-relaxed max-w-xl mx-auto">
            From bespoke luxury villa landscapes and residential gardens to large-scale commercial developments and ongoing garden care across Dubai.
          </p>
        </Container>

        {/* Curved SVG Bottom Divider */}
        <div className="relative z-10 w-full overflow-hidden leading-none -mb-px pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 125"
            preserveAspectRatio="none"
            className="w-full h-12 sm:h-16 md:h-24 lg:h-28 block fill-background"
            aria-hidden="true"
          >
            <path
              d="M 0 125 L 0.0 62.5 L 15.0 60.0 L 30.0 57.6 L 45.0 55.2 L 60.0 53.1 L 75.0 51.2 L 90.0 49.6 L 105.0 48.2 L 120.0 47.3 L 135.0 46.7 L 150.0 46.5 L 165.0 46.7 L 180.0 47.3 L 195.0 48.2 L 210.0 49.6 L 225.0 51.2 L 240.0 53.1 L 255.0 55.2 L 270.0 57.6 L 285.0 60.0 L 300.0 62.5 L 315.0 65.0 L 330.0 67.4 L 345.0 69.8 L 360.0 71.9 L 375.0 73.8 L 390.0 75.4 L 405.0 76.8 L 420.0 77.7 L 435.0 78.3 L 450.0 78.5 L 465.0 78.3 L 480.0 77.7 L 495.0 76.8 L 510.0 75.4 L 525.0 73.8 L 540.0 71.9 L 555.0 69.8 L 570.0 67.4 L 585.0 65.0 L 600.0 62.5 L 615.0 60.0 L 630.0 57.6 L 645.0 55.2 L 660.0 53.1 L 675.0 51.2 L 690.0 49.6 L 705.0 48.2 L 720.0 47.3 L 735.0 46.7 L 750.0 46.5 L 765.0 46.7 L 780.0 47.3 L 795.0 48.2 L 810.0 49.6 L 825.0 51.2 L 840.0 53.1 L 855.0 55.2 L 870.0 57.6 L 885.0 60.0 L 900.0 62.5 L 915.0 65.0 L 930.0 67.4 L 945.0 69.8 L 960.0 71.9 L 975.0 73.8 L 990.0 75.4 L 1005.0 76.8 L 1020.0 77.7 L 1035.0 78.3 L 1050.0 78.5 L 1065.0 78.3 L 1080.0 77.7 L 1095.0 76.8 L 1110.0 75.4 L 1125.0 73.8 L 1140.0 71.9 L 1155.0 69.8 L 1170.0 67.4 L 1185.0 65.0 L 1200.0 62.5 L 1200 125 Z"
            />
          </svg>
        </div>
      </section>

      {/* 4 Core Landscaping Services Grid */}
      <Container className="py-12 sm:py-16">
        <div className="mb-10 text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            Our Core Specialties
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground">
            Explore Landscaping Services
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Click on any service to view comprehensive project details, client galleries, landscape styles, and request a personalized site visit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {landscapingList.map((item) => {
            const displayImage =
              item.gallery1?.[0]?.url ||
              item.heroImage ||
              "https://poolsgardensuae.com/wp-content/uploads/2024/07/Landscaping-Services-in-Dubai.jpg";
            const snippet =
              item.intro?.description?.[0] ||
              item.intro?.subHeader ||
              "Turnkey landscaping and garden care in Dubai.";

            return (
              <div
                key={item.slug}
                className="group flex flex-col justify-between rounded-2xl bg-card border border-border/80 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div>
                  <div className="relative h-52 w-full overflow-hidden bg-muted">
                    <Image
                      src={displayImage}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                    <span className="absolute top-3.5 left-3.5 rounded-full bg-primary/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold text-white shadow uppercase tracking-wide">
                      {item.title}
                    </span>
                  </div>

                  <div className="p-5 space-y-2.5">
                    <h3 className="font-display text-lg font-bold text-primary group-hover:text-emerald-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-foreground/75 leading-relaxed line-clamp-3">
                      {snippet}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-border/40 flex items-center justify-between mt-3">
                  <span className="text-[11px] font-semibold text-muted-foreground truncate max-w-[130px]">
                    Turnkey Service
                  </span>
                  <Button
                    asChild
                    size="sm"
                    variant="ghost"
                    className="text-primary font-bold hover:text-emerald-700 hover:bg-emerald-50 text-xs px-2.5"
                  >
                    <Link href={`/services/${item.slug}`}>
                      Explore Work <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </Container>

      {/* CTA Banner */}
      <section className="bg-primary/5 py-10 border-y border-primary/10">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-primary to-primary/90 text-white shadow-xl">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="font-display text-xl sm:text-2xl font-bold">
                Looking for Villa Landscape Contractors in Dubai?
              </h3>
              <p className="text-xs sm:text-sm text-white/85 max-w-xl">
                Schedule your free site evaluation with our landscape architecture specialists today.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Button
                asChild
                size="lg"
                className="bg-white text-primary hover:bg-neutral-100 font-extrabold shadow"
              >
                <a href="tel:+971506648085" className="flex items-center gap-2">
                  <PhoneCall className="h-4 w-4" />
                  +971 506648085
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/40 text-white hover:bg-white/10 font-bold"
              >
                <Link href="/contact">Book Consultation</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Get Inspired By Our Recent Work Gallery */}
      {recentWork.length > 0 && (
        <Container className="py-14 sm:py-18">
          <div className="mb-10 text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Our Portfolio
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground">
              Get Inspired By Our Recent Work
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Browse through our recent villa landscape construction, garden makeovers, swimming pool integration, and pergola installations across Dubai.
            </p>
          </div>

          <ImageGallerySection
            images={recentWork}
            columns={4}
          />
        </Container>
      )}

      {/* Google Reviews */}
      <section className="bg-muted/30 py-12 border-t border-border/60">
        <Container>
          <GoogleReviewsSection />
        </Container>
      </section>

      {/* Map & Bottom Inquiry */}
      <Container className="py-14 space-y-12">
        <ContactMapSection />
        <BottomInquirySection />
      </Container>
    </main>
  );
}
