export interface HeroSlide {
  id: string;
  src: string;
  alt: string;
}

/**
 * Background slides for the homepage hero.
 * Swap `src` for real, optimized project photography (ideally served from
 * /public or a CDN/image loader configured in next.config) — 2000px wide,
 * ~16:9–3:2, JPEG/WebP, each under ~300KB so the parallel preload stays fast.
 */
export const heroSlides: HeroSlide[] = [
  {
    id: "infinity-pool",
    src: "https://images.unsplash.com/photo-1622085354806-80fcdcd4ef4a?q=80&w=2128&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Infinity-edge swimming pool overlooking a landscaped garden at dusk",
  },
  {
    id: "resort-pool",
    src: "https://images.unsplash.com/photo-1757439402214-2311405d70bd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Resort-style swimming pool surrounded by manicured landscaping",
  },
  {
    id: "villa-garden",
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop",
    alt: "Private villa garden with pool and evening lighting",
  },
  {
    id: "poolside-lounge",
    src: "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?q=80&w=2000&auto=format&fit=crop",
    alt: "Modern poolside lounge area with water feature",
  },
];
