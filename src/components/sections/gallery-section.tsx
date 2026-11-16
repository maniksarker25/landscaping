"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ArrowRight, Layers } from "lucide-react";
import Link from "next/link";

import { PageHero } from "@/components/sections/page-hero";
import { GalleryCard } from "@/components/sections/gallery/gallery-card";
import { GallerySkeleton } from "@/components/sections/gallery/gallery-skeleton";
import type { GalleryItem, GalleryMeta } from "@/types/gallery";
import type { Testimonial } from "@/types";
import type { LightboxItem } from "@/components/common/lightbox-modal";
import { fetchGalleryData } from "@/lib/api/gallery";
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

export type GalleryTab =
  | "all"
  | "pools"
  | "landscaping"
  | "outdoor-living"
  | string;

export interface GalleryProps {
  initialData?: GalleryItem[];
  initialMeta?: GalleryMeta;
  initialTestimonials?: Testimonial[];
  defaultTab?: GalleryTab;
}

/**
 * Checks whether an item's category matches the user-selected category tab.
 */
function matchesCategory(
  itemCategory: string | undefined,
  selectedCat: string,
): boolean {
  if (selectedCat === "all") return true;
  if (!itemCategory) return false;

  const cat = itemCategory.toLowerCase().trim();
  const target = selectedCat.toLowerCase().trim();

  if (target === "pools") {
    return cat === "pools" || cat.includes("pool");
  }

  if (target === "outdoor-living") {
    return (
      cat === "outdoor-living" ||
      cat.includes("outdoor") ||
      cat.includes("living") ||
      cat.includes("pergola") ||
      cat.includes("patio")
    );
  }

  if (target === "landscaping") {
    return (
      cat === "landscaping" ||
      cat.includes("landscap") ||
      cat.includes("garden")
    );
  }

  if (target === "lighting") {
    return cat === "lighting" || cat.includes("light");
  }

  return cat === target || cat.includes(target) || target.includes(cat);
}

export function Gallery({
  initialData = [],
  initialTestimonials,
  defaultTab = "all",
}: GalleryProps) {
  const pathname = usePathname();
  const isProjectsPage = pathname === "/projects";

  const [activeTab, setActiveTab] = useState<GalleryTab>(defaultTab);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );

  // API items state - strictly from database/API
  const [apiItems, setApiItems] = useState<GalleryItem[]>(initialData || []);
  const [isLoading, setIsLoading] = useState<boolean>(
    !initialData || initialData.length === 0,
  );

  // Client-side fetch from API with loader
  useEffect(() => {
    let isMounted = true;

    async function loadGalleryFromApi() {
      try {
        if (!initialData || initialData.length === 0) {
          setIsLoading(true);
        }

        const res = await fetchGalleryData({ limit: 100 });
        if (isMounted && res.data && res.data.length > 0) {
          setApiItems(res.data);
        }
      } catch (err) {
        console.warn("Could not load gallery from API:", err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadGalleryFromApi();

    return () => {
      isMounted = false;
    };
  }, [initialData]);

  // Dynamic category tabs derived strictly from available API items
  const categoryTabs = useMemo(() => {
    if (apiItems.length === 0) {
      return [{ id: "all", label: "All Projects", count: 0 }];
    }

    const categoryMap = new Map<string, { label: string; count: number }>();

    apiItems.forEach((item) => {
      const raw = (item.category || "").toLowerCase().trim();
      if (!raw) return;

      let key = raw;
      let label = raw
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");

      if (raw === "pools" || raw.includes("pool")) {
        key = "pools";
        label = "Swimming Pools";
      } else if (
        raw === "outdoor-living" ||
        raw.includes("outdoor") ||
        raw.includes("living") ||
        raw.includes("pergola")
      ) {
        key = "outdoor-living";
        label = "Outdoor Living";
      } else if (raw === "landscaping" || raw.includes("landscap")) {
        key = "landscaping";
        label = "Landscaping";
      }

      const existing = categoryMap.get(key);
      if (existing) {
        existing.count += 1;
      } else {
        categoryMap.set(key, { label, count: 1 });
      }
    });

    const tabs: { id: string; label: string; count: number }[] = [
      { id: "all", label: "All Projects", count: apiItems.length },
    ];

    categoryMap.forEach((val, key) => {
      tabs.push({ id: key, label: val.label, count: val.count });
    });

    return tabs;
  }, [apiItems]);

  // Ensure active tab points to a valid available tab
  useEffect(() => {
    if (
      categoryTabs.length > 0 &&
      !categoryTabs.some((t) => t.id === activeTab)
    ) {
      setActiveTab("all");
    }
  }, [categoryTabs, activeTab]);

  // Display items strictly from the API (NO static mock items)
  const activeItems = useMemo(() => {
    if (activeTab === "all") {
      return apiItems;
    }
    return apiItems.filter((item) =>
      matchesCategory(item.category, activeTab),
    );
  }, [activeTab, apiItems]);

  // Sliced items for homepage (limit 12) vs full list on /projects
  const displayItems = useMemo(() => {
    if (isProjectsPage) return activeItems;
    return activeItems.slice(0, 12);
  }, [isProjectsPage, activeItems]);

  // Lightbox items mapping directly to the visible API items
  const lightboxItems: LightboxItem[] = useMemo(() => {
    return displayItems.map((item) => ({
      id: item._id,
      title: item.imageAlt || item.location,
      imageUrl: item.image,
      category: item.category,
      slug: item.slug,
    }));
  }, [displayItems]);

  const handleTabChange = useCallback((tab: string) => {
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
            Browse our completed luxury swimming pools, villa landscaping, and outdoor living projects across Dubai.
          </p>
        </div>

        {/* Dynamic Category Filter Tabs - Showing ONLY categories from API */}
        {categoryTabs.length > 1 && (
          <div className="flex items-center justify-center mb-8 sm:mb-10">
            <div
              role="tablist"
              aria-label="Gallery Categories"
              className="inline-flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-2xl sm:rounded-full bg-muted/80 backdrop-blur-sm border border-border shadow-xs max-w-3xl"
            >
              {categoryTabs.map((cat) => {
                const isActive = activeTab === cat.id;
                const count = cat.count;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    id={`tab-${cat.id}`}
                    aria-selected={isActive}
                    aria-controls={`gallery-panel-${cat.id}`}
                    onClick={() => handleTabChange(cat.id)}
                    className={cn(
                      "inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 shadow-sm",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-md scale-[1.02]"
                        : "text-muted-foreground hover:text-foreground hover:bg-background/60",
                    )}
                  >
                    <span>{cat.label}</span>
                    {count > 0 && (
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[10px] sm:text-[11px] font-semibold transition-colors",
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-muted text-muted-foreground",
                        )}
                      >
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Gallery Grid or Loading Skeleton */}
        <div
          id={`gallery-panel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeTab}`}
        >
          {isLoading ? (
            <GallerySkeleton count={isProjectsPage ? 8 : 4} />
          ) : displayItems.length > 0 ? (
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
          ) : (
            <div className="py-16 text-center max-w-md mx-auto space-y-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-foreground">
                No Projects Found
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                There are currently no projects in this category. Please check back soon or browse all projects.
              </p>
              {activeTab !== "all" && (
                <button
                  type="button"
                  onClick={() => handleTabChange("all")}
                  className="text-xs font-semibold text-primary hover:underline pt-2 block mx-auto"
                >
                  View All Projects
                </button>
              )}
            </div>
          )}

          {/* Homepage CTA to view all projects */}
          {!isLoading && !isProjectsPage && activeItems.length > 12 && (
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
