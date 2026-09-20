import { IMAGE } from "../../public/images/index.image";

export interface HeroSlide {
  id: string;
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
}

export const heroSlides: HeroSlide[] = [
  {
    id: "hero-1",
    src: IMAGE.hero1,
    alt: "Swimming Pools, Landscaping & Outdoor Living - Dream Floor Landscaping LLC",
    title: "Swimming Pools, Landscaping & Outdoor Living",
    subtitle:
      "Transforming outdoor spaces with expertly designed pools, landscapes, and outdoor features.",
  },
  {
    id: "hero-2",
    src: IMAGE.hero2,
    alt: "Landscape Design & Garden Care - Dream Floor Landscaping LLC",
    title: "Landscape Design & Garden Care",
    subtitle:
      "Creating and maintaining vibrant landscapes with professional garden care, irrigation, and outdoor enhancements.",
  },
  {
    id: "hero-3",
    src: IMAGE.hero3,
    alt: "Swimming Pool Construction & Maintenance - Dream Floor Landscaping LLC",
    title: "Swimming Pool Construction & Maintenance",
    subtitle:
      "From custom pool construction to professional maintenance, we deliver quality solutions built to the highest standards.",
  },
];

