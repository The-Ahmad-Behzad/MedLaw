import React from "react";
import { cn } from "./Button"; // Reusing cn utility

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    hoverEffect?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, hoverEffect = false, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "glass-panel rounded-2xl p-6 transition-all duration-300",
                    hoverEffect && "hover:scale-[1.02] hover:shadow-2xl",
                    className
                )}
                {...props}
            />
        );
    }
);
Card.displayName = "Card";
