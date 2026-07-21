import type { LucideIcon } from "lucide-react";
import {
  Waves,
  CircleDot,
  Droplets,
  Infinity as InfinityIcon,
  Wrench,
  Sparkles,
  GlassWater,
  Home,
  Building2,
  Trees,
  Sprout,
  Droplet,
  Flower2,
  Lightbulb,
} from "lucide-react";

export interface NavChild {
  label: string;
  href: string;
  description: string;
  icon: LucideIcon;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  url: string;
  phone: string;
  email: string;
  address: string;
  nav: NavItem[];
  socials: { label: string; href: string }[];
}

export const siteConfig: SiteConfig = {
  name: "Poolscape",
  tagline: "Pools & Landscapes, Considered",
  description:
    "Bespoke swimming pool construction and landscaping, designed and built end to end.",
  url: "https://poolscape.ae",
  phone: "+971 4 000 0000",
  email: "info@dreamfloor.ae",
  address: "Al Quoz Industrial Area 3, Dubai, UAE",
  nav: [
    { label: "Home", href: "/" },
    {
      label: "Pools",
      href: "/pools",
      children: [
        {
          label: "Swimming Pool Construction",
          href: "/pools/swimming-pool-construction",
          description: "Custom-built pools engineered from the ground up.",
          icon: Waves,
        },
        {
          label: "Skimmer Swimming Pool",
          href: "/pools/skimmer-swimming-pool",
          description: "Classic skimmer systems, reliable and cost-effective.",
          icon: CircleDot,
        },
        {
          label: "Overflow Swimming Pool",
          href: "/pools/overflow-swimming-pool",
          description: "Seamless overflow edges for a sleek, modern finish.",
          icon: Droplets,
        },
        {
          label: "Infinity Swimming Pool",
          href: "/pools/infinity-swimming-pool",
          description: "Vanishing-edge pools with uninterrupted views.",
          icon: InfinityIcon,
        },
        {
          label: "Swimming Pool Maintenance",
          href: "/pools/swimming-pool-maintenance",
          description: "Ongoing care to keep your pool pristine year-round.",
          icon: Wrench,
        },
        {
          label: "Water Features",
          href: "/pools/water-features",
          description: "Sculptural water elements that elevate any pool.",
          icon: Sparkles,
        },
        {
          label: "Water Fountains",
          href: "/pools/water-fountains",
          description: "Statement fountains for gardens, courtyards and pools.",
          icon: GlassWater,
        },
      ],
    },
    {
      label: "Landscaping",
      href: "/",
      children: [
        {
          label: "Villa Landscaping",
          href: "/",
          description: "Full-scale outdoor design for private villas.",
          icon: Home,
        },
        {
          label: "Residential Landscaping",
          href: "/",
          description: "Thoughtful garden design for everyday living.",
          icon: Trees,
        },
        {
          label: "Commercial Landscaping",
          href: "/",
          description: "Grounds that make the right first impression.",
          icon: Building2,
        },
        {
          label: "Garden Maintenance",
          href: "/",
          description: "Scheduled upkeep to keep gardens flourishing.",
          icon: Sprout,
        },
        {
          label: "Irrigation System",
          href: "/",
          description: "Efficient, automated watering built to last.",
          icon: Droplet,
        },
        {
          label: "Pergola & Gazebo",
          href: "/",
          description: "Shaded structures that extend your living space.",
          icon: Home,
        },
        {
          label: "Lawn Care",
          href: "/",
          description: "Healthy, well-kept lawns in every season.",
          icon: Flower2,
        },
        {
          label: "Landscape Lighting Services",
          href: "/",
          description:
            "Lighting design that transforms outdoor spaces at night.",
          icon: Lightbulb,
        },
      ],
    },
    // { label: "Services", href: "/services" },
    { label: "Project", href: "/projects" },
    // { label: "Blog", href: "/blog" },
    { label: "Contact Us", href: "/contact" },
  ],
  socials: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "Facebook", href: "https://facebook.com" },
  ],
};
