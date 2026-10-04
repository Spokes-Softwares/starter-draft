"use client";

import { ThemeProvider } from "next-themes";
import ModeToggle from "@repo/ui/components/composites-ui/mode-toggle";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={true}>
      <div className="relative min-h-screen w-full flex-1">
        <div className="absolute right-4 top-4 z-50">
          <ModeToggle />
        </div>
        <div className="min-h-screen">{children}</div>
      </div>
    </ThemeProvider>
  );
}
