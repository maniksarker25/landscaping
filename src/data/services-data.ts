import type { ServiceData } from "@/types/service";

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
      text: "Outstanding service quality! DFL transformed our backyard into a stunning luxury oasis. Highly professional engineering team and seamless project delivery in Dubai.",
      verified: true,
    },
    {
      id: "rev-2",
      authorName: "Sarah & David Jenkins",
      timeAgo: "1 month ago",
      rating: 5,
      text: "We hired them for a complete outdoor project in Emirates Hills. Their attention to detail, tile finishes, planting design, and plant room setup is world-class. Truly 5-star quality!",
      verified: true,
    },
    {
      id: "rev-3",
      authorName: "Rashid Al Maktoum",
      timeAgo: "3 weeks ago",
      rating: 5,
      text: "Extremely reliable and creative team. They delivered on schedule, handled all structural permits, and provided continuous maintenance support.",
      verified: true,
    },
    
    {
      id: "rev-4",
      authorName: "Sarah & David Jenkins",
      timeAgo: "1 month ago",
      rating: 5,
      text: "We hired them for a complete outdoor project in Emirates Hills. Their attention to detail, tile finishes, planting design, and plant room setup is world-class. Truly 5-star quality!",
      verified: true,
    },
    {
      id: "rev-5",
      authorName: "Rashid Al Maktoum",
      timeAgo: "3 weeks ago",
      rating: 5,
      text: "Extremely reliable and creative team. They delivered on schedule, handled all structural permits, and provided continuous maintenance support.",
      verified: true,
    },
    
  ],
};

export const serviceData: ServiceData[] = [
  // POOLS CATEGORY (6 ITEMS)
  {
    title: "Infinity Swimming Pool Construction Dubai",
    slug: "infinity-swimming-pool",
    category: "Pools",
    isPublished: true,
    featuredImage:
      "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=1000&auto=format&fit=crop",
    seo: {
      metaTitle:
        "Infinity Swimming Pool Contractors in Dubai | Bespoke Vanishing Edge Pools",
      metaDescription:
        "Top-rated infinity swimming pool design & construction contractors in Dubai. Custom engineered vanishing edge pools, glass wall features, and luxury landscape integration.",
      keywords: [
        "infinity pool Dubai",
        "infinity pool contractors Dubai",
        "vanishing edge pool build",
        "luxury swimming pool Dubai",
      ],
      canonicalUrl:
        "https://poolsgardensuae.com/infinity-swimming-pool-construction-dubai-uae/",
      ogImage:
        "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=1000&auto=format&fit=crop",
    },
    sections: [
      {
        blockType: "hero_section",
        order: 1,
        layoutStyle: "full_width",
        content: {
          hero: {
            headline:
              "Looking For Infinity Swimming Pool Contractors In Dubai?",
            subheadline:
              "Engineered vanishing-edge pools that seamlessly blend water, horizon, and modern architecture.",
            bgImage:
              "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=2000&auto=format&fit=crop",
            ctaText: "Premier Infinity Edge Builders",
            ctaLink: "/contact-us",
          },
        },
      },
      {
        blockType: "rich_text_jodit",
        order: 2,
        layoutStyle: "container_centered",
        content: {
          richTextHtml:
            "<h2>Your Search Ends Right Here! Looking for a Pool Company in Dubai</h2><p>Searching for premier <strong>Infinity Swimming Pool Contractors in Dubai</strong>? At <strong>DFL LLC</strong>, we specialize in conceptualizing, engineering, and constructing architectural infinity edge pools that create a breathtaking illusion of water dropping straight into the horizon.</p><p>Whether your property overlooks a golf course, cityscape skyline, or private garden, an infinity pool transforms your outdoor space into a resort-level retreat. Our structural engineers ensure perfect hydraulic balance, surge tank design, and leak-proof waterproofing tailored specifically to Dubai's soil and hot weather conditions.</p>",
        },
      },
      {
        blockType: "features_grid",
        order: 3,
        layoutStyle: "grid_2_col",
        content: {
          features: [
            {
              title: "Unrivaled Aesthetic Beauty",
              description:
                "The zero-edge vanishing line produces a sleek visual mirror effect that enhances your property's overall architectural value.",
              iconUrl: "/icons/star.svg",
            },
            {
              title: "Continuous Water Circulation",
              description:
                "Water constantly flows over the weir edge into a hidden catch basin, preventing stagnant surface debris.",
              iconUrl: "/icons/refresh.svg",
            },
            {
              title: "Customizable Features",
              description:
                "Integrate sunken fire pits, submerged LED ambient lights, perimeter glass walls, and hydrotherapy jets.",
              iconUrl: "/icons/adjust.svg",
            },
            {
              title: "Precision Hydraulic Engineering",
              description:
                "Designed with heavy-duty variable speed pumps, automated surge tank monitoring, and salt-chlorine generators.",
              iconUrl: "/icons/shield.svg",
            },
          ],
        },
      },
      {
        blockType: "gallery_grid",
        order: 4,
        layoutStyle: "grid_6_col",
        content: {
          gallery: [
            {
              imageUrl:
                "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=800&auto=format&fit=crop",
              caption: "Infinity pool overview with modern villa",
              altText: "Infinity pool overview",
            },
            {
              imageUrl:
                "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=800&auto=format&fit=crop",
              caption: "Sunset view infinity pool edge",
              altText: "Sunset view pool",
            },
            {
              imageUrl:
                "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop",
              caption: "Luxury villa pool with loungers",
              altText: "Villa pool",
            },
            {
              imageUrl:
                "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?q=80&w=800&auto=format&fit=crop",
              caption: "Glass edge infinity pool",
              altText: "Glass edge pool",
            },
            {
              imageUrl:
                "https://images.unsplash.com/photo-1572331165267-854da2b10ccc?q=80&w=800&auto=format&fit=crop",
              caption: "Modern villa courtyard pool",
              altText: "Courtyard pool",
            },
            {
              imageUrl:
                "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=800&auto=format&fit=crop",
              caption: "Illuminated evening infinity pool",
              altText: "Evening infinity pool",
            },
          ],
        },
      },
      {
        blockType: "technical_specs",
        order: 5,
        layoutStyle: "grid_2_col",
        content: {
          accordionItems: [
            {
              question: "Hydraulic Balance & Weir Calculations",
              answer:
                "Every infinity edge requires a precise hydraulic formula to calculate the exact water overflow rate based on the pool surface area and pump horsepower, preventing dry-running and ensuring continuous water sheeting.",
            },
            {
              question: "Bespoke Catch Basin Design",
              answer:
                "The overflow weir drops water into a custom catch basin gutter, designed with a minor gradient slope to funnel water quietly to the automated surge tank.",
            },
          ],
        },
      },
      {
        blockType: "rich_text_jodit",
        order: 6,
        layoutStyle: "default",
        content: {
          richTextHtml:
            "<h3>High-Grade Material Selection for Infinity Pools</h3><p>To withstand high thermal shifts in Dubai, we only utilize premium waterproofing compounds and Spanish glass mosaic tiles. Concrete shells are poured with C40/50 grade high-sulfate resistant concrete to prevent reinforcement oxidation and preserve structural longevity.</p>",
        },
      },
      {
        blockType: "gallery_grid",
        order: 7,
        layoutStyle: "grid_2_col",
        content: {
          gallery: [
            {
              imageUrl:
                "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=800&auto=format&fit=crop",
              caption: "Zero-edge overflow detail",
              altText: "Zero edge overflow details",
            },
            {
              imageUrl:
                "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=800&auto=format&fit=crop",
              caption: "Submerged seating area",
              altText: "Submerged tile loungers",
            },
          ],
        },
      },
      {
        blockType: "faq_accordion",
        order: 8,
        layoutStyle: "default",
        content: {
          accordionItems: [
            {
              question: "How is an infinity pool different from a normal pool?",
              answer:
                "Unlike standard skimmer pools, an infinity pool has one or more walls cut lower than the water level, causing water to flow over the edge into a drainage channel and recirculate.",
            },
            {
              question: "Is pool heating and cooling necessary in Dubai?",
              answer:
                "Yes. Dubai summers raise water temperatures above 38 degrees, while winters drop below 18 degrees. A heat-cool pump maintains a comfortable 28 degrees year-round.",
            },
          ],
        },
      },
      {
        blockType: "cta_banner",
        order: 9,
        layoutStyle: "accent_bg",
        content: {
          cta: {
            title: "Looking for Infinity Pool Contractors in Dubai?",
            description:
              "Call us today to schedule a free site survey & 3D consultation!",
            buttonText: "Call Now",
            buttonLink: "tel:+971529990092",
            phoneNumber: "+971 52 999 0092",
          },
        },
      },
      {
        blockType: "contact_form",
        order: 10,
        layoutStyle: "default",
        content: {},
      },
    ],
  },
  {
    title: "Overflow Swimming Pool Construction Dubai",
    slug: "overflow-swimming-pool",
    category: "Pools",
    isPublished: true,
    featuredImage:
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=1000&auto=format&fit=crop",
    seo: {
      metaTitle:
        "Overflow Swimming Pool Contractor in Dubai | Perimeter Channel Pools",
      metaDescription:
        "Premier overflow swimming pool contractor in Dubai. Experience crystal-clear water with 360-degree perimeter overflow channels, stone gratings, and custom pool engineering.",
      keywords: [
        "overflow pool Dubai",
        "overflow swimming pool contractor",
        "perimeter channel pool",
        "deck slot pool Dubai",
      ],
      canonicalUrl:
        "https://poolsgardensuae.com/overflow-swimming-pool-construction-dubai-uae/",
      ogImage:
        "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=1000&auto=format&fit=crop",
    },
    sections: [
      {
        blockType: "hero_section",
        order: 1,
        layoutStyle: "full_width",
        content: {
          hero: {
            headline:
              "Searching For The Premier Overflow Swimming Pool Contractor In Dubai!",
            subheadline:
              "Glass-like water surface level pools engineered for continuous perimeter filtration and luxury modern aesthetic.",
            bgImage:
              "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=2000&auto=format&fit=crop",
            ctaText: "Master Overflow Pool Engineers",
            ctaLink: "/contact-us",
          },
        },
      },
      {
        blockType: "rich_text_jodit",
        order: 2,
        layoutStyle: "two_column_split",
        content: {
          richTextHtml:
            "<h2>Keep Swimming and Enjoying a Premium Overflow Pool in Dubai</h2><p>An <strong>Overflow Swimming Pool</strong> is the pinnacle of luxury water design. Unlike traditional skimmer pools where the water line is located several inches below the coping, an overflow pool maintains water flush with the surrounding patio deck, creating a mirror-like finish across the entire surface.</p><p>At <strong>DFL LLC</strong>, we construct state-of-the-art overflow pools with custom stone channel grates, subterranean surge tanks, and high-efficiency filtration units tailored for private villas in Arabian Ranches, Dubai Hills, and Jumeirah.</p>",
        },
      },
      {
        blockType: "features_grid",
        order: 3,
        layoutStyle: "card_grid",
        content: {
          features: [
            {
              title: "Superior Water Clarity",
              description:
                "360-degree perimeter surface skim removes dust, leaves, and oils instantly before they can sink.",
              iconUrl: "/icons/water.svg",
            },
            {
              title: "Zero Water Level Dip",
              description:
                "The pool water remains constantly level with your patio deck for a seamless visual transition.",
              iconUrl: "/icons/layer.svg",
            },
            {
              title: "Quieter Hydraulics",
              description:
                "Perimeter channel drainage reduces water turbulence and splash back during heavy swimming.",
              iconUrl: "/icons/volume.svg",
            },
            {
              title: "Surge Tank Protection",
              description:
                "Captures displaced pool water during large gatherings without any water loss.",
              iconUrl: "/icons/shield.svg",
            },
          ],
        },
      },
      {
        blockType: "gallery_grid",
        order: 4,
        layoutStyle: "grid_3_col",
        content: {
          gallery: [
            {
              imageUrl:
                "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=800&auto=format&fit=crop",
              caption: "Overflow pool surface level with deck",
              altText: "Overflow pool surface level",
            },
            {
              imageUrl:
                "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=800&auto=format&fit=crop",
              caption: "Perimeter overflow channel with granite tiles",
              altText: "Perimeter channel",
            },
            {
              imageUrl:
                "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop",
              caption: "Modern villa overflow pool landscape",
              altText: "Modern villa overflow pool",
            },
          ],
        },
      },
      {
        blockType: "technical_specs",
        order: 5,
        layoutStyle: "grid_1_col",
        content: {
          accordionItems: [
            {
              question: "Perimeter Channel Configurations",
              answer:
                "Choose from exposed granite stone gratings, slot drains, or continuous perimeter overflow lines configured based on villa landscaping contours.",
            },
            {
              question: "Surge Tank Auto-Leveling Systems",
              answer:
                "Equipped with automated float valves and level sensors to manage water balance during hot summer evaporation cycles.",
            },
          ],
        },
      },
      {
        blockType: "rich_text_jodit",
        order: 6,
        layoutStyle: "container_centered",
        content: {
          richTextHtml:
            "<h3>Tile and Deck Stone Integration</h3><p>We work with premium deck stones like Italian travertine and dark basalt, providing a stunning contrast to the clear blue overflow border. Integrated slot drains fit seamlessly between tile joints, keeping walkways dry and clean.</p>",
        },
      },
      {
        blockType: "gallery_grid",
        order: 7,
        layoutStyle: "grid_2_col",
        content: {
          gallery: [
            {
              imageUrl:
                "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?q=80&w=800&auto=format&fit=crop",
              caption: "Slot channel overflow detail",
              altText: "Detail slot channel",
            },
            {
              imageUrl:
                "https://images.unsplash.com/photo-1572331165267-854da2b10ccc?q=80&w=800&auto=format&fit=crop",
              caption: "Granite overflow grate styling",
              altText: "Granite overflow grate details",
            },
          ],
        },
      },
      {
        blockType: "faq_accordion",
        order: 8,
        layoutStyle: "default",
        content: {
          accordionItems: [
            {
              question: "Does an overflow pool lose water?",
              answer:
                "Water that splashes over flows into the perimeter channels and straight to the surge tank for filtration and recirculates back, reducing net water loss.",
            },
            {
              question: "How often should surge tanks be cleaned?",
              answer:
                "Surge tanks collect sand and fine debris. We recommend structural inspection and deep cleaning every 6 months to maintain optimal flow.",
            },
          ],
        },
      },
      {
        blockType: "cta_banner",
        order: 9,
        layoutStyle: "accent_bg",
        content: {
          cta: {
            title: "Looking for Overflow Swimming Pool Contractors in Dubai?",
            description:
              "Contact our senior engineers today for a custom estimate!",
            buttonText: "Call Now",
            buttonLink: "tel:+971529990092",
            phoneNumber: "+971 52 999 0092",
          },
        },
      },
      {
        blockType: "contact_form",
        order: 10,
        layoutStyle: "default",
        content: {},
      },
    ],
  },
  {
    title: "Skimmer Swimming Pool Construction Dubai",
    slug: "skimmer-swimming-pool",
    category: "Pools",
    isPublished: true,
    featuredImage:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop",
    seo: {
      metaTitle:
        "Skimmer Swimming Pool Contractors in Dubai | Cost Effective Pools",
      metaDescription:
        "Reliable skimmer swimming pool contractors in Dubai. Custom built skimmer pools with heavy-duty filtration, durable coping tiles, and low maintenance overhead.",
      keywords: [
        "skimmer pool Dubai",
        "skimmer swimming pool contractor",
        "budget pool build Dubai",
        "family swimming pool",
      ],
      canonicalUrl:
        "https://poolsgardensuae.com/skimmer-swimming-pool-construction-dubai-uae/",
      ogImage:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop",
    },
    sections: [
      {
        blockType: "hero_section",
        order: 1,
        layoutStyle: "full_width",
        content: {
          hero: {
            headline: "Looking For Skimmer Swimming Pool Contractors In Dubai?",
            subheadline:
              "Classic, reliable, and cost-effective swimming pool solutions designed for family villas.",
            bgImage:
              "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=2000&auto=format&fit=crop",
            ctaText: "Classic Pool Specialists",
            ctaLink: "/contact-us",
          },
        },
      },
      {
        blockType: "rich_text_jodit",
        order: 2,
        layoutStyle: "container_centered",
        content: {
          richTextHtml:
            "<h2>Your Pool & Gardens Landscaping LLC Has You Covered!</h2><p><strong>Skimmer Swimming Pools</strong> remain one of the most popular choices for villa owners across Dubai due to their engineering simplicity, rapid construction timeline, and cost-effective maintenance. In a skimmer pool, surface water is drawn into built-in skimmer boxes located near the top of the pool wall.</p><p>At <strong>DFL LLC</strong>, we craft custom skimmer pools that blend durability with high aesthetics — featuring luxury glass mosaics, LED lights, water fountains, and smart filtration plant rooms.</p>",
        },
      },
      {
        blockType: "features_grid",
        order: 3,
        layoutStyle: "grid_3_col",
        content: {
          features: [
            {
              title: "Cost-Effective Construction",
              description:
                "No subterranean surge tank required, significantly lowering structural excavation and build costs.",
              iconUrl: "/icons/wallet.svg",
            },
            {
              title: "Faster Project Turnaround",
              description:
                "Completed in less time without sacrificing structural integrity or waterproofing quality.",
              iconUrl: "/icons/clock.svg",
            },
            {
              title: "Simplified Maintenance",
              description:
                "Easy access basket cleaning, straightforward filtration valves, and efficient power usage.",
              iconUrl: "/icons/tool.svg",
            },
            {
              title: "Custom Shapes & Sizes",
              description:
                "Built to fit compact villa gardens or expansive backyard grounds seamlessly.",
              iconUrl: "/icons/shape.svg",
            },
          ],
        },
      },
      {
        blockType: "gallery_grid",
        order: 4,
        layoutStyle: "grid_4_col",
        content: {
          gallery: [
            {
              imageUrl:
                "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop",
              caption: "Skimmer pool overview in villa",
              altText: "Skimmer pool overview",
            },
            {
              imageUrl:
                "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=800&auto=format&fit=crop",
              caption: "Custom skimmer pool with sun loungers",
              altText: "Sun loungers pool",
            },
            {
              imageUrl:
                "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=800&auto=format&fit=crop",
              caption: "Family backyard skimmer pool",
              altText: "Backyard pool",
            },
            {
              imageUrl:
                "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?q=80&w=800&auto=format&fit=crop",
              caption: "Built-in jacuzzi in skimmer pool",
              altText: "Pool with jacuzzi",
            },
          ],
        },
      },
      {
        blockType: "technical_specs",
        order: 5,
        layoutStyle: "grid_2_col",
        content: {
          accordionItems: [
            {
              question: "Optimal Skimmer Sizing & Ratios",
              answer:
                "We install 1 skimmer box for every 400 square feet of pool surface area, ensuring constant surface flow and avoiding dead-zones.",
            },
            {
              question: "Direct Filtration Integration",
              answer:
                "Skimmers pull water directly into the high-pressure filtration line, sending it through glass media sand filters before returning.",
            },
          ],
        },
      },
      {
        blockType: "rich_text_jodit",
        order: 6,
        layoutStyle: "two_column_split",
        content: {
          richTextHtml:
            "<h3>Coping Tiles and Underwater Lighting Systems</h3><p>Even though skimmer pools are cost-efficient, you can elevate the design using luxury bullnose travertine edge coping tiles and RGB color-changing LED pool lights to create a gorgeous nocturnal ambiance.</p>",
        },
      },
      {
        blockType: "gallery_grid",
        order: 7,
        layoutStyle: "grid_2_col",
        content: {
          gallery: [
            {
              imageUrl:
                "https://images.unsplash.com/photo-1572331165267-854da2b10ccc?q=80&w=800&auto=format&fit=crop",
              caption: "Night illuminated skimmer pool",
              altText: "Skimmer pool at night",
            },
            {
              imageUrl:
                "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=800&auto=format&fit=crop",
              caption: "Mosaic pool bottom tiling",
              altText: "Mosaic tile pattern close-up",
            },
          ],
        },
      },
      {
        blockType: "faq_accordion",
        order: 8,
        layoutStyle: "default",
        content: {
          accordionItems: [
            {
              question: "How long does a skimmer pool take to build?",
              answer:
                "Generally, a skimmer pool takes between 4 to 6 weeks from structural excavation to final handover, depending on approval speed.",
            },
            {
              question: "Can I convert a skimmer pool to an overflow pool?",
              answer:
                "It is structurally complex and expensive because you have to break down the coping, dig structural gutter channels, and build a subterranean surge tank.",
            },
          ],
        },
      },
      {
        blockType: "cta_banner",
        order: 9,
        layoutStyle: "light_theme",
        content: {
          cta: {
            title: "Looking to Build a Skimmer Pool in Dubai?",
            description:
              "Call us today at +971 52 999 0092 for immediate expert advice!",
            buttonText: "Call Now",
            buttonLink: "tel:+971529990092",
            phoneNumber: "+971 52 999 0092",
          },
        },
      },
      {
        blockType: "contact_form",
        order: 10,
        layoutStyle: "default",
        content: {},
      },
    ],
  },
  {
    title: "End-to-End Swimming Pool Construction In Dubai",
    slug: "swimming-pool-construction",
    category: "Pools",
    isPublished: true,
    featuredImage:
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1000&auto=format&fit=crop",
    seo: {
      metaTitle:
        "Swimming Pool Construction Contractors in Dubai | Complete Pool Build",
      metaDescription:
        "Leading swimming pool construction company in Dubai. Turnkey engineering, permits, concrete shell pouring, tiling, and smart plant room automation.",
      keywords: [
        "swimming pool construction Dubai",
        "pool builder Dubai",
        "pool installation contractors",
        "villa pool construction",
      ],
      canonicalUrl:
        "https://poolsgardensuae.com/swimming-pool-construction-dubai-uae/",
      ogImage:
        "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1000&auto=format&fit=crop",
    },
    sections: [
      {
        blockType: "hero_section",
        order: 1,
        layoutStyle: "full_width",
        content: {
          hero: {
            headline: "Premier Swimming Pool Construction Company in Dubai",
            subheadline:
              "Custom concrete pool engineering, structural shell installation, and full turnkey project management.",
            bgImage:
              "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=2000&auto=format&fit=crop",
            ctaText: "Certified Pool Builders",
            ctaLink: "/contact-us",
          },
        },
      },
      {
        blockType: "rich_text_jodit",
        order: 2,
        layoutStyle: "two_column_split",
        content: {
          richTextHtml:
            "<h2>Turnkey Pool Construction Services</h2><p>Building a swimming pool is one of the most rewarding home improvement projects you can undertake in Dubai. At <strong>DFL LLC</strong>, we handle every single aspect of <strong>Swimming Pool Construction</strong> under one roof — from initial 3D architectural rendering and civil authority permitting to soil excavation, concrete shell pouring, and luxury tile finishing.</p><p>Our experienced engineers utilize heavy-gauge reinforced steel and high-pressure gunite concrete to ensure your pool structural shell stands up to soil movement, high water tables, and summer thermal expansion.</p>",
        },
      },
      {
        blockType: "technical_specs",
        order: 3,
        layoutStyle: "grid_2_col",
        content: {
          accordionItems: [
            {
              question: "Phase 1: Design & Authority Permits",
              answer:
                "3D architectural render design, soil test, structural drawing approval from Dubai Municipality / DDA.",
            },
            {
              question: "Phase 2: Excavation & Gunite Shell",
              answer:
                "Earthwork excavation, gravel base, steel rebar grid, and high-density shotcrete concrete spraying.",
            },
            {
              question: "Phase 3: Hydraulic Plumbing & Waterproofing",
              answer:
                "Installing heavy-duty PVC pipework, main drains, skimmers/gutters, and multi-layer waterproof membrane.",
            },
            {
              question: "Phase 4: Finishes, Decking & Handover",
              answer:
                "Laying Spanish mosaic tiles, granite coping, deck paving, pump room automation, and chemical balancing.",
            },
          ],
        },
      },
      {
        blockType: "gallery_grid",
        order: 4,
        layoutStyle: "grid_6_col",
        content: {
          gallery: [
            {
              imageUrl:
                "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=800&auto=format&fit=crop",
              caption: "Custom pool construction site",
              altText: "Pool construction site",
            },
            {
              imageUrl:
                "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=800&auto=format&fit=crop",
              caption: "Reinforced steel shell pouring",
              altText: "Steel shell pouring",
            },
            {
              imageUrl:
                "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=800&auto=format&fit=crop",
              caption: "Waterproofing test in progress",
              altText: "Waterproofing test",
            },
            {
              imageUrl:
                "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop",
              caption: "Tile fitting on pool floor",
              altText: "Tile fitting",
            },
            {
              imageUrl:
                "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?q=80&w=800&auto=format&fit=crop",
              caption: "Plant room pump installation",
              altText: "Pump room installation",
            },
            {
              imageUrl:
                "https://images.unsplash.com/photo-1572331165267-854da2b10ccc?q=80&w=800&auto=format&fit=crop",
              caption: "Finished pool handover in Dubai villa",
              altText: "Finished pool handover",
            },
          ],
        },
      },
      {
        blockType: "features_grid",
        order: 5,
        layoutStyle: "grid_4_col",
        content: {
          features: [
            {
              title: "Excavation & Shoring",
              description:
                "Professional earthwork excavation and structural wall shoring to secure the pool footprint.",
              iconUrl: "/icons/drill.svg",
            },
            {
              title: "Shotcrete Concrete Pouring",
              description:
                "High-density concrete gunite spraying for long-lasting structural strength.",
              iconUrl: "/icons/concrete.svg",
            },
            {
              title: "Waterproof Membrane",
              description:
                "Multi-layer waterproofing test to ensure zero leakage across decades of operation.",
              iconUrl: "/icons/shield.svg",
            },
            {
              title: "Tile Coping & Finishing",
              description:
                "Laying luxury Spanish glass mosaics and slip-resistant perimeter granite tile coping.",
              iconUrl: "/icons/tiles.svg",
            },
          ],
        },
      },
      {
        blockType: "rich_text_jodit",
        order: 6,
        layoutStyle: "container_centered",
        content: {
          richTextHtml:
            "<h3>Authority Guidelines & Master Developer Approvals</h3><p>No pool construction is allowed in Dubai without structural engineering licenses. We coordinate and acquire structural and sewage discharge approvals from Dubai Municipality, Trakhees, DDA, Nakheel, Emaar, and Dubai Properties.</p>",
        },
      },
      {
        blockType: "gallery_grid",
        order: 7,
        layoutStyle: "grid_2_col",
        content: {
          gallery: [
            {
              imageUrl:
                "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop",
              caption: "Civil excavation works",
              altText: "Civil excavation machinery",
            },
            {
              imageUrl:
                "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=800&auto=format&fit=crop",
              caption: "Ready for tiling",
              altText: "Clean shell structural pool ready for mosaic tiling",
            },
          ],
        },
      },
      {
        blockType: "faq_accordion",
        order: 8,
        layoutStyle: "default",
        content: {
          accordionItems: [
            {
              question: "Do I need approvals before building a pool in Dubai?",
              answer:
                "Yes. You must get approvals from your master developer (Emaar, Nakheel, etc.) and civil authorities (Dubai Municipality, Concordia, or Trakhees) before any structural works begin.",
            },
            {
              question: "What is structural shoring?",
              answer:
                "Shoring is a temporary structural support built to prevent sandy soils from collapsing during pool deep excavation phases.",
            },
          ],
        },
      },
      {
        blockType: "cta_banner",
        order: 9,
        layoutStyle: "dark_theme",
        content: {
          cta: {
            title: "Ready to Build Your Custom Pool in Dubai?",
            description:
              "Schedule a free consultation with our head pool engineer today!",
            buttonText: "Call Now",
            buttonLink: "tel:+971529990092",
            phoneNumber: "+971 52 999 0092",
          },
        },
      },
      {
        blockType: "contact_form",
        order: 10,
        layoutStyle: "default",
        content: {},
      },
    ],
  },
  {
    title: "Professional Swimming Pool Maintenance Services In Dubai",
    slug: "swimming-pool-maintenance",
    category: "Pools",
    isPublished: true,
    featuredImage:
      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=1000&auto=format&fit=crop",
    seo: {
      metaTitle:
        "Swimming Pool Maintenance Services Dubai | Water Treatment & Care",
      metaDescription:
        "Professional swimming pool maintenance in Dubai. Weekly water testing, filter backwashing, pump repair, chemical dosing, and plant room upkeep.",
      keywords: [
        "swimming pool maintenance Dubai",
        "pool cleaning company Dubai",
        "pool water treatment",
        "pool pump repair Dubai",
      ],
      canonicalUrl:
        "https://poolsgardensuae.com/swimming-pool-maintenance-dubai-uae/",
      ogImage:
        "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=1000&auto=format&fit=crop",
    },
    sections: [
      {
        blockType: "hero_section",
        order: 1,
        layoutStyle: "full_width",
        content: {
          hero: {
            headline:
              "Keep Your Pool Water Pristine, Safe & Crystal Clear Year-Round",
            subheadline:
              "Weekly water balancing, filtration servicing, equipment repair, and emergency 24/7 support.",
            bgImage:
              "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=2000&auto=format&fit=crop",
            ctaText: "Certified Water Technicians",
            ctaLink: "/contact-us",
          },
        },
      },
      {
        blockType: "rich_text_jodit",
        order: 2,
        layoutStyle: "container_centered",
        content: {
          richTextHtml:
            "<h2>Expert Pool Cleaning & Chemical Treatment</h2><p>Due to Dubai's warm climate, intense sun exposure, and blowing desert dust, swimming pool water requires constant monitoring and chemical precision. At <strong>DFL LLC</strong>, our certified water technicians conduct comprehensive <strong>Swimming Pool Maintenance</strong> packages for residential villas and commercial pools.</p><p>We test pH levels, total alkalinity, free chlorine, cyanuric acid, and perform regular sand filter backwashes, skimmer basket clearings, and pump seal inspections to ensure your pool remains safe and healthy for your family.</p>",
        },
      },
      {
        blockType: "features_grid",
        order: 3,
        layoutStyle: "card_grid",
        content: {
          features: [
            {
              title: "Weekly Chemical Balancing",
              description:
                "Precision chemical dosing to prevent algae, bacteria, and eye irritation.",
              iconUrl: "/icons/droplet.svg",
            },
            {
              title: "Filter & Pump Servicing",
              description:
                "Regular backwashing, media replacement, and mechanical pump inspections.",
              iconUrl: "/icons/gear.svg",
            },
            {
              title: "Surface Skimming & Vacuuming",
              description:
                "Deep floor vacuuming, wall brushing, and skimmer basket debris clearance.",
              iconUrl: "/icons/sparkles.svg",
            },
            {
              title: "24/7 Emergency Callout",
              description:
                "Fast repair support for pool equipment leaks, heater failures, or sudden water cloudiness.",
              iconUrl: "/icons/phone.svg",
            },
          ],
        },
      },
      {
        blockType: "faq_accordion",
        order: 4,
        layoutStyle: "default",
        content: {
          accordionItems: [
            {
              question: "How often should my pool be serviced in Dubai?",
              answer:
                "<p>We recommend servicing residential pools at least <strong>twice a week</strong> due to heat and blowing dust in the UAE.</p>",
            },
            {
              question: "Do you supply pool maintenance chemicals?",
              answer:
                "<p>Yes, all standard chemicals (chlorine, pH minus, algaecide) are included in our monthly packages.</p>",
            },
          ],
        },
      },
      {
        blockType: "gallery_grid",
        order: 5,
        layoutStyle: "grid_2_col",
        content: {
          gallery: [
            {
              imageUrl:
                "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=800&auto=format&fit=crop",
              caption: "Professional pool maintenance worker cleaning bottom",
              altText: "Cleaning bottom of pool",
            },
            {
              imageUrl:
                "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=800&auto=format&fit=crop",
              caption: "Chemical balancing & water sample testing",
              altText: "Water sample test",
            },
          ],
        },
      },
      {
        blockType: "rich_text_jodit",
        order: 6,
        layoutStyle: "two_column_split",
        content: {
          richTextHtml:
            "<h3>Plant Room and Sand Filter Servicing</h3><p>The mechanical pump room is the heart of the pool. Sand filter media should be backwashed weekly and replaced every 2 to 3 years to ensure optimal water flow. Automated saline chlorinators are checked for calcium build-up on titanium cells.</p>",
        },
      },
      {
        blockType: "gallery_grid",
        order: 7,
        layoutStyle: "grid_3_col",
        content: {
          gallery: [
            {
              imageUrl:
                "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?q=80&w=800&auto=format&fit=crop",
              caption: "Sand filter installation",
              altText: "Sand filters in pump room",
            },
            {
              imageUrl:
                "https://images.unsplash.com/photo-1572331165267-854da2b10ccc?q=80&w=800&auto=format&fit=crop",
              caption: "Variable speed pump testing",
              altText: "Pool pump unit checking",
            },
            {
              imageUrl:
                "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=800&auto=format&fit=crop",
              caption: "Water feed valve maintenance",
              altText: "Plumbing check valves",
            },
          ],
        },
      },
      {
        blockType: "technical_specs",
        order: 8,
        layoutStyle: "grid_1_col",
        content: {
          accordionItems: [
            {
              question: "Optimal Chemistry Parameters Target",
              answer:
                "For safe swimming, we maintain: pH 7.2-7.6, Free Chlorine 1.5-3.0 ppm, Cyanuric Acid (Stabilizer) 30-50 ppm, and Total Alkalinity 80-120 ppm.",
            },
          ],
        },
      },
      {
        blockType: "cta_banner",
        order: 9,
        layoutStyle: "accent_bg",
        content: {
          cta: {
            title: "Need Urgent Pool Maintenance or Water Chemical Balancing?",
            description:
              "Speak to our maintenance team now for flexible contract packages!",
            buttonText: "Call Now",
            buttonLink: "tel:+971529990092",
            phoneNumber: "+971 52 999 0092",
          },
        },
      },
      {
        blockType: "contact_form",
        order: 10,
        layoutStyle: "default",
        content: {},
      },
    ],
  },
  {
    title: "Custom Architectural Water Features In Dubai",
    slug: "custom-water-features",
    category: "Pools",
    isPublished: true,
    featuredImage:
      "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?q=80&w=1000&auto=format&fit=crop",
    seo: {
      metaTitle:
        "Architectural Water Features Contractors Dubai | Bespoke Water Walls",
      metaDescription:
        "Top-rated water feature designers in Dubai. Expert installation of indoor & outdoor water walls, curtain sheets, and dynamic waterfalls for premium villas.",
      keywords: [
        "water features Dubai",
        "water wall Dubai",
        "garden waterfalls",
        "pond builders Dubai",
      ],
      canonicalUrl:
        "https://poolsgardensuae.com/custom-architectural-water-features-dubai/",
      ogImage:
        "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?q=80&w=1000&auto=format&fit=crop",
    },
    sections: [
      {
        blockType: "hero_section",
        order: 1,
        layoutStyle: "full_width",
        content: {
          hero: {
            headline: "Bespoke Architectural Water Features in Dubai",
            subheadline:
              "Stunning water walls, cascades, and dynamic fountains integrated into your luxury home.",
            bgImage:
              "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?q=2000&auto=format&fit=crop",
            ctaText: "Consult Our Designer",
            ctaLink: "/contact-us",
          },
        },
      },
      {
        blockType: "rich_text_jodit",
        order: 2,
        layoutStyle: "container_centered",
        content: {
          richTextHtml:
            "<h2>Transform Your Spaces with Fluid Movements</h2><p>Integrating a custom water feature into your landscape or interior creates a calming acoustic environment and a high-end visual statement. At <strong>DFL LLC</strong>, we design engineered water structures that feature absolute precision sheeting, hidden catch basins, and advanced water filtration.</p><p>We build textured granite water walls, clear glass panels, bubble walls, and cascading architectural entry features for high-end properties in Dubai.</p>",
        },
      },
      {
        blockType: "features_grid",
        order: 3,
        layoutStyle: "grid_3_col",
        content: {
          features: [
            {
              title: "Bespoke Hydrodynamics",
              description:
                "Perfect water sheeting across flat surfaces without splashing, calibrated by pump speeds.",
              iconUrl: "/icons/adjust.svg",
            },
            {
              title: "Acoustic Insulation",
              description:
                "Designed to produce white noise that screens out city noise and creates tranquility.",
              iconUrl: "/icons/volume.svg",
            },
            {
              title: "Smart Led Integration",
              description:
                "Color-controlled LED lights illuminating cascades dynamically for evening beauty.",
              iconUrl: "/icons/star.svg",
            },
          ],
        },
      },
      {
        blockType: "gallery_grid",
        order: 4,
        layoutStyle: "grid_4_col",
        content: {
          gallery: [
            {
              imageUrl:
                "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?q=80&w=800&auto=format&fit=crop",
              caption: "Architectural entrance water cascade",
              altText: "Entrance cascade",
            },
            {
              imageUrl:
                "https://images.unsplash.com/photo-1572331165267-854da2b10ccc?q=80&w=800&auto=format&fit=crop",
              caption: "Textured granite water wall",
              altText: "Granite water wall",
            },
            {
              imageUrl:
                "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop",
              caption: "Submerged garden pond",
              altText: "Garden pond",
            },
            {
              imageUrl:
                "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=800&auto=format&fit=crop",
              caption: "Sheeting blade waterfall at pool edge",
              altText: "Blade waterfall",
            },
          ],
        },
      },
      {
        blockType: "technical_specs",
        order: 5,
        layoutStyle: "grid_2_col",
        content: {
          accordionItems: [
            {
              question: "Water Flow & Pump Calibration",
              answer:
                "Water walls require precise head-pressure adjustment to ensure uniform water sheet distribution without splitting or splashing.",
            },
            {
              question: "Bio-filtration and Chemical Balance",
              answer:
                "Even small features need clean water. We install miniature sand filters and UV sterilizers to keep water clear and prevent algae.",
            },
          ],
        },
      },
      {
        blockType: "rich_text_jodit",
        order: 6,
        layoutStyle: "two_column_split",
        content: {
          richTextHtml:
            "<h3>Indoor Water Walls and Safety Systems</h3><p>For indoor residential installations, we ensure absolute splash safety and moisture insulation. Dynamic dehumidification sensors are installed to manage local relative humidity levels.</p>",
        },
      },
      {
        blockType: "gallery_grid",
        order: 7,
        layoutStyle: "grid_2_col",
        content: {
          gallery: [
            {
              imageUrl:
                "https://images.unsplash.com/photo-1572331165267-854da2b10ccc?q=80&w=800&auto=format&fit=crop",
              caption: "Interior glass water wall",
              altText: "Glass water wall indoor",
            },
            {
              imageUrl:
                "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=800&auto=format&fit=crop",
              caption: "Modern garden fountain detailing",
              altText: "Modern fountain",
            },
          ],
        },
      },
      {
        blockType: "faq_accordion",
        order: 8,
        layoutStyle: "default",
        content: {
          accordionItems: [
            {
              question: "Do water walls splash on the floor?",
              answer:
                "No. When correctly engineered, cohesion forces keep the water sheet attached to the textured stone or glass panel all the way down into the gravel filter bed.",
            },
            {
              question: "How do you top up water features in summer?",
              answer:
                "We install automatic water make-up lines hooked to the main water supply, controlled by float switches to refill evaporated water.",
            },
          ],
        },
      },
      {
        blockType: "cta_banner",
        order: 9,
        layoutStyle: "dark_theme",
        content: {
          cta: {
            title: "Ready to Add a Water Statement to Your Property?",
            description:
              "Work with our dynamic hydro engineers for a bespoke proposal!",
            buttonText: "Request Quote",
            buttonLink: "/contact-us",
            phoneNumber: "+971 52 999 0092",
          },
        },
      },
      {
        blockType: "contact_form",
        order: 10,
        layoutStyle: "default",
        content: {},
      },
    ],
  },

  // LANDSCAPING CATEGORY (6 ITEMS)
  {
    title: "Villa Landscaping Dubai",
    slug: "villa-landscaping-dubai-uae",
    category: "Landscaping",
    isPublished: true,
    featuredImage:
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=1000&auto=format&fit=crop",
    seo: {
      metaTitle:
        "Luxury Villa Landscaping Contractors in Dubai | Custom Gardens",
      metaDescription:
        "Transform your villa garden with premium landscaping designers in Dubai. Custom outdoor living, deck paving, smart irrigation, and exotic plant design.",
      keywords: [
        "villa landscaping Dubai",
        "garden design Dubai",
        "luxury landscaping",
        "backyard designer Dubai",
      ],
      canonicalUrl: "https://poolsgardensuae.com/villa-landscaping-dubai-uae/",
      ogImage:
        "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=1000&auto=format&fit=crop",
    },
    sections: [
      {
        blockType: "hero_section",
        order: 1,
        layoutStyle: "full_width",
        content: {
          hero: {
            headline: "Luxury Villa Landscaping Contractors in Dubai",
            subheadline:
              "Bespoke garden design and custom outdoor living features tailored for your private estate.",
            bgImage:
              "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=2000&auto=format&fit=crop",
            ctaText: "Request Garden Survey",
            ctaLink: "/contact-us",
          },
        },
      },
      {
        blockType: "rich_text_jodit",
        order: 2,
        layoutStyle: "container_centered",
        content: {
          richTextHtml:
            "<h2>Turn Your Backyard into a Private Sanctuary</h2><p>At <strong>DFL LLC</strong>, we believe villa landscaping is an extension of your home's architecture. Our team blends softscaping (lawns, flowerbeds, trees) with hardscaping (stone pathways, pool decks, pergolas) to create a harmonious outdoor living environment.</p><p>We specialize in modern, tropical, Mediterranean, and contemporary desert landscape aesthetics tailored for high-end communities like Al Barari, Emirates Hills, and Arabian Ranches.</p>",
        },
      },
      {
        blockType: "features_grid",
        order: 3,
        layoutStyle: "grid_4_col",
        content: {
          features: [
            {
              title: "Custom Hardscaping",
              description:
                "Premium travertine decks, concrete pavers, pathway steps, and retaining walls built to last.",
              iconUrl: "/icons/tiles.svg",
            },
            {
              title: "Exotic Softscaping",
              description:
                "Selection of drought-resistant palms, flowering shrubs, and lush grass lawns matching Dubai's soil.",
              iconUrl: "/icons/sprout.svg",
            },
            {
              title: "Outdoor Living Spaces",
              description:
                "Sunken fire pits, built-in BBQs, outdoor kitchens, and modern shaded seating pergolas.",
              iconUrl: "/icons/home.svg",
            },
            {
              title: "Subterranean Irrigation",
              description:
                "Automated drip and spray systems controlled by smart weather-sensing panels.",
              iconUrl: "/icons/droplet.svg",
            },
          ],
        },
      },
      {
        blockType: "gallery_grid",
        order: 4,
        layoutStyle: "grid_6_col",
        content: {
          gallery: [
            {
              imageUrl:
                "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=800&auto=format&fit=crop",
              caption: "Mediterranean villa garden design",
              altText: "Mediterranean villa landscaping",
            },
            {
              imageUrl:
                "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop",
              caption: "Travertine pool deck paving",
              altText: "Travertine decking",
            },
            {
              imageUrl:
                "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=800&auto=format&fit=crop",
              caption: "Exotic palm and shrub beds",
              altText: "Palm softscaping",
            },
            {
              imageUrl:
                "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?q=80&w=800&auto=format&fit=crop",
              caption: "Sunken seating fire pit feature",
              altText: "Sunken seating pit",
            },
            {
              imageUrl:
                "https://images.unsplash.com/photo-1572331165267-854da2b10ccc?q=80&w=800&auto=format&fit=crop",
              caption: "Modern outdoor kitchen grill",
              altText: "Outdoor kitchen layout",
            },
            {
              imageUrl:
                "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=800&auto=format&fit=crop",
              caption: "Night lighting landscape view",
              altText: "Evening landscape lighting",
            },
          ],
        },
      },
      {
        blockType: "technical_specs",
        order: 5,
        layoutStyle: "grid_2_col",
        content: {
          accordionItems: [
            {
              question: "Landscape Excavation & Grading",
              answer:
                "We grade the landscape to ensure water always drains away from the villa foundation towards dedicated soakaway drains.",
            },
            {
              question: "Plant Selection & Soil Enhancement",
              answer:
                "Native soils are heavily enriched with organic compost and coco-peat before planting to optimize moisture retention and healthy growth.",
            },
          ],
        },
      },
      {
        blockType: "rich_text_jodit",
        order: 6,
        layoutStyle: "default",
        content: {
          richTextHtml:
            "<h3>Bespoke Outdoor Kitchens & Built-In BBQs</h3><p>We craft custom outdoor barbecue counters with marine-grade stainless steel frames, durable concrete counters, and weather-proof composite wood paneling. Perfect for winter hosting in Dubai.</p>",
        },
      },
      {
        blockType: "gallery_grid",
        order: 7,
        layoutStyle: "grid_2_col",
        content: {
          gallery: [
            {
              imageUrl:
                "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop",
              caption: "Paved garden pathway layout",
              altText: "Paved path layout",
            },
            {
              imageUrl:
                "https://images.unsplash.com/photo-1572331165267-854da2b10ccc?q=80&w=800&auto=format&fit=crop",
              caption: "Sunken fire pit build details",
              altText: "Fire pit construction details",
            },
          ],
        },
      },
      {
        blockType: "faq_accordion",
        order: 8,
        layoutStyle: "default",
        content: {
          accordionItems: [
            {
              question:
                "What is the difference between softscaping and hardscaping?",
              answer:
                "Softscaping includes all organic and growing elements (plants, trees, turf), while hardscaping includes solid architectural structures (decks, pavers, pergolas, stone work).",
            },
            {
              question: "How long does villa landscaping take?",
              answer:
                "A standard villa backyard project takes around 4 to 8 weeks, depending on dynamic hardscape requirements (e.g. fire pits, pergolas, concrete work).",
            },
          ],
        },
      },
      {
        blockType: "cta_banner",
        order: 9,
        layoutStyle: "accent_bg",
        content: {
          cta: {
            title: "Ready to Transform Your Villa's Landscape?",
            description:
              "Contact our landscaping architects for a tailored layout proposal today!",
            buttonText: "Get Proposal",
            buttonLink: "/contact-us",
            phoneNumber: "+971 52 999 0092",
          },
        },
      },
      {
        blockType: "contact_form",
        order: 10,
        layoutStyle: "default",
        content: {},
      },
    ],
  },
  {
    title: "Residential Landscaping Company Dubai",
    slug: "residential-landscaping-company",
    category: "Landscaping",
    isPublished: true,
    featuredImage:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop",
    seo: {
      metaTitle:
        "Residential Landscaping Services in Dubai | Home Garden Company",
      metaDescription:
        "Professional residential landscaping company in Dubai. We design beautiful, functional gardens with synthetic grass, natural turf, pavers, and decorative borders.",
      keywords: [
        "residential landscaping Dubai",
        "home garden service",
        "backyard pavers Dubai",
        "garden company",
      ],
      canonicalUrl:
        "https://poolsgardensuae.com/residential-landscaping-company/",
      ogImage:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop",
    },
    sections: [
      {
        blockType: "hero_section",
        order: 1,
        layoutStyle: "full_width",
        content: {
          hero: {
            headline: "Top-Rated Residential Landscaping Company in Dubai",
            subheadline:
              "Designing functional, low-maintenance gardens and cozy outdoor retreats for residential homes.",
            bgImage:
              "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=2000&auto=format&fit=crop",
            ctaText: "Schedule Consultation",
            ctaLink: "/contact-us",
          },
        },
      },
      {
        blockType: "rich_text_jodit",
        order: 2,
        layoutStyle: "two_column_split",
        content: {
          richTextHtml:
            "<h2>Beautiful Gardens for Everyday Family Living</h2><p>As a leading <strong>Residential Landscaping Company in Dubai</strong>, we specialize in delivering beautiful gardens that maximize usable space. We offer design packages that fit standard townhouse and villa plots in locations like Town Square, Mudon, and Mira.</p><p>From high-durability synthetic grass borders to beautiful natural turf lawns, slate paving stones, and vertical privacy green walls, we optimize your garden space for children, pets, and family barbecues.</p>",
        },
      },
      {
        blockType: "features_grid",
        order: 3,
        layoutStyle: "grid_3_col",
        content: {
          features: [
            {
              title: "Low Maintenance Paving",
              description:
                "Durable porcelain or sand-faced stone tiles laid on a concrete slab base for minimal weeding.",
              iconUrl: "/icons/tiles.svg",
            },
            {
              title: "Premium Grass Solutions",
              description:
                "High-density UV-protected artificial turf or natural Bermuda grass for year-round green lawn spaces.",
              iconUrl: "/icons/sprout.svg",
            },
            {
              title: "Vertical Greenery",
              description:
                "Elegant vertical wood screens and ivy trellis frameworks to secure garden boundary privacy.",
              iconUrl: "/icons/star.svg",
            },
          ],
        },
      },
      {
        blockType: "gallery_grid",
        order: 4,
        layoutStyle: "grid_4_col",
        content: {
          gallery: [
            {
              imageUrl:
                "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop",
              caption: "Porcelain paved patio terrace",
              altText: "Porcelain paved patio",
            },
            {
              imageUrl:
                "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=800&auto=format&fit=crop",
              caption: "Townhouse backyard layout",
              altText: "Townhouse landscape",
            },
            {
              imageUrl:
                "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=800&auto=format&fit=crop",
              caption: "Artificial turf border styling",
              altText: "Artificial turf setup",
            },
            {
              imageUrl:
                "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=800&auto=format&fit=crop",
              caption: "Boundary vertical green panels",
              altText: "Vertical green panels",
            },
          ],
        },
      },
      {
        blockType: "technical_specs",
        order: 5,
        layoutStyle: "grid_2_col",
        content: {
          accordionItems: [
            {
              question: "Artificial Turf Sub-base Prep",
              answer:
                "We excavate 10cm, lay geotextile membrane to prevent weeds, fill with compacted road-base aggregate, sand, and then secure the turf.",
            },
            {
              question: "Sub-surface Drainage Setup",
              answer:
                "Slotted drainage pipes are integrated below paved zones, carrying excess winter rain away to prevent deck flooding.",
            },
          ],
        },
      },
      {
        blockType: "rich_text_jodit",
        order: 6,
        layoutStyle: "container_centered",
        content: {
          richTextHtml:
            "<h3>Functional Pathways & Decorative Pebbles</h3><p>We combine granite stepping stones with imported grey and white decorative river pebbles to create low-maintenance, high-contrast pathways that accent garden borders.</p>",
        },
      },
      {
        blockType: "gallery_grid",
        order: 7,
        layoutStyle: "grid_2_col",
        content: {
          gallery: [
            {
              imageUrl:
                "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?q=80&w=800&auto=format&fit=crop",
              caption: "Decorative river pebble border",
              altText: "Pebble border",
            },
            {
              imageUrl:
                "https://images.unsplash.com/photo-1572331165267-854da2b10ccc?q=80&w=800&auto=format&fit=crop",
              caption: "Clean paved walking path",
              altText: "Paved walking path",
            },
          ],
        },
      },
      {
        blockType: "faq_accordion",
        order: 8,
        layoutStyle: "default",
        content: {
          accordionItems: [
            {
              question: "Is synthetic grass safe for pets?",
              answer:
                "Yes. We use premium, non-toxic, lead-free synthetic grass that has double-backed drainage holes, making it easy to wash and sanitize.",
            },
            {
              question: "How do you control weeds in gravel beds?",
              answer:
                "We install heavy-duty 120gsm woven weed-barrier geotextile membrane sheets under all gravel and river pebble zones.",
            },
          ],
        },
      },
      {
        blockType: "cta_banner",
        order: 9,
        layoutStyle: "dark_theme",
        content: {
          cta: {
            title: "Ready to Upgrade Your Home Garden Layout?",
            description:
              "Get in touch for a quick site survey and quote within 48 hours!",
            buttonText: "Book Survey",
            buttonLink: "/contact-us",
            phoneNumber: "+971 52 999 0092",
          },
        },
      },
      {
        blockType: "contact_form",
        order: 10,
        layoutStyle: "default",
        content: {},
      },
    ],
  },
  {
    title: "Gardening Services Dubai",
    slug: "gardening-services-dubai",
    category: "Landscaping",
    isPublished: true,
    featuredImage:
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=1000&auto=format&fit=crop",
    seo: {
      metaTitle:
        "Professional Gardening Services in Dubai | Expert Horticulturists",
      metaDescription:
        "Reliable gardening services in Dubai. Weekly lawn mowing, tree trimming, flower bed weeding, fertilizing, and insect control by certified gardeners.",
      keywords: [
        "gardening services Dubai",
        "villa gardener Dubai",
        "lawn mowing Dubai",
        "plant maintenance",
      ],
      canonicalUrl: "https://poolsgardensuae.com/gardening-services-dubai/",
      ogImage:
        "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=1000&auto=format&fit=crop",
    },
    sections: [
      {
        blockType: "hero_section",
        order: 1,
        layoutStyle: "full_width",
        content: {
          hero: {
            headline: "Keep Your Garden Flourishing and Beautiful Year-Round",
            subheadline:
              "Professional horticulture care, weekly maintenance, fertilizing, and professional pruning services.",
            bgImage:
              "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=2000&auto=format&fit=crop",
            ctaText: "Hire a Gardener",
            ctaLink: "/contact-us",
          },
        },
      },
      {
        blockType: "rich_text_jodit",
        order: 2,
        layoutStyle: "container_centered",
        content: {
          richTextHtml:
            "<h2>Expert Care for Your Ornamental Plants and Lawns</h2><p>Due to Dubai's harsh summer heat, a garden requires professional care. At <strong>DFL LLC</strong>, our certified horticulturists understand how to care for tropical plants, desert species, and seasonal annuals in the Middle East.</p><p>We provide comprehensive weekly or bi-weekly gardening packages that include tree pruning, grass cutting, weed control, palm tree fertilization, and irrigation checkups.</p>",
        },
      },
      {
        blockType: "features_grid",
        order: 3,
        layoutStyle: "card_grid",
        content: {
          features: [
            {
              title: "Weekly Mowing & Edging",
              description:
                "Lawn mowing, border clipping, and aerating to maintain a dense, healthy green turf.",
              iconUrl: "/icons/sprout.svg",
            },
            {
              title: "Tree Pruning & Care",
              description:
                "Trimming branches, shaping bushes, and structural pruning of bougainvillea and frangipani.",
              iconUrl: "/icons/adjust.svg",
            },
            {
              title: "Pest & Disease Control",
              description:
                "Eco-friendly spraying to control whiteflies, mealybugs, and fungal turf diseases.",
              iconUrl: "/icons/shield.svg",
            },
            {
              title: "Seasonal Planting Dosing",
              description:
                "Adding winter annuals (petunias, marigolds) and custom fertilizing with nitrogen-rich compounds.",
              iconUrl: "/icons/star.svg",
            },
          ],
        },
      },
      {
        blockType: "gallery_grid",
        order: 4,
        layoutStyle: "grid_3_col",
        content: {
          gallery: [
            {
              imageUrl:
                "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=800&auto=format&fit=crop",
              caption: "Gardener trimming ornamental shrubs",
              altText: "Pruning shrubs",
            },
            {
              imageUrl:
                "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop",
              caption: "Healthy green natural lawn maintenance",
              altText: "Green lawn care",
            },
            {
              imageUrl:
                "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=800&auto=format&fit=crop",
              caption: "Seasonal winter flower planting layout",
              altText: "Seasonal winter flowers",
            },
          ],
        },
      },
      {
        blockType: "technical_specs",
        order: 5,
        layoutStyle: "grid_1_col",
        content: {
          accordionItems: [
            {
              question: "Seasonal Pruning Timelines",
              answer:
                "Frangipani and other deciduous trees are pruned in late winter, while bougainvillea and hedge lines are trimmed every 4 weeks year-round.",
            },
            {
              question: "Organic Fertilizing Calendar",
              answer:
                "We apply organic slow-release compound fertilizer during October and February, and micro-element spray treatments as needed.",
            },
          ],
        },
      },
      {
        blockType: "rich_text_jodit",
        order: 6,
        layoutStyle: "two_column_split",
        content: {
          richTextHtml:
            "<h3>Irrigation Monitoring & Control</h3><p>A major part of our maintenance checkup is the daily monitoring of water flow. We adjust automated controller timers to adapt to seasonal evaporation changes, reducing your DEWA water bill.</p>",
        },
      },
      {
        blockType: "gallery_grid",
        order: 7,
        layoutStyle: "grid_2_col",
        content: {
          gallery: [
            {
              imageUrl:
                "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?q=80&w=800&auto=format&fit=crop",
              caption: "Checking drip emitter water line",
              altText: "Irrigation checking",
            },
            {
              imageUrl:
                "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=800&auto=format&fit=crop",
              caption: "Fertilizer soil mixing",
              altText: "Soil mixing process",
            },
          ],
        },
      },
      {
        blockType: "faq_accordion",
        order: 8,
        layoutStyle: "default",
        content: {
          accordionItems: [
            {
              question: "How often do you recommend fertilizing in Dubai?",
              answer:
                "We recommend heavy organic fertilization twice a year (autumn and spring) and liquid chemical boosts every 6-8 weeks during growing periods.",
            },
            {
              question: "Why is my grass turning yellow?",
              answer:
                "Yellow turf is usually caused by overwatering (root rot), iron deficiency (chlorosis), or fungal disease. Our horticulturists diagnose and resolve this quickly.",
            },
          ],
        },
      },
      {
        blockType: "cta_banner",
        order: 9,
        layoutStyle: "accent_bg",
        content: {
          cta: {
            title: "Looking for Reliable Gardening Maintenance Services?",
            description:
              "Get weekly garden care contracts with our experienced horticultural team!",
            buttonText: "Contact Us",
            buttonLink: "/contact-us",
            phoneNumber: "+971 52 999 0092",
          },
        },
      },
      {
        blockType: "contact_form",
        order: 10,
        layoutStyle: "default",
        content: {},
      },
    ],
  },
  {
    title: "Premium Pergola & Gazebo Construction Dubai",
    slug: "pergola-gazebo-construction-dubai",
    category: "Landscaping",
    isPublished: true,
    featuredImage:
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1000&auto=format&fit=crop",
    seo: {
      metaTitle:
        "Pergola & Gazebo Builders Dubai | Custom Wooden Shaded Structures",
      metaDescription:
        "Custom wooden & aluminum pergola builders in Dubai. Elevate your backyard with bespoke gazebo construction, composite wood decking, and luxury outdoor seating structures.",
      keywords: [
        "pergola builders Dubai",
        "wooden pergola",
        "gazebo builders Dubai",
        "aluminum pergola",
      ],
      canonicalUrl:
        "https://poolsgardensuae.com/pergola-gazebo-construction-dubai/",
      ogImage:
        "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1000&auto=format&fit=crop",
    },
    sections: [
      {
        blockType: "hero_section",
        order: 1,
        layoutStyle: "full_width",
        content: {
          hero: {
            headline: "Custom Pergola & Gazebo Builders in Dubai",
            subheadline:
              "Bespoke wooden, aluminum, and composite outdoor shaded structures custom built for villa gardens.",
            bgImage:
              "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=2000&auto=format&fit=crop",
            ctaText: "Request Structure Quote",
            ctaLink: "/contact-us",
          },
        },
      },
      {
        blockType: "rich_text_jodit",
        order: 2,
        layoutStyle: "container_centered",
        content: {
          richTextHtml:
            "<h2>Expand Your Villa Living Area to the Outdoors</h2><p>Pergolas and gazebos provide essential shade during hot months while adding architectural structure to your garden layout. At <strong>DFL LLC</strong>, we construct custom wooden structures, modern powder-coated aluminum biophilic units, and composite timber frames built to resist weather oxidation.</p><p>Whether you want a poolside gazebo with dynamic louvered panels or a cozy wooden trellis pathway, our carpenters deliver precision craftsmanship.</p>",
        },
      },
      {
        blockType: "features_grid",
        order: 3,
        layoutStyle: "grid_3_col",
        content: {
          features: [
            {
              title: "Weather-Resistant Wood",
              description:
                "Constructed with premium Swedish pine, Red Meranti, or Canadian cedar wood treated against dry-rot.",
              iconUrl: "/icons/home.svg",
            },
            {
              title: "Louvered Aluminum Units",
              description:
                "Automated louver panels that open and close at the touch of a button to manage light.",
              iconUrl: "/icons/adjust.svg",
            },
            {
              title: "Composite Timber Decks",
              description:
                "Eco-friendly wood-plastic composite (WPC) flooring decks that never splinter or fade in the sun.",
              iconUrl: "/icons/tiles.svg",
            },
          ],
        },
      },
      {
        blockType: "gallery_grid",
        order: 4,
        layoutStyle: "grid_4_col",
        content: {
          gallery: [
            {
              imageUrl:
                "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=800&auto=format&fit=crop",
              caption: "Modern pool wooden gazebo",
              altText: "Pool gazebo",
            },
            {
              imageUrl:
                "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=800&auto=format&fit=crop",
              caption: "Modern louvered aluminum pergola",
              altText: "Aluminum pergola",
            },
            {
              imageUrl:
                "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=800&auto=format&fit=crop",
              caption: "Shaded garden seating dining setup",
              altText: "Shaded seating",
            },
            {
              imageUrl:
                "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop",
              caption: "Composite wood deck layout",
              altText: "WPC deck layout",
            },
          ],
        },
      },
      {
        blockType: "technical_specs",
        order: 5,
        layoutStyle: "grid_2_col",
        content: {
          accordionItems: [
            {
              question: "Structural Anchoring Standards",
              answer:
                "All post pillars are anchored to concrete footings with heavy-gauge galvanized steel bracket plates below deck level to withstand wind load shear.",
            },
            {
              question: "Protective Coating Processes",
              answer:
                "Wooden surfaces receive 3 layers of marine-grade polyurethane oil stain sealer, providing protection against desert UV rays and moisture.",
            },
          ],
        },
      },
      {
        blockType: "rich_text_jodit",
        order: 6,
        layoutStyle: "two_column_split",
        content: {
          richTextHtml:
            "<h3>Pergola Lighting & Power Options</h3><p>We integrate hidden wiring conduit layouts to support dimmable LED spotlight trims, ceiling fans, surround sound speakers, and weatherproof outdoor power outlets.</p>",
        },
      },
      {
        blockType: "gallery_grid",
        order: 7,
        layoutStyle: "grid_2_col",
        content: {
          gallery: [
            {
              imageUrl:
                "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?q=80&w=800&auto=format&fit=crop",
              caption: "LED lights under gazebo roof",
              altText: "Gazebo lighting",
            },
            {
              imageUrl:
                "https://images.unsplash.com/photo-1572331165267-854da2b10ccc?q=80&w=800&auto=format&fit=crop",
              caption: "Carpentry framing construction",
              altText: "Carpentry framing works",
            },
          ],
        },
      },
      {
        blockType: "faq_accordion",
        order: 8,
        layoutStyle: "default",
        content: {
          accordionItems: [
            {
              question: "What is the best wood for a pergola in Dubai?",
              answer:
                "Canadian Cedar and Treated Redwood are highly recommended because of their natural oils that resist termites, warping, and dry-rot under intense heat.",
            },
            {
              question: "Do I need municipality approvals to build a pergola?",
              answer:
                "Yes. Any fixed permanent shaded structure exceeding 15 sqm requires NOC approval from your developer and Dubai Municipality permission.",
            },
          ],
        },
      },
      {
        blockType: "cta_banner",
        order: 9,
        layoutStyle: "dark_theme",
        content: {
          cta: {
            title: "Ready to Upgrade Your Garden Shaded Seating?",
            description:
              "Work with our custom carpentry specialists for a bespoke proposal!",
            buttonText: "Call Now",
            buttonLink: "tel:+971529990092",
            phoneNumber: "+971 52 999 0092",
          },
        },
      },
      {
        blockType: "contact_form",
        order: 10,
        layoutStyle: "default",
        content: {},
      },
    ],
  },
  {
    title: "Smart Irrigation & Watering Systems Dubai",
    slug: "smart-irrigation-systems-dubai",
    category: "Landscaping",
    isPublished: true,
    featuredImage:
      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=1000&auto=format&fit=crop",
    seo: {
      metaTitle: "Smart Irrigation System Installation Dubai | Drip & Spray",
      metaDescription:
        "Save water with automated smart irrigation systems in Dubai. Installation of drip lines, pop-up sprinklers, rain sensors, and WiFi-connected controllers.",
      keywords: [
        "irrigation system Dubai",
        "automatic sprinkler system",
        "drip irrigation Dubai",
        "irrigation repair",
      ],
      canonicalUrl:
        "https://poolsgardensuae.com/smart-irrigation-systems-dubai/",
      ogImage:
        "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=1000&auto=format&fit=crop",
    },
    sections: [
      {
        blockType: "hero_section",
        order: 1,
        layoutStyle: "full_width",
        content: {
          hero: {
            headline: "Smart Irrigation & Automatic Watering Systems Dubai",
            subheadline:
              "High-efficiency drip & spray systems engineered to keep your garden lush while minimizing water consumption.",
            bgImage:
              "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=2000&auto=format&fit=crop",
            ctaText: "Request Irrigation Check",
            ctaLink: "/contact-us",
          },
        },
      },
      {
        blockType: "rich_text_jodit",
        order: 2,
        layoutStyle: "container_centered",
        content: {
          richTextHtml:
            "<h2>Custom Irrigation Engineering for Desert Climates</h2><p>Lush landscaping in Dubai requires precise water management. At <strong>DFL LLC</strong>, we design, install, and service automatic irrigation systems. We utilize smart WiFi controllers (e.g. Hunter, Rain Bird) that calculate local weather evaporation changes to optimize water delivery.</p><p>From root-level drip lines that eliminate evaporation losses to heavy-duty pop-up sprinklers for grass lawns, we structure efficient zones that prevent water pooling.</p>",
        },
      },
      {
        blockType: "features_grid",
        order: 3,
        layoutStyle: "card_grid",
        content: {
          features: [
            {
              title: "Targeted Drip Irrigation",
              description:
                "Pressure-compensating emitter lines that deliver water directly to plant roots, eliminating evaporation.",
              iconUrl: "/icons/droplet.svg",
            },
            {
              title: "Pop-Up Lawn Sprinklers",
              description:
                "Heavy-duty gear-driven spray rotors that distribute water uniformly across grass lawn areas.",
              iconUrl: "/icons/water.svg",
            },
            {
              title: "Smart WiFi Controllers",
              description:
                "Irrigation timers managed via smart phone app, adjusting automatically according to local rain levels.",
              iconUrl: "/icons/gear.svg",
            },
            {
              title: "Pressure Regulator Valves",
              description:
                "High-efficiency solenoid control valves that maintain uniform pressure and prevent line blowouts.",
              iconUrl: "/icons/shield.svg",
            },
          ],
        },
      },
      {
        blockType: "gallery_grid",
        order: 4,
        layoutStyle: "grid_4_col",
        content: {
          gallery: [
            {
              imageUrl:
                "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=800&auto=format&fit=crop",
              caption: "Pop-up lawn sprinkler spraying",
              altText: "Sprinkler spraying lawn",
            },
            {
              imageUrl:
                "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=800&auto=format&fit=crop",
              caption: "Automatic solenoid control valve box",
              altText: "Solenoid valve box",
            },
            {
              imageUrl:
                "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=800&auto=format&fit=crop",
              caption: "Drip line installation around palm root",
              altText: "Drip line installation",
            },
            {
              imageUrl:
                "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=800&auto=format&fit=crop",
              caption: "Smart wall controller setup panel",
              altText: "Smart controller panel",
            },
          ],
        },
      },
      {
        blockType: "technical_specs",
        order: 5,
        layoutStyle: "grid_2_col",
        content: {
          accordionItems: [
            {
              question: "Zoning & Hydraulic Pressure Layout",
              answer:
                "We split systems into softscape drip zones and lawn spray zones to match the specific pressure and precipitation demands of different plants.",
            },
            {
              question: "Durable Material Specification",
              answer:
                "All underground pipes are composed of high-strength HDPE/UPVC pipes that withstand soil settlement pressure.",
            },
          ],
        },
      },
      {
        blockType: "rich_text_jodit",
        order: 6,
        layoutStyle: "two_column_split",
        content: {
          richTextHtml:
            "<h3>Pressure Reduction & Backflow Prevention</h3><p>We integrate high-grade backflow preventers to isolate pool and landscape watering loops from the clean municipal drinking supply, complying with city regulations.</p>",
        },
      },
      {
        blockType: "gallery_grid",
        order: 7,
        layoutStyle: "grid_2_col",
        content: {
          gallery: [
            {
              imageUrl:
                "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?q=80&w=800&auto=format&fit=crop",
              caption: "Underground pipe excavation layout",
              altText: "Pipe excavation works",
            },
            {
              imageUrl:
                "https://images.unsplash.com/photo-1572331165267-854da2b10ccc?q=80&w=800&auto=format&fit=crop",
              caption: "Rotary lawn sprinkler adjustment",
              altText: "Sprinkler adjustment detailing",
            },
          ],
        },
      },
      {
        blockType: "faq_accordion",
        order: 8,
        layoutStyle: "default",
        content: {
          accordionItems: [
            {
              question: "How much water can a smart controller save?",
              answer:
                "WiFi smart controllers save up to 30-40% of water costs by altering program times using weather algorithms and avoiding watering on windy days.",
            },
            {
              question: "What causes loss of sprinkler spray range?",
              answer:
                "Spray range drop is typically due to clogged nozzle filter baskets, underground line leaks, or solenoid valve wear. Our diagnostic checks identify the source quickly.",
            },
          ],
        },
      },
      {
        blockType: "cta_banner",
        order: 9,
        layoutStyle: "accent_bg",
        content: {
          cta: {
            title: "Need a High Efficiency Smart Irrigation System?",
            description:
              "Get in touch with our irrigation engineers for a dynamic water audit today!",
            buttonText: "Schedule Audit",
            buttonLink: "/contact-us",
            phoneNumber: "+971 52 999 0092",
          },
        },
      },
      {
        blockType: "contact_form",
        order: 10,
        layoutStyle: "default",
        content: {},
      },
    ],
  },
  {
    title: "Landscape Lighting Services Dubai",
    slug: "landscape-lighting-services-dubai",
    category: "Landscaping",
    isPublished: true,
    featuredImage:
      "https://images.unsplash.com/photo-1572331165267-854da2b10ccc?q=80&w=1000&auto=format&fit=crop",
    seo: {
      metaTitle: "Landscape Lighting Services Dubai | Outdoor Garden Lighting",
      metaDescription:
        "Professional landscape lighting design in Dubai. Enhance your garden, walls, paths, and trees with premium low-voltage LED lights and brass fixture highlights.",
      keywords: [
        "landscape lighting Dubai",
        "outdoor lighting company",
        "garden LED lights",
        "villa exterior lighting",
      ],
      canonicalUrl:
        "https://poolsgardensuae.com/landscape-lighting-services-dubai/",
      ogImage:
        "https://images.unsplash.com/photo-1572331165267-854da2b10ccc?q=80&w=1000&auto=format&fit=crop",
    },
    sections: [
      {
        blockType: "hero_section",
        order: 1,
        layoutStyle: "full_width",
        content: {
          hero: {
            headline: "Landscape Lighting Design & Installation Services",
            subheadline:
              "Transform your outdoor villa space at night with premium low-voltage LED path lights and spotlights.",
            bgImage:
              "https://images.unsplash.com/photo-1572331165267-854da2b10ccc?q=2000&auto=format&fit=crop",
            ctaText: "Request Lighting Design",
            ctaLink: "/contact-us",
          },
        },
      },
      {
        blockType: "rich_text_jodit",
        order: 2,
        layoutStyle: "container_centered",
        content: {
          richTextHtml:
            "<h2>Add Dimension and Safety to Your Gardens at Night</h2><p>Great landscape lighting is not about quantity, but placement and color temperature. At <strong>DFL LLC</strong>, our exterior design team creates high-end lighting layouts using low-voltage (12V/24V) LED lighting systems.</p><p>We structure highlights using upland spotlights on palm tree trunks, downward shadow fixtures on stone walls, and linear step lights for pathways and patio steps, making your garden look spectacular at night.</p>",
        },
      },
      {
        blockType: "features_grid",
        order: 3,
        layoutStyle: "grid_3_col",
        content: {
          features: [
            {
              title: "Bespoke Uplighting",
              description:
                "Highlighting architectural trees, palms, and wall facades with focused LED directional spotlights.",
              iconUrl: "/icons/star.svg",
            },
            {
              title: "Path & Step Safety",
              description:
                "Installing warm light fixtures along paths, steps, and decks to prevent slips.",
              iconUrl: "/icons/home.svg",
            },
            {
              title: "Solid Brass Fixtures",
              description:
                "IP67 waterproof, corrosion-resistant brass fixtures built to withstand dust and moisture.",
              iconUrl: "/icons/shield.svg",
            },
          ],
        },
      },
      {
        blockType: "gallery_grid",
        order: 4,
        layoutStyle: "grid_4_col",
        content: {
          gallery: [
            {
              imageUrl:
                "https://images.unsplash.com/photo-1572331165267-854da2b10ccc?q=80&w=800&auto=format&fit=crop",
              caption: "Uplighting along palm trunk rows",
              altText: "Palm uplighting",
            },
            {
              imageUrl:
                "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=800&auto=format&fit=crop",
              caption: "Illuminated backyard villa decking",
              altText: "Backyard deck lights",
            },
            {
              imageUrl:
                "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=800&auto=format&fit=crop",
              caption: "Pathway linear post lights styling",
              altText: "Path linear lights",
            },
            {
              imageUrl:
                "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop",
              caption: "Staircase recessed warning lights",
              altText: "Staircase warning lights",
            },
          ],
        },
      },
      {
        blockType: "technical_specs",
        order: 5,
        layoutStyle: "grid_2_col",
        content: {
          accordionItems: [
            {
              question: "Low-Voltage Power Isolation",
              answer:
                "All exterior circuits run at safe 12V/24V levels using step-down transformers, protecting children and pets from electrical hazards.",
            },
            {
              question: "Outdoor Cabling Standards",
              answer:
                "Wiring is enclosed in flexible PVC conduits buried at a minimum depth of 45cm below finish grade to prevent spade damage.",
            },
          ],
        },
      },
      {
        blockType: "rich_text_jodit",
        order: 6,
        layoutStyle: "two_column_split",
        content: {
          richTextHtml:
            "<h3>Smart App & Timer Controls</h3><p>We supply smart power panels that interface with home automation units, allowing astronomical timer offsets that activate lights at sunset.</p>",
        },
      },
      {
        blockType: "gallery_grid",
        order: 7,
        layoutStyle: "grid_2_col",
        content: {
          gallery: [
            {
              imageUrl:
                "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=800&auto=format&fit=crop",
              caption: "Warm white illumination contrast",
              altText: "Illumination contrast",
            },
            {
              imageUrl:
                "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?q=80&w=800&auto=format&fit=crop",
              caption: "Waterproof transformer wiring box",
              altText: "Transformer box wiring",
            },
          ],
        },
      },
      {
        blockType: "faq_accordion",
        order: 8,
        layoutStyle: "default",
        content: {
          accordionItems: [
            {
              question:
                "What is the best light color temperature for landscape?",
              answer:
                "We recommend 2700K (warm white) for lawns and trees to highlight rich natural colors, and 3000K for walkways and modern structures.",
            },
            {
              question: "Are solar landscape lights sufficient?",
              answer:
                "Generally, solar lights lack the lumen output and duration required to illuminate tall trees or facade profiles, especially in shaded garden corners.",
            },
          ],
        },
      },
      {
        blockType: "cta_banner",
        order: 9,
        layoutStyle: "dark_theme",
        content: {
          cta: {
            title: "Ready to Illuminate Your Outdoor Space?",
            description:
              "Work with our specialized lighting designers for a custom nocturnal plan!",
            buttonText: "Schedule Survey",
            buttonLink: "/contact-us",
            phoneNumber: "+971 52 999 0092",
          },
        },
      },
      {
        blockType: "contact_form",
        order: 10,
        layoutStyle: "default",
        content: {},
      },
    ],
  },
];

export function getServiceDetailBySlug(slug: string): ServiceData | undefined {
  if (!slug) return undefined;
  const normalizedSlug = slug.toLowerCase().trim();

  // 1. Direct slug match
  for (const item of serviceData) {
    if (item.slug.toLowerCase().trim() === normalizedSlug) return item;
  }

  // 2. Alias match
  for (const item of serviceData) {
    if (
      item.aliases?.some(
        (alias) => alias.toLowerCase().trim() === normalizedSlug,
      )
    )
      return item;
  }

  // 3. Fallback partial match
  for (const item of serviceData) {
    if (
      item.slug.toLowerCase().includes(normalizedSlug) ||
      normalizedSlug.includes(item.slug.toLowerCase())
    ) {
      return item;
    }
  }

  return undefined;
}

export function getAllServiceSlugs(): string[] {
  const slugsSet = new Set<string>();
  serviceData.forEach((item) => {
    if (item.slug) slugsSet.add(item.slug);
    if (item.aliases) item.aliases.forEach((alias) => slugsSet.add(alias));
  });
  return Array.from(slugsSet);
}

// Keep legacy mappings for compatibility
export const poolsDetailData = serviceData;
export const getPoolDetailBySlug = getServiceDetailBySlug;
export const getAllPoolSlugs = getAllServiceSlugs;
