import * as react_jsx_runtime from 'react/jsx-runtime';
import { ClassValue } from 'clsx';
import { Transition, HTMLMotionProps } from 'motion/react';
import * as React$1 from 'react';

type KinetiqTheme = "light" | "dark";
interface KinetiqProviderProps {
    children: React.ReactNode;
    theme?: KinetiqTheme;
}
declare function KinetiqProvider({ children, theme, }: KinetiqProviderProps): react_jsx_runtime.JSX.Element;

declare function cn(...inputs: ClassValue[]): string;

/**
 * Kinetiq Motion System
 */
declare const duration: {
    readonly instant: 0.1;
    readonly fast: 0.2;
    readonly normal: 0.35;
    readonly slow: 0.6;
};
declare const easing: {
    readonly smooth: readonly [0.4, 0, 0.2, 1];
    readonly sharp: readonly [0.4, 0, 0.6, 1];
    readonly easeOut: readonly [0, 0, 0.2, 1];
};
declare const spring: Record<string, Transition>;

interface GlowButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
    magnetic?: boolean;
    glowIntensity?: "soft" | "strong";
    size?: "sm" | "md" | "lg";
}
declare const GlowButton: React$1.ForwardRefExoticComponent<GlowButtonProps & React$1.RefAttributes<HTMLButtonElement>>;

export { GlowButton, type GlowButtonProps, KinetiqProvider, type KinetiqTheme, cn, duration, easing, spring };
