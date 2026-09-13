export interface HeroSlide {
  id: string;
  src: string;
  alt: string;
}
export const heroSlides: HeroSlide[] = [
  {
    id: "resort-pool",
    src: "https://images.unsplash.com/photo-1757439402214-2311405d70bd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Resort-style swimming pool surrounded by manicured landscaping",
  },
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
