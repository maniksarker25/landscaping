import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, MapPin, Calendar, Tag } from "lucide-react";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { Container } from "@/components/common/container";
import { Button } from "@/components/ui/button";
import { CtaBanner } from "@/components/sections/cta-banner";
import { buildMetadata } from "@/lib/seo";
import { fetchGalleryData } from "@/lib/api/gallery";
import { projects } from "@/data/projects";

export const dynamicParams = true;

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export interface DetailedProject {
  slug: string;
  title: string;
  category: string;
  location: string;
  year: string;
  coverImage: string;
  gallery: string[];
  summary: string;
  scope: string[];
}

/**
 * Fetch project details using strictly live API gallery data.
 * NEVER uses static data from pools-static-data.ts or landscaping-static-data.ts.
 */
async function getProjectData(slug: string): Promise<DetailedProject | null> {
  const decodedSlug = decodeURIComponent(slug).toLowerCase().trim();
  const apiRes = await fetchGalleryData({ limit: 100 });
  const allApiItems = apiRes.data || [];

  // Try matching directly against API gallery items
  const matchedItem = allApiItems.find((item) => {
    const itemSlug = (item.slug || "").toLowerCase().trim();
    const itemId = (item._id || "").toLowerCase().trim();
    const slugifiedAlt = (item.imageAlt || "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    return (
      itemSlug === decodedSlug ||
      itemId === decodedSlug ||
      slugifiedAlt === decodedSlug ||
      (decodedSlug.length > 5 && (itemSlug.includes(decodedSlug) || decodedSlug.includes(itemSlug)))
    );
  });

  // Extract all valid images from API
  const allApiImages = allApiItems
    .map((i) => i.image)
    .filter((img): img is string => Boolean(img && img.trim() && !img.includes("about-intro-pool")));

  if (matchedItem) {
    const categoryName = (matchedItem.category || "landscaping").toLowerCase();
    const categoryLabel = categoryName.includes("pool")
      ? "Swimming Pool Construction"
      : categoryName.includes("outdoor")
      ? "Outdoor Living & Pergola"
      : "Luxury Villa Landscaping";

    // Related images from the same category in API
    const categoryImages = allApiItems
      .filter((i) => i._id !== matchedItem._id && (i.category || "").toLowerCase() === categoryName)
      .map((i) => i.image)
      .filter((img): img is string => Boolean(img && img.trim()));

    // Other images from API to populate gallery
    const otherImages = allApiItems
      .filter((i) => i._id !== matchedItem._id && (i.category || "").toLowerCase() !== categoryName)
      .map((i) => i.image)
      .filter((img): img is string => Boolean(img && img.trim()));

    const galleryImages = [
      matchedItem.image,
      ...categoryImages,
      ...otherImages,
    ].slice(0, 5);

    return {
      slug,
      title: matchedItem.imageAlt || `${categoryLabel} Project`,
      category: categoryLabel,
      location: matchedItem.location || "Dubai, UAE",
      year: matchedItem.createdAt
        ? new Date(matchedItem.createdAt).getFullYear().toString()
        : "2024",
      coverImage: matchedItem.image,
      gallery: galleryImages.length > 1 ? galleryImages : [matchedItem.image],
      summary: `A bespoke luxury ${matchedItem.category} project located in ${matchedItem.location || "Dubai, UAE"}, completed with high-end architectural craftsmanship by Dream Floor Landscaping.`,
      scope: [
        `${categoryLabel} Engineering & Execution`,
        "Site Preparation & Custom Masonry",
        "Landscape Lighting & Irrigation",
        "Handover, Commissioning & Warranty",
      ],
    };
  }

  // Fallback: match static slug names (e.g. al-barari-villa-oasis), but OVERRIDE images with real API images!
  const staticMatch = projects.find((p) => p.slug === decodedSlug);
  if (staticMatch) {
    const isPool = staticMatch.category.toLowerCase().includes("pool");
    const matchedCategoryImages = allApiItems
      .filter((i) => {
        const cat = (i.category || "").toLowerCase();
        return isPool ? cat.includes("pool") : !cat.includes("pool");
      })
      .map((i) => i.image)
      .filter((img): img is string => Boolean(img && img.trim()));

    const resolvedImages = matchedCategoryImages.length > 0 ? matchedCategoryImages : allApiImages;
    const coverImage = resolvedImages[0] || staticMatch.coverImage;
    const gallery = resolvedImages.length > 1 ? resolvedImages.slice(0, 5) : [coverImage];

    return {
      ...staticMatch,
      coverImage,
      gallery,
    };
  }

  // If there are API items available, show the first relevant API item instead of 404
  if (allApiItems.length > 0 && allApiItems[0]) {
    const fallbackItem = allApiItems[0];
    return {
      slug,
      title: fallbackItem.imageAlt || "Luxury Completed Project",
      category: fallbackItem.category || "Landscaping",
      location: fallbackItem.location || "Dubai, UAE",
      year: "2024",
      coverImage: fallbackItem.image,
      gallery: allApiImages.length > 0 ? allApiImages.slice(0, 5) : [fallbackItem.image],
      summary: "Explore our luxury swimming pool construction and landscaping projects completed in Dubai.",
      scope: [
        "Architectural 3D Landscape Design",
        "Swimming Pool Construction & MEP",
        "Pergolas, Gazebos & Outdoor Majlis",
        "Garden Irrigation & Softscaping",
      ],
    };
  }

  return null;
}

export async function generateStaticParams() {
  try {
    const apiRes = await fetchGalleryData({ limit: 100 });
    const apiSlugs = (apiRes.data || [])
      .map((item) => item.slug || item._id)
      .filter(Boolean);
    const staticSlugs = projects.map((project) => project.slug);
    const combined = Array.from(new Set([...staticSlugs, ...apiSlugs]));
    return combined.map((slug) => ({ slug }));
  } catch {
    return projects.map((project) => ({ slug: project.slug }));
  }
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectData(slug);
  if (!project) return buildMetadata({ title: "Project Not Found", noIndex: true });

  return buildMetadata({
    title: project.title,
    description: project.summary,
    path: `/projects/${project.slug}`,
    image: project.coverImage,
  });
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectData(slug);
  if (!project) notFound();

  return (
    <>
      <Breadcrumb
        items={[
          { name: "Home", href: "/" },
          { name: "Projects", href: "/projects" },
          { name: project.title, href: `/projects/${project.slug}` },
        ]}
      />

      <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
        <Container className="absolute inset-x-0 bottom-0 pb-10 text-primary-foreground">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
            {project.category}
          </span>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl">{project.title}</h1>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <dl className="grid grid-cols-3 gap-6 border-b border-border pb-8">
              <div>
                <dt className="flex items-center gap-1.5 text-xs uppercase tracking-wide text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" /> Location
                </dt>
                <dd className="mt-1 text-sm">{project.location}</dd>
              </div>
              <div>
                <dt className="flex items-center gap-1.5 text-xs uppercase tracking-wide text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" aria-hidden="true" /> Year
                </dt>
                <dd className="mt-1 text-sm">{project.year}</dd>
              </div>
              <div>
                <dt className="flex items-center gap-1.5 text-xs uppercase tracking-wide text-muted-foreground">
                  <Tag className="h-3.5 w-3.5" aria-hidden="true" /> Category
                </dt>
                <dd className="mt-1 text-sm">{project.category}</dd>
              </div>
            </dl>

            <p className="mt-8 text-base leading-relaxed text-foreground">{project.summary}</p>

            <h2 className="mt-10 font-display text-lg">Scope of work</h2>
            <ul className="mt-4 space-y-2">
              {project.scope.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            <Button asChild size="lg" className="mt-10">
              <Link href="/contact">
                Start a Similar Project <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {project.gallery.map((image, index) => (
              <div
                key={`${image}-${index}`}
                className={`relative overflow-hidden rounded-lg ${
                  index === 0 ? "col-span-2 aspect-[16/9]" : "aspect-square"
                }`}
              >
                <Image
                  src={image}
                  alt={`${project.title} detail ${index + 1}`}
                  fill
                  sizes="(min-width: 1024px) 45vw, 90vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
