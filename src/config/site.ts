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

export const poolsNavItems: NavChild[] = [
  {
    label: "Swimming Pool Construction",
    href: "/services/swimming-pool-construction",
    description:
      "Turnkey luxury swimming pool design and construction in Dubai.",
    icon: Waves,
  },
  {
    label: "Skimmer Swimming Pool",
    href: "/services/skimmer-swimming-pool",
    description:
      "Classic and durable skimmer swimming pools tailored to your space.",
    icon: CircleDot,
  },
  {
    label: "Overflow Swimming Pool",
    href: "/services/overflow-swimming-pool",
    description:
      "Sleek perimeter overflow pools with mirror-like water surface.",
    icon: Droplets,
  },
  {
    label: "Infinity Swimming Pool",
    href: "/services/infinity-swimming-pool",
    description:
      "Vanishing-edge infinity pools with breathtaking panoramic views.",
    icon: InfinityIcon,
  },
  {
    label: "Swimming Pool Maintenance",
    href: "/services/swimming-pool-maintenance",
    description:
      "Professional cleaning, chemical balancing, and equipment care.",
    icon: Wrench,
  },
  {
    label: "Water Features",
    href: "/services/water-features",
    description: "Custom water walls, cascades, sheer descents, and deck jets.",
    icon: Sparkles,
  },
  {
    label: "Water Fountains",
    href: "/services/water-fountains",
    description:
      "Architectural decorative fountains for luxury outdoor spaces.",
    icon: GlassWater,
  },
];

export const landscapingNavItems: NavChild[] = [
  {
    label: "Villa Landscaping",
    href: "/services/villa-landscaping",
    description:
      "Comprehensive luxury villa garden design, hardscaping & planting.",
    icon: Trees,
  },
  {
    label: "Residential Landscaping",
    href: "/services/residential-landscaping",
    description:
      "Bespoke outdoor environments for private residences and townhouses.",
    icon: Building2,
  },
  {
    label: "Commercial Landscaping",
    href: "/services/commercial-landscaping",
    description:
      "Large-scale landscape architecture for commercial properties and resorts.",
    icon: Building2,
  },
  {
    label: "Gardening Services",
    href: "/services/gardening-services",
    description:
      "Professional garden maintenance, irrigation, and horticultural care.",
    icon: Sprout,
  },
];

/**
 * Static category items based on title & slug.
 */
export function getDynamicNavChildrenByCategory(
  category: "Pools" | "Landscaping",
): NavChild[] {
  if (category === "Pools") {
    return poolsNavItems;
  }
  if (category === "Landscaping") {
    return landscapingNavItems;
  }
  return [];
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
      item.subtitle || item.description || item.seo?.metaDescription || "";

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
  phone: "+971 506648085",
  email: "info@dreamfloor.ae",
  address: "Al Quoz Industrial Area 3, Dubai, UAE",
  get nav() {
    return [
      { label: "Home", href: "/" },
      {
        label: "Pools",
        href: "/services/swimming-pool-construction",
        children: poolsNavItems,
      },
      {
        label: "Landscaping",
        href: "/services/villa-landscaping",
        children: landscapingNavItems,
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
