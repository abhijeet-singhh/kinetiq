// src/provider/kinetiq-provider.tsx
import { useEffect } from "react";
import { Fragment, jsx } from "react/jsx-runtime";
function KinetiqProvider({
  children,
  theme = "dark"
}) {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);
  return /* @__PURE__ */ jsx(Fragment, { children });
}

// src/lib/cn.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// src/lib/motion.ts
var duration = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.35,
  slow: 0.6
};
var easing = {
  smooth: [0.4, 0, 0.2, 1],
  sharp: [0.4, 0, 0.6, 1],
  easeOut: [0, 0, 0.2, 1]
};
var spring = {
  soft: {
    type: "spring",
    stiffness: 120,
    damping: 20
  },
  medium: {
    type: "spring",
    stiffness: 200,
    damping: 25
  },
  stiff: {
    type: "spring",
    stiffness: 300,
    damping: 30
  }
};

// src/components/button/glow-button.tsx
import * as React from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform
} from "motion/react";
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var GlowButton = React.forwardRef(
  ({
    className,
    children,
    magnetic = true,
    accentColor = "#ffffff",
    size = "md",
    ...props
  }, ref) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springConfig = { damping: 25, stiffness: 150 };
    const mX = useSpring(0, springConfig);
    const mY = useSpring(0, springConfig);
    const textX = useTransform(mX, (v) => v * 0.4);
    const textY = useTransform(mY, (v) => v * 0.4);
    const glowX = useTransform(mX, (v) => v * -0.6);
    const handleMouseMove = (e) => {
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
    const borderMask = useMotionTemplate`radial-gradient(140px circle at ${mouseX}px ${mouseY}px, white 0%, transparent 100%)`;
    return /* @__PURE__ */ jsxs(
      motion.button,
      {
        ref,
        onMouseMove: handleMouseMove,
        onMouseLeave: handleMouseLeave,
        style: { x: mX, y: mY },
        whileHover: { scale: 1.02 },
        whileTap: { scale: 0.98 },
        className: cn(
          "relative group inline-flex items-center justify-center transition-all duration-500",
          "rounded-2xl bg-black select-none",
          size === "sm" && "px-5 py-2 text-sm",
          size === "md" && "px-8 py-3.5 text-base",
          size === "lg" && "px-12 py-5 text-lg",
          className
        ),
        ...props,
        children: [
          /* @__PURE__ */ jsx2("div", { className: "absolute inset-0 rounded-2xl border border-white/8" }),
          /* @__PURE__ */ jsx2(
            motion.div,
            {
              className: "absolute inset-0 rounded-2xl border border-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
              style: { maskImage: borderMask, WebkitMaskImage: borderMask }
            }
          ),
          /* @__PURE__ */ jsx2(
            motion.div,
            {
              className: "absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-2xl",
              style: {
                x: glowX,
                background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`
              }
            }
          ),
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              style: { x: textX, y: textY },
              className: "relative z-10 flex items-center gap-3 font-light tracking-[0.05em] text-zinc-400 group-hover:text-white transition-colors duration-500",
              children: [
                children,
                /* @__PURE__ */ jsx2("div", { className: "relative w-4 h-px bg-zinc-600 overflow-hidden", children: /* @__PURE__ */ jsx2(
                  motion.div,
                  {
                    className: "absolute inset-0 bg-white",
                    initial: { x: "-100%" },
                    animate: { x: "100%" },
                    transition: { repeat: Infinity, duration: 1, ease: "linear" }
                  }
                ) })
              ]
            }
          ),
          /* @__PURE__ */ jsx2("div", { className: "absolute top-0 left-4 right-4 h-px bg-linear-to-r from-transparent via-white/10 to-transparent group-hover:via-white/30 transition-all duration-500" })
        ]
      }
    );
  }
);
GlowButton.displayName = "GlowButton";
export {
  GlowButton,
  KinetiqProvider,
  cn,
  duration,
  easing,
  spring
};
