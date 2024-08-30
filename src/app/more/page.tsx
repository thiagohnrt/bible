"use client";

import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { share } from "@/lib/share";
import { ReactNode } from "react";
import { IoLanguage } from "react-icons/io5";
import { MdInfoOutline, MdShare } from "react-icons/md";
import { RiBookLine } from "react-icons/ri";

export default function MorePage() {
  const iconSize = 20;
  return (
    <div className="flex flex-col -mx-6">
      <ItemMenu label="Versões" icon={<IoLanguage size={iconSize} />} />
      <ItemMenu label="Planos de leitura" icon={<RiBookLine size={iconSize} />} />
      <Separator />
      <ItemMenu label="Aparência" icon={<ThemeToggle />} />
      <Separator />
      <ItemMenu
        label="Compartilhar"
        icon={<MdShare size={iconSize} />}
        onClick={() => share({ text: "Estou usando esse app da bíblia e ele é incrível.", url: location.origin })}
      />
      <ItemMenu label="Sobre" icon={<MdInfoOutline size={iconSize} />} />
    </div>
  );
}

function ItemMenu({ label, icon, ...props }: { label: string; icon?: ReactNode; onClick?: () => void }) {
  return (
    <div
      className="flex items-center justify-between gap-2 px-6 py-3 active:bg-neutral-100 dark:active:bg-neutral-900 transition-colors"
      {...props}
    >
      <div>{label}</div>
      <div>{icon}</div>
    </div>
  );
}

function Separator() {
  return <div className="border-t my-3"></div>;
}