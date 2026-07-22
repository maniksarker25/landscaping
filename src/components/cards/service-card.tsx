import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/types";
import { Card } from "@/components/ui/card";

export function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <Card className="group p-4 relative flex h-full flex-col justify-between overflow-hidden md:p-8 transition-colors hover:border-accent/40">
      <div>
        <div className="h-12 hidden md:flex w-12 items-center justify-center rounded-full bg-primary/5 text-primary transition-colors group-hover:bg-accent/10 group-hover:text-accent">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </div>
        <h3 className="mt-3 md:mt-6 font-display text-xl">{service.title}</h3>
        <p className="mt-3 text-xs md:text-sm leading-relaxed text-muted-foreground">
          {service.shortDescription}
        </p>
      </div>
      <Link
        href={`/services/${service.slug}`}
        className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors group-hover:text-accent"
      >
        Learn more
        <ArrowUpRight
          className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      </Link>
    </Card>
  );
}
