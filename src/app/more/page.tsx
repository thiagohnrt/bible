"use client";

import { VersionChange } from "@/components/header/VersionChange";
import { ItemMenu } from "@/components/more/ItemMenu";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { share } from "@/lib/share";
import { BibleContext } from "@/providers/bibleProvider";
import { useContext } from "react";
import { IoLanguage } from "react-icons/io5";
import { MdInfoOutline, MdShare } from "react-icons/md";
import { RiBookLine } from "react-icons/ri";

export default function MorePage() {
  const { translation } = useContext(BibleContext);
  const iconSize = 20;

  return (
    <div className="flex flex-col -mx-6">
      <VersionChange onTranslationSelected={() => {}}>
        <div>
          <ItemMenu label="Versões" icon={<IoLanguage size={iconSize} />}>
            <small className="line-clamp-1 opacity-50">
              {translation?.short_name} - {translation?.full_name}
            </small>
          </ItemMenu>
        </div>
      </VersionChange>
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

function Separator() {
  return <div className="border-t my-3"></div>;
}
