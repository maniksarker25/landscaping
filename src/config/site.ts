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
  Lightbulb,
} from "lucide-react";
import type { ServiceData } from "@/types/service";

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

/**
 * Dynamic API category items based on title & slug from response schema.
 */
export function getDynamicNavChildrenByCategory(
  category: "Pools" | "Landscaping",
): NavChild[] {
  if (category === "Pools") {
    return [
      {
        label: "The Premier Overflow Swimming Pool Contractor",
        href: "/services/the-premier-overflow-swimming-pool-contractor",
        description:
          "Designing, Building, and Maintaining Luxurious Overflow Swimming Pools in Dubai.",
        icon: getServiceIconBySlug("the-premier-overflow-swimming-pool-contractor"),
      },
    ];
  }
  return [
    {
      label: "Tempora labore nemo",
      href: "/services/tempora-labore-nemo",
      description:
        "Designing, Building, and Maintaining Luxurious Outdoor Landscaping in Dubai.",
      icon: getServiceIconBySlug("tempora-labore-nemo"),
    },
  ];
}

/**
 * Maps raw API ServiceData objects into Navbar dropdown children.
 */
export function buildNavChildrenFromServices(
  services: ServiceData[],
  category: "Pools" | "Landscaping",
): NavChild[] {
  if (!services || services.length === 0) {
    return getDynamicNavChildrenByCategory(category);
  }

  const filtered = services.filter(
    (item) =>
      item.category?.toLowerCase().trim() === category.toLowerCase().trim() &&
      item.isPublished !== false,
  );

  if (filtered.length === 0) {
    return getDynamicNavChildrenByCategory(category);
  }

  return filtered.map((item) => {
    let rawDescription =
      item.subtitle ||
      item.description ||
      item.seo?.metaDescription ||
      "";

    if (!rawDescription && item.sections?.[0]?.content?.richTextHtml) {
      rawDescription = item.sections[0].content.richTextHtml
        .replace(/<[^>]*>/g, "")
        .substring(0, 110);
    }

    return {
      label: item.title,
      href: `/services/${item.slug}`,
      description: rawDescription,
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
        href: "/landscaping",
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
