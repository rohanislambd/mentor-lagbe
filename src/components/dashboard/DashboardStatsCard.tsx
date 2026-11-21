import React from "react";
import Link from "next/link";
import { ArrowRight, LucideIcon } from "lucide-react";

export interface DashboardStatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  linkHref?: string;
  linkLabel?: string;
  badge?: React.ReactNode;
}

export function DashboardStatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = "text-amber-600 dark:text-amber-400",
  iconBg = "bg-amber-500/10",
  linkHref,
  linkLabel,
  badge,
}: DashboardStatsCardProps) {
  return (
    <div className="p-5 rounded-2xl bg-card border border-border shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-4">
      {/* Top Title & Icon Row */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {title}
        </span>
        <div
          className={`w-10 h-10 rounded-xl ${iconBg} ${iconColor} flex items-center justify-center shrink-0 shadow-2xs`}
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {/* Main Metric Value & Subtitle */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
            {value}
          </p>
          {badge}
        </div>
        {subtitle && (
          <p className="text-xs text-muted-foreground leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {/* Optional Bottom Link */}
      {linkHref && linkLabel && (
        <div className="pt-2 border-t border-border/60">
          <Link
            href={linkHref}
            className="text-[11px] font-bold text-amber-600 dark:text-amber-400 hover:underline inline-flex items-center gap-1 group"
          >
            <span>{linkLabel}</span>
            <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      )}
    </div>
  );
}
