import { Waves, Trees, Lightbulb, Flame, Wrench, Sparkles } from "lucide-react";
import type { Service } from "@/types";

export const services: Service[] = [
  {
    slug: "custom-pool-construction",
    title: "Custom Pool Construction",
    shortDescription:
      "Engineered swimming pools shaped around your architecture, from infinity edges to plunge pools.",
    description:
      "We design and build swimming pools as an extension of your home's architecture rather than an afterthought in the yard. Every pool is structurally engineered for the region's soil and climate, then finished with materials chosen to age gracefully.",
    icon: Waves,
    heroImage:
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1600&auto=format&fit=crop",
    features: [
      "Infinity & vanishing-edge pools",
      "Plunge & lap pools",
      "Structural engineering & waterproofing",
      "Automated filtration & water treatment",
    ],
    process: [
      { title: "Site & Soil Assessment", description: "Survey, soil testing, and drainage analysis before any design work begins." },
      { title: "Design & Engineering", description: "3D renders, structural drawings, and mechanical planning signed off with you." },
      { title: "Construction", description: "Excavation, structural shell, tiling and coping, plant room installation." },
      { title: "Commissioning", description: "Water balancing, automation setup, and a full handover walkthrough." },
    ],
  },
  {
    slug: "landscape-design",
    title: "Landscape Design",
    shortDescription:
      "Planting plans and hardscaping that hold up to the climate while feeling lush year-round.",
    description:
      "Our landscape team designs planting schemes and hardscape layouts suited to arid climates — species selected for resilience, irrigation zoned for efficiency, and materials chosen to stay cool underfoot.",
    icon: Trees,
    heroImage:
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=1600&auto=format&fit=crop",
    features: [
      "Native & climate-adapted planting",
      "Drip irrigation design",
      "Hardscaping & pathways",
      "Turf & artificial grass systems",
    ],
    process: [
      { title: "Concept Design", description: "Mood boards, planting palettes, and a layout plan for your site." },
      { title: "Irrigation Planning", description: "Zoned drip and sprinkler design matched to plant water needs." },
      { title: "Installation", description: "Soil preparation, planting, hardscape laying, and turf installation." },
      { title: "Establishment Care", description: "First-season monitoring to make sure everything roots well." },
    ],
  },
  {
    slug: "outdoor-lighting",
    title: "Outdoor Lighting",
    shortDescription:
      "Layered lighting design for pools, gardens, and facades that transforms spaces after dark.",
    description:
      "Lighting is where a landscape either comes alive at night or disappears. We layer underwater, path, and feature lighting on a single automated system so your outdoor space reads as intentional after sunset.",
    icon: Lightbulb,
    heroImage:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1600&auto=format&fit=crop",
    features: [
      "Underwater pool lighting",
      "Garden & pathway lighting",
      "Facade & feature lighting",
      "App-controlled smart scenes",
    ],
    process: [
      { title: "Lighting Plan", description: "A fixture and scene plan mapped against your landscape design." },
      { title: "Wiring & Fixtures", description: "Low-voltage wiring, waterproof fixture installation." },
      { title: "Automation Setup", description: "Scenes, schedules, and app pairing configured on site." },
      { title: "Night Walkthrough", description: "A final review after dark to fine-tune every fixture." },
    ],
  },
  {
    slug: "outdoor-living-spaces",
    title: "Outdoor Living Spaces",
    shortDescription:
      "Pergolas, majlis seating, and outdoor kitchens built to extend everyday living outside.",
    description:
      "From shaded pergolas to fully equipped outdoor kitchens, we build the structures that turn a garden into a second living room — sized, oriented, and finished to suit how you actually use the space.",
    icon: Flame,
    heroImage:
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=1600&auto=format&fit=crop",
    features: [
      "Pergolas & shade structures",
      "Outdoor kitchens & BBQ islands",
      "Majlis & lounge seating",
      "Fire features",
    ],
    process: [
      { title: "Space Planning", description: "Layout study around sun path, wind, and how the area will be used." },
      { title: "Structural Design", description: "Engineering drawings for pergolas, kitchens, and built-in seating." },
      { title: "Build", description: "Foundation work, structural build, and finish carpentry or masonry." },
      { title: "Fit-Out", description: "Appliances, furnishings, and final styling touches." },
    ],
  },
  {
    slug: "pool-renovation",
    title: "Pool Renovation",
    shortDescription:
      "Re-engineering and re-finishing tired pools — structure, plant room, and surfaces refreshed.",
    description:
      "An older pool rarely needs replacing — it needs re-engineering. We assess the shell, plant room, and finishes, then rebuild only what's necessary to bring performance and appearance back in line.",
    icon: Sparkles,
    heroImage:
      "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1600&auto=format&fit=crop",
    features: [
      "Structural crack repair",
      "Re-tiling & resurfacing",
      "Equipment & plant room upgrades",
      "Energy-efficient pump retrofits",
    ],
    process: [
      { title: "Condition Survey", description: "Full assessment of the shell, plumbing, and equipment." },
      { title: "Scope & Quote", description: "A clear breakdown of what needs replacing versus repairing." },
      { title: "Renovation Works", description: "Structural repairs, resurfacing, and equipment upgrades." },
      { title: "Recommissioning", description: "Water treatment, testing, and a final performance check." },
    ],
  },
  {
    slug: "maintenance-programs",
    title: "Maintenance Programs", 
    shortDescription:
      "Scheduled pool and garden care that keeps water balanced and planting healthy year-round.",
    description:
      "A pool and garden are only as good as their upkeep. Our maintenance programs cover water chemistry, filtration servicing, and seasonal planting care on a schedule that suits your property.",
    icon: Wrench,
    heroImage:
      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=1600&auto=format&fit=crop",
    features: [
      "Weekly water testing & balancing",
      "Filtration & equipment servicing",
      "Seasonal planting & irrigation care",
      "24/7 emergency call-out",
    ],
    process: [
      { title: "Property Assessment", description: "A baseline check of pool, equipment, and planting condition." },
      { title: "Custom Schedule", description: "A visit frequency and scope matched to your property's needs." },
      { title: "Ongoing Visits", description: "Routine servicing with a digital report after every visit." },
      { title: "Seasonal Review", description: "Quarterly check-ins to adjust the program as seasons change." },
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
