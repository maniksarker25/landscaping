"use client";

import * as React from "react";
import Image from "next/image";
import { Star, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import type { GoogleReviewsData } from "@/types/service";
import type { TestimonialItem } from "@/types/testimonial";
import { cn } from "@/lib/utils";

interface ServiceTrustReviewsProps {
  data?: GoogleReviewsData;
  initialTestimonials?: TestimonialItem[];
  title?: string;
  className?: string;
}

export function ServiceTrustReviews({
  data,
  initialTestimonials = [],
  title,
  className,
}: ServiceTrustReviewsProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(false);
  const [apiTestimonials, setApiTestimonials] =
    React.useState<TestimonialItem[]>(initialTestimonials);

  React.useEffect(() => {
    fetch("/api/testimonial/get-all")
      .then((res) => res.json())
      .then((json) => {
        if (json.data && Array.isArray(json.data) && json.data.length > 0) {
          setApiTestimonials(json.data);
        }
      })
      .catch((err) =>
        console.error(
          "Failed to fetch testimonials for ServiceTrustReviews:",
          err,
        ),
      );
  }, []);

  const reviewsList = React.useMemo(() => {
    if (apiTestimonials.length > 0) {
      return apiTestimonials.map((item) => ({
        id: item._id,
        authorName: item.name,
        authorAvatar: item.image,
        avatar: item.image,
        timeAgo: item.roleOrLocation || "Client Review",
        rating: item.rating || 5,
        text: item.quote,
        verified: true,
      }));
    }
    if (data?.reviews && data.reviews.length > 0) {
      return data.reviews.map((r) => ({
        ...r,
        avatar: r.avatar || r.authorAvatar,
        authorAvatar: r.authorAvatar || r.avatar,
      }));
    }
    return [];
  }, [apiTestimonials, data?.reviews]);

  const checkScroll = React.useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 2);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 2);
    }
  }, []);

  React.useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      checkScroll();
      const timer = setTimeout(checkScroll, 100);
      el.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll);
      return () => {
        clearTimeout(timer);
        el.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, [reviewsList, checkScroll]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount =
        direction === "left" ? -clientWidth * 0.75 : clientWidth * 0.75;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const badgeTitle = title || data?.badgeTitle || "EXCELLENT";
  const averageRating = data?.averageRating || 5.0;
  const totalReviews =
    data?.totalReviews || (reviewsList.length > 0 ? reviewsList.length : 128);

  return (
    <div
      className={cn(
        "my-10 space-y-6 rounded-2xl bg-gradient-to-b from-card/80 via-card to-muted/40 p-6 sm:p-8 border border-border/80 shadow-sm",
        className,
      )}
    >
      {/* Header Badge */}
      <div className="flex flex-col items-center justify-center space-y-2 py-4 border-b border-border/60 text-center">
        <span className="text-sm font-extrabold tracking-widest text-emerald-800 uppercase">
          {badgeTitle}
        </span>

        <div className="flex items-center gap-1.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="h-6 w-6 fill-amber-400 text-amber-400 drop-shadow-sm"
            />
          ))}
        </div>

        <div className="flex items-center gap-2 pt-1">
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span className="text-sm font-semibold text-foreground/80">
            Rated {averageRating.toFixed(1)} / 5.0 based on {totalReviews}+
            Verified Reviews
          </span>
        </div>
      </div>

      {/* Review Cards Carousel */}
      <div className="relative group/carousel pt-2">
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border/80 bg-background/95 text-foreground shadow-md hover:bg-background hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Previous reviews"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}

        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border/80 bg-background/95 text-foreground shadow-md hover:bg-background hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Next reviews"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        )}

        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-4 overflow-x-auto pb-4 pt-1 scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {reviewsList.length > 0
            ? reviewsList.map((rev) => (
                <div
                  key={rev.id}
                  className="flex flex-col justify-between rounded-xl bg-background p-5 border border-border/60 shadow-sm transition-all hover:shadow-md w-[280px] sm:w-[350px] flex-shrink-0 snap-start"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2.5">
                        {rev.avatar || rev.authorAvatar ? (
                          <Image
                            src={rev.avatar || rev.authorAvatar || ""}
                            alt={rev.authorName}
                            width={36}
                            height={36}
                            unoptimized
                            className="h-9 w-9 rounded-full object-cover border border-primary/30"
                          />
                        ) : (
                          <div className="h-9 w-9 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center">
                            {rev.authorName.charAt(0)}
                          </div>
                        )}
                        <div>
                          <h4 className="text-sm font-bold text-foreground leading-none">
                            {rev.authorName}
                          </h4>
                          <span className="text-xs text-muted-foreground">
                            {rev.timeAgo}
                          </span>
                        </div>
                      </div>
                      {rev.verified && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          <CheckCircle className="h-3 w-3" /> Verified
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-0.5 mb-2">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>

                    <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed relative pl-3 border-l-2 border-primary/30 italic">
                      &quot;{rev.text}&quot;
                    </p>
                  </div>
                </div>
              ))
            : // Skeleton loaders while fetching API testimonials
              [...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col justify-between rounded-xl bg-card/60 p-5 border border-border/40 w-[280px] sm:w-[350px] flex-shrink-0 animate-pulse space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-muted" />
                    <div className="space-y-1.5 flex-1">
                      <div className="h-3 w-24 rounded bg-muted" />
                      <div className="h-2.5 w-16 rounded bg-muted/70" />
                    </div>
                  </div>
                  <div className="h-3 w-20 rounded bg-amber-200/50" />
                  <div className="space-y-2 pt-1">
                    <div className="h-3 w-full rounded bg-muted/80" />
                    <div className="h-3 w-4/5 rounded bg-muted/60" />
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}
