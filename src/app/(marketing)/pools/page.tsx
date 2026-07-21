import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Waves, CircleDot, Droplets, Infinity as InfinityIcon, Wrench, Sparkles, GlassWater } from "lucide-react";
import { Container } from "@/components/common/container";
import { Button } from "@/components/ui/button";
import { serviceData } from "@/data/services-data";

export const metadata: Metadata = {
  title: "Swimming Pool Construction & Services in Dubai | Poolscape",
  description: "Explore our luxury swimming pool construction services in Dubai. Infinity pools, overflow pools, skimmer pools, pool maintenance, and water features.",
};

export default function PoolsOverviewPage() {
  const poolsList = serviceData.filter((item) => item.category === "Pools");

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
            From vanishing infinity edges to precision overflow channels, discover how we engineer world-class swimming pools across Dubai.
          </p>
        </Container>
      </section>

      {/* Pools Grid */}
      <Container className="py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {poolsList.map((pool) => (
            <div
              key={pool.slug}
              className="group flex flex-col justify-between rounded-2xl bg-card border border-border/80 shadow-md overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1"
            >
              <div>
                <div className="relative h-56 w-full overflow-hidden bg-muted">
                  <Image
                    src={pool.heroImage || pool.featuredImage || ""}
                    alt={pool.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
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
                  <p className="text-xs sm:text-sm text-foreground/70 leading-relaxed line-clamp-3">
                    {pool.subtitle || pool.sections[1]?.content?.richTextHtml?.replace(/<[^>]*>/g, "").substring(0, 150) + "..."}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-border/40 mt-4 flex items-center justify-between">
                <span className="text-xs font-semibold text-muted-foreground">
                  Turnkey Dubai Service
                </span>
                <Button asChild size="sm" variant="ghost" className="text-primary font-bold hover:text-emerald-700 hover:bg-emerald-50">
                  <Link href={`/services/${pool.slug}`}>
                    Explore Details <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </main>
  );
}
