"use client";
import React from "react";

export function GridBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #038262 1px, transparent 1px),
            linear-gradient(to bottom, #038262 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />
      
      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-freshGreen/5 rounded-full blur-[100px] animate-pulse" 
           style={{ animationDuration: "8s" }} />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-deepTeal/5 rounded-full blur-[100px] animate-pulse" 
           style={{ animationDuration: "10s", animationDelay: "2s" }} />
      <div className="absolute bottom-0 left-1/2 w-[700px] h-[700px] bg-softLime/3 rounded-full blur-[120px] animate-pulse" 
           style={{ animationDuration: "12s", animationDelay: "4s" }} />
    </div>
  );
}


