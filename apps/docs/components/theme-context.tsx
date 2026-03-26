// Non-Nextjs version
// "use client";
//
// import {
//   createContext,
//   useContext,
//   ReactNode,
//   useEffect,
//   useState,
// } from "react";
// import { KinetiqProvider, KinetiqTheme } from "kinetiq-ui";
//
// interface ThemeContextValue {
//   theme: KinetiqTheme;
//   toggleTheme: () => void;
// }
//
// const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);
//
// export const useAppTheme = () => {
//   const context = useContext(ThemeContext);
//   if (!context) throw new Error("useAppTheme must be used within ThemeProvider");
//   return context;
// };
//
// export function ThemeProvider({ children }: { children: ReactNode }) {
//   const [theme, setTheme] = useState<KinetiqTheme>("dark");
//   const [mounted, setMounted] = useState(false);
//
//   // Load saved theme
//   useEffect(() => {
//     const saved = localStorage.getItem("theme") as KinetiqTheme | null;
//     if (saved) setTheme(saved);
//     setMounted(true);
//   }, []);
//
//   // Save theme
//   useEffect(() => {
//     if (mounted) {
//       localStorage.setItem("theme", theme);
//     }
//   }, [theme, mounted]);
//
//   const toggleTheme = () => {
//     setTheme((prev) => (prev === "dark" ? "light" : "dark"));
//   };
//
//   if (!mounted) return null;
//
//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       <KinetiqProvider theme={theme}>{children}</KinetiqProvider>
//     </ThemeContext.Provider>
//   );
// }

"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { KinetiqProvider, KinetiqTheme } from "kinetiq-ui";

interface ThemeContextValue {
  theme: KinetiqTheme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const useAppTheme = () => {
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error("useAppTheme must be used within ThemeProvider");
  return context;
};

function KinetiqBridge({ children }: { children: ReactNode }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: resolvedTheme as KinetiqTheme,
        toggleTheme,
      }}
    >
      <KinetiqProvider theme={resolvedTheme as KinetiqTheme}>
        {children}
      </KinetiqProvider>
    </ThemeContext.Provider>
  );
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      defaultTheme="dark"
      enableColorScheme={false}
      attribute="class"
    >
      <KinetiqBridge>{children}</KinetiqBridge>
    </NextThemesProvider>
  );
}
