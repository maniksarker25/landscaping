# 🌊 Poolscape — Premium Pool Construction & Landscape Design

A production-ready, high-performance marketing and service rendering platform for a luxury pool construction and landscaping studio. Built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

This project provides a fully responsive, modern web experience modeled around a premium outdoor design business. It features a completely dynamic, data-driven architecture where services, projects, FAQs, and testimonials are managed as structured configurations.

---

## 🚀 Key Features

### 1. Dynamic Service Rendering Engine
* **Schema-Driven Pages:** Custom service pages are dynamically built from detailed content schemas (`src/data/services-data.ts`).
* **Block-Based Architecture:** Supports dynamic modules including Rich Text (Jodit compatible), Feature Grids, Testimonial Carousels, Photo Galleries, CTA Banners, Process Timelines, and FAQ Accordions.
* **Optimized Loading:** Uses Next.js `generateStaticParams` to statically pre-render all service sub-pages at build time for instant page loads.

### 2. Interactive Projects Gallery & Portfolio
* **Categorized Filtering:** Seamlessly filter completed projects (e.g., Swimming Pools, Landscaping) with instant UI updates.
* **Premium Lightbox Modal:** Full-screen responsive lightbox modal with gesture support, allowing users to zoom and navigate through project photos.
* **Responsive Mobile Filters:** A tailored slide-up mobile drawer sheet for quick category switching on smaller devices.

### 3. Lead Capture & Estimation Form
* **Zod Validation:** Robust frontend validation powered by React Hook Form and Zod schemas to ensure high-quality lead submissions.
* **Simulated reCAPTCHA:** Clean, interactive custom verification checkbox indicating spam prevention.
* **API Handler:** Serverless endpoint at `/api/contact` to capture lead data, ready to connect with CRMs, email service providers (Resend, SendGrid), or databases.

### 4. Interactive Map & Google Reviews Integration
* **Studio Locator Map:** Fully responsive embedded Google Maps location.
* **Business Info Overlay:** Sleek floating location card displaying business metadata, contact links, address, and ratings.
* **Client Trust Cards:** Integrated Google Reviews styling detailing customer feedback, star ratings, and review metrics.

### 5. Unified Design System & Custom Theming
* **Variable Theming:** Theme values are centered around custom CSS variables (`globals.css`) mapped to Tailwind config tokens.
* **Easy Re-skinning:** Re-skin the entire site by simply changing primary, secondary, and accent HSL values.
* **Lucide Icon Mapping:** Helper methods automatically map string identifiers in content schemas to visual Lucide React icons.

### 6. Advanced SEO & Metadata Implementation
* **Per-Page SEO Configuration:** Custom metadata helper (`src/lib/seo.ts`) generates titles, descriptions, canonical links, OpenGraph properties, and Twitter cards.
* **JSON-LD Schema Markup:** Injects rich search snippets, including `HomeAndConstructionBusiness` (local business), `FAQPage` (structured FAQs), and `BreadcrumbList`.
* **Automated Sitemap & Robots:** Dynamic `/sitemap.xml` and `/robots.txt` configuration matching the current domain config.

---

## 🛠️ Tech Stack

* **Framework:** Next.js 16 (App Router, Turbopack support)
* **Language:** TypeScript (Strict mode enabled)
* **Styling:** Tailwind CSS & Tailwind Animate
* **Component Primitives:** Radix UI (via shadcn design patterns)
* **Animations:** Framer Motion for scroll-linked animations and page transitions
* **Carousel Engine:** Embla Carousel (for client testimonials slider)
* **Form Handling:** React Hook Form + Resolver
* **Schema Validation:** Zod
* **Icons:** Lucide React

---

## 📁 Project Structure

```text
src/
├── app/
│   ├── (marketing)/       # Route group for all public marketing pages
│   │   ├── about/         # About Studio page
│   │   ├── services/      # Landscaping/Services listing & dynamic service detail
│   │   ├── pools/         # Pool construction listing
│   │   ├── projects/      # Project portfolio & Lightbox gallery
│   │   ├── faqs/          # Help center & FAQ page
│   │   ├── blog/          # Blog articles (dynamic)
│   │   ├── contact/       # Dedicated contact and map section
│   │   └── layout.tsx     # Layout wrapper for navigation & footer
│   ├── api/               # API route handlers
│   │   └── contact/       # Form submission handler
│   ├── layout.tsx         # Root layout (Metadata, Google Fonts, JSON-LD)
│   ├── sitemap.ts         # Automated sitemap generator
│   └── robots.ts          # Automated robots.txt generator
├── components/
│   ├── ui/                # Low-level UI primitives (Button, Input, Textarea, Select...)
│   ├── common/            # Shared containers, breadcrumbs, section titles, dividers
│   ├── layout/            # Site navigation, footer, mobile drawer
│   ├── sections/          # Page sections (Hero, Process, WhyChooseUs, LocationMap...)
│   ├── cards/             # Reusable cards (ServiceCard, ProjectCard, TestimonialCard...)
│   ├── pools/             # Custom pool components
│   └── forms/             # Lead generation forms
├── lib/                   # Utility helpers (animations, class merging, SEO utilities)
├── data/                  # Static structure files (services-data, blogs, FAQs...)
├── config/                # Global website config & design token settings
└── types/                 # Shared TypeScript models and interfaces
```

---

## 🔧 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to view the application.

### 3. Building for Production
Verify production builds, linting standards, and type-safety check:
```bash
npm run build       # Compile and optimize production build
npm run start       # Run the compiled production build
npm run lint        # Analyze project files for syntax and stylistic errors
npm run typecheck   # Validate TypeScript types
```

---

## 🎨 Theme Customization

To skin the website to match another brand or color identity, edit the CSS variables in `src/styles/globals.css`. Do not hardcode raw colors inside layout code.

```css
:root {
  --background: 40 20% 97%;      /* warm limestone */
  --foreground: 180 8% 10%;      /* charcoal ink */
  --primary: 180 50% 12%;        /* deep lagoon teal */
  --secondary: 172 37% 42%;      /* soft aqua */
  --accent: 38 28% 46%;          /* muted brass */
  ...
}
```

The Tailwind configuration `tailwind.config.ts` matches variables using native CSS variables, updating the UI dynamically when variables are adjusted.

---

## 📄 Content & Images Setup

1. **Copy & Text:** All copy is controlled via the `src/data/` directory. Replace files like `services-data.ts`, `projects.ts`, and `faqs.ts` with your actual copy before going live.
2. **Photography:** Images are loaded via remote URL configurations in Next.js. To swap with custom images:
   * Put images directly under `public/images/` and change data paths.
   * Or update `next.config.mjs` with your hosting provider's domains under `remotePatterns`.

---

## 🚀 Deployment Checklist

- [ ] **Config Site Metadata:** Edit `src/config/site.ts` with correct company metadata, telephone, address, and live domain URL.
- [ ] **Configure Lead Submissions:** Wire `/src/app/api/contact/route.ts` to forward form data to your email service (e.g., Resend, SendGrid), database, or CRM provider.
- [ ] **Update Map Address:** Modify `siteConfig.address` inside `src/config/site.ts` to automatically update map rendering, the business details card, and the local business structured markup.
