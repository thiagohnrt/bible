"use client";

import { EVENT_BIBLE_HISTORY } from "@/constants/bible";
import { cn } from "@/lib/shad";
import { getBibleHistory, getTranslationPathname } from "@/lib/utils";
import { BibleContext } from "@/providers/bibleProvider";
import { Translation } from "@/services/api";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useContext, useEffect, useState } from "react";
import { RiBookFill, RiBookLine, RiHome5Fill, RiHome5Line } from "react-icons/ri";
import { TbMenuDeep } from "react-icons/tb";

export default function BottomNavigator() {
  const { translation: translationContext } = useContext(BibleContext);
  const pathname = usePathname();
  const [bibleLink, setBibleLink] = useState(`/bible`);

  const getBibleLink = (translation: Translation): string => {
    const history = getBibleHistory();
    let book = "";
    if (history.book?.id) {
      book = `?${history.book.id}-${history.chapter}`;
    }
    return `/bible/${translation.identifier}${book}`;
  };

  useEffect(() => {
    if (translationContext) {
      setBibleLink(getBibleLink(translationContext));
    }
  }, [translationContext]);

  useEffect(() => {
    const translation = getTranslationPathname(pathname);
    const onChangeStorage = (event: Event) => {
      setBibleLink(getBibleLink(translation));
    };

    window.addEventListener(EVENT_BIBLE_HISTORY, onChangeStorage);

    return () => {
      window.removeEventListener(EVENT_BIBLE_HISTORY, onChangeStorage);
    };
  }, [pathname]);

  return (
    <footer
      className={cn(
        "fixed left-0 bottom-0 right-0 h-16 z-10",
        "bg-background border-t flex items-center justify-between",
        "transition-all duration-500"
      )}
    >
      <MenuItem url="/" label="Início">
        {pathname === "/" ? <RiHome5Fill size={20} /> : <RiHome5Line size={20} />}
      </MenuItem>
      <MenuItem url={bibleLink} label="Bíblia">
        {pathname.startsWith("/bible") ? <RiBookFill size={20} /> : <RiBookLine size={20} />}
      </MenuItem>
      <MenuItem url="/more" label="Mais">
        <TbMenuDeep size={20} />
      </MenuItem>
    </footer>
  );
}

interface MenuItemProps {
  label: string;
  url: string;
  children: ReactNode;
}

function MenuItem({ label, url, children }: MenuItemProps) {
  return (
    <Link
      href={url}
      className="flex flex-col flex-1 items-center self-stretch justify-center active:bg-neutral-200 dark:active:bg-neutral-800 transition-colors"
    >
      {children}
      <label className="text-xs pt-1">{label}</label>
    </Link>
  );
}
