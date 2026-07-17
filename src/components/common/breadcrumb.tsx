import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/common/container";

export interface BreadcrumbTrailItem {
  name: string;
  href: string;
}

export function Breadcrumb({ items }: { items: BreadcrumbTrailItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-border bg-muted/50 py-4">
      <Container>
        <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={item.href} className="flex items-center gap-2">
                {isLast ? (
                  <span aria-current="page" className="text-foreground">
                    {item.name}
                  </span>
                ) : (
                  <Link href={item.href} className="transition-colors hover:text-accent">
                    {item.name}
                  </Link>
                )}
                {!isLast && <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />}
              </li>
            );
          })}
        </ol>
      </Container>
    </nav>
  );
}
