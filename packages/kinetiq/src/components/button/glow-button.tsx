"use client";

import * as React from "react";
import {
  HTMLMotionProps,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { cn } from "../../lib/cn";

export interface GlowButtonProps
  extends Omit<HTMLMotionProps<"button">, "ref" | "children"> {
  children?: React.ReactNode;
  magnetic?: boolean;
  accentColor?: string;
  size?: "sm" | "md" | "lg";
}

export const GlowButton = React.forwardRef<HTMLButtonElement, GlowButtonProps>(
  (
    {
      className,
      children,
      magnetic = true,
      accentColor = "#ffffff",
      size = "md",
      ...props
    },
    ref,
  ) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Physics-based springs for that "weighted" premium feel
    const springConfig = { damping: 25, stiffness: 150 };
    const mX = useSpring(0, springConfig);
    const mY = useSpring(0, springConfig);

    // Parallax layers
    const textX = useTransform(mX, (v) => v * 0.4);
    const textY = useTransform(mY, (v) => v * 0.4);
    const glowX = useTransform(mX, (v) => v * -0.6); // Moves opposite to mouse for depth

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      mouseX.set(x);
      mouseY.set(y);

      if (magnetic) {
        mX.set(x - rect.width / 2);
        mY.set(y - rect.height / 2);
      }
    };

    const handleMouseLeave = () => {
      mX.set(0);
      mY.set(0);
    };

    // The dynamic "light beam" border
    const borderMask = useMotionTemplate`radial-gradient(140px circle at ${mouseX}px ${mouseY}px, white 0%, transparent 100%)`;

    return (
      <motion.button
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ x: mX, y: mY }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "relative group inline-flex items-center justify-center transition-all duration-500",
          "rounded-2xl bg-black select-none",
          size === "sm" && "px-5 py-2 text-sm",
          size === "md" && "px-8 py-3.5 text-base",
          size === "lg" && "px-12 py-5 text-lg",
          className,
        )}
        {...props}
      >
        {/* 1. THE PERMANENT SKELETON (Visibility on Black) */}
        <div className="absolute inset-0 rounded-2xl border border-white/8" />

        {/* 2. THE DYNAMIC BORDER (Lights up on Hover) */}
        <motion.div
          className="absolute inset-0 rounded-2xl border border-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ maskImage: borderMask, WebkitMaskImage: borderMask }}
        />

        {/* 3. INTERNAL AMBIENT GLOW */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-2xl"
          style={{
            x: glowX,
            background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`,
          }}
        />

        {/* 4. THE CONTENT LAYER */}
        <motion.div
          style={{ x: textX, y: textY }}
          className="relative z-10 flex items-center gap-3 font-light tracking-[0.05em] text-zinc-400 group-hover:text-white transition-colors duration-500"
        >
          {children}

          {/* Minimalist Interactive Icon */}
          <div className="relative w-4 h-px bg-zinc-600 overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-white"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
          </div>
        </motion.div>

        {/* 5. THE "FINISHING TOUCH" - Top edge highlight */}
        <div className="absolute top-0 left-4 right-4 h-px bg-linear-to-r from-transparent via-white/10 to-transparent group-hover:via-white/30 transition-all duration-500" />
      </motion.button>
    );
  },
);

GlowButton.displayName = "GlowButton";
