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
    alt: "Top Rated Swimming Pool & Landscape Design in Dubai - Dream Floor Landscaping LLC",
    title: "TOP RATED GARDEN, LANDSCAPING & LAWN CARE SERVICES IN DUBAI",
    subtitle: "SWIMMING POOL CONSTRUCTION & MAINTENANCE",
  },
  {
    id: "hero-2",
    src: IMAGE.hero2,
    alt: "Custom Pool Maintenance and Garden Transformations in Dubai",
    title: "EXPERT OUTDOOR LIVING & COMPLETE GARDEN TRANSFORMATIONS",
    subtitle: "PERGOLAS, WATER FEATURES & IRRIGATION SYSTEMS",
  },
  {
    id: "hero-3",
    src: IMAGE.hero3,
    alt: "Licensed & Insured Pool Construction & Maintenance Company in Dubai",
    title: "PREMIUM POOL CONSTRUCTION & OUTDOOR LIVING SOLUTIONS",
    subtitle: "LICENSED, INSURED & RELIABLE LANDSCAPING SPECIALISTS",
  },
];
