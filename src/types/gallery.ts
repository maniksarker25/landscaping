export interface GetGalleryQueryParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  searchTerm?: string;
  category?: string;
}

export interface GalleryItem {
  _id: string;
  location: string;
  image: string;
  imageAlt: string;
  category: string;
  slug?: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface GalleryMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface GalleryApiResponse {
  success: boolean;
  message: string;
  meta: GalleryMeta;
  data: GalleryItem[];
}
