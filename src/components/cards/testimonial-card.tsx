import { Star } from "lucide-react";
import type { Testimonial } from "@/types";
import { Card, CardContent } from "@/components/ui/card";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card className="flex h-full flex-col justify-between p-2">
      <CardContent className="pt-6">
        <div className="flex gap-1 text-accent" aria-hidden="true">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-current" />
          ))}
        </div>
        <p className="mt-4 text-[15px] leading-relaxed text-foreground">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
        <div className="mt-6">
          <p className="font-display text-base">{testimonial.name}</p>
          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
        </div>
      </CardContent>
    </Card>
  );
}
