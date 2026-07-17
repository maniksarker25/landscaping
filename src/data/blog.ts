import type { BlogPost } from "@/types";

export const blogPosts: BlogPost[] = [
  {
    slug: "choosing-a-pool-finish",
    title: "Choosing the Right Pool Finish for a Desert Climate",
    excerpt:
      "Plaster, pebble, or tile — the finish you choose affects everything from maintenance cost to how the water actually looks.",
    content:
      "The finish on a pool shell does more than set the color of the water — it determines how often you'll resurface, how the surface feels underfoot, and how well it holds up against sun exposure and pool chemistry. In this climate, we generally steer clients toward pebble or quartz finishes over standard plaster, since they resist UV fading and hold up longer against heavy year-round sun. Tile remains the premium choice for waterline detailing and adds a level of finish that plaster alone can't match, though it comes at a higher upfront cost. The right choice usually comes down to budget, how the pool will be used, and how much long-term maintenance you're prepared to take on.",
    coverImage:
      "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1200&auto=format&fit=crop",
    author: "Aurelia Design Studio",
    publishedAt: "2026-05-12",
    readingTime: "4 min read",
    category: "Pools",
  },
  {
    slug: "drought-tolerant-planting-guide",
    title: "A Practical Guide to Drought-Tolerant Planting",
    excerpt:
      "Lush doesn't have to mean thirsty. Here's how we build planting schemes that thrive on minimal irrigation.",
    content:
      "A common misconception is that a lush garden requires heavy irrigation. In practice, the plants that struggle most in this climate are the ones never suited to it in the first place. We build planting schemes around species that are naturally adapted to heat and low rainfall, then group them by water need so irrigation zones aren't wasting water on plants that don't need it. Mulching plays a bigger role than most people expect too — it can cut irrigation demand significantly just by reducing evaporation from the soil surface. The result is a garden that reads as full and green without requiring daily watering to stay that way.",
    coverImage:
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=1200&auto=format&fit=crop",
    author: "Aurelia Design Studio",
    publishedAt: "2026-03-02",
    readingTime: "5 min read",
    category: "Landscaping",
  },
  {
    slug: "outdoor-lighting-layering",
    title: "Why Outdoor Lighting Should Be Layered, Not Uniform",
    excerpt:
      "The most common lighting mistake we see is a single bright source instead of several considered layers.",
    content:
      "Good outdoor lighting is rarely about brightness — it's about layering. A single floodlight washes out texture and depth, while layered lighting — underwater fixtures, low path lights, and uplighting on feature trees — lets the eye read a space the way it would during the day, just with a different mood. We typically plan three layers for any project: functional lighting for safety along paths and steps, feature lighting to highlight planting or architecture, and ambient lighting from the pool itself. Getting the balance right is as much about what stays dark as what's lit.",
    coverImage:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop",
    author: "Aurelia Design Studio",
    publishedAt: "2026-01-18",
    readingTime: "3 min read",
    category: "Lighting",
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
