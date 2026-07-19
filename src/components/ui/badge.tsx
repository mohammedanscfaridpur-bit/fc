import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide",
  {
    variants: {
      variant: {
        gold: "bg-gold-500/15 text-gold-700 dark:text-gold-300",
        forest: "bg-forest-600/10 text-forest-700 dark:bg-forest-500/20 dark:text-forest-100",
        outline: "border border-current text-ink/60 dark:text-cream/60",
      },
    },
    defaultVariants: { variant: "gold" },
  },
);

export function Badge({
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
