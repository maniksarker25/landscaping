import { baseUrl } from "@/lib/helper";
import type { TestimonialApiResponse } from "@/types/testimonial";

/**
 * Fetch all published testimonials from backend API.
 * Target URL: http://192.168.0.114:5000/api/v1/testimonial/get-all?page=1&limit=999&sortBy=createdAt&sortOrder=desc
 */
export async function fetchTestimonialsData(): Promise<TestimonialApiResponse> {
  try {
    const url = `${baseUrl}/testimonial/get-all?page=1&limit=999&sortBy=createdAt&sortOrder=desc`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch testimonials: ${res.status} ${res.statusText}`,
      );
    }

    const data: TestimonialApiResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching testimonials data:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to load testimonials",
      data: [],
    };
  }
}
