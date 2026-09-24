import type { ServiceData } from "@/types/service";
import { getServiceBySlugFromApi, fetchServicesData } from "@/lib/api/services";

export const defaultGoogleReviews = {
  averageRating: 5.0,
  totalReviews: 128,
  badgeTitle: "EXCELLENT",
  reviews: [
    {
      id: "rev-1",
      authorName: "Tariq Al-Mansoori",
      timeAgo: "Arabian Ranches 2, Dubai",
      rating: 5,
      text: "Dream Floor Landscaping completely transformed our villa backyard in Arabian Ranches. Their pool construction team built a stunning infinity pool with custom water cascades. The craftsmanship and project management were top notch!",
      verified: true,
    },
    {
      id: "rev-2",
      authorName: "Sarah Jenkins",
      timeAgo: "Emirates Hills, Dubai",
      rating: 5,
      text: "Exceptional service from start to finish! Dream Floor constructed a bespoke louvered pergola, outdoor kitchen BBQ area, and lush automatic drip irrigation. They finished right on schedule and within budget.",
      verified: true,
    },
    {
      id: "rev-3",
      authorName: "Rashid Hassan",
      timeAgo: "Dubai Hills Estate, Dubai",
      rating: 5,
      text: "The best pool and landscape contractor in Dubai. They handled our skimmer pool construction and natural stone outdoor tiling with extreme attention to detail. Highly recommend Dream Floor Landscaping LLC!",
      verified: true,
    },
    {
      id: "rev-4",
      authorName: "Marcus Vance",
      timeAgo: "Palm Jumeirah, Dubai",
      rating: 5,
      text: "Outstanding pool maintenance and garden makeover! The team converted our worn patio into a modern resort-style garden with custom water features and LED lighting. Professional and reliable team.",
      verified: true,
    },
    {
      id: "rev-5",
      authorName: "Fatima Al-Zahra",
      timeAgo: "Jumeirah Golf Estates, Dubai",
      rating: 5,
      text: "Dream Floor created our outdoor living space from scratch including pergolas, artificial turf, and a custom swimming pool. Their 3D design phase made everything so easy to visualize before building.",
      verified: true,
    },
  ],
};

export const fallbackServices: ServiceData[] = [
  // Pools
  {
    title: "Swimming Pool Construction",
    slug: "swimming-pool-construction",
    aliases: [
      "swimming-pool-construction-dubai-uae",
    ],
    category: "Pools",
    isPublished: true,
    featuredImage:
      "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=1600&auto=format&fit=crop",
    heroImage:
      "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=1600&auto=format&fit=crop",
    subtitle:
      "Custom turnkey swimming pool design and precision engineering in Dubai.",
    badge: "Dubai Luxury Specialist",
    googleReviews: defaultGoogleReviews,
    seo: {
      metaTitle: "Swimming Pool Construction Dubai | Dream Floor Landscaping",
      metaDescription:
        "Bespoke swimming pool design and construction across Dubai villas and estates.",
    },
    sections: [
      {
        blockType: "hero_section",
        content: {
          hero: {
            headline: "Swimming Pool Construction",
            subheadline:
              "Bespoke swimming pool design and turnkey construction across Dubai villas and estates.",
            bgImage:
              "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=1600&auto=format&fit=crop",
            ctaText: "Request Consultation",
            ctaLink: "/contact",
          },
        },
      },
      {
        blockType: "features_grid",
        content: {
          features: [
            {
              title: "Architectural 3D Design",
              description:
                "Photorealistic 3D renders matching your villa layout.",
            },
            {
              title: "Turnkey Civil Works",
              description:
                "Precision excavation, reinforced concrete, and waterproofing.",
            },
            {
              title: "Premium Finishes",
              description:
                "Spanish porcelain tiles, natural Sukabumi stone, and LED lighting.",
            },
            {
              title: "Smart Automation",
              description:
                "Automated filtration, UV sanitization, and heating/cooling systems.",
            },
          ],
        },
      },
      {
        blockType: "technical_specs",
        content: {
          accordionItems: [
            {
              question: "How long does pool construction take in Dubai?",
              answer:
                "Typically 6 to 10 weeks depending on custom design, permits, and excavation requirements.",
            },
            {
              question: "Do you handle municipality and developer approvals?",
              answer:
                "Yes, we handle end-to-end NOCs, DM, Trakhees, Nakheel, and Emaar approval processes.",
            },
          ],
        },
      },
    ],
  },
  {
    title: "Skimmer Swimming Pool",
    slug: "skimmer-swimming-pool",
    aliases: ["skimmer-swimming-pool-construction-dubai-uae"],
    category: "Pools",
    isPublished: true,
    featuredImage:
      "https://images.unsplash.com/photo-1572331165267-854da2b10ccc?q=80&w=1600&auto=format&fit=crop",
    heroImage:
      "https://images.unsplash.com/photo-1572331165267-854da2b10ccc?q=80&w=1600&auto=format&fit=crop",
    subtitle:
      "Classic, cost-effective, and highly durable skimmer pool construction.",
    badge: "Classic Elegance",
    googleReviews: defaultGoogleReviews,
    seo: {
      metaTitle: "Skimmer Swimming Pool Dubai | Dream Floor Landscaping",
      metaDescription:
        "Reliable, easy-to-maintain skimmer swimming pool construction in Dubai.",
    },
    sections: [
      {
        blockType: "hero_section",
        content: {
          hero: {
            headline: "Skimmer Swimming Pool",
            subheadline:
              "Classic, cost-effective, and durable pool construction tailored to your private villa garden.",
            bgImage:
              "https://images.unsplash.com/photo-1572331165267-854da2b10ccc?q=80&w=1600&auto=format&fit=crop",
            ctaText: "Request Consultation",
            ctaLink: "/contact",
          },
        },
      },
      {
        blockType: "features_grid",
        content: {
          features: [
            {
              title: "Low Maintenance",
              description:
                "Simple, reliable skimming circulation with minimal equipment overhead.",
            },
            {
              title: "Fast Turnaround",
              description:
                "Streamlined construction timeline without complex overflow balance tanks.",
            },
            {
              title: "Cost Effective",
              description:
                "Maximizes luxury aesthetic while optimizing construction budget.",
            },
            {
              title: "Custom Shapes",
              description:
                "Rectangular, geometric, or freeform shapes built to your exact preferences.",
            },
          ],
        },
      },
    ],
  },
  {
    title: "Overflow Swimming Pool",
    slug: "overflow-swimming-pool",
    aliases: ["overflow-swimming-pool-construction-dubai-uae"],
    category: "Pools",
    isPublished: true,
    featuredImage:
      "https://images.unsplash.com/photo-1562778612-e1e0cda9915c?q=80&w=1600&auto=format&fit=crop",
    heroImage:
      "https://images.unsplash.com/photo-1562778612-e1e0cda9915c?q=80&w=1600&auto=format&fit=crop",
    subtitle:
      "Sleek perimeter overflow pools with mirror-like water level flush with the deck.",
    badge: "Modern Luxury",
    googleReviews: defaultGoogleReviews,
    seo: {
      metaTitle: "Overflow Swimming Pool Dubai | Dream Floor Landscaping",
      metaDescription:
        "Architectural perimeter overflow swimming pool design and construction in Dubai.",
    },
    sections: [
      {
        blockType: "hero_section",
        content: {
          hero: {
            headline: "Overflow Swimming Pool",
            subheadline:
              "Sleek perimeter overflow pools creating a seamless mirror water surface flush with your deck.",
            bgImage:
              "https://images.unsplash.com/photo-1562778612-e1e0cda9915c?q=80&w=1600&auto=format&fit=crop",
            ctaText: "Request Consultation",
            ctaLink: "/contact",
          },
        },
      },
      {
        blockType: "features_grid",
        content: {
          features: [
            {
              title: "Mirror Water Surface",
              description:
                "Water level sits flush with surrounding terrace paving for supreme luxury.",
            },
            {
              title: "Concealed Perimeter Grate",
              description:
                "Natural stone slot drains or concealed perimeter overflow channels.",
            },
            {
              title: "Supreme Water Clarity",
              description:
                "Constant 360-degree surface skimming ensures crystal clear water at all times.",
            },
            {
              title: "Balance Tank Engineering",
              description:
                "Heavy-duty surge tank with automated water leveling control.",
            },
          ],
        },
      },
    ],
  },
  {
    title: "Infinity Swimming Pool",
    slug: "infinity-swimming-pool",
    aliases: ["infinity-swimming-pool-construction-dubai-uae"],
    category: "Pools",
    isPublished: true,
    featuredImage:
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1600&auto=format&fit=crop",
    heroImage:
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1600&auto=format&fit=crop",
    subtitle:
      "Vanishing-edge infinity pools with breathtaking panoramic horizons.",
    badge: "Signature Build",
    googleReviews: defaultGoogleReviews,
    seo: {
      metaTitle: "Infinity Swimming Pool Dubai | Dream Floor Landscaping",
      metaDescription:
        "Vanishing-edge luxury infinity swimming pools built across Dubai's most prestigious communities.",
    },
    sections: [
      {
        blockType: "hero_section",
        content: {
          hero: {
            headline: "Infinity Swimming Pool",
            subheadline:
              "Vanishing-edge infinity pools that blend water with skyline and garden horizons.",
            bgImage:
              "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1600&auto=format&fit=crop",
            ctaText: "Request Consultation",
            ctaLink: "/contact",
          },
        },
      },
      {
        blockType: "features_grid",
        content: {
          features: [
            {
              title: "Vanishing Edge Horizon",
              description:
                "Precision engineered weir wall for an uninterrupted infinity effect.",
            },
            {
              title: "Catch Basin Waterfall",
              description:
                "Lower catch trough doubles as an ambient cascading water feature.",
            },
            {
              title: "Structural Engineering",
              description:
                "Engineered reinforced concrete designed specifically for Dubai soil conditions.",
            },
            {
              title: "Underwater LED Illumination",
              description:
                "Multi-zone RGBW programmable lighting along the infinity edge.",
            },
          ],
        },
      },
    ],
  },
  {
    title: "Swimming Pool Maintenance",
    slug: "swimming-pool-maintenance",
    aliases: ["swimming-pool-maintenance-services-dubai-uae"],
    category: "Pools",
    isPublished: true,
    featuredImage:
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=1600&auto=format&fit=crop",
    heroImage:
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=1600&auto=format&fit=crop",
    subtitle:
      "Scheduled cleaning, chemical balancing, and equipment care across Dubai.",
    badge: "Care & Servicing",
    googleReviews: defaultGoogleReviews,
    seo: {
      metaTitle: "Swimming Pool Maintenance Dubai | Dream Floor Landscaping",
      metaDescription:
        "Professional swimming pool cleaning, water balancing, and pump repair in Dubai.",
    },
    sections: [
      {
        blockType: "hero_section",
        content: {
          hero: {
            headline: "Swimming Pool Maintenance",
            subheadline:
              "Professional weekly pool cleaning, chemical balancing, and preventive pump servicing in Dubai.",
            bgImage:
              "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=1600&auto=format&fit=crop",
            ctaText: "Book Maintenance",
            ctaLink: "/contact",
          },
        },
      },
      {
        blockType: "features_grid",
        content: {
          features: [
            {
              title: "Twice-Weekly Visits",
              description:
                "Skimming, vacuuming, wall brushing, and tile waterline cleaning.",
            },
            {
              title: "Chemical Balancing",
              description:
                "Exact pH, chlorine, alkalinity, and stabilizer management for swimmer safety.",
            },
            {
              title: "Equipment Checks",
              description:
                "Filter backwashing, pump impeller inspection, and heater/chiller testing.",
            },
            {
              title: "Emergency Callout",
              description:
                "Rapid support for green pool recovery, pump leakages, or electrical issues.",
            },
          ],
        },
      },
    ],
  },
  {
    title: "Water Features",
    slug: "water-features",
    aliases: ["water-features-dubai"],
    category: "Pools",
    isPublished: true,
    featuredImage:
      "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=1600&auto=format&fit=crop",
    heroImage:
      "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=1600&auto=format&fit=crop",
    subtitle:
      "Custom sheer descents, waterfalls, deck jets, and ambient water walls.",
    badge: "Outdoor Ambience",
    googleReviews: defaultGoogleReviews,
    seo: {
      metaTitle: "Water Features Dubai | Dream Floor Landscaping",
      metaDescription:
        "Custom luxury water features, rain curtains, and cascades for villas in Dubai.",
    },
    sections: [
      {
        blockType: "hero_section",
        content: {
          hero: {
            headline: "Custom Water Features",
            subheadline:
              "Transform your outdoor pool and terrace with tranquil water curtains, cascades, and laminar jets.",
            bgImage:
              "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=1600&auto=format&fit=crop",
            ctaText: "Request Design",
            ctaLink: "/contact",
          },
        },
      },
      {
        blockType: "features_grid",
        content: {
          features: [
            {
              title: "Sheer Descents",
              description:
                "Smooth glass-like water sheets pouring into your swimming pool.",
            },
            {
              title: "Laminar Deck Jets",
              description:
                "Arched glowing water streams with integrated LED color changing.",
            },
            {
              title: "Stone Water Walls",
              description:
                "Textured travertine or slate accent walls with soothing water trickles.",
            },
            {
              title: "Automated Control",
              description:
                "Operate flows and lighting presets from your smartphone app.",
            },
          ],
        },
      },
    ],
  },
  {
    title: "Water Fountains",
    slug: "water-fountains",
    aliases: ["water-fountains-dubai"],
    category: "Pools",
    isPublished: true,
    featuredImage:
      "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=1600&auto=format&fit=crop",
    heroImage:
      "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=1600&auto=format&fit=crop",
    subtitle:
      "Architectural decorative fountains for villa courtyards, entries, and gardens.",
    badge: "Architectural Accent",
    googleReviews: defaultGoogleReviews,
    seo: {
      metaTitle: "Water Fountains Dubai | Dream Floor Landscaping",
      metaDescription:
        "Bespoke courtyard fountains and architectural outdoor water elements in Dubai.",
    },
    sections: [
      {
        blockType: "hero_section",
        content: {
          hero: {
            headline: "Water Fountains",
            subheadline:
              "Architectural decorative fountains for villa entrances, courtyards, and garden centers.",
            bgImage:
              "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=1600&auto=format&fit=crop",
            ctaText: "Request Consultation",
            ctaLink: "/contact",
          },
        },
      },
      {
        blockType: "features_grid",
        content: {
          features: [
            {
              title: "Courtyard Centerpieces",
              description:
                "Bespoke tier fountains, bubblers, and contemporary monolith sculptures.",
            },
            {
              title: "Natural Stone Craft",
              description:
                "Hand-carved marble, granite, and sandstone construction.",
            },
            {
              title: "Closed-Loop Filtration",
              description:
                "Self-contained water recycling system with UV purification.",
            },
            {
              title: "Underwater Spotlights",
              description:
                "Warm 2700K IP68 brass spotlights for dramatic nocturnal presence.",
            },
          ],
        },
      },
    ],
  },

  // Landscaping
  {
    title: "Villa Landscaping",
    slug: "villa-landscaping",
    aliases: ["villa-landscaping-dubai-uae"],
    category: "Landscaping",
    isPublished: true,
    featuredImage:
      "https://poolsgardensuae.com/wp-content/uploads/2024/07/Landscaping-Services-in-Dubai.jpg",
    heroImage:
      "https://poolsgardensuae.com/wp-content/uploads/2024/07/Landscaping-Services-in-Dubai.jpg",
    subtitle:
      "Complete luxury villa landscaping design and turnkey execution across Dubai.",
    badge: "Turnkey Landscape",
    googleReviews: defaultGoogleReviews,
    seo: {
      metaTitle: "Villa Landscaping Dubai | Luxury Villa Landscape Design Company",
      metaDescription:
        "Top Villa Landscaping company in Dubai. Transform your villa with custom outdoor spaces.",
    },
    sections: [
      {
        blockType: "hero_section",
        content: {
          hero: {
            headline: "Villa Landscaping",
            subheadline:
              "Turnkey luxury landscaping design and construction for private villas across Dubai.",
            bgImage:
              "https://poolsgardensuae.com/wp-content/uploads/2024/07/Landscaping-Services-in-Dubai.jpg",
            ctaText: "Book Site Visit",
            ctaLink: "/contact",
          },
        },
      },
      {
        blockType: "features_grid",
        content: {
          features: [
            {
              title: "Masterplanning & 3D",
              description:
                "Comprehensive landscape architecture tailored to your villa exterior.",
            },
            {
              title: "Hardscape Paving",
              description:
                "Italian porcelain pavers, stamped concrete, and natural granite walkways.",
            },
            {
              title: "Lush Softscaping",
              description:
                "Mature palms, exotic shrubs, and drought-hardy desert-adapted plants.",
            },
            {
              title: "Outdoor Living",
              description:
                "Built-in BBQ kitchens, fire pits, sunken majlis, and relaxing lounge zones.",
            },
          ],
        },
      },
    ],
  },
  {
    title: "Residential Landscaping",
    slug: "residential-landscaping",
    aliases: ["residential-landscaping-company"],
    category: "Landscaping",
    isPublished: true,
    featuredImage:
      "https://poolsgardensuae.com/wp-content/uploads/2024/08/Residential-Landscaping-Contractor-Four-Seasons-Pool-Gardens-Landscaping-5-1.jpg",
    heroImage:
      "https://poolsgardensuae.com/wp-content/uploads/2024/08/Residential-Landscaping-Contractor-Four-Seasons-Pool-Gardens-Landscaping-5-1.jpg",
    subtitle:
      "Bespoke outdoor environments for townhouses and residential properties in Dubai.",
    badge: "Residential Design",
    googleReviews: defaultGoogleReviews,
    seo: {
      metaTitle: "Residential Landscaping Company in Dubai, UAE",
      metaDescription:
        "Leading residential landscaping company in Dubai, UAE, offering premium garden design and maintenance services.",
    },
    sections: [
      {
        blockType: "hero_section",
        content: {
          hero: {
            headline: "Residential Landscaping",
            subheadline:
              "Bespoke garden transformations for private homes, townhouses, and villas in Dubai.",
            bgImage:
              "https://poolsgardensuae.com/wp-content/uploads/2024/08/Residential-Landscaping-Contractor-Four-Seasons-Pool-Gardens-Landscaping-5-1.jpg",
            ctaText: "Request Consultation",
            ctaLink: "/contact",
          },
        },
      },
      {
        blockType: "features_grid",
        content: {
          features: [
            {
              title: "Space Optimization",
              description:
                "Creative layouts maximizing usable outdoor living in compact gardens.",
            },
            {
              title: "Custom Planter Boxes",
              description:
                "Built-in raised masonry and steel planters with automated irrigation.",
            },
            {
              title: "Low Maintenance Greens",
              description:
                "Lush green aesthetic with minimal pruning and watering demands.",
            },
            {
              title: "Privacy Screening",
              description:
                "Tall ficus nitida hedges, bamboo, and modern composite privacy slats.",
            },
          ],
        },
      },
    ],
  },
  {
    title: "Commercial Landscaping",
    slug: "commercial-landscaping",
    aliases: ["commercial-landscaping-company"],
    category: "Landscaping",
    isPublished: true,
    featuredImage:
      "https://poolsgardensuae.com/wp-content/uploads/2024/08/Commerical-Landscaping-Four-Seasons-Pool-Gardens-Landscaping.jpg",
    heroImage:
      "https://poolsgardensuae.com/wp-content/uploads/2024/08/Commerical-Landscaping-Four-Seasons-Pool-Gardens-Landscaping.jpg",
    subtitle:
      "Large-scale landscape architecture and grounds development for commercial developments.",
    badge: "Commercial Scale",
    googleReviews: defaultGoogleReviews,
    seo: {
      metaTitle: "Commercial Landscaping Company in Dubai, UAE",
      metaDescription:
        "Top commercial landscaping company in Dubai, UAE, providing expert garden design, maintenance, and outdoor solutions.",
    },
    sections: [
      {
        blockType: "hero_section",
        content: {
          hero: {
            headline: "Commercial Landscaping",
            subheadline:
              "Large-scale landscape engineering and master development for commercial properties across UAE.",
            bgImage:
              "https://poolsgardensuae.com/wp-content/uploads/2024/08/Commerical-Landscaping-Four-Seasons-Pool-Gardens-Landscaping.jpg",
            ctaText: "Submit RFP",
            ctaLink: "/contact",
          },
        },
      },
      {
        blockType: "features_grid",
        content: {
          features: [
            {
              title: "Public Realm Development",
              description:
                "Walkways, plaza seating, shade canopies, and commercial streetscapes.",
            },
            {
              title: "Commercial Irrigation",
              description:
                "Treated sewage effluent (TSE) connection and smart central control systems.",
            },
            {
              title: "Durable Materials",
              description:
                "Heavy-traffic pavers, stainless steel edging, and vandal-resistant lighting.",
            },
            {
              title: "Corporate HSE Compliance",
              description:
                "Full safety protocol compliance with Dubai Municipality regulations.",
            },
          ],
        },
      },
    ],
  },
  {
    title: "Gardening Services",
    slug: "gardening-services",
    aliases: ["gardening-services-dubai", "garden-maintenance"],
    category: "Landscaping",
    isPublished: true,
    featuredImage:
      "https://poolsgardensuae.com/wp-content/uploads/2024/08/Garden-Maintenance-Four-Seasons-Pool-Gardens-Landscaping-2.jpg",
    heroImage:
      "https://poolsgardensuae.com/wp-content/uploads/2024/08/Garden-Maintenance-Four-Seasons-Pool-Gardens-Landscaping-2.jpg",
    subtitle:
      "Comprehensive garden care, lawn mowing, pruning, and seasonal plant nourishment.",
    badge: "Garden Care",
    googleReviews: defaultGoogleReviews,
    seo: {
      metaTitle: "Garden Maintenance Services Dubai | Best Gardening Services",
      metaDescription:
        "Professional villa garden maintenance packages in Dubai: pruning, lawn mowing, and fertilizer.",
    },
    sections: [
      {
        blockType: "hero_section",
        content: {
          hero: {
            headline: "Garden Maintenance",
            subheadline:
              "Reliable villa garden maintenance contracts keeping your landscape lush and vibrant all year.",
            bgImage:
              "https://images.unsplash.com/photo-1592417817098-8f3d6910985b?q=80&w=1600&auto=format&fit=crop",
            ctaText: "Get Maintenance Quote",
            ctaLink: "/contact",
          },
        },
      },
      {
        blockType: "features_grid",
        content: {
          features: [
            {
              title: "Mowing & Edge Trimming",
              description:
                "Crisp lawn edges and healthy grass height tailored to season.",
            },
            {
              title: "Palm & Tree Pruning",
              description:
                "Dead frond removal, height management, and safety clearance trimming.",
            },
            {
              title: "Soil Conditioning & Feeding",
              description:
                "Organic fertilizers, slow-release micronutrients, and soil aeration.",
            },
            {
              title: "Pest & Disease Control",
              description:
                "Eco-conscious pest eradication and fungal disease prevention.",
            },
          ],
        },
      },
    ],
  },
  {
    title: "Irrigation System",
    slug: "irrigation-system",
    category: "Landscaping",
    isPublished: true,
    featuredImage:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=1600&auto=format&fit=crop",
    heroImage:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=1600&auto=format&fit=crop",
    subtitle:
      "Smart automated drip and popup sprinkler irrigation systems with Wi-Fi control.",
    badge: "Water Efficiency",
    googleReviews: defaultGoogleReviews,
    seo: {
      metaTitle: "Smart Irrigation Systems Dubai | Dream Floor Landscaping",
      metaDescription:
        "Automated drip irrigation and pop-up sprinkler installation for Dubai gardens.",
    },
    sections: [
      {
        blockType: "hero_section",
        content: {
          hero: {
            headline: "Smart Irrigation Systems",
            subheadline:
              "Automated, water-efficient drip lines and pop-up sprinklers managed via smart controllers.",
            bgImage:
              "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=1600&auto=format&fit=crop",
            ctaText: "Upgrade Irrigation",
            ctaLink: "/contact",
          },
        },
      },
      {
        blockType: "features_grid",
        content: {
          features: [
            {
              title: "Smart Wi-Fi Controllers",
              description:
                "Rain Bird and Hunter controllers with weather sensors and app control.",
            },
            {
              title: "Drip Irrigation Networks",
              description:
                "Pressure-compensating emitters deliver exact water directly to root zones.",
            },
            {
              title: "Pop-Up Lawn Sprinklers",
              description:
                "Rotary gear-driven pop-up heads for uniform lawn water coverage.",
            },
            {
              title: "Water Bill Reduction",
              description:
                "Engineered to cut water consumption by up to 40% in UAE climate.",
            },
          ],
        },
      },
    ],
  },
  {
    title: "Pergola & Gazebo",
    slug: "pergola-gazebo",
    category: "Landscaping",
    isPublished: true,
    featuredImage:
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=1600&auto=format&fit=crop",
    heroImage:
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=1600&auto=format&fit=crop",
    subtitle:
      "Custom aluminum, motorized louvered, and hardwood pergolas and gazebos in Dubai.",
    badge: "Outdoor Shade",
    aliases: ["pergoal-gazebo", "pergola", "gazebo"],
    googleReviews: defaultGoogleReviews,
    seo: {
      metaTitle: "Pergola & Gazebo Dubai | Dream Floor Landscaping",
      metaDescription:
        "Custom wooden, aluminum, and bioclimatic motorized pergolas and gazebos in Dubai.",
    },
    sections: [
      {
        blockType: "hero_section",
        content: {
          hero: {
            headline: "Pergola & Gazebo",
            subheadline:
              "Architectural pergolas, bioclimatic louvered roofs, and luxury gazebos tailored to your outdoor space.",
            bgImage:
              "https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=1600&auto=format&fit=crop",
            ctaText: "Design Your Pergola",
            ctaLink: "/contact",
          },
        },
      },
      {
        blockType: "features_grid",
        content: {
          features: [
            {
              title: "Bioclimatic Louvers",
              description:
                "Motorized rotating blades offering complete sunlight control and waterproof closure.",
            },
            {
              title: "Marine Aluminum & Wood",
              description:
                "Powder-coated rustproof aluminum, teak, balau, and thermowood builds.",
            },
            {
              title: "Integrated LED Lighting",
              description:
                "Concealed perimeter LED strip channels and spotlights with dimmer switches.",
            },
            {
              title: "Drop-Down Screens",
              description:
                "Motorized zip screens to block Dubai dust, wind, and heat during summer.",
            },
          ],
        },
      },
    ],
  },
  {
    title: "Lawn Care",
    slug: "lawn-care",
    category: "Landscaping",
    isPublished: true,
    featuredImage:
      "https://images.unsplash.com/photo-1558904541-efa8c4a08931?q=80&w=1600&auto=format&fit=crop",
    heroImage:
      "https://images.unsplash.com/photo-1558904541-efa8c4a08931?q=80&w=1600&auto=format&fit=crop",
    subtitle:
      "Natural turf installation, Bermuda grass health care, and premium artificial grass.",
    badge: "Lawn Solutions",
    googleReviews: defaultGoogleReviews,
    seo: {
      metaTitle:
        "Lawn Care & Turf Installation Dubai | Dream Floor Landscaping",
      metaDescription:
        "Natural grass turf installation, aeration, weed control, and synthetic turf in Dubai.",
    },
    sections: [
      {
        blockType: "hero_section",
        content: {
          hero: {
            headline: "Lawn Care & Turf",
            subheadline:
              "Lush green natural Bermuda turf and premium non-toxic artificial grass for Dubai villa gardens.",
            bgImage:
              "https://images.unsplash.com/photo-1558904541-efa8c4a08931?q=80&w=1600&auto=format&fit=crop",
            ctaText: "Request Lawn Quote",
            ctaLink: "/contact",
          },
        },
      },
      {
        blockType: "features_grid",
        content: {
          features: [
            {
              title: "Natural Turf Soding",
              description:
                "Freshly harvested Paspalum and Bermuda grass rolls laid with enriched sweet soil.",
            },
            {
              title: "Luxury Artificial Grass",
              description:
                "High-density 40mm-50mm UV-stabilized synthetic grass that feels soft and realistic.",
            },
            {
              title: "Core Aeration & Topdressing",
              description:
                "Relieves soil compaction and promotes deep root development in heat.",
            },
            {
              title: "Weed & Fungus Eradication",
              description:
                "Targeted treatment preventing broadleaf weeds and yellow patches.",
            },
          ],
        },
      },
    ],
  },
  {
    title: "Landscape Lighting Services",
    slug: "landscape-lighting-services",
    category: "Landscaping",
    isPublished: true,
    featuredImage:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1600&auto=format&fit=crop",
    heroImage:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1600&auto=format&fit=crop",
    subtitle:
      "Low-voltage architectural outdoor LED illumination, pathway lights, and tree uplights.",
    badge: "Night Illumination",
    aliases: ["landscape-lighting", "garden-lighting"],
    googleReviews: defaultGoogleReviews,
    seo: {
      metaTitle: "Landscape Lighting Services Dubai | Dream Floor Landscaping",
      metaDescription:
        "Low-voltage architectural garden LED lighting design and installation in Dubai.",
    },
    sections: [
      {
        blockType: "hero_section",
        content: {
          hero: {
            headline: "Landscape Lighting Services",
            subheadline:
              "Architectural low-voltage outdoor LED illumination accentuating trees, pathways, and water.",
            bgImage:
              "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1600&auto=format&fit=crop",
            ctaText: "Request Lighting Design",
            ctaLink: "/contact",
          },
        },
      },
      {
        blockType: "features_grid",
        content: {
          features: [
            {
              title: "Palm & Tree Uplighting",
              description:
                "Precision narrow-beam brass fixtures casting dramatic tree silhouettes.",
            },
            {
              title: "Pathway & Step Lights",
              description:
                "Glare-free downward wash lighting ensuring safe and elegant night strolls.",
            },
            {
              title: "Low-Voltage 12V Safety",
              description:
                "Safe, energy-efficient commercial grade LED fixtures rated for UAE heat.",
            },
            {
              title: "Astronomical Timers",
              description:
                "Smart dusk-to-dawn automation adjusting with sunset times throughout the year.",
            },
          ],
        },
      },
    ],
  },
];

export const serviceData: ServiceData[] = fallbackServices;

export async function getServiceDetailBySlugAsync(
  slug: string,
): Promise<ServiceData | undefined> {
  if (!slug) return undefined;
  const normalized = slug.toLowerCase().trim();

  // Try API first
  try {
    const apiResult = await getServiceBySlugFromApi(normalized);
    if (apiResult) return apiResult;
  } catch {
    // ignore API failure and use fallback
  }

  // Fallback to static services
  return fallbackServices.find(
    (s) =>
      s.slug.toLowerCase().trim() === normalized ||
      s.aliases?.some((a) => a.toLowerCase().trim() === normalized) ||
      normalized.includes(s.slug.toLowerCase().trim()),
  );
}

export function getServiceDetailBySlug(slug: string): ServiceData | undefined {
  if (!slug) return undefined;
  const normalized = slug.toLowerCase().trim();
  return fallbackServices.find(
    (s) =>
      s.slug.toLowerCase().trim() === normalized ||
      s.aliases?.some((a) => a.toLowerCase().trim() === normalized),
  );
}

export async function getAllServiceSlugsAsync(): Promise<string[]> {
  const slugsSet = new Set<string>();
  fallbackServices.forEach((s) => {
    slugsSet.add(s.slug);
    s.aliases?.forEach((a) => slugsSet.add(a));
  });

  try {
    const apiRes = await fetchServicesData();
    if (apiRes.success && apiRes.data) {
      apiRes.data.forEach((item) => {
        if (item.slug) slugsSet.add(item.slug);
      });
    }
  } catch {
    // ignore API failure
  }

  return Array.from(slugsSet);
}

export function getAllServiceSlugs(): string[] {
  return fallbackServices.map((s) => s.slug);
}

// Keep legacy mappings for compatibility
export const poolsDetailData = fallbackServices;
export const getPoolDetailBySlug = getServiceDetailBySlug;
export const getAllPoolSlugs = getAllServiceSlugs;
