import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "al-barari-villa-oasis",
    title: "Al Barari Villa Oasis",
    category: "Pool & Landscape",
    location: "Dubai, UAE",
    year: "2024",
    coverImage:
      "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1600&auto=format&fit=crop",
    ],
    summary:
      "A vanishing-edge pool and full landscape re-design for a villa backing onto a private lake, built around an existing mature tree line.",
    scope: ["Vanishing-edge pool", "Native planting scheme", "Pergola & majlis deck", "Underwater lighting"],
  },
  {
    slug: "emirates-hills-family-retreat",
    title: "Emirates Hills Family Retreat",
    category: "Outdoor Living",
    location: "Dubai, UAE",
    year: "2023",
    coverImage:
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1600&auto=format&fit=crop",
    ],
    summary:
      "A family-first backyard rebuild pairing a shallow-entry pool with a full outdoor kitchen and shaded lounge for year-round entertaining.",
    scope: ["Shallow-entry family pool", "Outdoor kitchen island", "Shade pergola", "Turf play lawn"],
  },
  {
    slug: "jumeirah-golf-estates-retreat",
    title: "Jumeirah Golf Estates Retreat",
    category: "Pool Renovation",
    location: "Dubai, UAE",
    year: "2023",
    coverImage:
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
    ],
    summary:
      "A full renovation of a decade-old pool: new structural waterproofing, re-tiling, and an energy-efficient equipment upgrade.",
    scope: ["Structural resurfacing", "Equipment room upgrade", "New coping & tiling", "Garden refresh"],
  },
  {
    slug: "palm-jumeirah-penthouse-terrace",
    title: "Palm Jumeirah Penthouse Terrace",
    category: "Rooftop & Terrace",
    location: "Dubai, UAE",
    year: "2024",
    coverImage:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1600&auto=format&fit=crop",
    ],
    summary:
      "A plunge pool and container-planted terrace garden engineered for a rooftop structural load limit, with fully integrated drainage.",
    scope: ["Rooftop plunge pool", "Lightweight planting system", "Integrated drainage", "Feature lighting"],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
