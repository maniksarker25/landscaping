import { Container } from "@/components/common/container";
import { cn } from "@/lib/utils";
import { StaticImageData } from "next/image";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  image?: StaticImageData;
}

export function PageHero({ image, eyebrow, title, description }: PageHeroProps) {
  const bgStyle = image?.src
    ? {
      backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.45)), url(${image.src})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }
    : undefined;

  return (
    <section
      style={bgStyle}
      className={cn(
        "relative border-b border-border bg-muted/40 py-16 sm:py-20",
        image && "text-white"
      )}
    >
      <Container className="container relative z-10">
        {/* {eyebrow && (
          <span
            className={cn(
              "mb-3 block text-xs font-semibold uppercase tracking-[0.2em]",
              image ? "text-amber-400 font-bold" : "text-accent"
            )}
          >
            {eyebrow}
          </span>
        )} */}
        <h1 className="font-display text-4xl leading-tight sm:text-5xl font-normal md:font-bold">{title}</h1>
        {description && (
          <p
            className={cn(
              "mt-4 max-w-xl text-base leading-relaxed",
              image ? "text-white/90 font-medium" : "text-muted-foreground"
            )}
          >
            {description}
          </p>
        )}
      </Container>
    </section>
  );
}
