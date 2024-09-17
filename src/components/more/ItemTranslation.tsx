"use client";

import { IoLanguage } from "react-icons/io5";
import { VersionChange } from "../header/VersionChange";
import { ItemMenu } from "./ItemMenu";
import { useContext } from "react";
import { BibleContext } from "@/providers/bibleProvider";
import * as bolls from "@/custom/bolls";

interface Props {
  iconSize: number;
}

export function ItemTranslation({ iconSize }: Props) {
  const { translation } = useContext(BibleContext);
  return (
    <VersionChange onTranslationSelected={() => {}}>
      <div>
        <ItemMenu label="Versões" icon={<IoLanguage size={iconSize} />}>
          <small className="line-clamp-1 opacity-50">
            {translation
              ? bolls.translation(translation).short_name + " - " + bolls.translation(translation).full_name
              : ""}
          </small>
        </ItemMenu>
      </div>
    </VersionChange>
  );
}
