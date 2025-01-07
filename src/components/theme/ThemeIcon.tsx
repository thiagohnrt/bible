"use client";

import { cn } from "@/lib/shad";
import { useTheme } from "next-themes";
import { ReactNode, useEffect, useState } from "react";

interface ThemeProps {
  theme: "system" | "light" | "dark";
  children: ReactNode;
  className?: string;
}

export function ThemeIcon({ theme, children }: ThemeProps) {
  const [active, setActive] = useState(false);
  const { theme: currentTheme, setTheme } = useTheme();

  useEffect(() => {
    setActive(theme === currentTheme);
  }, [currentTheme, theme]);

  return (
    <div
      className={cn("flex items-center justify-center w-10 h-10 rounded-full", active ? "border" : "")}
      onClick={() => setTheme(theme)}
    >
      {children}
    </div>
  );
}
