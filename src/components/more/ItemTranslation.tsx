"use client";

import { IoLanguage } from "react-icons/io5";
import { VersionChange } from "../header/VersionChange";
import { ItemMenu } from "./ItemMenu";
import { useContext } from "react";
import { BibleContext } from "@/providers/bibleProvider";

interface Props {
  iconSize: number;
}

export function ItemTranslation({ iconSize }: Props) {
  const { translation } = useContext(BibleContext);
  return (
    // TODO implementar
    <VersionChange onTranslationSelected={() => {}} onTranslationDeleted={() => {}}>
      <div>
        <ItemMenu label="Versões" icon={<IoLanguage size={iconSize} />}>
          <small className="line-clamp-1 opacity-50">
            {translation ? translation.short_name + " - " + translation.full_name : ""}
          </small>
        </ItemMenu>
      </div>
    </VersionChange>
  );
}
