import React from "react";
import { cn } from "./Button";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "warning" | "error" | "info" | "outline";
  size?: "sm" | "md" | "lg";
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    const variants = {
      default: "bg-slateGray/10 text-slateGray border-slateGray/20",
      success: "bg-freshGreen/10 text-freshGreen border-freshGreen/20",
      warning: "bg-softLime/10 text-softLime border-softLime/20",
      error: "bg-red-500/10 text-red-600 border-red-500/20",
      info: "bg-deepTeal/10 text-deepTeal border-deepTeal/20",
      outline: "bg-transparent text-slate-600 border-slate-200",
    };

    const sizes = {
      sm: "px-2 py-0.5 text-xs",
      md: "px-3 py-1 text-sm",
      lg: "px-4 py-1.5 text-base",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-full font-medium border transition-colors",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";


