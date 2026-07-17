import type { Metadata } from "next";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/common/container";
import { ProjectCard } from "@/components/cards/project-card";
import { CtaBanner } from "@/components/sections/cta-banner";
import { buildMetadata } from "@/lib/seo";
import { projects } from "@/data/projects";

export const metadata: Metadata = buildMetadata({
  title: "Projects",
  description: "A selection of completed pool and landscape projects across the UAE.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "Projects", href: "/projects" }]} />
      <PageHero
        eyebrow="Projects"
        title="A selection of completed work"
        description="Every project starts with the site's existing conditions — climate, soil, and how the family actually plans to use the space."
      />

      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
