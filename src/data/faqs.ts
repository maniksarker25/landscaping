import type { FaqItem } from "@/types";
import type { FaqApiItem } from "@/types/faq";
import { fetchFaqData } from "@/lib/api/faqs";

export function convertFaqApiItemToFaqItem(item: FaqApiItem): FaqItem {
  return {
    id: item._id || item.id || Math.random().toString(),
    category: "general",
    question: item.question,
    answer: item.answer.trim(),
  };
}

export async function getFaqsAsync(): Promise<FaqItem[]> {
  const res = await fetchFaqData();
  if (res.data && Array.isArray(res.data)) {
    return res.data.map(convertFaqApiItemToFaqItem);
  }
  return [];
}

// Deprecated static dummy array removed in favor of backend API
export const faqs: FaqItem[] = [];
