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
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      import_react2.motion.button,
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GlowButton,
  KinetiqProvider,
  cn,
  duration,
  easing,
  spring
});
