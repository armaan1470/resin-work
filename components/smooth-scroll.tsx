"use client";
import { ReactLenis } from "lenis/react";
import { useState, useEffect } from "react";
import { Settings, X } from "lucide-react";

interface SmoothScrollProps {
  children: React.ReactNode;
}

function SmoothScroll({ children }: SmoothScrollProps) {
  return (
    <>
      <ReactLenis root options={{ smoothWheel: false }}>
        {children}
      </ReactLenis>
    </>
  );
}

export default SmoothScroll;
