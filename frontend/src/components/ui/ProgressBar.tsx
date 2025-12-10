"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { cn } from "./Button";

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  showLabel?: boolean;
  animated?: boolean;
  color?: "default" | "success" | "warning" | "error";
}

export function ProgressBar({
  value,
  max = 100,
  className = "",
  showLabel = false,
  animated = true,
  color = "default",
}: ProgressBarProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const percentage = Math.min((value / max) * 100, 100);

  useEffect(() => {
    if (!animated || !barRef.current) return;

    gsap.fromTo(
      barRef.current,
      { width: "0%" },
      { width: `${percentage}%`, duration: 1.5, ease: "power2.out" }
    );
  }, [percentage, animated]);

  const colors = {
    default: "bg-[#064E3B]",
    success: "bg-freshGreen",
    warning: "bg-orange-500",
    error: "bg-red-600",
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="flex justify-between items-center mb-2">
        {showLabel && (
          <span className="text-sm font-medium text-forestGreen">
            {Math.round(percentage)}%
          </span>
        )}
      </div>
      <div className="h-2 bg-slateGray/10 rounded-full overflow-hidden">
        <div
          ref={barRef}
          className={cn("h-full rounded-full transition-all", colors[color])}
          style={{ width: animated ? "0%" : `${percentage}%` }}
        />
      </div>
    </div>
  );
}


