"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FadeInProps {
    children: React.ReactNode;
    delay?: number;
    direction?: "up" | "down" | "left" | "right";
    className?: string;
    stagger?: number;
}

export function FadeIn({
    children,
    delay = 0,
    direction = "up",
    className = "",
    stagger = 0,
}: FadeInProps) {
    const el = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = el.current;
        if (!element) return;

        const x = direction === "left" ? 100 : direction === "right" ? -100 : 0;
        const y = direction === "up" ? 100 : direction === "down" ? -100 : 0;

        gsap.fromTo(
            element.children,
            {
                opacity: 0,
                x: x,
                y: y,
            },
            {
                opacity: 1,
                x: 0,
                y: 0,
                duration: 1,
                delay: delay,
                stagger: stagger,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                },
            }
        );
    }, [delay, direction, stagger]);

    return (
        <div ref={el} className={className}>
            {children}
        </div>
    );
}
