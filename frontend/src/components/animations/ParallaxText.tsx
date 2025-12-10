"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxTextProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxText({
  children,
  speed = 0.5,
  className = "",
}: ParallaxTextProps) {
  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = el.current;
    if (!element) return;

    gsap.to(element, {
      y: () => -100 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, [speed]);

  return <div ref={el} className={className}>{children}</div>;
}


