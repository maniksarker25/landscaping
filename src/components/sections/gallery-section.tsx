"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

import { PageHero } from "@/components/sections/page-hero";
import { GallerySkeleton } from "@/components/sections/gallery/gallery-skeleton";
import { GalleryCard } from "@/components/sections/gallery/gallery-card";
import { GalleryFilterButtons } from "@/components/sections/gallery/gallery-filter-buttons";

import type { GalleryItem, GalleryMeta } from "@/types/gallery";
import type { ServiceData } from "@/types/service";
import type { Testimonial } from "@/types";
import type { LightboxItem } from "@/components/common/lightbox-modal";

// Dynamic Imports for Component-based Code Splitting
const LightboxModal = dynamic(
  () =>
    import("@/components/common/lightbox-modal").then(
      (mod) => mod.LightboxModal,
    ),
  { ssr: false },
);

const GalleryMobileModal = dynamic(
  () =>
    import("@/components/sections/gallery/gallery-mobile-modal").then(
      (mod) => mod.GalleryMobileModal,
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

export interface GalleryProps {
  initialData?: GalleryItem[];
  initialMeta?: GalleryMeta;
  initialTestimonials?: Testimonial[];
}

export function Gallery({
  initialData,
  initialMeta,
  initialTestimonials,
}: GalleryProps) {
  // Synchronous initial state from SSR props
  const [allItems, setAllItems] = useState<GalleryItem[]>(() => {
    if (initialData && initialData.length > 0) return initialData;
    return [];
  });

  const [items, setItems] = useState<GalleryItem[]>(() => {
    if (initialData && initialData.length > 0) return initialData;
    return [];
  });

  const [_meta, setMeta] = useState<GalleryMeta | undefined>(initialMeta);
  const [loading, setLoading] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );
  const [activeCategory, setActiveCategory] = useState("all");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [apiServices, setApiServices] = useState<ServiceData[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    let isMounted = true;
    fetch("/api/service/get-all")
      .then((res) => res.json())
      .then((json) => {
        if (
          isMounted &&
          json?.data &&
          Array.isArray(json.data) &&
          json.data.length > 0
        ) {
          setApiServices(json.data);
        }
      })
      .catch((err) =>
        console.error(
          "Failed to fetch services for gallery slug matching:",
          err,
        ),
      );
    return () => {
      isMounted = false;
    };
  }, []);

  // O(1) map lookup for category -> service slug
  const serviceCategoryMap = useMemo(() => {
    const map = new Map<string, string>();
    apiServices?.forEach((s) => {
      if (s?.category && s?.slug && s?.isPublished !== false) {
        map.set(s.category.toLowerCase().trim(), s.slug);
      }
    });
    return map;
  }, [apiServices]);

  const getTargetSlug = useCallback(
    (item?: GalleryItem) => {
      if (!item) return "/services";
      const rawSlug = item?.slug;
      if (rawSlug) {
        return rawSlug.startsWith("/") ? rawSlug : `/services/${rawSlug}`;
      }

      const itemCat = (item?.category ?? "").toLowerCase().trim();
      if (serviceCategoryMap.has(itemCat)) {
        return `/services/${serviceCategoryMap.get(itemCat)}`;
      }

      if (itemCat === "pools" || itemCat.includes("pool")) {
        return "/services/the-premier-overflow-swimming-pool-contractor";
      }
      if (
        itemCat === "landscaping" ||
        itemCat.includes("landscape") ||
        itemCat.includes("living")
      ) {
        return "/services/tempora-labore-nemo";
      }

      return apiServices?.[0]?.slug
        ? `/services/${apiServices[0].slug}`
        : "/services/the-premier-overflow-swimming-pool-contractor";
    },
    [apiServices, serviceCategoryMap],
  );

  // Dynamic list of available categories computed from master items list
  const categories = useMemo(() => {
    const unique = new Set<string>();
    allItems?.forEach((item) => {
      if (item?.category) unique.add(item.category.trim());
    });

    const categoryList: { label: string; value: string }[] = [
      { label: "All Projects", value: "all" },
    ];

    unique.forEach((cat) => {
      const lower = cat.toLowerCase();
      let label = cat;
      if (lower === "pools") label = "Swimming Pools";
      else if (lower === "landscaping") label = "Landscaping";
      else if (lower === "outdoor living" || lower === "outdoor-living")
        label = "Outdoor Living";

      categoryList.push({ label, value: cat });
    });

    return categoryList;
  }, [allItems]);

  // O(1) category item count map
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: allItems?.length ?? 0 };
    allItems?.forEach((i) => {
      if (i?.category) {
        const catKey = i.category.toLowerCase().trim();
        counts[catKey] = (counts[catKey] ?? 0) + 1;
      }
    });
    return counts;
  }, [allItems]);

  const getItemCount = useCallback(
    (catValue: string) => {
      if (catValue === "all") return categoryCounts.all ?? 0;
      return categoryCounts[catValue.toLowerCase().trim()] ?? 0;
    },
    [categoryCounts],
  );

  // Asynchronous background refetching synced smoothly with synchronous UI activeCategory tab
  const fetchFilteredGallery = useCallback(async (cat: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("limit", "50");
      if (cat !== "all") {
        params.append("category", cat);
      }

      const res = await fetch(`/api/gallery/get-all?${params.toString()}`);
      if (res.ok) {
        const json = await res.json();
        if (json?.data && Array.isArray(json.data) && json.data.length > 0) {
          setItems(json.data);
          setAllItems((prev) => {
            if (!prev || prev.length === 0) return json.data;
            const existingIds = new Set(prev.map((i) => i?._id));
            const newItems = json.data.filter(
              (i: GalleryItem) => i?._id && !existingIds.has(i._id),
            );
            return newItems.length > 0 ? [...prev, ...newItems] : prev;
          });
          if (json?.meta) setMeta(json.meta);
        }
      }
    } catch (err) {
      console.error("Failed to refetch gallery category items:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!initialData || initialData.length === 0) {
      fetchFilteredGallery("all");
    }
  }, [initialData, fetchFilteredGallery]);

  // Synchronous client tab selection with background async refetching
  const handleCategorySelect = useCallback(
    (catValue: string) => {
      setActiveCategory(catValue);
      setSelectedImageIndex(null);
      fetchFilteredGallery(catValue);
    },
    [fetchFilteredGallery],
  );

  const handleOpenMobileFilter = useCallback(() => {
    setIsMobileFilterOpen(true);
  }, []);

  const handleCloseMobileFilter = useCallback(() => {
    setIsMobileFilterOpen(false);
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

  // Filter items synchronously for instant UI updates
  const filteredItems = useMemo(() => {
    if (activeCategory === "all") return items;
    return items.filter(
      (item) => item?.category?.toLowerCase() === activeCategory.toLowerCase(),
    );
  }, [items, activeCategory]);

  // Map GalleryItems to LightboxItem structure for LightboxModal
  const lightboxItems: LightboxItem[] = useMemo(() => {
    return (filteredItems ?? []).map((item) => ({
      id: item?._id,
      title:
        item?.imageAlt ||
        `${item?.location ?? ""} ${item?.category ?? ""}`.trim(),
      imageUrl: item?.image,
      category: item?.category,
    }));
  }, [filteredItems]);

  const activeCategoryLabel = useMemo(() => {
    return (
      categories.find((c) => c?.value === activeCategory)?.label ??
      "All Projects"
    );
  }, [categories, activeCategory]);

  return (
    <div className="w-full">
      {pathname === "/projects" && (
        <PageHero
          eyebrow="Projects"
          title="Our Recent Completed Projects"
          description="A showcase of our luxury swimming pools, landscaping, and outdoor living transformations in Dubai."
        />
      )}

      <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center font-display tracking-tight text-primary">
          {pathname === "/projects"
            ? "Our Recent Projects"
            : "Some of Our Recent Projects"}
        </h1>

        {/* Filter Controls (Desktop Buttons & Mobile Trigger) */}
        <GalleryFilterButtons
          categories={categories}
          activeCategory={activeCategory}
          activeCategoryLabel={activeCategoryLabel}
          getItemCount={getItemCount}
          onSelectCategory={handleCategorySelect}
          onOpenMobileFilter={handleOpenMobileFilter}
        />

        {/* Dynamic Loading Skeletons vs Grid Gallery */}
        {loading && items.length === 0 ? (
          <GallerySkeleton />
        ) : (
          <>
            {loading && (
              <div className="flex items-center justify-center py-4 gap-2 text-primary text-sm font-medium">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Updating projects...</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item, index) => (
                  <GalleryCard
                    key={item?._id}
                    item={item}
                    index={index}
                    targetSlug={getTargetSlug(item)}
                    onSelectImage={handleSelectImageCard}
                  />
                ))}
              </AnimatePresence>
            </div>
          </>
        )}

        {filteredItems.length === 0 && !loading && (
          <div className="text-center py-20 bg-muted/20 rounded-2xl border border-dashed border-border mt-4">
            <div className="text-5xl mb-3">🔍</div>
            <h3 className="text-lg font-bold text-primary mb-1">
              No projects found in this category
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mb-4">
              Try selecting &quot;All Projects&quot; to view our complete
              portfolio.
            </p>
            <button
              onClick={() => handleCategorySelect("all")}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors"
            >
              Show All Projects
            </button>
          </div>
        )}

        {/* Lightbox Component Dynamically Loaded */}
        <LightboxModal
          items={lightboxItems}
          selectedIndex={selectedImageIndex}
          onClose={handleCloseLightbox}
          onIndexChange={handleIndexChangeLightbox}
        />
      </div>

      {/* Mobile Category Filter Modal Drawer Dynamically Loaded */}
      <GalleryMobileModal
        isOpen={isMobileFilterOpen}
        categories={categories}
        activeCategory={activeCategory}
        getItemCount={getItemCount}
        onSelectCategory={handleCategorySelect}
        onClose={handleCloseMobileFilter}
      />

      {pathname === "/projects" && (
        <Testimonials initialTestimonials={initialTestimonials} />
      )}

      {pathname === "/projects" && <QuoteMapSection />}
    </div>
  );
}

export default Gallery;
