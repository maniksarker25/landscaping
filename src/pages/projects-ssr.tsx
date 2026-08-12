import type { GetServerSideProps } from "next";
import { Gallery } from "@/components/sections/gallery-section";
import { fetchGalleryData } from "@/lib/api/gallery";
import type {
  GalleryItem,
  GalleryMeta,
  GetGalleryQueryParams,
} from "@/types/gallery";

interface ProjectsPageProps {
  initialData: GalleryItem[];
  initialMeta: GalleryMeta;
}

export default function ProjectsSSRPage({
  initialData,
  initialMeta,
}: ProjectsPageProps) {
  return <Gallery initialData={initialData} initialMeta={initialMeta} />;
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

  return {
    props: {
      initialData: response.data || [],
      initialMeta: response.meta || {
        page: 1,
        limit: 50,
        total: response.data?.length || 0,
        totalPage: 1,
      },
    },
  };
};
