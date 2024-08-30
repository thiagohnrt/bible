"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { RiDeviceLine, RiMoonLine, RiSunLine } from "react-icons/ri";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex border rounded-full">
      <div
        className={cn("flex items-center justify-center w-10 h-10 rounded-full", theme === "system" ? "border" : "")}
        onClick={() => setTheme("system")}
      >
        <RiDeviceLine size={20} />
      </div>
      <div
        className={cn("flex items-center justify-center w-10 h-10 rounded-full", theme === "light" ? "border" : "")}
        onClick={() => setTheme("light")}
      >
        <RiSunLine size={20} />
      </div>
      <div
        className={cn("flex items-center justify-center w-10 h-10 rounded-full", theme === "dark" ? "border" : "")}
        onClick={() => setTheme("dark")}
      >
        <RiMoonLine size={20} />
      </div>
    </div>
  );
}
