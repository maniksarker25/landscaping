import type { GetServerSideProps } from "next";
import { Gallery } from "@/components/sections/gallery-section";
import { fetchGalleryData } from "@/lib/api/gallery";
import { getTestimonialsAsync } from "@/data/testimonials";
import type { Testimonial } from "@/types";
import type {
  GalleryItem,
  GalleryMeta,
  GetGalleryQueryParams,
} from "@/types/gallery";

interface ProjectsPageProps {
  initialData: GalleryItem[];
  initialMeta: GalleryMeta;
  initialTestimonials: Testimonial[];
}

export default function ProjectsSSRPage({
  initialData,
  initialMeta,
  initialTestimonials,
}: ProjectsPageProps) {
  return (
    <Gallery
      initialData={initialData}
      initialMeta={initialMeta}
      initialTestimonials={initialTestimonials}
    />
  );
}

export const getServerSideProps: GetServerSideProps<ProjectsPageProps> = async (
  context,
) => {
  const { page, limit, sortBy, sortOrder, searchTerm, category } = context.query;

  const queryParams: GetGalleryQueryParams = {
    page: page ? Number(page) : 1,
    limit: limit ? Number(limit) : 50,
    sortBy: (sortBy as string) || "createdAt",
    sortOrder: (sortOrder as "asc" | "desc") || "desc",
    searchTerm: (searchTerm as string) || undefined,
    category: (category as string) || undefined,
  };

  const response = await fetchGalleryData(queryParams);
  const testimonials = await getTestimonialsAsync();

  return {
    props: {
      initialData: response.data || [],
      initialMeta: response.meta || {
        page: 1,
        limit: 50,
        total: response.data?.length || 0,
        totalPage: 1,
      },
      initialTestimonials: testimonials,
    },
  };
};
