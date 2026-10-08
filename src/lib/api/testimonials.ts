import type { TestimonialApiResponse, TestimonialItem } from "@/types/testimonial";
import { defaultTestimonials } from "@/data/default-testimonials";

const fallbackTestimonialItems: TestimonialItem[] = defaultTestimonials.map(
  (t) => ({
    _id: t.id,
    name: t.name,
    roleOrLocation: t.role,
    quote: t.quote,
    rating: t.rating,
    image: t.avatar,
    status: "published",
    createdAt: new Date().toISOString(),
  }),
);

/**
 * Fetch all published testimonials.
 * Priority:
 * 1. Direct MongoDB Query (Server-side)
 * 2. Internal /api/testimonials Next.js endpoint (Client-side)
 * 3. Static fallback items
 */
export async function fetchTestimonialsData(): Promise<TestimonialApiResponse> {
  // 1. Direct MongoDB Query (Server-side)
  if (typeof window === "undefined" && process.env.MONGODB_URI) {
    try {
      const { connectToDatabase } = await import("@/lib/db");
      const { TestimonialModel } = await import("@/models/Testimonial");
      await connectToDatabase();

      const dbItems = await TestimonialModel.find({ status: { $ne: "draft" } })
        .sort({ createdAt: -1 })
        .lean();

      if (dbItems && dbItems.length > 0) {
        const mapped: TestimonialItem[] = dbItems.map((doc) => ({
          _id: String(doc._id),
          name: doc.name,
          roleOrLocation: doc.roleOrLocation || "Client, Dubai",
          quote: doc.quote,
          rating: doc.rating || 5,
          image: doc.image || "",
          status: doc.status || "published",
          createdAt: doc.createdAt
            ? new Date(doc.createdAt).toISOString()
            : new Date().toISOString(),
          updatedAt: doc.updatedAt
            ? new Date(doc.updatedAt).toISOString()
            : new Date().toISOString(),
        }));

        return {
          success: true,
          message: "Loaded testimonials from MongoDB",
          meta: {
            page: 1,
            limit: mapped.length,
            total: mapped.length,
            totalPage: 1,
          },
          data: mapped,
        };
      }
    } catch (dbError) {
      console.warn("MongoDB fetch in fetchTestimonialsData failed, falling back:", dbError);
    }
  }

  // 2. Client-side fetch from internal Next.js API route
  if (typeof window !== "undefined") {
    try {
      const res = await fetch("/api/testimonials", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const data: TestimonialApiResponse = await res.json();
        if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
          return data;
        }
      }
    } catch (err) {
      console.warn("Client fetch to /api/testimonials failed, using fallback:", err);
    }
  }

  // 3. Static fallback
  return {
    success: true,
    message: "Loaded default testimonials",
    meta: {
      page: 1,
      limit: fallbackTestimonialItems.length,
      total: fallbackTestimonialItems.length,
      totalPage: 1,
    },
    data: fallbackTestimonialItems,
  };
}
