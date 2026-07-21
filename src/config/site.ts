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
import { poolsDetailData } from "@/data/pools-detail-data";

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

export function getPoolIconBySlug(slug: string): LucideIcon {
  const s = slug.toLowerCase();
  if (s.includes("skimmer")) return CircleDot;
  if (s.includes("overflow")) return Droplets;
  if (s.includes("infinity")) return InfinityIcon;
  if (s.includes("maintenance")) return Wrench;
  if (s.includes("feature")) return Sparkles;
  if (s.includes("fountain")) return GlassWater;
  return Waves;
}

export function getDynamicPoolsNavChildren(): NavChild[] {
  return poolsDetailData.map((pool) => ({
    label: pool.title,
    href: `/pools/${pool.slug}`,
    description: pool.subtitle || pool.description || pool.seo?.metaDescription || "",
    icon: getPoolIconBySlug(pool.slug),
  }));
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
  get nav() {
    return [
      { label: "Home", href: "/" },
      {
        label: "Pools",
        href: "/pools",
        children: getDynamicPoolsNavChildren(),
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
      { label: "Project", href: "/projects" },
      { label: "Contact Us", href: "/contact" },
    ];
  },
  socials: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "Facebook", href: "https://facebook.com" },
  ],
};
