import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-pitch-green text-chalk hover:bg-pitch-green/90 shadow-md hover:shadow-lg",
        pitch:
          "bg-pitch-green text-chalk hover:bg-pitch-green/90 border border-pitch-green-600 shadow-md hover:shadow-pitch-green/20 hover:shadow-lg",
        leather:
          "bg-leather-red text-chalk hover:bg-leather-red/90 shadow-md hover:shadow-leather-red/20 hover:shadow-lg",
        gold:
          "bg-stump-gold text-ink hover:bg-stump-gold/90 font-bold shadow-md hover:shadow-stump-gold/20 hover:shadow-lg",
        outline:
          "border-2 border-pitch-green/30 bg-transparent text-pitch-green hover:bg-pitch-green/10 hover:border-pitch-green",
        secondary:
          "bg-chalk text-ink border border-chalk-400/40 hover:bg-chalk-300 shadow-sm",
        ghost:
          "hover:bg-pitch-green/10 text-pitch-green hover:text-pitch-green-800",
        link:
          "text-pitch-green underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-11 rounded-lg px-8 text-base",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
