import { Container } from "@/components/common/container";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="border-b border-border bg-muted/40 py-16 sm:py-20">
      <Container className="max-w-3xl">
        {eyebrow && (
          <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            {eyebrow}
          </span>
        )}
        <h1 className="font-display text-4xl leading-tight sm:text-5xl">{title}</h1>
        {description && (
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </Container>
    </section>
  );
}
