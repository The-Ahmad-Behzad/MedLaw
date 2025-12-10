"use client";
import React, { useEffect, useState } from "react";

export function CursorFollower() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isPointer, setIsPointer] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });

            const target = e.target as HTMLElement;
            setIsPointer(
                window.getComputedStyle(target).cursor === "pointer" ||
                target.tagName === "BUTTON" ||
                target.tagName === "A"
            );
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div
            className="fixed pointer-events-none z-[9999] mix-blend-difference transition-transform duration-150 ease-out"
            style={{
                left: position.x,
                top: position.y,
                transform: `translate(-50%, -50%) scale(${isPointer ? 1.5 : 1})`,
            }}
        >
            <div className="w-8 h-8 rounded-full border-2 border-white bg-white/20 backdrop-blur-sm"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full"></div>
        </div>
    );
}
