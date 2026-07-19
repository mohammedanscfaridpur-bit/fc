import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Signature motif: a redrawn, thin line-art version of the club crest's
 * sunburst ring + crescent, used wherever content deserves to feel "earned"
 * (section breaks, achievement lists, timeline nodes) instead of a plain <hr>.
 */
export function EmblemDivider({ className }: { className?: string }) {
  return (
    <div
      className={cn("flex items-center gap-4", className)}
      role="separator"
      aria-hidden="true"
    >
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold-500/60" />
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="12" stroke="currentColor" strokeWidth="1" className="text-gold-500/70" />
        <path
          d="M17.5 8.5a6 6 0 1 0 0 11 6.7 6.7 0 0 1 0-11Z"
          fill="currentColor"
          className="text-gold-500"
        />
        <path
          d="M14 4v2M14 22v2M4 14h2M22 14h2M6.3 6.3l1.4 1.4M20.3 20.3l1.4 1.4M6.3 21.7l1.4-1.4M20.3 7.7l1.4-1.4"
          stroke="currentColor"
          strokeWidth="1"
          className="text-gold-500/50"
        />
      </svg>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold-500/60" />
    </div>
  );
}
