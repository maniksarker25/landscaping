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

export const defaultTestimonials: Testimonial[] = [
  {
    id: "testi-1",
    name: "Viktoriia Loktev",
    role: "Villa Owner, Dubai",
    quote:
      "Great experience working with this company. The team built our swimming pool, fire pit, and took care of the full landscaping. Everything was done in a short time and with excellent quality. Communication was easy and straightforward, the process went smoothly, and the final result met our expectations. Very professional and reliable team — would definitely recommend them.",
    rating: 5,
    avatar:
      "https://poolsgardensuae.com/wp-content/uploads/2026/07/unnamed.png",
  },
  {
    id: "testi-2",
    name: "Vinodanad Jha",
    role: "Mudon, Rahat Villa, Dubai",
    quote:
      "Excellent and professional team of Four Seasons Pools and garden landscaping. Very happy with their work done at our house, Mudon, Rahat Villa. Quality work done and on time, on budget.",
    rating: 5,
    avatar:
      "https://poolsgardensuae.com/wp-content/uploads/2022/05/unnamed-1.png",
  },
  {
    id: "testi-3",
    name: "Chris Daye",
    role: "Villa Owner, Dubai",
    quote:
      "What can I say. Amazing, amazing, amazing. These guys are simply amazing. Fast, beautiful and high quality work. Contracted them to build pool and do landscaping, and they not only delivered they did so ahead of schedule. Asad and his team really are some of the best for pool and landscaping. Not just that but they pulled all the permits in only 3 weeks. Honestly I am very happy, you can see from the pictures they Built the pool, and pergola and grill, all the tile work as well as all the garden and landscaping. 10 out of 10!",
    rating: 5,
    avatar:
      "https://poolsgardensuae.com/wp-content/uploads/2026/07/unnamed-1.png",
  },
  {
    id: "testi-4",
    name: "Lilian K",
    role: "Arabian Ranches, Dubai",
    quote:
      "I recently had Four Seasons Pool Landscaping build a swimming pool and landscaping for my property in Arabian Ranches. After researching many companies I chose Four Seasons and I’m so glad I did, the team was professional, detail oriented and completed the project ahead of schedule and at a good price. Quality of work was really up to my expectations. Highly recommend.",
    rating: 5,
    avatar:
      "https://poolsgardensuae.com/wp-content/uploads/2026/07/unnamed-2.png",
  },
  {
    id: "testi-5",
    name: "Yahya Nassar",
    role: "Tilal Al Ghaf, Dubai",
    quote:
      "Very impressed with the pool and landscaping done in my garden in Tilal Al Ghaf. The team did everything in 14 working days which was ahead of schedule and even with the big floods of dubai nothing stopped them from completing the job. I 100% recommend them and will be using them again on my next project.",
    rating: 5,
    avatar:
      "https://poolsgardensuae.com/wp-content/uploads/2026/07/unnamed-3.png",
  },
  {
    id: "testi-6",
    name: "Wajdi Elhakim",
    role: "Villa Owner, Dubai",
    quote:
      "We had the best experience ever with Four Seasons pool and landscaping llc - the full team from Abid, Asad and the workers. Very professional work, nice finish - and most important the timeline was kept exactly as they promised. Fair pricing - quality and price goes hand in hand. All approvals, documentation, Tarkhees, Nakheel - all was done to perfection. We got the dream garden and house we wanted.",
    rating: 5,
    avatar:
      "https://poolsgardensuae.com/wp-content/uploads/2026/07/unnamed-5.png",
  },
  {
    id: "testi-7",
    name: "Melanie Riddle",
    role: "Dubai, UAE",
    quote:
      "Four Seasons made my dream back garden! Four Seasons experience was completely seamless, smooth, delivered BEFORE target date, the team is kind, helpful - just amazing actually! The best experience I have had with contractors - they restored my faith in Dubai Contractors. Muhammed is amazing and I just can't recommend them enough!",
    rating: 5,
    avatar:
      "https://poolsgardensuae.com/wp-content/uploads/2026/07/unnamed-6.png",
  },
];

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

