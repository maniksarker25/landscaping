import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface PoolTypeItem {
  title: string;
  description: string;
  image?: string;
}

export interface PoolTypesSectionProps {
  title?: string;
  subTitle?: string;
  description?: string;
  items?: PoolTypeItem[];
  className?: string;
  headerColor?: string;
}

export function PoolTypesSection({
  title = "Types of Pool Construction in Dubai",
  subTitle,
  description,
  items,
  className,
  headerColor = "text-[#729d00]",
}: PoolTypesSectionProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className={cn("space-y-6 pt-1 pb-2 font-sans", className)}>
      {(title || subTitle || description) && (
        <div className="space-y-2">
          {title && (
            <h2
              className={cn(
                "text-2xl lg:text-[28px] font-bold leading-tight tracking-tight",
                headerColor
              )}
            >
              {title}
            </h2>
          )}
          {subTitle && (
            <h3 className="text-lg font-semibold text-[#1a1a1a] leading-snug">
              {subTitle}
            </h3>
          )}
          {description && (
            <p className="text-sm text-[#555555] leading-relaxed max-w-3xl">
              {description}
            </p>
          )}
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-7 sm:gap-x-5 sm:gap-y-8">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="group flex flex-col items-center text-center"
          >
            {item.image && (
              <div className="relative w-full aspect-[16/10] bg-white p-1 rounded-[2px] shadow-[0_2px_8px_rgba(0,0,0,0.12)] border border-gray-100 overflow-hidden transition-all duration-300 group-hover:shadow-lg">
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            )}
            <h3 className="font-bold text-[15px] sm:text-base text-[#111111] mt-3.5 mb-1.5 leading-snug">
              {item.title}
            </h3>
            <p className="text-xs sm:text-[13px] text-[#555555] leading-relaxed max-w-[210px] mx-auto">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PoolTypesSection;
