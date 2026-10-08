import type { Testimonial } from "@/types";
import type { TestimonialItem } from "@/types/testimonial";
import { fetchTestimonialsData } from "@/lib/api/testimonials";
import { defaultTestimonials } from "@/data/default-testimonials";

export { defaultTestimonials } from "@/data/default-testimonials";

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
  try {
    const res = await fetchTestimonialsData();
    if (res.data && Array.isArray(res.data) && res.data.length > 0) {
      return res.data.map(convertTestimonialItemToTestimonial);
    }
  } catch {
    // fallback below
  }
  return defaultTestimonials;
}

export const testimonials: Testimonial[] = defaultTestimonials;
