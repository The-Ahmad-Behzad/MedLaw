"use client";
import React from "react";
import { Card } from "./Card";
import { LucideIcon } from "lucide-react";
import { cn } from "./Button";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  iconColor?: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  className = "",
  iconColor = "text-deepTeal",
}: StatCardProps) {
  return (
    <Card className={cn("relative overflow-hidden", className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slateGray font-medium mb-2">{title}</p>
          <h3 className="text-3xl font-bold text-forestGreen mb-1">{value}</h3>
          {trend && (
            <div className="flex items-center gap-1">
              <span
                className={cn(
                  "text-sm font-medium",
                  trend.isPositive ? "text-freshGreen" : "text-red-500"
                )}
              >
                {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
              </span>
              <span className="text-xs text-slateGray">vs last month</span>
            </div>
          )}
        </div>
        <div className={cn("p-3 rounded-xl bg-gradient-to-br from-deepTeal/10 to-freshGreen/10", iconColor)}>
          <Icon size={24} />
        </div>
      </div>
      
      {/* Decorative element */}
      <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-gradient-to-br from-freshGreen/5 to-deepTeal/5 blur-2xl" />
    </Card>
  );
}


