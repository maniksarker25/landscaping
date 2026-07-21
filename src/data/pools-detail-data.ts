import type { PoolDetailData } from "@/types/pool-detail";

export const defaultGoogleReviews = {
  averageRating: 5.0,
  totalReviews: 128,
  badgeTitle: "EXCELLENT",
  reviews: [
    {
      id: "rev-1",
      authorName: "Mohamed Al Nuaimi",
      timeAgo: "2 months ago",
      rating: 5,
      text: "Outstanding pool construction work! Dream Floor Landscaping transformed our backyard into a stunning luxury oasis with a custom infinity edge pool. Highly professional engineering team and seamless project delivery in Dubai.",
      verified: true,
    },
    {
      id: "rev-2",
      authorName: "Sarah & David Jenkins",
      timeAgo: "1 month ago",
      rating: 5,
      text: "We hired them for a complete overflow swimming pool build in Emirates Hills. Their attention to detail, tile finishes, water balancing, and plant room setup is world-class. Truly 5-star quality!",
      verified: true,
    },
    {
      id: "rev-3",
      authorName: "Rashid Al Maktoum",
      timeAgo: "3 weeks ago",
      rating: 5,
      text: "Extremely reliable skimmer pool contractor in Dubai. They delivered on schedule, handled all structural permits, and provided continuous maintenance support. Couldn't be happier!",
      verified: true,
    },
  ],
};

export const poolsDetailData: PoolDetailData[] = [
  {
    "title": "Infinity Swimming Pool Construction Dubai",
    "slug": "infinity-swimming-pool",
    "category": "Swimming Pools",
    "isPublished": true,
    "featuredImage": "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=1000&auto=format&fit=crop",
    "seo": {
      "metaTitle": "Infinity Swimming Pool Contractors in Dubai | Bespoke Vanishing Edge Pools",
      "metaDescription": "Top-rated infinity swimming pool design & construction contractors in Dubai. Custom engineered vanishing edge pools, glass wall features, and luxury landscape integration.",
      "keywords": ["infinity pool Dubai", "infinity pool contractors Dubai", "vanishing edge pool build", "luxury swimming pool Dubai"],
      "canonicalUrl": "https://poolsgardensuae.com/infinity-swimming-pool-construction-dubai-uae/",
      "ogImage": "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=1000&auto=format&fit=crop"
    },
    "sections": [
      {
        "blockType": "hero_section",
        "order": 1,
        "layoutStyle": "full_width",
        "content": {
          "hero": {
            "headline": "Looking For Infinity Swimming Pool Contractors In Dubai?",
            "subheadline": "Engineered vanishing-edge pools that seamlessly blend water, horizon, and modern architecture.",
            "bgImage": "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=2000&auto=format&fit=crop",
            "ctaText": "Premier Infinity Edge Builders",
            "ctaLink": "/contact-us"
          }
        }
      },
      {
        "blockType": "rich_text_jodit",
        "order": 2,
        "layoutStyle": "container_centered",
        "content": {
          "richTextHtml": "<h2>Your Search Ends Right Here! Looking for a Pool Company in Dubai</h2><p>Searching for premier <strong>Infinity Swimming Pool Contractors in Dubai</strong>? At <strong>Poolscape & Landscaping LLC</strong>, we specialize in conceptualizing, engineering, and constructing architectural infinity edge pools that create a breathtaking illusion of water dropping straight into the horizon.</p><p>Whether your property overlooks a golf course, cityscape skyline, or private garden, an infinity pool transforms your outdoor space into a resort-level retreat. Our structural engineers ensure perfect hydraulic balance, surge tank design, and leak-proof waterproofing tailored specifically to Dubai's soil and hot weather conditions.</p>"
        }
      },
      {
        "blockType": "gallery_grid",
        "order": 3,
        "layoutStyle": "grid_6_col",
        "content": {
          "gallery": [
            { "imageUrl": "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=800&auto=format&fit=crop", "caption": "Infinity pool overview with modern villa", "altText": "Infinity pool overview" },
            { "imageUrl": "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=800&auto=format&fit=crop", "caption": "Sunset view infinity pool edge", "altText": "Sunset view pool" },
            { "imageUrl": "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop", "caption": "Luxury villa pool with loungers", "altText": "Villa pool" },
            { "imageUrl": "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?q=80&w=800&auto=format&fit=crop", "caption": "Glass edge infinity pool", "altText": "Glass edge pool" },
            { "imageUrl": "https://images.unsplash.com/photo-1572331165267-854da2b10ccc?q=80&w=800&auto=format&fit=crop", "caption": "Modern villa courtyard pool", "altText": "Courtyard pool" },
            { "imageUrl": "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=800&auto=format&fit=crop", "caption": "Illuminated evening infinity pool", "altText": "Evening infinity pool" }
          ]
        }
      },
      {
        "blockType": "features_grid",
        "order": 4,
        "layoutStyle": "grid_4_col",
        "content": {
          "features": [
            { "title": "Unrivaled Aesthetic Beauty", "description": "The zero-edge vanishing line produces a sleek visual mirror effect that enhances your property's overall architectural value.", "iconUrl": "/icons/star.svg" },
            { "title": "Continuous Water Circulation", "description": "Water constantly flows over the weir edge into a hidden catch basin, preventing stagnant surface debris.", "iconUrl": "/icons/refresh.svg" },
            { "title": "Customizable Features", "description": "Integrate sunken fire pits, submerged LED ambient lights, perimeter glass walls, and hydrotherapy jets.", "iconUrl": "/icons/adjust.svg" },
            { "title": "Precision Hydraulic Engineering", "description": "Designed with heavy-duty variable speed pumps, automated surge tank monitoring, and salt-chlorine generators.", "iconUrl": "/icons/shield.svg" }
          ]
        }
      },
      {
        "blockType": "cta_banner",
        "order": 5,
        "layoutStyle": "dark_theme",
        "content": {
          "cta": {
            "title": "Looking for Infinity Pool Contractors in Dubai?",
            "description": "Call us today to schedule a free site survey & 3D consultation!",
            "buttonText": "Call Now",
            "buttonLink": "tel:+971529990092",
            "phoneNumber": "+971 52 999 0092"
          }
        }
      }
    ]
  },
  {
    "title": "Overflow Swimming Pool Construction Dubai",
    "slug": "overflow-swimming-pool",
    "category": "Swimming Pools",
    "isPublished": true,
    "featuredImage": "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=1000&auto=format&fit=crop",
    "seo": {
      "metaTitle": "Overflow Swimming Pool Contractor in Dubai | Perimeter Channel Pools",
      "metaDescription": "Premier overflow swimming pool contractor in Dubai. Experience crystal-clear water with 360-degree perimeter overflow channels, stone gratings, and custom pool engineering.",
      "keywords": ["overflow pool Dubai", "overflow swimming pool contractor", "perimeter channel pool", "deck slot pool Dubai"],
      "canonicalUrl": "https://poolsgardensuae.com/overflow-swimming-pool-construction-dubai-uae/",
      "ogImage": "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=1000&auto=format&fit=crop"
    },
    "sections": [
      {
        "blockType": "hero_section",
        "order": 1,
        "layoutStyle": "full_width",
        "content": {
          "hero": {
            "headline": "Searching For The Premier Overflow Swimming Pool Contractor In Dubai!",
            "subheadline": "Glass-like water surface level pools engineered for continuous perimeter filtration and luxury modern aesthetic.",
            "bgImage": "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=2000&auto=format&fit=crop",
            "ctaText": "Master Overflow Pool Engineers",
            "ctaLink": "/contact-us"
          }
        }
      },
      {
        "blockType": "rich_text_jodit",
        "order": 2,
        "layoutStyle": "container_centered",
        "content": {
          "richTextHtml": "<h2>Keep Swimming and Enjoying a Premium Overflow Pool in Dubai</h2><p>An <strong>Overflow Swimming Pool</strong> is the pinnacle of luxury water design. Unlike traditional skimmer pools where the water line is located several inches below the coping, an overflow pool maintains water flush with the surrounding patio deck, creating a mirror-like finish across the entire surface.</p><p>At <strong>Poolscape LLC</strong>, we construct state-of-the-art overflow pools with custom stone channel grates, subterranean surge tanks, and high-efficiency filtration units tailored for private villas in Arabian Ranches, Dubai Hills, and Jumeirah.</p>"
        }
      },
      {
        "blockType": "gallery_grid",
        "order": 3,
        "layoutStyle": "grid_6_col",
        "content": {
          "gallery": [
            { "imageUrl": "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=800&auto=format&fit=crop", "caption": "Overflow pool surface level with deck", "altText": "Overflow pool surface level" },
            { "imageUrl": "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=800&auto=format&fit=crop", "caption": "Perimeter overflow channel with granite tiles", "altText": "Perimeter channel" },
            { "imageUrl": "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop", "caption": "Modern villa overflow pool landscape", "altText": "Overflow pool landscape" },
            { "imageUrl": "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?q=80&w=800&auto=format&fit=crop", "caption": "Slot channel overflow detail", "altText": "Slot channel" },
            { "imageUrl": "https://images.unsplash.com/photo-1572331165267-854da2b10ccc?q=80&w=800&auto=format&fit=crop", "caption": "Evening lighted overflow pool", "altText": "Evening overflow pool" },
            { "imageUrl": "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=800&auto=format&fit=crop", "caption": "Villa poolside overflow setup", "altText": "Villa pool setup" }
          ]
        }
      },
      {
        "blockType": "features_grid",
        "order": 4,
        "layoutStyle": "card_grid",
        "content": {
          "features": [
            { "title": "Superior Water Clarity", "description": "360-degree perimeter surface skim removes dust, leaves, and oils instantly before they can sink.", "iconUrl": "/icons/water.svg" },
            { "title": "Zero Water Level Dip", "description": "The pool water remains constantly level with your patio deck for a seamless visual transition.", "iconUrl": "/icons/layer.svg" },
            { "title": "Quieter Hydraulics", "description": "Perimeter channel drainage reduces water turbulence and splash back during heavy swimming.", "iconUrl": "/icons/volume.svg" },
            { "title": "Surge Tank Protection", "description": "Captures displaced pool water during large gatherings without any water loss.", "iconUrl": "/icons/shield.svg" }
          ]
        }
      },
      {
        "blockType": "cta_banner",
        "order": 5,
        "layoutStyle": "dark_theme",
        "content": {
          "cta": {
            "title": "Looking for Overflow Swimming Pool Contractors in Dubai?",
            "description": "Contact our senior engineers today for a custom estimate!",
            "buttonText": "Call Now",
            "buttonLink": "tel:+971529990092",
            "phoneNumber": "+971 52 999 0092"
          }
        }
      }
    ]
  },
  {
    "title": "Skimmer Swimming Pool Construction Dubai",
    "slug": "skimmer-swimming-pool",
    "category": "Swimming Pools",
    "isPublished": true,
    "featuredImage": "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop",
    "seo": {
      "metaTitle": "Skimmer Swimming Pool Contractors in Dubai | Cost Effective Pools",
      "metaDescription": "Reliable skimmer swimming pool contractors in Dubai. Custom built skimmer pools with heavy-duty filtration, durable coping tiles, and low maintenance overhead.",
      "keywords": ["skimmer pool Dubai", "skimmer swimming pool contractor", "budget pool build Dubai", "family swimming pool"],
      "canonicalUrl": "https://poolsgardensuae.com/skimmer-swimming-pool-construction-dubai-uae/",
      "ogImage": "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop"
    },
    "sections": [
      {
        "blockType": "hero_section",
        "order": 1,
        "layoutStyle": "full_width",
        "content": {
          "hero": {
            "headline": "Looking For Skimmer Swimming Pool Contractors In Dubai?",
            "subheadline": "Classic, reliable, and cost-effective swimming pool solutions designed for family villas.",
            "bgImage": "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2000&auto=format&fit=crop",
            "ctaText": "Classic Pool Specialists",
            "ctaLink": "/contact-us"
          }
        }
      },
      {
        "blockType": "rich_text_jodit",
        "order": 2,
        "layoutStyle": "container_centered",
        "content": {
          "richTextHtml": "<h2>Your Pool & Gardens Landscaping LLC Has You Covered!</h2><p><strong>Skimmer Swimming Pools</strong> remain one of the most popular choices for villa owners across Dubai due to their engineering simplicity, rapid construction timeline, and cost-effective maintenance. In a skimmer pool, surface water is drawn into built-in skimmer boxes located near the top of the pool wall.</p><p>At <strong>Poolscape LLC</strong>, we craft custom skimmer pools that blend durability with high aesthetics — featuring luxury glass mosaics, LED lights, water fountains, and smart filtration plant rooms.</p>"
        }
      },
      {
        "blockType": "gallery_grid",
        "order": 3,
        "layoutStyle": "grid_6_col",
        "content": {
          "gallery": [
            { "imageUrl": "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop", "caption": "Skimmer pool overview in villa", "altText": "Skimmer pool overview" },
            { "imageUrl": "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=800&auto=format&fit=crop", "caption": "Custom skimmer pool with sun loungers", "altText": "Sun loungers pool" },
            { "imageUrl": "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=800&auto=format&fit=crop", "caption": "Family backyard skimmer pool", "altText": "Backyard pool" },
            { "imageUrl": "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?q=80&w=800&auto=format&fit=crop", "caption": "Built-in jacuzzi in skimmer pool", "altText": "Pool with jacuzzi" },
            { "imageUrl": "https://images.unsplash.com/photo-1572331165267-854da2b10ccc?q=80&w=800&auto=format&fit=crop", "caption": "Night time LED lit skimmer pool", "altText": "Night lit skimmer pool" },
            { "imageUrl": "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=800&auto=format&fit=crop", "caption": "Clear blue water skimmer pool finish", "altText": "Clear blue pool" }
          ]
        }
      },
      {
        "blockType": "features_grid",
        "order": 4,
        "layoutStyle": "grid_4_col",
        "content": {
          "features": [
            { "title": "Cost-Effective Construction", "description": "No subterranean surge tank required, significantly lowering structural excavation and build costs.", "iconUrl": "/icons/wallet.svg" },
            { "title": "Faster Project Turnaround", "description": "Completed in less time without sacrificing structural integrity or waterproofing quality.", "iconUrl": "/icons/clock.svg" },
            { "title": "Simplified Maintenance", "description": "Easy access basket cleaning, straightforward filtration valves, and efficient power usage.", "iconUrl": "/icons/tool.svg" },
            { "title": "Custom Shapes & Sizes", "description": "Built to fit compact villa gardens or expansive backyard grounds seamlessly.", "iconUrl": "/icons/shape.svg" }
          ]
        }
      },
      {
        "blockType": "cta_banner",
        "order": 5,
        "layoutStyle": "dark_theme",
        "content": {
          "cta": {
            "title": "Looking to Build a Skimmer Pool in Dubai?",
            "description": "Call us today at +971 52 999 0092 for immediate expert advice!",
            "buttonText": "Call Now",
            "buttonLink": "tel:+971529990092",
            "phoneNumber": "+971 52 999 0092"
          }
        }
      }
    ]
  },
  {
    "title": "End-to-End Swimming Pool Construction In Dubai",
    "slug": "swimming-pool-construction",
    "category": "Swimming Pools",
    "isPublished": true,
    "featuredImage": "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1000&auto=format&fit=crop",
    "seo": {
      "metaTitle": "Swimming Pool Construction Contractors in Dubai | Complete Pool Build",
      "metaDescription": "Leading swimming pool construction company in Dubai. Turnkey engineering, permits, concrete shell pouring, tiling, and smart plant room automation.",
      "keywords": ["swimming pool construction Dubai", "pool builder Dubai", "pool installation contractors", "villa pool construction"],
      "canonicalUrl": "https://poolsgardensuae.com/swimming-pool-construction-dubai-uae/",
      "ogImage": "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1000&auto=format&fit=crop"
    },
    "sections": [
      {
        "blockType": "hero_section",
        "order": 1,
        "layoutStyle": "full_width",
        "content": {
          "hero": {
            "headline": "Premier Swimming Pool Construction Company in Dubai",
            "subheadline": "Custom concrete pool engineering, structural shell installation, and full turnkey project management.",
            "bgImage": "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=2000&auto=format&fit=crop",
            "ctaText": "Certified Pool Builders",
            "ctaLink": "/contact-us"
          }
        }
      },
      {
        "blockType": "rich_text_jodit",
        "order": 2,
        "layoutStyle": "container_centered",
        "content": {
          "richTextHtml": "<h2>Turnkey Pool Construction Services</h2><p>Building a swimming pool is one of the most rewarding home improvement projects you can undertake in Dubai. At <strong>Poolscape LLC</strong>, we handle every single aspect of <strong>Swimming Pool Construction</strong> under one roof — from initial 3D architectural rendering and civil authority permitting to soil excavation, concrete shell pouring, and luxury tile finishing.</p><p>Our experienced engineers utilize heavy-gauge reinforced steel and high-pressure gunite concrete to ensure your pool structural shell stands up to soil movement, high water tables, and summer thermal expansion.</p>"
        }
      },
      {
        "blockType": "technical_specs",
        "order": 3,
        "layoutStyle": "grid_2_col",
        "content": {
          "accordionItems": [
            { "question": "Phase 1: Design & Authority Permits", "answer": "3D architectural render design, soil test, structural drawing approval from Dubai Municipality / DDA." },
            { "question": "Phase 2: Excavation & Gunite Shell", "answer": "Earthwork excavation, gravel base, steel rebar grid, and high-density shotcrete concrete spraying." },
            { "question": "Phase 3: Hydraulic Plumbing & Waterproofing", "answer": "Installing heavy-duty PVC pipework, main drains, skimmers/gutters, and multi-layer waterproof membrane." },
            { "question": "Phase 4: Finishes, Decking & Handover", "answer": "Laying Spanish mosaic tiles, granite coping, deck paving, pump room automation, and chemical balancing." }
          ]
        }
      },
      {
        "blockType": "gallery_grid",
        "order": 4,
        "layoutStyle": "grid_6_col",
        "content": {
          "gallery": [
            { "imageUrl": "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=800&auto=format&fit=crop", "caption": "Custom pool construction site", "altText": "Pool construction site" },
            { "imageUrl": "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=800&auto=format&fit=crop", "caption": "Reinforced steel shell pouring", "altText": "Steel shell pouring" },
            { "imageUrl": "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=800&auto=format&fit=crop", "caption": "Waterproofing test in progress", "altText": "Waterproofing test" },
            { "imageUrl": "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop", "caption": "Tile fitting on pool floor", "altText": "Tile fitting" },
            { "imageUrl": "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?q=80&w=800&auto=format&fit=crop", "caption": "Plant room pump installation", "altText": "Pump room installation" },
            { "imageUrl": "https://images.unsplash.com/photo-1572331165267-854da2b10ccc?q=80&w=800&auto=format&fit=crop", "caption": "Finished pool handover in Dubai villa", "altText": "Finished pool handover" }
          ]
        }
      },
      {
        "blockType": "cta_banner",
        "order": 5,
        "layoutStyle": "dark_theme",
        "content": {
          "cta": {
            "title": "Ready to Build Your Custom Pool in Dubai?",
            "description": "Schedule a free consultation with our head pool engineer today!",
            "buttonText": "Call Now",
            "buttonLink": "tel:+971529990092",
            "phoneNumber": "+971 52 999 0092"
          }
        }
      }
    ]
  },
  {
    "title": "Professional Swimming Pool Maintenance Services In Dubai",
    "slug": "swimming-pool-maintenance",
    "category": "Maintenance",
    "isPublished": true,
    "featuredImage": "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=1000&auto=format&fit=crop",
    "seo": {
      "metaTitle": "Swimming Pool Maintenance Services Dubai | Water Treatment & Care",
      "metaDescription": "Professional swimming pool maintenance in Dubai. Weekly water testing, filter backwashing, pump repair, chemical dosing, and plant room upkeep.",
      "keywords": ["swimming pool maintenance Dubai", "pool cleaning company Dubai", "pool water treatment", "pool pump repair Dubai"],
      "canonicalUrl": "https://poolsgardensuae.com/swimming-pool-maintenance-dubai-uae/",
      "ogImage": "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=1000&auto=format&fit=crop"
    },
    "sections": [
      {
        "blockType": "hero_section",
        "order": 1,
        "layoutStyle": "full_width",
        "content": {
          "hero": {
            "headline": "Keep Your Pool Water Pristine, Safe & Crystal Clear Year-Round",
            "subheadline": "Weekly water balancing, filtration servicing, equipment repair, and emergency 24/7 support.",
            "bgImage": "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=2000&auto=format&fit=crop",
            "ctaText": "Certified Water Technicians",
            "ctaLink": "/contact-us"
          }
        }
      },
      {
        "blockType": "rich_text_jodit",
        "order": 2,
        "layoutStyle": "container_centered",
        "content": {
          "richTextHtml": "<h2>Expert Pool Cleaning & Chemical Treatment</h2><p>Due to Dubai's warm climate, intense sun exposure, and blowing desert dust, swimming pool water requires constant monitoring and chemical precision. At <strong>Poolscape LLC</strong>, our certified water technicians conduct comprehensive <strong>Swimming Pool Maintenance</strong> packages for residential villas and commercial pools.</p><p>We test pH levels, total alkalinity, free chlorine, cyanuric acid, and perform regular sand filter backwashes, skimmer basket clearings, and pump seal inspections to ensure your pool remains safe and healthy for your family.</p>"
        }
      },
      {
        "blockType": "features_grid",
        "order": 3,
        "layoutStyle": "card_grid",
        "content": {
          "features": [
            { "title": "Weekly Chemical Balancing", "description": "Precision chemical dosing to prevent algae, bacteria, and eye irritation.", "iconUrl": "/icons/droplet.svg" },
            { "title": "Filter & Pump Servicing", "description": "Regular backwashing, media replacement, and mechanical pump inspections.", "iconUrl": "/icons/gear.svg" },
            { "title": "Surface Skimming & Vacuuming", "description": "Deep floor vacuuming, wall brushing, and skimmer basket debris clearance.", "iconUrl": "/icons/sparkles.svg" },
            { "title": "24/7 Emergency Callout", "description": "Fast repair support for pump leaks, heater failures, or sudden water cloudiness.", "iconUrl": "/icons/phone.svg" }
          ]
        }
      },
      {
        "blockType": "cta_banner",
        "order": 5,
        "layoutStyle": "dark_theme",
        "content": {
          "cta": {
            "title": "Need Urgent Pool Maintenance or Water Chemical Balancing?",
            "description": "Speak to our maintenance team now for flexible contract packages!",
            "buttonText": "Call Now",
            "buttonLink": "tel:+971529990092",
            "phoneNumber": "+971 52 999 0092"
          }
        }
      }
    ]
  }
];

export function getPoolDetailBySlug(slug: string): PoolDetailData | undefined {
  if (!slug) return undefined;
  const normalizedSlug = slug.toLowerCase().trim();

  // 1. Direct slug match
  for (const pool of poolsDetailData) {
    if (pool.slug.toLowerCase().trim() === normalizedSlug) return pool;
  }

  // 2. Alias match
  for (const pool of poolsDetailData) {
    if (pool.aliases?.some((alias) => alias.toLowerCase().trim() === normalizedSlug)) return pool;
  }

  // 3. Fallback partial match
  for (const pool of poolsDetailData) {
    if (pool.slug.toLowerCase().includes(normalizedSlug) || normalizedSlug.includes(pool.slug.toLowerCase())) {
      return pool;
    }
  }

  return undefined;
}

export function getAllPoolSlugs(): string[] {
  const slugsSet = new Set<string>();
  poolsDetailData.forEach((pool) => {
    if (pool.slug) slugsSet.add(pool.slug);
    if (pool.aliases) pool.aliases.forEach((alias) => slugsSet.add(alias));
  });
  return Array.from(slugsSet);
}
