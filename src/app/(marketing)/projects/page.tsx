import type { Metadata } from "next";
import { fetchGalleryData } from "@/lib/api/gallery";
import { Gallery } from "@/components/sections/gallery-section";
import { buildMetadata } from "@/lib/seo";
import { getTestimonialsAsync } from "@/data/testimonials";

export const metadata: Metadata = buildMetadata({
  title: "Our Projects & Portfolio",
  description:
    "Explore our completed luxury swimming pools, landscaping, and outdoor living space transformations in Dubai.",
  path: "/projects",
});

export default async function ProjectsPage() {
  const response = await fetchGalleryData({ limit: 50 });
  const testimonials = await getTestimonialsAsync();

  return (
    <Gallery
      initialData={response.data || []}
      initialMeta={response.meta}
      initialTestimonials={testimonials}
    />
  );
}

export { Gallery };
