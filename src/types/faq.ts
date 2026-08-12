export interface FaqApiItem {
  _id: string;
  id?: string;
  question: string;
  answer: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface FaqApiResponse {
  success: boolean;
  message: string;
  data: FaqApiItem[];
}
