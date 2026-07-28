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
import { serviceData } from "@/data/services-data";

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

export function getServiceIconBySlug(slug: string): LucideIcon {
  const s = slug.toLowerCase();
  if (s.includes("skimmer")) return CircleDot;
  if (s.includes("overflow")) return Droplets;
  if (s.includes("infinity")) return InfinityIcon;
  if (s.includes("maintenance")) return Wrench;
  if (s.includes("gardening")) return Sprout;
  if (s.includes("feature")) return Sparkles;
  if (s.includes("fountain")) return GlassWater;
  if (s.includes("lighting")) return Lightbulb;
  if (s.includes("pergola")) return Home;
  if (s.includes("irrigation")) return Droplet;
  if (s.includes("villa")) return Trees;
  if (s.includes("residential")) return Building2;
  return Waves;
}

export function getDynamicNavChildrenByCategory(
  category: "Pools" | "Landscaping",
): NavChild[] {
  return serviceData
    .filter((item) => item.category === category && item.isPublished !== false)
    .map((item) => {
      // Clean up labels for navbar presentation (e.g. remove " Dubai", " Construction", etc.)
      const cleanedLabel = item.title
        .replace(" Construction Dubai", "")
        .replace(" Services In Dubai", "")
        .replace(" Dubai UAE", "")
        .replace(" Dubai", "")
        .replace(" In Dubai", "")
        .replace(" Company", "")
        .trim();

      return {
        label: cleanedLabel,
        href: `/services/${item.slug}`,
        description:
          item.subtitle || item.description || item.seo?.metaDescription || "",
        icon: getServiceIconBySlug(item.slug),
      };
    });
}

export const siteConfig: SiteConfig = {
  name: "Dream Floor Landscaping",
  tagline: "Pools & Landscapes, Considered",
  description:
    "Bespoke swimming pool construction and landscaping, designed and built end to end.",
  url: "https://dreamfloor.ae",
  phone: "+971 4 000 0000",
  email: "info@dreamfloor.ae",
  address: "Al Quoz Industrial Area 3, Dubai, UAE",
  get nav() {
    return [
      { label: "Home", href: "/" },
      {
        label: "Pools",
        href: "/pools",
        children: getDynamicNavChildrenByCategory("Pools"),
      },
      {
        label: "Landscaping",
        href: "/services",
        children: getDynamicNavChildrenByCategory("Landscaping"),
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
