"use client";

import { KinetiqProvider } from "kinetiq-ui";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <KinetiqProvider theme="dark">{children}</KinetiqProvider>;
}
