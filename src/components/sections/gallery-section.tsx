"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ArrowRight, Waves, Trees } from "lucide-react";
import Link from "next/link";

import { PageHero } from "@/components/sections/page-hero";
import { GalleryCard } from "@/components/sections/gallery/gallery-card";
import type { GalleryItem, GalleryMeta } from "@/types/gallery";
import type { Testimonial } from "@/types";
import type { LightboxItem } from "@/components/common/lightbox-modal";
import { POOLS_STATIC_DATA } from "@/data/pools-static-data";
import { LANDSCAPING_STATIC_DATA } from "@/data/landscaping-static-data";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

// Dynamic Imports for Component-based Code Splitting
const LightboxModal = dynamic(
  () =>
    import("@/components/common/lightbox-modal").then(
      (mod) => mod.LightboxModal,
    ),
  { ssr: false },
);

const Testimonials = dynamic(() =>
  import("@/components/sections/testimonials").then((mod) => mod.Testimonials),
);

const QuoteMapSection = dynamic(() =>
  import("@/components/sections/quote-map-section").then(
    (mod) => mod.QuoteMapSection,
  ),
);

export type GalleryTab = "pools" | "landscaping";

export interface GalleryProps {
  initialData?: GalleryItem[];
  initialMeta?: GalleryMeta;
  initialTestimonials?: Testimonial[];
  defaultTab?: GalleryTab;
}

export function Gallery({
  initialTestimonials,
  defaultTab = "pools",
}: GalleryProps) {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<GalleryTab>(defaultTab);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );

  // Extract unique recentWorkGallery items from POOLS_STATIC_DATA
  const poolsItems: GalleryItem[] = useMemo(() => {
    const seen = new Set<string>();
    const items: GalleryItem[] = [];

    Object.values(POOLS_STATIC_DATA).forEach((service) => {
      (service.recentWorkGallery || []).forEach((img) => {
        if (img?.url && !seen.has(img.url)) {
          seen.add(img.url);
          items.push({
            _id: `pool-${items.length}-${encodeURIComponent(img.url.slice(-25))}`,
            location: "Dubai, UAE",
            image: img.url,
            imageAlt: img.alt || "Luxury Swimming Pool Project Dubai",
            category: "Pools",
            slug: `/services/${service.slug || "swimming-pool-construction"}`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });
        }
      });
    });

    return items;
  }, []);

  // Extract unique recentWorkGallery items from LANDSCAPING_STATIC_DATA
  const landscapingItems: GalleryItem[] = useMemo(() => {
    const seen = new Set<string>();
    const items: GalleryItem[] = [];

    Object.values(LANDSCAPING_STATIC_DATA).forEach((service) => {
      (service.recentWorkGallery || []).forEach((img) => {
        if (img?.url && !seen.has(img.url)) {
          seen.add(img.url);
          items.push({
            _id: `landscaping-${items.length}-${encodeURIComponent(img.url.slice(-25))}`,
            location: "Dubai, UAE",
            image: img.url,
            imageAlt: img.alt || "Luxury Villa Landscaping Dubai",
            category: "Landscaping",
            slug: `/services/${service.slug || "villa-landscaping"}`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });
        }
      });
    });

    return items;
  }, []);

  // Current active list
  const activeItems = useMemo(() => {
    return activeTab === "pools" ? poolsItems : landscapingItems;
  }, [activeTab, poolsItems, landscapingItems]);

  const isProjectsPage = pathname === "/projects";

  // Sliced items for homepage (limit 12) vs full list on /projects
  const displayItems = useMemo(() => {
    if (isProjectsPage) return activeItems;
    return activeItems.slice(0, 12);
  }, [isProjectsPage, activeItems]);

  // Lightbox items mapping directly to the visible items
  const lightboxItems: LightboxItem[] = useMemo(() => {
    return displayItems.map((item) => ({
      id: item._id,
      title: item.imageAlt || item.location,
      imageUrl: item.image,
      category: item.category,
      slug: item.slug,
    }));
  }, [displayItems]);

  const handleTabChange = useCallback((tab: GalleryTab) => {
    setActiveTab(tab);
    setSelectedImageIndex(null);
  }, []);

  const handleCloseLightbox = useCallback(() => {
    setSelectedImageIndex(null);
  }, []);

  const handleIndexChangeLightbox = useCallback((newIndex: number) => {
    setSelectedImageIndex(newIndex);
  }, []);

  const handleSelectImageCard = useCallback((index: number) => {
    setSelectedImageIndex(index);
  }, []);

  return (
    <div className="w-full">
      {isProjectsPage && (
        <PageHero
          image="https://poolsgardensuae.com/wp-content/uploads/2026/07/IMG_8657-scaled.jpg"
          title="Our Recent Completed Projects"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Our Projects" },
          ]}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 py-10 sm:py-14 animate-fade-in">
        {/* Section Header */}
        <div className="text-center mb-8 max-w-2xl mx-auto space-y-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            Our Portfolio
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground font-display tracking-tight">
            Our Recent Completed Projects
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Browse our hand-crafted swimming pools and luxury villa landscaping projects completed across Dubai.
          </p>
        </div>

        {/* Two Tabs: Swimming Pools & Landscaping */}
        <div className="flex items-center justify-center mb-8 sm:mb-10">
          <div
            role="tablist"
            aria-label="Gallery Categories"
            className="inline-flex p-1.5 rounded-full bg-muted/80 backdrop-blur-sm border border-border shadow-xs max-w-md w-full sm:w-auto"
          >
            <button
              type="button"
              role="tab"
              id="tab-pools"
              aria-selected={activeTab === "pools"}
              aria-controls="gallery-panel-pools"
              onClick={() => handleTabChange("pools")}
              className={cn(
                "flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 shadow-sm",
                activeTab === "pools"
                  ? "bg-primary text-primary-foreground shadow-md scale-[1.02]"
                  : "text-muted-foreground hover:text-foreground hover:bg-background/60",
              )}
            >
              <span>Swimming Pools</span>
            </button>

            <button
              type="button"
              role="tab"
              id="tab-landscaping"
              aria-selected={activeTab === "landscaping"}
              aria-controls="gallery-panel-landscaping"
              onClick={() => handleTabChange("landscaping")}
              className={cn(
                "flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 shadow-sm",
                activeTab === "landscaping"
                  ? "bg-primary text-primary-foreground shadow-md scale-[1.02]"
                  : "text-muted-foreground hover:text-foreground hover:bg-background/60",
              )}
            >
              <span>Landscaping</span>
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div
          id={`gallery-panel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeTab}`}
        >
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3 lg:gap-3.5">
            <AnimatePresence mode="popLayout">
              {displayItems.map((item, index) => (
                <GalleryCard
                  key={item._id}
                  item={item}
                  index={index}
                  targetSlug={item.slug}
                  onSelectImage={handleSelectImageCard}
                  isShowText={isProjectsPage}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Homepage CTA to view all projects */}
          {!isProjectsPage && activeItems.length > 12 && (
            <div className="flex items-center justify-center pt-8 sm:pt-10">
              <Button
                asChild
                size="default"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 shadow-md rounded-full"
              >
                <Link href="/projects" className="flex items-center gap-2">
                  <span>Explore All Projects</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          )}
        </div>

        {/* Lightbox Component Dynamically Loaded */}
        <LightboxModal
          items={lightboxItems}
          selectedIndex={selectedImageIndex}
          onClose={handleCloseLightbox}
          onIndexChange={handleIndexChangeLightbox}
        />
      </div>

      {isProjectsPage && (
        <Testimonials
          initialTestimonials={initialTestimonials}
          eyebrow="Testimonials"
          title="Words From Our Customers"
        />
      )}

      {isProjectsPage && <QuoteMapSection />}
    </div>
  );
}

export default Gallery;
