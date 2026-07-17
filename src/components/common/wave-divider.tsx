import { cn } from "@/lib/utils";

interface WaveDividerProps {
  className?: string;
  flip?: boolean;
}

/**
 * Signature element: a thin animated wave line used sparingly between
 * sections to echo water without resorting to literal pool imagery.
 */
export function WaveDivider({ className, flip = false }: WaveDividerProps) {
  return (
    <div
      className={cn(
        "wave-divider relative h-10 w-full overflow-hidden",
        flip && "rotate-180",
        className
      )}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 2400 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full"
      >
        <path
          d="M0 50 C 200 10, 400 90, 600 50 S 1000 10, 1200 50 S 1600 90, 1800 50 S 2200 10, 2400 50"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-accent/40"
        />
      </svg>
    </div>
  );
}
