"use client";

import { RiHome5Fill, RiHome5Line, RiBookFill, RiBookLine, RiMenuFill, RiMenuLine } from "react-icons/ri";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getBibleHistory, getTranslation } from "@/lib/utils";
import { EVENT_BIBLE_HISTORY, TRANSLATION_DEFAULT } from "@/constants/bible";
import { TbMenuDeep } from "react-icons/tb";

export default function BottomNavigator() {
  const pathname = usePathname();
  const [bibleLink, setBibleLink] = useState(`/bible/${TRANSLATION_DEFAULT}`);

  useEffect(() => {
    const translation = getTranslation(pathname) || TRANSLATION_DEFAULT;
    const onChangeStorage = (event: Event) => {
      const history = getBibleHistory();
      let book = "";
      if (history.book?.id) {
        book = "#" + history.book.id;
      }
      setBibleLink(`/bible/${translation}${book}`);
    };

    window.addEventListener(EVENT_BIBLE_HISTORY, onChangeStorage);

    return () => {
      window.removeEventListener(EVENT_BIBLE_HISTORY, onChangeStorage);
    };
  }, [pathname]);

  return (
    <footer className="h-16 z-10 bg-background fixed left-0 bottom-0 right-0 border-t flex items-center justify-between">
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
