"use client";

import { cn } from "@/lib/utils";
import { ReactNode, useEffect, useState } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export function Body({ children, className }: Props) {
  const [scrollDirection, setScrollDirection] = useState<"top" | "down" | "up" | "bottom">("top");
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollY === 0) {
        setScrollDirection("top");
      } else if (scrollY + windowHeight >= documentHeight) {
        setScrollDirection("bottom");
      } else if (scrollY > lastScrollY) {
        setScrollDirection("down");
      } else if (scrollY < lastScrollY) {
        setScrollDirection("up");
      }
      setLastScrollY(scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return <body className={cn(className, scrollDirection === "down" && "window-scroll-down")}>{children}</body>;
}
