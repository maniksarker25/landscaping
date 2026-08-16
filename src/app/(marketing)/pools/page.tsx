import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Waves } from "lucide-react";
import { Container } from "@/components/common/container";
import { Button } from "@/components/ui/button";
import { fetchServicesData } from "@/lib/api/services";

export const metadata: Metadata = {
  title: "Swimming Pool Construction & Services in Dubai | Poolscape",
  description:
    "Explore our luxury swimming pool construction services in Dubai. Infinity pools, overflow pools, skimmer pools, pool maintenance, and water features.",
};

export default async function PoolsOverviewPage() {
  const response = await fetchServicesData();
  const poolsList = (response.data || []).filter(
    (item) => item.category?.toLowerCase().trim() === "pools",
  );

  return (
    <main className="min-h-screen bg-background">
      {/* Header Banner */}
      <section className="relative bg-primary text-primary-foreground py-16 sm:py-24 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/90 to-transparent" />
        <Container className="relative z-10 space-y-4 max-w-3xl">
          <span className="inline-block text-xs font-extrabold uppercase tracking-widest text-emerald-300">
            Luxury Pool Services
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Custom Swimming Pools & Water Features
          </h1>
          <p className="text-sm sm:text-base text-primary-foreground/80 leading-relaxed max-w-xl mx-auto">
            From vanishing infinity edges to precision overflow channels,
            discover how we engineer world-class swimming pools across Dubai.
          </p>
        </Container>
      </section>

      {/* Pools Grid or No Data State */}
      <Container className="py-12 sm:py-16">
        {poolsList.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-16 px-4 rounded-2xl border border-dashed border-border bg-card/50 max-w-2xl mx-auto shadow-sm">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
              <Waves className="h-8 w-8 text-primary" aria-hidden="true" />
            </div>
            <h3 className="font-display text-xl font-bold text-foreground">
              No Swimming Pool Services Available
            </h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-md">
              We are currently updating our pool collection. Please check back
              soon or contact us directly to inquire about custom pool
              construction.
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
            {poolsList.map((pool) => (
              <div
                key={pool.slug || pool._id}
                className="group flex  flex-col justify-between rounded-2xl bg-card border border-border/80 shadow-md overflow-hidden transition-all "
              >
                <div>
                  <div className="relative h-56 w-full overflow-hidden bg-muted">
                    <Image
                      src={pool.heroImage || pool.featuredImage || ""}
                      alt={pool.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover "
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    {pool.badge && (
                      <span className="absolute top-4 left-4 rounded-full bg-emerald-600/90 backdrop-blur-sm px-3 py-1 text-[11px] font-bold text-white shadow">
                        {pool.badge}
                      </span>
                    )}
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="font-display text-xl font-bold text-primary group-hover:text-emerald-700 transition-colors">
                      {pool.title}
                    </h3>
                    {pool?.subtitle && (
                      <p className="text-xs sm:text-sm text-foreground/70 leading-relaxed line-clamp-3">
                        {pool?.subtitle ||
                          pool.sections?.[0]?.content?.richTextHtml
                            ?.replace(/<[^>]*>/g, "")
                            .substring(0, 150) + "..."}
                      </p>
                    )}
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-border/40 flex items-center justify-between">
                  <span className="text-xs font-semibold text-muted-foreground">
                    {pool?.subtitle || "No description available"}
                  </span>
                  <Button
                    asChild
                    size="sm"
                    variant="ghost"
                    className="text-primary font-bold hover:text-emerald-700 hover:bg-emerald-50"
                  >
                    <Link href={`/services/${pool.slug}`}>
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
