import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({
  className,
  interactive = true,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { interactive?: boolean }) {
  return (
    <div
      className={cn(
        "hairline-gold rounded-2xl bg-cream-soft p-6 dark:bg-forest-800/60",
        interactive &&
          "transition-all duration-300 hover:-translate-y-1 hover:shadow-gold motion-reduce:hover:translate-y-0",
        className,
      )}
      {...props}
    />
  );
}

export function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("font-display text-xl text-forest-800 dark:text-cream", className)}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("mt-2 text-sm leading-relaxed text-ink/70 dark:text-cream/70", className)}
      {...props}
    />
  );
}
