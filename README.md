# Aurelia Outdoor — Pool & Landscape Studio Website

A production-grade marketing website for a pool construction and landscaping
company, built with Next.js 15 (App Router), TypeScript, and Tailwind CSS.

This project was inspired by the page structure and business flow of
poolsgardensuae.com, but uses **entirely original branding, copy, imagery,
and design** — nothing was copied from that site.

## Stack

- Next.js 15 (App Router, Server Components by default)
- TypeScript (strict mode, no `any`)
- Tailwind CSS + shadcn/ui-style components (Radix primitives)
- Framer Motion for scroll/viewport animations
- React Hook Form + Zod for form validation
- Embla Carousel for the testimonials slider
- Lucide React icons

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run build   # production build
npm run start   # run the production build
npm run typecheck
npm run lint
```

## Theming

**Never hardcode colors in a component.** Every color in the app is driven by
CSS variables defined in `src/styles/globals.css` and documented in
`src/config/theme.ts`. To re-skin the entire site, change the HSL triples for
`--primary`, `--secondary`, and `--accent` in both files — every button,
card, gradient, and icon updates automatically because Tailwind's color
tokens (`tailwind.config.ts`) all resolve through those variables.

Current palette:
- **Primary** — deep lagoon teal
- **Secondary** — soft aqua
- **Accent** — muted brass
- **Background** — warm limestone
- **Foreground** — charcoal ink

## Project structure

```
src/
├── app/
│   ├── (marketing)/       # Route group: all public marketing pages
│   │   ├── about/
│   │   ├── services/[slug]/
│   │   ├── projects/[slug]/
│   │   ├── gallery/
│   │   ├── blog/[slug]/
│   │   ├── faqs/
│   │   ├── contact/
│   │   └── layout.tsx     # Navbar + Footer wrapper
│   ├── api/contact/       # Contact form submission handler
│   ├── layout.tsx         # Root layout: fonts, global metadata, JSON-LD
│   ├── sitemap.ts
│   ├── robots.ts
│   └── not-found.tsx
├── components/
│   ├── ui/                # shadcn-style primitives (Button, Card, Select…)
│   ├── common/             # Container, SectionTitle, WaveDivider, Breadcrumb
│   ├── layout/              # Navbar, Footer, MobileMenu
│   ├── sections/            # Hero, Services, Process, Testimonials, FAQs…
│   ├── cards/                # ServiceCard, ProjectCard, TestimonialCard, BlogCard
│   └── forms/                 # ContactForm, NewsletterForm
├── lib/                    # utils (cn), animations, seo helpers, zod schemas
├── data/                   # Placeholder content (services, projects, FAQs…)
├── config/                 # site.ts (nav/company info), theme.ts (design tokens)
└── types/                  # Shared TypeScript interfaces
```

## Content

All copy, project names, and testimonials in `src/data/` are placeholders.
Replace them with real content before launch — the components don't need to
change, since every page pulls from these data files.

## Images

Placeholder imagery is pulled from Unsplash via `next/image` remote patterns
configured in `next.config.mjs`. Swap these for licensed project photography
before going live — the `remotePatterns` allowlist will need updating to
match your final image host (or switch to local files in `public/images`).

## SEO

- Per-page metadata via `buildMetadata()` in `src/lib/seo.ts` (title, canonical, OpenGraph, Twitter cards)
- JSON-LD structured data: `HomeAndConstructionBusiness` (root layout), `FAQPage` (FAQ page), `BreadcrumbList` (FAQ page — extend to other pages as needed)
- `sitemap.ts` and `robots.ts` generate `/sitemap.xml` and `/robots.txt` automatically
- Semantic HTML and heading hierarchy throughout

## Notes for deployment

- The `/api/contact` route currently logs submissions to the server console.
  Wire it up to your CRM, email provider (Resend, SendGrid), or database
  before launch.
- Update `src/config/site.ts` with real company name, phone, email, address,
  and social links.
- Update `siteConfig.url` to your production domain — it feeds the sitemap,
  robots.txt, and canonical/OpenGraph URLs.
