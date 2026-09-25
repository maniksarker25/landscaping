"use client";

import React, { useState } from "react";
import { Star, ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ReviewItem {
  id: string;
  name: string;
  rating: number;
  text: string;
  date?: string;
  avatar?: string;
}

export const DEFAULT_GOOGLE_REVIEWS: ReviewItem[] = [
  {
    id: "rev-1",
    name: "Nidhi Aggarwal",
    rating: 5,
    text: "We had a good experience with Four Seasons. We employed three different contractor teams to make our house and must say that Four Seasons was the most efficient and professional of all three. Timely work finished and in good quality. We are happy.",
  },
  {
    id: "rev-2",
    name: "Igor Loktev",
    rating: 5,
    text: "Great Team, all the works completed perfectly, nice & timely communications, thanks a lot for the job done❤️🙏",
  },
  {
    id: "rev-3",
    name: "MUHAMMAD MUSHARAF ZAIDI",
    rating: 5,
    text: "We had a very good experience with this pool contractor. The team was professional, responsive, and clear throughout the process. The work was carried out as discussed, with good attention to detail and quality finishing. They were flexible with site coordination and handled variations in a professional manner.",
  },
  {
    id: "rev-4",
    name: "Sameer Bhat",
    rating: 5,
    text: "Very professional and work completed to satisfaction.",
  },
  {
    id: "rev-5",
    name: "Viktoriia Loktev",
    rating: 5,
    text: "Great experience working with this company. The team built our swimming pool, fire pit, and took care of the full landscaping. Everything was done in a short time and with excellent quality. Communication was easy and straightforward.",
  },
  {
    id: "rev-6",
    name: "Conrad Lee",
    rating: 5,
    text: "Finished the work to a good standard and timeline. Used for driveway and water tank replacement.",
  },
  {
    id: "rev-7",
    name: "Wajdi Elhakim",
    rating: 5,
    text: "We had the best experience ever with the full team. Very professional work, nice finish - and most important the timeline was kept exactly as promised. Fair pricing - quality and price go hand in hand. All approvals and documentation done to perfection.",
  },
  {
    id: "rev-8",
    name: "Lilian K",
    rating: 5,
    text: "I recently had Four Seasons build a swimming pool and landscaping for my property in Arabian Ranches. The team was professional, detail oriented and completed the project ahead of schedule and at a good price.",
  },
  {
    id: "rev-9",
    name: "Borja Burguillos",
    rating: 5,
    text: "Outstanding performance. They finished the job one week earlier! Totally recommendable.",
  },
];

export interface GoogleReviewsSectionProps {
  reviews?: ReviewItem[];
  className?: string;
}

export function GoogleReviewsSection({
  reviews = DEFAULT_GOOGLE_REVIEWS,
  className,
}: GoogleReviewsSectionProps) {
  const [startIndex, setStartIndex] = useState(0);

  // Show 2 items per view on desktop, 1 on mobile
  const prevSlide = () => {
    setStartIndex((prev) =>
      prev === 0 ? Math.max(0, reviews.length - 2) : prev - 1,
    );
  };

  const nextSlide = () => {
    setStartIndex((prev) => (prev >= reviews.length - 2 ? 0 : prev + 1));
  };

  const visibleReviews = reviews.slice(startIndex, startIndex + 2);

  return (
    <div className={cn("space-y-5 font-sans my-6", className)}>
      {/* Google Trustindex Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-[4px] border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center gap-3">
          {/* Google G Logo */}
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100 flex-shrink-0">
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-[#1a1a1a] text-base tracking-wide">
                EXCELLENT
              </span>
              <div className="flex text-[#fbbc04]">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-[#fbbc04] text-[#fbbc04]"
                  />
                ))}
              </div>
            </div>
            <p className="text-xs text-gray-500 font-medium">
              Based on <strong className="text-gray-800">39 reviews</strong> on
              Google
            </p>
          </div>
        </div>

        {/* Navigation arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={prevSlide}
            className="p-2 rounded-[3px] border border-gray-200 hover:bg-gray-50 text-gray-700 transition-colors"
            aria-label="Previous reviews"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextSlide}
            className="p-2 rounded-[3px] border border-gray-200 hover:bg-gray-50 text-gray-700 transition-colors"
            aria-label="Next reviews"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Review Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {visibleReviews.map((rev) => (
          <div
            key={rev.id}
            className="p-5 rounded-[4px] border border-gray-200 bg-white shadow-sm flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#5597CF]/15 text-[#5597CF] font-bold text-xs flex items-center justify-center">
                    {rev.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 leading-none">
                      {rev.name}
                    </h4>
                    <span className="text-[11px] text-gray-400">
                      Verified Customer
                    </span>
                  </div>
                </div>

                <div className="flex text-[#fbbc04]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 fill-[#fbbc04] text-[#fbbc04]"
                    />
                  ))}
                </div>
              </div>

              <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed line-clamp-4">
                &ldquo;{rev.text}&rdquo;
              </p>
            </div>

            <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
              <span className="flex items-center gap-1 text-[#0f9d58]">
                <CheckCircle className="w-3 h-3" /> Posted on Google
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GoogleReviewsSection;
