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
    id: "resort-pool",
    src: "https://images.unsplash.com/photo-1757439402214-2311405d70bd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Resort-style swimming pool surrounded by manicured landscaping",
  },
  // {
  //   id: "infinity-pool",
  //   src: "https://plus.unsplash.com/premium_photo-1675745329659-29044cb6adbb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   alt: "Infinity-edge swimming pool overlooking a landscaped garden at dusk",
  // },

  {
    id: "villa-garden",
    src: "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=2000&auto=format&fit=crop",
    alt: "Private villa garden with pool and evening lighting",
  },
  {
    id: "poolside-lounge",
    src: "https://i.pinimg.com/1200x/23/a4/e7/23a4e78d52f4016ccf08f19776992a5e.jpg",
    alt: "Modern poolside lounge area with water feature",
  },
];
