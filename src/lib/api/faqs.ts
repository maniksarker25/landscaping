import { baseUrl } from "@/lib/helper";
import type { FaqApiResponse } from "@/types/faq";

/**
 * Fetch all FAQs from backend API.
 * Target URL: http://192.168.0.114:5000/api/v1/manage/get-faq
 */
export async function fetchFaqData(): Promise<FaqApiResponse> {
  try {
    const url = `${baseUrl}/manage/get-faq`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch FAQs: ${res.status} ${res.statusText}`);
    }

    const data: FaqApiResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching FAQ data:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to load FAQs",
      data: [],
    };
  }
}
