import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Trees } from "lucide-react";
import { Container } from "@/components/common/container";
import { Button } from "@/components/ui/button";
import { fetchServicesData } from "@/lib/api/services";

export const metadata: Metadata = {
  title: "Landscape Design & Villa Landscaping Services in Dubai | Poolscape",
  description:
    "Explore our luxury landscaping and garden design services in Dubai. Softscaping, hardscaping, pergolas, gazebos, garden lighting, and smart irrigation.",
};

export default async function LandscapingOverviewPage() {
  const response = await fetchServicesData();
  const landscapingList = (response.data || []).filter(
    (item) => item.category?.toLowerCase().trim() === "landscaping",
  );

  return (
    <main className="min-h-screen bg-background">
      {/* Header Banner */}
      <section className="relative bg-primary text-primary-foreground pt-16 sm:pt-24 pb-0 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/90 to-transparent" />
        <Container className="relative z-10 space-y-4 max-w-3xl pb-4 sm:pb-8">
          <span className="inline-block text-xs font-extrabold uppercase tracking-widest text-emerald-300">
            Luxury Landscaping Services
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Villa Landscaping & Outdoor Living Design
          </h1>
          <p className="text-sm sm:text-base text-primary-foreground/80 leading-relaxed max-w-xl mx-auto">
            From bespoke garden softscapes to architectural pergolas and
            lighting, discover how we transform outdoor living spaces across
            Dubai.
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

      {/* Landscaping Grid or No Data State */}
      <Container className="py-12 sm:py-16">
        {landscapingList.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-16 px-4 rounded-2xl border border-dashed border-border bg-card/50 max-w-2xl mx-auto shadow-sm">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
              <Trees className="h-8 w-8 text-primary" aria-hidden="true" />
            </div>
            <h3 className="font-display text-xl font-bold text-foreground">
              No Landscaping Services Available
            </h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-md">
              We are currently updating our landscaping services. Please check
              back soon or contact us directly for custom garden design.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <Button asChild variant="outline">
                <Link href="/contact">Contact Our Team</Link>
              </Button>
              <Button asChild>
                <Link href="/services">View All Services</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {landscapingList.map((item) => (
              <div
                key={item.slug || item._id}
                className="group flex flex-col justify-between rounded-2xl bg-card border border-border/80 shadow-md overflow-hidden transition-all "
              >
                <div>
                  <div className="relative h-56 w-full overflow-hidden bg-muted">
                    <Image
                      src={item.heroImage || item.featuredImage || ""}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover "
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    {item.badge && (
                      <span className="absolute top-4 left-4 rounded-full bg-emerald-600/90 backdrop-blur-sm px-3 py-1 text-[11px] font-bold text-white shadow">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="font-display text-xl font-bold text-primary group-hover:text-emerald-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-foreground/70 leading-relaxed line-clamp-3">
                      {item.subtitle ||
                        item.sections?.[0]?.content?.richTextHtml
                          ?.replace(/<[^>]*>/g, "")
                          .substring(0, 150) + "..."}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-border/40 mt-4 flex items-center justify-between">
                  <span className="text-xs font-semibold text-muted-foreground">
                    Turnkey Dubai Service
                  </span>
                  <Button
                    asChild
                    size="sm"
                    variant="ghost"
                    className="text-primary font-bold hover:text-emerald-700 hover:bg-emerald-50"
                  >
                    <Link href={`/services/${item.slug}`}>
                      Explore Details <ArrowRight className="ml-1.5 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </main>
  );
}
