import {
  Waves,
  Trees,
  Lightbulb,
  Wrench,
  Sparkles,
  Home,
  Sprout,
  Droplet,
  Infinity as InfinityIcon,
  GlassWater,
} from "lucide-react";
import type { Service } from "@/types";
import type { ServiceData } from "@/types/service";
import { fetchServicesData } from "@/lib/api/services";

export function getIconForService(slug: string) {
  const s = slug.toLowerCase();
  if (s.includes("infinity")) return InfinityIcon;
  if (s.includes("overflow")) return GlassWater;
  if (s.includes("skimmer")) return Waves;
  if (s.includes("maintenance")) return Wrench;
  if (s.includes("gardening")) return Sprout;
  if (s.includes("lighting")) return Lightbulb;
  if (s.includes("pergola")) return Home;
  if (s.includes("irrigation")) return Droplet;
  if (s.includes("villa") || s.includes("residential")) return Trees;
  if (s.includes("feature")) return Sparkles;
  return Waves;
}

export function convertServiceDataToService(item: ServiceData): Service {
  const desc =
    item.subtitle || item.description || item.seo?.metaDescription || "";

  const featuresSection = item.sections?.find(
    (s) => s.blockType === "features_grid",
  );
  const featuresList =
    featuresSection?.content?.features?.map((f) => f.title) || [];

  const processSection = item.sections?.find(
    (s) =>
      s.blockType === "technical_specs" || s.blockType === "faq_accordion",
  );
  const processSteps =
    processSection?.content?.accordionItems?.map((a) => ({
      title: a.question,
      description: a.answer.replace(/<[^>]*>/g, ""),
    })) || [];

  return {
    slug: item.slug,
    title: item.title,
    shortDescription: item.subtitle || desc,
    description: desc,
    icon: getIconForService(item.slug),
    heroImage:
      item.featuredImage ||
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=1600&auto=format&fit=crop",
    features:
      featuresList.length > 0
        ? featuresList
        : [
            "Professional Design",
            "Turnkey Construction",
            "Expert Engineering",
            "Premium Materials",
          ],
    process:
      processSteps.length > 0
        ? processSteps.slice(0, 4)
        : [
            {
              title: "Consultation",
              description: "Initial site visit & requirement gathering.",
            },
            {
              title: "3D Design",
              description: "Premium architectural layout visualization.",
            },
            {
              title: "Construction",
              description: "Precision engineering and structural building.",
            },
            {
              title: "Handover",
              description: "Rigorous quality checks and final delivery.",
            },
          ],
  };
}

export async function getServicesAsync(): Promise<Service[]> {
  const res = await fetchServicesData();
  if (res.data && Array.isArray(res.data)) {
    return res.data.map(convertServiceDataToService);
  }
  return [];
}

export const services: Service[] = [];
