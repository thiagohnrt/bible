"use client";

import { cn } from "@/lib/shad";
import { RiArrowUpSLine } from "react-icons/ri";

interface Props {
  className?: string;
}

export function TopNavigation({ className }: Props) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      onClick={scrollToTop}
      className={cn("fixed h-14 w-14 z-10 cursor-pointer", "transition-all duration-500", className)}
    >
      <div
        className={cn(
          "flex h-full w-full rounded-full items-center justify-center bg-highlight-active shadow-md shadow-black "
        )}
      >
        <RiArrowUpSLine size={24} />
      </div>
    </div>
  );
}
