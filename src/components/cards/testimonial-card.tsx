import { Star } from "lucide-react";
import type { Testimonial } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card className="flex h-full flex-col justify-between p-2">
      <CardContent className="pt-6">
        <div className="flex gap-1 text-accent" aria-hidden="true">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-current" />
          ))}
        </div>
        <p className="mt-4 text-[15px] leading-relaxed text-foreground line-clamp-3">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
        <div className="mt-6 flex items-start gap-2">
          <Image
            src={testimonial.avatar as string}
            alt={testimonial.name}
            width={50}
            height={50}
            className="w-12 h-12 overflow-hidden rounded-full border object-cover border-primary p-[2px]"
          />
          <div className="flex flex-col items-start justify-center">
            <p className="font-display text-base line-clamp-1">
              {testimonial.name}
            </p>
            <p className="text-sm text-muted-foreground line-clamp-1">
              {testimonial.role}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
