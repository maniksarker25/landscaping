import React from "react";
import { cn } from "@/lib/utils";

export interface BulletPoint {
  title?: string;
  text: string;
}

export interface TextSectionProps {
  mainHeader?: string;
  subHeader?: string;
  description?: string | string[] | React.ReactNode;
  bulletPoints?: (BulletPoint | string)[];
  className?: string;
  headerColor?: string;
}

export function TextSection({
  mainHeader,
  subHeader,
  description,
  bulletPoints,
  className,
  headerColor = "text-[#729d00]",
}: TextSectionProps) {
  return (
    <div className={cn("space-y-3.5 text-[#333333] font-sans", className)}>
      {mainHeader && (
        <h2
          className={cn(
            "text-2xl lg:text-[28px] font-bold leading-tight tracking-tight",
            headerColor,
          )}
        >
          {mainHeader}
        </h2>
      )}

      {subHeader && (
        <h3 className="text-lg lg:text-[21px] font-semibold text-[#1a1a1a] leading-snug">
          {subHeader}
        </h3>
      )}

      {description && (
        <div className="space-y-3 text-[14.5px] leading-relaxed text-[#4a4a4a]">
          {Array.isArray(description) ? (
            description.map((p, idx) => <p key={idx}>{p}</p>)
          ) : typeof description === "string" ? (
            <p>{description}</p>
          ) : (
            description
          )}
        </div>
      )}

      {bulletPoints && bulletPoints.length > 0 && (
        <ul className="space-y-2.5 pt-1 text-[14px] leading-relaxed text-[#4a4a4a] list-disc pl-5">
          {bulletPoints.map((item, idx) => {
            if (typeof item === "string") {
              return <li key={idx}>{item}</li>;
            }
            return (
              <li key={idx}>
                {item.title && (
                  <strong className="text-[#1a1a1a] font-bold">
                    {item.title}{" "}
                  </strong>
                )}
                {item.text}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default TextSection;
