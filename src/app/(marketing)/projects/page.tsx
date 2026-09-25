import type { Metadata } from "next";
import { fetchGalleryData } from "@/lib/api/gallery";
import { Gallery } from "@/components/sections/gallery-section";
import { buildMetadata } from "@/lib/seo";
import { getTestimonialsAsync } from "@/data/testimonials";

export const metadata: Metadata = buildMetadata({
  title: "Our Recent Completed Projects - Landscaping & Swimming Pool",
  description:
    "Explore our completed luxury swimming pools, villa landscaping, and outdoor living transformations in Dubai by Four Seasons Pool & Gardens Landscaping.",
  path: "/projects",
});

export default async function ProjectsPage() {
  const response = await fetchGalleryData({ limit: 100 });
  const testimonials = await getTestimonialsAsync();

  return (
    <Gallery
      initialData={response.data || []}
      initialMeta={response.meta}
      initialTestimonials={testimonials}
    />
  );
}

