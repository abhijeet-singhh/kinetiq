import type { Transition } from "motion/react";

/**
 * Kinetiq Motion System
 */

export const duration = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.35,
  slow: 0.6,
} as const;

export const easing = {
  smooth: [0.4, 0.0, 0.2, 1],
  sharp: [0.4, 0.0, 0.6, 1],
  easeOut: [0.0, 0.0, 0.2, 1],
} as const;

export const spring: Record<string, Transition> = {
  soft: {
    type: "spring",
    stiffness: 120,
    damping: 20,
  },
  medium: {
    type: "spring",
    stiffness: 200,
    damping: 25,
  },
  stiff: {
    type: "spring",
    stiffness: 300,
    damping: 30,
  },
};
