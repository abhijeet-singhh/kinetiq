"use client";

import { useEffect } from "react";

export type KinetiqTheme = "light" | "dark";

interface KinetiqProviderProps {
  children: React.ReactNode;
  theme?: KinetiqTheme;
}

export function KinetiqProvider({
  children,
  theme = "dark",
}: KinetiqProviderProps) {
  useEffect(() => {
    const root = document.documentElement;

    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  return <>{children}</>;
}
