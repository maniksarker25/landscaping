import type { LucideIcon } from "lucide-react";

export interface Service {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  icon: LucideIcon;
  heroImage: string;
  features: string[];
  process: { title: string; description: string }[];
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  location: string;
  year: string;
  coverImage: string;
  gallery: string[];
  summary: string;
  scope: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  avatar?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: "general" | "pools" | "landscaping" | "maintenance" | "pricing";
}

export interface StatItem {
  id: string;
  label: string;
  value: number;
  suffix?: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  publishedAt: string;
  readingTime: string;
  category: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: "pools" | "landscaping" | "outdoor-living" | "lighting";
}

export * from "./gallery";
export * from "./testimonial";


