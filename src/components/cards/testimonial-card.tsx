import { Star, Quote } from "lucide-react";
import type { Testimonial } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card className="flex h-full flex-col justify-between rounded-2xl border border-border/80 bg-card p-6 shadow-sm hover:shadow-md hover:border-[#71a600]/40 transition-all duration-300">
      <CardContent className="p-0 flex flex-col justify-between h-full">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-1 text-amber-500" aria-label={`${testimonial.rating} stars`}>
              {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <Quote className="h-6 w-6 text-[#71a600]/40" />
          </div>

          <p className="text-[14px] leading-relaxed text-foreground/90 font-normal italic">
            &ldquo;{testimonial.quote}&rdquo;
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-border/60 flex items-center gap-3">
          <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-[#71a600] shrink-0 bg-muted">
            <Image
              src={testimonial.avatar as string}
              alt={testimonial.name}
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>
          <div className="flex flex-col min-w-0">
            <p className="font-display font-bold text-sm text-foreground truncate">
              {testimonial.name}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {testimonial.role || "Client, Dubai"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

