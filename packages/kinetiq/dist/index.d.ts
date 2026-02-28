import { ClassValue } from 'clsx';
import * as react_jsx_runtime from 'react/jsx-runtime';

declare function cn(...inputs: ClassValue[]): string;

/**
 * Kinetiq Motion System
 * Consistent animation timing + spring presets
 */
declare const duration: {
    instant: number;
    fast: number;
    normal: number;
    slow: number;
};
declare const easing: {
    smooth: number[];
    sharp: number[];
    easeOut: number[];
};
declare const spring: {
    soft: {
        type: string;
        stiffness: number;
        damping: number;
    };
    medium: {
        type: string;
        stiffness: number;
        damping: number;
    };
    stiff: {
        type: string;
        stiffness: number;
        damping: number;
    };
};

type KinetiqTheme = "light" | "dark";
interface KinetiqProviderProps {
    children: React.ReactNode;
    theme?: KinetiqTheme;
}
declare function KinetiqProvider({ children, theme, }: KinetiqProviderProps): react_jsx_runtime.JSX.Element;

export { KinetiqProvider, type KinetiqTheme, cn, duration, easing, spring };
