"use client";
import { ReactLenis } from "lenis/react";

function SmoothScroll({ children }: any) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}

export default SmoothScroll;
