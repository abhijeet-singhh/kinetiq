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
import { motion } from "motion/react";
import { jsx as jsx2 } from "react/jsx-runtime";
var GlowButton = React.forwardRef(
  ({
    className,
    magnetic = true,
    glowIntensity = "soft",
    size = "lg",
    ...props
  }, ref) => {
    const buttonRef = React.useRef(null);
    const [position, setPosition] = React.useState({ x: 0, y: 0 });
    const handleMouseMove = (e) => {
      if (!magnetic || !buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.15;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.15;
      setPosition({ x, y });
    };
    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
    };
    const sizeStyles = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg"
    };
    return /* @__PURE__ */ jsx2(
      motion.button,
      {
        ref: (node) => {
          buttonRef.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        },
        whileHover: { scale: 1.03 },
        whileTap: { scale: 0.97 },
        animate: {
          x: position.x,
          y: position.y,
          boxShadow: glowIntensity === "strong" ? `0 0 45px rgba(var(--glow-primary) / var(--glow-opacity-strong))` : `0 0 25px rgba(var(--glow-primary) / var(--glow-opacity-soft))`
        },
        transition: spring.medium,
        onMouseMove: handleMouseMove,
        onMouseLeave: handleMouseLeave,
        className: cn(
          "relative inline-flex items-center justify-center",
          "rounded-lg",
          "bg-primary text-primary-foreground",
          "border border-border",
          "transition-colors duration-200",
          "hover:brightness-110",
          sizeStyles[size ?? "md"],
          className
        ),
        ...props
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
