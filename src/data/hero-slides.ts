import { IMAGE } from "../../public/images/index.image";

export interface HeroSlide {
  id: string;
  src: string;
  alt: string;
}
export const heroSlides: HeroSlide[] = [
  {
    id: "resort-pool",
    src: IMAGE.hero1,
    alt: "We’re one of the best pool maintenance companies in Dubai -Licensed, Insured & Reliable",
  },
  {
    id: "villa-garden",
    src: IMAGE.hero2,
    alt: "We’re one of the best pool maintenance companies in Dubai -Licensed, Insured & Reliable",
  },
  {
    id: "poolside-lounge",
    src: IMAGE.hero3,
    alt: "Professional Pool Maintenance Company in Dubai - Licensed, Insured & Reliable",
  },
];
