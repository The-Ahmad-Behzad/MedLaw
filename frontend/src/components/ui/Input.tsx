import React from "react";
import { cn } from "./Button";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, ...props }, ref) => {
        return (
            <div className="w-full space-y-2">
                {label && (
                    <label className="text-sm font-medium text-forestGreen/80 ml-1">
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    className={cn(
                        "w-full px-4 py-3 rounded-xl bg-white/50 border border-slateGray/20 focus:outline-none focus:ring-2 focus:ring-deepTeal/20 focus:border-deepTeal transition-all duration-200 placeholder:text-slateGray/50",
                        error && "border-red-500 focus:ring-red-200",
                        className
                    )}
                    {...props}
                />
                {error && <p className="text-xs text-red-500 ml-1">{error}</p>}
            </div>
        );
    }
);
Input.displayName = "Input";
