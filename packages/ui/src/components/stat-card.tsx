import * as React from "react";
import { cn } from "../lib/utils";

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: {
    value: string | number;
    positive?: boolean;
    label?: string;
  };
  accentColor?: "pitch" | "leather" | "gold" | "ink";
}

export function StatCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  accentColor = "pitch",
  className,
  ...props
}: StatCardProps) {
  const accentBorders = {
    pitch: "border-l-4 border-l-pitch-green",
    leather: "border-l-4 border-l-leather-red",
    gold: "border-l-4 border-l-stump-gold",
    ink: "border-l-4 border-l-ink"
  };

  const iconBackgrounds = {
    pitch: "bg-pitch-green/10 text-pitch-green",
    leather: "bg-leather-red/10 text-leather-red",
    gold: "bg-stump-gold/20 text-stump-gold-700",
    ink: "bg-ink/10 text-ink"
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-border/80 bg-card p-5 text-card-foreground shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
        accentBorders[accentColor],
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            {title}
          </p>
          <h4 className="mt-1 font-heading text-3xl font-bold tracking-tight text-foreground">
            {value}
          </h4>
          {subtitle && (
            <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {icon && (
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-xl p-2.5 shadow-sm",
              iconBackgrounds[accentColor]
            )}
          >
            {icon}
          </div>
        )}
      </div>

      {trend && (
        <div className="mt-4 flex items-center gap-1.5 border-t border-border/50 pt-3 text-xs">
          <span
            className={cn(
              "font-bold",
              trend.positive !== false ? "text-emerald-600" : "text-leather-red"
            )}
          >
            {trend.positive !== false ? "↑" : "↓"} {trend.value}
          </span>
          {trend.label && (
            <span className="text-muted-foreground">{trend.label}</span>
          )}
        </div>
      )}
    </div>
  );
}
