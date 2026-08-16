import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block overflow-hidden rounded-3xl border border-border bg-card"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover "
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
      <div className="p-6">
        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">
          {project.category}
        </span>
        <h3 className="mt-2 flex items-center justify-between gap-2 font-display text-lg">
          {project.title}
          <ArrowUpRight
            className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
            aria-hidden="true"
          />
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {project.location} &middot; {project.year}
        </p>
      </div>
    </Link>
  );
}
