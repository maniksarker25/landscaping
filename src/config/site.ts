export interface NavItem {
  label: string;
  href: string;
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
  name: "Aurelia Outdoor",
  tagline: "Pools & Landscapes, Considered",
  description:
    "Bespoke pool construction and landscape design for residential and commercial properties across the Emirates. From concept to completion, we build outdoor spaces meant to last generations.",
  url: "https://www.aureliaoutdoor.example",
  phone: "+971 4 000 0000",
  email: "studio@aureliaoutdoor.example",
  address: "Al Quoz Industrial Area 3, Dubai, UAE",
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/projects" },
    { label: "Gallery", href: "/gallery" },
    { label: "Blog", href: "/blog" },
    { label: "FAQs", href: "/faqs" },
  ],
  socials: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "Facebook", href: "https://facebook.com" },
  ],
};
