"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  GlowButton: () => GlowButton,
  KinetiqProvider: () => KinetiqProvider,
  cn: () => cn,
  duration: () => duration,
  easing: () => easing,
  spring: () => spring
});
module.exports = __toCommonJS(index_exports);

// src/provider/kinetiq-provider.tsx
var import_react = require("react");
var import_jsx_runtime = require("react/jsx-runtime");
function KinetiqProvider({
  children,
  theme = "dark"
}) {
  (0, import_react.useEffect)(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}

// src/lib/cn.ts
var import_clsx = require("clsx");
var import_tailwind_merge = require("tailwind-merge");
function cn(...inputs) {
  return (0, import_tailwind_merge.twMerge)((0, import_clsx.clsx)(inputs));
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
var React = __toESM(require("react"));
var import_react2 = require("motion/react");
var import_jsx_runtime2 = require("react/jsx-runtime");
var GlowButton = React.forwardRef(
  ({
    className,
    children,
    magnetic = true,
    accentColor = "#ffffff",
    size = "md",
    ...props
  }, ref) => {
    const mouseX = (0, import_react2.useMotionValue)(0);
    const mouseY = (0, import_react2.useMotionValue)(0);
    const springConfig = { damping: 25, stiffness: 150 };
    const mX = (0, import_react2.useSpring)(0, springConfig);
    const mY = (0, import_react2.useSpring)(0, springConfig);
    const textX = (0, import_react2.useTransform)(mX, (v) => v * 0.4);
    const textY = (0, import_react2.useTransform)(mY, (v) => v * 0.4);
    const glowX = (0, import_react2.useTransform)(mX, (v) => v * -0.6);
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
    const borderMask = import_react2.useMotionTemplate`radial-gradient(140px circle at ${mouseX}px ${mouseY}px, white 0%, transparent 100%)`;
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
      import_react2.motion.button,
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
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "absolute inset-0 rounded-2xl border border-white/8" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            import_react2.motion.div,
            {
              className: "absolute inset-0 rounded-2xl border border-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
              style: { maskImage: borderMask, WebkitMaskImage: borderMask }
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            import_react2.motion.div,
            {
              className: "absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-2xl",
              style: {
                x: glowX,
                background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`
              }
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
            import_react2.motion.div,
            {
              style: { x: textX, y: textY },
              className: "relative z-10 flex items-center gap-3 font-light tracking-[0.05em] text-zinc-400 group-hover:text-white transition-colors duration-500",
              children: [
                children,
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "relative w-4 h-px bg-zinc-600 overflow-hidden", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                  import_react2.motion.div,
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
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "absolute top-0 left-4 right-4 h-px bg-linear-to-r from-transparent via-white/10 to-transparent group-hover:via-white/30 transition-all duration-500" })
        ]
      }
    );
  }
);
GlowButton.displayName = "GlowButton";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GlowButton,
  KinetiqProvider,
  cn,
  duration,
  easing,
  spring
});
