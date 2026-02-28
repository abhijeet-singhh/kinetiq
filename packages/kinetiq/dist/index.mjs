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
export {
  KinetiqProvider,
  cn,
  duration,
  easing,
  spring
};
