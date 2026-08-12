export interface TestimonialItem {
  _id: string;
  name: string;
  image?: string;
  roleOrLocation?: string;
  quote: string;
  rating: number;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface TestimonialMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface TestimonialApiResponse {
  success: boolean;
  message: string;
  meta?: TestimonialMeta;
  data: TestimonialItem[];
}
