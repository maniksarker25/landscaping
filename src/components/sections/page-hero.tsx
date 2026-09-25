import Link from "next/link";
import { Container } from "@/components/common/container";
import { cn } from "@/lib/utils";
import { StaticImageData } from "next/image";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  image?: StaticImageData | string;
  breadcrumbs?: { label: string; href?: string }[];
}

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  breadcrumbs,
}: PageHeroProps) {
  const imageUrl = typeof image === "string" ? image : image?.src;

  const bgStyle = imageUrl
    ? {
        backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.72), rgba(0, 0, 0, 0.52)), url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }
    : undefined;

  return (
    <section
      style={bgStyle}
      className={cn(
        "relative border-b border-border bg-muted/40 py-16 sm:py-24",
        imageUrl && "text-white",
      )}
    >
      <Container className="container relative z-10">
        {eyebrow && (
          <span
            className={cn(
              "mb-2 block text-xs font-bold uppercase tracking-[0.2em]",
              imageUrl ? "text-[#71a600]" : "text-primary",
            )}
          >
            {eyebrow}
          </span>
        )}
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
          {title}
        </h1>

        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className="mt-3.5 flex items-center gap-2 text-sm sm:text-base font-medium text-white/90"
          >
            {breadcrumbs.map((crumb, idx) => {
              const isLast = idx === breadcrumbs.length - 1;
              return (
                <span key={crumb.label} className="inline-flex items-center gap-2">
                  {idx > 0 && <span className="text-white/60">»</span>}
                  {crumb.href && !isLast ? (
                    <Link
                      href={crumb.href}
                      className="hover:text-[#88c505] transition-colors underline-offset-4 hover:underline"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-white font-semibold">{crumb.label}</span>
                  )}
                </span>
              );
            })}
          </nav>
        )}

        {description && (
          <p
            className={cn(
              "mt-4 max-w-2xl text-sm sm:text-base leading-relaxed",
              imageUrl ? "text-white/90 font-medium" : "text-muted-foreground",
            )}
          >
            {description}
          </p>
        )}
      </Container>
    </section>
  );
}

