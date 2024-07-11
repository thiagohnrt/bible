"use client";

import {
  RiHome5Fill,
  RiHome5Line,
  RiBookFill,
  RiBookLine,
  RiMenuFill,
  RiMenuLine,
} from "react-icons/ri";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getVersion } from "@/lib/utils";

export default function BottomNavigator() {
  const pathname = usePathname();
  const [version, setVersion] = useState("nvi");

  useEffect(() => {
    setVersion(getVersion(pathname) || "nvi");
  }, [pathname]);

  return (
    <footer className="h-[60px] z-10 dark:bg-neutral-950 bg-neutral-50 fixed left-0 bottom-0 right-0 border-t flex items-center justify-between">
      <MenuItem url="/" label="Início">
        {pathname === "/" ? (
          <RiHome5Fill size={20} />
        ) : (
          <RiHome5Line size={20} />
        )}
      </MenuItem>
      <MenuItem url={`/bible/${version}`} label="Bíblia">
        {pathname.startsWith("/bible") ? (
          <RiBookFill size={20} />
        ) : (
          <RiBookLine size={20} />
        )}
      </MenuItem>
      <MenuItem url="/more" label="Mais">
        {pathname === "/more" ? (
          <RiMenuFill size={20} />
        ) : (
          <RiMenuLine size={20} />
        )}
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
      className="flex flex-col flex-auto items-center self-stretch justify-center"
    >
      {children}
      <label className="text-xs pt-1">{label}</label>
    </Link>
  );
}
