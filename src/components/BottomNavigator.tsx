import { HomeIcon, ReaderIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { ReactNode } from "react";

export default function BottomNavigator() {
  return (
    <footer className="h-12 z-10 dark:bg-neutral-950 bg-neutral-50 fixed left-0 bottom-0 right-0 border-t flex items-center justify-between">
      <MenuItem url="/" label="Início">
        <HomeIcon />
      </MenuItem>
      <MenuItem url="/nvi" label="Bíblia">
        <ReaderIcon />
      </MenuItem>
      <MenuItem url="/" label="Mais">
        <HamburgerMenuIcon />
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
    <Link href={url} className="flex flex-col flex-auto items-center">
      {children}
      <label className="text-xs">{label}</label>
    </Link>
  );
}
