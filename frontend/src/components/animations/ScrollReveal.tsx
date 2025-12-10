"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  scale?: boolean;
  blur?: boolean;
}

export function ScrollReveal({
  children,
  delay = 0,
  duration = 1,
  className = "",
  scale = false,
  blur = false,
}: ScrollRevealProps) {
  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = el.current;
    if (!element) return;

    const animation: any = {
      opacity: 0,
      y: 60,
    };

    if (scale) animation.scale = 0.9;
    if (blur) animation.filter = "blur(10px)";

    const animationEnd: any = {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      duration,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 90%",
        end: "top 20%",
        toggleActions: "play none none reverse",
      },
    };

    gsap.fromTo(element, animation, animationEnd);
  }, [delay, duration, scale, blur]);

  return <div ref={el} className={className}>{children}</div>;
}

