"use client";

import { MdShare } from "react-icons/md";
import { ItemMenu } from "./ItemMenu";
import { share } from "@/lib/share";

interface Props {
  iconSize: number;
}

export function ItemShare({ iconSize }: Props) {
  return (
    <ItemMenu
      label="Compartilhar"
      icon={<MdShare size={iconSize} />}
      onClick={() => share({ text: "Estou usando esse app da bíblia e ele é incrível.", url: location.origin })}
    />
  );
}
