import type { Testimonial } from "@/types";
import type { TestimonialItem } from "@/types/testimonial";
import { fetchTestimonialsData } from "@/lib/api/testimonials";

export function convertTestimonialItemToTestimonial(
  item: TestimonialItem,
): Testimonial {
  return {
    id: item._id,
    name: item.name,
    role: item.roleOrLocation || "Client, Dubai",
    quote: item.quote,
    rating: item.rating || 5,
    avatar:
      item.image ||
      "https://images.unsplash.com/photo-1654110455429-cf322b40a906?q=80&w=2080&auto=format&fit=crop",
  };
}

export async function getTestimonialsAsync(): Promise<Testimonial[]> {
  const res = await fetchTestimonialsData();
  if (res.data && Array.isArray(res.data)) {
    return res.data.map(convertTestimonialItemToTestimonial);
  }
  return [];
}

// Deprecated static dummy array removed in favor of backend API
export const testimonials: Testimonial[] = [];
