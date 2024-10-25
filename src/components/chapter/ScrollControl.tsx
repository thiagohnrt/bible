"use client";

import { useEffect, useRef } from "react";

type ScrollDirection = "top" | "down" | "up" | "bottom";

export function ScrollControl() {
  const lastScrollYRef = useRef(0);

  const bodyClass = (method: "add" | "remove") => {
    document.body.classList[method]("window-scroll-down");
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      let scrollDirection: ScrollDirection;

      if (scrollY === 0) {
        scrollDirection = "top";
      } else if (scrollY + windowHeight >= documentHeight - 240) {
        scrollDirection = "bottom";
      } else if (scrollY > lastScrollYRef.current) {
        scrollDirection = "down";
      } else {
        scrollDirection = "up";
      }

      bodyClass(scrollDirection === "down" ? "add" : "remove");
      lastScrollYRef.current = scrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      bodyClass("remove");
      window.removeEventListener("scroll", handleScroll);
    };

    //! Não adicionar dependências no useEffect para evitar re-execução durante rolagem, pois isso
    //! causaria a remoção e re-adição da classe "window-scroll-down" desnecessariamente.
  }, []);

  return <></>;
}
