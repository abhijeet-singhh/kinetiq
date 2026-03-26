"use client";

import { useEffect, useRef } from "react";

export interface CustomCursorProps {
  blobColor?: string;
  dotColor?: string;
  blobSize?: number;
  dotSize?: number;
  stiffness?: number; // Spring stiffness
  damping?: number; // Spring damping
  hideDefaultCursor?: boolean; // Hide native cursor
  useGooEffect?: boolean; // Enable SVG goo filter
  className?: string; // For additional styling
}

export function CustomCursor({
  blobColor = "#686869",
  dotColor = "#ffffff",
  blobSize = 34,
  dotSize = 7,
  stiffness = 0.15,
  damping = 0.75,
  hideDefaultCursor = true,
  useGooEffect = true,
  className = "",
}: CustomCursorProps) {
  const blobRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const vel = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let styleEl: HTMLStyleElement | null = null;

    if (hideDefaultCursor) {
      // Hide native cursor globally
      document.documentElement.style.cursor = "none";

      styleEl = document.createElement("style");
      styleEl.innerHTML = `* { cursor: none !important; }`;
      document.head.appendChild(styleEl);
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let rafId: number;

    const animate = () => {
      // Spring Physics
      const dx = mouse.current.x - pos.current.x;
      const dy = mouse.current.y - pos.current.y;

      const ax = dx * stiffness;
      const ay = dy * stiffness;

      vel.current.x = (vel.current.x + ax) * damping;
      vel.current.y = (vel.current.y + ay) * damping;

      pos.current.x += vel.current.x;
      pos.current.y += vel.current.y;

      // Velocity-based deformation
      const speed = Math.sqrt(vel.current.x ** 2 + vel.current.y ** 2);
      const angle = (Math.atan2(vel.current.y, vel.current.x) * 180) / Math.PI;

      const stretch = Math.min(speed * 0.04, 1.2);
      const sx = 1 + stretch;
      const sy = 1 - stretch * 0.4;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0)`;
      }

      if (blobRef.current) {
        blobRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) rotate(${angle}deg) scale(${sx}, ${sy})`;
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);

      if (hideDefaultCursor) {
        document.documentElement.style.cursor = "auto";
        if (styleEl?.parentNode) styleEl.parentNode.removeChild(styleEl);
      }
    };
  }, [stiffness, damping, hideDefaultCursor]);

  return (
    <>
      {useGooEffect && (
        <svg className="fixed pointer-events-none invisible" aria-hidden="true">
          <defs>
            <filter id="liquid-goo">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="6"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -12"
                result="goo"
              />
            </filter>
          </defs>
        </svg>
      )}

      <div
        className={`fixed inset-0 pointer-events-none z-[99999] overflow-hidden ${className}`}
        style={{ filter: useGooEffect ? "url(#liquid-goo)" : "none" }}
      >
        {/* Blob */}
        <div
          ref={blobRef}
          className="absolute top-0 left-0 rounded-full will-change-transform"
          style={{
            width: blobSize,
            height: blobSize,
            backgroundColor: blobColor,
            marginLeft: -blobSize / 2,
            marginTop: -blobSize / 2,
          }}
        />

        {/* Dot */}
        <div
          ref={dotRef}
          className="absolute top-0 left-0 rounded-full will-change-transform"
          style={{
            width: dotSize,
            height: dotSize,
            backgroundColor: dotColor,
            marginLeft: -dotSize / 2,
            marginTop: -dotSize / 2,
          }}
        />
      </div>
    </>
  );
}
