"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface FloatingElementsProps {
  count?: number;
}

interface ElementStyle {
  left: string;
  top: string;
  width: string;
  height: string;
  backgroundColor: string;
}

export function FloatingElements({ count = 20 }: FloatingElementsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [elements, setElements] = useState<ElementStyle[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  // Generate random positions only on client side to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);
    const generatedElements: ElementStyle[] = Array.from({ length: count }).map((_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      width: `${2 + Math.random() * 4}px`,
      height: `${2 + Math.random() * 4}px`,
      backgroundColor: i % 3 === 0 ? "#42C96F" : i % 3 === 1 ? "#038262" : "#9ACF0D",
    }));
    setElements(generatedElements);
  }, [count]);

  useEffect(() => {
    if (!isMounted || !containerRef.current) return;

    const container = containerRef.current;
    const elementNodes = container.children;
    
    Array.from(elementNodes).forEach((element, i) => {
      const delay = i * 0.2;
      const duration = 3 + Math.random() * 4;
      const y = -30 - Math.random() * 30;
      const x = -15 + Math.random() * 30;
      const rotation = -10 + Math.random() * 20;

      gsap.to(element, {
        y,
        x,
        rotation,
        duration,
        delay,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });
  }, [isMounted]);

  // Don't render until mounted to avoid hydration mismatch
  if (!isMounted) {
    return null;
  }

  return (
    <div ref={containerRef} className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
      {elements.map((style, i) => (
        <div
          key={i}
          className="absolute rounded-full opacity-20"
          style={style}
        />
      ))}
    </div>
  );
}
