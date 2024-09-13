"use client";

import { cn } from "@/lib/utils";
import { RiArrowUpSLine } from "react-icons/ri";

export function TopNavigation() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      onClick={scrollToTop}
      className={cn("chapter-top-navigation", "fixed right-2 bottom-40 h-14 w-14 z-10 ", "transition-all duration-500")}
    >
      <div className={cn("flex h-full w-full rounded-full items-center justify-center bg-highlight-active")}>
        <RiArrowUpSLine size={24} />
      </div>
    </div>
  );
}
