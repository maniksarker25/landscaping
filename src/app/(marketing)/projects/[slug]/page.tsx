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
import { projects, getProjectBySlug } from "@/data/projects";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
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
  const project = getProjectBySlug(slug);
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
                key={image}
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
