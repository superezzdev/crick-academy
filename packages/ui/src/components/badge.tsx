import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-pitch-green text-chalk shadow-sm",
        pitch:
          "border-pitch-green-600 bg-pitch-green text-chalk shadow-sm",
        gold:
          "border-stump-gold/40 bg-stump-gold/20 text-stump-gold-800 font-bold",
        leather:
          "border-leather-red/30 bg-leather-red/10 text-leather-red font-bold",
        paid:
          "border-emerald-500/30 bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 font-bold",
        unpaid:
          "border-stone-400/40 bg-stone-200/80 text-stone-700 dark:bg-stone-800/80 dark:text-stone-300 dark:border-stone-700 font-bold",
        overdue:
          "border-leather-red/30 bg-leather-red/15 text-leather-red dark:text-leather-red-400 font-bold",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground",
        outline:
          "text-foreground border-border"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
