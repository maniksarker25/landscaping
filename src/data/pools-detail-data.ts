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

export const poolsDetailData: Record<string, PoolDetailData> = {
  "infinity-swimming-pool": {
    slug: "infinity-swimming-pool",
    aliases: ["infinity", "infinity-pool"],
    title: "Looking For Infinity Swimming Pool Contractors In Dubai?",
    subtitle: "Engineered vanishing-edge pools that seamlessly blend water, horizon, and modern architecture.",
    heroImage: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=2000&auto=format&fit=crop",
    badge: "Premier Infinity Edge Builders",
    description: "Bespoke infinity edge swimming pools designed and constructed for luxury Dubai villas and commercial developments.",
    seo: {
      metaTitle: "Infinity Swimming Pool Contractors in Dubai | Bespoke Vanishing Edge Pools",
      metaDescription: "Top-rated infinity swimming pool design & construction contractors in Dubai. Custom engineered vanishing edge pools, glass wall features, and luxury landscape integration.",
      keywords: ["infinity pool Dubai", "infinity pool contractors Dubai", "vanishing edge pool build", "luxury swimming pool Dubai"],
    },
    googleReviews: defaultGoogleReviews,
    sections: [
      {
        id: "intro",
        type: "rich-text",
        title: "Your Search Ends Right Here! Looking for a Pool Company in Dubai",
        contentHtml: `
          <p class="text-base sm:text-lg text-foreground/80 leading-relaxed">
            Searching for premier <strong>Infinity Swimming Pool Contractors in Dubai</strong>? You have landed in the right place. At <strong>Poolscape & Landscaping LLC</strong>, we specialize in conceptualizing, engineering, and constructing architectural infinity edge pools that create a breathtaking illusion of water dropping straight into the horizon.
          </p>
          <p class="text-base sm:text-lg text-foreground/80 leading-relaxed mt-4">
            Whether your property overlooks a golf course, cityscape skyline, or private garden, an infinity pool transforms your outdoor space into a resort-level retreat. Our structural engineers ensure perfect hydraulic balance, surge tank design, and leak-proof waterproofing tailored specifically to Dubai's soil and hot weather conditions.
          </p>
        `,
      },
      {
        id: "intro-gallery",
        type: "gallery-6grid",
        images: [
          { src: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=800&auto=format&fit=crop", alt: "Infinity pool overview with modern villa" },
          { src: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=800&auto=format&fit=crop", alt: "Sunset view infinity pool edge" },
          { src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop", alt: "Luxury villa pool with loungers" },
          { src: "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?q=80&w=800&auto=format&fit=crop", alt: "Glass edge infinity pool" },
          { src: "https://images.unsplash.com/photo-1572331165267-854da2b10ccc?q=80&w=800&auto=format&fit=crop", alt: "Modern villa courtyard pool" },
          { src: "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=800&auto=format&fit=crop", alt: "Illuminated evening infinity pool" },
        ],
      },
      {
        id: "why-choose",
        type: "rich-text",
        title: "Why Choose Infinity Pools?",
        contentHtml: `
          <ul class="space-y-3 my-4 text-foreground/85">
            <li class="flex items-start gap-3">
              <span class="inline-block mt-1 text-primary font-bold">✔</span>
              <span><strong>Unrivaled Aesthetic Beauty:</strong> The zero-edge vanishing line produces a sleek visual mirror effect that enhances your property's overall architectural value.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="inline-block mt-1 text-primary font-bold">✔</span>
              <span><strong>Continuous Water Circulation:</strong> Water constantly flows over the weir edge into a hidden catch basin, preventing stagnant surface debris.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="inline-block mt-1 text-primary font-bold">✔</span>
              <span><strong>Customizable Features:</strong> Integrate sunken fire pits, submerged LED ambient lights, perimeter glass walls, and hydrotherapy jets.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="inline-block mt-1 text-primary font-bold">✔</span>
              <span><strong>Precision Hydraulic Engineering:</strong> Designed with heavy-duty variable speed pumps, automated surge tank monitoring, and salt-chlorine generators.</span>
            </li>
          </ul>
        `,
      },
      {
        id: "cta-callout-1",
        type: "cta-callout",
        cta: {
          headline: "Looking for Infinity Pool Contractors in Dubai?",
          subline: "Call us today to schedule a free site survey & 3D consultation!",
          phoneNumber: "+971529990092",
          phoneDisplay: "+971 52 999 0092",
          buttonText: "Call Now",
        },
      },
      {
        id: "designing-dream",
        type: "rich-text",
        title: "Designing Your Dream Infinity Pool",
        contentHtml: `
          <p class="text-base sm:text-lg text-foreground/80 leading-relaxed">
            Our architectural team works directly with villa owners, developers, and architects to bring dynamic swimming pool ideas to life. From choosing Spanish ceramic mosaic tiles, natural granite coping stone, to custom acrylic transparent pool walls, we provide a complete turnkey solution from Municipality approvals to final commissioning.
          </p>
        `,
      },
      {
        id: "design-images",
        type: "side-by-side-images",
        images: [
          { src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop", alt: "Illuminated step entry pool" },
          { src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop", alt: "Sunset beach style infinity edge" },
        ],
      },
      {
        id: "process",
        type: "process-timeline",
        title: "The Process Of Infinity Swimming Pool Construction",
        subtitle: "A systematic 4-step engineering approach ensuring safety, durability, and flawless execution.",
        processSteps: [
          {
            stepNumber: 1,
            title: "Site Survey & Engineering Design",
            description: "Geotechnical soil testing, 3D architectural renders, structural concrete calculations, and local Dubai authority permits.",
          },
          {
            stepNumber: 2,
            title: "Excavation, Steel Mesh & Gunite Shell",
            description: "Precision excavation, double-layer reinforced steel rebar cage construction, and high-strength shotcrete/gunite pouring.",
          },
          {
            stepNumber: 3,
            title: "Waterproofing & Premium Finishes",
            description: "Multi-layer crystalline waterproofing membrane, surge tank plumbing, hand-laid glass mosaics, and natural stone edge coping.",
          },
          {
            stepNumber: 4,
            title: "Plant Room Setup & Commissioning",
            description: "Installation of high-efficiency pumps, sand/cartridge filters, automation controllers, water chemical balancing, and owner handover.",
          },
        ],
      },
      {
        id: "recent-work",
        type: "gallery-6grid",
        title: "Get Inspired By Our Recent Work",
        images: [
          { src: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=800&auto=format&fit=crop", alt: "Recent villa infinity pool project" },
          { src: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=800&auto=format&fit=crop", alt: "Palm Jumeirah luxury pool build" },
          { src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop", alt: "Emirates Hills residential pool" },
          { src: "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?q=80&w=800&auto=format&fit=crop", alt: "Modern sleek vanishing pool" },
          { src: "https://images.unsplash.com/photo-1572331165267-854da2b10ccc?q=80&w=800&auto=format&fit=crop", alt: "Jumeirah Golf Estates pool design" },
          { src: "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=800&auto=format&fit=crop", alt: "Dubai Hills villa landscaping with pool" },
        ],
      },
      {
        id: "features",
        type: "features-list",
        title: "Infinity Pool Features and Enhancements",
        features: [
          { title: "Glass Panel Edge Walls", description: "Seamless structural acrylic or tempered glass panels creating a floating water perspective." },
          { title: "Perimeter LED Illumination", description: "Programmable RGBW underwater spotlights for vibrant nighttime ambiance." },
          { title: "Integrated Sunken Loungers", description: "Shallow tanning ledges (baja shelves) crafted inside the pool perimeter." },
          { title: "Automated Heat & Chill Systems", description: "Keep water at a comfortable 28°C all year round despite Dubai summer heat." },
        ],
      },
      {
        id: "trust-reviews-section",
        type: "trust-reviews",
        title: "What Makes Us The Leading Infinity Swimming Pool Contractor?",
      },
    ],
  },

  "overflow-swimming-pool": {
    slug: "overflow-swimming-pool",
    aliases: ["overflow", "overflow-pool"],
    title: "Searching For The Premier Overflow Swimming Pool Contractor In Dubai!",
    subtitle: "Glass-like water surface level pools engineered for continuous perimeter filtration and luxury modern aesthetic.",
    heroImage: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=2000&auto=format&fit=crop",
    badge: "Master Overflow Pool Engineers",
    description: "Expert overflow pool builders in Dubai specializing in perimeter slot drains, stone channels, and whisper-quiet recirculation systems.",
    seo: {
      metaTitle: "Overflow Swimming Pool Contractor in Dubai | Perimeter Channel Pools",
      metaDescription: "Premier overflow swimming pool contractor in Dubai. Experience crystal-clear water with 360-degree perimeter overflow channels, stone gratings, and custom pool engineering.",
      keywords: ["overflow pool Dubai", "overflow swimming pool contractor", "perimeter channel pool", "deck slot pool Dubai"],
    },
    googleReviews: defaultGoogleReviews,
    sections: [
      {
        id: "intro",
        type: "rich-text",
        title: "Keep Swimming and Enjoying a Premium Overflow Pool in Dubai",
        contentHtml: `
          <p class="text-base sm:text-lg text-foreground/80 leading-relaxed">
            An <strong>Overflow Swimming Pool</strong> is the pinnacle of luxury water design. Unlike traditional skimmer pools where the water line is located several inches below the coping, an overflow pool maintains water flush with the surrounding patio deck, creating a mirror-like finish across the entire surface.
          </p>
          <p class="text-base sm:text-lg text-foreground/80 leading-relaxed mt-4">
            At <strong>Poolscape LLC</strong>, we construct state-of-the-art overflow pools with custom stone channel grates, subterranean surge tanks, and high-efficiency filtration units tailored for private villas in Arabian Ranches, Dubai Hills, and Jumeirah.
          </p>
        `,
      },
      {
        id: "intro-gallery",
        type: "gallery-6grid",
        images: [
          { src: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=800&auto=format&fit=crop", alt: "Overflow pool surface level with deck" },
          { src: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=800&auto=format&fit=crop", alt: "Perimeter overflow channel with granite tiles" },
          { src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop", alt: "Modern villa overflow pool landscape" },
          { src: "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?q=80&w=800&auto=format&fit=crop", alt: "Slot channel overflow detail" },
          { src: "https://images.unsplash.com/photo-1572331165267-854da2b10ccc?q=80&w=800&auto=format&fit=crop", alt: "Evening lighted overflow pool" },
          { src: "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=800&auto=format&fit=crop", alt: "Villa poolside overflow setup" },
        ],
      },
      {
        id: "why-choose",
        type: "rich-text",
        title: "Why Opt for One-Flow Swimming Pools in Dubai?",
        contentHtml: `
          <ul class="space-y-3 my-4 text-foreground/85">
            <li class="flex items-start gap-3">
              <span class="inline-block mt-1 text-primary font-bold">✔</span>
              <span><strong>Superior Water Clarity:</strong> 360-degree perimeter surface skim removes dust, leaves, and oils instantly before they can sink.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="inline-block mt-1 text-primary font-bold">✔</span>
              <span><strong>Zero Water Level Dip:</strong> The pool water remains constantly level with your patio deck for a seamless visual transition.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="inline-block mt-1 text-primary font-bold">✔</span>
              <span><strong>Quieter Hydraulics:</strong> Perimeter channel drainage reduces water turbulence and splash back during heavy swimming.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="inline-block mt-1 text-primary font-bold">✔</span>
              <span><strong>Surge Tank Protection:</strong> Captures displaced pool water during large gatherings without any water loss.</span>
            </li>
          </ul>
        `,
      },
      {
        id: "cta-callout-1",
        type: "cta-callout",
        cta: {
          headline: "Looking for Overflow Swimming Pool Contractors in Dubai?",
          subline: "Contact our senior engineers today for a custom estimate!",
          phoneNumber: "+971529990092",
          phoneDisplay: "+971 52 999 0092",
          buttonText: "Call Now",
        },
      },
      {
        id: "advantages",
        type: "side-by-side-images",
        images: [
          { src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop", alt: "Perimeter slot grate finish" },
          { src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop", alt: "Overflow pool with travertine deck" },
        ],
      },
      {
        id: "process",
        type: "process-timeline",
        title: "Leading The Way In Overflow Swimming Pool Construction in Dubai",
        subtitle: "Precision engineering from underground surge tanks to flush stone perimeter slots.",
        processSteps: [
          {
            stepNumber: 1,
            title: "Structural & Hydraulic Engineering",
            description: "Determining surge tank volume, pump head calculations, and slab reinforcements signed by chartered Dubai engineers.",
          },
          {
            stepNumber: 2,
            title: "Concrete Shell & Perimeter Channel Formwork",
            description: "Forming the main pool vessel alongside the outer overflow gutter channel and balance tank.",
          },
          {
            stepNumber: 3,
            title: "Double Membrane Waterproofing & Tiling",
            description: "Full tanking test followed by installation of non-porous glass ceramic tiles and custom slot covers.",
          },
          {
            stepNumber: 4,
            title: "Automated Balancing & Water Handover",
            description: "Calibrating auto-fill sensors, water chemistry controls, and providing complete client training.",
          },
        ],
      },
      {
        id: "recent-work",
        type: "gallery-6grid",
        title: "Get Inspired By Our Recent Work",
        images: [
          { src: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=800&auto=format&fit=crop", alt: "Completed overflow pool project" },
          { src: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=800&auto=format&fit=crop", alt: "Luxury villa garden overflow pool" },
          { src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop", alt: "Modern overflow pool night view" },
          { src: "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?q=80&w=800&auto=format&fit=crop", alt: "Surge tank overflow setup" },
          { src: "https://images.unsplash.com/photo-1572331165267-854da2b10ccc?q=80&w=800&auto=format&fit=crop", alt: "Custom marble edge pool" },
          { src: "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=800&auto=format&fit=crop", alt: "Residential villa pool build" },
        ],
      },
      {
        id: "trust-reviews-section",
        type: "trust-reviews",
        title: "Why Choose Us For Your Overflow Swimming Pool?",
      },
    ],
  },

  "skimmer-swimming-pool": {
    slug: "skimmer-swimming-pool",
    aliases: ["skimmer", "skimmer-pool"],
    title: "Looking For Skimmer Swimming Pool Contractors In Dubai?",
    subtitle: "Classic, reliable, and cost-effective swimming pool solutions designed for family villas.",
    heroImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2000&auto=format&fit=crop",
    badge: "Classic Pool Specialists",
    description: "High quality skimmer pool design, construction, and maintenance across Dubai. Fast installation, low operational cost, and elegant finishes.",
    seo: {
      metaTitle: "Skimmer Swimming Pool Contractors in Dubai | Cost Effective Pools",
      metaDescription: "Reliable skimmer swimming pool contractors in Dubai. Custom built skimmer pools with heavy-duty filtration, durable coping tiles, and low maintenance overhead.",
      keywords: ["skimmer pool Dubai", "skimmer swimming pool contractor", "budget pool build Dubai", "family swimming pool"],
    },
    googleReviews: defaultGoogleReviews,
    sections: [
      {
        id: "intro",
        type: "rich-text",
        title: "Your Account Pool & Gardens Landscaping LLC Has You Covered!",
        contentHtml: `
          <p class="text-base sm:text-lg text-foreground/80 leading-relaxed">
            <strong>Skimmer Swimming Pools</strong> remain one of the most popular choices for villa owners across Dubai due to their engineering simplicity, rapid construction timeline, and cost-effective maintenance. In a skimmer pool, surface water is drawn into built-in skimmer boxes located near the top of the pool wall.
          </p>
          <p class="text-base sm:text-lg text-foreground/80 leading-relaxed mt-4">
            At <strong>Poolscape LLC</strong>, we craft custom skimmer pools that blend durability with high aesthetics — featuring luxury glass mosaics, LED lights, water fountains, and smart filtration plant rooms.
          </p>
        `,
      },
      {
        id: "intro-gallery",
        type: "gallery-6grid",
        images: [
          { src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop", alt: "Skimmer pool overview in villa" },
          { src: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=800&auto=format&fit=crop", alt: "Custom skimmer pool with sun loungers" },
          { src: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=800&auto=format&fit=crop", alt: "Family backyard skimmer pool" },
          { src: "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?q=80&w=800&auto=format&fit=crop", alt: "Built-in jacuzzi in skimmer pool" },
          { src: "https://images.unsplash.com/photo-1572331165267-854da2b10ccc?q=80&w=800&auto=format&fit=crop", alt: "Night time LED lit skimmer pool" },
          { src: "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=800&auto=format&fit=crop", alt: "Clear blue water skimmer pool finish" },
        ],
      },
      {
        id: "why-choose",
        type: "rich-text",
        title: "Transform Your Vision Into Reality With The Main Skimmer Pool Contractor",
        contentHtml: `
          <ul class="space-y-3 my-4 text-foreground/85">
            <li class="flex items-start gap-3">
              <span class="inline-block mt-1 text-primary font-bold">✔</span>
              <span><strong>Cost-Effective Construction:</strong> No subterranean surge tank required, significantly lowering structural excavation and build costs.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="inline-block mt-1 text-primary font-bold">✔</span>
              <span><strong>Faster Project Turnaround:</strong> Completed in less time without sacrificing structural integrity or waterproofing quality.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="inline-block mt-1 text-primary font-bold">✔</span>
              <span><strong>Simplified Maintenance:</strong> Easy access basket cleaning, straightforward filtration valves, and efficient power usage.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="inline-block mt-1 text-primary font-bold">✔</span>
              <span><strong>Custom Shapes & Sizes:</strong> Built to fit compact villa gardens or expansive backyard grounds seamlessly.</span>
            </li>
          </ul>
        `,
      },
      {
        id: "cta-callout-1",
        type: "cta-callout",
        cta: {
          headline: "Looking to Build a Skimmer Pool in Dubai?",
          subline: "Call us today at +971 52 999 0092 for immediate expert advice!",
          phoneNumber: "+971529990092",
          phoneDisplay: "+971 52 999 0092",
          buttonText: "Call Now",
        },
      },
      {
        id: "design-images",
        type: "side-by-side-images",
        images: [
          { src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop", alt: "Skimmer entry steps detail" },
          { src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop", alt: "Poolside wooden deck with skimmer pool" },
        ],
      },
      {
        id: "process",
        type: "process-timeline",
        title: "Tailored Skimmer Pool Construction Solutions",
        subtitle: "A streamlined construction journey engineered for peace of mind.",
        processSteps: [
          {
            stepNumber: 1,
            title: "Site Consultation & 3D Design",
            description: "Mapping out pool boundaries, sun exposure, depth profiles, and obtaining municipality structural NOCs.",
          },
          {
            stepNumber: 2,
            title: "Excavation & Structural Shelling",
            description: "Excavating soil, installing steel reinforcement cages, and pouring heavy-duty reinforced concrete.",
          },
          {
            stepNumber: 3,
            title: "Plumbing, Skimmer Box & Waterproofing",
            description: "Installing commercial-grade skimmer units, return jets, suction lines, and certified liquid membrane waterproofing.",
          },
          {
            stepNumber: 4,
            title: "Tiling & Equipment Handover",
            description: "Laying ceramic tiles, connecting plant room pumps & heaters, water chemistry balancing, and final client sign-off.",
          },
        ],
      },
      {
        id: "recent-work",
        type: "gallery-6grid",
        title: "Get Inspired By Our Recent Work",
        images: [
          { src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop", alt: "Recent skimmer pool project" },
          { src: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=800&auto=format&fit=crop", alt: "Dubai villa garden skimmer pool" },
          { src: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=800&auto=format&fit=crop", alt: "Backyard resort style pool build" },
          { src: "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?q=80&w=800&auto=format&fit=crop", alt: "Skimmer pool with glass mosaic tiles" },
          { src: "https://images.unsplash.com/photo-1572331165267-854da2b10ccc?q=80&w=800&auto=format&fit=crop", alt: "Integrated spa and skimmer pool" },
          { src: "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=800&auto=format&fit=crop", alt: "Modern skimmer pool handover" },
        ],
      },
      {
        id: "trust-reviews-section",
        type: "trust-reviews",
        title: "Why Choose Our Skimmer Pool Construction Services?",
      },
    ],
  },

  "swimming-pool-construction": {
    slug: "swimming-pool-construction",
    aliases: ["construction", "pool-construction"],
    title: "End-to-End Swimming Pool Construction In Dubai",
    subtitle: "Custom concrete pool engineering, structural shell installation, and full turnkey project management.",
    heroImage: "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=2000&auto=format&fit=crop",
    badge: "Certified Pool Builders",
    description: "Turnkey swimming pool construction in Dubai. Fully engineered concrete shells, waterproofing, plant room mechanics, and municipality approvals.",
    seo: {
      metaTitle: "Swimming Pool Construction Contractors in Dubai | Complete Pool Build",
      metaDescription: "Leading swimming pool construction company in Dubai. Turnkey engineering, permits, concrete shell pouring, tiling, and smart plant room automation.",
      keywords: ["swimming pool construction Dubai", "pool builder Dubai", "pool installation contractors", "villa pool construction"],
    },
    googleReviews: defaultGoogleReviews,
    sections: [
      {
        id: "intro",
        type: "rich-text",
        title: "Premier Swimming Pool Construction Company in Dubai",
        contentHtml: `
          <p class="text-base sm:text-lg text-foreground/80 leading-relaxed">
            Building a swimming pool is one of the most rewarding home improvement projects you can undertake in Dubai. At <strong>Poolscape LLC</strong>, we handle every single aspect of <strong>Swimming Pool Construction</strong> under one roof — from initial 3D architectural rendering and civil authority permitting to soil excavation, concrete shell pouring, and luxury tile finishing.
          </p>
          <p class="text-base sm:text-lg text-foreground/80 leading-relaxed mt-4">
            Our experienced engineers utilize heavy-gauge reinforced steel and high-pressure gunite concrete to ensure your pool structural shell stands up to soil movement, high water tables, and summer thermal expansion.
          </p>
        `,
      },
      {
        id: "intro-gallery",
        type: "gallery-6grid",
        images: [
          { src: "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=800&auto=format&fit=crop", alt: "Custom pool construction site" },
          { src: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=800&auto=format&fit=crop", alt: "Reinforced steel shell pouring" },
          { src: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=800&auto=format&fit=crop", alt: "Waterproofing test in progress" },
          { src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop", alt: "Tile fitting on pool floor" },
          { src: "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?q=80&w=800&auto=format&fit=crop", alt: "Plant room pump installation" },
          { src: "https://images.unsplash.com/photo-1572331165267-854da2b10ccc?q=80&w=800&auto=format&fit=crop", alt: "Finished pool handover in Dubai villa" },
        ],
      },
      {
        id: "process",
        type: "process-timeline",
        title: "Our 4-Phase Pool Construction Workflow",
        subtitle: "From site survey to initial water splash — executed with precision engineering.",
        processSteps: [
          {
            stepNumber: 1,
            title: "Design & Authority Permits",
            description: "3D architectural render design, soil test, structural drawing approval from Dubai Municipality / DDA.",
          },
          {
            stepNumber: 2,
            title: "Excavation & Gunite Shell",
            description: "Earthwork excavation, gravel base, steel rebar grid, and high-density shotcrete concrete spraying.",
          },
          {
            stepNumber: 3,
            title: "Hydraulic Plumbing & Waterproofing",
            description: "Installing heavy-duty PVC pipework, main drains, skimmers/gutters, and multi-layer waterproof membrane.",
          },
          {
            stepNumber: 4,
            title: "Finishes, Decking & Handover",
            description: "Laying Spanish mosaic tiles, granite coping, deck paving, pump room automation, and chemical balancing.",
          },
        ],
      },
      {
        id: "cta-callout-1",
        type: "cta-callout",
        cta: {
          headline: "Ready to Build Your Custom Pool in Dubai?",
          subline: "Schedule a free consultation with our head pool engineer today!",
          phoneNumber: "+971529990092",
          phoneDisplay: "+971 52 999 0092",
          buttonText: "Call Now",
        },
      },
      {
        id: "trust-reviews-section",
        type: "trust-reviews",
        title: "Why Property Owners Trust Our Pool Construction Team",
      },
    ],
  },

  "swimming-pool-maintenance": {
    slug: "swimming-pool-maintenance",
    aliases: ["maintenance", "pool-maintenance"],
    title: "Professional Swimming Pool Maintenance Services In Dubai",
    subtitle: "Weekly water balancing, filtration servicing, equipment repair, and emergency 24/7 support.",
    heroImage: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=2000&auto=format&fit=crop",
    badge: "Certified Water Technicians",
    description: "Scheduled pool maintenance programs across Dubai. Keep water crystal clear, safe, and balanced year-round with certified pool technicians.",
    seo: {
      metaTitle: "Swimming Pool Maintenance Services Dubai | Water Treatment & Care",
      metaDescription: "Professional swimming pool maintenance in Dubai. Weekly water testing, filter backwashing, pump repair, chemical dosing, and plant room upkeep.",
      keywords: ["swimming pool maintenance Dubai", "pool cleaning company Dubai", "pool water treatment", "pool pump repair Dubai"],
    },
    googleReviews: defaultGoogleReviews,
    sections: [
      {
        id: "intro",
        type: "rich-text",
        title: "Keep Your Pool Water Pristine, Safe & Crystal Clear Year-Round",
        contentHtml: `
          <p class="text-base sm:text-lg text-foreground/80 leading-relaxed">
            Due to Dubai's warm climate, intense sun exposure, and blowing desert dust, swimming pool water requires constant monitoring and chemical precision. At <strong>Poolscape LLC</strong>, our certified water technicians conduct comprehensive <strong>Swimming Pool Maintenance</strong> packages for residential villas and commercial pools.
          </p>
          <p class="text-base sm:text-lg text-foreground/80 leading-relaxed mt-4">
            We test pH levels, total alkalinity, free chlorine, cyanuric acid, and perform regular sand filter backwashes, skimmer basket clearings, and pump seal inspections to ensure your pool remains safe and healthy for your family.
          </p>
        `,
      },
      {
        id: "cta-callout-1",
        type: "cta-callout",
        cta: {
          headline: "Need Urgent Pool Maintenance or Water Chemical Balancing?",
          subline: "Speak to our maintenance team now for flexible contract packages!",
          phoneNumber: "+971529990092",
          phoneDisplay: "+971 52 999 0092",
          buttonText: "Call Now",
        },
      },
      {
        id: "features",
        type: "features-list",
        title: "Comprehensive Maintenance Contract Benefits",
        features: [
          { title: "Weekly Chemical Balancing", description: "Precision chemical dosing to prevent algae, bacteria, and eye irritation." },
          { title: "Filter & Pump Servicing", description: "Regular backwashing, media replacement, and mechanical pump inspections." },
          { title: "Surface Skimming & Vacuuming", description: "Deep floor vacuuming, wall brushing, and skimmer basket debris clearance." },
          { title: "24/7 Emergency Callout", description: "Fast repair support for pump leaks, heater failures, or sudden water cloudiness." },
        ],
      },
      {
        id: "trust-reviews-section",
        type: "trust-reviews",
        title: "Client Testimonials for Our Pool Maintenance",
      },
    ],
  },

  "water-features": {
    slug: "water-features",
    aliases: ["water-feature", "features"],
    title: "Custom Architectural Water Features In Dubai",
    subtitle: "Sheer descent waterfalls, rain curtains, bubbling jets, and tranquil garden water elements.",
    heroImage: "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=2000&auto=format&fit=crop",
    badge: "Water Artisans & Designers",
    description: "Transform your outdoor space with custom water features in Dubai. Waterfalls, spillways, light-up jets, and decorative garden features.",
    seo: {
      metaTitle: "Custom Water Features Dubai | Pool Waterfalls & Spillways",
      metaDescription: "Design & build custom water features in Dubai. Sheer descent waterfalls, rain curtains, rock features, and illuminated jets for luxury gardens & pools.",
      keywords: ["water features Dubai", "pool waterfall build", "sheer descent waterfall", "garden water feature"],
    },
    googleReviews: defaultGoogleReviews,
    sections: [
      {
        id: "intro",
        type: "rich-text",
        title: "Elevate Your Pool & Outdoor Living Space With Dynamic Water Features",
        contentHtml: `
          <p class="text-base sm:text-lg text-foreground/80 leading-relaxed">
            The soothing sound of running water can mask ambient city noise and turn a normal backyard into a peaceful sanctuary. At <strong>Poolscape LLC</strong>, we design and construct bespoke <strong>Water Features</strong> integrated into swimming pools, villa courtyards, and garden walls.
          </p>
          <p class="text-base sm:text-lg text-foreground/80 leading-relaxed mt-4">
            From sheer descent glass water sheets and stainless steel spillways to natural stone cascades and LED-lit laminar deck jets, we create visual centerpieces built to withstand the desert climate.
          </p>
        `,
      },
      {
        id: "cta-callout-1",
        type: "cta-callout",
        cta: {
          headline: "Add a Custom Water Feature to Your Villa Pool?",
          subline: "Contact our landscape design team today for custom 3D concept designs!",
          phoneNumber: "+971529990092",
          phoneDisplay: "+971 52 999 0092",
          buttonText: "Call Now",
        },
      },
      {
        id: "trust-reviews-section",
        type: "trust-reviews",
        title: "Why Choose Poolscape for Architectural Water Features?",
      },
    ],
  },

  "water-fountains": {
    slug: "water-fountains",
    aliases: ["fountains", "water-fountain"],
    title: "Statement Water Fountains For Gardens & Villa Entrances",
    subtitle: "Majestic entryway fountains, courtyard centerpieces, and automated dancing water displays.",
    heroImage: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2000&auto=format&fit=crop",
    badge: "Fountain Specialists",
    description: "Design and installation of luxury water fountains in Dubai. Tiered fountains, modern geometric spillways, courtyard fountains, and LED water features.",
    seo: {
      metaTitle: "Water Fountains Contractors Dubai | Villa & Courtyard Fountains",
      metaDescription: "Custom water fountain contractors in Dubai. Luxury entryway fountains, tiered stone fountains, courtyard water displays, and automated pump systems.",
      keywords: ["water fountains Dubai", "courtyard fountain contractor", "villa entrance fountain", "garden fountain Dubai"],
    },
    googleReviews: defaultGoogleReviews,
    sections: [
      {
        id: "intro",
        type: "rich-text",
        title: "Create a Regal First Impression With Custom Water Fountains in Dubai",
        contentHtml: `
          <p class="text-base sm:text-lg text-foreground/80 leading-relaxed">
            A fountain is the ultimate statement piece for villa driveways, entry foyers, and outdoor garden majlis areas. At <strong>Poolscape LLC</strong>, we craft custom <strong>Water Fountains</strong> using premium natural marble, carved granite, bronze, and weather-resistant composites.
          </p>
          <p class="text-base sm:text-lg text-foreground/80 leading-relaxed mt-4">
            Equipped with submerged multi-color LED lights, smart timer controls, and silent water recirculation pumps, our fountains combine timeless elegance with modern engineering reliability.
          </p>
        `,
      },
      {
        id: "cta-callout-1",
        type: "cta-callout",
        cta: {
          headline: "Looking to Install a Custom Water Fountain in Dubai?",
          subline: "Call our design specialists today at +971 52 999 0092!",
          phoneNumber: "+971529990092",
          phoneDisplay: "+971 52 999 0092",
          buttonText: "Call Now",
        },
      },
      {
        id: "trust-reviews-section",
        type: "trust-reviews",
        title: "Client Feedback on Our Fountain Installations",
      },
    ],
  },
};

export function getPoolDetailBySlug(slug: string): PoolDetailData | undefined {
  const normalizedSlug = slug.toLowerCase().trim();

  // 1. Direct match
  if (poolsDetailData[normalizedSlug]) {
    return poolsDetailData[normalizedSlug];
  }

  // 2. Alias match
  for (const item of Object.values(poolsDetailData)) {
    if (item.aliases?.includes(normalizedSlug)) {
      return item;
    }
  }

  // 3. Fallback loose match (e.g. if slug is "infinity", match "infinity-swimming-pool")
  for (const [key, item] of Object.entries(poolsDetailData)) {
    if (key.includes(normalizedSlug) || normalizedSlug.includes(key)) {
      return item;
    }
  }

  return undefined;
}

export function getAllPoolSlugs(): string[] {
  return Object.keys(poolsDetailData);
}
